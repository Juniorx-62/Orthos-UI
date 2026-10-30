/* =====================================================================
   Orthos UI — comportamentos (JS sem dependências)
   Os componentes são ativados por atributos data-ac="nome".
   Orthos.init(raiz) ativa tudo dentro de "raiz" (chamado automaticamente no carregamento).
   APIs: Orthos.toast(), Orthos.command(), Orthos.skeleton(), Orthos.open(), Orthos.close(), Orthos.confirm(), Orthos.alert()
   ===================================================================== */
(function (global) {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let uid = 0; const id = p => `${p}-${++uid}`;

  const ICONS = {
    check: '<path d="M5 14L8.5 17.5L19 6.5"/>',
    x: '<path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16V12"/><path d="M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z"/>',
    alert: '<path d="M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z"/><path d="M12 9V13"/><path d="M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z"/>',
    chevron: '<path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"/>',
    left: '<path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"/>', right: '<path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"/>',
    search: '<path d="M17 17L21 21"/><path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"/>',
    file: '<path d="M8 7L16 7"/><path d="M8 11L12 11"/><path d="M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z"/>',
    upload: '<path d="M5.25 21H18.75C18.9822 21 19.0983 21 19.196 20.9904C20.1456 20.8968 20.8968 20.1456 20.9904 19.196C21 19.0983 21 18.9822 21 18.75C21 18.5178 21 18.4017 20.9904 18.304C20.8968 17.3544 20.1456 16.6032 19.196 16.5096C19.0983 16.5 18.9822 16.5 18.75 16.5H17.0607C16.8324 16.5 16.7182 16.5 16.6087 16.5121C16.2317 16.5538 15.8742 16.7018 15.5781 16.939C15.4921 17.0079 15.4114 17.0886 15.25 17.25C15.0886 17.4114 15.0079 17.4921 14.9219 17.561C14.6258 17.7982 14.2683 17.9462 13.8913 17.9879C13.7818 18 13.6676 18 13.4393 18H10.5607C10.3324 18 10.2182 18 10.1087 17.9879C9.73165 17.9462 9.37423 17.7982 9.07814 17.561C8.99213 17.4921 8.91142 17.4114 8.75 17.25C8.58858 17.0886 8.50787 17.0079 8.42186 16.939C8.12577 16.7018 7.76835 16.5538 7.3913 16.5121C7.28177 16.5 7.16763 16.5 6.93934 16.5H5.25C5.01783 16.5 4.90175 16.5 4.80397 16.5096C3.85441 16.6032 3.10315 17.3544 3.00963 18.304C3 18.4017 3 18.5178 3 18.75C3 18.9822 3 19.0983 3.00963 19.196C3.10315 20.1456 3.85441 20.8968 4.80397 20.9904C4.90175 21 5.01783 21 5.25 21Z"/><path d="M16.5 7.49996C16.5 7.49996 13.1858 3.00001 12 3C10.8141 2.99999 7.5 7.5 7.5 7.5M12 4V15"/>',
    sort: '<path d="M7 4V20"/><path d="M17 19L17 4"/><path d="M10 6.99998C10 6.99998 7.79053 4.00001 6.99998 4C6.20942 3.99999 4 7 4 7"/><path d="M20 17C20 17 17.7905 20 17 20C16.2094 20 14 17 14 17"/>',
    trash: '<path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"/><path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"/><path d="M9.5 16.5L9.5 10.5"/><path d="M14.5 16.5L14.5 10.5"/>'
  };
  const icon = (n, cls = 'ac-icon') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* ---------------- posicionamento de flutuantes ---------------- */
  function place(pop, anchor, side = 'bottom', align = 'start', gap = 8) {
    // tamanho de layout do pop: o getBoundingClientRect pegaria a escala .95 da animação de abertura e o pop vazaria da tela
    const a = anchor.getBoundingClientRect(), p = { width: pop.offsetWidth, height: pop.offsetHeight };
    const vw = innerWidth, vh = innerHeight;
    let top, left;
    if (side === 'top') top = a.top - p.height - gap; else if (side === 'bottom') top = a.bottom + gap; else top = a.top + a.height / 2 - p.height / 2;
    if (side === 'top' || side === 'bottom') left = align === 'center' ? a.left + a.width / 2 - p.width / 2 : align === 'end' ? a.right - p.width : a.left;
    if (side === 'bottom' && top + p.height > vh - 8 && a.top - p.height - gap > 8) { top = a.top - p.height - gap; pop.style.setProperty('--origin', 'bottom left'); } else pop.style.setProperty('--origin', side === 'top' ? 'bottom center' : 'top left');
    left = Math.max(8, Math.min(left, vw - p.width - 8));
    top = Math.max(8, Math.min(top, vh - p.height - 8));
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
  }

  /* ---------------- rolar até um elemento ----------------
     Rola só o contêiner com rolagem mais próximo (ou a própria página). Não usa scrollIntoView, que também rola a
     página de fora quando o Orthos roda dentro de um iframe (achado P0 do linter do Open Design, 27/10/2026). */
  function reveal(el, block = 'nearest', smooth = false) {
    if (!el || !el.getBoundingClientRect) return;
    let sc = el.parentElement;
    while (sc && sc !== document.body && sc !== document.documentElement) { const s = getComputedStyle(sc); if (/(auto|scroll)/.test(s.overflowY) && sc.scrollHeight > sc.clientHeight) break; sc = sc.parentElement; }
    const page = !sc || sc === document.body || sc === document.documentElement;
    // dentro de um contêiner, mede por offsetTop: não sofre a escala da animação de abertura dos pops
    const abs = n => { let y = 0; while (n) { y += n.offsetTop; n = n.offsetParent; } return y; };
    const r = el.getBoundingClientRect(), eh = page ? r.height : el.offsetHeight, h = page ? innerHeight : sc.clientHeight, cur = page ? scrollY : sc.scrollTop;
    const off = page ? r.top : abs(el) - abs(sc) - sc.clientTop - cur;
    let to = cur;
    if (block === 'center') to = cur + off - (h - eh) / 2;
    else if (off < 0) to = cur + off;
    else if (off + eh > h) to = cur + off + eh - h;
    if (Math.abs(to - cur) < 1) return;
    const opt = { top: Math.max(0, to), behavior: smooth && !reduce() ? 'smooth' : 'auto' };
    page ? scrollTo(opt) : sc.scrollTo(opt);
  }

  /* ---------------- popover genérico ---------------- */
  const openPops = new Set();
  function openPop(pop, anchor, opts = {}) {
    closeAllPops(pop);
    pop.hidden = false;
    // dentro de um <dialog> aberto o pop fica no próprio diálogo: no <body> ficaria inerte, atrás da camada do modal
    const host = (anchor.closest && anchor.closest('dialog[open]')) || document.body;
    if (pop.parentElement !== host) { if (!pop._home) pop._home = pop.parentElement; host.appendChild(pop); }
    pop.classList.add('ac');
    place(pop, anchor, opts.side, opts.align);
    // owner: quem anuncia aria-expanded quando a âncora de posição é outro elemento (ex.: o campo do seletor de pessoas)
    pop._anchor = anchor; pop._owner = opts.owner || anchor; pop._owner.setAttribute('aria-expanded', 'true');
    openPops.add(pop);
    pop._onClose = opts.onClose;
  }
  function closePop(pop, focusBack) {
    if (!pop || pop.hidden) return;
    pop.hidden = true; openPops.delete(pop);
    const owner = pop._owner || pop._anchor;
    if (owner) { owner.setAttribute('aria-expanded', 'false'); if (focusBack) owner.focus(); }
    pop._onClose && pop._onClose();
  }
  function closeAllPops(except) { openPops.forEach(p => { if (p !== except) closePop(p); }); }
  document.addEventListener('pointerdown', e => { openPops.forEach(p => { if (!p.contains(e.target) && !(p._anchor && p._anchor.contains(e.target))) closePop(p); }); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') openPops.forEach(p => closePop(p, true)); });
  addEventListener('resize', () => openPops.forEach(p => closePop(p)));
  addEventListener('scroll', e => { openPops.forEach(p => { if (!p.contains(e.target)) closePop(p); }); }, true);

  /* ---------------- diálogos (dialog nativo + animação de saída) ---------------- */
  function open(dlg) {
    if (typeof dlg === 'string') dlg = $(dlg); if (!dlg) return;
    if (dlg._closing) { dlg._closing(); return; } // reabriu durante a animação de saída: cancela o fechamento
    if (dlg.open) return; dlg.showModal();
  }
  // aria-busy="true" segura o diálogo aberto (Esc, clique fora e data-ac-close) enquanto uma ação está em andamento
  function close(dlg, value) {
    if (typeof dlg === 'string') dlg = $(dlg); if (!dlg || !dlg.open || dlg._closing || dlg.getAttribute('aria-busy') === 'true') return;
    if (reduce()) { dlg.close(value); return; }
    dlg.classList.add('is-closing');
    let t;
    const done = keep => { clearTimeout(t); dlg.removeEventListener('animationend', end); dlg._closing = null; dlg.classList.remove('is-closing'); if (keep !== true) dlg.close(value); };
    const end = e => { if (e.target === dlg) done(); };
    dlg._closing = () => done(true);
    dlg.addEventListener('animationend', end);
    t = setTimeout(done, 400); // reserva, caso a animação não rode
  }
  document.addEventListener('click', e => {
    const o = e.target.closest('[data-ac-open]'); if (o) { e.preventDefault(); open(o.getAttribute('data-ac-open')); return; }
    const c = e.target.closest('[data-ac-close]'); if (c) { e.preventDefault(); close(c.closest('dialog'), c.getAttribute('data-ac-close') || ''); return; }
    const d = e.target; if (d.tagName === 'DIALOG' && (d.classList.contains('ac-dialog') || d.classList.contains('ac-sheet'))) { const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(d); }
  });
  document.addEventListener('cancel', e => { if (e.target.matches('.ac-dialog, .ac-sheet')) { e.preventDefault(); close(e.target); } }, true);

  /* ---------------- toast ----------------
     A região de avisos existe desde o carregamento (aria-live polite), para o leitor de tela anunciar até o primeiro
     aviso. Alt+T leva o foco aos avisos; a pilha recolhida abre no hover/foco; arrastar para o lado dispensa.
     Padrões observados no Sonner (sonner.emilkowal.ski, 27/10/2026), implementação própria. */
  // dois cantos: o padrão (embaixo, à direita) e o topo centralizado, para confirmações ligadas ao que está no alto da tela
  function toaster(pos) {
    const top = pos === 'top';
    let host = $(top ? '.ac-toaster--top' : '.ac-toaster:not(.ac-toaster--top)');
    if (!host) {
      host = document.createElement('section'); host.className = top ? 'ac ac-toaster ac-toaster--top' : 'ac ac-toaster'; host.tabIndex = -1;
      host.setAttribute('aria-label', 'Notificações (Alt+T)'); host.setAttribute('aria-live', 'polite'); host.setAttribute('aria-relevant', 'additions text');
      document.body.appendChild(host);
    }
    return host;
  }
  const restack = host => { const ts = $$('.ac-toast:not(.is-leaving)', host); ts.forEach((t, i) => t.style.setProperty('--k', ts.length - 1 - i)); };
  let toastReturn = null;
  document.addEventListener('keydown', e => {
    if (e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 't') { const last = $$('.ac-toaster .ac-toast').pop(), h = last && last.closest('.ac-toaster'); if (last) { e.preventDefault(); if (!h.contains(document.activeElement)) toastReturn = document.activeElement; last.focus(); } }
  });
  function toast(o) {
    if (typeof o === 'string') o = { title: o };
    const host = toaster(o.position);
    const t = document.createElement('div');
    t.tabIndex = 0;
    const paint = (o) => {
      const type = o.type || 'default';
      // variant: 'pill' = cápsula curta (ícone + uma linha), para confirmações rápidas como "Copiado #ffffff"
      t.className = `ac-toast ac-toast--${type}${o.variant === 'pill' ? ' ac-toast--pill' : ''}`;
      if (type === 'danger') t.setAttribute('role', 'alert'); else t.removeAttribute('role');
      t.setAttribute('aria-busy', type === 'loading');
      // swatch: amostra de cor no lugar do ícone (só aceita uma cor CSS válida)
      const sw = o.swatch && CSS.supports('color', o.swatch) ? `<span class="ac-toast__swatch" style="background:${esc(o.swatch)}" aria-hidden="true"></span>` : '';
      const lead = type === 'loading' ? '<span class="ac-spinner" aria-hidden="true"></span>' : sw || icon(type === 'success' ? 'check' : type === 'danger' ? 'alert' : 'info');
      t.innerHTML = `${lead}<div class="ac-toast__title">${esc(o.title)}</div>${o.desc ? `<div class="ac-toast__desc">${esc(o.desc)}</div>` : ''}${o.action ? `<button class="ac-btn ac-btn--secondary ac-btn--sm ac-toast__action" type="button">${esc(o.action.label)}</button>` : ''}`;
      if (o.action) t.querySelector('.ac-toast__action').onclick = () => { o.action.onClick && o.action.onClick(); kill(); };
    };
    let timer;
    const kill = () => {
      if (t.classList.contains('is-leaving')) return; clearTimeout(timer); t.classList.add('is-leaving'); restack(host);
      // o foco estava no aviso: passa para o aviso seguinte ou volta para onde estava antes do Alt+T
      if (t.contains(document.activeElement)) { const next = $$('.ac-toast:not(.is-leaving)', host).pop(); if (next) next.focus(); else if (toastReturn && toastReturn.isConnected) toastReturn.focus(); else host.focus(); }
      setTimeout(() => { t.remove(); restack(host); }, 250);
    };
    const arm = (ms) => { clearTimeout(timer); if (ms !== Infinity) timer = setTimeout(kill, ms); };
    paint(o); host.appendChild(t);
    while ($$('.ac-toast', host).length > 5) host.firstElementChild.remove();
    restack(host);
    arm(o.type === 'loading' ? Infinity : (o.duration || 4200));
    t.addEventListener('mouseenter', () => clearTimeout(timer));
    t.addEventListener('mouseleave', () => { if (t.getAttribute('aria-busy') !== 'true' && !t.contains(document.activeElement)) arm(1800); });
    t.addEventListener('focusin', () => clearTimeout(timer));
    t.addEventListener('focusout', e => { if (!t.contains(e.relatedTarget) && !t.matches(':hover') && t.getAttribute('aria-busy') !== 'true' && !t.classList.contains('is-leaving')) arm(1800); });
    t.addEventListener('keydown', e => { if (e.key === 'Escape' || e.key === 'Delete') { e.preventDefault(); kill(); } });
    // arrastar para dispensar
    let x0 = null;
    t.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; x0 = e.clientX; t.setPointerCapture(e.pointerId); t.classList.add('is-swiping'); });
    t.addEventListener('pointermove', e => { if (x0 === null) return; const dx = Math.max(0, e.clientX - x0); t.style.transform = `translateX(${dx}px)`; t.style.opacity = String(1 - Math.min(1, dx / 220)); });
    const end = e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; t.classList.remove('is-swiping'); if (dx > 80) { t.style.transform = 'translateX(110%)'; t.style.opacity = '0'; setTimeout(() => { t.remove(); restack(host); }, 200); } else { t.style.transform = ''; t.style.opacity = ''; } };
    t.addEventListener('pointerup', end); t.addEventListener('pointercancel', end);
    const api = Object.assign(kill, { update(n) { paint({ ...o, ...n }); Object.assign(o, n); arm(n.type === 'loading' ? Infinity : (n.duration || 4200)); } });
    return api;
  }
  /* aviso que acompanha uma promessa: "carregando" → sucesso ou erro */
  toast.promise = (p, msg = {}) => {
    const t = toast({ type: 'loading', title: msg.loading || 'Processando…', desc: msg.loadingDesc });
    Promise.resolve(p).then(v => t.update({ type: 'success', title: typeof msg.success === 'function' ? msg.success(v) : (msg.success || 'Concluído'), desc: msg.successDesc }),
      err => t.update({ type: 'danger', title: typeof msg.error === 'function' ? msg.error(err) : (msg.error || 'Algo deu errado'), desc: msg.errorDesc }));
    return p;
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', toaster); else toaster();

  /* ---------------- componentes ---------------- */
  const C = {};

  C.tabs = el => {
    const list = $('.ac-tabs__list', el), tabs = $$('.ac-tabs__tab', el), panels = $$('.ac-tabs__panel', el);
    list.setAttribute('role', 'tablist');
    const ink = document.createElement('span'); ink.className = 'ac-tabs__ink'; list.appendChild(ink);
    tabs.forEach((t, i) => { const pid = panels[i].id || (panels[i].id = id('panel')); t.id = t.id || id('tab'); t.setAttribute('role', 'tab'); t.setAttribute('aria-controls', pid); panels[i].setAttribute('role', 'tabpanel'); panels[i].setAttribute('aria-labelledby', t.id); panels[i].tabIndex = 0; });
    const sel = (i, focus) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', i === j); t.tabIndex = i === j ? 0 : -1; panels[j].hidden = i !== j; });
      ink.style.width = tabs[i].offsetWidth + 'px'; ink.style.transform = `translateX(${tabs[i].offsetLeft}px)`;
      if (el._revealTab) el._revealTab(tabs[i], true);
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => sel(i)));
    list.addEventListener('keydown', e => { const i = tabs.indexOf(document.activeElement); const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key]; if (n === undefined) return; e.preventDefault(); sel((n + tabs.length) % tabs.length, true); });
    const start = Math.max(0, tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'));
    tabsOverflow(el, list, tabs[start]);
    requestAnimationFrame(() => sel(start));
    new ResizeObserver(() => sel(tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'))).observe(list);
  };

  C.segmented = el => {
    const btns = $$('button', el); const pill = document.createElement('span'); pill.className = 'ac-segmented__pill'; el.prepend(pill);
    el.setAttribute('role', 'group');
    const sel = b => { btns.forEach(x => x.setAttribute('aria-pressed', x === b)); pill.style.width = b.offsetWidth + 'px'; pill.style.transform = `translateX(${b.offsetLeft - 3}px)`; el.dispatchEvent(new CustomEvent('ac:change', { detail: b.value || b.textContent.trim(), bubbles: true })); };
    btns.forEach(b => b.addEventListener('click', () => sel(b)));
    requestAnimationFrame(() => sel(btns.find(b => b.getAttribute('aria-pressed') === 'true') || btns[0]));
  };

  C.accordion = el => {
    const single = el.dataset.type !== 'multiple';
    $$('.ac-accordion__item', el).forEach(item => {
      const tr = $('.ac-accordion__trigger', item), pn = $('.ac-accordion__panel', item);
      pn.id = pn.id || id('acc'); tr.setAttribute('aria-controls', pn.id); tr.setAttribute('aria-expanded', item.classList.contains('is-open'));
      pn.setAttribute('role', 'region'); pn.setAttribute('aria-labelledby', tr.id = tr.id || id('acct'));
      tr.addEventListener('click', () => {
        const on = !item.classList.contains('is-open');
        if (single) $$('.ac-accordion__item.is-open', el).forEach(o => { o.classList.remove('is-open'); $('.ac-accordion__trigger', o).setAttribute('aria-expanded', 'false'); });
        item.classList.toggle('is-open', on); tr.setAttribute('aria-expanded', on);
      });
    });
  };

  C.menu = el => {
    const pop = $(el.dataset.target); if (!pop) return;
    pop.setAttribute('role', 'menu'); el.setAttribute('aria-haspopup', 'menu'); el.setAttribute('aria-expanded', 'false');
    const items = () => $$('.ac-menu__item', pop);
    items().forEach(i => i.setAttribute('role', 'menuitem'));
    const show = (focusLast) => { openPop(pop, el, { side: 'bottom', align: el.dataset.align || 'start' }); const it = items(); (focusLast ? it[it.length - 1] : it[0])?.focus(); };
    el.addEventListener('click', () => pop.hidden ? show() : closePop(pop));
    el.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); show(); } if (e.key === 'ArrowUp') { e.preventDefault(); show(true); } });
    menuKeys(pop);
    pop.addEventListener('click', e => { const it = e.target.closest('.ac-menu__item'); if (it) { closePop(pop, true); el.dispatchEvent(new CustomEvent('ac:select', { detail: it.dataset.value || it.textContent.trim(), bubbles: true })); } });
  };

  // tooltip: qualquer elemento com data-tip
  let tipEl, tipTimer;
  function showTip(t) { clearTimeout(tipTimer); tipTimer = setTimeout(() => { hideTip(); tipEl = document.createElement('div'); tipEl.className = 'ac ac-tip'; tipEl.id = 'ac-tip'; tipEl.setAttribute('role', 'tooltip'); tipEl.textContent = t.dataset.tip; document.body.appendChild(tipEl); t.setAttribute('aria-describedby', 'ac-tip'); place(tipEl, t, t.dataset.tipSide || 'top', 'center', 8); }, 350); }
  function hideTip() { clearTimeout(tipTimer); if (tipEl) { tipEl.remove(); tipEl = null; } $$('[aria-describedby="ac-tip"]').forEach(x => x.removeAttribute('aria-describedby')); }
  document.addEventListener('pointerover', e => { const t = e.target.closest('[data-tip]'); if (t) showTip(t); });
  document.addEventListener('pointerout', e => { if (e.target.closest('[data-tip]')) hideTip(); });
  document.addEventListener('focusin', e => { const t = e.target.closest('[data-tip]'); if (t && t.matches(':focus-visible')) showTip(t); });
  document.addEventListener('focusout', hideTip);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); });

  // dígitos arábicos (٠-٩) e persas (۰-۹) viram 0-9: teclados e SMS nesses idiomas mandam o código assim
  const otpDigits = s => String(s || '').replace(/[٠-٩۰-۹]/g, c => String(c.charCodeAt(0) & 15));
  // acha o código no texto colado ("Seu código: 482 913. Válido por 10 min"): prefere um trecho com exatamente len dígitos
  const otpCode = (t, len) => { const runs = (otpDigits(String(t || '').normalize('NFKC')).match(/\d(?:[\s‐‑–-]?\d)*/g) || []).map(r => r.replace(/\D/g, '')); return runs.find(r => r.length === len) || runs.join(''); };
  /* Input OTP no modelo do Kobra: um único <input> transparente por cima das casas (o SMS do iOS e do Android preenche tudo
     de uma vez), um anel que desliza até a casa ativa, dígitos que entram girando, rastro ao colar, onda enquanto confere
     e varredura com salto quando o código está certo. */
  C.otp = el => {
    const len = +el.dataset.length || 6, half = Math.ceil(len / 2), msgId = id('otp-msg');
    let h = '';
    for (let i = 0; i < len; i++) {
      if (i === half) h += `</div><div class="ac-otp__sep"><svg class="ac-icon" viewBox="0 0 24 24"><path d="M20 12L4 12"/></svg></div><div class="ac-otp__group">`;
      h += `<div class="ac-otp__slot" style="--i:${i}"><span class="ac-otp__cell"><span class="ac-otp__ph">0</span></span></div>`;
    }
    el.removeAttribute('role');
    el.innerHTML = `<div class="ac-otp__box"><div class="ac-otp__slots" aria-hidden="true"><div class="ac-otp__group">${h}</div><span class="ac-otp__ring"></span></div>`
      + `<input class="ac-otp__input" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]*" maxlength="${len}" spellcheck="false" autocapitalize="off" aria-label="${esc(el.dataset.label || 'Código de verificação')}, ${len} dígitos" aria-describedby="${msgId}"></div>`
      + `<p class="ac-otp__msg" id="${msgId}" role="status"></p>`;
    const inp = $('.ac-otp__input', el), slots = $$('.ac-otp__slot', el), row = $('.ac-otp__slots', el), ring = $('.ac-otp__ring', el), msg = $('.ac-otp__msg', el);
    if (el.dataset.name) inp.name = el.dataset.name;
    if (el.hasAttribute('data-disabled')) inp.disabled = true;
    let shown = '', ringOn = false, landing = false, pointer = false, timer = 0;

    const setState = (st, text) => {
      if (st) el.dataset.state = st; else delete el.dataset.state;
      msg.textContent = text || '';
      st === 'error' ? inp.setAttribute('aria-invalid', 'true') : inp.removeAttribute('aria-invalid');
      st === 'pending' ? inp.setAttribute('aria-busy', 'true') : inp.removeAttribute('aria-busy');
    };
    // desenha só as casas que mudaram; numa colagem, cada dígito chega um pouco depois do anterior
    const render = (from = 0, to = 0) => {
      const v = inp.value, motion = !reduce();
      slots.forEach((s, i) => {
        const c = v[i] || '';
        if (c === (shown[i] || '')) return;
        const cell = s.firstChild, d = i >= from && i < to ? (i - from) * .045 : 0, prev = cell.querySelector('.ac-otp__ch:not(.is-out)');
        s.style.setProperty('--land', d + 's');
        if (prev) { if (motion) { prev.classList.add('is-out'); setTimeout(() => prev.remove(), 300); } else prev.remove(); }
        if (c) { const n = document.createElement('span'); n.className = 'ac-otp__ch'; n.textContent = c; n.style.setProperty('--d', d + 's'); cell.appendChild(n); }
        s.classList.toggle('is-filled', !!c);
      });
      shown = v;
    };
    // casas ativas = seleção do campo; o anel aparece enquanto falta dígito, numa seleção de várias casas ou durante a colagem
    const place = () => {
      const v = inp.value, on = document.activeElement === inp;
      const a = Math.min(inp.selectionStart ?? v.length, len - 1), b = Math.max(a, Math.min((inp.selectionEnd ?? v.length) - 1, len - 1));
      slots.forEach((s, i) => s.classList.toggle('is-active', on && i >= a && i <= b));
      const show = on && (v.length < len || b > a || landing);
      if (show) {
        const r = row.getBoundingClientRect(), p = slots[a].getBoundingClientRect(), q = slots[b].getBoundingClientRect();
        if (!ringOn) ring.classList.add('is-jump');
        ring.style.cssText = `width:${q.right - p.left}px;height:${p.height}px;transform:translate(${p.left - r.left}px,${p.top - r.top}px)`;
        if (!ringOn) { void ring.offsetWidth; ring.classList.remove('is-jump'); }
      }
      ring.classList.toggle('is-on', show); ringOn = show;
    };
    // cursor parado sobre um dígito vira a seleção desse dígito (digitar troca); com tudo preenchido, fica no último
    const fix = () => {
      if (document.activeElement === inp) {
        const v = inp.value, s = inp.selectionStart, e = inp.selectionEnd;
        if (s === e && s < v.length) inp.setSelectionRange(s, s + 1);
        else if (s === e && v.length === len) inp.setSelectionRange(len - 1, len);
      }
      place();
    };
    const sweep = (from, to, tone) => {
      if (reduce() || to <= from) return;
      const step = tone === 'success' ? .048 : .045;
      for (let i = from; i < to; i++) {
        const t = document.createElement('span'); t.className = 'ac-otp__trail' + (tone === 'success' ? ' is-success' : '');
        slots[i].style.setProperty('--t', (i - from) * step + 's'); slots[i].appendChild(t); setTimeout(() => t.remove(), 1000);
        if (tone === 'success') { slots[i].classList.remove('is-bounce'); void slots[i].offsetWidth; slots[i].classList.add('is-bounce'); }
      }
      // enquanto os dígitos colados pousam, o anel fica e a conferência espera
      if (tone === 'paste') { landing = true; setTimeout(() => { landing = false; place(); complete(); }, (to - from - 1) * step * 1000); }
    };
    const complete = () => {
      const v = inp.value;
      if (v.length < len || landing || el.dataset.state) return;
      const want = el.dataset.valid, valid = want ? v === want : null;
      let settled = false;
      const resolve = (good, text) => {
        if (settled || inp.value !== v) return; settled = true; clearTimeout(timer);
        if (good) { setState('success', text || el.dataset.success || 'Código confirmado.'); sweep(0, len, 'success'); place(); return; }
        setState('error', text || el.dataset.error || 'Código inválido. Tente de novo.');
        inp.value = ''; render();
        if (document.activeElement === inp || document.activeElement === document.body) { inp.focus(); inp.setSelectionRange(0, 0); }
        place();
      };
      setState('pending');
      el.dispatchEvent(new CustomEvent('ac:complete', { detail: { value: v, valid, resolve }, bubbles: true }));
      if (want && !settled) timer = setTimeout(() => resolve(valid), +(el.dataset.delay ?? 700));
    };
    const edited = () => { clearTimeout(timer); if (el.dataset.state) setState(''); };

    inp.addEventListener('input', () => {
      const pos = inp.selectionStart ?? 0, v = otpDigits(inp.value).replace(/\D/g, '').slice(0, len), prev = shown;
      if (v !== inp.value) { inp.value = v; inp.setSelectionRange(Math.min(pos, v.length), Math.min(pos, v.length)); }
      if (v === prev) return fix();
      edited();
      // mais de um dígito de uma vez = preenchimento automático (SMS, gerenciador de senhas)
      const grow = v.length - prev.length > 1 && v.startsWith(prev);
      render(grow ? prev.length : 0, grow ? v.length : 0); if (grow) sweep(prev.length, v.length, 'paste');
      fix(); complete();
    });
    inp.addEventListener('paste', e => {
      e.preventDefault();
      if (inp.readOnly || inp.disabled) return;
      const code = otpCode((e.clipboardData || window.clipboardData).getData('text'), len); if (!code) return;
      const v = inp.value, whole = code.length >= len, from = whole ? 0 : inp.selectionStart ?? v.length;
      const next = (v.slice(0, from) + code + v.slice(whole ? v.length : inp.selectionEnd ?? v.length)).slice(0, len);
      if (next === v) return;
      edited(); inp.value = next;
      const to = Math.min(from + code.length, len);
      inp.setSelectionRange(next.length, next.length);
      render(from, to); sweep(from, to, 'paste'); fix(); complete();
    });
    inp.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      const v = inp.value, s = inp.selectionStart ?? v.length;
      const to = { ArrowLeft: Math.max(0, s - 1), ArrowRight: Math.min(v.length, s + 1), Home: 0, End: v.length }[e.key];
      if (to === undefined) return;
      e.preventDefault(); inp.setSelectionRange(to, to); fix();
    });
    // clique numa casa: vai para ela, mas nunca além do primeiro espaço vazio
    inp.addEventListener('pointerdown', () => { pointer = true; });
    inp.addEventListener('click', e => {
      pointer = false;
      if (inp.selectionEnd - inp.selectionStart > 1) return place();
      let i = slots.findIndex(s => e.clientX < s.getBoundingClientRect().right); if (i < 0) i = len - 1;
      i = Math.min(i, inp.value.length); inp.setSelectionRange(i, i); fix();
    });
    inp.addEventListener('focus', () => { if (!pointer) inp.setSelectionRange(inp.value.length, inp.value.length); fix(); });
    inp.addEventListener('blur', place);
    inp.addEventListener('select', place);
    if (window.ResizeObserver) new ResizeObserver(() => ringOn && place()).observe(row);
  };

  C.slider = el => {
    const out = el.parentElement.querySelector('output');
    const upd = () => { const p = (el.value - el.min) / (el.max - el.min) * 100; el.style.setProperty('--p', p + '%'); if (out) out.textContent = el.value + (el.dataset.suffix || ''); };
    el.addEventListener('input', upd); upd();
  };

  C.counter = el => {
    const max = +el.getAttribute('maxlength') || +el.dataset.max; const c = document.createElement('div'); c.className = 'ac-counter'; c.setAttribute('aria-live', 'polite'); el.after(c);
    const upd = () => { c.textContent = `${el.value.length}/${max}`; c.dataset.over = el.value.length >= max; }; el.addEventListener('input', upd); upd();
  };

  C.validate = form => {
    form.noValidate = true;
    const msg = f => {
      const v = f.validity, lab = (f.labels && f.labels[0] ? f.labels[0].textContent : 'Este campo').replace(/\s*\*$/, '');
      if (v.valueMissing) return f.type === 'checkbox' ? 'Marque esta opção para continuar.' : `Informe ${lab.toLowerCase()}.`;
      if (v.typeMismatch && f.type === 'email') return 'Use um e-mail válido, como nome@empresa.com.';
      if (v.tooShort) return `Use pelo menos ${f.minLength} caracteres (faltam ${f.minLength - f.value.length}).`;
      if (v.tooLong) return `Use no máximo ${f.maxLength} caracteres.`;
      if (v.rangeUnderflow) return `Use um valor a partir de ${f.min}.`;
      if (v.rangeOverflow) return `Use um valor até ${f.max}.`;
      if (v.stepMismatch) return 'Use um valor válido para este campo.';
      if (v.patternMismatch) return f.dataset.patternMsg || 'Formato inválido.';
      if (v.badInput || v.typeMismatch) return 'Formato inválido.';
      if (v.customError) return f.validationMessage;
      return '';
    };
    const show = (f, live) => {
      const box = f.closest('.ac-field'), lab = f.closest('label');
      let er = box ? box.querySelector('.ac-error') : (lab && lab.nextElementSibling && lab.nextElementSibling.matches('.ac-error') ? lab.nextElementSibling : null);
      const m = msg(f);
      if (!er && m) { er = document.createElement('p'); er.className = 'ac-error'; er.id = id('err'); if (box) box.appendChild(er); else (lab || f).after(er); }
      // mantém a dica que já descrevia o campo e acrescenta o erro
      if (er) { er.innerHTML = m ? icon('alert') + esc(m) : ''; const ids = (f.getAttribute('aria-describedby') || '').split(/\s+/).filter(x => x && x !== er.id); f.setAttribute('aria-describedby', [...ids, er.id].join(' ')); }
      f.setAttribute('aria-invalid', !!m);
      return !m;
    };
    $$('input, textarea, select', form).forEach(f => {
      f.addEventListener('blur', () => { if (f.value || f.dataset.touched) { f.dataset.touched = 1; show(f); } });
      f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') show(f); });
    });
    // Só barra o envio quando há erro. Válido, emite "ac:valid" (cancelável) e o formulário segue o caminho normal;
    // quem quiser enviar por fetch chama preventDefault() nesse evento.
    form.addEventListener('submit', e => {
      const fields = $$('input, textarea, select', form).filter(f => f.willValidate);
      const bad = fields.filter(f => !show(f));
      if (bad.length) { e.preventDefault(); bad[0].focus(); return; }
      if (!form.dispatchEvent(new CustomEvent('ac:valid', { bubbles: true, cancelable: true, detail: { submitter: e.submitter || null } }))) e.preventDefault();
    });
    form.addEventListener('reset', () => setTimeout(() => { $$('input, textarea, select', form).forEach(f => { f.removeAttribute('aria-invalid'); delete f.dataset.touched; }); $$('.ac-error', form).forEach(x => x.innerHTML = ''); }));
  };

  C.combo = el => {
    const input = $('input', el), opts = JSON.parse(el.dataset.options || '[]');
    const pop = document.createElement('div'); pop.className = 'ac-pop'; pop.hidden = true; pop.style.padding = '0';
    const lb = document.createElement('ul'); lb.className = 'ac-listbox'; lb.id = id('lb'); lb.setAttribute('role', 'listbox'); pop.appendChild(lb); document.body.appendChild(pop);
    input.setAttribute('role', 'combobox'); input.setAttribute('aria-controls', lb.id); input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-autocomplete', 'list');
    let act = 0, list = [], chosen = '';
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const render = () => {
      const q = norm(input.value === chosen ? '' : input.value);
      list = opts.filter(o => norm(o.label).includes(q));
      act = Math.min(act, Math.max(0, list.length - 1));
      lb.innerHTML = list.length ? list.map((o, i) => { const n = norm(o.label), k = q ? n.indexOf(q) : -1; const lab = k >= 0 ? esc(o.label.slice(0, k)) + '<mark>' + esc(o.label.slice(k, k + q.length)) + '</mark>' + esc(o.label.slice(k + q.length)) : esc(o.label); return `<li class="ac-option" role="option" id="${lb.id}-${i}" aria-selected="${i === act}" data-checked="${o.label === chosen}">${lab}${o.hint ? `<small>${esc(o.hint)}</small>` : ''}</li>`; }).join('') : '<li class="ac-listbox__empty">Nada encontrado.</li>';
      input.setAttribute('aria-activedescendant', list.length ? `${lb.id}-${act}` : '');
      reveal($(`#${lb.id}-${act}`, lb));
    };
    const show = () => { render(); pop.style.width = input.offsetWidth + 'px'; openPop(pop, input); };
    const pick = i => { const o = list[i]; if (!o) return; chosen = input.value = o.label; closePop(pop); el.dispatchEvent(new CustomEvent('ac:change', { detail: o, bubbles: true })); };
    input.addEventListener('focus', show); input.addEventListener('input', () => { act = 0; pop.hidden ? show() : render(); });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (pop.hidden) show(); else { act = (act + 1) % Math.max(1, list.length); render(); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); act = (act - 1 + list.length) % Math.max(1, list.length); render(); }
      else if (e.key === 'Enter' && !pop.hidden) { e.preventDefault(); pick(act); }
    });
    lb.addEventListener('pointerdown', e => { const li = e.target.closest('.ac-option'); if (li) { e.preventDefault(); pick(+li.id.split('-').pop()); } });
  };

  /* command palette */
  function command(o) {
    let dlg = $('#ac-command');
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.id = 'ac-command'; dlg.className = 'ac ac-dialog ac-command'; dlg.setAttribute('aria-label', 'Paleta de comandos');
      dlg.innerHTML = `<div class="ac-command__input">${icon('search')}<input type="text" placeholder="${esc(o.placeholder || 'Buscar comandos…')}" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="ac-command-list"></div><ul class="ac-listbox" id="ac-command-list" role="listbox"></ul><div class="ac-command__foot"><span><kbd class="ac-kbd">↑</kbd><kbd class="ac-kbd">↓</kbd> navegar</span><span><kbd class="ac-kbd">↵</kbd> abrir</span><span><kbd class="ac-kbd">esc</kbd> fechar</span></div>`;
      document.body.appendChild(dlg);
    }
    const input = $('input', dlg), lb = $('ul', dlg); let act = 0, flat = [];
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    // groups: { 'Nome': { icon, color } } dá ícone e cor ao título de cada grupo. icon é um nome de Orthos.icon ou o
    // miolo de um <svg> 24×24 (<path …/>); color é qualquer cor CSS, inclusive var(--x), e fica em --ac-group.
    const G = o.groups || {}, max = o.limit || 60;
    const gIcon = v => !v ? '' : /^\s*</.test(v) ? `<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true">${v}</svg>` : icon(v);
    const head = g => { const c = G[g] || {}; return `<li class="ac-listbox__group ac-command__group" role="presentation"${c.color ? ` style="--ac-group:${esc(c.color)}"` : ''}>${gIcon(c.icon)}<span>${esc(g)}</span></li>`; };
    const render = () => {
      const q = norm(input.value); flat = o.items.filter(i => norm(i.label + ' ' + (i.group || '') + ' ' + (i.keywords || '')).includes(q)).slice(0, max);
      act = Math.min(act, Math.max(0, flat.length - 1)); let g = null, h = '';
      flat.forEach((it, i) => { if (it.group !== g) { g = it.group; if (g) h += head(g); } h += `<li class="ac-option" role="option" id="ac-cmd-${i}" data-i="${i}" aria-selected="${i === act}">${esc(it.label)}${it.hint ? `<small>${esc(it.hint)}</small>` : ''}</li>`; });
      lb.innerHTML = h || '<li class="ac-listbox__empty">Nenhum resultado.</li>';
      input.setAttribute('aria-activedescendant', flat.length ? 'ac-cmd-' + act : '');
      // nas pontas a lista vai até o começo/fim (com o 1º título e sem o último item colado no rodapé); no 1º item de um
      // grupo, o título aparece junto, para a categoria não ficar escondida
      const li = $('#ac-cmd-' + act, lb), prev = li && li.previousElementSibling;
      if (!li) return;
      if (act === 0) lb.scrollTop = 0;
      else if (act === flat.length - 1) lb.scrollTop = lb.scrollHeight;
      else { if (prev && prev.classList.contains('ac-command__group')) reveal(prev); reveal(li); }
    };
    const run = i => { const it = flat[i]; if (!it) return; close(dlg); it.run && setTimeout(it.run, 120); };
    input.oninput = () => { act = 0; render(); };
    input.onkeydown = e => { if (e.key === 'ArrowDown') { e.preventDefault(); act = (act + 1) % Math.max(1, flat.length); render(); } if (e.key === 'ArrowUp') { e.preventDefault(); act = (act - 1 + flat.length) % Math.max(1, flat.length); render(); } if (e.key === 'Enter') { e.preventDefault(); run(act); } };
    lb.onclick = e => { const li = e.target.closest('[data-i]'); if (li) run(+li.dataset.i); };
    // no toque (celular/tablet) o foco fica no próprio diálogo: a lista aparece inteira e o teclado só abre quando a pessoa toca no campo
    const toque = matchMedia('(pointer: coarse)').matches && !matchMedia('(any-pointer: fine)').matches;
    // (o showModal foca o primeiro campo sozinho; somente leitura nesse instante não chama o teclado)
    if (toque) { dlg.tabIndex = -1; input.readOnly = true; } else dlg.removeAttribute('tabindex');
    input.value = ''; input.placeholder = o.placeholder || 'Buscar comandos…'; render(); open(dlg);
    lb.scrollTop = 0; // a lista é a mesma entre aberturas: sem isso reabriria rolada onde a pessoa parou
    if (toque) { dlg.focus(); input.readOnly = false; } else input.focus();
  }

  C.datepicker = el => {
    const pop = document.createElement('div'); pop.className = 'ac-pop'; pop.hidden = true; pop.style.padding = '0'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Escolher data'); document.body.appendChild(pop);
    let sel = null, view = new Date(); view.setDate(1);
    const lab = $('span', el), today = new Date(); today.setHours(0, 0, 0, 0);
    const fmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const render = () => {
      const y = view.getFullYear(), m = view.getMonth(), first = new Date(y, m, 1).getDay(), dim = new Date(y, m + 1, 0).getDate();
      let h = `<div class="ac-cal"><div class="ac-cal__head"><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-nav="-1" aria-label="Mês anterior">${icon('left')}</button><span aria-live="polite">${new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(view)}</span><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-nav="1" aria-label="Próximo mês">${icon('right')}</button></div><div class="ac-cal__grid" role="grid">`;
      ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].forEach(d => h += `<span class="ac-cal__dow" aria-hidden="true">${d}</span>`);
      for (let i = 0; i < 42; i++) {
        const d = new Date(y, m, i - first + 1), out = d.getMonth() !== m, isSel = sel && +d === +sel;
        h += `<button type="button" class="ac-cal__day" data-t="${+d}" ${out ? 'data-out' : ''} ${+d === +today ? 'data-today' : ''} aria-selected="${!!isSel}" tabindex="${isSel || (!sel && +d === +today) ? 0 : -1}" aria-label="${fmt.format(d)}">${d.getDate()}</button>`;
      }
      pop.innerHTML = h + '</div></div>';
    };
    const pick = t => { sel = new Date(+t); lab.textContent = fmt.format(sel); el.removeAttribute('data-empty'); closePop(pop, true); el.dispatchEvent(new CustomEvent('ac:change', { detail: sel, bubbles: true })); };
    el.setAttribute('aria-haspopup', 'dialog');
    el.addEventListener('click', () => { if (!pop.hidden) return closePop(pop); if (sel) { view = new Date(sel); view.setDate(1); } render(); openPop(pop, el); ($('[tabindex="0"]', pop) || $('.ac-cal__day', pop)).focus(); });
    pop.addEventListener('click', e => { const n = e.target.closest('[data-nav]'); if (n) { view.setMonth(view.getMonth() + +n.dataset.nav); render(); $(`[data-nav="${n.dataset.nav}"]`, pop).focus(); return; } const d = e.target.closest('.ac-cal__day'); if (d) pick(d.dataset.t); });
    pop.addEventListener('keydown', e => {
      const d = e.target.closest('.ac-cal__day'); if (!d) return; const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!step) return;
      e.preventDefault(); const nd = new Date(+d.dataset.t + step * 864e5); nd.setHours(0, 0, 0, 0);
      let b = $(`[data-t="${+nd}"]`, pop); if (!b || b.hasAttribute('data-out')) { view = new Date(nd); view.setDate(1); render(); b = $(`[data-t="${+nd}"]`, pop); }
      b && b.focus();
    });
  };

  C.dropzone = el => {
    const inp = $('input[type=file]', el), list = el.parentElement.querySelector('.ac-files');
    el.tabIndex = 0; el.setAttribute('role', 'button');
    const size = b => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(0) + ' KB' : (b / 1048576).toFixed(1) + ' MB';
    const add = files => [...files].slice(0, 6).forEach(f => {
      const li = document.createElement('li'); li.className = 'ac-file';
      li.innerHTML = `${icon('file')}<span class="ac-file__name">${esc(f.name)}</span><span class="ac-file__meta">${size(f.size)}</span><div class="ac-progress" style="--v:0%" role="progressbar" aria-label="Enviando ${esc(f.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>`;
      list.appendChild(li); let v = 0; const bar = $('.ac-progress', li), meta = $('.ac-file__meta', li);
      const tick = () => { v = Math.min(100, v + 8 + Math.random() * 18); bar.style.setProperty('--v', v + '%'); bar.setAttribute('aria-valuenow', Math.round(v)); if (v < 100) setTimeout(tick, 180); else { meta.innerHTML = `<span class="ac-badge ac-badge--success">Enviado</span>`; bar.remove(); } };
      tick();
    });
    el.addEventListener('click', () => inp.click());
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inp.click(); } });
    inp.addEventListener('change', () => { add(inp.files); inp.value = ''; });
    ['dragenter', 'dragover'].forEach(ev => el.addEventListener(ev, e => { e.preventDefault(); el.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach(ev => el.addEventListener(ev, e => { e.preventDefault(); el.classList.remove('is-over'); }));
    el.addEventListener('drop', e => add(e.dataTransfer.files));
  };

  C.table = el => {
    const cols = JSON.parse(el.dataset.columns), rows = JSON.parse(el.dataset.rows);
    const per = +el.dataset.perPage || 5; let q = '', sortK = null, dir = 1, page = 0, status = ''; const sel = new Set();
    const statuses = [...new Set(rows.map(r => r.status))];
    el.innerHTML = `<div class="ac-table-wrap"><div class="ac-table-tools"><div class="ac-input-wrap">${icon('search')}<input class="ac-input" type="search" placeholder="Filtrar por nome ou e-mail" aria-label="Filtrar tabela"></div><select class="ac-select" style="width:auto;height:34px" aria-label="Status"><option value="">Todos os status</option>${statuses.map(s => `<option>${esc(s)}</option>`).join('')}</select><div class="ac-bulk" role="status"><span class="n"></span><button class="ac-btn ac-btn--sm" type="button" data-bulk="del">${icon('trash')}Excluir</button></div></div><div class="ac-table-scroll"><table class="ac-table ac-table--stack"><thead></thead><tbody></tbody></table></div><div class="ac-table-foot"><span class="info" aria-live="polite"></span><div class="ac-pager"></div></div></div>`;
    const [search, filt, bulk, thead, tbody, info, pager] = [$('input', el), $('select', el), $('.ac-bulk', el), $('thead', el), $('tbody', el), $('.info', el), $('.ac-pager', el)];
    const view = () => { const n = s => String(s).toLowerCase(); let r = rows.filter(x => (!status || x.status === status) && (!q || n(x.name + ' ' + x.email).includes(n(q)))); if (sortK) r = r.slice().sort((a, b) => (a[sortK] > b[sortK] ? 1 : a[sortK] < b[sortK] ? -1 : 0) * dir); return r; };
    const cell = (c, r) => {
      if (c.k === 'name') return `<div class="ac-cell-user"><span class="ac-avatar">${esc(r.name.split(' ').map(p => p[0]).slice(0, 2).join(''))}</span><span>${esc(r.name)}<small>${esc(r.email)}</small></span></div>`;
      if (c.k === 'status') return `<span class="ac-badge ${r.status === 'Ativo' ? 'ac-badge--success' : r.status === 'Pendente' ? 'ac-badge--warning' : ''}"><span class="ac-badge__dot"></span>${esc(r.status)}</span>`;
      if (c.money) return 'R$ ' + Number(r[c.k]).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
      return esc(r[c.k]);
    };
    // guarda qual controle tinha o foco para devolver depois que thead/tbody/paginador forem refeitos
    const focusKey = () => { const a = document.activeElement; if (!a || !el.contains(a)) return null; if (a.dataset.id) return `input[data-id="${a.dataset.id}"]`; if (a.closest('thead') && a.type === 'checkbox') return 'thead input'; if (a.dataset.p) return a.getAttribute('aria-label') ? `[data-p][aria-label="${a.getAttribute('aria-label')}"]` : '[aria-current="page"]'; return null; };
    const render = () => {
      const fk = focusKey();
      const all = view(), pages = Math.max(1, Math.ceil(all.length / per)); page = Math.min(page, pages - 1);
      const slice = all.slice(page * per, page * per + per), allSel = slice.length && slice.every(r => sel.has(r.id)), some = slice.some(r => sel.has(r.id));
      thead.innerHTML = `<tr><th class="ac-table__select" style="width:44px"><label class="ac-check"><input type="checkbox" aria-label="Selecionar página" ${allSel ? 'checked' : ''}></label></th>${cols.map(c => `<th class="${c.num ? 'num' : ''}" ${sortK === c.k ? `aria-sort="${dir > 0 ? 'ascending' : 'descending'}"` : ''}>${c.sort ? `<button class="ac-sort" type="button" data-k="${c.k}">${esc(c.label)}${icon('sort')}</button>` : esc(c.label)}</th>`).join('')}</tr>`;
      $('thead input', el).indeterminate = !allSel && some;
      // data-label: no celular (.ac-table--stack) cada linha vira um cartão "rótulo: valor"; a coluna name, sem rótulo, é o título
      tbody.innerHTML = slice.length ? slice.map(r => `<tr data-selected="${sel.has(r.id)}"><td class="ac-table__select"><label class="ac-check"><input type="checkbox" data-id="${r.id}" aria-label="Selecionar ${esc(r.name)}" ${sel.has(r.id) ? 'checked' : ''}></label></td>${cols.map(c => `<td class="${c.num ? 'num' : ''}"${c.k === 'name' ? '' : ` data-label="${esc(c.label)}"`}>${cell(c, r)}</td>`).join('')}</tr>`).join('') : `<tr><td colspan="${cols.length + 1}" style="height:auto;padding:28px"><div class="ac-empty" style="border:0;padding:8px"><h4>Nenhum resultado</h4><p>Ajuste a busca ou o filtro de status.</p><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button" data-clear>Limpar filtros</button></div></td></tr>`;
      info.textContent = all.length ? `${page * per + 1}–${Math.min(all.length, page * per + per)} de ${all.length}` : '0 resultados';
      let ph = `<button type="button" data-p="${page - 1}" ${page === 0 ? 'disabled' : ''} aria-label="Página anterior">${icon('left')}</button>`;
      for (let i = 0; i < pages; i++) ph += `<button type="button" data-p="${i}" ${i === page ? 'aria-current="page"' : ''}>${i + 1}</button>`;
      pager.innerHTML = ph + `<button type="button" data-p="${page + 1}" ${page >= pages - 1 ? 'disabled' : ''} aria-label="Próxima página">${icon('right')}</button>`;
      bulk.classList.toggle('is-on', sel.size > 0); $('.n', bulk).textContent = `${sel.size} selecionado${sel.size > 1 ? 's' : ''}`;
      tableRoles($('table', el));
      if (fk) { const n = $(fk, el); if (n && !n.disabled) n.focus(); else { const c = $('[aria-current="page"]', pager); c && c.focus(); } }
    };
    search.addEventListener('input', () => { q = search.value; page = 0; render(); });
    filt.addEventListener('change', () => { status = filt.value; page = 0; render(); });
    el.addEventListener('click', e => {
      const s = e.target.closest('.ac-sort'); if (s) { if (sortK === s.dataset.k) dir = -dir; else { sortK = s.dataset.k; dir = 1; } render(); $(`.ac-sort[data-k="${sortK}"]`, el).focus(); }
      const p = e.target.closest('[data-p]'); if (p && !p.disabled) { page = +p.dataset.p; render(); }
      if (e.target.closest('[data-clear]')) { q = search.value = ''; status = filt.value = ''; render(); }
      if (e.target.closest('[data-bulk]')) {
        const removed = rows.filter(r => sel.has(r.id)); const n = removed.length;
        removed.forEach(r => rows.splice(rows.indexOf(r), 1)); sel.clear(); render();
        toast({ title: `${n} registro${n > 1 ? 's' : ''} excluído${n > 1 ? 's' : ''}`, action: { label: 'Desfazer', onClick: () => { rows.push(...removed); rows.sort((a, b) => a.id - b.id); render(); } } });
      }
    });
    el.addEventListener('change', e => {
      const c = e.target; if (c.type !== 'checkbox') return;
      if (c.dataset.id) { const i = +c.dataset.id; c.checked ? sel.add(i) : sel.delete(i); }
      else view().slice(page * per, page * per + per).forEach(r => c.checked ? sel.add(r.id) : sel.delete(r.id));
      render();
    });
    render();
  };

  C.sidebar = el => {
    const rz = $('[data-ac-resize]', el); if (rz) sidebarResize(el, rz);
    const t = $('[data-ac-toggle]', el);
    t && t.addEventListener('click', () => { const c = el.dataset.collapsed !== 'true'; el.dataset.collapsed = c; t.setAttribute('aria-expanded', !c); t.setAttribute('aria-label', c ? 'Expandir menu' : 'Recolher menu'); });
    $$('.ac-sidebar__item', el).forEach(a => { a.addEventListener('click', e => { const h = a.getAttribute('href'); if (!h || h === '#') e.preventDefault(); $$('.ac-sidebar__item', el).forEach(x => x.removeAttribute('aria-current')); a.setAttribute('aria-current', 'page'); }); const txt = $('.ac-sidebar__text', a); if (txt) a.dataset.tip = txt.textContent; a.dataset.tipSide = 'right'; });
  };

  C.stepper = el => {
    const items = $$('.ac-steps li', el); let cur = items.findIndex(i => i.dataset.state === 'current'); if (cur < 0) cur = 0;
    const upd = () => { items.forEach((li, i) => { li.dataset.state = i < cur ? 'done' : i === cur ? 'current' : ''; if (i === cur) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current'); }); $('[data-step="-1"]', el).disabled = cur === 0; $('[data-step="1"]', el).textContent = cur === items.length - 1 ? 'Concluir' : 'Continuar'; };
    el.addEventListener('click', e => { const b = e.target.closest('[data-step]'); if (!b) return; const n = cur + +b.dataset.step; if (n >= items.length) { toast({ type: 'success', title: 'Fluxo concluído' }); cur = 0; } else cur = Math.max(0, n); upd(); });
    upd();
  };

  C['text-effect'] = el => {
    const txt = el.dataset.text || el.textContent.trim();
    // aria-label não vale em <p>/<h1>/<span>: o texto inteiro vai num span só para leitores de tela
    const play = () => { el.innerHTML = `<span class="ac-sr">${esc(txt)}</span>` + txt.split(/(\s+)/).map((w, i) => /^\s+$/.test(w) ? w : `<span class="w" aria-hidden="true" style="--i:${i / 2}">${esc(w)}</span>`).join(''); };
    play(); el._replay = play;
  };

  C.number = el => {
    const to = +el.dataset.to, dec = +el.dataset.decimals || 0, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    const fmt = v => pre + v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    const run = () => { if (reduce()) { el.textContent = fmt(to); return; } const t0 = performance.now(), d = 1400; const f = t => { const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 4); el.textContent = fmt(to * e); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
    el._replay = run;
    new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { run(); o.disconnect(); } }).observe(el);
  };

  C.scramble = el => {
    const txt = el.textContent, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*'; let raf;
    // o texto embaralhado fica escondido do leitor de tela, que lê sempre o texto final
    el.innerHTML = `<span class="ac-sr">${esc(txt)}</span><span aria-hidden="true">${esc(txt)}</span>`; const vis = el.lastChild;
    const run = () => { cancelAnimationFrame(raf); if (reduce()) return; let f = 0; const tick = () => { vis.textContent = [...txt].map((c, i) => c === ' ' ? ' ' : i < f / 2 ? c : chars[Math.random() * chars.length | 0]).join(''); f++; if (f / 2 <= txt.length) raf = requestAnimationFrame(tick); else vis.textContent = txt; }; tick(); };
    el.addEventListener('mouseenter', run); el.addEventListener('focus', run); el._replay = run;
  };

  C.magnetic = el => {
    const k = +el.dataset.strength || 0.35;
    el.addEventListener('pointermove', e => { if (reduce()) return; const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * k}px, ${(e.clientY - r.top - r.height / 2) * k}px)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  };

  C.spotlight = el => { el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', e.clientX - r.left + 'px'); el.style.setProperty('--my', e.clientY - r.top + 'px'); }); };

  C.spark = el => {
    const v = el.dataset.values.split(',').map(Number), w = 200, h = 44, mx = Math.max(...v), mn = Math.min(...v);
    const pts = v.map((y, i) => [i / (v.length - 1) * w, h - 4 - (y - mn) / (mx - mn || 1) * (h - 8)]);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const gid = id('ac-spark-grad');
    el.innerHTML = `<svg class="ac-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".14"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs><path class="a" d="${d} L${w} ${h} L0 ${h} Z"/><path class="l" d="${d}"/></svg>`;
    // comprimento da linha pela soma dos segmentos (getTotalLength forçava um layout por gráfico)
    const len = pts.reduce((a, p, i) => i ? a + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0, 0);
    $('path.l', el).style.setProperty('--len', Math.ceil(len));
  };

  C.bars = el => {
    const v = el.dataset.values.split(',').map(Number), labs = (el.dataset.labels || '').split(','), mx = Math.max(...v);
    el.classList.add('ac-bars'); el.setAttribute('role', 'img'); el.setAttribute('aria-label', el.dataset.label || 'Gráfico de barras');
    el.innerHTML = v.map((x, i) => `<span class="ac-bars__bar" tabindex="0" data-v="${esc((labs[i] ? labs[i] + ': ' : '') + x.toLocaleString('pt-BR'))}" style="height:${(x / mx * 100).toFixed(1)}%;animation-delay:${i * 40}ms"></span>`).join('');
  };

  C.copy = el => { el.addEventListener('click', async () => { try { await navigator.clipboard.writeText(el.dataset.copy || ''); toast({ type: 'success', title: 'Copiado' }); } catch (_) { toast({ type: 'danger', title: 'Não foi possível copiar' }); } }); };

  /* skeleton gerado a partir da UI real (inspirado em boneyard) */
  /* o: { animation: 'shimmer' | 'pulse' | 'static', cascade: true (cada osso 80 ms depois), delay: ms (espera curta nem
     mostra o esqueleto, para não piscar) }. Ao desligar, o conteúdo entra com fade se o esqueleto chegou a aparecer. */
  function skeleton(el, on, o = {}) {
    clearTimeout(el._acSkelTimer);
    if (!on) {
      const shown = !!$('.ac-bones__layer', el); $('.ac-bones__layer', el)?.remove();
      el.removeAttribute('data-skeleton'); el.setAttribute('aria-busy', 'false');
      if (shown && !reduce()) { el.classList.add('ac-bones--in'); setTimeout(() => el.classList.remove('ac-bones--in'), 320); }
      return;
    }
    el.setAttribute('aria-busy', 'true');
    const wait = +(o.delay ?? el.dataset.skeletonDelay ?? 0);
    if (wait > 0 && !$('.ac-bones__layer', el)) { el._acSkelTimer = setTimeout(() => skeleton(el, true, { ...o, delay: 0 }), wait); return; }
    $('.ac-bones__layer', el)?.remove(); el.removeAttribute('data-skeleton'); // religar mede o conteúdo de novo, visível
    const anim = o.animation || el.dataset.skeletonAnimation || 'shimmer', cascade = o.cascade ?? el.hasAttribute('data-skeleton-cascade');
    el.classList.remove('ac-bones--pulse', 'ac-bones--static', 'ac-bones--cascade', 'ac-bones--in');
    if (anim !== 'shimmer') el.classList.add('ac-bones--' + anim);
    if (cascade) el.classList.add('ac-bones--cascade');
    el.classList.add('ac-bones'); const base = el.getBoundingClientRect();
    const layer = document.createElement('div'); layer.className = 'ac-bones__layer'; layer.setAttribute('aria-hidden', 'true');
    const leaves = $$('*', el).filter(n => { const cs = getComputedStyle(n); if (cs.display === 'none' || cs.visibility === 'hidden') return false; if (n.matches('img, svg, input, button, .ac-avatar, .ac-badge, .ac-bars__bar, .ac-spark')) return true; return [...n.childNodes].some(c => c.nodeType === 3 && c.textContent.trim()) && !n.closest('svg, button, .ac-badge, .ac-avatar'); });
    const seen = new Set();
    leaves.forEach(n => {
      if ([...seen].some(s => s.contains(n))) return; seen.add(n);
      let r = n.getBoundingClientRect();
      if (!n.matches('img, svg, input, button, .ac-avatar, .ac-badge, .ac-bars__bar, .ac-spark')) { const rg = document.createRange(); rg.selectNodeContents(n); const rr = rg.getBoundingClientRect(); if (rr.width) r = rr; }
      if (r.width < 2 || r.height < 2) return;
      const b = document.createElement('span'); b.className = 'ac-bones__bone';
      const round = n.matches('.ac-avatar') || getComputedStyle(n).borderRadius === '50%';
      Object.assign(b.style, { left: r.left - base.left + 'px', top: r.top - base.top + 'px', width: r.width + 'px', height: Math.max(8, r.height * (n.matches('img, svg, input, button, .ac-avatar, .ac-badge, .ac-bars__bar, .ac-spark') ? 1 : .72)) + 'px', borderRadius: round ? '50%' : getComputedStyle(n).borderRadius || '6px' });
      layer.appendChild(b);
    });
    // cascata de cima para baixo: o índice segue a posição na tela, não a ordem no HTML
    [...layer.children].sort((a, b) => parseFloat(a.style.top) - parseFloat(b.style.top) || parseFloat(a.style.left) - parseFloat(b.style.left)).forEach((b, i) => b.style.setProperty('--i', i));
    el.appendChild(layer); el.dataset.skeleton = 'on';
  }

  /* paleta de esferas (componente próprio do projeto) */
  C.palette = el => {
    const OUT = [['Marrom', '#6a2f26'], ['Coral', '#f4733a'], ['Âmbar', '#ffb02a'], ['Lima', '#a7d92e'], ['Verde', '#2ed85a'], ['Esmeralda', '#14b98b'], ['Turquesa', '#139fb1'], ['Azul', '#3a6fd8'], ['Violeta', '#6a4fd0'], ['Magenta', '#b83cc8'], ['Rosa', '#e8357f'], ['Vermelho', '#f0405a']];
    const IN = [['Cinza claro', '#d0d3d6'], ['Creme', '#f1eec6'], ['Menta', '#cdeed9'], ['Cinza azulado', '#b4c4d6'], ['Lavanda', '#b3acd9'], ['Rosa claro', '#efc4dc']];
    const P = (r, d) => [50 + r * Math.sin(d * Math.PI / 180), 50 - r * Math.cos(d * Math.PI / 180)];
    const list = [...OUT.map(([n, c], i) => [n, c, ...P(30.6, i * 30), 24, i ? 1 + i : 1]), ...IN.map(([n, c], i) => [n, c, ...P(18.3, i * 60), 21.5, 20 + i]), ['Branco', '#ffffff', 50, 50, 22.5, 30]];
    el.classList.add('ac-palette'); el.setAttribute('role', 'radiogroup'); el.setAttribute('aria-label', el.dataset.label || 'Cor');
    const items = list.map(([name, color, x, y, d, z], i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'ac-palette__sw'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false'); b.setAttribute('aria-label', name); b.tabIndex = i ? -1 : 0; b.style.cssText = `--c:${color};--x:${x}%;--y:${y}%;--d:${d}%;--z:${z}`; el.appendChild(b); return { b, name, color, x, y, d }; });
    const layout = h => items.forEach(it => {
      const s = it.b.style; it.b.classList.toggle('is-hover', it === h); s.zIndex = it === h ? 50 : '';
      if (!h) { s.setProperty('--dx', 0); s.setProperty('--dy', 0); s.setProperty('--s', 1); s.setProperty('--lift', '0px'); return; }
      if (it === h) { s.setProperty('--dx', 0); s.setProperty('--dy', 0); s.setProperty('--s', 1.16); s.setProperty('--lift', '40px'); return; }
      const vx = it.x - h.x, vy = it.y - h.y, dist = Math.hypot(vx, vy) || 1, k = Math.max(0, 1 - dist / 26), p = 3.4 * k * k * (2 - k);
      let dx = vx / dist * p, dy = vy / dist * p; const nx = it.x + dx - 50, ny = it.y + dy - 50, r = Math.hypot(nx, ny), lim = 47 - it.d / 2;
      if (r > lim) { dx -= nx / r * (r - lim); dy -= ny / r * (r - lim); }
      s.setProperty('--dx', dx.toFixed(2)); s.setProperty('--dy', dy.toFixed(2)); s.setProperty('--s', 1 - .03 * k); s.setProperty('--lift', '0px');
    });
    const select = (it, copy) => {
      items.forEach(o => { o.b.setAttribute('aria-checked', o === it); o.b.tabIndex = o === it ? 0 : -1; }); el.dataset.value = it.color; el.dispatchEvent(new CustomEvent('ac:change', { detail: { name: it.name, color: it.color }, bubbles: true }));
      // data-copy: copia o código da cor e confirma numa pílula no topo (como a Kobra); só no clique, toque ou Enter
      if (copy && el.dataset.copy !== undefined) copyText(it.color, el).then(ok => toast(ok ? { type: 'success', variant: 'pill', position: 'top', swatch: it.color, title: `Copiado: ${it.name}`, desc: it.color, duration: 2400 } : { type: 'danger', variant: 'pill', position: 'top', title: 'Não deu para copiar a cor' }));
    };
    // mouse: a esfera sobe e afasta as vizinhas. Toque: só o retorno de pressionado, como na Kobra (sem "hover" que fica
    // preso depois do toque nem vizinhas se mexendo); o foco que vem de um toque também não levanta a esfera.
    let input = '';
    el.addEventListener('keydown', () => { input = 'key'; }, true);
    items.forEach((it, i) => {
      it.b.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') layout(it); }); it.b.addEventListener('click', () => select(it, true));
      it.b.addEventListener('pointerdown', e => { input = e.pointerType; if (e.pointerType === 'touch') { it.b.classList.add('is-press'); it.pressAt = performance.now(); } });
      // toque rápido: a leve retraída fica ao menos 170 ms na tela, senão o dedo sai antes de ela aparecer
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => it.b.addEventListener(t, () => { if (!it.b.classList.contains('is-press')) return; setTimeout(() => it.b.classList.remove('is-press'), Math.max(0, 170 - (performance.now() - (it.pressAt || 0)))); }));
      it.b.addEventListener('focus', () => { if (input !== 'touch' && !el.matches(':hover')) layout(it); }); it.b.addEventListener('blur', () => { if (!el.matches(':hover')) layout(null); });
      it.b.addEventListener('keydown', e => { const st = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!st) return; e.preventDefault(); const n = items[(i + st + items.length) % items.length]; n.b.focus(); select(n); });
    });
    el.addEventListener('pointerleave', () => layout(null));
  };

  /* ======================= componentes adicionados após a pesquisa de 27/10/2026 ======================= */

  // navegação por teclado comum aos menus (dropdown, contexto, barra de menus)
  function menuKeys(pop, onExit) {
    pop.addEventListener('keydown', e => {
      const it = $$('.ac-menu__item:not([disabled])', pop), i = it.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); it[(i + (e.key === 'ArrowDown' ? 1 : -1) + it.length) % it.length].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); it[0]?.focus(); }
      else if (e.key === 'End') { e.preventDefault(); it[it.length - 1]?.focus(); }
      else if (e.key === 'Tab') closePop(pop, true);
      else if (e.key.length === 1 && /\S/.test(e.key)) { const k = e.key.toLowerCase(); const n = it.slice(i + 1).concat(it.slice(0, i + 1)).find(x => x.textContent.trim().toLowerCase().startsWith(k)); n && n.focus(); }
      else if (onExit) onExit(e);
    });
  }

  /* Select: melhora um <select> nativo (que segue valendo no formulário) com lista desenhada e teclado do padrão ARIA. */
  C.select = sel => {
    const wrap = document.createElement('div'); wrap.className = 'ac-select-wrap';
    sel.after(wrap); wrap.appendChild(sel); sel.hidden = true; sel.tabIndex = -1;
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ac-input ac-select ac-select__trigger';
    btn.setAttribute('role', 'combobox'); btn.setAttribute('aria-haspopup', 'listbox'); btn.setAttribute('aria-expanded', 'false');
    const lab = sel.id && document.querySelector(`label[for="${sel.id}"]`);
    if (lab) { lab.id = lab.id || id('lab'); btn.id = id('selbtn'); lab.htmlFor = btn.id; btn.setAttribute('aria-labelledby', lab.id + ' ' + btn.id); }
    if (sel.getAttribute('aria-label')) btn.setAttribute('aria-label', sel.getAttribute('aria-label'));
    btn.disabled = sel.disabled; wrap.appendChild(btn);
    const pop = document.createElement('div'); pop.className = 'ac-pop'; pop.hidden = true; pop.style.padding = '0';
    const lb = document.createElement('ul'); lb.className = 'ac-listbox'; lb.id = id('lb'); lb.setAttribute('role', 'listbox'); lb.tabIndex = -1; pop.appendChild(lb); document.body.appendChild(pop);
    btn.setAttribute('aria-controls', lb.id);
    const opts = () => [...sel.options];
    let act = sel.selectedIndex, typed = '', typedT;
    const label = () => { const o = sel.options[sel.selectedIndex]; btn.innerHTML = `<span>${esc(o ? o.text : sel.dataset.placeholder || 'Selecione')}</span>`; btn.toggleAttribute('data-empty', !o || !o.value); };
    const render = () => {
      let h = '', g = null;
      opts().forEach((o, i) => {
        const grp = o.parentElement.tagName === 'OPTGROUP' ? o.parentElement.label : null;
        if (grp !== g) { g = grp; if (g) h += `<li class="ac-listbox__group" role="presentation">${esc(g)}</li>`; }
        h += `<li class="ac-option" role="option" id="${lb.id}-${i}" data-i="${i}" aria-selected="${i === act}" data-checked="${i === sel.selectedIndex}" ${o.disabled ? 'aria-disabled="true"' : ''}>${esc(o.text)}</li>`;
      });
      lb.innerHTML = h; lb.setAttribute('aria-activedescendant', `${lb.id}-${act}`);
      reveal($(`#${lb.id}-${act}`, lb));
    };
    const move = d => { const o = opts(); let n = act; do { n += d; } while (o[n] && o[n].disabled); if (o[n]) { act = n; render(); } };
    const show = () => { act = Math.max(0, sel.selectedIndex); render(); pop.style.minWidth = btn.offsetWidth + 'px'; openPop(pop, btn, { onClose: () => btn.setAttribute('aria-expanded', 'false') }); lb.focus(); };
    const pick = i => { const o = opts()[i]; if (!o || o.disabled) return; sel.selectedIndex = i; label(); closePop(pop, true); sel.dispatchEvent(new Event('change', { bubbles: true })); };
    btn.addEventListener('click', () => pop.hidden ? show() : closePop(pop));
    btn.addEventListener('keydown', e => { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); show(); } });
    lb.addEventListener('keydown', e => {
      const k = e.key;
      if (k === 'ArrowDown') { e.preventDefault(); move(1); } else if (k === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (k === 'Home') { e.preventDefault(); act = -1; move(1); } else if (k === 'End') { e.preventDefault(); act = opts().length; move(-1); }
      else if (k === 'Enter' || k === ' ') { e.preventDefault(); pick(act); }
      else if (k === 'Tab') closePop(pop, true);
      else if (k.length === 1) { clearTimeout(typedT); typed += k.toLowerCase(); typedT = setTimeout(() => typed = '', 600); const i = opts().findIndex(o => !o.disabled && o.text.toLowerCase().startsWith(typed)); if (i >= 0) { act = i; render(); } }
    });
    lb.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) pick(+li.dataset.i); });
    sel.addEventListener('change', label);
    label();
  };

  /* Popover: conteúdo interativo ancorado a um botão (formulário curto, filtros, detalhes). */
  C.popover = el => {
    const pop = $(el.dataset.target); if (!pop) return;
    pop.classList.add('ac-pop', 'ac-popover'); pop.setAttribute('role', 'dialog'); pop.hidden = true;
    el.setAttribute('aria-haspopup', 'dialog'); el.setAttribute('aria-expanded', 'false'); el.setAttribute('aria-controls', pop.id);
    el.addEventListener('click', () => {
      if (!pop.hidden) return closePop(pop, true);
      openPop(pop, el, { side: el.dataset.side || 'bottom', align: el.dataset.align || 'start' });
      (pop.querySelector('[autofocus], input, select, textarea, button, a[href], [tabindex]:not([tabindex="-1"])') || pop).focus();
    });
    pop.addEventListener('click', e => { if (e.target.closest('[data-ac-close]')) closePop(pop, true); });
  };

  /* Hover card: prévia rica ao passar o mouse ou focar um link; não carrega ações essenciais. */
  C.hovercard = el => {
    const card = $(el.dataset.target); if (!card) return;
    card.classList.add('ac-pop', 'ac-hovercard'); card.hidden = true; card.id = card.id || id('hc');
    let tIn, tOut;
    const show = () => { clearTimeout(tOut); tIn = setTimeout(() => { if (!card.hidden) return; openPop(card, el, { side: 'bottom', align: 'start' }); el.setAttribute('aria-describedby', card.id); }, +el.dataset.delay || 500); };
    const hide = () => { clearTimeout(tIn); tOut = setTimeout(() => { closePop(card); el.removeAttribute('aria-describedby'); }, 250); };
    [el, card].forEach(n => { n.addEventListener('pointerenter', show); n.addEventListener('pointerleave', hide); });
    el.addEventListener('focus', show); el.addEventListener('blur', hide);
  };

  /* Context menu: menu no botão direito (e Shift+F10 / tecla Menu no teclado). */
  C.contextmenu = area => {
    const pop = $(area.dataset.target); if (!pop) return;
    pop.setAttribute('role', 'menu'); pop.hidden = true; $$('.ac-menu__item', pop).forEach(i => i.setAttribute('role', 'menuitem'));
    if (!area.hasAttribute('tabindex')) area.tabIndex = 0;
    area.setAttribute('aria-haspopup', 'menu');
    const anchorAt = (x, y) => { const a = document.createElement('span'); a.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:0;height:0`; document.body.appendChild(a); return a; };
    const show = (x, y) => { const a = anchorAt(x, y); openPop(pop, a, { side: 'bottom', align: 'start', onClose: () => a.remove() }); pop._anchor = area; a.remove(); $('.ac-menu__item', pop)?.focus(); };
    area.addEventListener('contextmenu', e => { e.preventDefault(); show(e.clientX, e.clientY); });
    area.addEventListener('keydown', e => { if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) { e.preventDefault(); const r = area.getBoundingClientRect(); show(r.left + 16, r.top + 16); } });
    menuKeys(pop);
    pop.addEventListener('click', e => { const it = e.target.closest('.ac-menu__item'); if (it) { closePop(pop, true); area.dispatchEvent(new CustomEvent('ac:select', { detail: it.dataset.value || it.textContent.trim(), bubbles: true })); } });
  };

  /* Menubar: barra de menus de aplicativo (Arquivo, Editar…). ← → trocam de menu, ↓ abre. */
  C.menubar = bar => {
    bar.setAttribute('role', 'menubar');
    const triggers = $$('.ac-menubar__trigger', bar);
    const pops = triggers.map(t => $(t.dataset.target));
    triggers.forEach((t, i) => { t.setAttribute('role', 'menuitem'); t.setAttribute('aria-haspopup', 'menu'); t.setAttribute('aria-expanded', 'false'); t.tabIndex = i ? -1 : 0; const p = pops[i]; p.setAttribute('role', 'menu'); p.hidden = true; $$('.ac-menu__item', p).forEach(x => x.setAttribute('role', 'menuitem')); });
    const openAt = (i, focusItem = true) => { triggers.forEach(x => x.tabIndex = -1); triggers[i].tabIndex = 0; openPop(pops[i], triggers[i]); bar.dataset.open = i; if (focusItem) $('.ac-menu__item', pops[i])?.focus(); };
    const anyOpen = () => pops.some(p => !p.hidden);
    triggers.forEach((t, i) => {
      t.addEventListener('click', () => pops[i].hidden ? openAt(i) : closePop(pops[i]));
      t.addEventListener('pointerenter', () => { if (anyOpen() && pops[i].hidden) openAt(i, false); });
      t.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + triggers.length) % triggers.length; triggers.forEach(x => x.tabIndex = -1); triggers[n].tabIndex = 0; triggers[n].focus(); }
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(i); }
      });
      menuKeys(pops[i], e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); closePop(pops[i]); openAt((i + (e.key === 'ArrowRight' ? 1 : -1) + triggers.length) % triggers.length); } });
      pops[i].addEventListener('click', e => { const it = e.target.closest('.ac-menu__item'); if (it) { closePop(pops[i], true); bar.dispatchEvent(new CustomEvent('ac:select', { detail: it.dataset.value || it.textContent.trim(), bubbles: true })); } });
    });
  };

  /* Toggle: botão liga/desliga (negrito, favoritar). */
  C.toggle = b => { if (!b.hasAttribute('aria-pressed')) b.setAttribute('aria-pressed', 'false'); b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); b.dispatchEvent(new CustomEvent('ac:change', { detail: on, bubbles: true })); }); };

  /* Paginação: data-pages (total) e data-page (atual). Mostra a primeira, a última e as vizinhas da atual, com "…" no meio;
     o clique troca a página, o foco fica no mesmo controle depois de redesenhar e sai o evento ac:change com o número. */
  C.pagination = nav => {
    nav.classList.add('ac-pager'); if (!nav.hasAttribute('aria-label')) nav.setAttribute('aria-label', 'Paginação');
    const total = () => Math.max(1, +nav.dataset.pages || $$('button', nav).map(b => +b.textContent).filter(Boolean).pop() || 1);
    let page = Math.min(total(), Math.max(1, +nav.dataset.page || +($('[aria-current="page"]', nav) || {}).textContent || 1));
    const list = () => { const n = total(), s = +nav.dataset.siblings || 1, out = []; for (let i = 1; i <= n; i++) if (i === 1 || i === n || Math.abs(i - page) <= s) out.push(i); else if (out[out.length - 1] !== '…') out.push('…'); return out; };
    const render = focus => {
      const n = total();
      nav.innerHTML = `<button type="button" data-go="${page - 1}" ${page === 1 ? 'disabled' : ''} aria-label="Página anterior">${icon('left')}</button>`
        + list().map(i => i === '…' ? '<span aria-hidden="true">…</span>' : `<button type="button" data-go="${i}" aria-label="Página ${i}"${i === page ? ' aria-current="page"' : ''}>${i}</button>`).join('')
        + `<button type="button" data-go="${page + 1}" ${page === n ? 'disabled' : ''} aria-label="Próxima página">${icon('right')}</button>`;
      if (focus) { const b = $(`[aria-label="${focus}"]`, nav); (b && !b.disabled ? b : $('[aria-current="page"]', nav)).focus(); }
    };
    nav.addEventListener('click', e => {
      const b = e.target.closest('[data-go]'); if (!b || b.disabled) return;
      const to = Math.min(total(), Math.max(1, +b.dataset.go)); if (to === page) return;
      const keep = nav.contains(document.activeElement) ? b.getAttribute('aria-label') : null;
      page = to; nav.dataset.page = page; render(keep);
      nav.dispatchEvent(new CustomEvent('ac:change', { detail: page, bubbles: true }));
    });
    render();
    nav._pagination = { go: p => { page = Math.min(total(), Math.max(1, p)); nav.dataset.page = page; render(); } };
  };

  /* Grupo de escolha única (alinhamento, visualização): marcar um desmarca os outros e sempre fica um marcado.
     Semântica de rádio do WAI-ARIA (radiogroup + radio + aria-checked), como no exemplo de toolbar da APG.
     Fora de uma toolbar, as setas andam e já marcam; dentro dela, as setas são da toolbar e Espaço/Enter marcam. */
  C['toggle-group'] = g => {
    if (!g.hasAttribute('role')) g.setAttribute('role', 'radiogroup');
    const its = () => $$('.ac-toggle:not([disabled])', g);
    const pick = (b, emit) => { its().forEach(x => { x.setAttribute('aria-checked', x === b); if (!g.closest('[data-ac~="toolbar"]')) x.tabIndex = x === b ? 0 : -1; }); if (emit) g.dispatchEvent(new CustomEvent('ac:change', { detail: b.value || b.getAttribute('aria-label'), bubbles: true })); };
    its().forEach(b => { b.setAttribute('role', 'radio'); b.removeAttribute('aria-pressed'); b.addEventListener('click', () => { if (b.getAttribute('aria-checked') !== 'true') pick(b, true); }); });
    pick(its().find(b => b.getAttribute('aria-checked') === 'true') || its()[0], false);
    if (!g.closest('[data-ac~="toolbar"]')) g.addEventListener('keydown', e => {
      const it = its(), i = it.indexOf(document.activeElement), n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1 }[e.key];
      if (i < 0 || n === undefined) return; e.preventDefault(); const b = it[(n + it.length) % it.length]; pick(b, true); b.focus();
    });
  };

  /* Toolbar: um só ponto de Tab; as setas andam entre os controles (roving tabindex). */
  C.toolbar = bar => {
    bar.setAttribute('role', 'toolbar');
    const items = () => $$('button:not([disabled]), [role="button"], input, select', bar).filter(x => !x.closest('[hidden]'));
    items().forEach((x, i) => x.tabIndex = i ? -1 : 0);
    bar.addEventListener('keydown', e => {
      const it = items(), i = it.indexOf(document.activeElement); if (i < 0 || it[i].tagName === 'INPUT') return;
      const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: it.length - 1 }[e.key]; if (n === undefined) return;
      e.preventDefault(); const j = (n + it.length) % it.length; it.forEach(x => x.tabIndex = -1); it[j].tabIndex = 0; it[j].focus();
    });
    bar.addEventListener('focusin', e => { const it = items(); if (it.includes(e.target)) { it.forEach(x => x.tabIndex = -1); e.target.tabIndex = 0; } });
  };

  /* Number field: campo numérico com − e +, setas, Page Up/Down, Home/End e formato pt-BR. */
  C['number-field'] = el => {
    const inp = $('input', el), min = el.dataset.min !== undefined ? +el.dataset.min : -Infinity, max = el.dataset.max !== undefined ? +el.dataset.max : Infinity;
    const step = +el.dataset.step || 1, dec = +el.dataset.decimals || 0, suf = el.dataset.suffix || '';
    inp.setAttribute('role', 'spinbutton'); inp.inputMode = dec ? 'decimal' : 'numeric'; inp.autocomplete = 'off';
    const fmt = v => v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const parse = s => { const v = parseFloat(String(s).replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '')); return isNaN(v) ? null : v; };
    let val = parse(inp.value) ?? (isFinite(min) ? min : 0);
    const set = (v, announce) => {
      v = Math.min(max, Math.max(min, v)); val = +v.toFixed(dec); // não arredonda ao passo: 49,90 continua 49,90
      inp.value = fmt(val) + (suf ? ' ' + suf : ''); inp.setAttribute('aria-valuenow', val); inp.setAttribute('aria-valuetext', inp.value);
      if (isFinite(min)) inp.setAttribute('aria-valuemin', min); if (isFinite(max)) inp.setAttribute('aria-valuemax', max);
      dn.disabled = val <= min; up.disabled = val >= max;
      if (announce) el.dispatchEvent(new CustomEvent('ac:change', { detail: val, bubbles: true }));
    };
    const dn = document.createElement('button'), up = document.createElement('button');
    dn.type = up.type = 'button'; dn.className = up.className = 'ac-number-field__btn'; dn.tabIndex = up.tabIndex = -1;
    dn.setAttribute('aria-label', 'Diminuir'); up.setAttribute('aria-label', 'Aumentar');
    dn.innerHTML = '<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12L4 12"/></svg>'; up.innerHTML = '<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.001 5.00003V19.002"/><path d="M19.002 12.002L4.99998 12.002"/></svg>';
    inp.before(dn); inp.after(up);
    // segurar o botão repete o passo
    const hold = (b, d) => { let t, r; const stop = () => { clearTimeout(t); clearInterval(r); }; b.addEventListener('pointerdown', e => { e.preventDefault(); inp.focus(); set(val + d, true); t = setTimeout(() => r = setInterval(() => set(val + d, true), 60), 400); }); ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => b.addEventListener(ev, stop)); };
    hold(dn, -step); hold(up, step);
    inp.addEventListener('keydown', e => {
      const big = step * 10, m = { ArrowUp: step, ArrowDown: -step, PageUp: big, PageDown: -big }[e.key];
      if (m) { e.preventDefault(); set(val + m, true); } else if (e.key === 'Home' && isFinite(min)) { e.preventDefault(); set(min, true); } else if (e.key === 'End' && isFinite(max)) { e.preventDefault(); set(max, true); }
      else if (e.key === 'Enter') set(parse(inp.value) ?? val, true);
    });
    inp.addEventListener('focus', () => { inp.value = fmt(val); inp.select(); });
    inp.addEventListener('blur', () => set(parse(inp.value) ?? val, true));
    set(val);
  };

  /* Seleção múltipla de pessoas: etiquetas com rosto, busca e teclado. */
  C.people = el => {
    const opts = JSON.parse(el.dataset.options || '[]'); const chosen = new Set(JSON.parse(el.dataset.value || '[]'));
    el.classList.add('ac-chips-field');
    el.innerHTML = `<ul class="ac-chips" aria-label="Pessoas escolhidas"></ul><input class="ac-chips-field__input" placeholder="${esc(el.dataset.placeholder || 'Buscar pessoa')}" aria-label="${esc(el.dataset.label || 'Adicionar pessoa')}">`;
    const ul = $('ul', el), inp = $('input', el);
    const pop = document.createElement('div'); pop.className = 'ac-pop'; pop.hidden = true; pop.style.padding = '0';
    const lb = document.createElement('ul'); lb.className = 'ac-listbox'; lb.id = id('pp'); lb.setAttribute('role', 'listbox'); lb.setAttribute('aria-multiselectable', 'true'); pop.appendChild(lb); document.body.appendChild(pop);
    inp.setAttribute('role', 'combobox'); inp.setAttribute('aria-controls', lb.id); inp.setAttribute('aria-expanded', 'false'); inp.setAttribute('aria-autocomplete', 'list');
    const ini = n => n.split(' ').map(p => p[0]).slice(0, 2).join('');
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    let act = 0, list = [];
    const emit = () => { el.dataset.value = JSON.stringify([...chosen]); el.dispatchEvent(new CustomEvent('ac:change', { detail: [...chosen], bubbles: true })); };
    const chips = () => { ul.innerHTML = [...chosen].map(idv => { const p = opts.find(o => o.id === idv); return p ? `<li class="ac-chip"><span class="ac-avatar">${esc(ini(p.name))}</span>${esc(p.name)}<button type="button" data-rm="${esc(idv)}" aria-label="Remover ${esc(p.name)}">${icon('x')}</button></li>` : ''; }).join(''); };
    const render = () => {
      const q = norm(inp.value); list = opts.filter(o => norm(o.name + ' ' + (o.detail || '')).includes(q)); act = Math.min(act, Math.max(0, list.length - 1));
      lb.innerHTML = list.length ? list.map((o, i) => `<li class="ac-option" role="option" id="${lb.id}-${i}" data-i="${i}" aria-selected="${chosen.has(o.id)}" data-active="${i === act}" data-checked="${chosen.has(o.id)}"><span class="ac-avatar" style="width:24px;height:24px;font-size:var(--ac-fs-xs);box-shadow:none">${esc(ini(o.name))}</span>${esc(o.name)}<small>${esc(o.detail || '')}</small></li>`).join('') : '<li class="ac-listbox__empty">Ninguém encontrado.</li>';
      inp.setAttribute('aria-activedescendant', list.length ? `${lb.id}-${act}` : '');
      reveal($(`#${lb.id}-${act}`, lb));
    };
    const show = () => { render(); pop.style.width = el.offsetWidth + 'px'; openPop(pop, el, { owner: inp }); };
    const toggle = i => { const o = list[i]; if (!o) return; chosen.has(o.id) ? chosen.delete(o.id) : chosen.add(o.id); chips(); render(); emit(); place(pop, el); };
    inp.addEventListener('focus', show);
    inp.addEventListener('input', () => { act = 0; pop.hidden ? show() : render(); });
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (pop.hidden) show(); else { act = (act + 1) % Math.max(1, list.length); render(); } }
      else if (e.key === 'ArrowUp') { e.preventDefault(); act = (act - 1 + list.length) % Math.max(1, list.length); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); toggle(act); }
      else if (e.key === 'Backspace' && !inp.value && chosen.size) { chosen.delete([...chosen].pop()); chips(); emit(); }
    });
    lb.addEventListener('pointerdown', e => { const li = e.target.closest('[data-i]'); if (li) { e.preventDefault(); toggle(+li.dataset.i); } });
    ul.addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (b) { chosen.delete(isNaN(b.dataset.rm) ? b.dataset.rm : +b.dataset.rm); chips(); emit(); inp.focus(); } });
    el.addEventListener('click', e => { if (e.target === el) inp.focus(); });
    chips();
  };

  /* Tags: digite e tecle Enter ou vírgula para criar; Backspace apaga a última. */
  C.tags = el => {
    const max = +el.dataset.max || 10; const tags = (el.dataset.value || '').split(',').map(s => s.trim()).filter(Boolean);
    el.classList.add('ac-chips-field');
    el.innerHTML = `<ul class="ac-chips" aria-label="Tags"></ul><input class="ac-chips-field__input" placeholder="${esc(el.dataset.placeholder || 'Adicionar tag')}" aria-label="${esc(el.dataset.label || 'Nova tag')}"><span class="ac-sr" aria-live="polite"></span>`;
    const ul = $('ul', el), inp = $('input', el), live = $('[aria-live]', el);
    const draw = () => { ul.innerHTML = tags.map((t, i) => `<li class="ac-chip">${esc(t)}<button type="button" data-rm="${i}" aria-label="Remover ${esc(t)}">${icon('x')}</button></li>`).join(''); el.dataset.value = tags.join(','); };
    const add = v => { v = v.trim().replace(/,$/, ''); if (!v) return; if (tags.some(t => t.toLowerCase() === v.toLowerCase())) { live.textContent = `“${v}” já existe.`; return; } if (tags.length >= max) { live.textContent = `Limite de ${max} tags.`; return; } tags.push(v); draw(); live.textContent = `Tag ${v} adicionada.`; el.dispatchEvent(new CustomEvent('ac:change', { detail: [...tags], bubbles: true })); };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(inp.value); inp.value = ''; } else if (e.key === 'Backspace' && !inp.value && tags.length) { const t = tags.pop(); draw(); live.textContent = `Tag ${t} removida.`; } });
    inp.addEventListener('paste', e => { const t = (e.clipboardData || window.clipboardData).getData('text'); if (t.includes(',')) { e.preventDefault(); t.split(',').forEach(add); } });
    ul.addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (b) { const [t] = tags.splice(+b.dataset.rm, 1); draw(); live.textContent = `Tag ${t} removida.`; inp.focus(); } });
    el.addEventListener('click', e => { if (e.target === el) inp.focus(); });
    draw();
  };

  /* Intervalo de datas com atalhos: atalhos por nome e dois meses lado a lado. */
  C.daterange = el => {
    const pop = document.createElement('div'); pop.className = 'ac-pop ac-range'; pop.hidden = true; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Escolher período'); document.body.appendChild(pop);
    const lab = $('span', el), day = 864e5, today = new Date(); today.setHours(0, 0, 0, 0);
    const d0 = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
    const fmtS = d => d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', ...(d.getFullYear() !== today.getFullYear() ? { year: 'numeric' } : {}) });
    const fmtL = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const presets = [
      ['Hoje', () => [today, today]], ['Ontem', () => { const y = new Date(+today - day); return [y, y]; }],
      ['Últimos 7 dias', () => [new Date(+today - 6 * day), today]], ['Últimos 30 dias', () => [new Date(+today - 29 * day), today]],
      ['Este mês', () => [new Date(today.getFullYear(), today.getMonth(), 1), today]],
      ['Mês passado', () => [new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 0)]]
    ];
    let a = null, b = null, hover = null, view = new Date(today.getFullYear(), today.getMonth() - 1, 1), focusT = +today;
    const month = (y, m) => {
      const first = new Date(y, m, 1).getDay(), lo = a && b ? Math.min(+a, +b) : null, hi = a && b ? Math.max(+a, +b) : null;
      const pv = a && !b && hover ? [Math.min(+a, hover), Math.max(+a, hover)] : null;
      let h = `<div class="ac-cal"><div class="ac-cal__head"><span>${new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date(y, m, 1))}</span></div><div class="ac-cal__grid" role="grid">`;
      ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].forEach(x => h += `<span class="ac-cal__dow" aria-hidden="true">${x}</span>`);
      for (let i = 0; i < 42; i++) {
        const d = new Date(y, m, i - first + 1), t = +d, out = d.getMonth() !== m;
        if (out) { h += '<span></span>'; continue; }
        const edge = (a && t === +a) || (b && t === +b), inr = (lo !== null && t > lo && t < hi) || (pv && t > pv[0] && t < pv[1]);
        h += `<button type="button" class="ac-cal__day" data-t="${t}" ${t === +today ? 'data-today' : ''} ${inr ? 'data-in' : ''} aria-selected="${!!edge}" tabindex="${t === focusT ? 0 : -1}" aria-label="${fmtL.format(d)}">${d.getDate()}</button>`;
      }
      return h + '</div></div>';
    };
    const render = () => {
      const m2 = new Date(view.getFullYear(), view.getMonth() + 1, 1);
      pop.innerHTML = `<div class="ac-range__presets" role="group" aria-label="Atalhos">${presets.map(([n], i) => `<button type="button" class="ac-menu__item" data-p="${i}">${esc(n)}</button>`).join('')}</div>
        <div class="ac-range__cals"><div class="ac-range__nav"><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-nav="-1" aria-label="Mês anterior">${icon('left')}</button><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-nav="1" aria-label="Próximo mês">${icon('right')}</button></div>
        <div class="ac-range__months">${month(view.getFullYear(), view.getMonth())}<div class="ac-range__second">${month(m2.getFullYear(), m2.getMonth())}</div></div>
        <p class="ac-range__hint" aria-live="polite">${!a ? 'Escolha a data de início.' : !b ? 'Agora escolha a data de fim.' : `${fmtL.format(new Date(Math.min(+a, +b)))} a ${fmtL.format(new Date(Math.max(+a, +b)))}`}</p></div>`;
    };
    const commit = () => {
      const lo = new Date(Math.min(+a, +b)), hi = new Date(Math.max(+a, +b));
      lab.textContent = +lo === +hi ? fmtS(lo) : `${fmtS(lo)} a ${fmtS(hi)}`; el.removeAttribute('data-empty');
      el.dispatchEvent(new CustomEvent('ac:change', { detail: { de: lo, ate: hi }, bubbles: true }));
      closePop(pop, true);
    };
    const pickDay = t => { if (!a || b) { a = new Date(t); b = null; } else { b = new Date(t); } focusT = t; render(); if (a && b) setTimeout(commit, 160); else $(`[data-t="${t}"]`, pop)?.focus(); };
    el.setAttribute('aria-haspopup', 'dialog');
    el.addEventListener('click', () => { if (!pop.hidden) return closePop(pop); hover = null; render(); openPop(pop, el); ($('.ac-cal__day[tabindex="0"]', pop) || $('.ac-menu__item', pop)).focus(); });
    pop.addEventListener('click', e => {
      const p = e.target.closest('[data-p]'); if (p) { [a, b] = presets[+p.dataset.p][1]().map(d0); view = new Date(b.getFullYear(), b.getMonth() - 1, 1); commit(); return; }
      const n = e.target.closest('[data-nav]'); if (n) { view.setMonth(view.getMonth() + +n.dataset.nav); render(); $(`[data-nav="${n.dataset.nav}"]`, pop).focus(); return; }
      const d = e.target.closest('.ac-cal__day'); if (d) pickDay(+d.dataset.t);
    });
    pop.addEventListener('pointerover', e => { const d = e.target.closest('.ac-cal__day'); if (d && a && !b && hover !== +d.dataset.t) { hover = +d.dataset.t; const f = document.activeElement; render(); f && f.dataset && f.dataset.t && $(`[data-t="${f.dataset.t}"]`, pop)?.focus(); } });
    pop.addEventListener('keydown', e => {
      const d = e.target.closest('.ac-cal__day'); if (!d) return; const s = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!s) return;
      e.preventDefault(); const nd = d0(+d.dataset.t + s * day); focusT = +nd; if (a && !b) hover = +nd;
      if (!$(`[data-t="${+nd}"]`, pop)) view = new Date(nd.getFullYear(), nd.getMonth() - (s > 0 ? 1 : 0), 1);
      render(); $(`[data-t="${+nd}"]`, pop)?.focus();
    });
  };

  /* Gráfico de área com comparação e "Ver tabela". Setas percorrem os pontos. */
  C.area = el => {
    const v = el.dataset.values.split(',').map(Number), c = el.dataset.compare ? el.dataset.compare.split(',').map(Number) : null;
    const labs = (el.dataset.labels || '').split(','), name = el.dataset.label || 'Série', fmt = n => n.toLocaleString('pt-BR');
    el.classList.add('ac-area');
    const W = 600, H = 200, P = 8, mx = Math.max(...v, ...(c || [])) * 1.1 || 1;
    const pt = (arr, i) => [P + i / (arr.length - 1) * (W - 2 * P), H - P - arr[i] / mx * (H - 2 * P)];
    const path = arr => arr.map((_, i) => (i ? 'L' : 'M') + pt(arr, i).map(n => n.toFixed(1)).join(' ')).join(' ');
    const tid = id('tbl');
    el.innerHTML = `<div class="ac-area__plot" tabindex="0" role="img" aria-label="${esc(name)}: ${v.length} pontos. Use as setas para ler os valores."><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
      ${[.25, .5, .75].map(f => `<line class="g" x1="0" x2="${W}" y1="${(H * f).toFixed(1)}" y2="${(H * f).toFixed(1)}"/>`).join('')}
      ${c ? `<path class="cmp" d="${path(c)}"/>` : ''}<path class="fill" d="${path(v)} L${W - P} ${H - P} L${P} ${H - P} Z"/><path class="ln" d="${path(v)}"/><line class="cur" x1="0" x2="0" y1="0" y2="${H}" style="display:none"/></svg><span class="ac-area__dot" style="display:none"></span><div class="ac-area__tip" hidden></div></div>
      <div class="ac-area__foot"><span class="ac-area__legend"><i></i>${esc(name)}${c ? '<i class="c"></i>Período anterior' : ''}</span><button class="ac-btn ac-btn--ghost ac-btn--sm" type="button" aria-expanded="false" aria-controls="${tid}">Ver tabela</button></div>
      <div class="ac-table-scroll" id="${tid}" hidden><table class="ac-table"><thead><tr><th>Ponto</th><th class="num">${esc(name)}</th>${c ? '<th class="num">Anterior</th>' : ''}</tr></thead><tbody>${v.map((x, i) => `<tr><td>${esc(labs[i] || i + 1)}</td><td class="num">${fmt(x)}</td>${c ? `<td class="num">${fmt(c[i] ?? 0)}</td>` : ''}</tr>`).join('')}</tbody></table></div>`;
    // o SVG estica (preserveAspectRatio=none), então o marcador do ponto é um elemento HTML para não virar elipse
    const plot = $('.ac-area__plot', el), svg = $('svg', el), tip = $('.ac-area__tip', el), cur = $('.cur', el), dot = $('.ac-area__dot', el);
    $('path.ln', el).style.setProperty('--len', Math.ceil($('path.ln', el).getTotalLength()));
    let at = -1;
    const show = i => {
      at = Math.max(0, Math.min(v.length - 1, i)); const [x, y] = pt(v, at); const r = svg.getBoundingClientRect();
      cur.setAttribute('x1', x); cur.setAttribute('x2', x); cur.style.display = ''; dot.style.display = ''; dot.style.left = (x / W * 100) + '%'; dot.style.top = (y / H * 100) + '%';
      tip.hidden = false; tip.innerHTML = `<b>${esc(labs[at] || 'Ponto ' + (at + 1))}</b><span>${esc(name)}: ${fmt(v[at])}</span>${c ? `<span class="c">Anterior: ${fmt(c[at])}</span>` : ''}`;
      const px = x / W * r.width; tip.style.left = Math.min(r.width - tip.offsetWidth, Math.max(0, px - tip.offsetWidth / 2)) + 'px';
    };
    const hide = () => { tip.hidden = true; cur.style.display = dot.style.display = 'none'; };
    plot.addEventListener('pointermove', e => { const r = svg.getBoundingClientRect(); show(Math.round((e.clientX - r.left) / r.width * (v.length - 1))); });
    plot.addEventListener('pointerleave', () => { if (document.activeElement !== plot) hide(); });
    plot.addEventListener('keydown', e => { const n = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: v.length - 1 }[e.key]; if (n === undefined) return; e.preventDefault(); show(n); });
    plot.addEventListener('focus', () => show(at < 0 ? v.length - 1 : at)); plot.addEventListener('blur', hide);
    const tb = $('.ac-area__foot button', el); tb.addEventListener('click', () => { const t = $('#' + tid, el); t.hidden = !t.hidden; tb.setAttribute('aria-expanded', !t.hidden); tb.textContent = t.hidden ? 'Ver tabela' : 'Ocultar tabela'; });
  };

  /* Cartão recolhível: título e resumo fechados; linhas quando aberto. */
  C.collapsible = el => {
    const tr = $('[data-ac-trigger]', el), pn = $('.ac-collapsible__panel', el);
    pn.id = pn.id || id('col'); tr.setAttribute('aria-controls', pn.id); tr.setAttribute('aria-expanded', el.classList.contains('is-open'));
    tr.addEventListener('click', () => { const on = !el.classList.contains('is-open'); el.classList.toggle('is-open', on); tr.setAttribute('aria-expanded', on); });
  };

  /* Páginas de erro e resultado, no desenho das páginas de erro do 4squad: a ilustração do caso (o ícone num quadrado
     sobre uma mancha, com um selo no canto), o código grande, título, texto, o botão principal e um link embaixo.
     data-code: 401, 403, 404, 500, 503, offline, error (erro inesperado na tela) e success.
     Quem está vendo (data-audience: guest, user ou admin) muda o "voltar": para o início, para o app ou para o painel.
     Ações próprias (o conteúdo de dentro, que substitui as padrão) com data-for="admin" (ou "user admin"…) só aparecem
     para esse público: o painel nunca aparece para quem não é da equipe. Endereços: data-home ("/" sem ele), data-login
     (401) e data-support (com ele, o 403 oferece "Falar com o suporte"). 500 e error mostram o horário; data-error-id
     mostra o código para o suporte, com botão de copiar; data-retry-at ("15:30" ou data ISO) dá a previsão de volta do
     503. Cada ação dispara ac:action ({ action, code }, cancelável): sem preventDefault, "Tentar de novo" recarrega a
     página e "Voltar para a página anterior" volta no histórico. Sem internet, a página recarrega sozinha quando a
     conexão volta (ac:online, cancelável).
     Cada caso: [ícone, título, texto, ação principal, ação secundária, selo, tom, tipos das ações]. */
  const RESULTS = {
    404: ['search', 'Página não encontrada', 'A página que você procura pode ter sido removida, mudado de endereço ou não existir mais.', 'Voltar para o início', 'Voltar para a página anterior', 'help', 'neutral', 'home back'],
    403: ['lock', 'Acesso negado', 'Esta área é de outro tipo de acesso. Se você acha que é um engano, fale com o suporte.', 'Voltar para o início', '', 'block', 'danger', 'home'],
    401: ['user', 'Sessão encerrada', 'Por segurança, a sua sessão fechou. Entre de novo para continuar de onde parou.', 'Entrar de novo', '', 'bang', 'warning', 'login'],
    500: ['server', 'Erro no servidor', 'Algo falhou do nosso lado. Tente de novo; se continuar, avise o suporte com as informações abaixo.', 'Tentar de novo', 'Voltar para o início', 'x', 'danger', 'retry home'],
    503: ['gear', 'Em manutenção', 'Estamos atualizando o sistema e voltamos em breve. Nada do que você fez se perdeu.', 'Tentar de novo', '', 'clock', 'warning', 'retry'],
    offline: ['signal', 'Sem conexão', 'Não foi possível falar com o servidor. Confira a internet; a página volta sozinha quando a conexão voltar.', 'Tentar de novo', '', 'x', 'danger', 'retry'],
    error: ['browser', 'Algo deu errado', 'Aconteceu um erro inesperado. Tente de novo em alguns instantes.', 'Tentar de novo', 'Voltar para o início', 'bang', 'warning', 'retry home'],
    success: ['check', 'Tudo certo', 'A ação foi concluída. Você já pode seguir.', 'Continuar', '', '', 'success', 'next'],
    // textos que não são de um caso só
    labels: { home: 'Voltar para o início', user: 'Voltar para o app', admin: 'Voltar para o painel', back: 'Voltar para a página anterior', retry: 'Tentar de novo', login: 'Entrar de novo', support: 'Falar com o suporte', next: 'Continuar', time: 'Horário', id: 'Código do erro', copy: 'Copiar o código do erro', copied: 'Código copiado', returnAt: 'Previsão de volta', today: 'hoje', at: 'às', code: 'código' }
  };
  ICONS.lock = '<path d="M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z"/><path d="M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9"/><path d="M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z"/>';
  ICONS.gear = '<path d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"/><path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"/>';
  ICONS.wifi = '<path d="M14.5002 15L9.50016 20M14.5002 20L9.50016 15"/><path d="M18.5 13C14.7324 9 9.5 9 5.5 13"/><path d="M2 8C8.31579 2.66669 15.6842 2.66668 22 7.99989"/>';
  Object.assign(ICONS, {
    user: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="9.5" r="3"/><path d="M7 18C8.3 16.2 10 15.3 12 15.3C14 15.3 15.7 16.2 17 18"/>',
    server: '<rect x="3" y="3" width="18" height="7.5" rx="2.5"/><rect x="3" y="13.5" width="18" height="7.5" rx="2.5"/><path d="M7 6.75H7.01M7 17.25H7.01M11 6.75H17M11 17.25H17"/>',
    browser: '<rect x="2.5" y="3.5" width="19" height="17" rx="3.5"/><path d="M2.5 8.5H21.5"/><path d="M6 6H6.01M9 6H9.01M9.5 12.5H9.51M14.5 12.5H14.51"/><path d="M9.5 17C10.9 15.6 13.1 15.6 14.5 17"/>',
    refresh: '<path d="M20 12A8 8 0 1 1 17.66 6.34L20 8.5"/><path d="M20 4V8.5H15.5"/>',
    'arrow-left': '<path d="M4 12H20"/><path d="M9 17C9 17 4 13.32 4 12C4 10.68 9 7 9 7"/>',
    'arrow-right': '<path d="M20 12H4"/><path d="M15 17C15 17 20 13.32 20 12C20 10.68 15 7 15 7"/>',
    headset: '<path d="M4 15V12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12V15"/><path d="M4 14.5C4 13.4 4.9 12.5 6 12.5H7.5V18.5H6C4.9 18.5 4 17.6 4 16.5V14.5Z"/><path d="M20 14.5C20 13.4 19.1 12.5 18 12.5H16.5V18.5H18C19.1 18.5 20 17.6 20 16.5V14.5Z"/><path d="M16.5 18.5C16.5 20 15 21 12.5 21"/>',
    signal: '<path d="M2 8.5C8.32 3.17 15.68 3.17 22 8.5"/><path d="M5.5 12.5C9.5 8.83 14.5 8.83 18.5 12.5"/><path d="M9 16.25C10.8 14.75 13.2 14.75 15 16.25"/><path d="M12 19.75H12.01"/>',
    help: '<path d="M8.5 8.75C8.5 6.68 10.07 5 12 5C13.93 5 15.5 6.68 15.5 8.75C15.5 10.3 14.6 11.6 13.3 12.2C12.5 12.55 12 13.3 12 14.15V14.75"/><path d="M12 19H12.01"/>',
    block: '<circle cx="12" cy="12" r="8"/><path d="M6.4 6.4L17.6 17.6"/>',
    bang: '<path d="M12 5V14"/><path d="M12 19H12.01"/>'
  });
  C.result = el => {
    const d = el.dataset, L = RESULTS.labels, code = d.code || '404', r = Array.isArray(RESULTS[code]) ? RESULTS[code] : RESULTS[404];
    const who = /^(user|admin)$/.test(d.audience) ? d.audience : 'guest', num = /^\d+$/.test(code), lv = /^[1-6]$/.test(d.level) ? d.level : 2;
    // ações próprias: os nós de dentro são mantidos (componentes neles seguem vivos); data-for filtra pelo público
    const own = document.createDocumentFragment(); while (el.firstChild) own.appendChild(el.firstChild);
    $$('[data-for]', own).forEach(n => { if (!n.dataset.for.split(/\s+/).includes(who)) n.remove(); });
    const hasOwn = [...own.childNodes].some(n => n.nodeType === 1 || n.textContent.trim());
    el.classList.add('ac-result'); d.tone = r[6] || (code === 'success' ? 'success' : /^5|offline/.test(code) ? 'danger' : 'neutral');
    if (!el.hasAttribute('role') || d.resultRole) { const role = code === 'success' ? 'status' : code === '404' ? '' : 'alert'; if (role) el.setAttribute('role', role); else el.removeAttribute('role'); d.resultRole = '1'; }
    // ações padrão: o tipo diz o que fazem; com data-support, o 403 troca o "voltar" por "Falar com o suporte"
    const swap = code === '403' && !!d.support, kinds = swap ? ['support', 'home'] : (r[7] || 'primary secondary').split(/\s+/).slice(0, 2);
    const label = (k, i) => (k === 'home' && (d.homeLabel || (who !== 'guest' && L[who]))) || (swap ? L[k] : r[3 + i]) || L[k] || '';
    const href = { home: d.home || '/', login: d.login || d.home || '/', support: d.support };
    const act = (k, i) => {
      const t = label(k, i); if (!t || (k === 'back' && history.length < 2)) return '';
      const at = `class="${i ? 'ac-result__link' : 'ac-btn ac-btn--lg'}" data-result-action="${i ? 'secondary' : 'primary'}" data-action="${esc(k)}"`;
      const ico = !i && { home: 'arrow-left', retry: 'refresh', support: 'headset' }[k];
      const body = (ico ? icon(ico) : '') + esc(t) + (!i && k === 'login' ? icon('arrow-right') : '');
      return href[k] ? `<a ${at} href="${esc(href[k])}"${k === 'support' && /^https?:/i.test(href[k]) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${body}</a>` : `<button type="button" ${at}>${body}</button>`;
    };
    // o que ajuda a relatar ou esperar: horário (500 e error), código do erro e previsão de volta (503)
    const meta = [], stamp = (t, s) => `<time datetime="${t.toISOString()}">${esc(s)}</time>`;
    if (code === '500' || code === 'error') { const n = new Date(); meta.push(`<span>${esc(L.time)}: ${stamp(n, n.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }))}</span>`); }
    if (d.errorId) meta.push(`<span class="ac-result__id">${esc(L.id)}: <code>${esc(d.errorId)}</code><button type="button" class="ac-result__copy" data-action="copy" aria-label="${esc(L.copy)}">${icon('copy')}${icon('check')}</button></span>`);
    if (code === '503' && d.retryAt) {
      const m = /^(\d{1,2}):(\d{2})$/.exec(d.retryAt), t = m ? new Date() : new Date(d.retryAt); if (m) t.setHours(+m[1], +m[2], 0, 0);
      const day = isNaN(t) ? '' : t.toDateString() === new Date().toDateString() ? L.today : t.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      meta.push(`<span>${esc(L.returnAt)}: ${isNaN(t) ? esc(d.retryAt) : stamp(t, `${day} ${L.at} ${t.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`)}</span>`);
    }
    el.innerHTML = `<span class="ac-result__art" aria-hidden="true"><span class="ac-result__icon">${icon(r[0])}</span>${r[5] ? `<span class="ac-result__badge">${icon(r[5])}</span>` : ''}</span>`
      + (num ? `<p class="ac-result__code" aria-hidden="true">${esc(code)}</p>` : '')
      + `<h${lv} class="ac-result__title">${esc(d.title || r[1])}${num ? `<span class="ac-sr"> (${esc(L.code)} ${esc(code)})</span>` : ''}</h${lv}><p class="ac-result__text">${esc(d.text || r[2])}</p>`
      + (meta.length ? `<p class="ac-result__meta">${meta.join('')}</p>` : '') + '<span class="ac-sr" aria-live="polite"></span>'
      + `<div class="ac-result__actions">${hasOwn ? '' : kinds.map(act).join('')}</div>`;
    if (hasOwn) $('.ac-result__actions', el).appendChild(own);
    el.addEventListener('click', async e => {
      const b = e.target.closest('[data-action], [data-result-action]'); if (!b || !el.contains(b)) return;
      const action = b.dataset.action || b.dataset.resultAction;
      if (!el.dispatchEvent(new CustomEvent('ac:action', { detail: { action, code }, bubbles: true, cancelable: true }))) { e.preventDefault(); return; }
      if (action === 'retry') location.reload();
      else if (action === 'back') history.back();
      else if (action === 'copy') {
        const live = $(':scope > [aria-live]', el);
        if (!await copyText(d.errorId, el)) { getSelection().selectAllChildren(b.previousElementSibling); return; }
        b.dataset.state = 'copied'; b.setAttribute('aria-label', L.copied); live.textContent = L.copied; clearTimeout(b.t);
        b.t = setTimeout(() => { delete b.dataset.state; b.setAttribute('aria-label', L.copy); live.textContent = ''; }, 1600);
      }
    });
    // sem internet: volta sozinha quando a conexão voltar
    if (code === 'offline') { const back = () => { removeEventListener('online', back); if (el.isConnected && el.dispatchEvent(new CustomEvent('ac:online', { bubbles: true, cancelable: true }))) location.reload(); }; addEventListener('online', back); }
  };


  /* ======================= Carregamento com logo =======================
     O contorno se desenha, o logo aparece
     preenchido com um brilho passando e o traço some, em 3,2 s, sem parar; por baixo, o contorno apagado “respira”.
     Aceita qualquer logo: SVG é desenhado traço a traço; PNG/JPG/WebP é ajustado a um quadrado padrão (240 × 240) e o
     traço vira a revelação da silhueta. O SVG enviado nunca é inserido como veio: só formas geométricas e cores
     simples são copiadas (sem script, eventos, links ou imagens embutidas). */
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const LOGO_ATTR = { path: ['d'], rect: ['x', 'y', 'width', 'height', 'rx', 'ry'], circle: ['cx', 'cy', 'r'], ellipse: ['cx', 'cy', 'rx', 'ry'], polygon: ['points'], polyline: ['points'], line: ['x1', 'y1', 'x2', 'y2'] };
  const reNum = /^[-+0-9.,eE\s%]*$/, reD = /^[MmLlHhVvCcSsQqTtAaZz0-9.,eE\s+-]*$/, reTf = /^[a-zA-Z0-9\s.,()+-]*$/;
  const reColor = /^(#[0-9a-fA-F]{3,8}|[a-zA-Z]+|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%a-z]+\))$/;
  const paint = (v, dflt) => v == null ? dflt : v.trim() === 'none' ? 'none' : (reColor.test(v.trim()) && !/url|expression/i.test(v)) ? v.trim() : dflt;
  const DEFAULT_LOGO = '<svg viewBox="0 0 64 64"><rect x="15.25" y="15.25" width="13.5" height="13.5" rx="2.25" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="34" y="14" width="16" height="16" rx="3.5" fill="currentColor"/><rect x="15.25" y="35.25" width="13.5" height="13.5" rx="2.25" fill="none" stroke="currentColor" stroke-width="2.5"/><rect x="35.25" y="35.25" width="13.5" height="13.5" rx="2.25" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>';

  function sanitizeSvg(text) {
    const doc = new DOMParser().parseFromString(String(text), 'image/svg+xml');
    const root = doc.documentElement;
    if (!root || root.localName !== 'svg' || doc.getElementsByTagName('parsererror').length) throw new Error('Este arquivo não é um SVG válido.');
    const out = [];
    const styleOf = (el, inh) => {
      const st = { ...inh }, css = el.getAttribute('style') || '';
      ['fill', 'stroke', 'stroke-width', 'opacity', 'fill-rule'].forEach(a => { let v = el.getAttribute(a); const m = new RegExp('(?:^|;)\\s*' + a + '\\s*:\\s*([^;]+)').exec(css); if (m) v = m[1].trim(); if (v != null) st[a] = v; });
      return st;
    };
    const walk = (node, tf, inh) => {
      for (const el of node.children) {
        if (out.length >= 200) return;
        const n = el.localName;
        if (['script', 'foreignObject', 'style', 'defs', 'clipPath', 'mask', 'symbol', 'title', 'desc', 'metadata', 'image', 'use', 'text'].includes(n)) continue;
        const t = el.getAttribute('transform'), tf2 = t && reTf.test(t) ? (tf + ' ' + t).trim() : tf, st = styleOf(el, inh);
        if (n === 'g' || n === 'a' || n === 'svg') { walk(el, tf2, st); continue; }
        if (!LOGO_ATTR[n]) continue;
        const a = {}; let ok = true;
        LOGO_ATTR[n].forEach(k => { const v = el.getAttribute(k); if (v == null) return; if (k === 'd' ? !reD.test(v) : !reNum.test(v)) ok = false; else a[k] = v; });
        if (ok) out.push({ n, a, tf: tf2, st });
      }
    };
    walk(root, '', {});
    if (!out.length) throw new Error('O SVG não tem formas que possam ser desenhadas (textos e imagens embutidas não contam).');
    return out;
  }
  function shapeNode(s, o) {
    const e = document.createElementNS(SVG_NS, s.n);
    Object.entries(s.a).forEach(([k, v]) => e.setAttribute(k, v));
    if (s.tf) e.setAttribute('transform', s.tf);
    Object.entries(o).forEach(([k, v]) => v != null && e.setAttribute(k, v));
    return e;
  }
  function renderLogoSvg(el, shapes) {
    const u = id('lg'), svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'ac-logo-load__svg'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    el.replaceChildren(svg);
    // mede as formas para montar um viewBox quadrado com folga, seja qual for o tamanho original do arquivo
    const probe = document.createElementNS(SVG_NS, 'g'); shapes.forEach(s => probe.appendChild(shapeNode(s, { fill: '#000', stroke: '#000', 'stroke-width': s.st['stroke-width'] }))); svg.appendChild(probe);
    let b; try { b = probe.getBBox(); } catch (_) { b = null; }
    if (!b || !b.width || !b.height) b = { x: 0, y: 0, width: 100, height: 100 };
    probe.remove();
    const side = Math.max(b.width, b.height), pad = side * .1, vs = side + pad * 2, vx = b.x - (side - b.width) / 2 - pad, vy = b.y - (side - b.height) / 2 - pad;
    svg.setAttribute('viewBox', `${vx} ${vy} ${vs} ${vs}`);
    svg.style.setProperty('--d', vs);
    const sw = +(vs * .026).toFixed(3);
    const defs = document.createElementNS(SVG_NS, 'defs');
    defs.innerHTML = `<linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="1"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="${u}m" maskUnits="userSpaceOnUse" x="${vx}" y="${vy}" width="${vs}" height="${vs}"></mask>`;
    svg.appendChild(defs);
    const mask = defs.querySelector('mask');
    const g = cls => { const n = document.createElementNS(SVG_NS, 'g'); n.setAttribute('class', cls); svg.appendChild(n); return n; };
    const base = g('ac-logo-load__base'), fill = g('ac-logo-load__fill'), traces = g('ac-logo-load__traces');
    shapes.forEach((s, i) => {
      const f = paint(s.st.fill, 'currentColor'), k = paint(s.st.stroke, null), kw = reNum.test(s.st['stroke-width'] || '') ? s.st['stroke-width'] : null;
      base.appendChild(shapeNode(s, { fill: 'none', stroke: 'currentColor', 'stroke-width': sw }));
      fill.appendChild(shapeNode(s, { fill: f, stroke: k || 'none', 'stroke-width': kw, 'fill-rule': s.st['fill-rule'] === 'evenodd' ? 'evenodd' : null, opacity: reNum.test(s.st.opacity || '') ? s.st.opacity : null }));
      mask.appendChild(shapeNode(s, { fill: f === 'none' ? 'none' : '#fff', stroke: k ? '#fff' : 'none', 'stroke-width': kw }));
      if (i < 60) { const t = shapeNode(s, { fill: 'none', stroke: 'currentColor', 'stroke-width': sw * 1.15, pathLength: 1, class: 'ac-logo-load__trace' }); t.style.animationDelay = Math.min(i * .08, .6) + 's'; traces.appendChild(t); }
    });
    const shine = document.createElementNS(SVG_NS, 'rect');
    ['x', 'y'].forEach((k, j) => shine.setAttribute(k, j ? vy : vx)); shine.setAttribute('width', vs); shine.setAttribute('height', vs);
    shine.setAttribute('fill', `url(#${u}b)`); shine.setAttribute('mask', `url(#${u}m)`); shine.setAttribute('class', 'ac-logo-load__shine');
    fill.appendChild(shine);
  }
  function renderLogoImg(el, url) {
    el.replaceChildren();
    const wrap = document.createElement('span'); wrap.className = 'ac-logo-load__img';
    ['b', 'd', 'f'].forEach(c => { const im = document.createElement('img'); im.className = c; im.alt = ''; im.src = url; wrap.appendChild(im); });
    const s = document.createElement('span'); s.className = 's'; s.style.webkitMaskImage = s.style.maskImage = `url("${url.replace(/"/g, '%22')}")`; wrap.appendChild(s);
    el.appendChild(wrap);
  }
  // ajusta qualquer imagem a um quadrado padrão de 240 × 240, centralizada, com folga e fundo transparente
  function normalizeImage(url) {
    return new Promise((ok, no) => {
      const im = new Image();
      im.onload = () => {
        const S = 240, c = document.createElement('canvas'); c.width = c.height = S;
        const k = Math.min(S / im.naturalWidth, S / im.naturalHeight) * .84, w = im.naturalWidth * k, h = im.naturalHeight * k;
        c.getContext('2d').drawImage(im, (S - w) / 2, (S - h) / 2, w, h);
        try { ok(c.toDataURL('image/png')); } catch (_) { ok(url); }
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      };
      im.onerror = () => no(new Error('Não foi possível abrir a imagem.'));
      im.src = url;
    });
  }
  async function loadLogo(el, src) {
    let logo;
    if (typeof File !== 'undefined' && src instanceof File) {
      if (src.size > 2 * 1024 * 1024) throw new Error('A imagem passa de 2 MB. Use um arquivo menor.');
      if (src.type === 'image/svg+xml' || /\.svg$/i.test(src.name)) logo = { svg: sanitizeSvg(await src.text()) };
      else if (/^image\/(png|jpeg|webp|gif)$/.test(src.type)) logo = { img: await normalizeImage(URL.createObjectURL(src)) };
      else throw new Error('Formato não aceito. Use SVG, PNG, JPG ou WebP.');
    } else if (!src) logo = { svg: sanitizeSvg(DEFAULT_LOGO) };
    else if (/^\s*<svg[\s>]/i.test(src)) logo = { svg: sanitizeSvg(src) };
    else if (/\.svg([?#]|$)/i.test(src)) logo = { svg: sanitizeSvg(await (await fetch(src)).text()) };
    else logo = { img: await normalizeImage(src) };
    el._logo = logo;
    logo.svg ? renderLogoSvg(el, logo.svg) : renderLogoImg(el, logo.img);
    el.dispatchEvent(new CustomEvent('ac:load', { detail: { type: logo.svg ? 'svg' : 'image', shapes: logo.svg ? logo.svg.length : 0 }, bubbles: true }));
    return el;
  }
  // recomeça o ciclo do zero (o botão "Recarregar")
  function replayLogo(el) { (el.getAnimations ? el.getAnimations({ subtree: true }) : []).forEach(a => { a.cancel(); a.play(); }); }

  C['logo-loader'] = el => {
    el.classList.add('ac-logo-load'); el.setAttribute('role', 'img'); el.setAttribute('aria-label', el.dataset.label || 'Carregando');
    const inline = el.querySelector('svg');
    loadLogo(el, inline ? inline.outerHTML : el.dataset.src || '').catch(err => { console.warn('[Orthos] logo', err.message); loadLogo(el, ''); });
  };

  /* Carregamento por cima da tela inteira, com o fundo desfocado. Espera curta (menos que
     `delay`) nem aparece, para não piscar; uma vez na tela, fica pelo menos `min` ms. Devolve a função que esconde. */
  function loadingScreen(o = {}) {
    const ov = document.createElement('div'); ov.className = 'ac ac-loading-screen'; ov.setAttribute('role', 'status'); ov.setAttribute('aria-live', 'polite');
    const box = document.createElement('div'); box.className = 'ac-logo-load'; box.style.setProperty('--size', (o.size || 88) + 'px');
    const sr = document.createElement('span'); sr.className = 'ac-sr';
    ov.append(box, sr); document.body.appendChild(ov);
    const from = o.logo instanceof Element ? o.logo._logo : null;
    if (from) { box._logo = from; from.svg ? renderLogoSvg(box, from.svg) : renderLogoImg(box, from.img); } else loadLogo(box, o.logo || '').catch(() => loadLogo(box, ''));
    const delay = o.delay ?? 250, min = o.min ?? 1000; let shownAt = 0, done = false;
    const tShow = setTimeout(() => { shownAt = Date.now(); ov.dataset.on = 'true'; sr.textContent = o.text || 'Carregando'; replayLogo(box); }, delay);
    const keyHide = e => { if (e.key === 'Escape' && o.dismissible) hide(); };
    if (o.dismissible) { document.addEventListener('keydown', keyHide); ov.addEventListener('click', () => hide()); }
    function hide() {
      if (done) return; done = true; clearTimeout(tShow); document.removeEventListener('keydown', keyHide);
      if (!shownAt) { ov.remove(); return; }
      setTimeout(() => { ov.dataset.on = 'false'; setTimeout(() => ov.remove(), 240); }, Math.max(0, min - (Date.now() - shownAt)));
    }
    if (o.duration) setTimeout(hide, o.duration);
    return hide;
  }

  /* ======================= Componentes de 27/10/2026 ======================= */

  /* Alterações não salvas: compara os campos com o retrato inicial do
     formulário; quando muda, mostra a barra de salvar e avisa ao sair da página. Voltar ao valor original some com ela. */
  const fieldVal = f => f.type === 'file' ? 'file:' + [...(f.files || [])].map(x => x.name + ':' + x.size).join('|')
    : (f.type === 'checkbox' || f.type === 'radio') ? f.value + ':' + (f.checked ? 1 : 0)
    : f.tagName === 'SELECT' && f.multiple ? [...f.selectedOptions].map(o => o.value).join('|') : f.value;
  const snapshot = form => [...form.elements].filter(f => f.name && !['submit', 'button', 'reset', 'image'].includes(f.type)).map(f => f.name + '=' + fieldVal(f)).join('\u0001');
  const dirtyBars = form => [...form.querySelectorAll('[data-dirty-show]'), ...(form.id ? document.querySelectorAll(`[data-dirty-show][data-dirty-for="${CSS.escape(form.id)}"]`) : [])];
  function setDirty(form, on) {
    const was = form.classList.contains('is-dirty');
    form.classList.toggle('is-dirty', on);
    dirtyBars(form).forEach(b => { b.classList.toggle('is-on', on); b.setAttribute('aria-hidden', !on); if (on && !was) b.querySelector('.ac-savebar__hint')?.setAttribute('role', 'status'); });
    if (on !== was) form.dispatchEvent(new CustomEvent('ac:dirty', { detail: on, bubbles: true }));
  }
  const dirtyBaseline = form => { form._base = snapshot(form); setDirty(form, false); };
  const dirtyRefresh = form => form._base !== undefined && setDirty(form, snapshot(form) !== form._base);
  C.dirty = form => {
    dirtyBaseline(form);
    let tm = 0; const sched = () => { clearTimeout(tm); tm = setTimeout(() => dirtyRefresh(form), 16); }; // setTimeout e não rAF: rAF pausa em aba de fundo
    ['input', 'change', 'paste', 'cut'].forEach(ev => form.addEventListener(ev, sched));
    form.addEventListener('reset', () => setTimeout(() => dirtyRefresh(form)));
    new MutationObserver(sched).observe(form, { childList: true, subtree: true });
    if (form.dataset.warn !== 'false') addEventListener('beforeunload', e => { if (form.isConnected && form.classList.contains('is-dirty')) { e.preventDefault(); e.returnValue = ''; } });
  };

  /* Campo de dinheiro: digita como em caixa eletrônico (os centavos entram pela direita),
     os números rolam como num contador e a dica valida mínimo, máximo e taxa. O valor em centavos vai no input oculto. */
  const brl = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtBRL = c => 'R$ ' + brl.format(c / 100);
  const MONEY_DIGITS = 11;
  function moneyCells(cents) {
    const parts = brl.formatToParts(cents / 100); let ints = 0, seen = 0, frac = 0, marks = 0; const cells = [];
    parts.forEach(p => { if (p.type === 'integer') ints += p.value.length; });
    parts.forEach(p => {
      if (p.type === 'integer') [...p.value].forEach(g => { cells.push({ key: 'd' + (ints - 1 - seen), digit: +g }); seen++; });
      else if (p.type === 'fraction') [...p.value].forEach(g => { frac++; cells.push({ key: 'f' + frac, digit: +g }); });
      else if (p.type === 'group') cells.push({ key: 'g' + (ints - 1 - seen), text: p.value });
      else { marks++; cells.push({ key: p.type + marks, text: p.value }); }
    });
    return cells;
  }
  function moneyPiece(cell) {
    const el = document.createElement('span'); el.dataset.cell = cell.key;
    if (cell.text !== undefined) { el.className = 'ac-money__mark'; el.textContent = cell.text; return el; }
    el.className = 'ac-money__slot'; el.dataset.digit = cell.digit;
    const win = document.createElement('span'), strip = document.createElement('span');
    win.className = 'ac-money__window'; strip.className = 'ac-money__strip'; strip.style.setProperty('--at', 10 + cell.digit);
    for (let i = 0; i < 30; i++) { const c = document.createElement('span'); c.className = 'ac-money__cell'; c.textContent = i % 10; strip.appendChild(c); }
    win.appendChild(strip); el.appendChild(win); return el;
  }
  C.money = root => {
    const d = root.dataset, uid = id('money'), toC = v => v === undefined || v === '' ? null : Math.round(parseFloat(String(v).replace(',', '.')) * 100);
    const min = toC(d.min), max = toC(d.max), fee = toC(d.fee);
    root.classList.add('ac-money');
    root.innerHTML = `<label class="ac-money__label" for="${uid}">${esc(d.label || 'Valor')}</label>
      <div class="ac-money__stage"><input id="${uid}" class="ac-money__field" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" aria-describedby="${uid}-h">
        <span class="ac-money__value" aria-hidden="true"><span class="ac-money__placeholder"><span class="ac-money__affix">R$</span>0,00</span><span class="ac-money__display"><span class="ac-money__row"><span class="ac-money__affix">R$</span></span></span><span class="ac-money__caret"></span></span></div>
      <p class="ac-money__hint" id="${uid}-h" aria-live="polite"></p>
      ${max ? `<button type="button" class="ac-money__max">${esc(d.maxLabel || 'Usar valor máximo')}</button>` : ''}
      ${d.name ? `<input type="hidden" name="${esc(d.name)}">` : ''}`;
    const st = { cents: 0, filled: false, rendered: false, input: $('.ac-money__field', root), display: $('.ac-money__display', root), row: $('.ac-money__row', root), hint: $('.ac-money__hint', root), hidden: d.name ? $('input[type=hidden]', root) : null };
    const roll = 520, settle = 240, ease = 'cubic-bezier(.32,.72,0,1)';
    const render = cents => {
      const still = reduce() || !st.rendered, dir = cents >= st.cents ? 1 : -1, seats = new Map(), existing = new Map();
      $$('[data-cell]', st.row).forEach(el => { seats.set(el.dataset.cell, el.offsetLeft); existing.set(el.dataset.cell, el); });
      const cells = moneyCells(cents), keep = new Set(cells.map(c => c.key)); let arriving = 0;
      existing.forEach((el, k) => {
        if (keep.has(k)) return;
        if (still) { el.remove(); return; }
        el.removeAttribute('data-cell'); el.setAttribute('data-leaving', ''); el.style.left = (seats.get(k) || 0) + 'px';
        setTimeout(() => el.remove(), settle + 20);
      });
      cells.forEach(cell => {
        let el = existing.get(cell.key); const fresh = !el;
        if (fresh) { el = moneyPiece(cell); if (!still) { el.style.setProperty('--wait', Math.min(arriving++, 4) * 18 + 'ms'); el.setAttribute('data-arriving', ''); el.addEventListener('animationend', () => el.removeAttribute('data-arriving'), { once: true }); } }
        st.row.appendChild(el);
        if (fresh || cell.digit === undefined) return;
        const before = +el.dataset.digit; el.dataset.digit = cell.digit;
        const strip = $('.ac-money__strip', el); strip.style.setProperty('--at', 10 + cell.digit);
        if (still || before === cell.digit) return;
        const steps = dir * ((((cell.digit - before) * dir) % 10) + 10) % 10, h = strip.firstElementChild.getBoundingClientRect().height;
        if (!steps || !h) return;
        const from = (10 + before) * h;
        strip.animate([{ transform: `translateY(${-from}px)` }, { transform: `translateY(${-(from + steps * h)}px)` }], { duration: roll, easing: ease });
        el.animate([{ filter: 'blur(0)' }, { filter: `blur(${(Math.min(1, Math.abs(steps) / 4) * .09).toFixed(3)}em)`, offset: .15 }, { filter: 'blur(0)', offset: .62 }, { filter: 'blur(0)' }], { duration: roll });
      });
      $$('[data-leaving]', st.row).forEach(el => st.row.appendChild(el));
      if (!still) $$('[data-cell]', st.row).forEach(el => { const was = seats.get(el.dataset.cell); if (was === undefined) return; const dx = was - el.offsetLeft; if (Math.abs(dx) >= 1) el.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], { duration: settle, easing: ease }); });
      st.rendered = true;
    };
    const validate = () => {
      let msg = '', bad = false; const c = st.cents;
      if (!st.filled || !c) msg = max !== null ? 'Disponível: ' + fmtBRL(max) : (min !== null ? 'Mínimo de ' + fmtBRL(min) : '');
      else if (max !== null && c > max) { bad = true; msg = 'Valor acima do disponível (' + fmtBRL(max) + ').'; }
      else if (min !== null && c < min) { bad = true; msg = 'O valor mínimo é ' + fmtBRL(min) + '.'; }
      else if (fee !== null) msg = 'Com a taxa, ' + fmtBRL(c + fee) + ' sairão do seu saldo.';
      st.valid = st.filled && c > 0 && !bad;
      root.classList.toggle('is-invalid', bad); st.input.setAttribute('aria-invalid', bad); st.hint.textContent = msg;
      const form = root.closest('form'); if (form && root.dataset.lockSubmit !== 'false') $$('button[type="submit"]', form).forEach(b => b.disabled = !st.valid);
      root.dispatchEvent(new CustomEvent('ac:change', { detail: { cents: c, valid: st.valid }, bubbles: true }));
    };
    const update = (cents, filled) => {
      cents = Math.max(0, Math.min(cents, 10 ** MONEY_DIGITS - 1));
      const was = root.classList.contains('is-filled'); root.classList.toggle('is-filled', filled);
      st.input.value = filled ? fmtBRL(cents) : '';
      if (st.hidden) st.hidden.value = filled ? (cents / 100).toFixed(2) : '';
      if (filled) { if (!was) st.rendered = false; render(cents); }
      st.cents = cents; st.filled = filled; validate();
    };
    st.input.addEventListener('beforeinput', e => {
      const t = e.inputType || '';
      if (t.startsWith('delete')) { e.preventDefault(); if (!st.filled) return; const c = t === 'deleteContentBackward' || t === 'deleteContentForward' ? Math.floor(st.cents / 10) : 0; update(c, c > 0); return; }
      if (t === 'insertText' || t === 'insertReplacementText') { e.preventDefault(); const dg = (e.data || '').replace(/\D/g, ''); if (!dg || (String(st.cents).length + dg.length > MONEY_DIGITS && st.cents > 0)) return; const c = +(String(st.cents) + dg); update(c, c > 0 || st.filled); return; }
      if (t === 'insertFromPaste' || t === 'insertFromDrop') { e.preventDefault(); const dg = ((e.dataTransfer ? e.dataTransfer.getData('text') : e.data) || '').replace(/\D/g, '').slice(0, MONEY_DIGITS); if (dg) update(+dg, true); }
    });
    st.input.addEventListener('input', () => { const dg = st.input.value.replace(/\D/g, '').slice(0, MONEY_DIGITS), c = +(dg || 0); if (st.input.value !== fmtBRL(c) || !dg) update(c, c > 0); });
    st.input.addEventListener('focus', () => { const n = st.input.value.length; st.input.setSelectionRange(n, n); });
    $('.ac-money__max', root)?.addEventListener('click', () => { update(max, true); st.input.focus(); });
    root._money = { set: v => update(Math.round(v * 100), v > 0), get: () => st.cents / 100 };
    const ini = toC(d.value); if (ini) update(ini, true); else validate();
  };

  /* Telefone com país: escolha do país com busca, máscara do país
     e os três valores separados em campos ocultos (número local, DDI e código do país). */
  const COUNTRIES = [
    ['BR', 'Brasil', '55', '(##) #####-####', [10, 11]], ['PT', 'Portugal', '351', '### ### ###', [9]], ['US', 'Estados Unidos', '1', '(###) ###-####', [10]],
    ['AR', 'Argentina', '54', '## ####-####', [10]], ['CL', 'Chile', '56', '# #### ####', [9]], ['CO', 'Colômbia', '57', '### ### ####', [10]],
    ['MX', 'México', '52', '## #### ####', [10]], ['UY', 'Uruguai', '598', '## ### ###', [8]], ['PY', 'Paraguai', '595', '### ### ###', [9]],
    ['PE', 'Peru', '51', '### ### ###', [9]], ['ES', 'Espanha', '34', '### ## ## ##', [9]], ['FR', 'França', '33', '# ## ## ## ##', [9]],
    ['IT', 'Itália', '39', '### ### ####', [9, 10]], ['DE', 'Alemanha', '49', '#### #######', [10, 11]], ['GB', 'Reino Unido', '44', '#### ######', [10]],
    ['CA', 'Canadá', '1', '(###) ###-####', [10]], ['JP', 'Japão', '81', '##-####-####', [10]], ['AO', 'Angola', '244', '### ### ###', [9]], ['MZ', 'Moçambique', '258', '## ### ####', [9]]
  ].map(([iso, nome, ddi, mask, lens]) => ({ iso, nome, ddi, mask, lens }));
  const applyMask = (dg, mask) => { let o = '', i = 0; for (const ch of mask) { if (i >= dg.length) break; o += ch === '#' ? dg[i++] : ch; } return o + (i < dg.length ? dg.slice(i) : ''); };
  C.phone = el => {
    const d = el.dataset, uid = id('tel'); let c = COUNTRIES.find(x => x.iso === (d.country || 'BR').toUpperCase()) || COUNTRIES[0];
    el.classList.add('ac-phone');
    el.innerHTML = `<button type="button" class="ac-phone__country" aria-haspopup="listbox" aria-expanded="false" aria-label="País"><span class="ac-phone__iso"></span><span class="ac-phone__ddi"></span>${icon('chevron')}</button>
      <input class="ac-phone__input" id="${esc(d.id || uid)}" type="tel" inputmode="tel" autocomplete="tel-national" ${d.required !== undefined ? 'required' : ''} aria-label="${esc(d.label || 'Telefone')}">
      ${d.name ? `<input type="hidden" name="${esc(d.name)}"><input type="hidden" name="${esc(d.name)}_ddi"><input type="hidden" name="${esc(d.name)}_pais">` : ''}`;
    const btn = $('.ac-phone__country', el), inp = $('.ac-phone__input', el), hid = $$('input[type=hidden]', el);
    const pop = document.createElement('div'); pop.className = 'ac-pop'; pop.hidden = true; pop.style.padding = '0';
    pop.innerHTML = `<div class="ac-command__input" style="padding:0 12px">${icon('search')}<input type="text" placeholder="Buscar país ou código" aria-label="Buscar país" style="height:40px"></div><ul class="ac-listbox" role="listbox" id="${uid}-lb" style="max-height:240px"></ul>`;
    document.body.appendChild(pop);
    const q = $('input', pop), lb = $('ul', pop); let act = 0, list = COUNTRIES;
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const sync = () => {
      const dg = inp.value.replace(/\D/g, '');
      if (hid.length) { hid[0].value = dg; hid[1].value = c.ddi; hid[2].value = c.iso.toLowerCase(); }
      const ok = !dg || c.lens.includes(dg.length);
      inp.setAttribute('aria-invalid', dg && !ok ? 'true' : 'false');
      el.dispatchEvent(new CustomEvent('ac:change', { detail: { numero: dg, ddi: c.ddi, pais: c.iso, completo: dg ? `+${c.ddi}${dg}` : '', valido: !!dg && ok }, bubbles: true }));
    };
    const paint = () => { $('.ac-phone__iso', el).textContent = c.iso; $('.ac-phone__ddi', el).textContent = '+' + c.ddi; inp.placeholder = c.mask.replace(/#/g, '0'); inp.value = applyMask(inp.value.replace(/\D/g, ''), c.mask); sync(); };
    const render = () => { const s = norm(q.value); list = COUNTRIES.filter(x => norm(x.nome + ' ' + x.iso + ' +' + x.ddi).includes(s)); act = Math.min(act, Math.max(0, list.length - 1)); lb.innerHTML = list.length ? list.map((x, i) => `<li class="ac-option" role="option" id="${uid}-${i}" data-i="${i}" aria-selected="${i === act}" data-checked="${x === c}"><span class="ac-phone__iso">${x.iso}</span>${esc(x.nome)}<small>+${x.ddi}</small></li>`).join('') : '<li class="ac-listbox__empty">Nenhum país encontrado.</li>'; q.setAttribute('aria-activedescendant', list.length ? `${uid}-${act}` : ''); reveal($(`#${uid}-${act}`, lb)); };
    const pick = i => { if (!list[i]) return; c = list[i]; paint(); closePop(pop); inp.focus(); };
    btn.addEventListener('click', () => { if (!pop.hidden) return closePop(pop); q.value = ''; act = Math.max(0, COUNTRIES.indexOf(c)); render(); openPop(pop, btn); q.focus(); });
    q.addEventListener('input', () => { act = 0; render(); });
    q.setAttribute('role', 'combobox'); q.setAttribute('aria-controls', lb.id); q.setAttribute('aria-expanded', 'true');
    q.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); act = (act + 1) % Math.max(1, list.length); render(); } else if (e.key === 'ArrowUp') { e.preventDefault(); act = (act - 1 + list.length) % Math.max(1, list.length); render(); } else if (e.key === 'Enter') { e.preventDefault(); pick(act); } });
    lb.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) pick(+li.dataset.i); });
    inp.addEventListener('input', () => { const pos = inp.selectionStart, before = inp.value.slice(0, pos).replace(/\D/g, '').length; inp.value = applyMask(inp.value.replace(/\D/g, '').slice(0, Math.max(...c.lens)), c.mask); let n = 0, p = 0; while (p < inp.value.length && n < before) { if (/\d/.test(inp.value[p])) n++; p++; } inp.setSelectionRange(p, p); sync(); });
    // colar "+55 11 91234-5678" escolhe o país pelo DDI
    inp.addEventListener('paste', e => { const t = (e.clipboardData || window.clipboardData).getData('text').trim(); if (!t.startsWith('+')) return; const dg = t.replace(/\D/g, ''); const m = COUNTRIES.filter(x => dg.startsWith(x.ddi)).sort((a, b) => b.ddi.length - a.ddi.length)[0]; if (!m) return; e.preventDefault(); c = m; inp.value = dg.slice(m.ddi.length); paint(); });
    if (d.value) inp.value = d.value;
    paint();
  };

  /* Abas que transbordam: com abas demais, a lista rola, as bordas esmaecem e aparecem
     setas; a aba escolhida sempre fica à vista. Entra sozinho em todo data-ac="tabs". */
  function tabsOverflow(el, list, selectedTab) {
    const FADE = 48, frame = document.createElement('div'); frame.className = 'ac-tabs__frame';
    list.before(frame); frame.appendChild(list);
    const mk = (side, label, d) => { const b = document.createElement('button'); b.type = 'button'; b.className = `ac-tabs__scroll ac-tabs__scroll--${side}`; b.tabIndex = -1; b.setAttribute('aria-hidden', 'true'); b.setAttribute('aria-label', label); b.innerHTML = icon(d); frame.appendChild(b); return b; };
    const start = mk('start', 'Rolar abas para a esquerda', 'left'), end = mk('end', 'Rolar abas para a direita', 'right');
    const smooth = () => reduce() ? 'auto' : 'smooth';
    const sync = () => { const m = Math.max(0, list.scrollWidth - list.clientWidth), l = Math.min(Math.max(0, list.scrollLeft), m); const s = l > 1, e = m - l > 1; list.toggleAttribute('data-overflow-start', s); list.toggleAttribute('data-overflow-end', e); start.setAttribute('aria-hidden', !s); end.setAttribute('aria-hidden', !e); };
    const step = () => Math.max(80, Math.floor(list.clientWidth * .7));
    start.onclick = () => list.scrollBy({ left: -step(), behavior: smooth() }); end.onclick = () => list.scrollBy({ left: step(), behavior: smooth() });
    const reveal = (tab, anim) => { const s = tab.offsetLeft - FADE, e = tab.offsetLeft + tab.offsetWidth + FADE - list.clientWidth; let t = list.scrollLeft; if (list.scrollLeft > s) t = s; else if (list.scrollLeft < e) t = e; if (t !== list.scrollLeft) { list.scrollTo({ left: Math.max(0, t), behavior: anim ? smooth() : 'auto' }); setTimeout(sync, 450); } };
    list.addEventListener('scroll', sync, { passive: true }); new ResizeObserver(sync).observe(list);
    el._revealTab = reveal; if (selectedTab) reveal(selectedTab, false); sync();
  }

  /* Tour de apresentação: destaca um elemento por vez com um recorte de luz, um balão
     com título, texto e “2 de 5”, e Voltar/Próximo/Pular. Alvo que não existe ou está escondido é pulado. */
  function tour(steps, o = {}) {
    if (o.id && o.once) { try { if (localStorage.getItem('orthos.tour.' + o.id) === 'done') return null; } catch (_) {} }
    const spot = document.createElement('div'); spot.className = 'ac ac-tour__spot'; spot.setAttribute('aria-hidden', 'true');
    const tip = document.createElement('div'); tip.className = 'ac ac-tour__tip'; tip.setAttribute('role', 'dialog'); tip.setAttribute('aria-modal', 'false'); tip.tabIndex = -1;
    const back = document.activeElement; document.body.append(spot, tip);
    const visible = s => { if (!s.target) return true; const t = typeof s.target === 'string' ? $(s.target) : s.target; return !!(t && t.getClientRects().length && getComputedStyle(t).visibility !== 'hidden'); };
    const list = steps.filter(visible); let i = 0;
    const tgt = s => s.target ? (typeof s.target === 'string' ? $(s.target) : s.target) : null;
    const place = () => {
      const s = list[i], t = tgt(s), pad = s.padding ?? 6, vw = innerWidth, vh = innerHeight;
      if (t) { const r = t.getBoundingClientRect(); Object.assign(spot.style, { left: r.left - pad + 'px', top: r.top - pad + 'px', width: r.width + pad * 2 + 'px', height: r.height + pad * 2 + 'px', opacity: 1 }); spot.classList.remove('is-center'); }
      else { Object.assign(spot.style, { left: vw / 2 + 'px', top: vh / 2 + 'px', width: '0px', height: '0px' }); spot.classList.add('is-center'); }
      const tw = tip.offsetWidth, th = tip.offsetHeight, gap = 14; let left, top, pos = t ? (s.position || 'bottom') : 'center';
      if (pos === 'center') { left = (vw - tw) / 2; top = (vh - th) / 2; }
      else {
        const r = t.getBoundingClientRect();
        if (pos === 'bottom' && r.bottom + gap + th > vh - 8) pos = 'top'; else if (pos === 'top' && r.top - gap - th < 8) pos = 'bottom';
        if (pos === 'right' && r.right + gap + tw > vw - 8) pos = 'left'; else if (pos === 'left' && r.left - gap - tw < 8) pos = 'right';
        if (pos === 'bottom') { top = r.bottom + gap; left = r.left + r.width / 2 - tw / 2; } else if (pos === 'top') { top = r.top - gap - th; left = r.left + r.width / 2 - tw / 2; }
        else if (pos === 'right') { left = r.right + gap; top = r.top + r.height / 2 - th / 2; } else { left = r.left - gap - tw; top = r.top + r.height / 2 - th / 2; }
      }
      tip.dataset.pos = pos; tip.style.left = Math.max(8, Math.min(left, vw - tw - 8)) + 'px'; tip.style.top = Math.max(8, Math.min(top, vh - th - 8)) + 'px';
    };
    const show = n => {
      i = Math.max(0, Math.min(n, list.length - 1)); const s = list[i], t = tgt(s), last = i === list.length - 1, tid = id('tour');
      tip.setAttribute('aria-labelledby', tid + 't'); tip.setAttribute('aria-describedby', tid + 'd');
      tip.innerHTML = `<div class="ac-tour__head"><span class="ac-tour__count">${i + 1} de ${list.length}</span><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-tour="skip" aria-label="Fechar o tour">${icon('x')}</button></div><h2 class="ac-tour__title" id="${tid}t">${esc(s.title)}</h2><p class="ac-tour__text" id="${tid}d">${esc(s.text || '')}</p><div class="ac-tour__foot"><span class="ac-tour__dots" aria-hidden="true">${list.map((_, k) => `<i${k === i ? ' class="on"' : ''}></i>`).join('')}</span>${i ? '<button class="ac-btn ac-btn--ghost ac-btn--sm" type="button" data-tour="prev">Voltar</button>' : `<button class="ac-btn ac-btn--ghost ac-btn--sm" type="button" data-tour="skip">${esc(o.skipLabel || 'Pular')}</button>`}<button class="ac-btn ac-btn--sm" type="button" data-tour="next">${last ? esc(o.doneLabel || 'Concluir') : 'Próximo'}</button></div>`;
      if (t) reveal(t, 'center', true);
      place(); setTimeout(place, 350); $('[data-tour="next"]', tip).focus();
      o.onStep && o.onStep(i, s);
    };
    const close = done => {
      spot.remove(); tip.remove(); removeEventListener('resize', place); removeEventListener('scroll', place, true); document.removeEventListener('keydown', keys, true);
      if (done && o.id) { try { localStorage.setItem('orthos.tour.' + o.id, 'done'); } catch (_) {} }
      back && back.focus && back.focus(); o.onClose && o.onClose(!!done);
    };
    function keys(e) { if (!tip.isConnected) return; const typing = e.target && e.target.matches && e.target.matches('input, textarea, select, [contenteditable]'); if (e.key === 'Escape') { e.preventDefault(); close(false); } else if (e.key === 'ArrowRight' && !typing) { e.preventDefault(); i < list.length - 1 ? show(i + 1) : close(true); } else if (e.key === 'ArrowLeft' && !typing) { e.preventDefault(); show(i - 1); } }
    tip.addEventListener('click', e => { const b = e.target.closest('[data-tour]'); if (!b) return; const a = b.dataset.tour; if (a === 'next') i < list.length - 1 ? show(i + 1) : close(true); else if (a === 'prev') show(i - 1); else close(false); });
    spot.addEventListener('click', () => close(false));
    addEventListener('resize', place); addEventListener('scroll', place, true); document.addEventListener('keydown', keys, true);
    if (!list.length) { close(false); return null; }
    show(0);
    return { next: () => show(i + 1), prev: () => show(i - 1), go: show, close: () => close(false) };
  }

  /* Sidebar redimensionável: arraste a borda; abaixo de 180 px ela recolhe; duplo clique
     volta ao padrão; setas no teclado (Shift anda mais). A largura fica salva neste navegador. */
  function sidebarResize(el, handle) {
    const DEF = +el.dataset.width || 240, MIN = 200, MAX = 420, COLLAPSE = 180, KEY = 'orthos.sidebar.' + (el.id || 'w');
    const clamp = v => Math.min(MAX, Math.max(MIN, v));
    let cur = DEF; // largura atual guardada: ler do layout no meio da transição daria o valor antigo
    const apply = (px, save) => { cur = px; el.style.setProperty('--w', px + 'px'); handle.setAttribute('aria-valuenow', Math.round(px)); if (save) { try { localStorage.setItem(KEY, Math.round(px)); } catch (_) {} } };
    const collapsed = () => el.dataset.collapsed === 'true';
    const setCollapsed = on => { el.dataset.collapsed = on; const t = $('[data-ac-toggle]', el); if (t) { t.setAttribute('aria-expanded', !on); t.setAttribute('aria-label', on ? 'Expandir menu' : 'Recolher menu'); } };
    handle.setAttribute('role', 'separator'); handle.setAttribute('aria-orientation', 'vertical'); handle.setAttribute('aria-label', 'Largura do menu'); handle.tabIndex = 0;
    handle.setAttribute('aria-valuemin', MIN); handle.setAttribute('aria-valuemax', MAX);
    let saved = null; try { saved = parseInt(localStorage.getItem(KEY), 10); } catch (_) {}
    apply(isNaN(saved) || saved === null ? DEF : clamp(saved));
    let x0 = 0, w0 = 0, drag = false;
    handle.addEventListener('pointerdown', e => { if (e.button !== 0) return; if (collapsed()) setCollapsed(false); drag = true; x0 = e.clientX; w0 = el.getBoundingClientRect().width; handle.setPointerCapture(e.pointerId); el.classList.add('is-resizing'); e.preventDefault(); });
    handle.addEventListener('pointermove', e => { if (!drag) return; const w = w0 + e.clientX - x0; if (w < COLLAPSE) { drag = false; el.classList.remove('is-resizing'); setCollapsed(true); return; } apply(clamp(w)); });
    const end = () => { if (!drag) return; drag = false; el.classList.remove('is-resizing'); apply(cur, true); };
    handle.addEventListener('pointerup', end); handle.addEventListener('pointercancel', end);
    handle.addEventListener('dblclick', () => { setCollapsed(false); apply(DEF, true); });
    handle.addEventListener('keydown', e => {
      const s = e.shiftKey ? 32 : 8, w = collapsed() ? COLLAPSE : cur;
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (w - s < COLLAPSE) { setCollapsed(true); return; } apply(clamp(w - s), true); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); if (collapsed()) { setCollapsed(false); return; } apply(clamp(w + s), true); }
      else if (e.key === 'Home') { e.preventDefault(); apply(MIN, true); } else if (e.key === 'End') { e.preventDefault(); apply(MAX, true); }
    });
  }

  /* ======================= Pesquisa de 28/10/2026 ======================= */

  ICONS.copy = '<path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"/><path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"/>';
  ICONS.eye = '<path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"/><path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z"/>';
  ICONS['eye-off'] = '<path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526"/><path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421"/><path d="M3 3L21 21"/>';
  ICONS.pause = '<path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z"/><path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z"/>';
  ICONS.play = '<path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"/>';
  ICONS.send = '<path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"/><path d="M11.5 12.5L15 9"/>';
  ICONS.clock = '<circle cx="12" cy="12" r="10"/><path d="M12 8V12L14 14"/>';

  /* Carrossel: trilha com
     scroll-snap; setas, bolinhas e pausa numa cápsula; slide fora da vista fica inerte (o Tab não cai nele). O ativo é o
     mais perto do começo da rolagem (o último, quando a rolagem chega ao fim). data-autoplay="12000" troca sozinho e
     para no hover, no foco e no botão Pausar, que vale mais que o hover. Com movimento reduzido não há troca sozinha. */
  C.carousel = el => {
    const track = $('.ac-carousel__track', el); if (!track) return;
    const slides = [...track.children], n = slides.length;
    if (!el.hasAttribute('role')) el.setAttribute('role', 'region');
    el.setAttribute('aria-roledescription', 'carrossel');
    if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) el.setAttribute('aria-label', 'Carrossel');
    track.id = track.id || id('car');
    slides.forEach((s, i) => { s.classList.add('ac-carousel__slide'); s.setAttribute('role', 'group'); s.setAttribute('aria-roledescription', 'slide'); s.setAttribute('aria-label', `${i + 1} de ${n}`); });
    if (n < 2) return;
    const auto = +el.dataset.autoplay || 0, can = auto > 0 && !reduce();
    const bar = document.createElement('div'); bar.className = 'ac-carousel__controls';
    bar.innerHTML = `${can ? `<button type="button" class="ac-carousel__btn" data-car="pause" aria-controls="${track.id}">${icon('pause')}${icon('play')}</button>` : ''}<button type="button" class="ac-carousel__btn" data-car="-1" aria-controls="${track.id}" aria-label="Slide anterior">${icon('left')}</button><div class="ac-carousel__dots" role="group" aria-label="Escolher slide">${slides.map((_, i) => `<button type="button" class="ac-carousel__dot" data-i="${i}" aria-controls="${track.id}" aria-label="Slide ${i + 1} de ${n}" tabindex="-1"></button>`).join('')}</div><button type="button" class="ac-carousel__btn" data-car="1" aria-controls="${track.id}" aria-label="Próximo slide">${icon('right')}</button>`;
    el.appendChild(bar);
    // data-thumbs: miniaturas das fotos no lugar das bolinhas; data-lightbox: clicar na foto amplia
    const pics = slides.map(s => $('img', s)), thumbs = [];
    if (el.hasAttribute('data-thumbs') && pics.every(Boolean)) {
      const row = document.createElement('div'); row.className = 'ac-carousel__thumbs'; row.setAttribute('role', 'group'); row.setAttribute('aria-label', 'Escolher imagem');
      pics.forEach((p, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'ac-carousel__thumb'; b.dataset.i = i; b.setAttribute('aria-controls', track.id); b.setAttribute('aria-label', `Imagem ${i + 1} de ${n}${p.alt ? ': ' + p.alt : ''}`); b.innerHTML = `<img src="${esc(p.getAttribute('src'))}" alt="" loading="lazy">`; row.appendChild(b); thumbs.push(b); });
      row.addEventListener('click', e => { const b = e.target.closest('.ac-carousel__thumb'); if (b) go(+b.dataset.i); });
      el.insertBefore(row, bar);
    }
    if (el.hasAttribute('data-lightbox') && pics.every(Boolean)) { const data = slides.map(imageData); pics.forEach((p, i) => p.addEventListener('click', () => lightbox(data, i, p))); }
    const dots = $$('.ac-carousel__dot', bar), pause = $('[data-car="pause"]', bar);
    const left = s => s.offsetLeft - (parseFloat(getComputedStyle(track).paddingLeft) || 0);
    const active = () => { const max = track.scrollWidth - track.clientWidth; if (max > 0 && track.scrollLeft >= max - 2) return n - 1; let b = 0, d = Infinity; slides.forEach((s, i) => { const x = Math.abs(left(s) - track.scrollLeft); if (x < d) { d = x; b = i; } }); return b; };
    let cur = -1, raf = 0, want = null, wantT = 0;
    const sync = () => {
      raf = 0; const i = active(), w = track.clientWidth, sl = track.scrollLeft;
      // inerte: o que mostra menos de 60% de si (o slide espiando ao lado não recebe foco)
      slides.forEach((s, k) => { const a = s.offsetLeft - sl, vis = Math.min(w, a + s.offsetWidth) - Math.max(0, a); s.inert = k !== i && vis < s.offsetWidth * .6; });
      if (i === cur) return;
      const first = cur < 0; cur = i;
      dots.forEach((d, k) => { if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); d.tabIndex = k === i ? 0 : -1; });
      thumbs.forEach((b, k) => { if (k === i) { b.setAttribute('aria-current', 'true'); b.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } else b.removeAttribute('aria-current'); });
      if (!first) el.dispatchEvent(new CustomEvent('ac:change', { detail: { index: i, total: n }, bubbles: true }));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(sync); };
    const at = () => want ?? cur;
    const go = (i, focusDot) => { i = (i + n) % n; want = i; clearTimeout(wantT); wantT = setTimeout(() => { want = null; }, 700); track.scrollTo({ left: left(slides[i]), behavior: reduce() ? 'auto' : 'smooth' }); if (focusDot) dots[i].focus(); };
    let timer = 0, held = false, stopped = false; // held: hover ou foco dentro; stopped: botão Pausar
    const live = () => track.setAttribute('aria-live', can && !stopped && !held ? 'off' : 'polite');
    const arm = () => { clearTimeout(timer); live(); if (!can || held || stopped) return; timer = setTimeout(() => { if (!el.isConnected) return; if (!document.hidden) go(at() + 1); arm(); }, auto); };
    const hold = on => { held = on; arm(); };
    const setPause = on => { stopped = on; pause.dataset.paused = on; pause.setAttribute('aria-label', on ? 'Retomar a troca automática' : 'Pausar a troca automática'); arm(); };
    if (pause) {
      setPause(false);
      el.addEventListener('pointerenter', () => hold(true));
      el.addEventListener('pointerleave', () => hold(el.contains(document.activeElement)));
      el.addEventListener('focusin', () => hold(true));
      el.addEventListener('focusout', e => { if (!el.contains(e.relatedTarget)) hold(el.matches(':hover')); });
    }
    bar.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; if (b === pause) setPause(!stopped); else if (b.dataset.i) go(+b.dataset.i); else go(at() + +b.dataset.car); });
    // com o foco nos controles: ← → trocam de slide, Home e End vão às pontas; nas bolinhas o foco acompanha
    bar.addEventListener('keydown', e => { const k = { ArrowLeft: at() - 1, ArrowRight: at() + 1, Home: 0, End: n - 1 }[e.key]; if (k === undefined) return; e.preventDefault(); go(k, e.target.classList.contains('ac-carousel__dot')); });
    track.addEventListener('scroll', schedule, { passive: true });
    new ResizeObserver(schedule).observe(track);
    sync(); arm();
    el._carousel = { go: i => go(i), next: () => go(at() + 1), prev: () => go(at() - 1), pause: () => pause && setPause(true), play: () => pause && setPause(false) };
  };

  /* Tabela em cartões no celular (table/cell do zero-7): com display: block o Safari deixa de ler a tabela como tabela;
     os papéis ARIA devolvem cabeçalhos e células ao leitor de tela. data-ac="stack" põe a classe e os papéis. */
  function tableRoles(t) {
    if (!t) return;
    t.setAttribute('role', 'table');
    $$(':scope > thead, :scope > tbody, :scope > tfoot', t).forEach(g => g.setAttribute('role', 'rowgroup'));
    $$('tr', t).forEach(r => r.setAttribute('role', 'row'));
    $$('th', t).forEach(c => c.setAttribute('role', c.closest('thead') ? 'columnheader' : 'rowheader'));
    $$('td', t).forEach(c => c.setAttribute('role', 'cell'));
  }
  // sem .ac-table-wrap em volta, o pai vira o contêiner medido (ele precisa ter largura própria, como um bloco comum)
  C.stack = t => { t.classList.add('ac-table--stack'); if (!t.closest('.ac-table-wrap') && t.parentElement) t.parentElement.classList.add('ac-stack-host'); tableRoles(t); };

  /* Campo de senha: botão Mostrar/Esconder com aria-pressed; regras
     que se marcam enquanto a pessoa digita (escondidas com os campos vazios), anunciadas de uma vez depois de uma pausa;
     e a validade no próprio campo (setCustomValidity), que o data-ac="validate" já respeita ao enviar.
     data-secret: chave de API, longe do preenchimento automático e dos gerenciadores de senha. */
  const PW_RULES = {
    min: n => [`pelo menos ${n} caracteres`, v => v.length >= n],
    numero: () => ['um número', v => /\d/.test(v)],
    maiuscula: () => ['uma letra maiúscula', v => /\p{Lu}/u.test(v)],
    minuscula: () => ['uma letra minúscula', v => /\p{Ll}/u.test(v)],
    especial: () => ['um caractere especial (! @ # $ …)', v => /[^\p{L}\p{N}\s]/u.test(v)]
  };
  const listPt = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1];
  C.password = el => {
    const inp = $('input', el); if (!inp) return;
    el.classList.add('ac-password');
    const secret = el.hasAttribute('data-secret'), what = secret ? 'chave' : 'senha';
    if (secret) { inp.autocomplete = 'new-password'; inp.spellcheck = false; inp.setAttribute('autocapitalize', 'off'); inp.setAttribute('autocorrect', 'off'); inp.setAttribute('data-1p-ignore', 'true'); inp.setAttribute('data-lpignore', 'true'); }
    // o nome acessível fica fixo e o estado vai em aria-pressed; a dica visível troca entre Mostrar e Esconder
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ac-password__toggle';
    btn.setAttribute('aria-label', `Mostrar ${what}`); btn.setAttribute('aria-pressed', 'false'); btn.dataset.tip = 'Mostrar';
    if (inp.id) btn.setAttribute('aria-controls', inp.id);
    btn.innerHTML = icon('eye') + icon('eye-off'); inp.after(btn);
    const reveal = on => { inp.type = on ? 'text' : 'password'; btn.setAttribute('aria-pressed', on); btn.dataset.tip = on ? 'Esconder' : 'Mostrar'; const t = document.getElementById('ac-tip'); if (t && btn.getAttribute('aria-describedby') === 'ac-tip') t.textContent = btn.dataset.tip; };
    btn.addEventListener('click', () => reveal(inp.type === 'password'));
    // enviado de verdade, volta a esconder: o gerenciador de senhas reconhece o campo e nada fica à mostra
    if (inp.form) inp.form.addEventListener('submit', e => { if (!e.defaultPrevented) reveal(false); });
    const rules = (el.dataset.rules || '').split(',').map(s => s.trim().split(':')).filter(([k]) => PW_RULES[k]).map(([k, a]) => { const [t, test] = PW_RULES[k](+a || 8); return { t, test }; });
    const cf = el.dataset.confirm ? $(el.dataset.confirm) : null, conf = cf && (cf.matches('input') ? cf : $('input', cf));
    if (!rules.length && !conf) return;
    if (conf) rules.push({ t: 'as senhas conferem', test: v => !!conf.value && v === conf.value, match: true });
    const ul = document.createElement('ul'); ul.className = 'ac-password__rules'; ul.id = id('pwr'); ul.setAttribute('aria-label', `Requisitos da ${what}`); ul.hidden = true;
    ul.innerHTML = rules.map(r => `<li data-ok="false">${icon('check', 'ac-icon ac-password__ok')}${icon('alert', 'ac-icon ac-password__no')}<span>${esc(r.t[0].toUpperCase() + r.t.slice(1))}</span><span class="ac-sr"></span></li>`).join('');
    const live = document.createElement('p'); live.className = 'ac-sr'; live.setAttribute('aria-live', 'polite');
    el.after(ul, live);
    inp.setAttribute('aria-describedby', [...(inp.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean), ul.id].join(' '));
    let said = '', t = 0;
    const update = quiet => {
      const v = inp.value, ok = rules.map(r => r.test(v)), miss = rules.filter((r, k) => !ok[k] && !r.match).map(r => r.t);
      $$('li', ul).forEach((li, k) => { li.dataset.ok = ok[k]; li.lastChild.textContent = ok[k] ? ' (atendido)' : ' (falta)'; });
      ul.hidden = !v && !(conf && conf.value);
      inp.setCustomValidity(v && miss.length ? `A ${what} precisa de ${listPt(miss)}.` : '');
      if (conf) conf.setCustomValidity(conf.value && conf.value !== v ? 'As senhas não conferem.' : '');
      // um anúncio só, depois que a pessoa para de digitar (e não um por tecla)
      clearTimeout(t); if (quiet) return;
      t = setTimeout(() => {
        if (ul.hidden) { said = ''; return; }
        const m = miss.length ? `Falta${miss.length > 1 ? 'm' : ''}: ${listPt(miss)}.` : conf && !ok[ok.length - 1] ? (conf.value ? 'As senhas ainda não conferem.' : 'Requisitos atendidos. Agora confirme a senha.') : 'Todos os requisitos atendidos.';
        if (m !== said) live.textContent = said = m;
      }, 400);
    };
    // na captura, antes do data-ac="validate", que lê a validade no mesmo evento
    ['input', 'change'].forEach(ev => {
      el.addEventListener(ev, () => update(), true);
      if (conf && conf.parentElement) conf.parentElement.addEventListener(ev, e => { if (e.target === conf) update(); }, true);
    });
    update(true);
  };

  /* Conversa: balões enviados e recebidos; tocar no balão mostra a hora; botão
     “Ir para a mensagem mais nova” quando a lista está a mais de 120 px do fim; campo de escrever (Ctrl/⌘+Enter envia).
     O envio só emite ac:send com o texto: quem usa decide como a mensagem entra na lista (que desce sozinha). */
  C.chat = el => {
    const log = $('.ac-chat__log', el); if (!log) return;
    log.setAttribute('role', 'log'); log.setAttribute('aria-live', 'polite'); if (!log.hasAttribute('tabindex')) log.tabIndex = 0;
    if (!log.getAttribute('aria-label')) log.setAttribute('aria-label', 'Mensagens');
    const view = document.createElement('div'); view.className = 'ac-chat__view'; log.before(view);
    const down = document.createElement('button'); down.type = 'button'; down.className = 'ac-chat__down'; down.setAttribute('aria-label', 'Ir para a mensagem mais nova'); down.innerHTML = icon('chevron');
    view.append(log, down);
    // atEnd: perto do fim (até 120 px), some o botão; stuck: no fim mesmo, e a lista acompanha o que cresce lá embaixo.
    // stuck só muda pela rolagem (subir solta, chegar ao fim prende): conteúdo crescendo não solta.
    let atEnd = true, stuck = true, top = 0, raf = 0, pin = false, pinT = 0;
    const gap = () => log.scrollHeight - log.scrollTop - log.clientHeight;
    const sync = () => { raf = 0; atEnd = gap() <= 120; down.classList.toggle('is-on', !atEnd); };
    const end = smooth => log.scrollTo({ top: log.scrollHeight, behavior: smooth && !reduce() ? 'smooth' : 'auto' });
    log.addEventListener('scroll', () => { const t = log.scrollTop; if (gap() < 4) stuck = true; else if (t < top - 1) stuck = false; top = t; if (!raf) raf = requestAnimationFrame(sync); }, { passive: true });
    // a lista mudou de tamanho, ou um balão cresceu (hora aberta, imagem carregada): quem estava no fim continua no fim
    const ro = new ResizeObserver(en => { if (en.some(x => x.target === log) ? atEnd : stuck) end(); sync(); });
    ro.observe(log);
    const deco = m => {
      if (m.dataset.author && !$('.ac-msg__who', m)) m.insertAdjacentHTML('afterbegin', `<span class="ac-sr ac-msg__who">${esc(m.dataset.author)}: </span>`);
      if (m.dataset.time && !$('.ac-msg__time', m)) m.insertAdjacentHTML('beforeend', `<div class="ac-msg__time"><div><time>${esc(m.dataset.time)}</time></div></div>`);
      ro.observe(m);
    };
    $$('.ac-msg', log).forEach(deco);
    // mensagem nova: desce junto só se a pessoa já estava no fim (ou acabou de enviar); senão, o botão aparece
    new MutationObserver(ms => { ms.forEach(m => m.addedNodes.forEach(x => { if (x.nodeType === 1) (x.matches('.ac-msg') ? [x] : $$('.ac-msg', x)).forEach(deco); })); if (atEnd || pin) end(); pin = false; sync(); }).observe(log, { childList: true });
    log.addEventListener('click', e => {
      const r = e.target.closest('.ac-msg__retry'); if (r) { el.dispatchEvent(new CustomEvent('ac:retry', { detail: { message: r.closest('.ac-msg') }, bubbles: true })); return; }
      const m = e.target.closest('.ac-msg');
      if (!m || !$('.ac-msg__time', m) || e.target.closest('a, button, input, textarea, select, [role="button"]') || String(getSelection() || '')) return;
      m.toggleAttribute('data-open');
    });
    down.addEventListener('click', () => { end(true); log.focus({ preventScroll: true }); });
    const form = $('.ac-chat__composer', el), ta = form && $('textarea', form);
    if (ta) {
      ta.setAttribute('aria-keyshortcuts', 'Control+Enter Meta+Enter');
      const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'; };
      const send = () => {
        const text = ta.value.trim(); if (!text) { ta.focus(); return; }
        pin = true; clearTimeout(pinT); pinT = setTimeout(() => { pin = false; }, 1000);
        if (el.dispatchEvent(new CustomEvent('ac:send', { detail: { text }, bubbles: true, cancelable: true }))) { ta.value = ''; fit(); }
        ta.focus();
      };
      ta.addEventListener('input', fit);
      ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); send(); } });
      form.addEventListener('submit', e => { e.preventDefault(); send(); });
    }
    end(); sync();
  };

  /* ---------- Imagens: lightbox, galeria e coverflow ---------- */
  // dados de uma imagem a partir do elemento: href (ou data-full) é a versão grande; data-caption ou <figcaption> é a legenda
  const imageData = c => { const img = c.matches('img') ? c : $('img', c); return { src: c.getAttribute('href') || c.dataset.full || img.dataset.full || img.getAttribute('src'), thumb: img.getAttribute('src'), alt: img.alt || '', caption: c.dataset.caption || img.dataset.caption || $('figcaption', c)?.textContent.trim() || '' }; };

  /* Lightbox: a imagem grande por cima de tudo, com setas, miniaturas, arrastar no celular, Home/End e Esc.
     items: [{ src, alt, caption, thumb }]. Ao fechar, o foco volta para quem abriu. */
  function lightbox(items, start = 0, opener = document.activeElement) {
    const n = items.length; if (!n) return;
    let cur = -1, x0 = null;
    const dlg = document.createElement('dialog'); dlg.className = 'ac ac-lightbox'; dlg.setAttribute('aria-label', 'Visualizador de imagens');
    const nav = (d, label) => n > 1 ? `<button type="button" class="ac-lightbox__btn" data-lb="${d}" aria-label="${label}">${icon(d < 0 ? 'left' : 'right')}</button>` : '';
    dlg.innerHTML = `<div class="ac-lightbox__top"><span class="ac-lightbox__count" aria-live="polite"></span><button type="button" class="ac-lightbox__btn" data-lb="close" aria-label="Fechar">${icon('x')}</button></div>`
      + `<div class="ac-lightbox__stage">${nav(-1, 'Imagem anterior')}<figure class="ac-lightbox__figure"><img class="ac-lightbox__img" alt=""><figcaption class="ac-lightbox__cap"></figcaption></figure>${nav(1, 'Próxima imagem')}</div>`
      + (n > 1 ? `<div class="ac-lightbox__thumbs">${items.map((it, i) => `<button type="button" class="ac-lightbox__thumb" data-i="${i}" aria-label="Imagem ${i + 1} de ${n}${it.alt ? ': ' + esc(it.alt) : ''}"><img src="${esc(it.thumb || it.src)}" alt="" loading="lazy"></button>`).join('')}</div>` : '');
    document.body.appendChild(dlg);
    const img = $('.ac-lightbox__img', dlg), cap = $('.ac-lightbox__cap', dlg), count = $('.ac-lightbox__count', dlg), thumbs = $$('.ac-lightbox__thumb', dlg);
    const show = (i, dir = 0) => {
      i = (i + n) % n; if (i === cur) return; cur = i; const it = items[i];
      img.classList.remove('is-in'); img.style.setProperty('--dir', dir); void img.offsetWidth;
      img.src = it.src; img.alt = it.alt; img.classList.add('is-in');
      cap.textContent = it.caption; cap.hidden = !it.caption;
      count.textContent = `${i + 1} de ${n}`;
      thumbs.forEach((t, k) => { if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current'); });
      thumbs[i]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce() ? 'auto' : 'smooth' });
      if (n > 1) [1, -1].forEach(d => { new Image().src = items[(i + d + n) % n].src; }); // a vizinha já chega carregada
      dlg.dispatchEvent(new CustomEvent('ac:change', { detail: { index: i, total: n }, bubbles: true }));
    };
    dlg.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (b) { if (b.dataset.lb === 'close') close(dlg); else if (b.dataset.lb) show(cur + +b.dataset.lb, +b.dataset.lb); else show(+b.dataset.i, Math.sign(+b.dataset.i - cur)); return; }
      if (e.target.matches('.ac-lightbox__stage, .ac-lightbox__figure')) close(dlg); // clique fora da imagem fecha
    });
    dlg.addEventListener('keydown', e => {
      if (n < 2) return;
      const to = { ArrowLeft: cur - 1, ArrowRight: cur + 1, Home: 0, End: n - 1 }[e.key];
      if (to === undefined) return; e.preventDefault(); show(to, Math.sign(to - cur) || (e.key === 'ArrowLeft' ? -1 : 1));
    });
    const stage = $('.ac-lightbox__stage', dlg);
    stage.addEventListener('pointerdown', e => { if (!e.target.closest('button')) x0 = e.clientX; });
    stage.addEventListener('pointerup', e => { if (x0 === null || n < 2) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 48) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); });
    dlg.addEventListener('cancel', e => { e.preventDefault(); close(dlg); });
    dlg.addEventListener('close', () => { dlg.remove(); if (opener && opener.isConnected && opener.focus) opener.focus(); });
    dlg.showModal(); show(Math.max(0, Math.min(n - 1, start)));
    return { show: i => show(i, Math.sign(i - cur)), close: () => close(dlg), el: dlg };
  }

  // galeria: cada filho com <img> abre o lightbox; <a href> é o fallback sem JS (abre a imagem grande)
  C.gallery = el => {
    el.classList.add('ac-gallery');
    const items = [...el.children].filter(c => c.matches('img') || $('img', c));
    const data = items.map(imageData);
    items.forEach((c, i) => {
      c.classList.add('ac-gallery__item'); c.setAttribute('aria-haspopup', 'dialog');
      if (!c.matches('a[href], button')) { c.tabIndex = 0; c.setAttribute('role', 'button'); c.setAttribute('aria-label', 'Ampliar: ' + data[i].alt); c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); } }); }
      c.addEventListener('click', e => { e.preventDefault(); lightbox(data, i, c); });
    });
  };

  /* Coverflow: a imagem do meio de frente e as vizinhas giradas em 3D para os lados. Setas, clique na vizinha,
     arrastar e ← → com o foco no palco. data-lightbox: clicar na imagem da frente amplia. */
  C.coverflow = el => {
    const figs = [...el.children].filter(c => c.matches('img') || $('img', c)), n = figs.length; if (!n) return;
    const data = figs.map(imageData);
    el.classList.add('ac-coverflow'); el.setAttribute('role', 'region'); el.setAttribute('aria-roledescription', 'carrossel');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Carrossel de imagens');
    const stage = document.createElement('div'); stage.className = 'ac-coverflow__stage'; stage.tabIndex = 0; stage.id = id('cf');
    stage.setAttribute('aria-label', 'Imagens; use as setas para trocar');
    figs.forEach((f, i) => { f.classList.add('ac-coverflow__item'); f.setAttribute('role', 'group'); f.setAttribute('aria-roledescription', 'slide'); f.setAttribute('aria-label', `${i + 1} de ${n}`); stage.appendChild(f); });
    const bar = document.createElement('div'); bar.className = 'ac-carousel__controls';
    bar.innerHTML = `<button type="button" class="ac-carousel__btn" data-cf="-1" aria-controls="${stage.id}" aria-label="Imagem anterior">${icon('left')}</button><span class="ac-coverflow__status" aria-live="polite"></span><button type="button" class="ac-carousel__btn" data-cf="1" aria-controls="${stage.id}" aria-label="Próxima imagem">${icon('right')}</button>`;
    el.append(stage, bar);
    const status = $('.ac-coverflow__status', bar), [prev, next] = $$('button', bar);
    let cur = Math.max(0, Math.min(n - 1, +el.dataset.start || Math.floor((n - 1) / 2)));
    const paint = () => {
      const w = figs[0].offsetWidth || 200;
      figs.forEach((f, i) => {
        const o = i - cur, a = Math.abs(o), s = Math.sign(o);
        const x = s * (a ? w * .62 + (a - 1) * w * .3 : 0), z = a ? -150 - (a - 1) * 70 : 0;
        f.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-s * 46}deg)`;
        f.style.zIndex = 100 - a; f.style.opacity = a > 3 ? 0 : 1; f.style.filter = a ? `brightness(${1 - Math.min(a, 3) * .12})` : '';
        f.style.pointerEvents = a > 3 ? 'none' : '';
        f.classList.toggle('is-active', !a); f.setAttribute('aria-hidden', a ? 'true' : 'false');
      });
      // aria-disabled em vez de disabled: o botão não perde o foco ao chegar na ponta
      status.textContent = `${cur + 1} de ${n}`; prev.setAttribute('aria-disabled', cur === 0); next.setAttribute('aria-disabled', cur === n - 1);
    };
    const go = i => { i = Math.max(0, Math.min(n - 1, i)); if (i === cur) return; cur = i; paint(); el.dispatchEvent(new CustomEvent('ac:change', { detail: { index: i, total: n }, bubbles: true })); };
    bar.addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (b) go(cur + +b.dataset.cf); });
    stage.addEventListener('keydown', e => { const to = { ArrowLeft: cur - 1, ArrowRight: cur + 1, Home: 0, End: n - 1 }[e.key]; if (to !== undefined) { e.preventDefault(); go(to); } else if ((e.key === 'Enter' || e.key === ' ') && el.hasAttribute('data-lightbox')) { e.preventDefault(); lightbox(data, cur, stage); } });
    let x0 = null, moved = false;
    stage.addEventListener('pointerdown', e => { x0 = e.clientX; moved = false; });
    stage.addEventListener('pointerup', e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) { moved = true; go(cur + (dx < 0 ? 1 : -1)); } });
    figs.forEach((f, i) => f.addEventListener('click', () => { if (moved) return; if (i !== cur) go(i); else if (el.hasAttribute('data-lightbox')) lightbox(data, i, stage); }));
    new ResizeObserver(paint).observe(stage);
    paint();
    el._coverflow = { go, next: () => go(cur + 1), prev: () => go(cur - 1) };
  };

  /* Banner com fotos: cada .ac-hero__slide tem a foto e o texto; troca sozinho a cada
     data-interval ms, com barrinhas de progresso que também levam ao slide, e pausa no botão, no hover e no foco.
     Com movimento reduzido começa pausado. A troca vem do fim da animação da barrinha: pausar congela tudo junto. */
  C.hero = el => {
    const slides = $$('.ac-hero__slide', el), n = slides.length; if (!n) return;
    el.classList.add('ac-hero'); el.setAttribute('role', 'region'); el.setAttribute('aria-roledescription', 'carrossel');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Destaques');
    el.style.setProperty('--t', (+el.dataset.interval || 6000) + 'ms');
    slides.forEach((s, i) => { s.setAttribute('role', 'group'); s.setAttribute('aria-roledescription', 'slide'); s.setAttribute('aria-label', `${i + 1} de ${n}`); });
    if (n < 2) { slides[0].classList.add('is-active'); return; }
    const bar = document.createElement('div'); bar.className = 'ac-hero__bar';
    bar.innerHTML = slides.map((_, i) => `<button type="button" class="ac-hero__seg" data-i="${i}" aria-label="Destaque ${i + 1} de ${n}"><span></span></button>`).join('')
      + `<button type="button" class="ac-hero__pause">${icon('pause')}${icon('play')}</button>`;
    el.appendChild(bar);
    const segs = $$('.ac-hero__seg', bar), btn = $('.ac-hero__pause', bar);
    let cur = -1, stopped = reduce(), held = false;
    const state = () => { const p = stopped || held; el.dataset.paused = p; btn.dataset.paused = stopped; btn.setAttribute('aria-label', stopped ? 'Retomar a troca automática' : 'Pausar a troca automática'); el.setAttribute('aria-live', p ? 'polite' : 'off'); };
    const show = i => {
      i = (i + n) % n; const first = cur < 0; cur = i;
      slides.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.inert = k !== i; s.setAttribute('aria-hidden', k !== i); });
      segs.forEach((b, k) => { b.classList.toggle('is-done', k < i); b.classList.remove('is-on'); if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      void segs[i].offsetWidth; segs[i].classList.add('is-on');
      if (!first) el.dispatchEvent(new CustomEvent('ac:change', { detail: { index: i, total: n }, bubbles: true }));
    };
    bar.addEventListener('animationend', e => { if (e.target.closest('.ac-hero__seg') === segs[cur] && el.isConnected) show(cur + 1); });
    bar.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; if (b === btn) { stopped = !stopped; state(); } else show(+b.dataset.i); });
    bar.addEventListener('keydown', e => { const to = { ArrowLeft: cur - 1, ArrowRight: cur + 1 }[e.key]; if (to !== undefined && e.target.classList.contains('ac-hero__seg')) { e.preventDefault(); show(to); segs[cur].focus(); } });
    el.addEventListener('pointerenter', () => { held = true; state(); });
    el.addEventListener('pointerleave', () => { held = el.contains(document.activeElement); state(); });
    el.addEventListener('focusin', () => { held = true; state(); });
    el.addEventListener('focusout', e => { if (!el.contains(e.relatedTarget)) { held = el.matches(':hover'); state(); } });
    state(); show(+el.dataset.start || 0);
    el._hero = { go: show, pause: () => { stopped = true; state(); }, play: () => { stopped = false; state(); } };
  };

  /* Número do cartão (Baymard): espaça em grupos enquanto digita, mostra a bandeira detectada e mantém o cursor no lugar.
     data-ac="card-number" num contêiner com o <input>; a bandeira vai em data-brand e no selo ao lado. */
  const CARD_BRANDS = [
    ['elo', /^(4011(78|79)|43(1274|8935)|45(1416|7393|763[12])|50(4175|6699|67[0-7]\d|9\d{3})|627780|63(6297|6368)|650(0[3-9]|[1-4]\d|5[0-1])|6516[5-7]\d|6550[0-5]\d)/, [4, 4, 4, 4]],
    ['hipercard', /^(606282|3841)/, [4, 4, 4, 4]],
    ['amex', /^3[47]/, [4, 6, 5]],
    ['visa', /^4/, [4, 4, 4, 4]],
    ['mastercard', /^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/, [4, 4, 4, 4]]
  ];
  const BRAND_NAMES = { elo: 'Elo', hipercard: 'Hipercard', amex: 'Amex', visa: 'Visa', mastercard: 'Mastercard' };
  C['card-number'] = el => {
    const inp = $('input', el); if (!inp) return;
    el.classList.add('ac-card-number');
    Object.assign(inp, { inputMode: 'numeric', autocomplete: inp.autocomplete || 'cc-number' }); inp.setAttribute('spellcheck', 'false');
    const tag = document.createElement('span'); tag.className = 'ac-card-number__brand'; tag.setAttribute('aria-live', 'polite'); el.appendChild(tag);
    const fmt = () => {
      const pos = inp.selectionStart ?? inp.value.length, before = inp.value.slice(0, pos).replace(/\D/g, '').length;
      const d = inp.value.replace(/\D/g, '').slice(0, 19), b = CARD_BRANDS.find(([, re]) => re.test(d));
      const groups = b ? b[2] : [4, 4, 4, 4, 3]; let out = '', i = 0;
      for (const g of groups) { if (i >= d.length) break; out += (out ? ' ' : '') + d.slice(i, i + g); i += g; }
      if (i < d.length) out += ' ' + d.slice(i);
      inp.value = out; tag.textContent = b ? BRAND_NAMES[b[0]] : ''; el.dataset.brand = b ? b[0] : '';
      // devolve o cursor depois do mesmo número de dígitos
      let k = 0, at = 0; while (at < out.length && k < before) { if (/\d/.test(out[at])) k++; at++; }
      if (document.activeElement === inp) inp.setSelectionRange(at, at);
    };
    inp.addEventListener('input', fmt); fmt();
  };

  /* ---------- Peças estudadas na Kobra (29/10/2026): vídeo, halftone e ícones que se transformam ---------- */
  // Hugeicons (stroke rounded)
  Object.assign(ICONS, { back10: '<path d="M12 5L10.8961 3.45459C10.4851 2.87911 10.2795 2.59137 10.4093 2.32411C10.5391 2.05684 10.8689 2.04153 11.5286 2.01092C11.6848 2.00367 11.842 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 8.72836 3.57111 5.82368 6 3.99927"/><path d="M7.99219 11.004C8.52019 10.584 9.00019 9.89143 9.30019 10.02C9.60019 10.1486 9.50419 10.572 9.50419 11.232C9.50419 11.892 9.50419 14.6847 9.50419 16.008"/><path d="M16.0022 12.6C16.0022 11.22 16.0682 10.848 15.8042 10.404C15.5402 9.96001 14.8802 9.99841 14.2202 9.99841C13.5602 9.99841 13.0802 9.96001 12.7622 10.32C12.3722 10.74 12.5402 11.52 12.4922 12.6C12.6002 14.04 12.3062 15.18 12.7562 15.66C13.0802 16.056 13.6553 15.996 14.3402 16.008C15.0201 15.9997 15.4322 16.032 15.7682 15.648C16.1402 15.312 15.9602 13.98 16.0022 12.6Z"/>', fwd10: '<path d="M12 5L13.1039 3.45459C13.5149 2.87911 13.7205 2.59137 13.5907 2.32411C13.4609 2.05684 13.1311 2.04153 12.4714 2.01092C12.3152 2.00367 12.158 2 12 2C6.4772 2 2 6.47715 2 12C2 17.5228 6.4772 22 12 22C17.5229 22 22 17.5228 22 12C22 8.72836 20.4289 5.82368 18 3.99927"/><path d="M7.99219 11.004C8.52019 10.584 9.00019 9.89143 9.30019 10.02C9.60019 10.1486 9.50419 10.572 9.50419 11.232C9.50419 11.892 9.50419 14.6847 9.50419 16.008"/><path d="M16.0022 12.6C16.0022 11.22 16.0682 10.848 15.8042 10.404C15.5402 9.96001 14.8802 9.99841 14.2202 9.99841C13.5602 9.99841 13.0802 9.96001 12.7622 10.32C12.3722 10.74 12.5402 11.52 12.4922 12.6C12.6002 14.04 12.3062 15.18 12.7562 15.66C13.0802 16.056 13.6553 15.996 14.3402 16.008C15.0201 15.9997 15.4322 16.032 15.7682 15.648C16.1402 15.312 15.9602 13.98 16.0022 12.6Z"/>', vol: '<path d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z"/><path d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15"/><path d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17"/>', mute: '<path d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z"/><path d="M18 10L22 14M18 14L22 10"/>', full: '<path d="M8 3H6C4.34315 3 3 4.34315 3 6V8"/><path d="M16 3H18C19.6569 3 21 4.34315 21 6V8"/><path d="M8 21H6C4.34315 21 3 19.6569 3 18V16"/><path d="M16 21H18C19.6569 21 21 19.6569 21 18V16"/>', unfull: '<path d="M3 8H5C6.65685 8 8 6.65685 8 5V3"/><path d="M21 8H19C17.3431 8 16 6.65685 16 5V3"/><path d="M3 16H5C6.65685 16 8 17.3431 8 19V21"/><path d="M21 16H19C17.3431 16 16 17.3431 16 19V21"/>', pip: '<path d="M11.5 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.947 6.29018 21.9976 8.05974 21.9999 11.5"/><path d="M20.5 14H15.5C14.6716 14 14 14.6716 14 15.5V18.5C14 19.3284 14.6716 20 15.5 20H20.5C21.3284 20 22 19.3284 22 18.5V15.5C22 14.6716 21.3284 14 20.5 14Z"/><path d="M11 9.5V12C11.0475 12.5744 10.6034 13.0238 10 13H7.5M6 8L10 12"/>', cc: '<path d="M2 12C2 8.02033 2 6.03049 3.0528 4.70201C3.22119 4.48953 3.40678 4.29302 3.60746 4.11473C4.86213 3 6.74142 3 10.5 3H13.5C17.2586 3 19.1379 3 20.3925 4.11473C20.5932 4.29302 20.7788 4.48953 20.9472 4.70201C22 6.03049 22 8.02033 22 12C22 15.9797 22 17.9695 20.9472 19.298C20.7788 19.5105 20.5932 19.707 20.3925 19.8853C19.1379 21 17.2586 21 13.5 21H10.5C6.74142 21 4.86213 21 3.60746 19.8853C3.40678 19.707 3.22119 19.5105 3.0528 19.298C2 17.9695 2 15.9797 2 12Z"/><path d="M10.5 9H10C9.06812 9 8.60218 9 8.23463 9.15224C7.74458 9.35523 7.35523 9.74458 7.15224 10.2346C7 10.6022 7 11.0681 7 12C7 12.9319 7 13.3978 7.15224 13.7654C7.35523 14.2554 7.74458 14.6448 8.23463 14.8478C8.60218 15 9.06812 15 10 15H10.5M17 9H16.5C15.5681 9 15.1022 9 14.7346 9.15224C14.2446 9.35523 13.8552 9.74458 13.6522 10.2346C13.5 10.6022 13.5 11.0681 13.5 12C13.5 12.9319 13.5 13.3978 13.6522 13.7654C13.8552 14.2554 14.2446 14.6448 14.7346 14.8478C15.1022 15 15.5681 15 16.5 15H17"/>', youtube: '<path d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z"/><path d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z"/>' });
  const clock = s => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = String(s % 60).padStart(2, '0'); return h ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`; };

  /* Player de vídeo: controles próprios sobre um <video> nativo, em "vidro" (data-glass="liquid" ou "blur").
     Título e link para o YouTube no alto; voltar 10 s, tocar e avançar 10 s no meio; embaixo, a barra com o tempo
     ao passar o mouse, som, tempo, velocidade, legendas, picture-in-picture e tela cheia. Teclado: espaço/K tocar,
     J/L 10 s, ← → 5 s, ↑ ↓ volume, M som, F tela cheia, C legendas. Os controles somem tocando, sem mexer o mouse. */
  C.video = el => {
    const v = $('video', el); if (!v) return;
    el.classList.add('ac-video'); el.classList.add('ac-video--' + (el.dataset.glass || 'liquid'));
    el.tabIndex = 0; el.setAttribute('role', 'region'); el.setAttribute('aria-label', 'Player de vídeo' + (el.dataset.title ? ': ' + el.dataset.title : ''));
    v.removeAttribute('controls'); v.playsInline = true; v.preload = v.preload || 'metadata';
    const hasCC = !!v.querySelector('track'), canPip = document.pictureInPictureEnabled && !v.disablePictureInPicture;
    const btn = (k, label, cls = '') => `<button type="button" class="ac-video__btn ${cls}" data-v="${k}" aria-label="${label}">${icon(k)}</button>`;
    const ui = document.createElement('div'); ui.className = 'ac-video__ui';
    ui.innerHTML = `<div class="ac-video__top">${el.dataset.title ? `<span class="ac-video__pill ac-video__title">${esc(el.dataset.title)}</span>` : '<span></span>'}${el.dataset.youtube ? `<a class="ac-video__pill" href="${esc(el.dataset.youtube)}" target="_blank" rel="noopener noreferrer">${icon('youtube')}Assistir no YouTube</a>` : ''}</div>`
      + `<div class="ac-video__mid">${btn('back10', 'Voltar 10 segundos', 'ac-video__round')}${btn('play', 'Tocar', 'ac-video__round ac-video__big')}${btn('fwd10', 'Avançar 10 segundos', 'ac-video__round')}</div>`
      + `<div class="ac-video__bottom"><div class="ac-video__track"><span class="ac-video__buffer"></span><span class="ac-video__fill"></span><span class="ac-video__tip" aria-hidden="true">0:00</span><input class="ac-video__seek" type="range" min="0" max="1000" step="1" value="0" aria-label="Posição do vídeo"></div>`
      + `<div class="ac-video__row">${btn('play', 'Tocar', 'ac-video__toggle')}<span class="ac-video__vol">${btn('vol', 'Tirar o som')}<input class="ac-video__volume" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume"></span><span class="ac-video__time"><span data-v-now>0:00</span> / <span data-v-dur>0:00</span></span><span class="ac-video__space"></span>`
      + `<button type="button" class="ac-video__btn ac-video__speed" data-v="speed" aria-label="Velocidade: 1×">1×</button>${hasCC ? btn('cc', 'Mostrar legendas') : ''}${canPip ? btn('pip', 'Picture-in-picture') : ''}${btn('full', 'Tela cheia')}</div></div>`;
    el.appendChild(ui);
    const q = s => $(s, el), seek = q('.ac-video__seek'), fill = q('.ac-video__fill'), buf = q('.ac-video__buffer'), tip = q('.ac-video__tip'), vol = q('.ac-video__volume');
    const plays = $$('[data-v="play"]', el), now = q('[data-v-now]'), dur = q('[data-v-dur]'), speedBtn = q('[data-v="speed"]'), volBtn = q('[data-v="vol"]');
    const SPEEDS = [1, 1.25, 1.5, 2, .5]; let idle = 0;
    const setIcon = (b, k, label) => { b.innerHTML = icon(k); b.setAttribute('aria-label', label); };
    const paintPlay = () => { el.dataset.state = v.paused ? 'paused' : 'playing'; plays.forEach(b => setIcon(b, v.paused ? 'play' : 'pause', v.paused ? 'Tocar' : 'Pausar')); };
    const paintTime = () => { const d = v.duration || 0, p = d ? v.currentTime / d : 0; fill.style.transform = `scaleX(${p})`; if (document.activeElement !== seek) seek.value = Math.round(p * 1000); now.textContent = clock(v.currentTime); dur.textContent = clock(d); seek.setAttribute('aria-valuetext', `${clock(v.currentTime)} de ${clock(d)}`); try { buf.style.transform = `scaleX(${d && v.buffered.length ? v.buffered.end(v.buffered.length - 1) / d : 0})`; } catch (_) {} };
    const paintVol = () => { const m = v.muted || v.volume === 0; setIcon(volBtn, m ? 'mute' : 'vol', m ? 'Ligar o som' : 'Tirar o som'); vol.value = m ? 0 : v.volume; };
    const wake = () => { el.classList.remove('is-idle'); clearTimeout(idle); if (!v.paused) idle = setTimeout(() => { if (!el.contains(document.activeElement) || document.activeElement === el) el.classList.add('is-idle'); }, 2500); };
    const toggle = () => { v.paused ? v.play().catch(() => {}) : v.pause(); };
    const jump = s => { v.currentTime = Math.max(0, Math.min((v.duration || 0), v.currentTime + s)); wake(); };
    const full = () => { const doc = document; if (doc.fullscreenElement) doc.exitFullscreen?.(); else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el); };
    const cc = () => { const t = v.textTracks[0]; if (!t) return; t.mode = t.mode === 'showing' ? 'hidden' : 'showing'; const b = q('[data-v="cc"]'); b.setAttribute('aria-pressed', t.mode === 'showing'); b.setAttribute('aria-label', t.mode === 'showing' ? 'Esconder legendas' : 'Mostrar legendas'); };
    ui.addEventListener('click', e => {
      const b = e.target.closest('[data-v]'); if (!b) { if (e.target === ui || e.target.closest('.ac-video__mid') === e.target) toggle(); return; }
      const k = b.dataset.v;
      if (k === 'play') toggle(); else if (k === 'back10') jump(-10); else if (k === 'fwd10') jump(10);
      else if (k === 'vol') { v.muted = !v.muted; if (!v.muted && v.volume === 0) v.volume = .6; }
      else if (k === 'speed') { const i = (SPEEDS.indexOf(v.playbackRate) + 1) % SPEEDS.length; v.playbackRate = SPEEDS[i]; const t = String(SPEEDS[i]).replace('.', ',') + '×'; b.textContent = t; b.setAttribute('aria-label', 'Velocidade: ' + t); }
      else if (k === 'cc') cc(); else if (k === 'pip') (document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture()).catch(() => {});
      else if (k === 'full') full();
    });
    ui.addEventListener('dblclick', e => { if (!e.target.closest('button, input, a')) full(); });
    seek.addEventListener('input', () => { if (v.duration) { v.currentTime = seek.value / 1000 * v.duration; paintTime(); } });
    vol.addEventListener('input', () => { v.volume = +vol.value; v.muted = v.volume === 0; });
    const track = q('.ac-video__track');
    track.addEventListener('pointermove', e => { const r = track.getBoundingClientRect(), p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); tip.textContent = clock(p * (v.duration || 0)); tip.style.left = p * 100 + '%'; });
    el.addEventListener('keydown', e => {
      if (e.target.matches('input[type=range]') && /Arrow/.test(e.key)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toLowerCase(), act = { ' ': toggle, k: toggle, j: () => jump(-10), l: () => jump(10), arrowleft: () => jump(-5), arrowright: () => jump(5), arrowup: () => { v.volume = Math.min(1, v.volume + .1); v.muted = false; }, arrowdown: () => { v.volume = Math.max(0, v.volume - .1); }, m: () => { v.muted = !v.muted; }, f: full, c: cc }[k];
      if (!act || (k === ' ' && e.target.matches('button, a'))) return;
      e.preventDefault(); act(); wake();
    });
    ['play', 'pause', 'ended'].forEach(t => v.addEventListener(t, () => { paintPlay(); wake(); }));
    ['timeupdate', 'loadedmetadata', 'durationchange', 'progress', 'seeked'].forEach(t => v.addEventListener(t, paintTime));
    v.addEventListener('volumechange', paintVol);
    document.addEventListener('fullscreenchange', () => { const on = document.fullscreenElement === el; const b = q('[data-v="full"]'); setIcon(b, on ? 'unfull' : 'full', on ? 'Sair da tela cheia' : 'Tela cheia'); });
    el.addEventListener('pointermove', wake); el.addEventListener('focusin', wake);
    paintPlay(); paintTime(); paintVol();
  };

  /* Halftone: a imagem refeita como uma grade de pontos (o tamanho vem do tom, a cor da própria imagem).
     data-images="a.jpg|b.jpg" e data-labels="A|B" trocam de imagem com os pontos se transformando em onda;
     o mouse funciona como lente (pontos crescem e se afastam) e o clique solta uma onda. Canvas, sem dependência. */
  C.halftone = el => {
    const srcs = (el.dataset.images || el.dataset.src || '').split('|').filter(Boolean); if (!srcs.length) return;
    const labels = (el.dataset.labels || '').split('|'), alts = (el.dataset.alts || '').split('|');
    el.classList.add('ac-halftone');
    const cv = document.createElement('canvas'); cv.className = 'ac-halftone__canvas'; cv.setAttribute('role', 'img'); el.appendChild(cv);
    let tabs = null;
    if (srcs.length > 1) { tabs = document.createElement('div'); tabs.className = 'ac-segmented ac-halftone__tabs'; tabs.setAttribute('aria-label', 'Imagem'); tabs.innerHTML = srcs.map((_, i) => `<button type="button" aria-pressed="${!i}" value="${i}">${esc(labels[i] || 'Imagem ' + (i + 1))}</button>`).join(''); el.appendChild(tabs); tabs.dataset.ac = 'segmented'; tabs.dataset.acInitsegmented = '1'; C.segmented(tabs); }
    cv.style.aspectRatio = String(+el.dataset.ratio || 4 / 3);
    const ctx = cv.getContext('2d'), CELL = +el.dataset.cell || 7;
    // o hexRgb fica içado (function) para a amostragem usar
    let cols = 0, rows = 0, W = 0, H = 0, cur = null, from = null, to = null, t0 = 0, raf = 0, mx = -1e4, my = -1e4, lens = 0, lensT = 0, ripples = [], visible = true, cache = {};
    const load = src => cache[src] || (cache[src] = new Promise((ok, bad) => { const im = new Image(); im.decoding = 'async'; im.onload = () => ok(im); im.onerror = bad; im.src = src; }));
    const sample = im => {
      const c = document.createElement('canvas'); c.width = cols; c.height = rows; const x = c.getContext('2d', { willReadFrequently: true });
      const s = Math.max(cols / im.naturalWidth, rows / im.naturalHeight), w = im.naturalWidth * s, h = im.naturalHeight * s;
      x.drawImage(im, (cols - w) / 2, (rows - h) / 2, w, h);
      const d = x.getImageData(0, 0, cols, rows).data, n = cols * rows, r = new Float32Array(n), rgb = new Float32Array(n * 3), al = new Float32Array(n), bg = new Uint8Array(n);
      // figura com fundo transparente: o fundo vira pontinhos claros ("papel") e a figura ganha o degradê, se houver
      const paper = hexRgb(getComputedStyle(el).getPropertyValue('--ac-text-3').trim()) || [136, 136, 136], grad = (el.dataset.gradient || '').split(',').map(c => hexRgb(c.trim())).filter(Boolean);
      for (let i = 0; i < n; i++) {
        const R = d[i * 4], G = d[i * 4 + 1], B = d[i * 4 + 2], A = d[i * 4 + 3] / 255, L = (.2126 * R + .7152 * G + .0722 * B) / 255;
        if (A < .06) { r[i] = .16; rgb.set(paper, i * 3); al[i] = .35; bg[i] = 1; continue; }
        r[i] = (.18 + .82 * Math.pow(1 - L * .82, 1.35)) * (.45 + .55 * A); al[i] = 1;
        if (grad.length > 1) { const k = ((i / cols) | 0) / rows, a = grad[0], b = grad[1]; rgb[i * 3] = a[0] + (b[0] - a[0]) * k; rgb[i * 3 + 1] = a[1] + (b[1] - a[1]) * k; rgb[i * 3 + 2] = a[2] + (b[2] - a[2]) * k; }
        else { rgb[i * 3] = R; rgb[i * 3 + 1] = G; rgb[i * 3 + 2] = B; }
      }
      return { r, rgb, al, bg };
    };
    const size = () => {
      // a altura vem do aspect-ratio (definido uma vez): mudar o tamanho dentro do ResizeObserver criaria um laço
      const w = cv.clientWidth || el.clientWidth, ratio = +el.dataset.ratio || 4 / 3, dpr = Math.min(2, devicePixelRatio || 1);
      W = w; H = Math.round(w / ratio); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(8, Math.floor(W / CELL)); rows = Math.max(8, Math.floor(H / CELL));
    };
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    function hexRgb(h) { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); if (m) { const n = parseInt(m[1], 16); return [n >> 16, n >> 8 & 255, n & 255]; } const c = /rgba?\(([^)]+)\)/.exec(h || ''); return c ? c[1].split(/[ ,/]+/).slice(0, 3).map(Number) : null; }
    const draw = now => {
      raf = 0; if (!cur) return;
      // data-mono: pontos na cor do texto do tema (preto no claro, branco no escuro); o fundo no cinza do tema
      const mono = el.hasAttribute('data-mono'), cs = mono && getComputedStyle(el), ink = mono && (hexRgb(cs.color) || [0, 0, 0]), pap = mono && (hexRgb(cs.getPropertyValue('--ac-text-3').trim()) || [136, 136, 136]);
      const n = cols * rows, maxR = CELL * .5, dur = 900; let busy = false;
      ctx.clearRect(0, 0, W, H);
      lens += (lensT - lens) * .18; if (Math.abs(lensT - lens) > .01) busy = true;
      ripples = ripples.filter(r => now - r.t < 900); if (ripples.length) busy = true;
      for (let i = 0; i < n; i++) {
        const c = i % cols, rI = (i / cols) | 0; let x = (c + .5) * CELL, y = (rI + .5) * CELL;
        let rad = cur.r[i], R = cur.rgb[i * 3], G = cur.rgb[i * 3 + 1], B = cur.rgb[i * 3 + 2], Al = cur.al[i];
        if (to) { const k = Math.min(1, Math.max(0, (now - t0 - c / cols * 350) / (dur - 350))); if (k < 1) busy = true; const e = ease(k), dip = Math.sin(e * Math.PI) * .5;
          rad = (from.r[i] * (1 - e) + to.r[i] * e) * (1 - dip); R = from.rgb[i * 3] * (1 - e) + to.rgb[i * 3] * e; G = from.rgb[i * 3 + 1] * (1 - e) + to.rgb[i * 3 + 1] * e; B = from.rgb[i * 3 + 2] * (1 - e) + to.rgb[i * 3 + 2] * e; Al = from.al[i] * (1 - e) + to.al[i] * e; }
        if (lens > .01) { const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy), f = Math.max(0, 1 - d / 70) * lens; if (f > 0) { rad *= 1 + f * .6; const push = (el.hasAttribute('data-displace') ? 9 : 4) * f; x += dx / (d || 1) * push; y += dy / (d || 1) * push; } }
        for (const rp of ripples) { const age = (now - rp.t) / 900, ring = age * 260, dx = x - rp.x, dy = y - rp.y, d = Math.hypot(dx, dy), f = Math.max(0, 1 - Math.abs(d - ring) / 30) * (1 - age); if (f > 0) { x += dx / (d || 1) * 6 * f; y += dy / (d || 1) * 6 * f; rad *= 1 + f * .4; } }
        const r = rad * maxR; if (r < .35) continue;
        if (mono) { const t = (to && from) ? (to.bg[i] && from.bg[i]) : cur.bg[i], c = t ? pap : ink; R = c[0]; G = c[1]; B = c[2]; }
        ctx.fillStyle = `rgb(${R | 0} ${G | 0} ${B | 0} / ${Al.toFixed(2)})`; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      }
      if (to && !busy) { cur = to; to = from = null; }
      if (busy && visible) raf = requestAnimationFrame(draw);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const show = async i => {
      const im = await load(srcs[i]).catch(() => null); if (!im) return;
      cv.setAttribute('aria-label', alts[i] || labels[i] || 'Imagem em pontos');
      const next = sample(im);
      if (!cur || reduce()) { cur = next; to = from = null; } else { from = to ? to : cur; to = next; t0 = performance.now(); }
      kick();
    };
    let at = 0;
    tabs && tabs.addEventListener('ac:change', () => { const b = tabs.querySelector('[aria-pressed="true"]'); if (b && +b.value !== at) { at = +b.value; show(at); } });
    cv.addEventListener('pointermove', e => { if (reduce()) return; const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; lensT = 1; kick(); });
    cv.addEventListener('pointerleave', () => { lensT = 0; kick(); });
    cv.addEventListener('click', e => { if (reduce()) return; const r = cv.getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }); kick(); });
    if (window.IntersectionObserver) new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible) kick(); })).observe(el);
    let lastW = 0; new ResizeObserver(() => { if (cv.clientWidth === lastW) return; lastW = cv.clientWidth; size(); cur = null; show(at); }).observe(cv);
    // troca de tema (atributo data-theme ou preferência do sistema): redesenha com as cores novas
    new MutationObserver(kick).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', kick);
    el._halftone = { show: i => { at = i; show(i); } };
  };

  /* Ícone que se transforma: um botão com dois <svg> (data-off e data-on). Ao trocar, os traços do ícone atual
     se apagam e os do próximo se desenham, com um giro curto. aria-pressed e o rótulo acompanham o estado;
     data-revert="1500" volta sozinho (bom para "copiado"). Funciona com qualquer conjunto de ícones de traço. */
  C['morph-icon'] = el => {
    const off = $('svg[data-off]', el), on = $('svg[data-on]', el); if (!off || !on) return;
    el.classList.add('ac-morph');
    $$('path, circle, rect, line, polyline, ellipse', el).forEach(p => p.setAttribute('pathLength', '1'));
    [off, on].forEach(s => { s.setAttribute('aria-hidden', 'true'); s.setAttribute('viewBox', s.getAttribute('viewBox') || '0 0 24 24'); });
    const lOff = el.dataset.labelOff || el.getAttribute('aria-label') || '', lOn = el.dataset.labelOn || lOff;
    let timer = 0;
    const set = v => { el.setAttribute('aria-pressed', v); el.setAttribute('aria-label', v ? lOn : lOff); };
    el.addEventListener('click', () => {
      const v = el.getAttribute('aria-pressed') !== 'true'; set(v);
      el.dispatchEvent(new CustomEvent('ac:change', { detail: { on: v }, bubbles: true }));
      clearTimeout(timer); if (v && el.dataset.revert) timer = setTimeout(() => set(false), +el.dataset.revert);
    });
    set(el.getAttribute('aria-pressed') === 'true');
  };

  /* Editor com IA: ao selecionar texto, aparece a barra com "Perguntar à IA" e formatação (negrito, itálico,
     sublinhado, tachado, código). "Perguntar" vira um campo; ao enviar, um cartão mostra o pedido e a resposta
     chegando palavra por palavra, com Substituir, Inserir abaixo e Descartar. A resposta vem do evento ac:ask
     (detail.respond(texto | Promise)) ou, na demo, de data-answer. Esc fecha e devolve a seleção. */
  C['ai-editor'] = el => {
    const doc = $('.ac-ai-editor__doc', el); if (!doc) return;
    el.classList.add('ac-ai-editor');
    doc.contentEditable = 'true'; doc.setAttribute('role', 'textbox'); doc.setAttribute('aria-multiline', 'true');
    if (!doc.getAttribute('aria-label')) doc.setAttribute('aria-label', 'Documento');
    const orb = '<span class="ac-ai-orb" aria-hidden="true"></span>';
    const pop = document.createElement('div'); pop.className = 'ac-ai-pop'; pop.hidden = true; el.appendChild(pop);
    const FMT = [['bold', 'Negrito', '<b>B</b>'], ['italic', 'Itálico', '<i>I</i>'], ['underline', 'Sublinhado', '<u>U</u>'], ['strikeThrough', 'Tachado', '<s>S</s>'], ['code', 'Código', '<code>&lt;/&gt;</code>']];
    let range = null, mode = '', streamT = 0;
    const hl = (r) => { try { if (!window.Highlight || !CSS.highlights) return; if (r) CSS.highlights.set('ac-ai', new Highlight(r)); else CSS.highlights.delete('ac-ai'); } catch (_) {} };
    const place = () => {
      if (!range) return; const r = range.getBoundingClientRect(), e = el.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
      // acima da seleção (pode passar do editor); só desce se faltar espaço na tela
      let top = r.top - e.top - h - 8; if (r.top - h - 8 < 8) top = r.bottom - e.top + 8;
      pop.style.left = Math.max(4, Math.min(e.width - w - 4, r.left - e.left + r.width / 2 - w / 2)) + 'px'; pop.style.top = top + 'px';
    };
    const close = (restore) => { clearTimeout(streamT); pop.hidden = true; mode = ''; hl(null); if (restore && range) { doc.focus(); const s = getSelection(); s.removeAllRanges(); s.addRange(range); } };
    const bar = () => {
      mode = 'bar'; pop.className = 'ac-ai-pop ac-ai-pop--bar'; pop.setAttribute('role', 'toolbar'); pop.setAttribute('aria-label', 'Seleção');
      pop.innerHTML = `<button type="button" class="ac-ai-ask-btn" data-ai="ask">${orb}Perguntar à IA</button><span class="ac-ai-sep" aria-hidden="true"></span>` + FMT.map(([c, l, g]) => `<button type="button" class="ac-ai-fmt" data-ai="${c}" aria-label="${l}" aria-pressed="${c !== 'code' && document.queryCommandState && document.queryCommandState(c)}">${g}</button>`).join('');
      pop.hidden = false; place();
    };
    const ask = () => {
      mode = 'ask'; pop.className = 'ac-ai-pop ac-ai-pop--ask'; pop.removeAttribute('role');
      pop.innerHTML = `<form class="ac-ai-form">${orb}<input class="ac-ai-input" placeholder="Pergunte qualquer coisa…" aria-label="Pedido para a IA sobre o trecho selecionado" autocomplete="off"><button type="submit" class="ac-ai-send" aria-label="Enviar">${icon('right')}</button></form>`;
      hl(range); pop.hidden = false; place(); $('input', pop).focus();
    };
    const answer = prompt => {
      mode = 'card'; pop.className = 'ac-ai-pop ac-ai-pop--card'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Resposta da IA');
      pop.innerHTML = `<div class="ac-ai-card__q">${orb}<span>${esc(prompt)}</span></div><p class="ac-ai-card__a" aria-live="polite"><span class="ac-ai-thinking">Pensando…</span></p><div class="ac-ai-card__actions" hidden><button type="button" class="ac-btn ac-btn--sm" data-ai="replace">Substituir</button><button type="button" class="ac-btn ac-btn--sm ac-btn--secondary" data-ai="insert">Inserir abaixo</button><button type="button" class="ac-btn ac-btn--sm ac-btn--ghost" data-ai="discard">Descartar</button></div>`;
      place();
      const out = $('.ac-ai-card__a', pop), acts = $('.ac-ai-card__actions', pop);
      let text = null;
      const finish = txt => {
        text = String(txt || '').trim(); const words = text.split(/(\s+)/); out.textContent = '';
        if (reduce()) { out.textContent = text; acts.hidden = false; place(); return; }
        out.setAttribute('aria-busy', 'true'); let i = 0;
        const step = () => { if (mode !== 'card') return; out.querySelectorAll('.is-new').forEach(s => s.classList.remove('is-new')); const s = document.createElement('span'); s.className = 'is-new'; s.textContent = words.slice(i, i + 2).join(''); out.appendChild(s); i += 2; place();
          if (i < words.length) streamT = setTimeout(step, 45); else { setTimeout(() => out.querySelectorAll('.is-new').forEach(n => n.classList.remove('is-new')), 400); out.removeAttribute('aria-busy'); acts.hidden = false; place(); $('button', acts).focus(); } };
        step();
      };
      pop._text = () => text;
      const ev = new CustomEvent('ac:ask', { cancelable: true, bubbles: true, detail: { prompt, text: range.toString(), respond: v => Promise.resolve(v).then(finish) } });
      el.dispatchEvent(ev);
      if (!ev.defaultPrevented) setTimeout(() => finish(el.dataset.answer || 'Sem resposta configurada (use o evento ac:ask).'), 700);
    };
    const apply = cmd => {
      doc.focus(); const s = getSelection(); s.removeAllRanges(); s.addRange(range);
      if (cmd === 'code') { const c = document.createElement('code'); try { range.surroundContents(c); } catch (_) { c.textContent = range.toString(); range.deleteContents(); range.insertNode(c); } range = document.createRange(); range.selectNodeContents(c); s.removeAllRanges(); s.addRange(range); }
      else document.execCommand(cmd);
      range = s.getRangeAt(0).cloneRange(); bar();
    };
    const blockOf = n => { while (n && n.parentNode !== doc) n = n.parentNode; return n; };
    pop.addEventListener('mousedown', e => { if (!e.target.closest('input')) e.preventDefault(); }); // não perde a seleção ao clicar na barra
    pop.addEventListener('click', e => {
      const b = e.target.closest('[data-ai]'); if (!b) return; const k = b.dataset.ai;
      if (k === 'ask') ask(); else if (FMT.some(f => f[0] === k)) apply(k);
      else if (k === 'replace') { const t = pop._text(); range.deleteContents(); range.insertNode(document.createTextNode(t)); close(false); doc.dispatchEvent(new Event('input', { bubbles: true })); }
      else if (k === 'insert') { const p = document.createElement('p'); p.textContent = pop._text(); const blk = blockOf(range.endContainer); blk ? blk.after(p) : doc.appendChild(p); close(false); p.classList.add('ac-ai-new'); doc.dispatchEvent(new Event('input', { bubbles: true })); }
      else if (k === 'discard') close(true);
    });
    pop.addEventListener('submit', e => { e.preventDefault(); const v = $('input', pop).value.trim(); if (v) answer(v); });
    el.addEventListener('keydown', e => { if (e.key === 'Escape' && !pop.hidden) { e.preventDefault(); close(true); } });
    const onSel = () => {
      if (!el.isConnected) { document.removeEventListener('selectionchange', onSel); return; }
      if (mode === 'ask' || mode === 'card') return;
      const s = getSelection(); if (!s.rangeCount || s.isCollapsed || !doc.contains(s.anchorNode) || !doc.contains(s.focusNode)) { if (mode === 'bar' && !pop.contains(document.activeElement)) close(false); return; }
      range = s.getRangeAt(0).cloneRange(); bar();
    };
    document.addEventListener('selectionchange', onSel);
    doc.addEventListener('keydown', e => { if (e.key === 'F10' && e.altKey && mode === 'bar') { e.preventDefault(); $('button', pop).focus(); } }); // Alt+F10 leva à barra
    el.addEventListener('focusout', e => { if (mode === 'card' || el.contains(e.relatedTarget)) return; setTimeout(() => { if (!el.contains(document.activeElement) && mode !== 'card') close(false); }, 0); });
    // clicar fora do texto (no fundo, no título, em outro campo) fecha a barra, a pergunta e o cartão; sem isso, um clique
    // num lugar que não recebe foco não tirava a seleção e "Perguntar à IA" ficava preso na tela
    const outside = e => {
      if (!el.isConnected) { document.removeEventListener('pointerdown', outside, true); return; }
      if (pop.hidden || pop.contains(e.target) || doc.contains(e.target)) return;
      const s = getSelection(); if (s.rangeCount && doc.contains(s.anchorNode)) s.removeAllRanges();
      close(false);
    };
    document.addEventListener('pointerdown', outside, true);
  };

  /* Conversa em sequência: lista de mensagens (os balões da Conversa) que entram uma a uma quando aparecem na tela,
     com "digitando…" antes de cada resposta e um desfoque na chegada. Tocar no balão mostra a hora (data-time).
     data-play liga a sequência; .ac-conversation--ios usa o azul do iMessage. Movimento reduzido: tudo de uma vez. */
  C.conversation = el => {
    el.classList.add('ac-conversation'); if (!el.hasAttribute('role')) el.setAttribute('role', 'log');
    const msgs = $$('.ac-msg', el), wait = ms => new Promise(r => setTimeout(r, ms));
    msgs.forEach(m => {
      const b = $('.ac-msg__bubble', m); if (!b || !m.dataset.time || $('.ac-msg__time', m)) return;
      m.insertAdjacentHTML('beforeend', `<div class="ac-msg__time"><div><time>${esc(m.dataset.time)}</time></div></div>`);
      b.tabIndex = 0; b.setAttribute('role', 'button'); b.setAttribute('aria-expanded', 'false');
      const t = () => { const o = !m.hasAttribute('data-open'); m.toggleAttribute('data-open', o); b.setAttribute('aria-expanded', o); };
      b.addEventListener('click', t); b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
    });
    if (!el.hasAttribute('data-play') || reduce() || !msgs.length) return;
    let run = 0;
    const play = async () => {
      const id = ++run; msgs.forEach(m => { m.classList.add('is-waiting'); m.classList.remove('is-arriving'); });
      for (const m of msgs) {
        if (id !== run || !el.isConnected) return;
        if (m.classList.contains('ac-msg--in')) { const ty = document.createElement('div'); ty.className = 'ac-msg ac-msg--in ac-conversation__typing is-arriving'; ty.innerHTML = '<div class="ac-msg__bubble"><span class="ac-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="ac-sr">digitando</span></div>'; m.before(ty); await wait(+el.dataset.typing || 1000); ty.remove(); }
        else await wait(500);
        if (id !== run) return;
        m.classList.remove('is-waiting'); m.classList.add('is-arriving'); await wait(250);
      }
    };
    const replay = $('[data-replay]', el.parentElement); if (replay) replay.addEventListener('click', play);
    if (window.IntersectionObserver) { const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); play(); } }, { threshold: .3 }); io.observe(el); } else play();
    el._conversation = { play };
  };

  /* ---------- Mais efeitos 3D ---------- */
  // Hugeicons "arrow-reload-horizontal"
  ICONS.flip = '<path d="M20.5 5.5H9.5C5.78672 5.5 3 8.18503 3 12"/><path d="M3.5 18.5H14.5C18.2133 18.5 21 15.815 21 12"/><path d="M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8"/><path d="M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21"/>';
  const inView = (el, cb) => { if (!window.IntersectionObserver) { cb(true); return; } new IntersectionObserver(es => es.forEach(e => cb(e.isIntersecting))).observe(el); };

  /* Cartão que vira: os dois primeiros filhos viram frente e verso; o botão no canto (ou um clique fora de links e
     campos) vira o cartão. A face escondida fica inert, então o Tab nunca cai num botão de costas. */
  C.flip = el => {
    const [front, back] = el.children; if (!front || !back) return;
    el.classList.add('ac-flip');
    const inner = document.createElement('div'); inner.className = 'ac-flip__inner';
    front.classList.add('ac-flip__front'); back.classList.add('ac-flip__back'); inner.append(front, back); el.appendChild(inner);
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ac-btn ac-btn--secondary ac-btn--icon ac-btn--sm ac-flip__toggle';
    btn.innerHTML = icon('flip'); el.appendChild(btn);
    const set = on => { el.classList.toggle('is-flipped', on); btn.setAttribute('aria-pressed', on); btn.setAttribute('aria-label', on ? (el.dataset.labelFront || 'Ver a frente') : (el.dataset.labelBack || 'Ver o verso')); front.inert = on; back.inert = !on; };
    btn.addEventListener('click', () => set(!el.classList.contains('is-flipped')));
    inner.addEventListener('click', e => { if (!e.target.closest('a, button, input, select, textarea, label')) btn.click(); });
    set(false);
  };

  /* Marquee 3D: as imagens viram 4 colunas numa grade inclinada, cada coluna rolando num sentido.
     Pausa no hover, no foco e no botão (WCAG 2.2.2); com movimento reduzido fica parado. */
  C.marquee3d = el => {
    const imgs = [...el.querySelectorAll('img')]; if (!imgs.length) return;
    el.classList.add('ac-marquee3d'); if (!el.hasAttribute('role')) el.setAttribute('role', 'region');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Galeria em movimento');
    const plane = document.createElement('div'); plane.className = 'ac-marquee3d__plane';
    const cols = [0, 1, 2, 3].map(() => { const c = document.createElement('div'); c.className = 'ac-marquee3d__col'; plane.appendChild(c); return c; });
    imgs.forEach((img, i) => cols[i % 4].appendChild(img));
    // cada coluna é duplicada para o laço não ter emenda; a cópia fica escondida do leitor de tela
    // duas passadas: a 1ª dobra a coluna (a grade inclinada mostra muito na vertical), a 2ª faz o laço sem emenda
    for (let k = 0; k < 2; k++) cols.forEach(c => [...c.children].forEach(img => { const d = img.cloneNode(); d.alt = ''; d.setAttribute('aria-hidden', 'true'); c.appendChild(d); }));
    el.textContent = ''; el.appendChild(plane);
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ac-btn ac-btn--secondary ac-btn--icon ac-btn--sm ac-marquee3d__pause';
    btn.innerHTML = icon('pause') + icon('play'); el.appendChild(btn);
    let stopped = reduce(), held = false;
    const state = () => { el.dataset.paused = stopped || held; btn.setAttribute('aria-label', stopped ? 'Retomar o movimento' : 'Pausar o movimento'); $$('.ac-icon', btn).forEach((ic, k) => { ic.style.display = (k === 0) === !stopped ? '' : 'none'; }); };
    btn.addEventListener('click', () => { stopped = !stopped; state(); });
    el.addEventListener('focusin', () => { held = true; state(); }); el.addEventListener('focusout', e => { if (!el.contains(e.relatedTarget)) { held = false; state(); } });
    inView(el, v => { if (!v) { el.dataset.paused = 'true'; } else state(); });
    state();
  };

  /* Nuvem em esfera: cada item vai para um ponto de uma esfera (espiral de Fibonacci) e a esfera gira sozinha;
     o mouse ou o dedo empurram a rotação. Os itens de trás ficam menores e mais apagados. Parada fora da tela. */
  C.sphere = el => {
    const items = [...el.children], n = items.length; if (!n) return;
    el.classList.add('ac-sphere');
    const pts = items.map((_, i) => { const y = 1 - (i + .5) * 2 / n, r = Math.sqrt(1 - y * y), t = i * Math.PI * (3 - Math.sqrt(5)); return [Math.cos(t) * r, y, Math.sin(t) * r]; });
    let ax = .002, ay = .004, rx = 0, ry = 0, raf = 0, visible = true, drag = null;
    const paint = () => {
      const R = el.clientWidth / 2 - 36, cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      pts.forEach(([x, y, z], i) => {
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy, y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx, k = (z2 + 2) / 3;
        const s = items[i].style; s.transform = `translate(-50%, -50%) translate3d(${(x1 * R).toFixed(1)}px, ${(y2 * R).toFixed(1)}px, 0) scale(${(.6 + .4 * k).toFixed(3)})`;
        s.opacity = (.25 + .75 * k).toFixed(2); s.zIndex = Math.round(k * 100); s.filter = z2 < -.3 ? 'blur(1px)' : '';
      });
    };
    const loop = () => { raf = 0; if (!visible || reduce()) return; if (!drag) { rx += ax; ry += ay; ax += (.002 - ax) * .02; ay += (.004 - ay) * .02; } paint(); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
    el.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY }; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; ry += dx * .008; rx -= dy * .008; ax = -dy * .0008; ay = dx * .0008; drag = { x: e.clientX, y: e.clientY }; paint(); });
    el.addEventListener('pointerup', () => { drag = null; }); el.addEventListener('pointercancel', () => { drag = null; });
    inView(el, v => { visible = v; if (v) start(); });
    new ResizeObserver(paint).observe(el); paint(); start();
  };

  /* Anel 3D: imagens em volta de um cilindro. Gira devagar sozinho, arrasta para girar, setas e ← → no palco
     levam à próxima; ao soltar, encaixa na imagem mais próxima. Com movimento reduzido não gira sozinho. */
  C.ring3d = el => {
    const figs = [...el.children].filter(c => c.matches('img') || $('img', c)), n = figs.length; if (n < 3) return;
    el.classList.add('ac-ring3d'); el.setAttribute('role', 'region'); el.setAttribute('aria-roledescription', 'carrossel');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Carrossel 3D');
    const stage = document.createElement('div'); stage.className = 'ac-ring3d__stage'; stage.tabIndex = 0; stage.setAttribute('aria-label', 'Imagens em anel; use as setas para girar');
    const spin = document.createElement('div'); spin.className = 'ac-ring3d__spin'; stage.appendChild(spin);
    const step = 360 / n;
    figs.forEach((f, i) => { f.classList.add('ac-ring3d__item'); f.style.setProperty('--i-a', i * step + 'deg'); f.setAttribute('role', 'group'); f.setAttribute('aria-roledescription', 'slide'); f.setAttribute('aria-label', `${i + 1} de ${n}`); spin.appendChild(f); });
    const bar = document.createElement('div'); bar.className = 'ac-carousel__controls';
    bar.innerHTML = `<button type="button" class="ac-carousel__btn" data-r="-1" aria-label="Imagem anterior">${icon('left')}</button><span class="ac-coverflow__status" aria-live="polite"></span><button type="button" class="ac-carousel__btn" data-r="1" aria-label="Próxima imagem">${icon('right')}</button>`;
    el.append(stage, bar);
    const status = $('.ac-coverflow__status', bar);
    let a = 0, raf = 0, visible = true, drag = null, idle = 0, auto = !reduce() && !el.hasAttribute('data-static');
    const radius = () => { const w = figs[0].offsetWidth || 200; spin.style.setProperty('--r', Math.round(w / 2 / Math.tan(Math.PI / n) + 18) + 'px'); };
    const front = () => ((Math.round(-a / step) % n) + n) % n;
    const paint = () => { spin.style.setProperty('--a', a.toFixed(2) + 'deg'); const f = front(); status.textContent = `${f + 1} de ${n}`; figs.forEach((fig, i) => fig.setAttribute('aria-hidden', i !== f)); };
    const snap = to => { spin.classList.add('is-snap'); a = to; paint(); idle = performance.now() + 2500; setTimeout(() => spin.classList.remove('is-snap'), 650); };
    const loop = t => { raf = 0; if (!visible) return; if (auto && !drag && t > idle) { a -= .06; paint(); } raf = requestAnimationFrame(loop); };
    bar.addEventListener('click', e => { const b = e.target.closest('[data-r]'); if (b) snap(Math.round(a / step) * step - +b.dataset.r * step); });
    stage.addEventListener('keydown', e => { const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (d) { e.preventDefault(); snap(Math.round(a / step) * step - d * step); } });
    stage.addEventListener('pointerdown', e => { drag = { x: e.clientX, a }; stage.classList.add('is-drag'); stage.setPointerCapture(e.pointerId); });
    stage.addEventListener('pointermove', e => { if (!drag) return; a = drag.a + (e.clientX - drag.x) * .35; paint(); });
    const end = () => { if (!drag) return; drag = null; stage.classList.remove('is-drag'); snap(Math.round(a / step) * step); };
    stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
    el.addEventListener('focusin', () => { idle = Infinity; }); el.addEventListener('focusout', e => { if (!el.contains(e.relatedTarget)) idle = performance.now() + 1500; });
    inView(el, v => { visible = v; if (v && !raf) raf = requestAnimationFrame(loop); });
    new ResizeObserver(() => { radius(); paint(); }).observe(stage); radius(); paint();
  };

  /* Palavras que viram em 3D: data-words="vende,organiza,cresce"; cada letra entra girando no eixo X.
     O leitor de tela ouve a frase inteira uma vez (todas as palavras), sem anúncio a cada troca. */
  C['flip-words'] = el => {
    const words = (el.dataset.words || el.textContent).split(',').map(w => w.trim()).filter(Boolean); if (!words.length) return;
    el.classList.add('ac-flip-words');
    el.innerHTML = `<span class="ac-sr">${esc(words.join(', '))}</span><span class="ac-flip-words__w" aria-hidden="true"></span>`;
    const box = $('.ac-flip-words__w', el), every = +el.dataset.interval || 2600;
    let i = 0, t = 0, visible = true;
    const put = w => { box.classList.remove('is-out'); box.innerHTML = [...w].map((c, k) => `<span class="ac-flip-words__c" style="--i:${k}">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join(''); };
    const next = () => { if (!el.isConnected) return; if (visible && !reduce()) { box.classList.add('is-out'); setTimeout(() => { i = (i + 1) % words.length; put(words[i]); }, 380); } t = setTimeout(next, every); };
    put(words[0]); inView(el, v => { visible = v; });
    if (words.length > 1) t = setTimeout(next, every);
  };

  /* ---------- Profundidade e movimento ---------- */
  // cartão que inclina seguindo o mouse; desligado em telas de toque e com movimento reduzido
  C.tilt = el => {
    el.classList.add('ac-tilt');
    const max = +el.dataset.max || 10, fine = matchMedia('(hover: hover) and (pointer: fine)');
    $$('[data-depth]', el).forEach(l => { l.classList.add('ac-tilt__layer'); l.style.setProperty('--z', parseFloat(l.dataset.depth) + 'px'); });
    let raf = 0;
    el.addEventListener('pointermove', e => {
      if (!fine.matches || reduce() || e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.classList.add('is-moving');
        el.style.setProperty('--ry', ((x - .5) * 2 * max).toFixed(2) + 'deg'); el.style.setProperty('--rx', ((.5 - y) * 2 * max).toFixed(2) + 'deg');
        el.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); el.classList.remove('is-moving'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
  };
  /* revelar ao rolar: data-ac="reveal" no elemento (ou data-reveal-children no contêiner, com atraso em sequência).
     Com animation-timeline: view() quem anima é o CSS; sem suporte (Firefox), IntersectionObserver liga .is-in. */
  const scrollDriven = () => window.CSS && CSS.supports('animation-timeline: view()');
  let revealIO = null;
  C.reveal = el => {
    const items = el.hasAttribute('data-reveal-children') ? [...el.children] : [el];
    items.forEach((n, i) => { n.classList.add('ac-reveal'); if (el.dataset.reveal && n !== el) n.dataset.reveal = el.dataset.reveal; n.style.setProperty('--i', i); });
    if (scrollDriven() || reduce() || !window.IntersectionObserver) { items.forEach(n => n.classList.add('is-in')); return; }
    revealIO = revealIO || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); } }), { threshold: .15 });
    items.forEach(n => revealIO.observe(n));
  };
  // barra de leitura: sem animation-timeline: scroll(), acompanha a rolagem do contêiner pelo JS
  C['scroll-progress'] = el => {
    el.classList.add('ac-scroll-progress'); el.setAttribute('aria-hidden', 'true');
    if (window.CSS && CSS.supports('animation-timeline: scroll()')) return;
    let box = el.parentElement; while (box && box !== document.body && !/(auto|scroll)/.test(getComputedStyle(box).overflowY)) box = box.parentElement;
    const target = !box || box === document.body ? document.scrollingElement : box, src = target === document.scrollingElement ? window : target;
    const upd = () => { const max = target.scrollHeight - target.clientHeight; el.style.setProperty('--p', max > 0 ? Math.min(1, target.scrollTop / max) : 0); };
    src.addEventListener('scroll', upd, { passive: true }); upd();
  };
  // troca de tela com View Transitions (fade curto); sem suporte ou com movimento reduzido, só executa
  function transition(update) {
    if (!document.startViewTransition || reduce()) { update(); return Promise.resolve(); }
    return document.startViewTransition(update).finished.catch(() => {});
  }

  /* ---------- Carregamentos (pesquisa de 28/10/2026, 2ª rodada) ---------- */
  // quatro pontos girando: só desenho; quem dá o nome da espera é o contêiner (ou role="status" + aria-label no próprio)
  C.orbit = el => {
    el.classList.add('ac-orbit');
    if (!el.children.length) el.innerHTML = '<i></i><i></i><i></i><i></i>';
    if (el.dataset.size) el.style.setProperty('--size', parseFloat(el.dataset.size) + 'px');
    if (!el.hasAttribute('role')) el.setAttribute('aria-hidden', 'true');
  };
  /* Espera longa (1–2 min) que não trava a tela: gerar arte, relatório, pesquisa. Navegador desenhado com os blocos da
     página pulsando e a luz correndo pelos traços até ele; o rótulo vai na barra e é lido pelo leitor de tela. */
  const WAIT_TRACES = ['M0 60H40V100H80', 'M320 140H280V100H240', 'M120 0V24H160V44', 'M200 200V176H160V156'];
  const WAIT_DIRS = [[0, 0, 1, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 1, 0, 0]];
  C.wait = el => {
    const label = el.dataset.label || 'Gerando', g = id('ac-wait'), seq = n => Array.from({ length: n }, (_, i) => (i + 1) * 20);
    el.classList.add('ac-wait'); el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
    const note = el.dataset.note ? `<p class="ac-wait__note">${esc(el.dataset.note)}</p>` : '';
    el.innerHTML = `<svg class="ac-wait__svg" viewBox="0 0 320 200" aria-hidden="true" focusable="false">`
      + `<defs>${WAIT_DIRS.map(([a, b, c, d], i) => `<linearGradient id="${g}-${i}" x1="${a}" y1="${b}" x2="${c}" y2="${d}"><stop offset="0" class="ac-wait__s1"/><stop offset=".6" class="ac-wait__s2"/><stop offset="1" class="ac-wait__s3"/></linearGradient>`).join('')}</defs>`
      + `<g>${seq(15).map(x => `<line class="ac-wait__grid" x1="${x}" y1="0" x2="${x}" y2="200"/>`).join('')}${seq(9).map(y => `<line class="ac-wait__grid" x1="0" y1="${y}" x2="320" y2="${y}"/>`).join('')}</g>`
      + `<g>${WAIT_TRACES.map((d, i) => `<path class="ac-wait__trace" d="${d}" pathLength="720" stroke="url(#${g}-${i})"/>`).join('')}</g>`
      + `<rect class="ac-wait__frame" x="80.5" y="44.5" width="159" height="111" rx="8"/>`
      + `<path class="ac-wait__bar" d="M88.5 45H231.5A7.5 7.5 0 0 1 239 52.5V62H81V52.5A7.5 7.5 0 0 1 88.5 45Z"/>`
      + [91, 98, 105].map(x => `<circle class="ac-wait__dot" cx="${x}" cy="53.5" r="2.2"/>`).join('')
      + `<text class="ac-wait__label" x="168" y="57.5" text-anchor="middle">${esc(label)}</text>`
      + `<g><rect class="ac-wait__bone" x="90" y="72" width="52" height="64" rx="4"/><rect class="ac-wait__bone" x="152" y="74" width="76" height="8" rx="4"/><rect class="ac-wait__bone" x="152" y="90" width="64" height="6" rx="3"/><rect class="ac-wait__bone" x="152" y="102" width="70" height="6" rx="3"/><rect class="ac-wait__bone" x="152" y="120" width="40" height="12" rx="4"/><rect class="ac-wait__bone" x="90" y="144" width="138" height="5" rx="2.5"/></g>`
      + `</svg><span class="ac-sr">${esc(label)}</span>${note}`;
  };
  /* Sincronizando: um sistema externo está demorando e a tela tenta de novo sozinha. Fica no lugar do aviso de erro. */
  // Hugeicons "refresh" (stroke rounded)
  const SYNC_ICON = '<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"/></svg>';
  C.sync = el => {
    el.classList.add('ac-sync'); el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
    if ($('.ac-sync__text', el)) return;
    const mark = el.dataset.variant === 'dots' ? '<span class="ac-orbit" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' : `<span class="ac-sync__sonar" aria-hidden="true"><i></i><i></i><i></i>${SYNC_ICON}</span>`;
    el.innerHTML = `${mark}<span class="ac-sync__text"><span class="ac-sync__title">${esc(el.dataset.title || 'Sincronizando')}</span>${el.dataset.detail ? `<span class="ac-sync__detail">${esc(el.dataset.detail)}</span>` : ''}</span>`;
  };

  /* Campo copiável (clipboard-text do zero-7, porte do Kumo): valor só de leitura, cortado com reticências, e o botão de
     copiar colado. Copia data-copy (o valor inteiro, sem máscara), não o texto da tela. Se a área de transferência falhar,
     o valor inteiro aparece selecionado, com a dica do atalho para copiar à mão. */
  const copyText = async (text, host) => {
    try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* tenta o caminho antigo */ }
    try { const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'; host.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return !!ok; } catch (_) { return false; }
  };
  C.copyfield = el => {
    el.classList.add('ac-copyfield');
    let val = $('.ac-copyfield__value', el);
    if (!val) { val = document.createElement('span'); val.className = 'ac-copyfield__value'; val.textContent = el.textContent.trim(); el.textContent = ''; el.appendChild(val); }
    const label = el.dataset.label || 'Copiar';
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ac-copyfield__btn'; btn.setAttribute('aria-label', label); btn.dataset.tip = 'Copiar';
    // os dois ícones ocupam o mesmo lugar e trocam por escala, opacidade e desfoque
    btn.innerHTML = `<span class="ac-copyfield__icons" aria-hidden="true">${icon('copy')}${icon('check')}</span>`;
    const live = document.createElement('span'); live.className = 'ac-sr'; live.setAttribute('aria-live', 'polite');
    const hint = document.createElement('p'); hint.className = 'ac-copyfield__hint'; hint.hidden = true;
    el.append(btn, live); el.after(hint);
    const tip = s => { btn.dataset.tip = s; const t = document.getElementById('ac-tip'); if (t && btn.getAttribute('aria-describedby') === 'ac-tip') t.textContent = s; };
    let t = 0;
    btn.addEventListener('click', async () => {
      const text = el.dataset.copy ?? val.textContent.trim(), ok = await copyText(text, el);
      if (!el.contains(document.activeElement)) btn.focus({ preventScroll: true });
      clearTimeout(t);
      if (ok) {
        // aviso no topo (data-toast="texto" troca a mensagem; data-toast="false" desliga). Com ele, a região viva do campo
        // fica calada para o leitor de tela não ouvir "Copiado" duas vezes.
        const tt = el.dataset.toast, withToast = tt !== 'false';
        if (withToast) toast({ type: 'success', variant: 'pill', title: tt && tt !== 'true' ? tt : 'Copiado', position: 'top', duration: 2400 });
        el.dataset.state = 'copied'; btn.setAttribute('aria-label', 'Copiado'); tip('Copiado'); live.textContent = withToast ? '' : 'Copiado'; hint.hidden = true;
        t = setTimeout(() => { delete el.dataset.state; btn.setAttribute('aria-label', label); tip('Copiar'); live.textContent = ''; }, 1500);
        el.dispatchEvent(new CustomEvent('ac:copy', { detail: { text }, bubbles: true }));
      } else {
        val.textContent = text; el.dataset.state = 'manual';
        const r = document.createRange(), s = getSelection(); r.selectNodeContents(val); s.removeAllRanges(); s.addRange(r);
        hint.hidden = false; hint.textContent = `Não deu para copiar sozinho. O texto está selecionado: use ${/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'}+C.`;
        live.textContent = hint.textContent;
      }
    });
  };

  /* Faixas de aviso em fila: aviso que vale para a conta inteira, um por vez, do mais grave ao
     mais leve (data-priority, ou o tom: crítico, perigo, atenção, ok, neutro). Com mais de um: setas, troca a cada 10 s
     (para no hover e no foco; nunca com movimento reduzido) e “Aviso 2 de 3” para o leitor de tela quando a pessoa
     troca. Trocas automáticas não são anunciadas. data-dismissible deixa dispensar (evento ac:dismiss). */
  const TONES = ['critico', 'perigo', 'atencao', 'ok', 'neutro'];
  C.banners = el => {
    el.classList.add('ac-banners');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'region');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Avisos da conta');
    const rank = b => b.dataset.priority !== undefined ? +b.dataset.priority : Math.max(0, TONES.indexOf(b.dataset.tone || 'neutro'));
    let items = $$(':scope > .ac-banners__item', el).map((b, k) => [b, k]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(x => x[0]);
    items.forEach(b => {
      // o conteúdo vai num miolo centralizado; o X fica na ponta
      const body = document.createElement('div'); body.className = 'ac-banners__body'; body.append(...b.childNodes); b.appendChild(body);
      body.insertAdjacentHTML('afterbegin', '<span class="ac-sr ac-banners__n"></span>');
      if (b.hasAttribute('data-dismissible')) b.insertAdjacentHTML('beforeend', `<button type="button" class="ac-banners__close" aria-label="Dispensar aviso">${icon('x')}</button>`);
      el.appendChild(b);
    });
    const nav = (d, l, ic) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'ac-banners__nav'; b.dataset.bn = d; b.setAttribute('aria-label', l); b.innerHTML = icon(ic); return b; };
    const prev = nav(-1, 'Aviso anterior', 'left'), next = nav(1, 'Próximo aviso', 'right');
    const live = document.createElement('span'); live.className = 'ac-sr'; live.setAttribute('aria-live', 'polite');
    el.prepend(prev); el.append(next, live);
    const ms = +el.dataset.interval || 10000;
    let i = 0, timer = 0, held = false;
    const text = b => ($('.ac-banners__long', b) || $('.ac-banners__text', b) || b).textContent.trim();
    const arm = () => { clearTimeout(timer); if (items.length < 2 || held || reduce()) return; timer = setTimeout(() => { if (!el.isConnected) return; if (!document.hidden) show(i + 1); else arm(); }, ms); };
    function show(n, say, pre = '') {
      if (!items.length) { el.hidden = true; return; }
      i = (n + items.length) % items.length; const cur = items[i], many = items.length > 1;
      items.forEach((b, k) => { b.hidden = b !== cur; $('.ac-banners__n', b).textContent = many ? `Aviso ${k + 1} de ${items.length}. ` : ''; });
      el.dataset.tone = cur.dataset.tone || 'neutro'; prev.hidden = next.hidden = !many;
      if (say) live.textContent = pre + (many ? `Aviso ${i + 1} de ${items.length}: ` : '') + text(cur);
      arm();
    }
    const hold = on => { held = on; arm(); };
    el.addEventListener('pointerenter', () => hold(true));
    el.addEventListener('pointerleave', () => hold(el.contains(document.activeElement)));
    el.addEventListener('focusin', () => hold(true));
    el.addEventListener('focusout', e => { if (!el.contains(e.relatedTarget)) hold(el.matches(':hover')); });
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-bn]'); if (b) { show(i + +b.dataset.bn, true); return; }
      const x = e.target.closest('.ac-banners__close'); if (!x) return;
      const it = x.closest('.ac-banners__item'), back = el.contains(document.activeElement);
      items = items.filter(o => o !== it); it.remove();
      el.dispatchEvent(new CustomEvent('ac:dismiss', { detail: { id: it.id || '' }, bubbles: true }));
      show(i, true, 'Aviso dispensado. ');
      if (back && items.length) { const c = items[i]; ($('.ac-banners__close', c) || (next.hidden ? $('a, button', c) : next)).focus(); }
    });
    show(0);
  };

  /* Diálogo em bottom sheet no celular (dialogo-teclado.js do zero-7): o teclado virtual não mexe em bottom: 0 nem em
     100dvh (no iOS nunca; no Chrome Android, por padrão). Quando ele cobre mais de 120 px e o campo focado está num
     .ac-dialog aberto, o <html> recebe --ac-keyboard-h (o sheet sobe isso) e --ac-visible-h (o teto do sheet), e o
     campo rola para dentro da vista. Soltar o foco ou fechar o diálogo devolve tudo. */
  (() => {
    const vv = global.visualViewport; if (!vv) return;
    const root = document.documentElement, phone = matchMedia('(max-width: 640px)');
    const FIELD = 'input:not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):not([type="range"]), textarea, select, [contenteditable="true"]';
    let raf = 0;
    const measure = () => {
      raf = 0;
      const covered = Math.round(innerHeight - (vv.height + vv.offsetTop)), a = document.activeElement;
      const f = phone.matches && covered > 120 && a && a.matches && a.matches(FIELD) && a.closest('dialog.ac-dialog[open]') ? a : null;
      if (f) { root.style.setProperty('--ac-keyboard-h', covered + 'px'); root.style.setProperty('--ac-visible-h', Math.round(vv.height) + 'px'); root.setAttribute('data-ac-keyboard', ''); requestAnimationFrame(() => reveal(f)); }
      else if (root.hasAttribute('data-ac-keyboard')) { root.style.removeProperty('--ac-keyboard-h'); root.style.removeProperty('--ac-visible-h'); root.removeAttribute('data-ac-keyboard'); }
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
    vv.addEventListener('resize', schedule); vv.addEventListener('scroll', schedule);
    document.addEventListener('focusin', schedule); document.addEventListener('focusout', schedule);
    document.addEventListener('close', schedule, true);
  })();

  /* Confirmar e alertar: diálogo montado na hora que devolve uma promessa.
     confirm: título, a consequência em texto, botão que repete o nome da ação e Cancelar com o foco inicial. Se onConfirm
     devolver uma promessa, o botão carrega e o diálogo espera; se ela falhar, o erro aparece dentro do diálogo.
     alert: uma mensagem e o OK. Ao fechar, o foco volta para onde estava. */
  function ask(o, only) {
    if (typeof o === 'string') o = { text: o };
    o = o || {};
    return new Promise(resolve => {
      const back = document.activeElement, u = id('ask'), dlg = document.createElement('dialog');
      dlg.className = 'ac ac-dialog ac-ask'; dlg.setAttribute('role', 'alertdialog'); dlg.setAttribute('aria-labelledby', u + 't');
      if (o.text) dlg.setAttribute('aria-describedby', u + 'd');
      dlg.innerHTML = `<div class="ac-dialog__in">${o.danger ? `<span class="ac-dialog__icon">${icon('alert')}</span>` : ''}<h2 class="ac-dialog__title" id="${u}t">${esc(o.title || (only ? 'Atenção' : 'Tem certeza?'))}</h2>${o.text ? `<p class="ac-dialog__desc" id="${u}d">${esc(o.text)}</p>` : ''}<p class="ac-error ac-ask__error" role="alert" hidden></p>
        <div class="ac-dialog__actions">${only ? '' : `<button class="ac-btn ac-btn--ghost" type="button" data-ask="0">${esc(o.cancelLabel || 'Cancelar')}</button>`}<button class="ac-btn${o.danger ? ' ac-btn--danger' : ''}" type="button" data-ask="1">${esc(only ? o.okLabel || 'OK' : o.confirmLabel || 'Confirmar')}</button></div></div>`;
      document.body.appendChild(dlg);
      const err = $('.ac-ask__error', dlg), yes = $('[data-ask="1"]', dlg), no = $('[data-ask="0"]', dlg);
      let value = false;
      dlg.addEventListener('close', () => { dlg.remove(); if (back && back.isConnected && back.focus) back.focus(); resolve(only ? undefined : value); }, { once: true });
      const done = v => { value = v; dlg.removeAttribute('aria-busy'); close(dlg); };
      const fail = e => { yes.dataset.loading = 'false'; dlg.removeAttribute('aria-busy'); if (no) no.disabled = false; err.hidden = false; err.innerHTML = icon('alert') + esc((e && e.message) || 'Não deu certo. Tente de novo.'); yes.focus(); };
      if (no) no.addEventListener('click', () => done(false));
      yes.addEventListener('click', () => {
        if (dlg.getAttribute('aria-busy') === 'true') return;
        if (only || !o.onConfirm) return done(true);
        err.hidden = true; let r;
        try { r = o.onConfirm(); } catch (e) { return fail(e); }
        if (!r || typeof r.then !== 'function') return done(true);
        yes.dataset.loading = 'true'; dlg.setAttribute('aria-busy', 'true'); if (no) no.disabled = true;
        r.then(() => { yes.dataset.loading = 'false'; done(true); }, fail);
      });
      open(dlg); (no || yes).focus();
    });
  }

  /* ---------------- init ---------------- */
  function init(root = document) {
    const els = $$('[data-ac]', root); if (root.matches && root.matches('[data-ac]')) els.unshift(root);
    els.forEach(el => {
      el.dataset.ac.split(/\s+/).forEach(name => {
        if (!C[name]) return; const flag = 'acInit' + name.replace(/-./g, m => m[1].toUpperCase());
        if (el.dataset[flag]) return; el.dataset[flag] = '1';
        try { C[name](el); } catch (err) { console.error('[Orthos] falha ao iniciar', name, err); }
      });
    });
  }

  global.Orthos = global.Seleta = global.Acervo = { init, reveal, toast, command, open, close, skeleton, icon, place, results: RESULTS, dirty: { baseline: dirtyBaseline, refresh: dirtyRefresh }, tour, countries: COUNTRIES, logo: { load: loadLogo, replay: replayLogo, screen: loadingScreen, sanitize: sanitizeSvg }, loading: loadingScreen, lightbox, transition, confirm: o => ask(o), alert: o => ask(o, true), components: C };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})(window);
