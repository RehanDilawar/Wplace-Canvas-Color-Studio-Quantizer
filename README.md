<p align="center">
  <img src="icon.svg" width="128" height="128" alt="Wplace Color Studio Logo" />
</p>

<h1 align="center">Wplace Canvas Color Studio & Quantizer</h1>

<p align="center">
  <b>The ultimate artwork converter, color quantizer, and image ditherer built specifically for <a href="https://wplace.live">wplace.live</a> pixel art canvas.</b>
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,canvas,vscode,git,github" alt="Tech Stack Icons" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Wplace-64%20Official%20Colors-7c3aed?style=for-the-badge&logo=artstation" alt="Wplace Palette Badge" />
  <img src="https://img.shields.io/badge/Free%20Palette-IDs%201--31-22c55e?style=for-the-badge" alt="Free Colors Badge" />
  <img src="https://img.shields.io/badge/Dithering-7%20Algorithms-3b82f6?style=for-the-badge" alt="Dithering Algorithms Badge" />
  <img src="https://img.shields.io/badge/Color%20Space-OKLab%20Perceptual-ec4899?style=for-the-badge" alt="OKLab Badge" />
  <img src="https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge" alt="License Badge" />
</p>

---

## 🌟 Key Features

- 🎨 **Exact 64 Wplace Palette Support**: Built-in support for all 64 official Wplace colors (`#000000` to `#CDA4BE`), mapped with exact OKLab color space values for ultra-accurate human perceptual matching.
- 🆓 **Free Palette Mode (IDs 1–31)**: One-click toggle to restrict image conversion strictly to the 31 basic free Wplace colors (ideal for users without unlocked premium droplet colors).
- 🧩 **Custom Palette Manager**: Check/uncheck individual colors to match your exact unlocked color inventory on Wplace.
- 🌫️ **7 Dithering Algorithms**:
  - **Floyd-Steinberg** (Smooth Error Diffusion)
  - **Atkinson** (Classic High-Contrast Pixel Art)
  - **Bayer 4x4** (Ordered Grid Pattern)
  - **Bayer 8x8** (Fine Grid Pattern)
  - **Sierra** (Soft Error Diffusion)
  - **Burkes** (Sharp Error Diffusion)
  - **None** (Direct Nearest Color Quantization)
