#!/usr/bin/env bash
# PostToolUse hook: after Claude edits a TypeScript file under game/src,
# typecheck the game. On failure, exit 2 so the errors go back to Claude.
set -u
input="$(cat)"
file="$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{const j=JSON.parse(s);process.stdout.write((j.tool_input&&j.tool_input.file_path)||"")}catch{process.stdout.write("")}})')"
case "$file" in
  */game/src/*.ts) ;;
  *) exit 0 ;;
esac
cd "${CLAUDE_PROJECT_DIR:-.}/game" || exit 0
[ -d node_modules ] || exit 0
if ! out="$(npx --no-install tsc --noEmit 2>&1)"; then
  printf 'TypeScript errors after editing %s:\n%s\n' "$file" "$(printf '%s' "$out" | head -30)" >&2
  exit 2
fi
exit 0
