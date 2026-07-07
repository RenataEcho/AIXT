#!/usr/bin/env python3
"""本地 Demo 开发服务：静态资源 + 页面需求说明保存 API。

用法:
  python3 serve-demo.py
  python3 serve-demo.py --port 8800

打开 http://127.0.0.1:8800/index.html
在「页面需求说明」中编辑并保存后，会写入:
  - page-req-specs.data.json
  - page-req-specs.js
刷新页面即可看到最新内容；提交 git 时一并提交上述两个文件。
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

DEMO_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, DEMO_DIR)

from page_req_specs_io import sync_page_spec  # noqa: E402


class DemoRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DEMO_DIR, **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self._cors_headers()
        self.end_headers()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/api/page-req-specs":
            self.send_error(404, "Not Found")
            return
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length) if length else b"{}"
        try:
            payload = json.loads(raw.decode("utf-8"))
            page_key = payload.get("pageKey")
            spec = payload.get("spec")
            if not page_key or not isinstance(spec, dict):
                raise ValueError("pageKey and spec are required")
            out = sync_page_spec(page_key, spec)
            body = json.dumps({"ok": True, "file": os.path.basename(out)}, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self._cors_headers()
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as exc:  # noqa: BLE001
            body = json.dumps({"ok": False, "error": str(exc)}, ensure_ascii=False).encode("utf-8")
            self.send_response(400)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self._cors_headers()
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

    def _cors_headers(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")


def main() -> None:
    parser = argparse.ArgumentParser(description="AIXT Demo dev server")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8800")))
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), DemoRequestHandler)
    print(f"Demo dev server: http://{args.host}:{args.port}/index.html")
    print("页面需求说明保存 → page-req-specs.data.json + page-req-specs.js")
    print("按 Ctrl+C 停止")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
        server.server_close()


if __name__ == "__main__":
    main()
