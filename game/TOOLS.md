# Tools and environment

What was actually found and verified in the development environment on
2026-10-02/03. "Verified" means it was run here, not just listed.

## Machine

| Item | Value | How checked |
|---|---|---|
| OS | Ubuntu 24.04.4 LTS (Linux 6.18, x86-64), cloud container | `/etc/os-release`, `uname` |
| CPU | 4 cores | `nproc` |
| RAM | 15 GiB | `free -h` |
| Disk | ~30 GB free | `df -h` |
| GPU | **None** (no `/dev/dri`) | `ls /dev/dri` |
| Display | None; headless only | — |

The lack of a GPU drives two decisions: rendering is verified with Chromium's
**SwiftShader** (a CPU WebGL implementation), and frame-rate numbers measured
here are **not** representative of real hardware (see `PERFORMANCE.md`).

## Languages, runtimes and build tools

| Tool | Version | Status |
|---|---|---|
| Node.js / npm | 22.22.0 / 10.9.4 | Verified (used for everything in `game/`) |
| TypeScript | 5.x (project), 6.0 global | Verified (`npm run typecheck`) |
| Vite | 8.3.2 | Verified (dev server, production build, preview) |
| Vitest | 5.0.3 | Verified (`npm test`) |
| three.js | 0.186.1 | Verified (renders in headless Chromium) |
| Python | 3.11.15 | Verified (tuning export, match simulator) |
| openpyxl | installed via pip | Verified |
| LibreOffice Calc | 24.2 (installed via apt during the session) | Verified (spreadsheet recalculation) |
| Git | 2.43.0 | Verified |
| GCC / CMake / Rust | 13.3 / 3.28 / 1.97 | Present, not used |
| ffmpeg | 6.1.1 | Present, not used yet (possible use: gameplay video capture) |
| Playwright + Chromium | 1.56.1 / Chromium 1194 at `/opt/pw-browsers` | Verified (automated playtests, screenshots) |
| WebGL 2 in headless Chromium | ANGLE → Vulkan → SwiftShader | Verified |

## Game engines

| Engine | Status |
|---|---|
| Unreal Engine | Not installed; not available for Linux headless use here |
| Unity | Not installed |
| Godot 4 | Not installed; the 4.4.1 download from GitHub was reachable (not downloaded) |
| Blender | Not installed |
| **three.js (WebGL 2)** | **Chosen** (see `ARCHITECTURE.md`) |

## Skills available to the studio (Claude Code)

| Skill | Used for |
|---|---|
| `xlsx` | Building and recalculating `spec/greyborn-tuning.xlsx` |
| `run` | Launching the app (patterns used directly via Playwright) |
| `code-review`, `security-review`, `simplify` | Available for review passes |
| `dataviz`, `artifact-*`, `docx`, `pdf`, `pptx` | Available; not needed so far |

No game-engine, 3D-modelling, shader or audio-specific skills were found.

## Connectors / MCP servers listed in the session

| Connector | Relevance | Status |
|---|---|---|
| GitHub (scoped to `marcevm1-del/project-greyborn`) | Repository, PRs | Available; pushing uses git directly |
| Canva (incl. image generation) | Possible concept art | Available, **not used** (licensing and account implications; would need the director's go-ahead) |
| Figma, Miro | Design boards | Available, not used |
| Vercel | Could host the web build | Available, **not used**: creating deployments is an external, potentially paid action that needs the director's approval |
| Supabase | Possible future backend (accounts, matchmaking) | Available, not used |
| Gmail, Google Calendar, Google Drive, Jotform, LILT | Not relevant | Not used |
| 3D-asset generation | — | **None available** |
| Audio generation | — | **None available** (all audio is synthesised in code) |

No credentials were created, requested or stored for this project.
