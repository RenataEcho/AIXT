#!/usr/bin/env bash
# 启动 Demo 公网/局域网可访问服务
# 用法: bash serve.sh
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-8900}"

echo "==> 同步最新单文件 Demo..."
python3 "$DIR/../demo/build-standalone.py"
cp "$DIR/../demo/demo-standalone.html" "$DIR/index.html"

echo "==> 启动 HTTP 服务 (0.0.0.0:${PORT}) ..."
cd "$DIR"
python3 -m http.server "$PORT" --bind 0.0.0.0 &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
  kill "$TUNNEL_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

LAN_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "")
echo ""
echo "本地访问:   http://127.0.0.1:${PORT}/"
if [ -n "$LAN_IP" ]; then
  echo "局域网访问: http://${LAN_IP}:${PORT}/"
fi

echo "==> 创建公网隧道 (localtunnel) ..."
npx --yes localtunnel --port "$PORT" &
TUNNEL_PID=$!
sleep 3

echo ""
echo "按 Ctrl+C 停止服务。"
wait
