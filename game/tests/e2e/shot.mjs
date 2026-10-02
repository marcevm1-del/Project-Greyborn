// Usage: node tests/e2e/shot.mjs <url> <out.png> [waitMs]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const [url, out, wait = '3000'] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
p.on('pageerror', (e) => errors.push(String(e)));
await p.goto(url);
await p.waitForTimeout(Number(wait));
await p.screenshot({ path: out });
console.log(JSON.stringify({ errors }));
await b.close();
