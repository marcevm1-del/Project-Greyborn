# Release checklist

Tick an item only when it has been verified on the build being released.
Status below is for **v0.1.0 (Milestone 1 vertical slice)**, which is a
development build, not a release.

| # | Check | How to verify | v0.1.0 |
|---|---|---|---|
| 1 | No critical crashes | Automated playtest finishes a full match with no page errors | See `TESTING.md` |
| 2 | No blocking gameplay bugs | Manual playthrough on real hardware + automated playtest | Automated only; manual pass on real hardware **not done** |
| 3 | Save system works | Settings and profile persist across reloads; corrupt data falls back | Unit-level logic written; browser persistence **unverified** by test |
| 4 | Settings work | Each setting changes behaviour and survives reload | Partially verified (quality, FPS overlay via stored settings) |
| 5 | Controls work | Keyboard, mouse, gamepad; rebinding | Keyboard/mouse verified by automated input; **gamepad unverified** (no device) |
| 6 | UI works | All screens reachable and usable at 1280×720 and on small screens | Title, select, pause, results verified at 1280×720 |
| 7 | Audio works | Sounds play, volumes apply, no clipping | **Unverified** (headless browser has no audio output) |
| 8 | Assets load | No missing resources; no 404s | Verified (no console errors) |
| 9 | Performance acceptable | ≥ 60 fps on target hardware at High | **Unverified** (no GPU here; see `PERFORMANCE.md`) |
| 10 | Build launches | `npm run build` + static host | Verified with `vite preview` |
| 11 | Dependencies documented | `README.md`, `TOOLS.md` | Done |
| 12 | Licences documented | `ASSETS.md` | Done |
| 13 | Known issues documented | `KNOWN_ISSUES.md` | Done |
| 14 | Version and changelog updated | `package.json`, `CHANGELOG.md` | Done for 0.1.0 |
