// Greedy-player balance bot: never releases a Hue, spends every Art it can.
// Usage: npm i playwright && node prototype/tools/greedy-bot.mjs [seconds]
// Prints the playtest metrics, peak Stain and whether Overcolour/Husking happened.
import { chromium } from 'playwright';
const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const pg = await b.newPage({ viewport: { width: 1100, height: 900 } });
const errs = []; pg.on('pageerror', e => errs.push(e.message));
await pg.goto(new URL('../index.html', import.meta.url).href);
await pg.click('#game'); await pg.waitForTimeout(300);
// In-page bot driving synthetic key events every frame.
const result = await pg.evaluate(async (SECONDS) => {
  const G = window.greyborn, down = new Set();
  const key = (code, on) => { if (on === down.has(code)) return; on ? down.add(code) : down.delete(code); dispatchEvent(new KeyboardEvent(on ? 'keydown' : 'keyup', { code })); };
  const tap = (code) => { key(code, true); setTimeout(() => key(code, false), 30); };
  const samples = []; let maxStain = 0, sawHue = new Set(), sawOver = false;
  const t0 = performance.now(); let lastAct = 0;
  while (performance.now() - t0 < SECONDS * 1000) {
    await new Promise(r => requestAnimationFrame(r));
    const p = G.player, now = performance.now();
    if (p.state === 'dead') { key('KeyD', false); key('KeyA', false); continue; }
    if (p.vessel) sawHue.add(p.vessel.hue);
    if (p.overcolour > 0) sawOver = true;
    maxStain = Math.max(maxStain, p.stain.crimson, p.stain.azure);
    const pcx = p.x + p.w / 2;
    const live = G.enemies.filter(e => !e.dead);
    if (!live.length) { key('KeyD', false); key('KeyA', false); continue; }
    const e = live.sort((a, b) => Math.abs(a.x - pcx) - Math.abs(b.x - pcx))[0];
    const dx = (e.x + e.w / 2) - pcx, dist = Math.abs(dx);
    const dir = Math.sign(dx);
    const want = dist > 70 ? dir : 0;
    key('KeyD', want > 0); key('KeyA', want < 0);
    if (now - lastAct < 90) continue;
    lastAct = now;
    if (e.state === 'flared' && dist < 95) { tap('KeyE'); continue; }
    if (e.state === 'windup' && dist < 140 && e.t > e.d.windup - 0.14) { tap(e.d.parryable ? 'KeyL' : 'KeyK'); continue; }
    if (p.vessel && p.vessel.sat >= 25 && dist < 120) { tap('KeyI'); continue; }
    if (p.hp < 40 && p.mend > 0 && dist > 150) { tap('KeyH'); continue; }
    if (dist < 85) { if ((p.x + p.w/2 < e.x + e.w/2) !== (p.face > 0)) { key(dir > 0 ? 'KeyD':'KeyA', true); } tap('KeyJ'); }
  }
  for (const c of [...down]) key(c, false);
  return { metrics: { ...G.metrics }, maxStain: Math.round(maxStain), sawHue: [...sawHue], sawOver, residue: { ...G.player.residue } };
}, Number(process.argv[2] || 60));
console.log(JSON.stringify(result));
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
