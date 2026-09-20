// Wplace 64 Official Palette & Color Distance Library

const WPLACE_PALETTE = [
  { id: 0, name: "Transparent", hex: "#00000000", rgb: [0, 0, 0], oklab: [0, 0, 0], free: true, transparent: true },
  { id: 1, name: "Black", hex: "#000000", rgb: [0, 0, 0], oklab: [0, 0, 0], free: true },
  { id: 2, name: "Dark Gray", hex: "#3C3C3C", rgb: [60, 60, 60], oklab: [0.356, 0, 0], free: true },
  { id: 3, name: "Gray", hex: "#787878", rgb: [120, 120, 120], oklab: [0.573, 0, 0], free: true },
  { id: 4, name: "Light Gray", hex: "#D2D2D2", rgb: [210, 210, 210], oklab: [0.864, 0, 0], free: true },
  { id: 5, name: "White", hex: "#FFFFFF", rgb: [255, 255, 255], oklab: [1, 0, 0], free: true },
  { id: 6, name: "Deep Red", hex: "#600008", rgb: [96, 0, 8], oklab: [0.31, 0.119, 0.037], free: true },
  { id: 7, name: "Red", hex: "#ED1C24", rgb: [237, 28, 36], oklab: [0.603, 0.209, 0.107], free: true },
  { id: 8, name: "Orange Red", hex: "#FF7F27", rgb: [255, 127, 39], oklab: [0.732, 0.118, 0.137], free: true },
  { id: 9, name: "Peach", hex: "#F6B26B", rgb: [246, 178, 107], oklab: [0.791, 0.039, 0.16], free: true },
  { id: 10, name: "Yellow", hex: "#F9E53B", rgb: [249, 229, 59], oklab: [0.895, -0.026, 0.168], free: true },
  { id: 11, name: "Light Yellow", hex: "#FFFCCB", rgb: [255, 252, 203], oklab: [0.974, -0.019, 0.077], free: true },
  { id: 12, name: "Dark Green", hex: "#0EB168", rgb: [14, 177, 104], oklab: [0.691, -0.154, 0.075], free: true },
  { id: 13, name: "Green", hex: "#13E67B", rgb: [19, 230, 123], oklab: [0.812, -0.185, 0.096], free: true },
  { id: 14, name: "Light Green", hex: "#87FE9E", rgb: [135, 254, 158], oklab: [0.898, -0.17, 0.149], free: true },
  { id: 15, name: "Teal", hex: "#0C816E", rgb: [12, 129, 110], oklab: [0.541, -0.097, 0.005], free: true },
  { id: 16, name: "Cyan Teal", hex: "#10AEA6", rgb: [16, 174, 166], oklab: [0.678, -0.114, -0.018], free: true },
  { id: 17, name: "Light Cyan", hex: "#13E1BE", rgb: [19, 225, 190], oklab: [0.814, -0.15, 0.011], free: true },
  { id: 18, name: "Dark Blue", hex: "#28509E", rgb: [40, 80, 158], oklab: [0.447, -0.019, -0.134], free: true },
  { id: 19, name: "Blue", hex: "#4093EC", rgb: [64, 147, 236], oklab: [0.65, -0.048, -0.137], free: true },
  { id: 20, name: "Light Blue", hex: "#60F7F2", rgb: [96, 247, 242], oklab: [0.895, -0.124, -0.027], free: true },
  { id: 21, name: "Indigo", hex: "#6B50F6", rgb: [107, 80, 246], oklab: [0.561, 0.054, -0.229], free: true },
  { id: 22, name: "Periwinkle", hex: "#99B1FB", rgb: [153, 177, 251], oklab: [0.771, 0, -0.11], free: true },
  { id: 23, name: "Deep Purple", hex: "#780C99", rgb: [120, 12, 153], oklab: [0.431, 0.145, -0.143], free: true },
  { id: 24, name: "Purple", hex: "#AA38B9", rgb: [170, 56, 185], oklab: [0.557, 0.168, -0.127], free: true },
  { id: 25, name: "Light Purple", hex: "#E0AFFE", rgb: [224, 175, 254], oklab: [0.796, 0.102, -0.097], free: true },
  { id: 26, name: "Magenta", hex: "#CB007A", rgb: [203, 0, 122], oklab: [0.551, 0.225, -0.023], free: true },
  { id: 27, name: "Hot Pink", hex: "#EC1F80", rgb: [236, 31, 128], oklab: [0.62, 0.238, 0], free: true },
  { id: 28, name: "Pink", hex: "#F38DA9", rgb: [243, 141, 169], oklab: [0.759, 0.127, 0.006], free: true },
  { id: 29, name: "Dark Brown", hex: "#684634", rgb: [104, 70, 52], oklab: [0.428, 0.036, 0.041], free: true },
  { id: 30, name: "Brown", hex: "#95682A", rgb: [149, 104, 42], oklab: [0.552, 0.03, 0.092], free: true },
  { id: 31, name: "Beige", hex: "#F8B277", rgb: [248, 178, 119], oklab: [0.817, 0.055, 0.097], free: true },
  // Premium Colors (IDs 32 to 63)
  { id: 32, name: "Maroon", hex: "#AAA6AA", rgb: [170, 166, 170], oklab: [0.738, 0, 0], free: false },
  { id: 33, name: "Rust", hex: "#A50FCE", rgb: [165, 15, 206], oklab: [0.46, 0.163, 0.074], free: false },
  { id: 34, name: "Coral", hex: "#FA8212", rgb: [250, 130, 18], oklab: [0.735, 0.134, 0.071], free: false },
  { id: 35, name: "Salmon", hex: "#E45B9A", rgb: [228, 91, 154], oklab: [0.642, 0.137, 0.122], free: false },
  { id: 36, name: "Gold", hex: "#D6B4B4", rgb: [214, 180, 180], oklab: [0.794, 0.023, 0.054], free: false },
  { id: 37, name: "Olive", hex: "#9C8311", rgb: [156, 131, 17], oklab: [0.62, -0.005, 0.105], free: false },
  { id: 38, name: "Lime", hex: "#C5B831", rgb: [197, 184, 49], oklab: [0.747, -0.019, 0.138], free: false },
  { id: 39, name: "Mint", hex: "#E8B71F", rgb: [232, 183, 31], oklab: [0.864, -0.023, 0.136], free: false },
  { id: 40, name: "Forest Green", hex: "#4A6B3A", rgb: [74, 107, 58], oklab: [0.489, -0.06, 0.058], free: false },
  { id: 41, name: "Emerald", hex: "#5A944A", rgb: [90, 148, 74], oklab: [0.609, -0.092, 0.08], free: false },
  { id: 42, name: "Seafoam", hex: "#84C493", rgb: [132, 196, 147], oklab: [0.76, -0.099, 0.085], free: false },
  { id: 43, name: "Sky Blue", hex: "#0F737E", rgb: [15, 115, 126], oklab: [0.54, -0.067, -0.079], free: false },
  { id: 44, name: "Ice Blue", hex: "#BBE8B2", rgb: [187, 232, 178], oklab: [0.941, -0.064, -0.007], free: false },
  { id: 45, name: "Navy", hex: "#7DC9DF", rgb: [125, 201, 223], oklab: [0.803, -0.05, -0.096], free: false },
  { id: 46, name: "Royal Blue", hex: "#4D31B8", rgb: [77, 49, 184], oklab: [0.438, 0.048, -0.192], free: false },
  { id: 47, name: "Periwinkle Blue", hex: "#4A4264", rgb: [74, 66, 100], oklab: [0.421, 0.03, -0.102], free: false },
  { id: 48, name: "Violet", hex: "#7A7184", rgb: [122, 113, 132], oklab: [0.593, 0.036, -0.119], free: false },
  { id: 49, name: "Plum", hex: "#B5A791", rgb: [181, 167, 145], oklab: [0.781, 0.031, -0.09], free: false },
  { id: 50, name: "Orchid", hex: "#DBA3E3", rgb: [219, 163, 227], oklab: [0.757, 0.036, 0.098], free: false },
  { id: 51, name: "Rose", hex: "#D17D95", rgb: [209, 125, 149], oklab: [0.676, 0.076, 0.09], free: false },
  { id: 52, name: "Crimson", hex: "#FA99C5", rgb: [250, 153, 197], oklab: [0.868, 0.051, 0.061], free: false },
  { id: 53, name: "Burgundy", hex: "#9B5049", rgb: [155, 80, 73], oklab: [0.524, 0.087, 0.047], free: false },
  { id: 54, name: "Chocolate", hex: "#D181A8", rgb: [209, 129, 168], oklab: [0.684, 0.091, 0.045], free: false },
  { id: 55, name: "Sand", hex: "#FAAC34", rgb: [250, 172, 52], oklab: [0.835, 0.068, 0.048], free: false },
  { id: 56, name: "Tan", hex: "#7B6232", rgb: [123, 98, 50], oklab: [0.519, 0.022, 0.034], free: false },
  { id: 57, name: "Khaki", hex: "#9C8A4B", rgb: [156, 138, 75], oklab: [0.629, 0.017, 0.043], free: false },
  { id: 58, name: "Charcoal", hex: "#333741", rgb: [51, 55, 65], oklab: [0.342, -0.004, -0.016], free: false },
  { id: 59, name: "Slate", hex: "#6D75AD", rgb: [109, 117, 173], oklab: [0.564, 0, -0.038], free: false },
  { id: 60, name: "Steel Blue", hex: "#B3BAF1", rgb: [179, 186, 241], oklab: [0.789, 0.003, -0.035], free: false },
  { id: 61, name: "Turquoise", hex: "#6D6A9F", rgb: [109, 106, 159], oklab: [0.502, -0.006, 0.055], free: false },
  { id: 62, name: "Aquamarine", hex: "#948B2B", rgb: [148, 139, 43], oklab: [0.638, -0.005, 0.047], free: false },
  { id: 63, name: "Ivory", hex: "#CDA4BE", rgb: [205, 164, 190], oklab: [0.82, -0.007, 0.053], free: false }
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
