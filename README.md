<p align="center">
  <img src="icon.svg" width="128" height="128" alt="Wplace Color Studio Logo" />
</p>

<h1 align="center">Wplace Canvas Color Studio & Quantizer</h1>

<p align="center">
  <b>The ultimate artwork converter, color quantizer, and image ditherer built specifically for <a href="https://wplace.live">wplace.live</a> pixel art canvas.</b>
</p>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=html,css,js,nodejs,vscode,git,github" alt="Tech Stack Icons" />
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
- 🧪 **Interactive Eyedropper & Wplace Color Swapping**: Automatically quantizes images to Wplace swatches upon loading, then allows you to swap any used Wplace color with another target Wplace color. Includes eyedropper canvas sampling and a one-click mapping reset.
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

| ID | Color Name | Hex Code | RGB | Tier |
|---|---|---|---|---|
| **0** | Transparent | `transparent` | (0, 0, 0) | Free |
| **1** | Black | `#000000` | (0, 0, 0) | Free |
| **2** | Dark Gray | `#3C3C3C` | (60, 60, 60) | Free |
| **3** | Gray | `#787878` | (120, 120, 120) | Free |
| **4** | Light Gray | `#D2D2D2` | (210, 210, 210) | Free |
| **5** | White | `#FFFFFF` | (255, 255, 255) | Free |
| **6** | Deep Red | `#600018` | (96, 0, 24) | Free |
| **7** | Red | `#ED1C24` | (237, 28, 36) | Free |
| **8** | Orange | `#FF7F27` | (255, 127, 39) | Free |
| **9** | Gold | `#F6AA09` | (246, 170, 9) | Free |
| **10** | Yellow | `#F9DD3B` | (249, 221, 59) | Free |
| **11** | Light Yellow | `#FFFABC` | (255, 250, 188) | Free |
| **12** | Dark Green | `#0EB968` | (14, 185, 104) | Free |
| **13** | Green | `#13E67B` | (19, 230, 123) | Free |
| **14** | Light Green | `#87FF5E` | (135, 255, 94) | Free |
| **15** | Dark Teal | `#0C816E` | (12, 129, 110) | Free |
| **16** | Teal | `#10AEA6` | (16, 174, 166) | Free |
| **17** | Light Teal | `#13E1BE` | (19, 225, 190) | Free |
| **18** | Dark Blue | `#28509E` | (40, 80, 158) | Free |
| **19** | Blue | `#4093E4` | (64, 147, 228) | Free |
| **20** | Cyan | `#60F7F2` | (96, 247, 242) | Free |
| **21** | Indigo | `#6B50F6` | (107, 80, 246) | Free |
| **22** | Light Indigo | `#99B1FB` | (153, 177, 251) | Free |
| **23** | Dark Purple | `#780C99` | (120, 12, 153) | Free |
| **24** | Purple | `#AA38B9` | (170, 56, 185) | Free |
| **25** | Light Purple | `#E09FF9` | (224, 159, 249) | Free |
| **26** | Dark Pink | `#CB007A` | (203, 0, 122) | Free |
| **27** | Pink | `#EC1F80` | (236, 31, 128) | Free |
| **28** | Light Pink | `#F38DA9` | (243, 141, 169) | Free |
| **29** | Dark Brown | `#684634` | (104, 70, 52) | Free |
| **30** | Brown | `#95682A` | (149, 104, 42) | Free |
| **31** | Beige | `#F8B277` | (248, 178, 119) | Free |
| **32** | Medium Gray | `#AAAAAA` | (170, 170, 170) | Premium |
| **33** | Dark Red | `#A50E1E` | (165, 14, 30) | Premium |
| **34** | Light Red | `#FA8072` | (250, 128, 114) | Premium |
| **35** | Dark Orange | `#E45C1A` | (228, 92, 26) | Premium |
| **36** | Light Tan | `#D6B594` | (214, 181, 148) | Premium |
| **37** | Dark Goldenrod | `#9C8431` | (156, 132, 49) | Premium |
| **38** | Goldenrod | `#C5AD31` | (197, 173, 49) | Premium |
| **39** | Light Goldenrod | `#E8D45F` | (232, 212, 95) | Premium |
| **40** | Dark Olive | `#4A6B3A` | (74, 107, 58) | Premium |
| **41** | Olive | `#5A944A` | (90, 148, 74) | Premium |
| **42** | Light Olive | `#84C573` | (132, 197, 115) | Premium |
| **43** | Dark Cyan | `#0F799F` | (15, 121, 159) | Premium |
| **44** | Light Cyan | `#BBFAF2` | (187, 250, 242) | Premium |
| **45** | Light Blue | `#7DC7FF` | (125, 199, 255) | Premium |
| **46** | Dark Indigo | `#4D31B8` | (77, 49, 184) | Premium |
| **47** | Dark Slate Blue | `#4A4284` | (74, 66, 132) | Premium |
| **48** | Slate Blue | `#7A71C4` | (122, 113, 196) | Premium |
| **49** | Light Slate Blue | `#B5AEF1` | (181, 174, 241) | Premium |
| **50** | Light Brown | `#DBA463` | (219, 164, 99) | Premium |
| **51** | Dark Beige | `#D18051` | (209, 128, 81) | Premium |
| **52** | Light Beige | `#FFC5A5` | (255, 197, 165) | Premium |
| **53** | Dark Peach | `#9B5249` | (155, 82, 73) | Premium |
| **54** | Peach | `#D18078` | (209, 128, 120) | Premium |
| **55** | Light Peach | `#FAB6A4` | (250, 182, 164) | Premium |
| **56** | Dark Tan | `#7B6352` | (123, 99, 82) | Premium |
| **57** | Tan | `#9C846B` | (156, 132, 107) | Premium |
| **58** | Dark Slate | `#333941` | (51, 57, 65) | Premium |
| **59** | Slate | `#6D758D` | (109, 117, 141) | Premium |
| **60** | Light Slate | `#B3B9D1` | (179, 185, 209) | Premium |
| **61** | Dark Stone | `#6D643F` | (109, 100, 63) | Premium |
| **62** | Stone | `#948C6B` | (148, 140, 107) | Premium |
| **63** | Light Stone | `#CDC59E` | (205, 197, 158) | Premium |

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
