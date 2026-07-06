#!/usr/bin/env python3
"""将 demo 打包为单文件 HTML：内联全部 mock 数据 JS + 本地 assets 为 data URI。"""

import base64
import mimetypes
import os
import re
import sys

DEMO_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(DEMO_DIR, "demo-standalone.html")
PUBLIC_DIR = os.path.join(os.path.dirname(DEMO_DIR), "demo-public")
PUBLIC_OUTPUT = os.path.join(PUBLIC_DIR, "index.html")
DELIVERABLE = os.path.join(os.path.dirname(DEMO_DIR), "小提大作-完整Demo-单文件.html")

LOCAL_SCRIPTS = [
    "prompt-library-data.js",
    "tools-data.js",
    "wwds-script-data.js",
    "copyright-data.js",
    "page-req-specs.js",
]


def file_to_data_uri(path: str) -> str:
    with open(path, "rb") as f:
        data = f.read()
    mime, _ = mimetypes.guess_type(path)
    if not mime:
        if path.endswith(".svg"):
            mime = "image/svg+xml"
        elif path.endswith(".png"):
            mime = "image/png"
        elif path.endswith(".jpg") or path.endswith(".jpeg"):
            mime = "image/jpeg"
        else:
            mime = "application/octet-stream"
    b64 = base64.b64encode(data).decode("ascii")
    return f"data:{mime};base64,{b64}"


def build_asset_map() -> dict[str, str]:
    asset_map: dict[str, str] = {}
    assets_dir = os.path.join(DEMO_DIR, "assets")
    for root, _, files in os.walk(assets_dir):
        for fn in files:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, DEMO_DIR).replace("\\", "/")
            asset_map[rel] = file_to_data_uri(full)
    return asset_map


def replace_asset_paths(text: str, asset_map: dict[str, str]) -> str:
    for rel, uri in sorted(asset_map.items(), key=lambda x: -len(x[0])):
        text = text.replace(rel, uri)
    return text


def patch_tools_js(content: str, asset_map: dict[str, str]) -> str:
    for rel, uri in asset_map.items():
        if not rel.startswith("assets/tool-covers/"):
            continue
        fname = os.path.basename(rel)
        content = re.sub(
            rf"TOOL_COVERS \+ '{re.escape(fname)}'",
            f"'{uri}'",
            content,
        )
    return content


def patch_copyright_js(content: str, asset_map: dict[str, str]) -> str:
    def repl(match: re.Match) -> str:
        n = int(match.group(1))
        rel = f"assets/copyright-covers/book-{n:02d}.jpg"
        uri = asset_map.get(rel)
        if not uri:
            return match.group(0)
        return f"'{uri}'"

    return re.sub(r"LOCAL_COVER\((\d+)\)", repl, content)


def inline_script(html: str, filename: str, content: str) -> str:
    tag = f'<script src="{filename}"></script>'
    if tag not in html:
        print(f"WARN: tag not found for {filename}", file=sys.stderr)
        return html
    return html.replace(tag, f"<script>\n{content}\n</script>")


def main() -> None:
    asset_map = build_asset_map()
    print(f"Assets: {len(asset_map)} files")

    with open(os.path.join(DEMO_DIR, "index.html"), encoding="utf-8") as f:
        html = f.read()

    for script in LOCAL_SCRIPTS:
        path = os.path.join(DEMO_DIR, script)
        with open(path, encoding="utf-8") as f:
            content = f.read()
        if script == "tools-data.js":
            content = patch_tools_js(content, asset_map)
        elif script == "copyright-data.js":
            content = patch_copyright_js(content, asset_map)
        content = replace_asset_paths(content, asset_map)
        html = inline_script(html, script, content)
        print(f"Inlined: {script} ({os.path.getsize(path):,} bytes)")

    html = replace_asset_paths(html, asset_map)

    html = html.replace(
        "<title>小提大作（融合升级版）· 产品迭代 Demo</title>",
        "<title>小提大作（融合升级版）· 产品完整 Demo（单文件版）</title>",
    )

    # 校验 mock 全局变量均已内联
    checks = [
        "window.PROMPT_LIBRARY_DATA",
        "window.WORKBENCH_TOOLS",
        "window.WWDS_SCRIPT_DATA",
        "window.COPYRIGHT_DATA",
        "window.PAGE_REQ_SPECS",
    ]
    missing = [c for c in checks if c not in html]
    if missing:
        print(f"ERROR: missing mock globals: {missing}", file=sys.stderr)
        sys.exit(1)

    for script in LOCAL_SCRIPTS:
        if f'src="{script}"' in html:
            print(f"ERROR: {script} still external", file=sys.stderr)
            sys.exit(1)

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(html)

    os.makedirs(PUBLIC_DIR, exist_ok=True)
    with open(PUBLIC_OUTPUT, "w", encoding="utf-8") as f:
        f.write(html)
    with open(DELIVERABLE, "w", encoding="utf-8") as f:
        f.write(html)

    size = os.path.getsize(OUTPUT)
    print(f"OK: {OUTPUT} ({size:,} bytes / {size / 1024 / 1024:.2f} MB)")
    print(f"Public entry: {PUBLIC_OUTPUT}")
    print(f"Deliverable:  {DELIVERABLE}")


if __name__ == "__main__":
    main()
