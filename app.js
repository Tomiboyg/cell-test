(() => {
  'use strict';

  const DATA = window.QUIZ_DATA;
  if (!DATA || typeof DATA !== 'object' || !Object.keys(DATA).length) {
    document.body.innerHTML =
      '<div style="max-width:640px;margin:40px auto;padding:20px;border-radius:12px;background:#fdeaea;color:#a12626;font-family:system-ui,sans-serif;">' +
      '<strong>Chyba načítania dát:</strong> Súbor <code>data.js</code> nebol nájdený alebo neobsahuje <code>window.QUIZ_DATA</code>.' +
      '</div>';
    return;
  }

  const KEYS = Object.keys(DATA);
  const TAB_LABELS = {
    prokaryot: 'Prokaryotická',
    rastlinna: 'Rastlinná',
    zivocisna: 'Živočíšna',
  };

  const $ = (s) => document.querySelector(s);
  const els = {
    tabs: $('#tabs'), modes: $('#modes'),
    img: $('#img'), slots: $('#slots'), scroller: $('#scroller'),
    score: $('#score'), meter: $('#meter'), note: $('#note'), scrollhint: $('#scrollhint'),
    check: $('#btnCheck'), reveal: $('#btnReveal'), reset: $('#btnReset'),
    picker: $('#picker'), opts: $('#opts'), pickClose: $('#pickClose'),
  };

  let tab = KEYS[0];
  let mode = 'choice'; // 'choice' | 'type'
  let activeId = null;
  const store = {};

  /* ---------- pomocné funkcie ---------- */

  const norm = (s) =>
    String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '');

  function lev(a, b) {
    if (a === b) return 0;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // písanie: bez ohľadu na diakritiku a veľké písmená, toleruje jeden preklep
  function matches(it, typed) {
    const n = norm(typed);
    if (!n) return false;
    const candidates = [it.text, ...(Array.isArray(it.alias) ? it.alias : [])];
    return candidates.some((c) => {
      const k = norm(c);
      if (n === k) return true;
      const tol = k.length >= 14 ? 2 : k.length >= 6 ? 1 : 0;
      return tol > 0 && lev(n, k) <= tol;
    });
  }

  const item = (id) => DATA[tab].items.find((i) => i.id === id);

  function recs() {
    const k = tab + '|' + mode;
    if (!store[k]) {
      store[k] = {};
      DATA[tab].items.forEach((it) => {
        store[k][it.id] = { val: '', status: '', tries: 0, first: false, wrong: [], opts: null };
      });
    }
    return store[k];
  }

  const isFinal = (r) => r.status === 'ok' || r.status === 'shown';
  const slotEl = (id) => els.slots.querySelector(`[data-id="${id}"]`);

  /* ---------- vykresľovanie ---------- */

  function buildControls() {
    KEYS.forEach((k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.tab = k;
      b.textContent = TAB_LABELS[k] || DATA[k].title || k;
      els.tabs.append(b);
    });
  }

  function render() {
    closePicker();
    const d = DATA[tab];
    if (els.img.getAttribute('src') !== d.file) els.img.src = d.file;
    els.img.width = d.w;
    els.img.height = d.h;
    els.img.alt = d.title || '';

    els.slots.replaceChildren();
    d.items.forEach((it) => {
      const el = document.createElement('div');
      el.className = 'slot' + (it.h >= 38 ? ' tall' : '');
      el.dataset.id = it.id;
      el.style.left = (it.x / d.w) * 100 + '%';
      el.style.top = (it.y / d.h) * 100 + '%';
      el.style.width = (it.w / d.w) * 100 + '%';
      el.style.height = (it.h / d.h) * 100 + '%';
      els.slots.append(el);
      paint(el, it);
    });

    els.tabs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tab === tab)));
    els.modes.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    els.check.hidden = mode !== 'type';
    showNote('');
    updateStatus();
    updateScrollHint();
  }

  function paint(el, it) {
    const r = recs()[it.id];
    el.classList.toggle('ok', r.status === 'ok');
    el.classList.toggle('bad', r.status === 'bad');
    el.classList.toggle('shown', r.status === 'shown');

    if (isFinal(r)) {
      const sp = document.createElement('span');
      sp.textContent = it.text;
      el.replaceChildren(sp);
      el.removeAttribute('tabindex');
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
      return;
    }

    if (mode === 'choice') {
      const sp = document.createElement('span');
      sp.textContent = r.val || '?';
      if (!r.val) sp.className = 'ph';
      el.replaceChildren(sp);
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Vybrať názov tejto časti');
    } else {
      el.removeAttribute('role');
      let inp = el.querySelector('.in');
      if (!inp) {
        inp = document.createElement(el.classList.contains('tall') ? 'textarea' : 'input');
        inp.className = 'in';
        if (inp.tagName === 'INPUT') inp.type = 'text';
        else inp.rows = 2;
        inp.placeholder = '…';
        inp.autocomplete = 'off';
        inp.spellcheck = false;
        inp.setAttribute('autocapitalize', 'none');
        inp.setAttribute('autocorrect', 'off');
        inp.setAttribute('enterkeyhint', 'next');
        inp.setAttribute('aria-label', 'Napíš názov tejto časti');
        el.replaceChildren(inp);
      }
      if (inp.value !== r.val) inp.value = r.val;
    }
  }

  function paintId(id) {
    const el = slotEl(id);
    if (el) paint(el, item(id));
  }

  function updateStatus() {
    const all = Object.values(recs());
    const total = all.length;
    const ok = all.filter((r) => r.status === 'ok').length;
    const first = all.filter((r) => r.status === 'ok' && r.first).length;
    const shown = all.filter((r) => r.status === 'shown').length;

    els.score.innerHTML = `<b>${ok}</b> / ${total} správne` + (ok ? ` <span>· na prvý pokus ${first}</span>` : '');
    els.meter.style.width = (total ? (ok / total) * 100 : 0) + '%';

    if (total > 0 && ok === total) {
      showNote(`Hotovo! ${ok} / ${total}, z toho ${first} na prvý pokus. Skús to ešte raz cez „Znova“.`, 'good');
    } else if (total > 0 && ok + shown === total) {
      showNote('Riešenie je zobrazené. Cez „Znova“ si to môžeš vyskúšať odznova.', 'warn');
    }
  }

  function showNote(text, kind) {
    els.note.hidden = !text;
    els.note.textContent = text;
    els.note.className = 'note' + (kind ? ' ' + kind : '');
  }

  function updateScrollHint() {
    els.scrollhint.hidden = els.scroller.scrollWidth <= els.scroller.clientWidth + 2;
  }

  /* ---------- písanie ---------- */

  function checkOne(it) {
    const r = recs()[it.id];
    if (isFinal(r)) return null;
    const v = r.val.trim();
    if (!v) return null;
    if (matches(it, v)) {
      r.status = 'ok';
      r.val = it.text;
      r.first = r.tries === 0;
    } else {
      r.status = 'bad';
      r.tries++;
    }
    paintId(it.id);
    return r.status === 'ok';
  }

  function focusNext(afterId) {
    const items = DATA[tab].items;
    const start = items.findIndex((i) => i.id === afterId);
    for (let k = 1; k <= items.length; k++) {
      const it = items[(start + k) % items.length];
      if (!isFinal(recs()[it.id])) {
        const inp = slotEl(it.id)?.querySelector('.in');
        if (inp) { inp.focus(); return; }
      }
    }
  }

  els.slots.addEventListener('input', (e) => {
    const inp = e.target.closest('.in');
    if (!inp) return;
    const el = inp.closest('.slot');
    const r = recs()[el.dataset.id];
    r.val = inp.value;
    if (r.status === 'bad') {
      r.status = '';
      el.classList.remove('bad');
      updateStatus();
    }
  });

  els.slots.addEventListener('keydown', (e) => {
    const el = e.target.closest('.slot');
    if (!el) return;
    if (mode === 'type' && e.target.classList.contains('in') && e.key === 'Enter') {
      e.preventDefault();
      const it = item(el.dataset.id);
      const res = checkOne(it);
      updateStatus();
      if (res) focusNext(it.id);
    } else if (mode === 'choice' && (e.key === 'Enter' || e.key === ' ') && el.getAttribute('role') === 'button') {
      e.preventDefault();
      openPicker(el.dataset.id);
    }
  });

  els.check.addEventListener('click', () => {
    let empty = 0;
    DATA[tab].items.forEach((it) => {
      const r = recs()[it.id];
      if (isFinal(r)) return;
      if (!r.val.trim()) empty++;
      else checkOne(it);
    });
    updateStatus();
    const all = Object.values(recs());
    if (!all.every((r) => r.status === 'ok')) {
      const wrong = all.filter((r) => r.status === 'bad').length;
      const parts = [];
      if (wrong) parts.push(`${wrong} ${wrong === 1 ? 'pole je nesprávne' : wrong < 5 ? 'polia sú nesprávne' : 'polí je nesprávnych'}`);
      if (empty) parts.push(`${empty} ${empty === 1 ? 'pole je prázdne' : empty < 5 ? 'polia sú prázdne' : 'polí je prázdnych'}`);
      if (parts.length) showNote(parts.join(', ') + '.', 'warn');
    }
  });

  /* ---------- výber z možností ---------- */

  els.slots.addEventListener('click', (e) => {
    if (mode !== 'choice') return;
    const el = e.target.closest('.slot');
    if (!el || el.getAttribute('role') !== 'button') return;
    openPicker(el.dataset.id);
  });

  function openPicker(id) {
    els.slots.querySelectorAll('.slot.active').forEach((s) => s.classList.remove('active'));
    activeId = id;
    const it = item(id);
    const r = recs()[id];
    if (!r.opts) {
      const pool = DATA[tab].items.filter((x) => x.id !== id).map((x) => x.text);
      r.opts = shuffle([it.text, ...shuffle(pool).slice(0, 3)]);
    }
    renderOpts();
    els.picker.hidden = false;
    document.body.classList.add('picking');
    const el = slotEl(id);
    el.classList.add('active');
    el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
  }

  function renderOpts() {
    const r = recs()[activeId];
    els.opts.replaceChildren();
    r.opts.forEach((t, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.dataset.text = t;
      b.disabled = r.wrong.includes(t);
      const k = document.createElement('kbd');
      k.textContent = String(i + 1);
      b.append(k, document.createTextNode(t));
      b.addEventListener('click', () => choose(t, b));
      els.opts.append(b);
    });
  }

  function choose(text, btn) {
    const id = activeId;
    if (!id) return;
    const it = item(id);
    const r = recs()[id];
    if (text === it.text) {
      r.status = 'ok';
      r.val = text;
      r.first = r.tries === 0;
      paintId(id);
      closePicker();
    } else {
      r.status = 'bad';
      r.val = text;
      r.tries++;
      r.wrong.push(text);
      paintId(id);
      slotEl(id).classList.add('active');
      btn.disabled = true;
      btn.classList.add('shake');
    }
    updateStatus();
  }

  function closePicker() {
    els.picker.hidden = true;
    document.body.classList.remove('picking');
    els.slots.querySelectorAll('.slot.active').forEach((s) => s.classList.remove('active'));
    activeId = null;
  }

  els.pickClose.addEventListener('click', closePicker);

  document.addEventListener('keydown', (e) => {
    if (els.picker.hidden) return;
    if (e.key === 'Escape') {
      closePicker();
    } else if (/^[1-4]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const b = els.opts.children[Number(e.key) - 1];
      if (b && !b.disabled) b.click();
    }
  });

  /* ---------- ostatné ovládanie ---------- */

  els.tabs.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.dataset.tab === tab) return;
    tab = b.dataset.tab;
    render();
  });

  els.modes.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.dataset.mode === mode) return;
    mode = b.dataset.mode;
    render();
  });

  els.reveal.addEventListener('click', () => {
    closePicker();
    const rs = recs();
    DATA[tab].items.forEach((it) => {
      const r = rs[it.id];
      if (r.status !== 'ok') {
        r.status = 'shown';
        r.val = it.text;
      }
      paintId(it.id);
    });
    updateStatus();
  });

  els.reset.addEventListener('click', () => {
    delete store[tab + '|' + mode];
    render();
  });

  els.img.addEventListener('load', updateScrollHint);
  window.addEventListener('resize', updateScrollHint);

  buildControls();
  render();
})();
