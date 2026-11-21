"""
Resize the original event photos in assets-src/ into web-sized JPEGs under
public/images/events/<slug>/ and write a manifest of the results.

    python3 scripts/optimize_assets.py

assets-src/ holds the full-resolution originals (gitignored, never deployed).
Re-running is safe: outputs are regenerated.
"""
import json
import os
import re
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "assets-src"
DEST_DIR = ROOT / "public" / "images" / "events"
MANIFEST = DEST_DIR / "manifest.json"

FOLDERS = {
    "Aksa & Jinu": "aksa-jinu",
    "Ashik & Afna": "ashik-afna",
    "Jincy & Sinu": "jincy-sinu",
    "Ruba & Manoop": "ruba-manoop",
}
IMAGE_EXT = {".jpg", ".jpeg", ".png"}
MAX_DIM = 2000
QUALITY = 82

# Full-bleed site images, cut from the high-res originals so they stay sharp
# on large screens. (source, aspect w/h, focus y 0–1, output width[, zoom, focus x])
SITE_DIR = ROOT / "public" / "images" / "site"
SITE_CROPS = {
    # Chosen by the client. Only 1080x1350, so it is kept uncropped (aspect None),
    # upscaled 2x with Lanczos + light sharpening (far crisper than the browser's
    # own stretch on wide screens), and framed by the hero's CSS object-position.
    "home-hero": ("Ruba & Manoop/11.jpg", None, 0, 0),
    "about-hero": ("Jincy & Sinu/AJA09770.JPG", 16 / 9, 0.5, 2560),
    "contact-hero": ("Aksa & Jinu/AJA05907.JPG", 4 / 3, 0.5, 1800),
    # Home "Atelier" block: the right half is covered by a floating photo, so the
    # subject is placed in the left half of the frame.
    "home-atelier": ("Ashik & Afna/19.jpg", 16 / 10, 0.60, 1800),
}


def crop_site_images() -> None:
    SITE_DIR.mkdir(parents=True, exist_ok=True)
    for name, spec in SITE_CROPS.items():
        src, aspect, focus_y, out_w = spec[:4]
        zoom, focus_x = (spec[4], spec[5]) if len(spec) > 4 else (1.0, 0.5)
        with Image.open(SRC_DIR / src) as img:
            img = ImageOps.exif_transpose(img).convert("RGB")
            if aspect is None:  # low-res source: enhance instead of cropping
                img = img.resize((img.width * 2, img.height * 2), Image.Resampling.LANCZOS)
                img = img.filter(ImageFilter.UnsharpMask(radius=2.2, percent=70, threshold=2))
                img = ImageEnhance.Contrast(img).enhance(1.03)
                img.save(SITE_DIR / f"{name}.jpg", "JPEG", quality=92, optimize=True, progressive=True)
                print(f"site/{name}.jpg ← {src} ({img.size[0]}x{img.size[1]}, upscaled + sharpened)")
                continue
            w, h = img.size
            # largest box of this aspect that fits, shrunk by zoom
            cw, ch = (int(h * aspect), h) if w / h > aspect else (w, int(w / aspect))
            cw, ch = int(cw / zoom), int(ch / zoom)
            left = int(max(0, min(w - cw, focus_x * w - cw / 2)))
            top = int(max(0, min(h - ch, focus_y * h - ch / 2)))
            img = img.crop((left, top, left + cw, top + ch))
            img = img.resize((out_w, int(out_w / aspect)), Image.Resampling.LANCZOS)
            img.save(SITE_DIR / f"{name}.jpg", "JPEG", quality=86, optimize=True, progressive=True)
            print(f"site/{name}.jpg ← {src} ({img.size[0]}x{img.size[1]})")


def clean_name(filename: str) -> str:
    stem = filename
    # strip every image extension ("IMG_7363.JPG.jpeg" -> "IMG_7363")
    while Path(stem).suffix.lower() in IMAGE_EXT:
        stem = Path(stem).stem
    stem = re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")
    return f"{stem}.jpg"


def optimize(src: Path, dest: Path) -> tuple[int, int]:
    with Image.open(src) as img:
        img = ImageOps.exif_transpose(img)  # apply camera rotation, all 8 cases
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.thumbnail((MAX_DIM, MAX_DIM), Image.Resampling.LANCZOS)
        img.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        return img.size


def main() -> None:
    manifest: dict[str, list[dict]] = {}
    for folder, slug in FOLDERS.items():
        src_folder = SRC_DIR / folder
        if not src_folder.is_dir():
            print(f"skip: {src_folder} not found")
            continue
        dest_folder = DEST_DIR / slug
        dest_folder.mkdir(parents=True, exist_ok=True)
        entries = []
        for f in sorted(os.listdir(src_folder)):
            if Path(f).suffix.lower() not in IMAGE_EXT:
                continue
            name = clean_name(f)
            try:
                w, h = optimize(src_folder / f, dest_folder / name)
            except Exception as e:  # noqa: BLE001 — report and keep going
                print(f"error: {folder}/{f}: {e}")
                continue
            entries.append({"src": f"/images/events/{slug}/{name}", "w": w, "h": h})
        manifest[slug] = entries
        print(f"{slug}: {len(entries)} images")

    MANIFEST.write_text(json.dumps(manifest, indent=2))
    print(f"manifest → {MANIFEST.relative_to(ROOT)}")
    crop_site_images()


if __name__ == "__main__":
    main()
