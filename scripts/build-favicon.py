"""
Baut das LAVIK-Favicon aus dem Transparent-Logo:
- Inverse: schwarze Outlines werden weiß (auf transparentem Alpha)
- Auf dunklem Brand-Hintergrund (#0A1411) zentriert
- Padding rundum, abgerundete Ecken
- 512 x 512 PNG → wird als app/icon.png gespeichert

Aufruf:
    python scripts/build-favicon.py <pfad-zum-quell-logo.png>
"""

import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python build-favicon.py <source-logo.png>", file=sys.stderr)
        sys.exit(1)

    src_path = Path(sys.argv[1])
    if not src_path.exists():
        print(f"Source not found: {src_path}", file=sys.stderr)
        sys.exit(1)

    project_root = Path(__file__).resolve().parent.parent
    out_path = project_root / "app" / "icon.png"
    apple_out_path = project_root / "app" / "apple-icon.png"

    size = 512
    bg_color = (10, 20, 17, 255)       # #0A1411 — brand deep
    logo_color = (242, 245, 244, 255)  # #F2F5F4 — brand light
    padding = 96                        # space around the logo

    src = Image.open(src_path).convert("RGBA")

    # Quelle hat dünne schwarze Outline auf transparentem Hintergrund.
    # Pixel mit Alpha > 0 als Logo behandeln und mit Brand-Hellgrau einfärben.
    pixels = src.load()
    w, h = src.size
    if pixels is None:
        print("Could not load image pixels", file=sys.stderr)
        sys.exit(1)
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # nur sichtbare Pixel umfärben
            if a > 20:
                # Linie kommt aus dunklem Outline (R,G,B ~ 0). Wir machen sie hell.
                # Alpha bleibt, damit Anti-Aliasing erhalten bleibt.
                pixels[x, y] = (
                    logo_color[0],
                    logo_color[1],
                    logo_color[2],
                    a,
                )

    # Original-Outline ist dünn — leichten Bloom drauflegen für bessere Lesbarkeit
    glow = src.filter(ImageFilter.GaussianBlur(radius=2))

    # Zielleinwand mit Brand-Hintergrund + abgerundete Ecken (Maske)
    canvas = Image.new("RGBA", (size, size), bg_color)

    # Logo so skalieren, dass es ins Padding passt
    target = size - 2 * padding
    src_ratio = w / h
    if src_ratio >= 1:
        new_w = target
        new_h = int(target / src_ratio)
    else:
        new_h = target
        new_w = int(target * src_ratio)

    glow_resized = glow.resize((new_w, new_h), Image.LANCZOS)
    logo_resized = src.resize((new_w, new_h), Image.LANCZOS)

    # Bloom unter dem Logo platzieren (weicher Schein)
    offset = ((size - new_w) // 2, (size - new_h) // 2)
    canvas.alpha_composite(glow_resized, offset)
    canvas.alpha_composite(logo_resized, offset)

    # Abgerundete Ecken
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    radius = 96
    mask_draw.rounded_rectangle((0, 0, size, size), radius=radius, fill=255)
    rounded = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    rounded.paste(canvas, (0, 0), mask)

    out_path.parent.mkdir(parents=True, exist_ok=True)
    rounded.save(out_path, "PNG", optimize=True)
    rounded.save(apple_out_path, "PNG", optimize=True)

    print(f"OK: {out_path}  ({out_path.stat().st_size // 1024} KB)")
    print(f"OK: {apple_out_path}  ({apple_out_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
