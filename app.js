// Wplace Color Studio & Quantizer Application Engine

(function () {
  'use strict';

  // --- State Variables ---
  let originalImage = null;
  let activePalette = WPLACE_PALETTE.slice(1); // Default to all 63 non-transparent colors
  let paletteMode = 'all'; // 'all', 'free', 'custom'
  let customPaletteSelection = new Set(WPLACE_PALETTE.slice(1).map(c => c.id));

  // Manual Color Replacement Map: key = "r,g,b", value = WplaceColorObject
  const manualReplacements = new Map();
  let currentTargetKey = null; // Key currently being edited in modal

  // Zoom & Pan State
  let zoomLevel = 1.0;
  let panX = 0;
  let panY = 0;
  let isPanning = false;
  let startPanX = 0;
  let startPanY = 0;

  // Split Slider State (0.0 to 1.0)
  let splitRatio = 0.5;
  let isDraggingSplit = false;
  let currentViewMode = 'split'; // 'split', 'side', 'processed', 'original'

  // DOM Elements
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const fileInfo = document.getElementById('file-info');
  const fileNameDisplay = document.getElementById('file-name');
  const fileDimsDisplay = document.getElementById('file-dims');

  const canvasOriginal = document.getElementById('canvas-original');
  const canvasProcessed = document.getElementById('canvas-processed');
  const ctxOriginal = canvasOriginal.getContext('2d');
  const ctxProcessed = canvasProcessed.getContext('2d');

  const stage = document.getElementById('viewport-stage');
  const canvasWorkspace = document.getElementById('canvas-workspace');
  const wrapperOriginal = document.getElementById('canvas-wrapper-original');
  const wrapperProcessed = document.getElementById('canvas-wrapper-processed');
  const splitDivider = document.getElementById('split-divider');

  // Controls
  const selectDither = document.getElementById('select-dither');
  const rangeDitherAmount = document.getElementById('range-dither-amount');
  const valDitherAmount = document.getElementById('val-dither-amount');
  const selectColorSpace = document.getElementById('select-color-space');
  const rangeAlpha = document.getElementById('range-alpha');
  const valAlpha = document.getElementById('val-alpha');

  const radioPaletteModes = document.querySelectorAll('input[name="palette-mode"]');
  const btnPresetAll = document.getElementById('btn-preset-all');
  const btnPresetFree = document.getElementById('btn-preset-free');

  const colorStatsList = document.getElementById('color-stats-list');
  const statTotalPixels = document.getElementById('stat-total-pixels');
  const statUniqueColors = document.getElementById('stat-unique-colors');

  // Modals
  const modalPalette = document.getElementById('modal-palette');
  const paletteGrid = document.getElementById('palette-grid');
  const modalExport = document.getElementById('modal-export');
  const modalReplacement = document.getElementById('modal-select-replacement');
  const replacementGrid = document.getElementById('replacement-palette-grid');

  // --- Initialization ---
  function init() {
    setupEventListeners();
    renderPaletteModalGrid();
    loadDemoImage();
  }

  // --- Demo Artwork Generator ---
  function loadDemoImage() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 120;
    tempCanvas.height = 120;
    const ctx = tempCanvas.getContext('2d');

    // Create vibrant gradient & pixel artwork pattern with non-Wplace colors
    const grad = ctx.createLinearGradient(0, 0, 120, 120);
    grad.addColorStop(0, '#ff0055');
    grad.addColorStop(0.33, '#00e5ff');
    grad.addColorStop(0.66, '#ffcc00');
    grad.addColorStop(1, '#9900ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 120, 120);

    // Add geometric shapes & text
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(60, 60, 35, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#111827';
    ctx.fillRect(45, 45, 30, 30);

    ctx.fillStyle = '#22c55e';
    ctx.fillRect(52, 52, 16, 16);

    const img = new Image();
    img.onload = () => {
      fileNameDisplay.textContent = 'demo-artwork.png';
      fileDimsDisplay.textContent = `${img.width} x ${img.height} px`;
      fileInfo.classList.remove('hidden');
      loadImage(img);
    };
    img.src = tempCanvas.toDataURL();
  }

  // --- Image Loading ---
  function loadImage(img) {
    originalImage = img;
    canvasOriginal.width = img.width;
    canvasOriginal.height = img.height;
    canvasProcessed.width = img.width;
    canvasProcessed.height = img.height;

    ctxOriginal.drawImage(img, 0, 0);

    manualReplacements.clear();
    resetZoomAndPan();
    processAndRender();
  }

  // --- Replace Wplace Color Panel ---
  function updateReplaceColorPanel(quantizedStats) {
    const panel = document.getElementById('panel-color-replace');
    const badge = document.getElementById('non-wplace-count-badge');
    const list = document.getElementById('detected-non-wplace-list');
    const btnReset = document.getElementById('btn-reset-mappings');

    if (!originalImage || !quantizedStats) {
      panel.classList.add('hidden');
      return;
    }

    panel.classList.remove('hidden');

    if (manualReplacements.size > 0) {
      badge.textContent = `${manualReplacements.size} Mapped`;
      if (btnReset) btnReset.style.display = 'inline-flex';
    } else {
      const uniqueCount = quantizedStats.size - (quantizedStats.has(0) ? 1 : 0);
      badge.textContent = `${uniqueCount} Colors`;
      if (btnReset) btnReset.style.display = 'none';
    }

    list.innerHTML = '';

    // Filter out transparent (id: 0) and sort used Wplace colors by pixel count
    const sortedColors = [...quantizedStats.entries()]
      .filter(([colorId]) => colorId !== 0)
      .sort((a, b) => b[1] - a[1]);

    if (sortedColors.length === 0) {
      list.innerHTML = '<span style="font-size: 11px; color: var(--text-dark); text-align: center; display: block; padding: 10px 0;">No colors detected in image.</span>';
      return;
    }

    sortedColors.forEach(([colorId, count]) => {
      const sourceColor = WPLACE_PALETTE.find(c => c.id === colorId);
      if (!sourceColor) return;

      const replacement = manualReplacements.get(colorId);

      const row = document.createElement('div');
      row.className = 'stat-row';
      row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 6px 10px; border-radius: 6px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color);';

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
          <div class="swatch" style="background: ${sourceColor.hex}"></div>
          <div style="display: flex; flex-direction: column; overflow: hidden;">
            <span style="font-size: 11px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">#${sourceColor.id} ${sourceColor.name}</span>
            <span style="font-size: 10px; color: var(--text-muted);">${count.toLocaleString()} px</span>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
          <span style="font-size: 11px; color: var(--text-muted);">→</span>
          ${replacement ? `
            <div class="swatch" style="background: ${replacement.hex}" title="#${replacement.id} ${replacement.name}"></div>
            <button class="btn btn-xs btn-primary btn-map-color" style="min-width: 60px;">
              #${replacement.id} ${replacement.name}
            </button>
            <button class="btn btn-xs btn-ghost btn-clear-mapping" title="Clear Replacement" style="padding: 4px 6px; color: #ef4444; border-color: rgba(239,68,68,0.3);">
              ✕
            </button>
          ` : `
            <button class="btn btn-xs btn-secondary btn-map-color" style="min-width: 80px; text-align: center;">
              Map Color
            </button>
          `}
        </div>
      `;

      const mapBtn = row.querySelector('.btn-map-color');
      if (mapBtn) {
        mapBtn.addEventListener('click', () => {
          openReplacementPickerModal(colorId);
        });
      }

      const clearBtn = row.querySelector('.btn-clear-mapping');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          manualReplacements.delete(colorId);
          processAndRender();
        });
      }

      list.appendChild(row);
    });
  }

  // --- Eyedropper Sampling ---
  async function activateEyedropper() {
    if (window.EyeDropper) {
      try {
        const eyeDropper = new EyeDropper();
        const result = await eyeDropper.open();
        const hex = result.sRGBHex.toUpperCase();
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        const closest = findClosestWplaceColor(r, g, b, WPLACE_PALETTE.slice(1), true);
        openReplacementPickerModal(closest.id);
      } catch (err) {
        // User cancelled eyedropper
      }
    } else {
      alert('Click anywhere on the processed canvas to pick a Wplace color to replace.');
      canvasWorkspace.style.cursor = 'crosshair';

      function onCanvasClick(evt) {
        const rect = canvasProcessed.getBoundingClientRect();
        const clickX = Math.floor(((evt.clientX - rect.left) / rect.width) * canvasProcessed.width);
        const clickY = Math.floor(((evt.clientY - rect.top) / rect.height) * canvasProcessed.height);

        if (clickX >= 0 && clickX < canvasProcessed.width && clickY >= 0 && clickY < canvasProcessed.height) {
          const pixel = ctxProcessed.getImageData(clickX, clickY, 1, 1).data;
          canvasWorkspace.removeEventListener('click', onCanvasClick);
          canvasWorkspace.style.cursor = 'grab';

          if (pixel[3] > 0) {
            const closest = findClosestWplaceColor(pixel[0], pixel[1], pixel[2], WPLACE_PALETTE.slice(1), true);
            openReplacementPickerModal(closest.id);
          }
        }
      }
      canvasWorkspace.addEventListener('click', onCanvasClick, { once: true });
    }
  }

  // --- Target Wplace Replacement Color Picker Modal ---
  function openReplacementPickerModal(sourceColorId) {
    currentTargetKey = sourceColorId;
    modalReplacement.classList.remove('hidden');
    renderReplacementModalGrid();
  }

  function renderReplacementModalGrid() {
    const searchFilter = document.getElementById('input-replacement-search').value.toLowerCase();
    replacementGrid.innerHTML = '';

    WPLACE_PALETTE.slice(1).forEach(color => {
      if (searchFilter && !color.name.toLowerCase().includes(searchFilter) && !color.hex.toLowerCase().includes(searchFilter) && color.id.toString() !== searchFilter) {
        return;
      }

      const itemEl = document.createElement('div');
      itemEl.className = 'palette-item';
      itemEl.innerHTML = `
        <div class="swatch" style="background: ${color.hex}"></div>
        <div class="palette-item-text">
          <span class="palette-item-name">#${color.id} ${color.name}</span>
          <span class="palette-item-hex">${color.hex} ${color.free ? '• Free' : ''}</span>
        </div>
      `;

      itemEl.addEventListener('click', () => {
        if (currentTargetKey !== null) {
          manualReplacements.set(currentTargetKey, color);
        }
        modalReplacement.classList.add('hidden');
        processAndRender();
      });

      replacementGrid.appendChild(itemEl);
    });
  }

  // --- Processing Pipeline ---
  function processAndRender() {
    if (!originalImage) return;

    // Get active palette depending on mode
    let currentPalette = [];
    if (paletteMode === 'all') {
      currentPalette = WPLACE_PALETTE.slice(1);
    } else if (paletteMode === 'free') {
      currentPalette = WPLACE_PALETTE.filter(c => c.free && c.id > 0);
    } else {
      currentPalette = WPLACE_PALETTE.filter(c => customPaletteSelection.has(c.id));
    }

    if (currentPalette.length === 0) {
      currentPalette = WPLACE_PALETTE.filter(c => c.free && c.id > 0);
    }

    // Get original image pixels
    const srcImgData = ctxOriginal.getImageData(0, 0, originalImage.width, originalImage.height);

    const algorithm = selectDither.value;
    const ditherStrength = parseFloat(rangeDitherAmount.value) / 100;
    const useOKLab = selectColorSpace.value === 'oklab';
    const alphaCutoff = parseInt(rangeAlpha.value, 10);

    // Run Dithering engine
    const result = processImageDither(srcImgData, currentPalette, algorithm, ditherStrength, alphaCutoff, useOKLab);

    // Keep copy of original quantized stats for Section 4 UI list
    const originalQuantizedStats = new Map(result.stats);

    // Apply manual Wplace-to-Wplace color replacements if any exist
    if (manualReplacements.size > 0) {
      const data = result.imageData.data;

      // Fast RGB to Wplace color ID map
      const rgbToIdMap = new Map();
      WPLACE_PALETTE.forEach(c => rgbToIdMap.set(`${c.rgb[0]},${c.rgb[1]},${c.rgb[2]}`, c.id));

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < alphaCutoff) continue;
        const key = `${data[i]},${data[i + 1]},${data[i + 2]}`;
        const colorId = rgbToIdMap.get(key);
        if (colorId !== undefined && manualReplacements.has(colorId)) {
          const target = manualReplacements.get(colorId);
          data[i] = target.rgb[0];
          data[i + 1] = target.rgb[1];
          data[i + 2] = target.rgb[2];
        }
      }

      // Re-calculate stats breakdown for right sidebar
      const updatedStats = new Map();
      result.stats.forEach((count, colorId) => {
        if (colorId === 0) {
          updatedStats.set(0, count);
        } else if (manualReplacements.has(colorId)) {
          const targetId = manualReplacements.get(colorId).id;
          updatedStats.set(targetId, (updatedStats.get(targetId) || 0) + count);
        } else {
          updatedStats.set(colorId, (updatedStats.get(colorId) || 0) + count);
        }
      });
      result.stats = updatedStats;
    }

    // Put image data on processed canvas
    ctxProcessed.putImageData(result.imageData, 0, 0);

    // Update Section 4 Replace Wplace Colors panel
    updateReplaceColorPanel(originalQuantizedStats);

    // Update color statistics
    renderColorStats(result.stats, originalImage.width * originalImage.height);
    updateSplitClip();
  }

  // --- Color Statistics Rendering ---
  function renderColorStats(statsMap, totalPixels) {
    colorStatsList.innerHTML = '';
    let totalCount = 0;
    const sortedStats = [...statsMap.entries()].sort((a, b) => b[1] - a[1]);

    sortedStats.forEach(([colorId, count]) => {
      totalCount += count;
      const colorObj = WPLACE_PALETTE.find(c => c.id === colorId) || { name: 'Transparent', hex: 'transparent' };
      const percent = ((count / totalPixels) * 100).toFixed(1);

      const row = document.createElement('div');
      row.className = 'stat-row';
      row.innerHTML = `
        <div class="swatch" style="background: ${colorObj.hex === 'transparent' ? 'repeating-linear-gradient(45deg, #ccc 0 4px, #fff 4px 8px)' : colorObj.hex}"></div>
        <div class="stat-details">
          <span class="color-name-tag">#${colorObj.id} ${colorObj.name} ${colorObj.free ? '<span style="color:#22c55e">(Free)</span>' : ''}</span>
          <span class="color-count-tag">${count} px (${percent}%)</span>
        </div>
      `;
      colorStatsList.appendChild(row);
    });

    statTotalPixels.textContent = totalPixels.toLocaleString();
    statUniqueColors.textContent = sortedStats.length;
  }

  // --- Split View Slider & Modes ---
  function updateSplitClip() {
    if (!originalImage) return;

    if (currentViewMode === 'split') {
      wrapperOriginal.style.clipPath = `polygon(0 0, ${splitRatio * 100}% 0, ${splitRatio * 100}% 100%, 0 100%)`;
      wrapperProcessed.style.clipPath = 'none';
      splitDivider.style.display = 'block';
      splitDivider.style.left = `${splitRatio * 100}%`;
      wrapperOriginal.style.display = 'flex';
      wrapperProcessed.style.display = 'flex';
      stage.className = 'viewport-stage mode-split';
    } else if (currentViewMode === 'side') {
      wrapperOriginal.style.clipPath = 'none';
      wrapperProcessed.style.clipPath = 'none';
      splitDivider.style.display = 'none';
      wrapperOriginal.style.display = 'flex';
      wrapperProcessed.style.display = 'flex';
      stage.className = 'viewport-stage mode-side';
    } else if (currentViewMode === 'processed') {
      wrapperOriginal.style.display = 'none';
      wrapperProcessed.style.display = 'flex';
      wrapperProcessed.style.clipPath = 'none';
      splitDivider.style.display = 'none';
      stage.className = 'viewport-stage mode-single';
    } else if (currentViewMode === 'original') {
      wrapperOriginal.style.display = 'flex';
      wrapperProcessed.style.display = 'none';
      wrapperOriginal.style.clipPath = 'none';
      splitDivider.style.display = 'none';
      stage.className = 'viewport-stage mode-single';
    }
  }

  // --- Zoom & Pan ---
  function applyTransform() {
    stage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
    document.getElementById('zoom-level').textContent = `${Math.round(zoomLevel * 100)}%`;
  }

  function resetZoomAndPan() {
    if (!originalImage) return;
    zoomLevel = 1.0;
    panX = 0;
    panY = 0;

    const rect = canvasWorkspace.getBoundingClientRect();
    const scaleX = (rect.width - 60) / originalImage.width;
    const scaleY = (rect.height - 60) / originalImage.height;
    zoomLevel = Math.min(1.0, scaleX, scaleY);

    applyTransform();
  }

  // --- Palette Modal Grid Generator ---
  function renderPaletteModalGrid() {
    paletteGrid.innerHTML = '';
    const searchFilter = document.getElementById('input-palette-search').value.toLowerCase();

    WPLACE_PALETTE.slice(1).forEach(color => {
      if (searchFilter && !color.name.toLowerCase().includes(searchFilter) && !color.hex.toLowerCase().includes(searchFilter) && color.id.toString() !== searchFilter) {
        return;
      }

      const isSelected = customPaletteSelection.has(color.id);
      const item = document.createElement('div');
      item.className = `palette-item ${isSelected ? 'active' : ''}`;
      item.innerHTML = `
        <div class="swatch" style="background: ${color.hex}"></div>
        <div class="palette-item-text">
          <span class="palette-item-name">#${color.id} ${color.name}</span>
          <span class="palette-item-hex">${color.hex} ${color.free ? '• Free' : ''}</span>
        </div>
      `;

      item.addEventListener('click', () => {
        if (customPaletteSelection.has(color.id)) {
          customPaletteSelection.delete(color.id);
          item.classList.remove('active');
        } else {
          customPaletteSelection.add(color.id);
          item.classList.add('active');
        }
        updateCustomBadge();
      });

      paletteGrid.appendChild(item);
    });
  }

  function updateCustomBadge() {
    document.getElementById('custom-count-badge').textContent = `${customPaletteSelection.size} selected`;
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        fileNameDisplay.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = new Image();
          img.onload = () => {
            fileDimsDisplay.textContent = `${img.width} x ${img.height} px`;
            fileInfo.classList.remove('hidden');
            loadImage(img);
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });

    document.getElementById('btn-demo').addEventListener('click', loadDemoImage);

    // Eyedropper & Reset Buttons
    document.getElementById('btn-eyedropper').addEventListener('click', activateEyedropper);
    const btnResetMappings = document.getElementById('btn-reset-mappings');
    if (btnResetMappings) {
      btnResetMappings.addEventListener('click', () => {
        manualReplacements.clear();
        processAndRender();
      });
    }

    // Target Replacement Modal Close & Search
    document.getElementById('btn-close-replacement-modal').addEventListener('click', () => {
      modalReplacement.classList.add('hidden');
    });
    document.getElementById('input-replacement-search').addEventListener('input', renderReplacementModalGrid);

    // Palette Mode Selection
    radioPaletteModes.forEach(radio => {
      radio.addEventListener('change', (e) => {
        paletteMode = e.target.value;

        btnPresetAll.classList.toggle('active', paletteMode === 'all');
        btnPresetFree.classList.toggle('active', paletteMode === 'free');

        processAndRender();
      });
    });

    btnPresetAll.addEventListener('click', () => {
      document.querySelector('input[name="palette-mode"][value="all"]').checked = true;
      paletteMode = 'all';
      btnPresetAll.classList.add('active');
      btnPresetFree.classList.remove('active');
      processAndRender();
    });

    btnPresetFree.addEventListener('click', () => {
      document.querySelector('input[name="palette-mode"][value="free"]').checked = true;
      paletteMode = 'free';
      btnPresetFree.classList.add('active');
      btnPresetAll.classList.remove('active');
      processAndRender();
    });

    // Dithering & Range Controls
    selectDither.addEventListener('change', processAndRender);
    rangeDitherAmount.addEventListener('input', (e) => {
      valDitherAmount.textContent = `${e.target.value}%`;
      processAndRender();
    });
    selectColorSpace.addEventListener('change', processAndRender);
    rangeAlpha.addEventListener('input', (e) => {
      valAlpha.textContent = e.target.value;
      processAndRender();
    });

    // View Modes & Toolbar Buttons
    document.getElementById('view-split').addEventListener('click', () => setViewMode('split'));
    document.getElementById('view-side').addEventListener('click', () => setViewMode('side'));
    document.getElementById('view-processed').addEventListener('click', () => setViewMode('processed'));
    document.getElementById('view-original').addEventListener('click', () => setViewMode('original'));

    function setViewMode(mode) {
      currentViewMode = mode;
      document.querySelectorAll('.btn-tab').forEach(b => b.classList.remove('active'));
      document.getElementById(`view-${mode}`).classList.add('active');
      updateSplitClip();
    }

    // Zoom Controls
    document.getElementById('btn-zoom-in').addEventListener('click', () => { zoomLevel *= 1.25; applyTransform(); });
    document.getElementById('btn-zoom-out').addEventListener('click', () => { zoomLevel /= 1.25; applyTransform(); });
    document.getElementById('btn-zoom-reset').addEventListener('click', () => { zoomLevel = 1.0; applyTransform(); });
    document.getElementById('btn-zoom-fit').addEventListener('click', resetZoomAndPan);

    // Mouse Wheel Zoom
    canvasWorkspace.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      zoomLevel *= zoomFactor;
      applyTransform();
    });

    // Drag Pan
    canvasWorkspace.addEventListener('mousedown', (e) => {
      if (e.target.closest('#split-divider')) return;
      isPanning = true;
      startPanX = e.clientX - panX;
      startPanY = e.clientY - panY;
      canvasWorkspace.classList.add('grabbing');
    });

    window.addEventListener('mousemove', (e) => {
      if (isPanning) {
        panX = e.clientX - startPanX;
        panY = e.clientY - startPanY;
        applyTransform();
      } else if (isDraggingSplit) {
        const rect = stage.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        splitRatio = Math.max(0, Math.min(1, offsetX / rect.width));
        updateSplitClip();
      }
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      isDraggingSplit = false;
      canvasWorkspace.classList.remove('grabbing');
    });

    // Split Divider Dragging
    splitDivider.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      isDraggingSplit = true;
    });

    // Palette Modal Controls
    document.getElementById('btn-toggle-palette-modal').addEventListener('click', () => {
      modalPalette.classList.remove('hidden');
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => {
      modalPalette.classList.add('hidden');
    });

    document.getElementById('btn-apply-modal').addEventListener('click', () => {
      modalPalette.classList.add('hidden');
      document.querySelector('input[name="palette-mode"][value="custom"]').checked = true;
      paletteMode = 'custom';
      processAndRender();
    });

    document.getElementById('input-palette-search').addEventListener('input', renderPaletteModalGrid);

    document.getElementById('btn-palette-select-all').addEventListener('click', () => {
      customPaletteSelection = new Set(WPLACE_PALETTE.slice(1).map(c => c.id));
      renderPaletteModalGrid();
      updateCustomBadge();
    });

    document.getElementById('btn-palette-select-free').addEventListener('click', () => {
      customPaletteSelection = new Set(WPLACE_PALETTE.filter(c => c.free && c.id > 0).map(c => c.id));
      renderPaletteModalGrid();
      updateCustomBadge();
    });

    document.getElementById('btn-palette-clear').addEventListener('click', () => {
      customPaletteSelection.clear();
      renderPaletteModalGrid();
      updateCustomBadge();
    });

    // Export Modal & Download
    document.getElementById('btn-export').addEventListener('click', () => {
      modalExport.classList.remove('hidden');
    });

    document.getElementById('btn-close-export-modal').addEventListener('click', () => {
      modalExport.classList.add('hidden');
    });

    document.getElementById('btn-do-download').addEventListener('click', () => {
      if (!originalImage) return;

      const filename = document.getElementById('export-filename').value || 'wplace-artwork.png';
      const format = document.getElementById('export-format').value;
      const scale = parseInt(document.getElementById('export-scale').value, 10);

      const expCanvas = document.createElement('canvas');
      expCanvas.width = canvasProcessed.width * scale;
      expCanvas.height = canvasProcessed.height * scale;
      const expCtx = expCanvas.getContext('2d');
      expCtx.imageSmoothingEnabled = false;

      expCtx.drawImage(canvasProcessed, 0, 0, expCanvas.width, expCanvas.height);

      const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
      const link = document.createElement('a');
      link.download = filename;
      link.href = expCanvas.toDataURL(mimeType);
      link.click();

      modalExport.classList.add('hidden');
    });
  }

  // Start app
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
