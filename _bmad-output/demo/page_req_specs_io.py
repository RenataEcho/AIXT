#!/usr/bin/env python3
"""页面需求说明：JSON 数据 ↔ page-req-specs.js 双向同步。"""

from __future__ import annotations

import json
import os
import re
from typing import Any

DEMO_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(DEMO_DIR, "page-req-specs.data.json")
JS_FILE = os.path.join(DEMO_DIR, "page-req-specs.js")

SPEC_FIELDS = ("title", "mainFunctions", "functionPoints", "fields", "rules", "interactions")


def _js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def _js_key(key: str) -> str:
    if re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", key):
        return key
    return json.dumps(key, ensure_ascii=False)


def load_data() -> dict[str, Any]:
    with open(DATA_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_data(data: dict[str, Any]) -> None:
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def update_page_spec(page_key: str, spec: dict[str, Any]) -> dict[str, Any]:
    data = load_data()
    specs = data.setdefault("specs", {})
    current = dict(specs.get(page_key) or {})
    for field in SPEC_FIELDS:
        if field in spec:
            current[field] = spec[field]
    if "title" not in current and spec.get("title"):
        current["title"] = spec["title"]
    specs[page_key] = current
    save_data(data)
    return data


def render_js(data: dict[str, Any]) -> str:
    specs = data.get("specs") or {}
    meta = data.get("meta") or {}
    sections = data.get("sections") or []
    storage_prefix = data.get("storagePrefix") or "aixt-demo-page-req:"
    trigger_keys = data.get("triggerKeys") or []

    lines: list[str] = [
        "/**",
        " * 一级/子页面需求说明默认内容",
        " * 自动生成 · 数据源 page-req-specs.data.json（Demo 内保存会同步更新）",
        " * 更新：2026-07-07 · 同步 prd-功能清单-按菜单切割 + 增量 Excel",
        " */",
        "window.PAGE_REQ_SPECS = {",
    ]

    for i, (key, spec) in enumerate(specs.items()):
        comma = "," if i < len(specs) - 1 else ""
        lines.append(f"  {_js_key(key)}: {{")
        lines.append(f"    title: {_js_string(spec.get('title', ''))},")
        lines.append(f"    mainFunctions: {_js_string(spec.get('mainFunctions', ''))},")
        lines.append(f"    functionPoints: {_js_string(spec.get('functionPoints', ''))},")
        lines.append(f"    fields: {_js_string(spec.get('fields', ''))},")
        lines.append(f"    rules: {_js_string(spec.get('rules', ''))},")
        lines.append(f"    interactions: {_js_string(spec.get('interactions', ''))},")
        lines.append(f"  }}{comma}")

    lines.append("};")
    lines.append("")
    lines.append("/** 页面需求说明 · 路由 meta（含子页） */")
    lines.append("window.PAGE_REQ_META = {")
    meta_items = list(meta.items())
    for i, (key, item) in enumerate(meta_items):
        comma = "," if i < len(meta_items) - 1 else ""
        no = item.get("no", "")
        label = item.get("label", "")
        no_repr = json.dumps(no, ensure_ascii=False) if isinstance(no, str) else str(no)
        lines.append(
            f"  {_js_key(key)}: {{ no: {no_repr}, label: {_js_string(label)} }}{comma}"
        )
    lines.append("};")
    lines.append("")
    lines.append("window.PAGE_REQ_SECTIONS = [")
    for i, sec in enumerate(sections):
        comma = "," if i < len(sections) - 1 else ""
        lines.append(
            f"  {{ key: {_js_string(sec.get('key', ''))}, label: {_js_string(sec.get('label', ''))} }}{comma}"
        )
    lines.append("];")
    lines.append("")
    lines.append(f"window.PAGE_REQ_STORAGE_PREFIX = {_js_string(storage_prefix)};")
    lines.append("")
    lines.append("/** 展示「页面需求说明」按钮的路由 key 列表 */")
    lines.append("window.PAGE_REQ_TRIGGER_KEYS = [")
    for i, key in enumerate(trigger_keys):
        comma = "," if i < len(trigger_keys) - 1 else ""
        lines.append(f"  {_js_string(key)}{comma}")
    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def write_js_file(data: dict[str, Any] | None = None) -> str:
    payload = data if data is not None else load_data()
    content = render_js(payload)
    with open(JS_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    return JS_FILE


def sync_page_spec(page_key: str, spec: dict[str, Any]) -> str:
    data = update_page_spec(page_key, spec)
    return write_js_file(data)


if __name__ == "__main__":
    write_js_file()
    print(f"OK: {JS_FILE}")
