// Browser checks for the Version B additions: lineage screen with four lineages and the
// difficulty selector, First Life objectives, the Level 10 branch prompt, the Hollow and
// Verdant models. Usage: node tests/e2e/versionB.mjs [url] [outDir]
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';
const url = process.argv[2] ?? 'http://localhost:5173/';
const out = process.argv[3] ?? 'test-results';
mkdirSync(out, { recursive: true });
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
p.on('pageerror', (e) => errors.push(String(e)));
let failed = 0;
const check = (name, ok, detail = '') => { if (!ok) failed++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name} ${detail}`); };
const ready = () => p.waitForFunction(() => window.greyborn && window.greyborn.state() === 'title', null, { timeout: 60000 });

await p.goto(url);
await p.evaluate(() => { localStorage.clear(); localStorage.setItem('greyborn.settings', JSON.stringify({ quality: 'low' })); });
await p.reload();
await ready();
await p.click('text=Play · 4v4 vs bots');
check('four lineage cards', (await p.$$('.card')).length === 4);
check('difficulty selector', (await p.$$('[data-d]')).length === 3);
await p.click('[data-d="Hard"]');
check('First Life is the suggested start for a new profile', await p.$eval('[data-a=first]', (e) => e.classList.contains('primary')));
await p.click('.card[data-l="Hollow"]');
await p.screenshot({ path: `${out}/b1-lineages.png` });

// First Life
await p.click('[data-a=first]');
await p.waitForFunction(() => window.greyborn.state() === 'playing');
await p.waitForTimeout(800);
const obj = await p.$eval('.objective', (e) => !e.classList.contains('hidden') && e.textContent);
check('First Life shows an objective', !!obj && obj.includes('Move'), String(obj).slice(0, 40));
await p.keyboard.down('KeyW');
await p.waitForFunction(() => document.querySelector('.objective')?.textContent?.includes('Eat three'), null, { timeout: 120000 }).catch(() => {});
await p.keyboard.up('KeyW');
const obj2 = await p.$eval('.objective', (e) => e.textContent);
check('moving advances to the hunt step', obj2.includes('Eat three'), obj2.slice(0, 40));
check('a marker points at prey', await p.$eval('.marker', (e) => !e.classList.contains('hidden')));
await p.screenshot({ path: `${out}/b2-firstlife.png` });
await p.keyboard.press('Enter');
await p.waitForTimeout(500);
check('Enter skips to the match', await p.$eval('.objective', (e) => e.classList.contains('hidden')));
check('profile remembers First Life', await p.evaluate(() => JSON.parse(localStorage.getItem('greyborn.profile')).firstLifeDone === true));

// Stage 2 Hollow: branch prompt, Synergy line, icons
await p.evaluate(() => window.greyborn.grantExp(2500));
await p.evaluate(() => window.greyborn.fastForward(2));
await p.waitForTimeout(800);
check('branch prompt at Level 10', await p.$eval('.branch', (e) => !e.classList.contains('hidden')));
check('Synergy indicator names Void Garden', (await p.$eval('.synergy', (e) => e.textContent)).includes('Void Garden'));
check('ability icons are SVG', (await p.$$('.ab .icon svg')).length >= 3);
await p.screenshot({ path: `${out}/b3-hollow-stage2.png` });
await p.keyboard.press('Digit2');
await p.evaluate(() => window.greyborn.fastForward(0.2));
await p.waitForTimeout(400);
check('pressing 2 picks Tactical', await p.evaluate(() => window.greyborn.world().player.branch === 'Tactical'));
// cast Void Rift and look at it
await p.keyboard.press('KeyQ');
const rift = await p.waitForFunction(() => window.greyborn.world().zones.some((z) => z.kind === 'rift'), null, { timeout: 15000 }).then(() => true, () => false);
check('Void Rift zone exists', rift);
await p.screenshot({ path: `${out}/b4-rift.png` });

// Verdant with a Bramble Wall
await p.evaluate(() => window.greyborn.start('Verdant'));
await p.waitForTimeout(500);
await p.evaluate(() => window.greyborn.grantExp(900));
await p.evaluate(() => window.greyborn.fastForward(2));
await p.keyboard.press('KeyQ');
const wall = await p.waitForFunction(() => window.greyborn.world().walls.length > 0, null, { timeout: 15000 }).then(() => true, () => false);
await p.waitForTimeout(600);
check('Bramble Wall exists', wall);
await p.screenshot({ path: `${out}/b5-verdant-wall.png` });
check('no console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
await b.close();
console.log(failed ? `${failed} checks failed` : 'all checks passed');
process.exit(failed ? 1 : 0);
