/* Site de documentação do Orthos UI: rotas, palco de preview, código e busca. */
(function () {
  'use strict';
  const D = window.DEMOS, H = window.DEMO_HOOKS || {}, A = window.Orthos;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const main = $('#main'), root = document.documentElement;
  const groups = [...new Set(D.map(d => d.grupo))];
  const ext = '<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"/></svg>';
  const copyIco = '<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"/><path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"/></svg>';
  const replayIco = '<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.0071 14.5662L19.3587 14.1731C18.7986 13.8508 18.3579 13.3564 18.102 12.7634L15.68 7.15102C15.5927 6.94865 15.4729 6.77988 15.328 6.64097C14.6876 6.02689 13.5808 6.28697 13.0432 6.99226C12.0506 8.29448 13.3839 9.52751 13.1022 10.6133L5.35908 6.26089C3.55799 5.28913 2.0024 7.87074 3.79277 9.06333L8.37607 11.6124C7.4934 12.765 5.25512 18.3551 8.12341 20.0599C8.28646 20.1568 8.4672 20.2213 8.64852 20.2773C8.76516 20.3134 8.88186 20.3496 8.99761 20.3857C9.8979 20.6667 11.6003 21.02 12.7668 20.9182C13.9811 20.8123 14.7421 21.4597 15.68 21.9995"/><path d="M9.36184 4.96447C9.75873 5.36011 11.4854 5.24597 12.1223 5.16653M9.36184 4.96447C8.96494 4.56883 8.95358 2.63679 9.03328 2.0019M9.36184 4.96447C10.3829 3.19624 14.4425 0.375691 18.4708 3.19624C20.4175 4.55924 20.6922 5.4182 21 5.99362"/></svg>';
  let mode = 'preview';

  /* ---------- tema ---------- */
  const dark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const syncTheme = () => { $('#theme-l').textContent = dark() ? 'Tema claro' : 'Tema escuro'; };
  $('#theme').onclick = () => { const t = dark() ? 'light' : 'dark'; root.dataset.theme = t; try { localStorage.setItem('orthos.theme', t); } catch (_) {} syncTheme(); };
  syncTheme();

  /* ---------- realce de HTML ---------- */
  function highlight(code) {
    return esc(code).replace(/(&lt;\/?)([a-z0-9-]+)/gi, '$1<span class="tk-tag">$2</span>')
      .replace(/([a-z-:]+)=(&quot;.*?&quot;|&#39;.*?&#39;)/gi, '<span class="tk-attr">$1</span>=<span class="tk-str">$2</span>')
      .split('\n').map(l => `<span class="ln">${l || ' '}</span>`).join('');
  }
  // remove os <svg> gigantes do código mostrado, para leitura
  // e troca as imagens geradas (data:) por um nome de arquivo
  const tidy = h => h.replace(/<svg class="ac-icon"[\s\S]*?<\/svg>/g, '<svg class="ac-icon">…</svg>').replace(/data:image\/[^"]+/g, 'foto.jpg');

  const INDEX_FIRST = 12; // a página inicial mostra 12 componentes; "Ver todos" abre o resto

  /* ---------- selo "novo" ----------
     Cada demo marca a data em que entrou (novo: 'AAAA-MM-DD'); o selo some sozinho depois de NOVO_DIAS.
     A suíte de testes recusa novo: true sem data, para nenhum componente ficar "novo" para sempre. */
  const NOVO_DIAS = 30;
  const isNew = d => { const t = Date.parse(d.novo || ''); return !isNaN(t) && Date.now() - t < NOVO_DIAS * 864e5; };

  /* ---------- navegação ---------- */
  // o menu é montado uma vez; nas trocas de página só muda o item marcado (mais leve e não mexe na rolagem do menu)
  function renderNav(cur) {
    const nav = $('#nav');
    if (!nav.firstChild) {
      let h = `<a class="nav__a" href="#/"><i></i>Introdução</a><a class="nav__a" href="#/padroes"><i></i>Padrões</a>`;
      groups.forEach(g => {
        h += `<div class="nav__g">${esc(g)}</div>`;
        D.filter(d => d.grupo === g).forEach(d => { h += `<a class="nav__a" href="#/${d.id}"><i></i>${esc(d.nome)}${isNew(d) ? '<span class="n">novo</span>' : ''}</a>`; });
      });
      nav.innerHTML = h;
    }
    const href = '#/' + (cur || '');
    nav.querySelector('[aria-current]')?.removeAttribute('aria-current');
    const on = nav.querySelector(`a[href="${href}"]`); if (on) { on.setAttribute('aria-current', 'page'); A.reveal(on); }
  }

  /* ---------- página de componente ---------- */
  function renderDoc(d) {
    const i = D.indexOf(d), prev = D[i - 1], next = D[i + 1];
    const code = tidy(d.html);
    main.innerHTML = `<div class="doc">
      <section class="stage" aria-label="Demonstração">
        <div class="stage__bar"><span class="stage__crumb">${esc(d.grupo)} / <b>${esc(d.nome)}</b></span>
          <div class="ac-segmented" data-ac="segmented" id="mode" aria-label="Visualização"><button type="button" value="preview" aria-pressed="${mode === 'preview'}">Preview</button><button type="button" value="code" aria-pressed="${mode === 'code'}">Código</button></div>
          <button class="ac-btn ac-btn--secondary ac-btn--sm stage__md" type="button" id="md-open">${A.icon('file')}Ver como Markdown</button></div>
        <div class="canvas" ${d.wide ? 'data-wide' : ''} ${mode === 'code' ? 'hidden' : ''}>
          <div class="canvas__tools"><button class="ac-btn ac-btn--secondary ac-btn--icon ac-btn--sm" type="button" id="replay" aria-label="Reiniciar demonstração" data-tip="Reiniciar">${replayIco}</button></div>
          <div class="canvas__inner" id="demo"></div>
        </div>
        <div class="code" ${mode === 'preview' ? 'hidden' : ''}><div class="code__bar"><span>${esc(d.id)}.html</span><button class="ac-btn ac-btn--ghost ac-btn--sm" type="button" id="copy-code">${copyIco}Copiar</button></div><pre><code>${highlight(code)}</code></pre></div>
      </section>
      <aside class="panel" aria-label="Documentação">
        <h1>${esc(d.nome)}</h1>
        <p class="lead">${esc(d.desc)}</p>
        ${!d.ref.nome ? '' : d.ref.url ? `<a class="ref" href="${esc(d.ref.url)}" target="_blank" rel="noopener noreferrer"><span><small>Referência estudada</small><b>${esc(d.ref.nome)}</b></span>${ext}</a>` : `<div class="ref"><span><small>Referência</small><b>${esc(d.ref.nome)}</b></span></div>`}
        ${guide(d)}
        <h2>Instalação</h2>
        <div class="snippet"><code>&lt;link rel="stylesheet" href="orthos.css"&gt; &lt;script src="orthos.js"&gt;&lt;/script&gt;</code><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-ac="copy" data-copy='<link rel="stylesheet" href="orthos.css">\n<script src="orthos.js"></script>' aria-label="Copiar instalação">${copyIco}</button></div>
        <h2>API</h2>
        <table class="api"><thead><tr><th>Propriedade</th><th>Descrição</th></tr></thead><tbody>${d.api.map(([p, t, def, desc]) => `<tr><td><code>${esc(p)}</code><small>${esc(t)}${def && def !== '—' ? ' · ' + esc(def) : ''}</small></td><td>${esc(desc)}</td></tr>`).join('')}</tbody></table>
        <h2>Acessibilidade</h2>
        <ul class="a11y">${d.a11y.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <nav class="pn" aria-label="Anterior e próximo">${prev ? `<a href="#/${prev.id}"><small>Anterior</small>${esc(prev.nome)}</a>` : '<span></span>'}${next ? `<a href="#/${next.id}"><small>Próximo</small>${esc(next.nome)}</a>` : ''}</nav>
      </aside></div>`;
    const mount = () => {
      cleanup();
      const demo = $('#demo'); demo.innerHTML = d.html; A.init(demo); H[d.id] && H[d.id](demo);
    };
    mount();
    A.init(main);
    $('#mode').addEventListener('ac:change', e => { mode = e.detail; $('.canvas').hidden = mode !== 'preview'; $('.code').hidden = mode !== 'code'; });
    $('#replay').onclick = mount;
    $('#md-open').onclick = () => showMarkdown(d);
    $('#copy-code').onclick = async () => { try { await navigator.clipboard.writeText(d.html); A.toast({ type: 'success', title: 'Código copiado' }); } catch (_) { A.toast({ type: 'danger', title: 'Não foi possível copiar' }); } };
  }

  // remove flutuantes órfãos da página anterior (pops, dicas e diálogos movidos para o <body>)
  function cleanup() {
    document.querySelectorAll('body > .ac-pop, body > .ac-tip').forEach(n => n.remove());
    document.querySelectorAll('body > dialog.ac-dialog:not(#ac-command):not(#md-dlg), body > dialog.ac-sheet').forEach(n => n.remove());
  }

  /* ---------- guia de uso e Markdown ---------- */
  const G = window.GUIA || {};
  function guide(d) {
    const g = G[d.id]; if (!g) return '';
    const list = (t, a, cls) => a && a.length ? `<h2>${t}</h2><ul class="a11y ${cls}">${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    return list('Quando usar', g.usar, 'is-yes') + list('Quando evitar', g.evitar, 'is-no') + list('Boas práticas', g.dicas, 'is-tip');
  }
  const cell = s => String(s).replace(/\|/g, '\\|');
  function markdown(d) {
    const g = G[d.id] || {}, li = a => (a || []).map(x => `- ${x}`).join('\n');
    const code = d.html.replace(/<svg class="ac-icon"[\s\S]*?<\/svg>/g, '<svg class="ac-icon">…</svg>');
    const fence = '```';
    return [`# ${d.nome}`, '', d.desc, '', `Grupo: ${d.grupo}${d.ref.nome ? ` · Referência estudada: ${d.ref.url ? `[${d.ref.nome}](${d.ref.url})` : d.ref.nome}` : ''}`, '',
      g.usar ? `## Quando usar\n\n${li(g.usar)}\n` : '', g.evitar ? `## Quando evitar\n\n${li(g.evitar)}\n` : '', g.dicas ? `## Boas práticas\n\n${li(g.dicas)}\n` : '',
      '## Instalação', '', fence + 'html', '<link rel="stylesheet" href="orthos.css">', '<script src="orthos.js"></script>', fence, '',
      '## API', '', '| Propriedade | Tipo | Padrão | Descrição |', '|---|---|---|---|', ...d.api.map(r => `| \`${cell(r[0])}\` | ${cell(r[1])} | ${cell(r[2])} | ${cell(r[3])} |`), '',
      '## Acessibilidade', '', li(d.a11y), '', '## Exemplo', '', fence + 'html', code, fence, ''].join('\n');
  }
  function showMarkdown(d) {
    let dlg = $('#md-dlg');
    if (!dlg) { dlg = document.createElement('dialog'); dlg.id = 'md-dlg'; dlg.className = 'ac ac-dialog md-dlg'; dlg.setAttribute('aria-labelledby', 'md-t'); document.body.appendChild(dlg); }
    const md = markdown(d);
    dlg.innerHTML = `<div class="ac-dialog__in"><h2 class="ac-dialog__title" id="md-t">${esc(d.nome)}.md</h2><pre class="md-pre" tabindex="0">${esc(md)}</pre><div class="ac-dialog__actions"><button class="ac-btn ac-btn--ghost" type="button" data-ac-close>Fechar</button><button class="ac-btn ac-btn--secondary" type="button" id="md-dl">Baixar .md</button><button class="ac-btn" type="button" id="md-copy">Copiar</button></div></div>`;
    A.open(dlg);
    $('#md-copy').onclick = async () => { try { await navigator.clipboard.writeText(md); A.toast({ type: 'success', title: 'Markdown copiado' }); } catch (_) { A.toast({ type: 'danger', title: 'Não foi possível copiar' }); } };
    $('#md-dl').onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' })); a.download = d.id + '.md'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); };
  }
  window.orthosMarkdown = markdown;

  /* ---------- página inicial ---------- */
  function renderHome() {
    const pick = id => D.find(d => d.id === id);
    const tile = (id, cls, inner) => `<article class="tile ${cls}"><div class="tile__label"><span>${esc(pick(id).nome)}</span><a href="#/${id}">Ver →</a></div><div class="tile__demo">${inner ?? pick(id).html}</div></article>`;
    main.innerHTML = `<div class="home">
      <header class="hero">
        <span class="ac-badge"><span class="ac-badge__dot ac-badge__dot--pulse" style="color:var(--ac-success)"></span>${D.length} componentes · sem dependências</span>
        <h1 class="ac-text-effect" data-ac="text-effect">Componentes calmos para produtos sérios.</h1>
        <p>Orthos UI é uma biblioteca em HTML, CSS e JavaScript puro, com padrões estudados em shadcn/ui, Radix, Kobra, Motion-Primitives, boneyard e outros. Cada peça é acessível, tem tema claro e escuro e funciona colando dois arquivos no projeto.</p>
        <div class="hero__cta"><a class="ac-btn ac-btn--lg" href="#/button" data-ac="magnetic" data-strength="0.2">Explorar componentes</a><button class="ac-btn ac-btn--lg ac-btn--secondary" type="button" id="hero-cmd">Buscar <kbd class="ac-kbd" style="margin-left:4px">Ctrl K</kbd></button></div>
      </header>
      <section class="showcase" aria-label="Destaques">
        ${tile('otp', 't7', '<div class="ac-otp" data-ac="otp" data-length="6" data-valid="888813"></div>')}
        ${tile('palette', 't5', '<div data-ac="palette" style="--size:170px"></div>')}
        ${tile('stats', 't5', `<article class="ac-card ac-spotlight" data-ac="spotlight" style="width:100%"><div class="ac-card__body"><div class="ac-stat__label">Receita <span class="ac-stat__delta ac-stat__delta--up">+18,2%</span></div><div class="ac-stat__value"><span data-ac="number" data-to="48290.5" data-decimals="2" data-prefix="R$ ">R$ 0</span></div><div data-ac="spark" data-values="12,18,15,22,19,28,26,34,31,40"></div></div></article>`)}
        ${tile('tabs', 't7')}
        ${tile('choice', 't4', '<div style="display:grid;gap:14px"><label class="ac-switch"><input type="checkbox" role="switch" checked><span>Modo foco</span></label><label class="ac-switch"><input type="checkbox" role="switch"><span>Sons</span></label><label class="ac-check"><input type="checkbox" checked><span>Resumo semanal</span></label></div>')}
        ${tile('toast', 't4', '<div class="ac-btn-group"><button class="ac-btn ac-btn--secondary" type="button" data-demo-toast="undo">Mover para lixeira</button></div>')}
        ${tile('text-shimmer', 't4', '<span class="ac-text-shimmer" style="font:500 18px var(--ac-font)">Gerando relatório…</span>')}
      </section>
      <div class="sec-h"><h2>Todos os componentes</h2><p>${groups.join(' · ')}</p></div>
      <section class="index" id="index" aria-label="Componentes">${D.map((d, i) => `<a href="#/${d.id}"${i >= INDEX_FIRST ? ' class="is-more"' : ''}><small>${esc(d.grupo)}</small><b>${esc(d.nome)}</b><span>${esc(d.desc)}</span></a>`).join('')}</section>
      <div class="index-more"><button class="ac-btn ac-btn--secondary" type="button" id="index-more" aria-controls="index" aria-expanded="false">Ver todos os ${D.length} componentes${A.icon('chevron')}</button></div>
      <div class="sec-h"><h2>Comece em um minuto</h2><p>Copie a pasta <code>src/</code> para o seu projeto.</p></div>
      <section class="start">
        <div class="code"><div class="code__bar"><span>index.html</span></div><pre><code>${highlight(`<link rel="stylesheet" href="orthos.css">\n\n<button class="ac-btn" data-ac-open="#confirm">Excluir</button>\n\n<dialog class="ac ac-dialog" id="confirm">\n  <div class="ac-dialog__in">\n    <h2 class="ac-dialog__title">Excluir projeto?</h2>\n    <button class="ac-btn" data-ac-close>Cancelar</button>\n  </div>\n</dialog>\n\n<script src="orthos.js"></script>`)}</code></pre></div>
        <div class="code"><div class="code__bar"><span>app.js</span></div><pre><code>${highlight(`// componentes declarativos: data-ac="tabs", "otp", "table"…\nOrthos.init(document);\n\n// APIs\nOrthos.toast({ type: 'success', title: 'Salvo' });\nOrthos.command({ items: [{ label: 'Abrir', run() {} }] });\nOrthos.skeleton(card, true);\n\n// eventos\notp.addEventListener('ac:complete', e => e.detail.valid);`)}</code></pre></div>
      </section>
      <footer class="foot">
        <div class="foot__grid">
          <div class="foot__brand">
            <a class="brand" href="#/" aria-label="Orthos UI, início"><svg class="brand__mark" aria-hidden="true"><use href="#orthos-mark"/></svg><span>Orthos</span><span class="brand__tag">UI</span></a>
            <p>HTML, CSS e JavaScript puro, acessível e com tema claro e escuro.</p>
            <ul class="foot__stats"><li><b>${D.filter(d => d.grupo !== 'Modelos').length}</b> componentes</li><li><b>${D.filter(d => d.grupo === 'Modelos').length}</b> modelos de tela</li><li><b>0</b> dependências</li></ul>
          </div>
          <nav class="foot__col" aria-label="Grupos de componentes"><h2>Componentes</h2><ul>${groups.map(g => { const list = D.filter(d => d.grupo === g); return `<li><a href="#/${list[0].id}">${esc(g)}</a> <span>${list.length}</span></li>`; }).join('')}</ul></nav>
          <nav class="foot__col" aria-label="Recursos"><h2>Recursos</h2><ul><li><a href="#/">Introdução</a></li><li><a href="#/padroes">Padrões</a></li><li><a href="tests/componentes.html">Testes no navegador</a></li><li><button type="button" class="foot__link" id="foot-cmd">Buscar <kbd class="ac-kbd">Ctrl K</kbd></button></li></ul></nav>
          <nav class="foot__col" aria-label="Referências estudadas"><h2>Referências estudadas</h2><ul>${[['shadcn/ui', 'https://ui.shadcn.com/'], ['Radix', 'https://www.radix-ui.com/'], ['Kobra', 'https://kobra.systems/'], ['Motion-Primitives', 'https://motion-primitives.com/'], ['Magic UI', 'https://magicui.design/'], ['boneyard', 'https://boneyard.vercel.app/'], ['GOV.UK', 'https://design-system.service.gov.uk/'], ['Carbon', 'https://carbondesignsystem.com/']].map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener noreferrer">${n}</a></li>`).join('')}</ul></nav>
        </div>
        <div class="foot__bottom"><span>© ${new Date().getFullYear()} Orthos UI · padrões estudados e reimplementados do zero, sem copiar código</span><span>Ícones <a href="https://hugeicons.com/" target="_blank" rel="noopener noreferrer">Hugeicons</a> (MIT) · Fotos <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">Unsplash</a></span><a href="#main" class="foot__top" id="foot-top">Voltar ao topo ↑</a></div>
      </footer>
    </div>`;
    A.init(main); H.toast($('.home', main));
    $('#hero-cmd').onclick = openSiteCommand; $('#foot-cmd').onclick = openSiteCommand;
    // "Ver todos": abre o resto da lista e leva o foco ao primeiro item novo
    const more = $('#index-more'), idx = $('#index');
    more.onclick = () => {
      const open = more.getAttribute('aria-expanded') !== 'true';
      idx.classList.toggle('is-open', open); more.setAttribute('aria-expanded', open);
      more.firstChild.textContent = open ? 'Mostrar menos' : `Ver todos os ${D.length} componentes`;
      if (open) $('.is-more', idx)?.focus(); else idx.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };
    $('#foot-top').onclick = e => { e.preventDefault(); scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); main.focus({ preventScroll: true }); };
  }

  /* ---------- busca (command palette) ---------- */
  function openSiteCommand() {
    A.command({
      placeholder: 'Buscar componentes e ações…',
      items: [
        ...D.map(d => ({ label: d.nome, group: d.grupo, hint: '', keywords: d.desc + ' ' + d.ref.nome, run: () => { location.hash = '#/' + d.id; } })),
        { label: 'Alternar tema claro/escuro', group: 'Ações', keywords: 'dark light escuro claro', run: () => $('#theme').click() },
        { label: 'Ir para a introdução', group: 'Ações', run: () => { location.hash = '#/'; } }
      ]
    });
  }
  window.openSiteCommand = openSiteCommand;
  ['#open-cmd', '#open-cmd-m'].forEach(s => $(s).onclick = () => { closeSide(); openSiteCommand(); });
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSiteCommand(); } });

  /* ---------- menu mobile ---------- */
  const side = $('#side'), veil = $('#veil'), so = $('#side-open'), narrow = matchMedia('(max-width: 860px)');
  // fechado no celular, o menu sai da tela e também da ordem do Tab
  const syncSide = () => { side.inert = narrow.matches && !side.classList.contains('is-open'); };
  const openSide = () => { side.classList.add('is-open'); veil.hidden = false; so.setAttribute('aria-expanded', 'true'); syncSide(); $('#side-close').focus(); };
  function closeSide() { side.classList.remove('is-open'); veil.hidden = true; so.setAttribute('aria-expanded', 'false'); syncSide(); }
  narrow.addEventListener('change', syncSide);
  so.onclick = openSide; $('#side-close').onclick = () => { closeSide(); so.focus(); }; veil.onclick = closeSide;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && side.classList.contains('is-open')) { closeSide(); so.focus(); } });

  /* ---------- rotas ---------- */
  function route() {
    const id = location.hash.replace(/^#\/?/, '');
    const d = D.find(x => x.id === id);
    renderNav(d && d.id);
    if (!d) cleanup();
    if (d) { renderDoc(d); document.title = `${d.nome} — Orthos UI`; }
    else if (id === 'padroes') { renderNav('padroes'); main.innerHTML = `<div class="home prose">${window.PADROES || ''}</div>`; document.title = 'Padrões — Orthos UI'; }
    else { renderHome(); document.title = 'Orthos UI — biblioteca de componentes'; }
    closeSide(); scrollTo({ top: 0 }); main.focus({ preventScroll: true });
  }
  // sem View Transition na navegação: a foto da página e o fade deixavam a troca pelo menu com cara de travada
  addEventListener('hashchange', route);
  route();
})();