- 🧪 **Interactive Eyedropper & Manual Color Remapping**: Click any pixel in your source image to pick its color and force-remap it to a specific Wplace color swatch.
- ⇄ **Interactive Split Slider & Multi-View**: Compare original vs. processed images seamlessly with a drag-handle split slider, side-by-side dual view, or single view modes.
- 🔍 **Pixel Inspection & Zoom**: Smooth mouse-wheel zooming, click-and-drag panning, 1:1 pixel grid, and Fit-to-Screen modes.
- 📊 **Color Usage Analytics**: Live breakdown of pixel distribution per Wplace color ID, percentage share, and total pixel counts.
- 📤 **High-Res Exporter**: Download final converted images in PNG or WEBP format at 1x, 2x, 4x, or 8x scale multipliers.
- 🗺️ **Integrated Wplace Exporter Userscript (v12.0)**: Includes Tampermonkey/Violentmonkey script for selecting 1:1 pixel polygon regions directly on [wplace.live](https://wplace.live) with **MapLibre GL pixel grid lock**.

---

## 🚀 Quick Start (Running Locally)

You can run Wplace Canvas Color Studio locally using Node.js or any standard static file server:

### Method 1: Using Node.js `serve`
```bash
# Clone the repository
git clone https://github.com/YourUsername/Wplace-Canvas-Color-Studio-Quantizer.git
cd Wplace-Canvas-Color-Studio-Quantizer

# Run using npx serve
npx serve -p 3000 .
```
Then open **`http://localhost:3000`** in your web browser.

### Method 2: Open Directly
Simply double-click [`index.html`](index.html) to open it directly in any modern browser (Chrome, Firefox, Edge, Brave, Safari).

---

## 🎨 Wplace 64 Official Color Palette

Wplace uses an official 64-color palette. The palette is divided into **Free Basic Colors (IDs 1–31)** and **Premium Droplet Colors (IDs 32–63)**:

<details>
<summary><b>Click to Expand Full Wplace 64 Palette Table</b></summary>

| ID | Color Name | Hex Code | RGB | OKLab (L, a, b) | Tier |
|---|---|---|---|---|---|
| **0** | Transparent | `transparent` | (0, 0, 0) | (0, 0, 0) | Free |
| **1** | Black | `#000000` | (0, 0, 0) | (0, 0, 0) | Free |
| **2** | Dark Gray | `#3C3C3C` | (60, 60, 60) | (0.356, 0, 0) | Free |
| **3** | Gray | `#787878` | (120, 120, 120) | (0.573, 0, 0) | Free |
| **4** | Light Gray | `#D2D2D2` | (210, 210, 210) | (0.864, 0, 0) | Free |
| **5** | White | `#FFFFFF` | (255, 255, 255) | (1, 0, 0) | Free |
| **6** | Deep Red | `#600008` | (96, 0, 8) | (0.31, 0.119, 0.037) | Free |
| **7** | Red | `#ED1C24` | (237, 28, 36) | (0.603, 0.209, 0.107) | Free |
| **8** | Orange Red | `#FF7F27` | (255, 127, 39) | (0.732, 0.118, 0.137) | Free |
| **9** | Peach | `#F6B26B` | (246, 178, 107) | (0.791, 0.039, 0.16) | Free |
| **10** | Yellow | `#F9E53B` | (249, 229, 59) | (0.895, -0.026, 0.168) | Free |
| **11** | Light Yellow | `#FFFCCB` | (255, 252, 203) | (0.974, -0.019, 0.077) | Free |
| **12** | Dark Green | `#0EB168` | (14, 177, 104) | (0.691, -0.154, 0.075) | Free |
| **13** | Green | `#13E67B` | (19, 230, 123) | (0.812, -0.185, 0.096) | Free |
| **14** | Light Green | `#87FE9E` | (135, 254, 158) | (0.898, -0.17, 0.149) | Free |
| **15** | Teal | `#0C816E` | (12, 129, 110) | (0.541, -0.097, 0.005) | Free |
| **16** | Cyan Teal | `#10AEA6` | (16, 174, 166) | (0.678, -0.114, -0.018) | Free |
| **17** | Light Cyan | `#13E1BE` | (19, 225, 190) | (0.814, -0.15, 0.011) | Free |
| **18** | Dark Blue | `#28509E` | (40, 80, 158) | (0.447, -0.019, -0.134) | Free |
| **19** | Blue | `#4093EC` | (64, 147, 236) | (0.65, -0.048, -0.137) | Free |
| **20** | Light Blue | `#60F7F2` | (96, 247, 242) | (0.895, -0.124, -0.027) | Free |
| **21** | Indigo | `#6B50F6` | (107, 80, 246) | (0.561, 0.054, -0.229) | Free |
| **22** | Periwinkle | `#99B1FB` | (153, 177, 251) | (0.771, 0, -0.11) | Free |
| **23** | Deep Purple | `#780C99` | (120, 12, 153) | (0.431, 0.145, -0.143) | Free |
| **24** | Purple | `#AA38B9` | (170, 56, 185) | (0.557, 0.168, -0.127) | Free |
| **25** | Light Purple | `#E0AFFE` | (224, 175, 254) | (0.796, 0.102, -0.097) | Free |
| **26** | Magenta | `#CB007A` | (203, 0, 122) | (0.551, 0.225, -0.023) | Free |
| **27** | Hot Pink | `#EC1F80` | (236, 31, 128) | (0.62, 0.238, 0) | Free |
| **28** | Pink | `#F38DA9` | (243, 141, 169) | (0.759, 0.127, 0.006) | Free |
| **29** | Dark Brown | `#684634` | (104, 70, 52) | (0.428, 0.036, 0.041) | Free |
| **30** | Brown | `#95682A` | (149, 104, 42) | (0.552, 0.03, 0.092) | Free |
| **31** | Beige | `#F8B277` | (248, 178, 119) | (0.817, 0.055, 0.097) | Free |
| **32–63** | Premium Droplet Palette | Swatches `#AAA6AA` to `#CDA4BE` | Various | Various | Premium |

</details>

---

## 🧮 Math & Color Matching Engine

Instead of standard Euclidean RGB color distance (which overemphasizes green component differences and causes color banding), Wplace Color Studio uses **OKLab Perceptual Color Matching**:

$$\Delta E_{\text{OKLab}} = \sqrt{(L_1 - L_2)^2 + (a_1 - a_2)^2 + (b_1 - b_2)^2}$$

Where $L$ is perceived lightness, $a$ represents green/red opponent channel, and $b$ represents blue/yellow opponent channel. This ensures smooth gradients, accurate skin tones, and faithful color reproduction on Wplace pixel canvases.


---

## 📂 Project Architecture

```
Wplace-Canvas-Color-Studio-Quantizer/
├── index.html           # Main SPA HTML structure & toolbar
├── style.css            # Dark glassmorphic design system & layout
├── palette.js           # Wplace 64 official palette & OKLab matching engine
├── dither.js            # Image quantization & 7 dithering algorithms
├── app.js               # Application state, canvas rendering & viewport logic
├── icon.svg             # Official Purplish Globe vector logo
├── wplace-palette.json  # Exported JSON dictionary of all 64 Wplace colors
└── README.md            # Comprehensive documentation
```

---

## 📄 License

Distributed under the **MIT License**. Free for personal and commercial use.

---

<p align="center">
  Crafted with ❤️ for the <b>Wplace</b> Pixel Art Community
</p>
