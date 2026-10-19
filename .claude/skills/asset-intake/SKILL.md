---
name: asset-intake
description: Bring an external or AI-generated 3D model, texture or sound into the Greyborn game safely - licence check, naming, scale, polygon and texture budgets, glTF conversion and the ASSETS.md record. Use whenever a .glb/.gltf/.fbx/.png/.wav/.ogg file is about to be added to game/.
argument-hint: "[file path] [source / tool / licence]"
disable-model-invocation: true
---

# Asset intake: $ARGUMENTS

## 1. Licence first

Refuse to continue until these are known: source (site or tool), creator,
licence, attribution text, commercial use allowed?, modification allowed?
- Meshy free plan → CC BY 4.0 (attribution required). Paid plans → private.
- Mixamo → royalty-free, humanoid rigs only.
- Unclear or non-commercial licence → **do not add**.

## 2. Standards

| Item | Rule |
|---|---|
| Format | glTF 2.0 binary (`.glb`) |
| Units / scale | 1 unit = 1 m; creature height matches form size (Base Form 1 m, Stage 1 2 m, Stage 2 4 m, Stage 3 7.5 m) |
| Orientation | +Z forward, Y up; origin at the feet |
| Naming | `<side>_<lineage>_s<stage>.glb` (e.g. `wild_titan_s3.glb`), wildlife `wl_<species>.glb`, props `prop_<name>.glb` |
| Budget | Ascendant ≤ 15k triangles at Stage 3, wildlife ≤ 4k, props ≤ 1k; one 1024² texture per creature |
| Rig | Bones named consistently per lineage; weak point bone named `weak_point` |
| Materials | `MeshStandardMaterial`-compatible; emissive only for meaning (amber planet, cyan Murmur) |

## 3. Steps

1. Put the file in `game/public/assets/<type>/`.
2. Check triangle count and bounds (load it with three.js `GLTFLoader` in
   a small Node/Vitest script or inspect in Blender).
3. Record it in `game/ASSETS.md` (source, creator, licence, URL,
   modification rights, status) **in the same commit**.
4. Screenshot it in-game next to the procedural version; check readability
   at Stage 3 distance.
