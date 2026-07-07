#!/usr/bin/env python3
"""同步工具箱链接类工具的示例结果图到本地 assets，确保 Git/离线 Demo 不丢图。"""

import hashlib
import os
import shutil
import sys
import textwrap
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

DEMO_DIR = Path(__file__).resolve().parent
ASSETS = DEMO_DIR / "assets"
REMOTE_BASE = "https://aixtdz.com/preview/"

CANVAS_ASSETS = [
    ("shot-contract.png", "合同与账单", "现实题材 · 主画面"),
    ("shot-corridor.png", "医院走廊", "镜头推进 · 中景"),
    ("video-city-hero.png", "雨夜城市", "低饱和 · 结尾余味"),
    ("scene-office-night.png", "办公室夜景", "情绪节点 · 停顿"),
    ("character-hero.png", "主角状态", "人物资产 · 半身"),
    ("shot-evidence.png", "证据墙", "道具资产 · 文件"),
    ("character-fullbody.png", "封面构图", "横竖版 · 全身"),
]

SHOWCASE_ASSETS = [
    ("douyin-showcase-ip-01-noir-rooftop.jpg", "黑雨策展人", "冷调城市夜景"),
    ("douyin-showcase-ip-02-archive-storyteller.jpg", "档案叙事官", "资料室低光"),
    ("douyin-showcase-ip-03-silver-director.jpg", "银发导演型", "玻璃走廊侧光"),
    ("douyin-showcase-ip-04-urban-fantasy.jpg", "暗巷少年感", "旧街霓虹雨夜"),
]

FALLBACK_SOURCES = [
    ASSETS / "sop-char-ref-male.png",
    ASSETS / "sop-char-ref-female.png",
    ASSETS / "film-showcase-reference.png",
    ASSETS / "copyright-covers" / "book-01.jpg",
    ASSETS / "copyright-covers" / "book-03.jpg",
    ASSETS / "copyright-covers" / "book-05.jpg",
    ASSETS / "script-covers" / "a967e19433266ae6.png",
]


def is_valid_image(path: Path) -> bool:
    if not path.exists() or path.stat().st_size < 512:
        return False
    with path.open("rb") as f:
        head = f.read(12)
    if head[:8] == b"\x89PNG\r\n\x1a\n":
        return True
    if head[:3] == b"\xff\xd8\xff":
        return True
    return False


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
    ):
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size=size)
            except Exception:
                continue
    return ImageFont.load_default()


def palette(seed: str) -> tuple[tuple[int, int, int], tuple[int, int, int]]:
    digest = hashlib.md5(seed.encode("utf-8")).hexdigest()
    c1 = tuple(int(digest[i : i + 2], 16) for i in (0, 2, 4))
    c2 = tuple(int(digest[i : i + 2], 16) for i in (6, 8, 10))
    return c1, c2


def pick_fallback(name: str) -> Path | None:
    for src in FALLBACK_SOURCES:
        if src.exists():
            return src
    return None


def compose_from_source(src: Path, dest: Path, title: str, subtitle: str) -> None:
    img = Image.open(src).convert("RGB")
    img = ImageOps_fit(img, (960, 540))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, 960, 120), fill=(0, 0, 0, 128))
    draw.text((28, 24), title, fill=(255, 255, 255), font=load_font(34))
    draw.text((28, 72), subtitle, fill=(220, 220, 220), font=load_font(20))
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.suffix.lower() in {".jpg", ".jpeg"}:
        img.save(dest, format="JPEG", quality=88, optimize=True)
    else:
        img.save(dest, format="PNG", optimize=True)


def ImageOps_fit(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    img = img.copy()
    img.thumbnail(size, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", size, (24, 24, 28))
    ox = (size[0] - img.width) // 2
    oy = (size[1] - img.height) // 2
    canvas.paste(img, (ox, oy))
    return canvas.filter(ImageFilter.GaussianBlur(radius=0.2))


def generate_canvas(dest: Path, title: str, subtitle: str) -> None:
    width, height = 960, 540
    c1, c2 = palette(dest.name)
    img = Image.new("RGB", (width, height), c1)
    draw = ImageDraw.Draw(img)
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(int(c1[i] * (1 - ratio) + c2[i] * ratio) for i in range(3))
        draw.line([(0, y), (width, y)], fill=color)
    draw.rounded_rectangle((24, 24, width - 24, height - 24), radius=20, outline=(255, 255, 255), width=2)
    draw.text((48, 48), "工具结果预览", fill=(255, 255, 255), font=load_font(22))
    y = 130
    for line in textwrap.wrap(title, width=14):
        draw.text((48, y), line, fill=(255, 255, 255), font=load_font(40))
        y += 48
    draw.text((48, height - 72), subtitle, fill=(230, 230, 230), font=load_font(22))
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.suffix.lower() in {".jpg", ".jpeg"}:
        img.save(dest, format="JPEG", quality=88, optimize=True)
    else:
        img.save(dest, format="PNG", optimize=True)


def try_download(url: str, dest: Path) -> bool:
    try:
        req = urllib.request.Request(
            url,
            headers={"User-Agent": "Mozilla/5.0", "Referer": "https://aixtdz.com/"},
        )
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
        if len(data) < 512 or data[:15].startswith(b"<!DOCTYPE") or data[:5] == b"<?xml":
            return False
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return is_valid_image(dest)
    except Exception:
        return False


def ensure_asset(subdir: str, name: str, title: str, subtitle: str) -> str:
    dest = ASSETS / subdir / name
    if is_valid_image(dest):
        return "reused"
    url = REMOTE_BASE + f"assets/{subdir}/{name}"
    if try_download(url, dest):
        return "downloaded"
    fallback = pick_fallback(name)
    if fallback:
        compose_from_source(fallback, dest, title, subtitle)
        return "composed"
    generate_canvas(dest, title, subtitle)
    return "generated"


def main() -> None:
    stats: dict[str, int] = {}
    for name, title, subtitle in CANVAS_ASSETS:
        action = ensure_asset("canvas-example-assets", name, title, subtitle)
        stats[action] = stats.get(action, 0) + 1
        print(f"  canvas/{name}: {action}")
    for name, title, subtitle in SHOWCASE_ASSETS:
        action = ensure_asset("generated/visual-ip-showcase", name, title, subtitle)
        stats[action] = stats.get(action, 0) + 1
        print(f"  showcase/{name}: {action}")
    print("Tool assets ready:", stats)
    failed = sum(
        1
        for subdir, items in (
            ("canvas-example-assets", CANVAS_ASSETS),
            ("generated/visual-ip-showcase", SHOWCASE_ASSETS),
        )
        for name, *_ in items
        if not is_valid_image(ASSETS / subdir / name)
    )
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
