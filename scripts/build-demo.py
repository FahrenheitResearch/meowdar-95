#!/usr/bin/env python3
"""Build the self-contained Meowdar 95 interactive visual preview."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def strip_exports(source: str) -> str:
    return re.sub(r"^export\s+", "", source, flags=re.MULTILINE)


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    config = (ROOT / "config.js").read_text(encoding="utf-8")

    quality = strip_exports((ROOT / "scan-quality.js").read_text(encoding="utf-8"))
    quality_bundle = (
        "const { normalizeCuts: assessCuts, availableCuts: selectAvailableCuts, "
        "cutAccepted: qualityCutAccepted } = (() => {\n"
        f"{quality}\nreturn {{ normalizeCuts, availableCuts, cutAccepted }};\n}})();"
    )

    palette = strip_exports((ROOT / "palette-manager.js").read_text(encoding="utf-8"))
    palette_bundle = f"const PaletteManager = (() => {{\n{palette}\nreturn PaletteManager;\n}})();"

    glm = strip_exports((ROOT / "glm-controller.js").read_text(encoding="utf-8"))
    # The self-contained preview is emitted as a classic inline script. Replace
    # the module-only import.meta worker base so the bundle parses everywhere;
    # static preview mode never starts the real decoder worker.
    glm = glm.replace("import.meta.url", "document.baseURI")
    glm_bundle = f"const GlmController = (() => {{\n{glm}\nreturn GlmController;\n}})();"

    app = (ROOT / "app.js").read_text(encoding="utf-8")
    app = re.sub(r"^import\s+.*?;\s*$", "", app, flags=re.MULTILINE)
    bundle = "\n\n".join((quality_bundle, palette_bundle, glm_bundle, app))

    html = re.sub(r'^[ \t]*<link rel="preconnect"[^>]*>[ \t]*\n?', "", html, flags=re.MULTILINE)
    html = re.sub(
        r'^[ \t]*<link rel="stylesheet" href="\./styles\.css">[ \t]*$',
        lambda _: f"  <style>\n{css}\n  </style>",
        html,
        count=1,
        flags=re.MULTILINE,
    )
    html = re.sub(
        r'^[ \t]*<script src="\./config\.js"></script>[ \t]*$',
        lambda _: f"  <script>\n{config}\nwindow.__MEOWDAR_STATIC_PREVIEW__ = true;\n  </script>",
        html,
        count=1,
        flags=re.MULTILINE,
    )
    html = re.sub(
        r'^[ \t]*<script type="module" src="\./app\.js"></script>[ \t]*$',
        lambda _: f"  <script>\nwindow.addEventListener(\"DOMContentLoaded\", () => {{\n{bundle}\n}});\n  </script>",
        html,
        count=1,
        flags=re.MULTILINE,
    )
    html = html.replace(
        'content="Meowdar is a client-rendered professional NEXRAD radar workstation with live low-sweep following, archives, palettes, and optional GLM lightning."',
        'content="Interactive offline preview of Meowdar 95, a professional client-rendered radar workstation."',
    )
    html = html.replace("<title>Meowdar 95</title>", "<title>Meowdar 95 · Interactive Preview</title>")
    output = ROOT / "demo.html"
    output.write_text(html, encoding="utf-8")
    print(f"Wrote {output} ({len(html):,} bytes)")


if __name__ == "__main__":
    main()
