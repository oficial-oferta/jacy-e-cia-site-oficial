#!/usr/bin/env python3
"""Gera a versão otimizada e estática do site para publicação no GitHub Pages."""
from pathlib import Path
from PIL import Image, ImageOps
import shutil
import re

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "_site"
if DEST.exists():
    shutil.rmtree(DEST)
DEST.mkdir()
for entry in ROOT.iterdir():
    if entry.name.startswith(".") or entry.name in {"_site", "scripts"}:
        continue
    if entry.is_dir():
        shutil.copytree(entry, DEST / entry.name)
    elif entry.is_file():
        shutil.copy2(entry, DEST / entry.name)

count = 0
for source in (DEST / "assets" / "images").glob("*.jpg"):
    with Image.open(source) as original:
        im = ImageOps.exif_transpose(original).convert("RGB")
        im.thumbnail((1440, 1900), Image.Resampling.LANCZOS)
        target = source.with_suffix(".webp")
        im.save(target, "WEBP", quality=78, method=6)
        count += 1

for page in DEST.rglob("*.html"):
    content = page.read_text(encoding="utf-8")
    content = re.sub(r'(src="[^"]+)\.jpg(")', r'\1.webp\2', content)
    content = re.sub(r'(<link rel="preload" href="[^"]+)\.jpg(")', r'\1.webp\2', content)
    page.write_text(content, encoding="utf-8")

print(f"Site pronto em {DEST} com {count} fotos WebP responsivas por CSS.")
