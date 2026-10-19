# API, SDK, Plugin and Tooling Plan

Deliverable 9 (Phase 7). **Nothing in this file has been installed into
the project** except where stated. "Verified" means the documentation page
was opened on 2026-10-19; it does not mean the tool was tested with
Greyborn.

Priority: **Now** (next 4 weeks) · **Next** (Version B content) · **Later**
(online milestone) · **No** (not recommended).

## 1. Installation and integration table

| Tool / API / Plugin | Purpose | Why We Need It | Compatibility | Cost / Licence | Installation | Priority |
|---|---|---|---|---|---|---|
| **GitHub Actions CI** | Run typecheck + tests on every push | Tests only help if they run automatically | GitHub-hosted Ubuntu runner, Node 22 | Free for public repos | Added in this audit: `.github/workflows/ci.yml` | **Now** |
| **Claude Code project setup** (`CLAUDE.md`, `.claude/skills`, `.claude/agents`, hook) | Consistent AI-assisted work | Stops each session re-deriving the rules | Claude Code | Included in your Claude plan | Added in this audit; see `CLAUDE_WORKFLOW.md` | **Now** |
| **Playtest form** (Jotform, already connected to your Claude account, or Google Forms) | Collect human feedback after each match | The fun is the biggest unknown | Any browser | Free tiers | Create the form (see `DEVELOPMENT_ROADMAP.md` task 2); link it from the results screen | **Now** |
| **itch.io** (HTML5 upload) | Host public playtest builds | Simplest free static hosting for web games; built-in community | Static `dist/` | Free; itch takes an adjustable revenue share on sales | Zip `game/dist/` and upload as an HTML game; or use the `butler` CLI | **Now** |
| **Vercel** (already connected) | Alternative host with preview URLs per branch | Every PR gets a playable link | Static Vite build | Hobby tier is for **non-commercial** use; check terms before monetising | `vercel` CLI or Git import; build command `npm run build`, root `game/`, output `dist` | Next (needs your approval: external service) |
| **Claude Code GitHub Action** | `@claude` on issues/PRs, automated review | Lets you file a bug from your phone and get a PR | GitHub; needs `ANTHROPIC_API_KEY` or `CLAUDE_CODE_OAUTH_TOKEN` secret ([docs](https://code.claude.com/docs/en/github-actions.md)) | API usage or your subscription; Actions minutes | Run `/install-github-app` in Claude Code, or install the Claude GitHub App and copy `examples/claude.yml` | Next |
| **Blender** | Model, rig and animate hero creatures; clean AI-generated meshes; export glTF | Monsters need custom rigs (quadrupeds, wings, tails) | glTF 2.0 → three.js `GLTFLoader` | Free, GPL (outputs are yours) | Download from blender.org | Next (art stage) |
| **Meshy** | Image-to-3D for props, rocks, structures, static creatures | Fast first drafts of assets | GLB export → Blender cleanup → three.js | Free: 100 credits/month, outputs **CC BY 4.0 (attribution required)**; Pro: private licence ([pricing](https://docs.meshy.ai/en/webapp/pricing)) | Web app; API needs a key stored as an environment variable | Next |
| **Tripo AI** | Alternative image/text-to-3D (Vibe Jam sponsor) | Compare quality with Meshy on 3 test assets before paying | GLB | **[unverified]** pricing/licence; check before use | Web app | Next (evaluate) |
| **Mixamo** | Auto-rig and animations | Useful only for the **humanoid Kith Base Form** | FBX → Blender → glTF | Free with Adobe ID; royalty-free in games; **bipedal humanoids only** ([FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html)) | Web app | Next (Base Form only) |
| **Quaternius / CC0 packs** | Placeholder animated creatures | Better wildlife placeholders than code-built ones | glTF | Released by the creator as CC0 **[verify per pack]** ([example pack](https://quaternius.itch.io/ultimate-platformer-pack)) | Download; record in `game/ASSETS.md` first | Next (optional) |
| **recast-navigation-js** (`recast-navigation`, `@recast-navigation/three`) | Navmesh, crowd, temporary obstacles (Bramble Wall, Living Wall) | Grid A* spikes ~14 ms on long paths; Verdant walls change paths at runtime | WASM; browser and Node | **[unverified]** licence (Recast/Detour upstream is zlib) ([npm](https://npmjs.com/package/recast-navigation)) | `npm i recast-navigation @recast-navigation/three` | Next, **only if** the coarse-grid fix in `PROJECT_AUDIT.md` Q9 fails |
| **Colyseus** | Authoritative multiplayer rooms, matchmaking, delta state sync | Runs the existing TS `World` on Node | Node server + JS/TS client | Open source; self-host free or Colyseus Cloud ([docs](https://docs.colyseus.io/)) | `npm create colyseus-app@latest` in a new `server/` folder **[verify command in docs]** | Later |
| **Poki** (portal) | Distribution to a large web-game audience | Discovery is the hardest problem | Poki SDK; web-exclusive | 50/50 on Poki traffic, 100% on your own traffic; free Netlib for multiplayer ([sdk.poki.com](https://sdk.poki.com/)) | Apply after the playtest gates | Later |
| Supabase (connected) | Accounts, profiles, leaderboards | Only once online play exists | JS client | Free tier | — | Later |
| Error reporting (e.g. Sentry) | Crash reports from players | Only once there are outside players | Browser SDK | Free tier | — | Later |
| Prompt-to-game platforms (Rosebud etc.) | Generate games from prompts | — | — | — | — | **No**: the project is past that stage |
| Unity / Unreal / Godot migration | — | — | — | — | — | **No** (see `TECH_STACK.md`) |
| Rapier / cannon physics | Rigid-body physics | Current hand-written movement and knockback are enough and deterministic | — | — | — | **No** for now |

## 2. Security and secrets

- **Never put API keys in `game/`.** Everything in `game/` is shipped to
  every player's browser. A key there is public.
- Keys for build-time tools (Meshy API, Claude Action) go in **GitHub
  Actions secrets** or a local `.env` file that is git-ignored. Check that
  `.gitignore` lists `.env*` before creating one.
- For a future server: secrets as environment variables on the host, read
  with `process.env.NAME`, never logged.
- AI-generated assets: record source, plan, licence and attribution in
  `game/ASSETS.md` **before** committing them (rule already in that file).
  Meshy free-tier assets require attribution.

## 3. What not to add

Redundant physics engines, a second rendering library, state-management
frameworks for the UI, an ECS library, analytics before there are players,
paid services before the playtest gates. Each adds dependencies without
fixing a current problem.
