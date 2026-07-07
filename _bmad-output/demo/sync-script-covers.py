#!/usr/bin/env python3
"""同步剧本封面到本地 assets/script-covers，确保离线 Demo 不丢图。"""

import hashlib
import json
import os
import sys
import textwrap
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image, ImageDraw, ImageFont

DEMO_DIR = Path(__file__).resolve().parent
DATA_JSON = DEMO_DIR / "wwds-script-data.json"
DATA_JS = DEMO_DIR / "wwds-script-data.js"
COVER_DIR = DEMO_DIR / "assets" / "script-covers"
OSS_BASE = "https://wangwen-bigdata.oss-cn-beijing.aliyuncs.com/script/cover/"


def local_cover_path(filename: str) -> str:
    return f"assets/script-covers/{filename}"


def cover_filename(url: str) -> str:
    if url.startswith("assets/script-covers/"):
        return Path(url).name
    return Path(urlparse(url).path).name


def is_valid_png(path: Path) -> bool:
    if not path.exists() or path.stat().st_size < 256:
        return False
    with path.open("rb") as f:
        return f.read(8) == b"\x89PNG\r\n\x1a\n"


def try_download_oss(filename: str, signed_url: str | None) -> bool:
    urls = []
    if signed_url and signed_url.startswith("http"):
        urls.append(signed_url)
    urls.append(OSS_BASE + filename)
    for url in urls:
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0",
                    "Referer": "https://aixtdz.com/",
                },
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.read()
            if len(data) < 256 or data[:8] != b"\x89PNG\r\n\x1a\n":
                continue
            (COVER_DIR / filename).write_bytes(data)
            return True
        except Exception:
            continue
    return False


def palette_for_seed(seed: str) -> tuple[tuple[int, int, int], tuple[int, int, int]]:
    digest = hashlib.md5(seed.encode("utf-8")).hexdigest()
    c1 = tuple(int(digest[i : i + 2], 16) for i in (0, 2, 4))
    c2 = tuple(int(digest[i : i + 2], 16) for i in (6, 8, 10))
    return c1, c2


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size=size)
            except Exception:
                continue
    return ImageFont.load_default()


def generate_cover(filename: str, title: str, tags: list[str]) -> None:
    width, height = 360, 480
    c1, c2 = palette_for_seed(filename)
    img = Image.new("RGB", (width, height), c1)
    draw = ImageDraw.Draw(img)
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(int(c1[i] * (1 - ratio) + c2[i] * ratio) for i in range(3))
        draw.line([(0, y), (width, y)], fill=color)

    draw.rounded_rectangle((18, 18, width - 18, height - 18), radius=18, outline=(255, 255, 255, 180), width=2)
    tag_text = " · ".join(tags[:3]) if tags else "剧本版权"
    draw.text((32, 36), tag_text, fill=(255, 255, 255), font=load_font(18))

    font = load_font(28)
    y = 120
    for line in textwrap.wrap(title, width=8):
        draw.text((32, y), line, fill=(255, 255, 255), font=font)
        y += 36

    draw.text((32, height - 56), "WWDS · 剧本版权", fill=(255, 255, 255), font=load_font(16))
    img.save(COVER_DIR / filename, format="PNG", optimize=True)


def collect_records(data: dict) -> list[dict]:
    items = list(data.get("records", []))
    seen = {str(item.get("id")) for item in items}
    for detail in (data.get("details") or {}).values():
        sid = str(detail.get("id", ""))
        if sid and sid not in seen:
            items.append(
                {
                    "id": sid,
                    "title": detail.get("title", f"剧本 {sid}"),
                    "tags": detail.get("tags", []),
                    "coverUrl": detail.get("coverUrl", ""),
                }
            )
            seen.add(sid)
    return items


def patch_cover_urls(data: dict) -> None:
    def walk(obj):
        if isinstance(obj, dict):
            for key, value in list(obj.items()):
                if key == "coverUrl" and isinstance(value, str) and value:
                    obj[key] = local_cover_path(cover_filename(value))
                else:
                    walk(value)
        elif isinstance(obj, list):
            for item in obj:
                walk(item)

    walk(data)


def main() -> None:
    if not DATA_JSON.exists():
        print(f"ERROR: missing {DATA_JSON}", file=sys.stderr)
        sys.exit(1)

    COVER_DIR.mkdir(parents=True, exist_ok=True)
    data = json.loads(DATA_JSON.read_text(encoding="utf-8"))

    # 保留原始 OSS 签名 URL，便于将来源恢复后重试下载
    manifest_path = COVER_DIR / "source-urls.json"
    manifest: dict[str, str] = {}
    if manifest_path.exists():
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            manifest = {}

    fallback_list = DEMO_DIR / ".tmp-wwds-script-list.json"
    if fallback_list.exists():
        try:
            payload = json.loads(fallback_list.read_text(encoding="utf-8"))
            for item in payload.get("data", {}).get("records", []):
                url = item.get("coverUrl", "")
                if url.startswith("http"):
                    manifest[cover_filename(url)] = url
        except json.JSONDecodeError:
            pass

    for item in collect_records(data):
        url = item.get("coverUrl", "")
        if url.startswith("http"):
            manifest[cover_filename(url)] = url

    generated = downloaded = reused = 0
    for item in collect_records(data):
        filename = cover_filename(item.get("coverUrl", "") or f"{item.get('id')}.png")
        dest = COVER_DIR / filename
        if is_valid_png(dest):
            reused += 1
            continue
        if try_download_oss(filename, manifest.get(filename)):
            downloaded += 1
            print(f"  downloaded {filename}")
            continue
        generate_cover(filename, item.get("title", filename), item.get("tags") or [])
        generated += 1
        print(f"  generated {filename}")

    patch_cover_urls(data)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    DATA_JSON.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ": ")), encoding="utf-8")
    DATA_JS.write_text(
        "window.WWDS_SCRIPT_DATA = "
        + json.dumps(data, ensure_ascii=False, separators=(",", ": "))
        + ";",
        encoding="utf-8",
    )

    print(
        f"Covers ready: reused={reused}, downloaded={downloaded}, generated={generated}, "
        f"total={len(list(COVER_DIR.glob('*.png')))}"
    )


if __name__ == "__main__":
    main()
