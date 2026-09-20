// Wplace 64 Official Palette & Color Distance Library

const WPLACE_PALETTE = [
  { id: 0, name: "Transparent", hex: "#00000000", rgb: [0, 0, 0], oklab: [0, 0, 0], free: true, transparent: true },
  { id: 1, name: "Black", hex: "#000000", rgb: [0, 0, 0], oklab: [0, 0, 0], free: true },
  { id: 2, name: "Dark Gray", hex: "#3C3C3C", rgb: [60, 60, 60], oklab: [0.356, 0, 0], free: true },
  { id: 3, name: "Gray", hex: "#787878", rgb: [120, 120, 120], oklab: [0.573, 0, 0], free: true },
  { id: 4, name: "Light Gray", hex: "#D2D2D2", rgb: [210, 210, 210], oklab: [0.864, 0, 0], free: true },
  { id: 5, name: "White", hex: "#FFFFFF", rgb: [255, 255, 255], oklab: [1, 0, 0], free: true },
  { id: 6, name: "Deep Red", hex: "#600018", rgb: [96, 0, 24], free: true },
  { id: 7, name: "Red", hex: "#ED1C24", rgb: [237, 28, 36], free: true },
  { id: 8, name: "Orange", hex: "#FF7F27", rgb: [255, 127, 39], free: true },
  { id: 9, name: "Gold", hex: "#F6AA09", rgb: [246, 170, 9], free: true },
  { id: 10, name: "Yellow", hex: "#F9DD3B", rgb: [249, 221, 59], free: true },
  { id: 11, name: "Light Yellow", hex: "#FFFABC", rgb: [255, 250, 188], free: true },
  { id: 12, name: "Dark Green", hex: "#0EB968", rgb: [14, 185, 104], free: true },
  { id: 13, name: "Green", hex: "#13E67B", rgb: [19, 230, 123], free: true },
  { id: 14, name: "Light Green", hex: "#87FF5E", rgb: [135, 255, 94], free: true },
  { id: 15, name: "Dark Teal", hex: "#0C816E", rgb: [12, 129, 110], free: true },
  { id: 16, name: "Teal", hex: "#10AEA6", rgb: [16, 174, 166], free: true },
  { id: 17, name: "Light Teal", hex: "#13E1BE", rgb: [19, 225, 190], free: true },
  { id: 18, name: "Dark Blue", hex: "#28509E", rgb: [40, 80, 158], free: true },
  { id: 19, name: "Blue", hex: "#4093E4", rgb: [64, 147, 228], free: true },
  { id: 20, name: "Cyan", hex: "#60F7F2", rgb: [96, 247, 242], free: true },
  { id: 21, name: "Indigo", hex: "#6B50F6", rgb: [107, 80, 246], free: true },
  { id: 22, name: "Light Indigo", hex: "#99B1FB", rgb: [153, 177, 251], free: true },
  { id: 23, name: "Dark Purple", hex: "#780C99", rgb: [120, 12, 153], free: true },
  { id: 24, name: "Purple", hex: "#AA38B9", rgb: [170, 56, 185], free: true },
  { id: 25, name: "Light Purple", hex: "#E09FF9", rgb: [224, 159, 249], free: true },
  { id: 26, name: "Dark Pink", hex: "#CB007A", rgb: [203, 0, 122], free: true },
  { id: 27, name: "Pink", hex: "#EC1F80", rgb: [236, 31, 128], free: true },
  { id: 28, name: "Light Pink", hex: "#F38DA9", rgb: [243, 141, 169], free: true },
  { id: 29, name: "Dark Brown", hex: "#684634", rgb: [104, 70, 52], free: true },
  { id: 30, name: "Brown", hex: "#95682A", rgb: [149, 104, 42], free: true },
  { id: 31, name: "Beige", hex: "#F8B277", rgb: [248, 178, 119], free: true },
  // Premium Colors (IDs 32 to 63)
  { id: 32, name: "Medium Gray", hex: "#AAAAAA", rgb: [170, 170, 170], free: false },
  { id: 33, name: "Dark Red", hex: "#A50E1E", rgb: [165, 14, 30], free: false },
  { id: 34, name: "Light Red", hex: "#FA8072", rgb: [250, 128, 114], free: false },
  { id: 35, name: "Dark Orange", hex: "#E45C1A", rgb: [228, 92, 26], free: false },
  { id: 36, name: "Light Tan", hex: "#D6B594", rgb: [214, 181, 148], free: false },
  { id: 37, name: "Dark Goldenrod", hex: "#9C8431", rgb: [156, 132, 49], free: false },
  { id: 38, name: "Goldenrod", hex: "#C5AD31", rgb: [197, 173, 49], free: false },
  { id: 39, name: "Light Goldenrod", hex: "#E8D45F", rgb: [232, 212, 95], free: false },
  { id: 40, name: "Dark Olive", hex: "#4A6B3A", rgb: [74, 107, 58], free: false },
  { id: 41, name: "Olive", hex: "#5A944A", rgb: [90, 148, 74], free: false },
  { id: 42, name: "Light Olive", hex: "#84C573", rgb: [132, 197, 115], free: false },
  { id: 43, name: "Dark Cyan", hex: "#0F799F", rgb: [15, 121, 159], free: false },
  { id: 44, name: "Light Cyan", hex: "#BBFAF2", rgb: [187, 250, 242], free: false },
  { id: 45, name: "Light Blue", hex: "#7DC7FF", rgb: [125, 199, 255], free: false },
  { id: 46, name: "Dark Indigo", hex: "#4D31B8", rgb: [77, 49, 184], free: false },
  { id: 47, name: "Dark Slate Blue", hex: "#4A4284", rgb: [74, 66, 132], free: false },
  { id: 48, name: "Slate Blue", hex: "#7A71C4", rgb: [122, 113, 196], free: false },
  { id: 49, name: "Light Slate Blue", hex: "#B5AEF1", rgb: [181, 174, 241], free: false },
  { id: 50, name: "Light Brown", hex: "#DBA463", rgb: [219, 164, 99], free: false },
  { id: 51, name: "Dark Beige", hex: "#D18051", rgb: [209, 128, 81], free: false },
  { id: 52, name: "Light Beige", hex: "#FFC5A5", rgb: [255, 197, 165], free: false },
  { id: 53, name: "Dark Peach", hex: "#9B5249", rgb: [155, 82, 73], free: false },
  { id: 54, name: "Peach", hex: "#D18078", rgb: [209, 128, 120], free: false },
  { id: 55, name: "Light Peach", hex: "#FAB6A4", rgb: [250, 182, 164], free: false },
  { id: 56, name: "Dark Tan", hex: "#7B6352", rgb: [123, 99, 82], free: false },
  { id: 57, name: "Tan", hex: "#9C846B", rgb: [156, 132, 107], free: false },
  { id: 58, name: "Dark Slate", hex: "#333941", rgb: [51, 57, 65], free: false },
  { id: 59, name: "Slate", hex: "#6D758D", rgb: [109, 117, 141], free: false },
  { id: 60, name: "Light Slate", hex: "#B3B9D1", rgb: [179, 185, 209], free: false },
  { id: 61, name: "Dark Stone", hex: "#6D643F", rgb: [109, 100, 63], free: false },
  { id: 62, name: "Stone", hex: "#948C6B", rgb: [148, 140, 107], free: false },
  { id: 63, name: "Light Stone", hex: "#CDC59E", rgb: [205, 197, 158], free: false }
];

