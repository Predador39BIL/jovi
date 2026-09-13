// =========================================================
// Galeria Inteligente IA — lógica do protótipo
// =========================================================
(function () {
  'use strict';

  // ---------- "banco de fotos" (placeholders temáticos em CSS/SVG) ----------
  const PHOTOS = [
    { id: 1, theme: 'theme-lake', quality: '8K', tags: ['cidade', 'porto', 'lago', 'entardecer'], icon: iconSun(), dupGroup: null },
    { id: 2, theme: 'theme-city', quality: '8K', tags: ['cidade', 'mesquita', 'entardecer', 'viagem'], icon: iconCity(), dupGroup: null },
    { id: 3, theme: 'theme-animals', quality: '4K', tags: ['animais', 'natureza', 'esquilo'], icon: iconPaw(), dupGroup: null },
    { id: 4, theme: 'theme-forest', quality: '4K', tags: ['floresta', 'natureza', 'musgo'], icon: iconTree(), dupGroup: null },
    { id: 5, theme: 'theme-road', quality: '4K', tags: ['estrada', 'montanha', 'viagem'], icon: iconRoad(), dupGroup: null },
    { id: 6, theme: 'theme-flowers', quality: '2K', tags: ['campo', 'flores', 'natureza', 'vaca', 'animais'], icon: iconFlower(), dupGroup: null },
    { id: 7, theme: 'theme-mountain', quality: '4K', tags: ['montanha', 'natureza', 'viagem', 'araucaria'], icon: iconMountain(), dupGroup: null },
    { id: 8, theme: 'theme-beach', quality: 'FHD', tags: ['praia', 'mar', 'sombrinha', 'verao'], icon: iconUmbrella(), dupGroup: 'praia' },
    { id: 9, theme: 'theme-lake', quality: 'FHD', tags: ['praia', 'ilha', 'mar', 'montanha'], icon: iconSun(), dupGroup: null },
    { id: 10, theme: 'theme-dog', quality: '4K', tags: ['praia', 'cachorro', 'animais', 'pet'], icon: iconPaw(), dupGroup: null },
    { id: 11, theme: 'theme-beach', quality: '2K', tags: ['praia', 'mar', 'pessoas', 'verao'], icon: iconUmbrella(), dupGroup: 'praia' },
    { id: 12, theme: 'theme-city', quality: '4K', tags: ['praia', 'entardecer', 'sol', 'verao'], icon: iconSun(), dupGroup: null },
    { id: 13, theme: 'theme-flowers', quality: '4K', tags: ['praia', 'entardecer', 'mar', 'nuvem'], icon: iconSun(), dupGroup: null },
    { id: 14, theme: 'theme-flowers', quality: '2K', tags: ['praia', 'palmeira', 'verao', 'pessoas'], icon: iconFlower(), dupGroup: null },
    { id: 15, theme: 'theme-lake', quality: 'FHD', tags: ['praia', 'entardecer', 'mar'], icon: iconSun(), dupGroup: null },
    { id: 16, theme: 'theme-mountain', quality: 'FHD', tags: ['praia', 'ilha', 'mar', 'montanha'], icon: iconMountain(), dupGroup: null },
    { id: 17, theme: 'theme-snow', quality: '8K', tags: ['montanha', 'neve', 'natureza'], icon: iconMountain(), dupGroup: null },
    { id: 18, theme: 'theme-beach', quality: '4K', tags: ['praia', 'cachorro', 'animais'], icon: iconUmbrella(), dupGroup: 'praia' }
  ];

  let nextPhotoId = 100;

  const state = {
    quality: 'Todos',
    query: '',
    liked: new Set(),
    deleted: new Set(),
    currentPhotoId: 1,
    dupIndex: 0,
    mode: 'foto',
    facingMode: 'user',
    recording: false
  };

  // ---------- SVG icons usados dentro dos placeholders ----------
  function iconSun() { return '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.2" fill="white" opacity=".9"/><g stroke="white" stroke-width="1.4" stroke-linecap="round" opacity=".9"><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7"/></g></svg>'; }
  function iconMountain() { return '<svg viewBox="0 0 24 24" fill="none"><path d="M2 19l7-11 4 6 2-3 7 8H2z" fill="white" opacity=".85"/></svg>'; }
  function iconTree() { return '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l4 7h-2.5l3.5 6h-3v6h-4v-6H7l3.5-6H8l4-7z" fill="white" opacity=".85"/></svg>'; }
  function iconPaw() { return '<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="9" r="2" fill="white" opacity=".85"/><circle cx="12" cy="6.5" r="2" fill="white" opacity=".85"/><circle cx="18" cy="9" r="2" fill="white" opacity=".85"/><path d="M12 12c3 0 6 2 6 5a3 3 0 01-6 1 3 3 0 01-6-1c0-3 3-5 6-5z" fill="white" opacity=".85"/></svg>'; }
  function iconRoad() { return '<svg viewBox="0 0 24 24" fill="none"><path d="M9 3L4 21h4l1.5-6h5L16 21h4L15 3H9z" stroke="white" stroke-width="1.3" opacity=".85"/><path d="M12 9v3" stroke="white" stroke-width="1.6" stroke-linecap="round" opacity=".9"/></svg>'; }
  function iconFlower() { return '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.4" fill="white" opacity=".9"/><g fill="white" opacity=".8"><circle cx="12" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="12" r="2.2"/></g></svg>'; }
  function iconUmbrella() { return '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6.4 2 11.5h20C22 6.4 17.5 2 12 2z" fill="white" opacity=".85"/><path d="M12 11.5V20a2 2 0 01-3.5 1.3" stroke="white" stroke-width="1.4" stroke-linecap="round" opacity=".85"/></svg>'; }
  function iconCity() { return '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="10" width="4" height="10" fill="white" opacity=".8"/><rect x="9" y="6" width="4" height="14" fill="white" opacity=".85"/><rect x="15" y="12" width="4" height="8" fill="white" opacity=".8"/></svg>'; }

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  // ---------- toast ----------
  let toastTimer = null;
  function showToast(msg) {
    const el = qs('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  // ---------- navegação entre telas ----------
  function goTo(screenName) {
    qsa('.screen').forEach((s) => s.classList.toggle('active', s.dataset.screen === screenName));
    closeContextMenu();
    closeShareSheet();
    qs('#ai-panel').classList.remove('open');
    const installBtn = qs('#btn-install-app');
    if (installBtn) installBtn.hidden = screenName !== 'camera' || !deferredInstallPrompt;
    if (screenName === 'gallery') renderGrid('#photo-grid', filteredPhotos(), '#stats-count', '#grid-title', false);
    if (screenName === 'search') renderSearchResults();
    if (screenName === 'detail') renderDetail();
    if (screenName === 'duplicates') renderDuplicates();
  }

  function mediaInner(photo) {
    if (photo.kind === 'video') {
      return `<img src="${photo.poster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" /><span class="video-play-badge">▶</span>`;
    }
    if (photo.kind === 'captured') {
      return `<img src="${photo.img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />`;
    }
    return photo.icon;
  }

  function renderPhotoCell(photo, opts) {
    opts = opts || {};
    const badge = `<span class="grid-badge">${photo.quality}</span>`;
    const menuBtn = opts.menu ? `<button class="grid-menu-btn" data-menu-id="${photo.id}">⋮</button>` : '';
    const themeClass = photo.kind ? '' : photo.theme;
    return `
      <div class="grid-cell photo-thumb ${themeClass}" data-open-id="${photo.id}">
        ${mediaInner(photo)}
        ${badge}
        ${menuBtn}
      </div>`;
  }

  function filteredPhotos() {
    return PHOTOS.filter((p) => !state.deleted.has(p.id) && (state.quality === 'Todos' || p.quality === state.quality));
  }

  function renderGrid(gridSel, photos, statsSel, titleSel, isFavorites) {
    const grid = qs(gridSel);
    if (!grid) return;
    if (!photos.length) {
      grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#8a7aad;font-size:12px;padding:20px 0;">Nenhuma foto encontrada.</p>`;
    } else {
      grid.innerHTML = photos.map((p) => renderPhotoCell(p, { menu: true })).join('');
    }
    if (statsSel) {
      const hq = photos.filter((p) => p.quality === '4K' || p.quality === '8K').length;
      qs(statsSel).textContent = `${hq} fotos em 4K ou superior`;
    }
    if (titleSel) qs(titleSel).textContent = isFavorites ? 'Favoritos' : 'Melhores Fotos';

    qsa('[data-open-id]', grid).forEach((el) => {
      el.addEventListener('click', () => {
        state.currentPhotoId = Number(el.dataset.openId);
        goTo('detail');
      });
    });
    qsa('[data-menu-id]', grid).forEach((el) => {
      el.addEventListener('click', (ev) => {
        ev.stopPropagation();
        openContextMenu(el);
      });
    });
  }

  // ---------- busca por IA ----------
  function runSearch(query) {
    state.query = query.trim().toLowerCase();
    goTo('search');
  }

  function renderSearchResults() {
    const q = state.query || 'praia';
    const words = q.split(/\s+/).filter((w) => w.length > 2 && !['fotos', 'foto', 'na', 'no', 'de', 'com', 'em'].includes(w));
    let results = PHOTOS.filter((p) => !state.deleted.has(p.id) && words.some((w) => p.tags.some((t) => t.includes(w) || w.includes(t))));
    if (!results.length) results = PHOTOS.filter((p) => !state.deleted.has(p.id) && p.tags.includes('praia'));

    qs('#search-input-2').value = state.query ? capitalize(state.query) : 'Fotos na praia';
    const topic = words[0] || 'praia';
    qs('#search-banner-text').innerHTML = `A IA ENCONTROU <strong>${results.length} FOTOS</strong> DE ${topic.toUpperCase()}<br><span>Separado por Qualidade</span>`;

    renderGrid('#search-grid', results, null, null, false);
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // ---------- context menu ----------
  function openContextMenu(anchorEl) {
    const menu = qs('#context-menu');
    const phoneRect = qs('#phone').getBoundingClientRect();
    const rect = anchorEl.getBoundingClientRect();
    menu.style.left = Math.min(rect.left - phoneRect.left, phoneRect.width - 210) + 'px';
    menu.style.top = (rect.top - phoneRect.top) + 'px';
    menu.classList.add('open');
  }
  function closeContextMenu() { qs('#context-menu').classList.remove('open'); }

  qs('#context-menu').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    closeContextMenu();
    if (action === 'duplicates') { goTo('duplicates'); return; }
    if (action === 'lowquality') { state.quality = 'FHD'; qsa('.chip', qs('#quality-chips')).forEach(c => c.classList.toggle('active', c.dataset.quality === 'FHD')); renderGrid('#photo-grid', filteredPhotos(), '#stats-count', '#grid-title', false); showToast('Exibindo fotos de baixa qualidade (Full HD)'); return; }
    if (action === 'autoorganize') { showToast('IA organizando sua galeria por data e qualidade...'); return; }
    if (action === 'bestmoments') { showToast('Criando álbum "Melhores Momentos" com IA...'); return; }
  });

  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('#context-menu') && !ev.target.closest('[data-menu-id]')) closeContextMenu();
  });

  // ---------- detalhe / like / share ----------
  function renderDetail() {
    const photo = PHOTOS.find((p) => p.id === state.currentPhotoId) || PHOTOS[0];
    const container = qs('#detail-photo');
    if (photo.kind === 'video') {
      container.innerHTML = `<video src="${photo.videoUrl}" controls playsinline style="width:100%;height:100%;object-fit:cover;background:#000"></video>`;
    } else if (photo.kind === 'captured') {
      container.innerHTML = `<img src="${photo.img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />`;
    } else {
      container.innerHTML = `<div class="photo-thumb ${photo.theme}" style="width:100%;height:100%">${photo.icon}</div>`;
    }
    qs('#btn-like').classList.toggle('liked', state.liked.has(photo.id));

    const strip = qs('#filmstrip-detail');
    strip.innerHTML = PHOTOS.filter(p => !state.deleted.has(p.id)).slice(0, 8).map((p) => `
      <div class="film-cell photo-thumb ${p.kind ? '' : p.theme} ${p.id === photo.id ? 'active' : ''}" data-film-id="${p.id}">${p.kind === 'video' ? `<img src="${p.poster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />` : p.kind === 'captured' ? `<img src="${p.img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />` : ''}</div>
    `).join('');
    qsa('[data-film-id]', strip).forEach((el) => el.addEventListener('click', () => {
      state.currentPhotoId = Number(el.dataset.filmId);
      renderDetail();
    }));
  }

  qs('#btn-like').addEventListener('click', () => {
    const id = state.currentPhotoId;
    if (state.liked.has(id)) { state.liked.delete(id); showToast('Removido dos favoritos'); }
    else { state.liked.add(id); showToast('Adicionado aos favoritos ♥'); }
    qs('#btn-like').classList.toggle('liked', state.liked.has(id));
  });

  qs('#btn-enhance').addEventListener('click', () => {
    const photoEl = qs('#detail-photo .photo-thumb');
    photoEl.style.filter = 'saturate(1.35) contrast(1.12) brightness(1.05)';
    showToast('Foto aprimorada pela IA ✦');
  });

  qs('#btn-delete-photo').addEventListener('click', () => {
    state.deleted.add(state.currentPhotoId);
    showToast('Foto excluída');
    goTo('gallery');
  });

  qs('#btn-open-share').addEventListener('click', (ev) => {
    ev.stopPropagation();
    qs('#share-sheet').classList.toggle('open');
  });
  function closeShareSheet() { qs('#share-sheet').classList.remove('open'); }
  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('#share-sheet') && !ev.target.closest('#btn-open-share')) closeShareSheet();
  });
  qsa('.share-ic').forEach((btn) => {
    btn.addEventListener('click', () => {
      const network = btn.dataset.share;
      closeShareSheet();
      if (network === 'Instagram') { goTo('story'); return; }
      showToast(`Compartilhado no ${network}!`);
    });
  });

  // ---------- story ----------
  function renderStoryPhoto() {
    const photo = PHOTOS.find((p) => p.id === state.currentPhotoId) || PHOTOS[0];
    const holder = qs('#story-photo');
    let bg = holder.querySelector('.photo-thumb');
    if (!bg) {
      bg = document.createElement('div');
      bg.className = 'photo-thumb';
      bg.style.position = 'absolute'; bg.style.inset = '0'; bg.style.zIndex = '0';
      holder.prepend(bg);
    }
    bg.className = `photo-thumb ${photo.kind ? '' : photo.theme}`;
    if (photo.kind === 'video') bg.innerHTML = `<img src="${photo.poster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />`;
    else if (photo.kind === 'captured') bg.innerHTML = `<img src="${photo.img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />`;
    else bg.innerHTML = photo.icon;
  }
  qs('#btn-back-from-story').addEventListener('click', () => goTo('detail'));
  qsa('.story-dest').forEach((btn) => btn.addEventListener('click', () => {
    qsa('.story-dest').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  }));
  qs('#btn-send-story').addEventListener('click', () => {
    showToast('Story publicado com sucesso! ✨');
    setTimeout(() => goTo('gallery'), 700);
  });

  // ---------- duplicadas ----------
  function getDupGroups() {
    const groups = {};
    PHOTOS.filter(p => !state.deleted.has(p.id) && p.dupGroup).forEach((p) => {
      groups[p.dupGroup] = groups[p.dupGroup] || [];
      groups[p.dupGroup].push(p);
    });
    return Object.values(groups).filter((g) => g.length > 1);
  }

  function renderDuplicates() {
    const groups = getDupGroups();
    const strip = qs('#filmstrip-duplicates');
    strip.innerHTML = PHOTOS.filter(p => !state.deleted.has(p.id)).slice(0, 8).map((p) => `<div class="film-cell photo-thumb ${p.kind ? '' : p.theme}">${mediaInner(p)}</div>`).join('');

    if (state.dupIndex >= groups.length) state.dupIndex = 0;
    renderDupCards(groups);
  }

  function renderDupCards(groups) {
    const wrap = qs('#dup-cards');
    if (!groups.length) {
      wrap.innerHTML = `<p style="margin:auto;color:#8a7aad;font-size:12.5px;text-align:center;padding:0 20px;">Nenhuma foto duplicada encontrada. Sua galeria está organizada! ✨</p>`;
      return;
    }
    const group = groups[state.dupIndex];
    wrap.innerHTML = group.map((p, i) => `
      <div class="dup-card photo-thumb ${p.theme}" data-dup-id="${p.id}">
        ${p.icon}
        <span class="dup-check" data-checked="${i === 0}">✓</span>
      </div>
    `).join('');
    qsa('.dup-card', wrap).forEach((card) => {
      card.addEventListener('click', () => {
        const check = qs('.dup-check', card);
        const nowChecked = check.dataset.checked !== 'true';
        qsa('.dup-check', wrap).forEach((c) => (c.dataset.checked = 'false'));
        check.dataset.checked = String(nowChecked);
      });
    });
  }

  qs('#dup-prev').addEventListener('click', () => {
    const groups = getDupGroups();
    if (!groups.length) return;
    state.dupIndex = (state.dupIndex - 1 + groups.length) % groups.length;
    renderDupCards(groups);
  });
  qs('#dup-next').addEventListener('click', () => {
    const groups = getDupGroups();
    if (!groups.length) return;
    state.dupIndex = (state.dupIndex + 1) % groups.length;
    renderDupCards(groups);
  });
  qs('#btn-apagar').addEventListener('click', () => {
    const groups = getDupGroups();
    if (!groups.length) { showToast('Nada para apagar'); return; }
    const group = groups[state.dupIndex];
    const toDelete = qsa('.dup-card', qs('#dup-cards')).filter((c) => qs('.dup-check', c).dataset.checked !== 'true');
    if (!toDelete.length) { showToast('Selecione a foto que deseja manter'); return; }
    toDelete.forEach((c) => state.deleted.add(Number(c.dataset.dupId)));
    showToast(`${toDelete.length} foto(s) duplicada(s) apagada(s)`);
    renderDuplicates();
  });
  qs('#btn-manter').addEventListener('click', () => {
    showToast('Fotos mantidas na galeria');
    const groups = getDupGroups();
    if (groups.length) {
      state.dupIndex = (state.dupIndex + 1) % groups.length;
      renderDupCards(groups);
    }
  });

  // ---------- AI panel (câmera) ----------
  qs('#btn-ai-panel').addEventListener('click', (ev) => {
    ev.stopPropagation();
    qs('#ai-panel').classList.toggle('open');
  });
  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('#ai-panel') && !ev.target.closest('#btn-ai-panel')) qs('#ai-panel').classList.remove('open');
  });

  qsa('.ai-row').forEach((row) => {
    row.addEventListener('click', () => {
      const check = qs('.ai-row-check', row);
      const nowChecked = check.dataset.checked !== 'true';
      check.dataset.checked = String(nowChecked);
      const key = row.dataset.ai;

      if (key === 'blur') {
        qs('#blur-badge').style.display = nowChecked ? 'flex' : 'none';
      }
      if (key === 'night') {
        qs('#night-badge').hidden = !nowChecked;
        if (nowChecked) {
          startCompareLoop();
          showToast('Cena noturna detectada — arraste para comparar');
        } else {
          stopCompareLoop();
        }
      }
      if (key === 'auto') {
        qsa('.ai-row').forEach((r) => {
          if (r === row) return;
          const c = qs('.ai-row-check', r);
          if (['res', 'sharp', 'filters', 'blur'].includes(r.dataset.ai)) {
            c.dataset.checked = 'true';
            if (r.dataset.ai === 'blur') qs('#blur-badge').style.display = 'flex';
          }
        });
        showToast('IA aplicou o melhor ajuste para esta cena');
      }
      updateVideoFilter();
    });
  });

  // ---------- câmera real (getUserMedia) ----------
  let mediaStream = null;
  let mediaRecorder = null;
  let recordedChunks = [];
  let recTimerInterval = null;
  let recStartedAt = 0;

  function aiChecked(key) {
    const row = qs(`.ai-row[data-ai="${key}"]`);
    return row && qs('.ai-row-check', row).dataset.checked === 'true';
  }

  function updateVideoFilter() {
    const video = qs('#camera-video');
    if (!video) return;
    let brightness = 1, contrast = 1, saturate = 1;
    if (aiChecked('night')) { brightness *= 1.35; contrast *= 1.05; saturate *= 1.15; }
    if (aiChecked('sharp')) { contrast *= 1.12; }
    if (aiChecked('filters')) { saturate *= 1.18; }
    video.style.filter = `brightness(${brightness.toFixed(2)}) contrast(${contrast.toFixed(2)}) saturate(${saturate.toFixed(2)})`;
  }

  // ---------- comparador diagonal ao vivo (antes / depois do realce noturno) ----------
  let compareActive = false;
  let compareRAF = null;
  let compareSplit = 55; // % horizontal do divisor
  let compareDragging = false;

  function enhancedFilterString() {
    let brightness = 1.55, contrast = 1.1, saturate = 1.2;
    if (aiChecked('sharp')) contrast *= 1.12;
    if (aiChecked('filters')) saturate *= 1.18;
    return `brightness(${brightness.toFixed(2)}) contrast(${contrast.toFixed(2)}) saturate(${saturate.toFixed(2)})`;
  }

  function drawCompareFrame() {
    if (!compareActive) return;
    const canvas = qs('#camera-compare-canvas');
    const video = qs('#camera-video');
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w && h) {
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      const ctx = canvas.getContext('2d');

      if (video.videoWidth) {
        const vw = video.videoWidth, vh = video.videoHeight;
        const scale = Math.max(w / vw, h / vh);
        const sw = w / scale, sh = h / scale;
        const sx = (vw - sw) / 2, sy = (vh - sh) / 2;
        const skew = h * 0.38;
        const splitX = (compareSplit / 100) * w;

        ctx.clearRect(0, 0, w, h);
        ctx.filter = 'none';
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(splitX - skew / 2, 0);
        ctx.lineTo(w, 0);
        ctx.lineTo(w, h);
        ctx.lineTo(splitX + skew / 2, h);
        ctx.closePath();
        ctx.clip();
        ctx.filter = enhancedFilterString();
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
        ctx.restore();

        ctx.strokeStyle = 'rgba(255,255,255,.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(splitX - skew / 2, 0);
        ctx.lineTo(splitX + skew / 2, h);
        ctx.stroke();

        const midY = h / 2;
        const midX = splitX + (skew / 2) * (1 - (2 * midY) / h);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(midX, midY, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#111';
        ctx.font = '600 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('‹ ›', midX, midY + 1);
      }
    }
    compareRAF = requestAnimationFrame(drawCompareFrame);
  }

  function startCompareLoop() {
    if (compareActive) return;
    compareActive = true;
    compareSplit = 55;
    qs('#camera-compare-canvas').classList.add('active');
    qs('#camera-video').classList.add('compare-hidden');
    drawCompareFrame();
  }

  function stopCompareLoop() {
    compareActive = false;
    if (compareRAF) cancelAnimationFrame(compareRAF);
    qs('#camera-compare-canvas').classList.remove('active');
    qs('#camera-video').classList.remove('compare-hidden');
  }

  (function setupCompareDrag() {
    const canvas = qs('#camera-compare-canvas');
    function setFromClientX(clientX) {
      const rect = canvas.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      compareSplit = Math.max(8, Math.min(92, pct));
    }
    canvas.addEventListener('pointerdown', (e) => {
      compareDragging = true;
      canvas.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (compareDragging) setFromClientX(e.clientX);
    });
    canvas.addEventListener('pointerup', () => { compareDragging = false; });
  })();

  async function startCamera() {
    const video = qs('#camera-video');
    const fallback = qs('#camera-fallback');
    const permPanel = qs('#camera-permission');
    permPanel.hidden = true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      fallback.hidden = false;
      showToast('Este navegador não suporta acesso à câmera');
      return;
    }
    try {
      if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop());
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: state.facingMode },
        audio: true
      });
      video.srcObject = mediaStream;
      fallback.hidden = true;
      updateVideoFilter();
    } catch (err) {
      fallback.hidden = true;
      permPanel.hidden = false;
      qs('#camera-permission-text').textContent =
        err.name === 'NotAllowedError'
          ? 'Permissão de câmera negada. Toque para tentar novamente.'
          : 'Não foi possível acessar a câmera. Toque para tentar novamente.';
    }
  }

  qs('#btn-retry-camera').addEventListener('click', startCamera);

  function capturePhoto() {
    const video = qs('#camera-video');
    if (!video.srcObject || !video.videoWidth) { showToast('Câmera indisponível'); return; }
    const canvas = qs('#camera-canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.filter = video.style.filter || 'none';
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    const photo = {
      id: nextPhotoId++,
      kind: 'captured',
      img: dataUrl,
      quality: '4K',
      tags: ['capturada', 'câmera'],
      dupGroup: null
    };
    PHOTOS.unshift(photo);
    state.currentPhotoId = photo.id;
    updateGalleryThumbPreview();
    flashShutter();
    showToast(aiChecked('auto') || aiChecked('night') || aiChecked('sharp') || aiChecked('filters') ? 'Foto capturada com ajustes de IA ✔' : 'Foto capturada ✔');
  }

  function flashShutter() {
    const preview = qs('#camera-preview');
    const flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;inset:0;background:#fff;opacity:.85;z-index:30;pointer-events:none;';
    preview.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.transition = 'opacity .25s ease';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 260);
    });
  }

  function updateGalleryThumbPreview() {
    const el = qs('#gallery-thumb-preview');
    const latest = PHOTOS.find((p) => !state.deleted.has(p.id));
    if (!latest) return;
    if (latest.kind === 'video') {
      el.className = 'photo-thumb';
      el.style.cssText = 'width:100%;height:100%';
      el.innerHTML = `<img src="${latest.poster}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />`;
    } else if (latest.kind === 'captured') {
      el.className = 'photo-thumb';
      el.style.cssText = 'width:100%;height:100%';
      el.innerHTML = `<img src="${latest.img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" />`;
    } else {
      el.className = `photo-thumb ${latest.theme}`;
      el.style.cssText = 'width:100%;height:100%';
      el.innerHTML = '';
    }
  }

  function pickMimeType() {
    const candidates = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm', 'video/mp4'];
    for (const type of candidates) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) return type;
    }
    return '';
  }

  function startRecording() {
    if (!mediaStream) { showToast('Câmera indisponível'); return; }
    if (!window.MediaRecorder) { showToast('Gravação de vídeo não suportada neste navegador'); return; }
    recordedChunks = [];
    const mimeType = pickMimeType();
    try {
      mediaRecorder = mimeType ? new MediaRecorder(mediaStream, { mimeType }) : new MediaRecorder(mediaStream);
    } catch (e) {
      showToast('Não foi possível iniciar a gravação');
      return;
    }
    mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) recordedChunks.push(e.data); };
    mediaRecorder.onstop = onRecordingStop;
    mediaRecorder.start();

    state.recording = true;
    qs('#btn-shutter').classList.add('recording');
    qs('#rec-indicator').hidden = false;
    recStartedAt = Date.now();
    recTimerInterval = setInterval(() => {
      const secs = Math.floor((Date.now() - recStartedAt) / 1000);
      const mm = String(Math.floor(secs / 60)).padStart(2, '0');
      const ss = String(secs % 60).padStart(2, '0');
      qs('#rec-timer').textContent = `${mm}:${ss}`;
    }, 250);
    showToast('Gravando vídeo...');
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    state.recording = false;
    qs('#btn-shutter').classList.remove('recording');
    qs('#rec-indicator').hidden = true;
    clearInterval(recTimerInterval);
  }

  function onRecordingStop() {
    const video = qs('#camera-video');
    const canvas = qs('#camera-canvas');
    let poster = '';
    if (video.videoWidth) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      poster = canvas.toDataURL('image/jpeg', 0.85);
    }
    const blob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'video/webm' });
    const videoUrl = URL.createObjectURL(blob);

    const photo = {
      id: nextPhotoId++,
      kind: 'video',
      videoUrl,
      poster,
      quality: '4K',
      tags: ['vídeo', 'câmera'],
      dupGroup: null
    };
    PHOTOS.unshift(photo);
    state.currentPhotoId = photo.id;
    updateGalleryThumbPreview();
    showToast('Vídeo salvo na galeria ✔');
  }

  // ---------- mode tabs (Foto / Vídeo / Noite / Retrato / Microfilme) ----------
  qs('#mode-tabs').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-mode]');
    if (!btn) return;
    if (state.recording) { showToast('Pare a gravação antes de trocar de modo'); return; }
    qsa('#mode-tabs button').forEach((b) => b.classList.toggle('active', b === btn));
    state.mode = btn.dataset.mode;
    const shutter = qs('#btn-shutter');
    shutter.title = state.mode === 'video' ? 'Gravar vídeo' : 'Capturar foto';
    if (state.mode !== 'foto' && state.mode !== 'video') {
      showToast(`Modo ${btn.textContent} (simulado)`);
    }
  });

  // ---------- botão de disparo / flip / abrir galeria ----------
  qs('#btn-shutter').addEventListener('click', () => {
    const shutter = qs('#btn-shutter');
    shutter.style.transform = 'scale(.85)';
    setTimeout(() => (shutter.style.transform = ''), 140);

    if (state.mode === 'video') {
      if (state.recording) stopRecording();
      else startRecording();
      return;
    }
    capturePhoto();
  });

  qs('#btn-flip').addEventListener('click', async () => {
    if (state.recording) { showToast('Pare a gravação antes de inverter a câmera'); return; }
    state.facingMode = state.facingMode === 'user' ? 'environment' : 'user';
    showToast('Invertendo câmera...');
    await startCamera();
  });

  qs('#btn-open-gallery').addEventListener('click', () => goTo('gallery'));
  qs('#btn-open-camera-from-gallery').addEventListener('click', () => goTo('camera'));

  // inicia a câmera assim que o app carrega (tela inicial é a câmera)
  startCamera();

  // ---------- toasts genéricos via data-toast ----------
  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-toast]');
    if (el) showToast(el.dataset.toast);
  });

  // ---------- filtros de qualidade (galeria) ----------
  qs('#quality-chips').addEventListener('click', (ev) => {
    const chip = ev.target.closest('.chip');
    if (!chip) return;
    state.quality = chip.dataset.quality;
    qsa('.chip', qs('#quality-chips')).forEach((c) => c.classList.toggle('active', c === chip));
    renderGrid('#photo-grid', filteredPhotos(), '#stats-count', '#grid-title', false);
  });

  // ---------- busca ----------
  qs('#search-input').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.value.trim()) runSearch(ev.target.value);
  });
  qs('#search-input-2').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && ev.target.value.trim()) { state.query = ev.target.value; renderSearchResults(); }
  });
  qs('#btn-back-from-search').addEventListener('click', () => goTo('gallery'));
  qs('#btn-back-from-detail').addEventListener('click', () => goTo('gallery'));
  qs('#btn-back-from-duplicates').addEventListener('click', () => goTo('gallery'));
  qs('#btn-saiba-mais').addEventListener('click', () => showToast('586 fotos organizadas automaticamente por qualidade e conteúdo'));
  qs('#btn-ver-todas').addEventListener('click', () => showToast('Exibindo todas as fotos'));

  // ---------- navegação inferior ----------
  qsa('.bottom-nav').forEach((nav) => {
    nav.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.nav-item');
      if (!btn) return;
      const target = btn.dataset.nav;
      if (target === 'camera') goTo('camera');
      else if (target === 'gallery') { state.quality = 'Todos'; goTo('gallery'); }
      else if (target === 'search') { qs('#search-input') && goTo('gallery'); setTimeout(() => qs('#search-input').focus(), 50); }
      else if (target === 'favoritos') {
        goTo('gallery');
        const favs = PHOTOS.filter((p) => state.liked.has(p.id) && !state.deleted.has(p.id));
        renderGrid('#photo-grid', favs, '#stats-count', '#grid-title', true);
        showToast(favs.length ? `${favs.length} foto(s) favoritas` : 'Nenhuma foto favoritada ainda');
      } else if (target === 'albuns') {
        showToast('Abrindo Álbuns...');
      }
    });
  });

  // ---------- override do gatilho de story para atualizar a foto exibida ----------
  const originalGoTo = goTo;
  window.__goTo = function (screen) {
    originalGoTo(screen);
    if (screen === 'story') renderStoryPhoto();
  };

  // substitui chamadas internas relevantes (share -> Instagram) para usar o wrapper
  qsa('.share-ic.ig').forEach((btn) => {
    btn.addEventListener('click', () => setTimeout(renderStoryPhoto, 0));
  });

  // ---------- instalar como app (PWA) ----------
  let deferredInstallPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    qs('#btn-install-app').hidden = false;
  });
  qs('#btn-install-app').addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    qs('#btn-install-app').hidden = true;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
  });
  window.addEventListener('appinstalled', () => {
    qs('#btn-install-app').hidden = true;
    showToast('App instalado! Abra pela tela inicial 🎉');
  });

  // ---------- estado inicial ----------
  renderGrid('#photo-grid', filteredPhotos(), '#stats-count', '#grid-title', false);
})();
