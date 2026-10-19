// Automated browser playtest. Usage: node tests/e2e/smoke.mjs [url] [outDir]
// Starts a match, drives the player with real key/mouse input, takes screenshots,
// then fast-forwards a full autopiloted match and checks it ends cleanly.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const url = process.argv[2] ?? 'http://localhost:5173/';
const out = process.argv[3] ?? 'test-results';
import { mkdirSync } from 'fs';
mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
p.on('pageerror', (e) => errors.push(String(e)));
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'} ${name} ${detail}`); };

// software rendering in CI: use low quality so the test runs at a usable frame rate
await p.goto(url);
await p.evaluate(() => localStorage.setItem('greyborn.settings', JSON.stringify({ quality: 'low', showFps: true })));
await p.reload();
await p.waitForFunction(() => window.greyborn && window.greyborn.state() === 'title', null, { timeout: 30000 });
check('title screen loads', true);
await p.screenshot({ path: `${out}/01-title.png` });

// settings persist across a reload (change FOV through the real settings screen)
await p.click('text=Settings');
await p.$eval('input[data-k="fov"]', (el) => { el.value = '75'; el.dispatchEvent(new Event('input', { bubbles: true })); });
await p.click('button:has-text("Done")');
await p.reload();
await p.waitForFunction(() => window.greyborn && window.greyborn.state() === 'title', null, { timeout: 60000 });
const fov = await p.evaluate(() => JSON.parse(localStorage.getItem('greyborn.settings')).fov);
check('settings persist across reload', fov === 75, `fov ${fov}`);
// corrupt saved settings must not break startup
await p.evaluate(() => localStorage.setItem('greyborn.settings', '{not json'));
await p.reload();
const ok = await p.waitForFunction(() => window.greyborn && window.greyborn.state() === 'title', null, { timeout: 60000 }).then(() => true, () => false);
check('corrupt settings fall back to defaults', ok);
await p.evaluate(() => localStorage.setItem('greyborn.settings', JSON.stringify({ quality: 'low', showFps: true })));
await p.reload();
await p.waitForFunction(() => window.greyborn && window.greyborn.state() === 'title', null, { timeout: 60000 });

// start through the real menu
await p.click('text=Play · 4v4 vs bots');
await p.click('.card[data-l="Brawler"]');
await p.click('text=Bud into the world');
await p.waitForFunction(() => window.greyborn.state() === 'playing');
check('match starts from menu', true);
await p.waitForTimeout(1500);
const start = await p.evaluate(() => ({ p: window.greyborn.player(), t: window.greyborn.world().time }));
await p.keyboard.down('KeyW');
await p.waitForFunction((t) => window.greyborn.world().time > t + 1.5, start.t, { timeout: 120000 });
await p.keyboard.up('KeyW');
const moved = await p.evaluate(() => ({ p: window.greyborn.player(), t: window.greyborn.world().time }));
const dist = Math.hypot(moved.p.pos.x - start.p.pos.x, moved.p.pos.z - start.p.pos.z);
const speed = dist / (moved.t - start.t);
check('WASD moves the player at about Base Form speed', speed > 3 && speed < 8, `${speed.toFixed(2)} m/s of game time`);
await p.screenshot({ path: `${out}/02-playing.png` });
// turn the camera and attack
await p.evaluate(() => window.greyborn.look(400, 0));
await p.mouse.move(640, 360);
await p.mouse.down(); await p.waitForTimeout(800); await p.mouse.up();
await p.keyboard.press('Space');
await p.waitForTimeout(500);
check('no errors after combat input', errors.length === 0, errors.slice(0, 3).join(' | '));
const perf = await p.evaluate(() => window.greyborn.perf());
check('perf stats available', !!perf, JSON.stringify(perf));
// pause menu
await p.keyboard.press('Escape');
await p.waitForTimeout(300);
check('Esc pauses', await p.evaluate(() => window.greyborn.state()) === 'paused');
await p.screenshot({ path: `${out}/03-paused.png` });
await p.click('button:has-text("Resume")');
await p.waitForTimeout(300);
check('resume works', await p.evaluate(() => window.greyborn.state()) === 'playing');

// autopilot the player and fast-forward the rest of the match (simulation only; rendering
// under software WebGL is too slow to watch a whole match), taking screenshots along the way
await p.evaluate(() => window.greyborn.autopilot());
let shots = 0;
for (let i = 0; i < 200; i++) {
  const t = await p.evaluate(() => window.greyborn.fastForward(30));
  if (t > 200 * (shots + 1) && shots < 3) { await p.waitForTimeout(1500); await p.screenshot({ path: `${out}/0${4 + shots}-t${Math.round(t)}.png` }); shots++; }
  if (await p.evaluate(() => window.greyborn.state()) === 'ended') break;
}
console.log('match state', JSON.stringify(await p.evaluate(() => ({ t: window.greyborn.world().time, p: window.greyborn.player() }))));
const end = await p.evaluate(() => ({ state: window.greyborn.state(), result: window.greyborn.world().result, p: window.greyborn.player() }));
check('full match ends with a result', end.state === 'ended' && !!end.result, JSON.stringify(end.result));
check('player progressed', end.p.level >= 5, `level ${end.p.level}`);
await p.screenshot({ path: `${out}/09-results.png` });
check('no console errors during the match', errors.length === 0, errors.slice(0, 5).join(' | '));
await b.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