// Convert RGB (0..255) to sRGB linearized (0..1)
function srgbToLinear(c) {
  const norm = c / 255;
  return norm <= 0.04045 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

// Convert RGB (0..255) to OKLab (L, a, b)
function rgbToOklab(r, g, b) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return [
    0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757989 * s_
  ];
}

// Compute OKLab values for all palette items
WPLACE_PALETTE.forEach(c => {
  if (!c.oklab) {
    c.oklab = rgbToOklab(c.rgb[0], c.rgb[1], c.rgb[2]);
  }
});

// Distance between two OKLab colors
function oklabDistance(ok1, ok2) {
  const dL = ok1[0] - ok2[0];
  const da = ok1[1] - ok2[1];
  const db = ok1[2] - ok2[2];
  return dL * dL + da * da + db * db;
}

// Weighted Euclidean RGB Distance fallback for ultra-fast lookup
function rgbDistanceWeighted(r1, g1, b1, r2, g2, b2) {
  const rmean = (r1 + r2) / 2;
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return (((512 + rmean) * dr * dr) >> 8) + 4 * dg * dg + (((767 - rmean) * db * db) >> 8);
}

// Find closest Wplace color from a target palette
function findClosestWplaceColor(r, g, b, activePalette, useOKLab = true) {
  let minDistance = Infinity;
  let closest = activePalette[0] || WPLACE_PALETTE[1];

  if (useOKLab) {
    const targetOk = rgbToOklab(r, g, b);
    for (let i = 0; i < activePalette.length; i++) {
      const color = activePalette[i];
      if (color.id === 0) continue; // Skip transparent
      const dist = oklabDistance(targetOk, color.oklab);
      if (dist < minDistance) {
        minDistance = dist;
        closest = color;
      }
    }
  } else {
    for (let i = 0; i < activePalette.length; i++) {
      const color = activePalette[i];
      if (color.id === 0) continue;
      const dist = rgbDistanceWeighted(r, g, b, color.rgb[0], color.rgb[1], color.rgb[2]);
      if (dist < minDistance) {
        minDistance = dist;
        closest = color;
      }
    }
  }

  return closest;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WPLACE_PALETTE, findClosestWplaceColor, rgbToOklab, oklabDistance };
}
