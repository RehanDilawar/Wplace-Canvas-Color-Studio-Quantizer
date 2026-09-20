// Dithering & Color Quantization Engine for Wplace Palette

const DITHER_PATTERNS = {
  BAYER_4X4: [
    [ 0,  8,  2, 10],
    [12,  4, 14,  6],
    [ 3, 11,  1,  9],
    [15,  7, 13,  5]
  ],
  BAYER_8X8: [
    [ 0, 32,  8, 40,  2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44,  4, 36, 14, 46,  6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [ 3, 35, 11, 43,  1, 33,  9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47,  7, 39, 13, 45,  5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21]
  ]
};

function processImageDither(imageData, activePalette, algorithm = 'floyd', strength = 1.0, alphaThreshold = 32, useOKLab = true) {
  const width = imageData.width;
  const height = imageData.height;
  const src = imageData.data;
  
  // Output pixel array & stats breakdown
  const outputImgData = new ImageData(width, height);
  const dst = outputImgData.data;
  const colorStats = new Map();

  // Create fast RGB lookup table cache
  const lookupCache = new Map();

  function getClosest(r, g, b) {
    const key = (r << 16) | (g << 8) | b;
    if (lookupCache.has(key)) return lookupCache.get(key);
    const closest = findClosestWplaceColor(r, g, b, activePalette, useOKLab);
    lookupCache.set(key, closest);
    return closest;
  }

  function clamp(v) {
    return v < 0 ? 0 : v > 255 ? 255 : v;
  }

  function recordStat(colorId) {
    colorStats.set(colorId, (colorStats.get(colorId) || 0) + 1);
  }

  if (algorithm === 'none') {
    // Standard Direct Nearest Color Quantization
    for (let i = 0; i < src.length; i += 4) {
      const a = src[i + 3];
      if (a < alphaThreshold) {
        dst[i] = 0; dst[i + 1] = 0; dst[i + 2] = 0; dst[i + 3] = 0;
        recordStat(0);
        continue;
      }
      const closest = getClosest(src[i], src[i + 1], src[i + 2]);
      dst[i] = closest.rgb[0];
      dst[i + 1] = closest.rgb[1];
      dst[i + 2] = closest.rgb[2];
      dst[i + 3] = 255;
      recordStat(closest.id);
    }
  } else if (algorithm === 'bayer4' || algorithm === 'bayer8') {
    // Ordered Bayer Dithering
    const matrix = algorithm === 'bayer4' ? DITHER_PATTERNS.BAYER_4X4 : DITHER_PATTERNS.BAYER_8X8;
    const mSize = matrix.length;
    const norm = 1 / (mSize * mSize) - 0.5;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const a = src[idx + 3];
        if (a < alphaThreshold) {
          dst[idx] = 0; dst[idx + 1] = 0; dst[idx + 2] = 0; dst[idx + 3] = 0;
          recordStat(0);
          continue;
        }

        const bias = matrix[y % mSize][x % mSize] * norm * 48 * strength;
        const r = clamp(Math.round(src[idx] + bias));
        const g = clamp(Math.round(src[idx + 1] + bias));
        const b = clamp(Math.round(src[idx + 2] + bias));

        const closest = getClosest(r, g, b);
        dst[idx] = closest.rgb[0];
        dst[idx + 1] = closest.rgb[1];
        dst[idx + 2] = closest.rgb[2];
        dst[idx + 3] = 255;
        recordStat(closest.id);
      }
    }
  } else {
    // Error Diffusion Dithering (Floyd-Steinberg, Atkinson, Sierra, Burkes)
    const fR = new Float32Array(width * height);
    const fG = new Float32Array(width * height);
    const fB = new Float32Array(width * height);
    const fA = new Uint8Array(width * height);

    for (let i = 0, j = 0; i < src.length; i += 4, j++) {
      fR[j] = src[i];
      fG[j] = src[i + 1];
      fB[j] = src[i + 2];
      fA[j] = src[i + 3];
    }

    // Diffusion kernels definition
    const kernels = {
      floyd: [
        [1, 0, 7 / 16],
        [-1, 1, 3 / 16],
        [0, 1, 5 / 16],
        [1, 1, 1 / 16]
      ],
      atkinson: [
        [1, 0, 1 / 8],
        [2, 0, 1 / 8],
        [-1, 1, 1 / 8],
        [0, 1, 1 / 8],
        [1, 1, 1 / 8],
        [0, 2, 1 / 8]
      ],
      sierra: [
        [1, 0, 5 / 32],
        [2, 0, 3 / 32],
        [-2, 1, 2 / 32],
        [-1, 1, 4 / 32],
        [0, 1, 5 / 32],
        [1, 1, 4 / 32],
        [2, 1, 2 / 32],
        [-1, 2, 2 / 32],
        [0, 2, 3 / 32],
        [1, 2, 2 / 32]
      ],
      burkes: [
        [1, 0, 8 / 32],
        [2, 0, 4 / 32],
        [-2, 1, 2 / 32],
        [-1, 1, 4 / 32],
        [0, 1, 8 / 32],
        [1, 1, 4 / 32],
        [2, 1, 2 / 32]
      ]
    };

    const kernel = kernels[algorithm] || kernels.floyd;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const ptr = y * width + x;
        const idx = ptr * 4;

        if (fA[ptr] < alphaThreshold) {
          dst[idx] = 0; dst[idx + 1] = 0; dst[idx + 2] = 0; dst[idx + 3] = 0;
          recordStat(0);
          continue;
        }

        const oldR = clamp(Math.round(fR[ptr]));
        const oldG = clamp(Math.round(fG[ptr]));
        const oldB = clamp(Math.round(fB[ptr]));

        const closest = getClosest(oldR, oldG, oldB);

        dst[idx] = closest.rgb[0];
        dst[idx + 1] = closest.rgb[1];
        dst[idx + 2] = closest.rgb[2];
        dst[idx + 3] = 255;
        recordStat(closest.id);

        const errR = (oldR - closest.rgb[0]) * strength;
        const errG = (oldG - closest.rgb[1]) * strength;
        const errB = (oldB - closest.rgb[2]) * strength;

        for (let k = 0; k < kernel.length; k++) {
          const [dx, dy, factor] = kernel[k];
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nptr = ny * width + nx;
            fR[nptr] += errR * factor;
            fG[nptr] += errG * factor;
            fB[nptr] += errB * factor;
          }
        }
      }
    }
  }

  return { imageData: outputImgData, stats: colorStats };
}
