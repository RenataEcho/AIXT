#!/usr/bin/env bash
# 本地编辑 Demo（含页面需求说明落盘）开发服务
# 用法: bash serve-dev.sh
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8800}"

python3 "$DIR/page_req_specs_io.py"
python3 "$DIR/serve-demo.py" --port "$PORT" --host 0.0.0.0
