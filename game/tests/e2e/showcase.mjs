// Visual QA: screenshots of each lineage at each form. Usage: node tests/e2e/showcase.mjs <url> <outDir>
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
const [url = 'http://localhost:4173/', out = 'test-results/showcase'] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const errors = [];
for (const lineage of ['Brawler', 'Titan']) {
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  p.on('pageerror', (e) => errors.push(String(e)));
  await p.addInitScript(() => localStorage.setItem('greyborn.settings', JSON.stringify({ quality: 'medium' })));
  await p.goto(url);
  await p.waitForFunction(() => window.greyborn && window.greyborn.state() === 'title');
  await p.evaluate((l) => window.greyborn.start(l), lineage);
  for (const [exp, label] of [[0, 'base'], [230, 'stage1'], [1700, 'stage2'], [5400, 'stage3']]) {
    await p.evaluate((n) => { window.greyborn.grantExp(n); }, exp);
    const t = await p.evaluate(() => window.greyborn.world().time);
    await p.waitForFunction((t0) => window.greyborn.world().time > t0 + 2.2, t, { timeout: 120000 });
    await p.evaluate(() => window.greyborn.look(-900, 60)); // swing the camera round to see the front
    const t2 = await p.evaluate(() => window.greyborn.world().time);
    await p.waitForFunction((t0) => window.greyborn.world().time > t0 + 0.6, t2, { timeout: 60000 });
    await p.screenshot({ path: `${out}/${lineage}-${label}.png` });
    await p.evaluate(() => window.greyborn.look(900, -60));
  }
  await p.close();
}
console.log(JSON.stringify({ errors }));
await b.close();
