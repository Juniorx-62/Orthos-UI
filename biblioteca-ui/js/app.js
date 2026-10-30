/* Biblioteca de referências UI/UX — lógica. Sem dependências; funciona abrindo index.html direto do disco. */
(function () {
  'use strict';

  const META = window.LIB_META, REFS = window.LIB_REFS, LOC = window.LIB_LOCAL4SQUAD;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const main = $('#conteudo');

  if (!META || !REFS || !LOC) {
    main.innerHTML = '<div class="vazio"><h2>Não foi possível carregar os dados</h2><p>Os arquivos da pasta <code>data/</code> não foram encontrados. Verifique se a pasta da biblioteca está completa.</p></div>';
    return;
  }

  /* ---------------- utilidades ---------------- */
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // normaliza preservando o comprimento (necessário para destacar trechos)
  const norm = s => { let o = ''; for (const ch of String(s ?? '').toLowerCase()) { const b = ch.normalize('NFD')[0]; o += b.length === 1 ? b : ch; } return o; };
  const safeUrl = u => { try { const x = new URL(u); return (x.protocol === 'https:' || x.protocol === 'http:') ? x.href : ''; } catch (_) { return ''; } };
  const host = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (_) { return ''; } };
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (_) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (_) { return false; } }
  };
  const announce = t => { const a = $('#anuncio'); a.textContent = ''; setTimeout(() => { a.textContent = t; }, 30); };

  /* ---------------- dados ---------------- */
  const catById = Object.fromEntries(META.categorias.map(c => [c.id, c]));
  const fonteById = Object.fromEntries(META.fontes.map(f => [f.id, f]));
  const probById = Object.fromEntries(META.problemas.map(p => [p.id, p]));

  const PERS_KEY = 'uilib.pessoal.v1';
  const pers = Object.assign({ fav: [], notas: {}, tags: {}, hist: [], user: [] }, ls.get(PERS_KEY, {}));
  const savePers = () => ls.set(PERS_KEY, pers);

  let ITEMS = [], BY = {};
  function build() {
    const list = [];
    REFS.forEach(r => list.push(Object.assign({}, r, { origem: 'externa' })));
    LOC.telas.forEach(r => list.push(r));
    pers.user.forEach(u => list.push(Object.assign({}, u, { origem: 'pessoal', tipo: u.tipo || 'recurso', ctx: u.ctx || 'ambos', t: u.tags || [], d: u.desc || '' })));
    list.forEach(it => {
      it.d = it.d ?? it.desc ?? '';
      it.t = it.t ?? it.tags ?? [];
      it.p = it.p ?? it.problemas ?? [];
      const f = it.fonte && fonteById[it.fonte];
      it.tech = it.tech || (f && f.tech) || '';
      it._f = f || null;
      it.novo = it.origem === 'externa' || it.origem === 'pessoal';
      const cat = catById[it.cat];
      it._idx = {
        nome: norm(it.nome), tags: norm(it.t.concat(it.tags2 || []).join(' ')), cat: norm((cat && cat.nome) + ' ' + (META.tipos[it.tipo] || '')),
        desc: norm(it.d + ' ' + (it.pr || '')), uso: norm([it.u, it.e, it.o, it.a, it.area, it.grupo, it.rota].filter(Boolean).join(' ')),
        fonte: norm((f && f.nome) || '') + ' ' + norm(it.tech), prob: norm(it.p.map(id => probById[id] ? probById[id].nome + ' ' + probById[id].dica : '').join(' '))
      };
    });
    ITEMS = list; BY = Object.fromEntries(list.map(i => [i.id, i]));
  }
  build();

  // opções de filtro derivadas dos dados reais
  const techTokens = it => (it.tech || '').split(/[,;]/).map(s => s.trim()).filter(Boolean).filter(s => s.length < 28);

  /* ---------------- busca ---------------- */
  const STOP = new Set('de da do das dos com e para a o as os um uma em no na nos nas por que ao se'.split(' '));
  const SYN = [
    ['tabela', 'table', 'grid', 'grade', 'datagrid', 'listagem'], ['erro', 'error', 'falha', 'invalido', 'validacao', '404', '500'],
    ['modal', 'dialog', 'janela', 'popup', 'confirmacao', 'confirmar'], ['vazio', 'empty', 'sem resultados', 'nenhum'],
    ['filtro', 'filtros', 'filter', 'filtragem'], ['carregamento', 'loading', 'skeleton', 'spinner', 'progresso', 'carregando'],
    ['menu', 'sidebar', 'navegacao', 'nav', 'lateral'], ['formulario', 'form', 'campo', 'input'], ['excluir', 'exclusao', 'delete', 'apagar', 'remover', 'destrutivo'],
    ['celular', 'mobile', 'movel', 'responsivo', 'touch'], ['aviso', 'alerta', 'alert', 'banner', 'notificacao', 'toast', 'snackbar'],
    ['cor', 'cores', 'color', 'paleta', 'palette'], ['tema', 'dark', 'escuro', 'claro'], ['etapas', 'passos', 'wizard', 'stepper', 'steps'],
    ['busca', 'pesquisa', 'search', 'procurar'], ['salvar', 'salvamento', 'autosave', 'rascunho'], ['permissao', 'permissoes', 'acesso', '403', 'bloqueado']
  ].map(g => g.map(norm));
  function expand(tok) { for (const g of SYN) if (g.some(w => w === tok || (tok.length > 3 && (w.startsWith(tok) || tok.startsWith(w) && w.length > 3)))) return [...new Set([tok, ...g])]; return [tok]; }
  function parseQuery(q) {
    const toks = norm(q).split(/[^a-z0-9]+/).filter(t => t && !STOP.has(t));
    return toks.map(t => ({ t, alts: expand(t) }));
  }
  function score(it, terms) {
    if (!terms.length) return 1;
    let total = 0;
    for (const { alts } of terms) {
      let s = 0;
      for (const a of alts) {
        const exact = a === alts[0] ? 1 : 0.6; // termo digitado vale mais que sinônimo
        if (it._idx.nome.includes(a)) s = Math.max(s, 10 * exact);
        if (it._idx.tags.includes(a)) s = Math.max(s, 7 * exact);
        if (it._idx.cat.includes(a)) s = Math.max(s, 4 * exact);
        if (it._idx.prob.includes(a)) s = Math.max(s, 4 * exact);
        if (it._idx.desc.includes(a)) s = Math.max(s, 3 * exact);
        if (it._idx.uso.includes(a) || it._idx.fonte.includes(a)) s = Math.max(s, 2 * exact);
      }
      if (!s) return 0; // todos os termos precisam casar
      total += s;
    }
    return total;
  }
  function hl(text, terms) {
    const raw = String(text ?? '');
    if (!terms || !terms.length) return esc(raw);
    const n = norm(raw), ranges = [];
    terms.forEach(({ alts }) => alts.forEach(a => { if (a.length < 2) return; let i = -1; while ((i = n.indexOf(a, i + 1)) !== -1) ranges.push([i, i + a.length]); }));
    if (!ranges.length) return esc(raw);
    ranges.sort((x, y) => x[0] - y[0]);
    const merged = [ranges[0].slice()];
    for (const r of ranges.slice(1)) { const l = merged[merged.length - 1]; if (r[0] <= l[1]) l[1] = Math.max(l[1], r[1]); else merged.push(r.slice()); }
    let out = '', pos = 0;
    merged.forEach(([a, b]) => { out += esc(raw.slice(pos, a)) + '<mark>' + esc(raw.slice(a, b)) + '</mark>'; pos = b; });
    return out + esc(raw.slice(pos));
  }

  /* ---------------- estado e rotas ---------------- */
  const S = { q: '', f: { tipo: '', ctx: '', origem: '', acesso: '', tech: '', fav: false }, view: ls.get('uilib.vista', 'cards'), shown: 60, cmp: [], filtrosAbertos: false };
  const parseHash = () => { const h = decodeURIComponent(location.hash.replace(/^#\/?/, '')); const [a, b] = h.split('/'); return { a: a || '', b: b || '' }; };

  function isFav(id) { return pers.fav.includes(id); }
  function toggleFav(id) { const i = pers.fav.indexOf(id); if (i >= 0) pers.fav.splice(i, 1); else pers.fav.push(id); savePers(); renderNav(); }
  function pushHist(id) { pers.hist = [id, ...pers.hist.filter(x => x !== id)].slice(0, 40); savePers(); }
  function toggleCmp(id) { const i = S.cmp.indexOf(id); if (i >= 0) S.cmp.splice(i, 1); else if (S.cmp.length < 3) S.cmp.push(id); else { announce('Você pode comparar até 3 itens.'); return false; } renderNav(); return true; }

  /* ---------------- navegação lateral ---------------- */
  function countCat(id) { return id === 'X' ? LOC.pecas.length : ITEMS.filter(i => i.cat === id).length; }
  function renderNav() {
    const r = parseHash();
    const cur = (a, b) => (r.a === a && (b === undefined || r.b === b)) ? ' aria-current="page"' : '';
    const home = !r.a;
    let h = '<h2>Explorar</h2>';
    h += `<a href="#/"${home ? ' aria-current="page"' : ''}>Tudo <span class="n">${ITEMS.length}</span></a>`;
    h += '<h2>Categorias</h2>';
    META.categorias.forEach(c => { h += `<a href="#/c/${c.id}"${cur('c', c.id)}>${esc(c.id)} · ${esc(c.nome)} <span class="n">${countCat(c.id)}</span></a>`; });
    h += '<h2>Auditoria</h2>';
    h += `<a href="#/problemas"${(r.a === 'problemas') ? ' aria-current="page"' : ''}>Por problema observado <span class="n">${META.problemas.length}</span></a>`;
    h += `<a href="#/comparar"${cur('comparar')}>Comparar <span class="n">${S.cmp.length}/3</span></a>`;
    h += '<h2>Pessoal</h2>';
    h += `<a href="#/favoritos"${cur('favoritos')}>Favoritos <span class="n">${pers.fav.length}</span></a>`;
    h += `<a href="#/historico"${cur('historico')}>Histórico <span class="n">${pers.hist.length}</span></a>`;
    h += `<a href="#/recentes"${cur('recentes')}>Adicionadas recentemente <span class="n">${recentes().length}</span></a>`;
    h += '<h2>Fontes</h2>';
    h += `<a href="#/fontes"${cur('fontes')}>Fontes e verificação <span class="n">${META.fontes.length}</span></a>`;
    h += `<div class="nav__rodape"><button class="btn btn--sec btn--sm" id="btn-exp" type="button">Exportar dados pessoais</button><button class="btn btn--sec btn--sm" id="btn-imp" type="button">Importar dados pessoais</button><input type="file" id="file-imp" accept="application/json,.json" hidden><small>Favoritos, notas, tags e referências adicionadas ficam salvos neste navegador.</small><a class="btn btn--sec btn--sm" href="../">Orthos UI: componentes</a></div>`;
    $('#nav').innerHTML = h;
    $('#btn-exp').onclick = exportar; $('#btn-imp').onclick = () => $('#file-imp').click();
    $('#file-imp').onchange = e => importar(e.target.files[0]);
  }
  const recentes = () => { const lim = new Date(META.verificadoEm); lim.setDate(lim.getDate() - 30); return ITEMS.filter(i => i.novo && new Date(i.add) >= lim).sort((a, b) => (b.add || '').localeCompare(a.add || '') || (b._ord || 0) - (a._ord || 0)); };

  /* ---------------- filtros ---------------- */
  function applyFilters(list, extra) {
    return list.filter(it => {
      const f = S.f;
      if (f.tipo && it.tipo !== f.tipo) return false;
      if (f.ctx && !(it.ctx === f.ctx || it.ctx === 'ambos')) return false;
      if (f.origem === 'local' && it.origem !== '4squad') return false;
      if (f.origem === 'externa' && it.origem !== 'externa') return false;
      if (f.origem === 'pessoal' && it.origem !== 'pessoal') return false;
      if (f.acesso && !(it._f && it._f.acesso === f.acesso)) return false;
      if (f.tech && !techTokens(it).includes(f.tech)) return false;
      if (f.fav && !isFav(it.id)) return false;
      return extra ? extra(it) : true;
    });
  }
  function facetOptions(base) {
    const count = (fn) => { const m = new Map(); base.forEach(it => { const v = fn(it); (Array.isArray(v) ? v : [v]).filter(Boolean).forEach(x => m.set(x, (m.get(x) || 0) + 1)); }); return m; };
    return {
      tipo: count(i => i.tipo), ctx: count(i => i.ctx), origem: count(i => i.origem === '4squad' ? 'local' : i.origem),
      acesso: count(i => i._f && i._f.acesso), tech: count(techTokens)
    };
  }
  function selectHtml(id, label, opts, cur, labels) {
    const entries = [...opts.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
    if (entries.length < 1 && !cur) return '';
    return `<label class="sr" for="${id}">${esc(label)}</label><select id="${id}" data-f="${id.replace('f-', '')}"><option value="">${esc(label)}</option>${entries.map(([k, n]) => `<option value="${esc(k)}"${k === cur ? ' selected' : ''}>${esc((labels && labels[k]) || k)} (${n})</option>`).join('')}</select>`;
  }
  function filtersBar(base, resultCount, opts = {}) {
    const fo = facetOptions(base);
    const nAtivos = Object.entries(S.f).filter(([k, v]) => v).length;
    let h = '<div class="barra">';
    h += `<button class="btn btn--sec only-mobile" id="btn-filtros" type="button" aria-expanded="${S.filtrosAbertos}" aria-controls="filtros-in">Filtros${nAtivos ? ' (' + nAtivos + ')' : ''}</button>`;
    h += `<div class="filtros-in${S.filtrosAbertos ? ' aberto' : ''}" id="filtros-in">`;
    h += selectHtml('f-tipo', 'Tipo de referência', fo.tipo, S.f.tipo, META.tipos);
    h += selectHtml('f-ctx', 'Desktop ou mobile', fo.ctx, S.f.ctx, META.contextos);
    h += selectHtml('f-origem', 'Local ou externa', fo.origem, S.f.origem, { local: 'Local (4squad)', externa: 'Externa', pessoal: 'Adicionada por mim' });
    h += selectHtml('f-acesso', 'Acesso gratuito/pago', fo.acesso, S.f.acesso, META.acessos);
    h += selectHtml('f-tech', 'Tecnologia', fo.tech, S.f.tech);
    h += `<button class="btn btn--sec btn--sm" id="f-fav" type="button" aria-pressed="${S.f.fav}">★ Só favoritos</button>`;
    if (nAtivos) h += '<button class="btn btn--ghost btn--sm" id="f-limpar" type="button">Limpar filtros</button>';
    h += '</div>';
    if (!opts.semVista) {
      const temImg = base.some(i => i.imagens);
      h += `<span class="seg" role="group" aria-label="Visualização"><button type="button" data-vista="cards" aria-pressed="${S.view === 'cards'}">Cards</button><button type="button" data-vista="galeria" aria-pressed="${S.view === 'galeria'}"${temImg ? '' : ' disabled title="Sem imagens neste conjunto"'}>Galeria</button></span>`;
    }
    h += `<span class="total" aria-live="polite">${resultCount} ${resultCount === 1 ? 'resultado' : 'resultados'}</span></div>`;
    return h;
  }
  function bindFilters(rerender) {
    $$('select[data-f]', main).forEach(s => s.onchange = () => { S.f[s.dataset.f] = s.value; S.shown = 60; rerender(); });
    const fv = $('#f-fav'); if (fv) fv.onclick = () => { S.f.fav = !S.f.fav; S.shown = 60; rerender(); };
    const lm = $('#f-limpar'); if (lm) lm.onclick = () => { S.f = { tipo: '', ctx: '', origem: '', acesso: '', tech: '', fav: false }; S.shown = 60; rerender(); };
    const bf = $('#btn-filtros'); if (bf) bf.onclick = () => { S.filtrosAbertos = !S.filtrosAbertos; bf.setAttribute('aria-expanded', S.filtrosAbertos); $('#filtros-in').classList.toggle('aberto', S.filtrosAbertos); };
    $$('[data-vista]', main).forEach(b => b.onclick = () => { if (b.disabled) return; S.view = b.dataset.vista; ls.set('uilib.vista', S.view); rerender(); });
  }

  /* ---------------- cartões ---------------- */
  function badges(it) {
    let b = `<span class="badge">${esc(META.tipos[it.tipo] || it.tipo)}</span>`;
    if (it.origem === '4squad') b += '<span class="badge badge--ac">Local</span>';
    if (it.origem === 'pessoal') b += '<span class="badge badge--ac">Minha</span>';
    if (it.origem === 'externa' && it.add === META.verificadoEm) b += '<span class="badge badge--ok">Novo</span>';
    if (it.naoLido) b += '<span class="badge badge--warn" title="Conteúdo da fonte não lido neste ambiente">Conferir na fonte</span>';
    if (it._f && it._f.acesso === 'pago') b += '<span class="badge badge--warn">Pago</span>';
    if (it._f && it._f.acesso === 'misto') b += '<span class="badge badge--warn">Parte paga</span>';
    return b;
  }
  function cardHtml(it, terms) {
    const fav = isFav(it.id), c = S.cmp.includes(it.id);
    const origem = it._f ? it._f.nome : (it.origem === '4squad' ? '4squad' : (it.url ? host(it.url) : ''));
    return `<article class="card" data-id="${esc(it.id)}">
      <button class="fav" type="button" aria-pressed="${fav}" aria-label="${fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}: ${esc(it.nome)}" data-fav="${esc(it.id)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"/></svg></button>
      <div class="card__topo">${badges(it)}<span class="badge">${esc(it.cat)}</span></div>
      <h3><a href="#/item/${encodeURIComponent(it.id)}">${hl(it.nome, terms)}</a></h3>
      <p>${hl(it.d, terms)}</p>
      <div class="card__tags">${it.t.slice(0, 3).map(t => `<span class="tag">${hl(t, terms)}</span>`).join('')}</div>
      <div class="card__fim"><span>${esc(origem)}</span><button class="btn btn--ghost btn--sm cmp" type="button" data-cmp="${esc(it.id)}" aria-pressed="${c}">${c ? 'Na comparação' : 'Comparar'}</button></div>
    </article>`;
  }
  function fotoHtml(it, terms) {
    const tema = temaAtual(); const src = it.imagens[tema] || it.imagens.claro;
    return `<figure class="foto${it.cat === 'H' && it.ctx === 'mobile' ? ' foto--cel' : ''}"><a class="img" href="#/item/${encodeURIComponent(it.id)}" aria-label="Abrir ${esc(it.nome)}"><img src="${esc(src)}" alt="${esc(it.nome)}, tema ${tema}" loading="lazy" data-fallback></a><figcaption><b>${hl(it.nome, terms)}</b><span>${esc(it.area || '')} · ${esc(it.rota || '')}</span></figcaption></figure>`;
  }
  function bindCards() {
    $$('[data-fav]', main).forEach(b => b.onclick = e => { e.preventDefault(); toggleFav(b.dataset.fav); const on = isFav(b.dataset.fav); b.setAttribute('aria-pressed', on); announce(on ? 'Adicionado aos favoritos' : 'Removido dos favoritos'); if (S.f.fav || parseHash().a === 'favoritos') route(); });
    $$('[data-cmp]', main).forEach(b => b.onclick = e => { e.preventDefault(); if (toggleCmp(b.dataset.cmp)) { const on = S.cmp.includes(b.dataset.cmp); b.setAttribute('aria-pressed', on); b.textContent = on ? 'Na comparação' : 'Comparar'; } });
    $$('img[data-fallback]', main).forEach(img => img.addEventListener('error', () => { img.replaceWith(Object.assign(document.createElement('span'), { className: 'semimg', textContent: 'Imagem indisponível' })); }, { once: true }));
  }
  function listHtml(items, terms) {
    if (S.view === 'galeria' && items.some(i => i.imagens)) {
      const withImg = items.filter(i => i.imagens);
      return `<div class="galeria">${withImg.slice(0, S.shown).map(i => fotoHtml(i, terms)).join('')}</div>` + maisBtn(withImg.length);
    }
    return `<div class="grade">${items.slice(0, S.shown).map(i => cardHtml(i, terms)).join('')}</div>` + maisBtn(items.length);
  }
  const maisBtn = n => n > S.shown ? `<div class="mais"><button class="btn btn--sec" id="btn-mais" type="button">Mostrar mais (${Math.min(60, n - S.shown)} de ${n - S.shown} restantes)</button></div>` : '';
  function emptyHtml(msg) {
    return `<div class="vazio"><h2>${esc(msg || 'Nenhuma referência encontrada')}</h2><p>Tente outros termos, remova filtros ou procure por problema observado. Termos relacionados como “tabela”, “erro” e “modal” também funcionam.</p><div><a class="btn btn--sec" href="#/problemas">Ver por problema</a> <button class="btn btn--ghost" id="btn-reset" type="button">Limpar busca e filtros</button></div></div>`;
  }
  function bindMais(rerender) { const m = $('#btn-mais'); if (m) m.onclick = () => { S.shown += 60; rerender(); }; const r = $('#btn-reset'); if (r) r.onclick = () => { S.q = ''; $('#q').value = ''; S.f = { tipo: '', ctx: '', origem: '', acesso: '', tech: '', fav: false }; location.hash = '#/'; rerender(); }; }

  /* ---------------- views ---------------- */
  function viewExplorar(catId, probId) {
    const terms = parseQuery(S.q);
    let base = catId ? ITEMS.filter(i => i.cat === catId) : ITEMS.slice();
    if (probId) base = base.filter(i => i.p.includes(probId));
    const matched = base.map(i => [i, score(i, terms)]).filter(([, s]) => s > 0);
    const facets = matched.map(([i]) => i);
    let items = applyFilters(facets);
    const scoreOf = new Map(matched);
    items.sort((a, b) => (terms.length ? scoreOf.get(b) - scoreOf.get(a) : 0) || a.cat.localeCompare(b.cat) || a.nome.localeCompare(b.nome, 'pt-BR'));
    const cat = catId && catById[catId], prob = probId && probById[probId];
    let h = '<div class="cab">';
    if (prob) h += `<div class="crumbs"><a href="#/problemas">Por problema</a> › ${esc(prob.nome)}</div><h1>${esc(prob.nome)}</h1><p>${esc(prob.dica)} Referências que ajudam a resolver ou justificar a correção:</p>`;
    else if (cat) h += `<h1>${esc(cat.id)} · ${esc(cat.nome)}</h1><p>${esc(cat.desc)}</p>`;
    else h += `<h1>Biblioteca de referências UI/UX</h1><p>Componentes, padrões e telas para consulta durante auditorias. ${ITEMS.length} referências em ${META.categorias.length - 1} categorias, com fontes verificadas em ${esc(META.verificadoEm.split('-').reverse().join('/'))}.</p>`;
    if (S.q) h += `<p>Resultados para “<strong>${esc(S.q)}</strong>”</p>`;
    h += '</div>';
    if (!catId && !probId && !S.q) h += `<div class="chips" aria-label="Atalhos por problema">${META.problemas.slice(0, 8).map(p => `<a class="chip" href="#/problemas/${p.id}">${esc(p.nome)}</a>`).join('')}<a class="chip" href="#/problemas">Todos os problemas →</a></div>`;
    h += filtersBar(facets, items.length);
    h += items.length ? listHtml(items, terms) : emptyHtml();
    main.innerHTML = h;
    bindFilters(() => viewExplorar(catId, probId)); bindCards(); bindMais(() => viewExplorar(catId, probId));
    announce(items.length + ' resultados');
  }

  function viewLista(titulo, desc, ids, vazioMsg) {
    const items = ids.map(id => BY[id]).filter(Boolean);
    let h = `<div class="cab"><h1>${esc(titulo)}</h1><p>${esc(desc)}</p></div>`;
    h += items.length ? `<div class="grade">${items.map(i => cardHtml(i, [])).join('')}</div>` : `<div class="vazio"><h2>${esc(vazioMsg)}</h2><p>Use a estrela nos cards para guardar referências aqui.</p><a class="btn" href="#/">Explorar a biblioteca</a></div>`;
    main.innerHTML = h; bindCards();
  }

  function viewProblemas() {
    const cnt = id => ITEMS.filter(i => i.p.includes(id)).length;
    main.innerHTML = `<div class="cab"><h1>Por problema observado</h1><p>Parta do que você viu no projeto auditado e chegue a alternativas concretas. Cada problema reúne os componentes e padrões cadastrados que o resolvem.</p></div><div class="probs">${META.problemas.map(p => `<a class="prob" href="#/problemas/${p.id}"><b>${esc(p.nome)}</b><span>${esc(p.dica)}</span><br><small>${cnt(p.id)} ${cnt(p.id) === 1 ? 'referência' : 'referências'}</small></a>`).join('')}</div>`;
  }

  function viewFontes() {
    const ordem = { verificado: 0, parcial: 1, bloqueado: 2, 'nao-verificado': 3 };
    const rot = { verificado: ['Verificada', 'ok'], parcial: ['Parcial', 'warn'], bloqueado: ['Acesso limitado', 'warn'], 'nao-verificado': ['Não verificada', 'err'] };
    const fs = META.fontes.slice().sort((a, b) => ordem[a.status] - ordem[b.status] || a.nome.localeCompare(b.nome));
    const n = id => ITEMS.filter(i => i.fonte === id).length;
    let h = `<div class="cab"><h1>Fontes e verificação</h1><p>Cada fonte foi consultada em ${esc(META.verificadoEm.split('-').reverse().join('/'))}. “Verificada” significa que a página foi aberta e o conteúdo conferido; “Parcial” significa que só a página inicial ou os títulos foram conferidos; “Acesso limitado” indica bloqueio, login ou pagamento; nada foi presumido. Licenças só aparecem quando confirmadas.</p></div>`;
    h += '<div class="tabela-wrap"><table><thead><tr><th>Fonte</th><th>Material</th><th>Acesso</th><th>Licença</th><th>Verificação</th><th>Itens</th></tr></thead><tbody>';
    fs.forEach(f => {
      const [lab, cls] = rot[f.status]; const u = safeUrl(f.url);
      h += `<tr><td><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(f.nome)}</a><br><small>${esc(host(f.url))}</small></td><td>${esc(f.material)}<br><small>${esc(f.util)}</small></td><td>${esc(META.acessos[f.acesso])}${f.acessoNota ? '<br><small>' + esc(f.acessoNota) + '</small>' : ''}</td><td>${esc(f.licenca)}</td><td><span class="badge badge--${cls}">${lab}</span>${f.statusNota ? '<br><small>' + esc(f.statusNota) + '</small>' : ''}</td><td>${n(f.id)}</td></tr>`;
    });
    main.innerHTML = h + '</tbody></table></div>';
  }

  function viewPecas() {
    const q = norm(S.q), tipo = S.pecaTipo || '';
    let list = LOC.pecas.filter(p => (!tipo || p.tipoPeca === tipo) && (!q || norm(p.nome + ' ' + p.arquivo + ' ' + p.desc).includes(q)));
    const groups = new Map(); list.forEach(p => groups.set(p.arquivo, [...(groups.get(p.arquivo) || []), p]));
    let h = `<div class="cab"><h1>X · Código do 4squad (peças)</h1><p>Inventário do que <code>components/base</code> exporta no projeto original: ${LOC.pecas.length} peças (componentes, hooks e funções) com a descrição escrita no código.</p></div>`;
    h += `<div class="barra"><label class="sr" for="f-peca">Tipo de peça</label><select id="f-peca"><option value="">Todos os tipos</option>${['componente', 'hook', 'funcao'].map(t => `<option value="${t}"${t === tipo ? ' selected' : ''}>${{ componente: 'Componentes', hook: 'Hooks', funcao: 'Funções' }[t]}</option>`).join('')}</select><span class="total" aria-live="polite">${list.length} peças</span></div>`;
    if (!list.length) h += emptyHtml('Nenhuma peça encontrada');
    groups.forEach((arr, arq) => { h += `<h2 class="grupo-t">${esc(arq)}</h2><div class="lista">${arr.map(p => `<div class="item-p"><code>${esc(p.tipoPeca === 'componente' ? '<' + p.nome + '>' : p.nome)}</code><p>${esc(p.desc || 'Sem descrição no código.')}</p></div>`).join('')}</div>`; });
    main.innerHTML = h;
    const s = $('#f-peca'); if (s) s.onchange = () => { S.pecaTipo = s.value; viewPecas(); };
    bindMais(viewPecas);
  }

  function viewComparar() {
    const items = S.cmp.map(id => BY[id]).filter(Boolean);
    let h = '<div class="cab"><h1>Comparar alternativas</h1><p>Selecione até 3 referências com o botão “Comparar” nos cards ou nas fichas.</p></div>';
    if (items.length < 2) {
      h += `<div class="vazio"><h2>${items.length ? 'Escolha pelo menos mais uma referência' : 'Nada para comparar ainda'}</h2><p>A comparação funciona melhor com itens do mesmo tipo de componente, por exemplo, três diálogos de confirmação ou três tabelas.</p><a class="btn" href="#/">Escolher referências</a></div>`;
      if (items.length) h += `<div class="grade" style="margin-top:16px">${items.map(i => cardHtml(i, [])).join('')}</div>`;
    } else {
      const rows = [['Tipo', i => META.tipos[i.tipo]], ['Categoria', i => (catById[i.cat] || {}).nome], ['Descrição', i => i.d], ['Problema resolvido', i => i.pr], ['Quando usar', i => i.u], ['Quando evitar', i => i.e], ['Estados', i => (i.est || []).join(', ')], ['Acessibilidade', i => i.a], ['Contexto', i => META.contextos[i.ctx]], ['Tecnologia', i => i.tech], ['Acesso', i => i._f ? META.acessos[i._f.acesso] : ''], ['Licença', i => i._f ? i._f.licenca : ''], ['Fonte', i => i.url ? host(i.url) : (i.origem === '4squad' ? '4squad (local)' : '')]];
      h += '<div class="tabela-wrap"><table class="cmp-tab"><thead><tr><th></th>' + items.map(i => `<th scope="col"><a href="#/item/${encodeURIComponent(i.id)}">${esc(i.nome)}</a></th>`).join('') + '</tr></thead><tbody>';
      rows.forEach(([lab, fn]) => { if (items.some(i => fn(i))) h += `<tr><th scope="row">${esc(lab)}</th>${items.map(i => `<td>${esc(fn(i) || '—')}</td>`).join('')}</tr>`; });
      h += '</tbody></table></div>';
    }
    if (items.length) h += '<p style="margin-top:14px"><button class="btn btn--ghost" id="cmp-limpar" type="button">Limpar comparação</button></p>';
    main.innerHTML = h; bindCards();
    const l = $('#cmp-limpar'); if (l) l.onclick = () => { S.cmp = []; renderNav(); viewComparar(); };
  }

  function viewItem(id) {
    const it = BY[id];
    if (!it) { main.innerHTML = '<div class="vazio"><h2>Referência não encontrada</h2><p>O link pode estar desatualizado.</p><a class="btn" href="#/">Voltar à biblioteca</a></div>'; return; }
    pushHist(id); renderNav();
    const cat = catById[it.cat], f = it._f, fav = isFav(id), cmp = S.cmp.includes(id);
    const sec = (t, body) => body ? `<section><h2>${esc(t)}</h2>${body}</section>` : '';
    const para = s => s ? `<p>${esc(s)}</p>` : '';
    const lista = a => a && a.length ? `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
    const fonteUrl = it.url ? safeUrl(it.url) : '';
    let main_ = '';
    main_ += `<div class="cab"><div class="crumbs"><a href="#/">Biblioteca</a> › <a href="#/c/${esc(it.cat)}">${esc(cat ? cat.nome : '')}</a></div><h1>${esc(it.nome)}</h1><div class="card__topo" style="padding:0;margin-top:8px">${badges(it)}</div></div>`;
    main_ += `<div class="linha-acoes"><button class="btn btn--sec" id="i-fav" type="button" aria-pressed="${fav}">${fav ? '★ Nos favoritos' : '☆ Favoritar'}</button><button class="btn btn--sec" id="i-cmp" type="button" aria-pressed="${cmp}">${cmp ? 'Na comparação' : 'Comparar'}</button>${fonteUrl ? `<a class="btn" href="${esc(fonteUrl)}" target="_blank" rel="noopener noreferrer">Abrir fonte original ↗</a>` : ''}${it.origem === 'pessoal' ? '<button class="btn btn--perigo" id="i-del" type="button">Excluir</button>' : ''}</div>`;
    if (it.imagens) {
      const tema = temaAtual();
      main_ += `<section><h2>Referência visual</h2><div class="ficha__img"><button type="button" id="i-zoom" aria-label="Ampliar imagem"><img id="i-img" src="${esc(it.imagens[tema] || it.imagens.claro)}" alt="Captura de tela: ${esc(it.nome)}" data-fallback></button><div class="seg" role="group" aria-label="Tema da captura"><button type="button" data-tema-img="claro" aria-pressed="${tema === 'claro'}">Claro</button><button type="button" data-tema-img="escuro" aria-pressed="${tema === 'escuro'}">Escuro</button></div></div><p style="margin-top:6px;color:var(--tx3);font-size:13px">Captura do sistema 4squad com dados fictícios, tirada da biblioteca original.</p></section>`;
    }
    main_ += sec('Descrição', para(it.d)) + sec('Problema resolvido', para(it.pr)) + sec('Quando utilizar', para(it.u)) + sec('Quando evitar', para(it.e)) + sec('Variantes', lista(it.vars)) + sec('Estados', lista(it.est)) + sec('Responsividade', para(it.resp)) + sec('Acessibilidade', para(it.a)) + sec('Observações de auditoria', para(it.o));
    if (it.naoLido) main_ += '<div class="aviso">O texto desta página não pôde ser lido neste ambiente (renderizada por JavaScript, acesso bloqueado ou erro de certificado). A descrição é um resumo do curador: confira os detalhes na fonte original.</div>';
    if (it.tipo === 'inspiracao') main_ += '<div class="aviso aviso--info">Referência de inspiração: serve para repertório visual e não comprova, por si só, boa usabilidade.</div>';
    if (it.origem === '4squad') main_ += sec('Sobre o item', `<p>Item preservado da biblioteca original do 4squad${it.area ? ` (${esc(it.area)})` : ''}${it.rota ? `, rota <code>${esc(it.rota)}</code>` : ''}. Os dados exibidos são fictícios.</p>`);
    // relacionados
    const rel = ITEMS.filter(o => o.id !== id && (o.p.some(p => it.p.includes(p)) || o.t.some(t => it.t.includes(t))) && o.cat === it.cat).slice(0, 6);
    if (rel.length) main_ += `<section><h2>Alternativas e relacionados</h2><ul class="rel">${rel.map(o => `<li><a href="#/item/${encodeURIComponent(o.id)}">${esc(o.nome)}</a> <span class="badge">${esc(META.tipos[o.tipo])}</span></li>`).join('')}</ul></section>`;
    const probs = it.p.map(p => probById[p]).filter(Boolean);
    if (probs.length) main_ += `<section><h2>Ajuda a corrigir</h2><div class="chips">${probs.map(p => `<a class="chip" href="#/problemas/${p.id}">${esc(p.nome)}</a>`).join('')}</div></section>`;

    let lado = '<div class="box"><h3>Ficha</h3><dl>';
    lado += `<dt>Categoria</dt><dd>${esc(it.cat)} · ${esc(cat ? cat.nome : '')}</dd><dt>Tipo</dt><dd>${esc(META.tipos[it.tipo])}</dd><dt>Contexto</dt><dd>${esc(META.contextos[it.ctx] || '—')}</dd>`;
    if (it.tech) lado += `<dt>Tecnologia</dt><dd>${esc(it.tech)}</dd>`;
    if (f) lado += `<dt>Fonte</dt><dd>${esc(f.nome)}</dd><dt>Acesso</dt><dd>${esc(META.acessos[f.acesso])}${f.acessoNota ? '<br><small>' + esc(f.acessoNota) + '</small>' : ''}</dd><dt>Licença / restrições</dt><dd>${esc(f.licenca)}</dd><dt>Verificação</dt><dd>${esc({ verificado: 'Fonte verificada', parcial: 'Verificação parcial', bloqueado: 'Acesso limitado', 'nao-verificado': 'Não verificada' }[f.status])}${f.statusNota ? '<br><small>' + esc(f.statusNota) + '</small>' : ''}<br><small>URL aberta em ${esc(META.verificadoEm.split('-').reverse().join('/'))}</small></dd>`;
    if (fonteUrl) lado += `<dt>URL</dt><dd><a href="${esc(fonteUrl)}" target="_blank" rel="noopener noreferrer">${esc(fonteUrl)}</a></dd>`;
    if (it.t.length) lado += `<dt>Tags</dt><dd>${it.t.map(t => `<span class="tag">${esc(t)}</span>`).join(' ')}</dd>`;
    lado += '</dl></div>';
    const minhasTags = pers.tags[id] || [];
    lado += `<div class="box"><h3>Minhas anotações</h3><div class="campo"><label for="i-notas">Como usar esta referência</label><textarea id="i-notas" maxlength="4000" placeholder="Ex.: usar na tela de usuários para substituir a tabela atual">${esc(pers.notas[id] || '')}</textarea><small id="i-salvo" aria-live="polite">As notas são salvas automaticamente neste navegador.</small></div><div class="campo" style="margin-top:10px"><label for="i-tags">Minhas tags (separadas por vírgula)</label><input id="i-tags" maxlength="200" value="${esc(minhasTags.join(', '))}"></div></div>`;
    main.innerHTML = `<div class="ficha"><div class="ficha__main">${main_}</div><aside class="lado" aria-label="Detalhes">${lado}</aside></div>`;

    $('#i-fav').onclick = () => { toggleFav(id); viewItem(id); };
    $('#i-cmp').onclick = () => { if (toggleCmp(id)) viewItem(id); };
    const del = $('#i-del'); if (del) del.onclick = () => { if (confirm('Excluir esta referência adicionada por você?')) { pers.user = pers.user.filter(u => u.id !== id); delete pers.notas[id]; delete pers.tags[id]; pers.fav = pers.fav.filter(x => x !== id); pers.hist = pers.hist.filter(x => x !== id); savePers(); build(); renderNav(); location.hash = '#/'; } };
    let tmr; const nt = $('#i-notas');
    nt.oninput = () => { clearTimeout(tmr); tmr = setTimeout(() => { if (nt.value.trim()) pers.notas[id] = nt.value; else delete pers.notas[id]; const ok = savePers(); $('#i-salvo').textContent = ok ? 'Salvo.' : 'Não foi possível salvar neste navegador.'; }, 400); };
    const tg = $('#i-tags'); tg.onchange = () => { const arr = tg.value.split(',').map(s => s.trim()).filter(Boolean).slice(0, 12); if (arr.length) pers.tags[id] = arr; else delete pers.tags[id]; savePers(); };
    $$('[data-tema-img]').forEach(b => b.onclick = () => { const t = b.dataset.temaImg; $('#i-img').src = it.imagens[t]; $$('[data-tema-img]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
    const z = $('#i-zoom'); if (z) z.onclick = () => { const d = $('#dlg-img'); d.innerHTML = `<img src="${esc($('#i-img').getAttribute('src'))}" alt="${esc(it.nome)}"><div class="dlg__acoes"><button class="btn btn--sec" type="button" id="img-fechar">Fechar</button></div>`; d.showModal(); $('#img-fechar').onclick = () => d.close(); };
    bindCards();
    main.focus({ preventScroll: true });
  }

  /* ---------------- adicionar / exportar / importar ---------------- */
  function dlgAdicionar() {
    const d = $('#dlg-add');
    d.innerHTML = `<form method="dialog" class="dlg__in" id="form-add" novalidate>
      <h2 id="dlg-add-t">Adicionar referência</h2>
      <div class="campo"><label for="a-nome">Nome</label><input id="a-nome" required maxlength="120"><span class="err" id="e-nome"></span></div>
      <div class="campo"><label for="a-url">URL da fonte original</label><input id="a-url" type="url" inputmode="url" placeholder="https://…" maxlength="500"><small>Apenas http(s). A URL não é aberta automaticamente.</small><span class="err" id="e-url"></span></div>
      <div class="campo"><label for="a-cat">Categoria</label><select id="a-cat">${META.categorias.filter(c => c.id !== 'X').map(c => `<option value="${c.id}">${esc(c.id)} · ${esc(c.nome)}</option>`).join('')}</select></div>
      <div class="campo"><label for="a-tipo">Tipo</label><select id="a-tipo">${Object.entries(META.tipos).filter(([k]) => k !== 'peca').map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('')}</select></div>
      <div class="campo"><label for="a-desc">Descrição</label><textarea id="a-desc" rows="3" maxlength="800"></textarea></div>
      <div class="campo"><label for="a-tags">Tags (separadas por vírgula)</label><input id="a-tags" maxlength="200"></div>
      <div class="dlg__acoes"><button class="btn btn--sec" type="button" id="a-cancel">Cancelar</button><button class="btn" type="submit" id="a-ok">Salvar</button></div>
    </form>`;
    d.showModal();
    $('#a-cancel').onclick = () => d.close();
    $('#form-add').onsubmit = e => {
      e.preventDefault();
      const nome = $('#a-nome').value.trim(), url = $('#a-url').value.trim();
      $('#e-nome').textContent = nome ? '' : 'Informe um nome.';
      const ok = url ? safeUrl(url) : '';
      $('#e-url').textContent = url && !ok ? 'URL inválida. Use um endereço http ou https.' : '';
      if (!nome || (url && !ok)) return;
      const id = 'u-' + Date.now().toString(36);
      pers.user.push({ id, nome, url: ok, cat: $('#a-cat').value, tipo: $('#a-tipo').value, desc: $('#a-desc').value.trim(), tags: $('#a-tags').value.split(',').map(s => s.trim()).filter(Boolean).slice(0, 12), add: new Date().toISOString().slice(0, 10), ctx: 'ambos' });
      savePers(); build(); renderNav(); d.close(); location.hash = '#/item/' + id;
    };
  }
  function exportar() {
    const blob = new Blob([JSON.stringify({ versao: 1, exportadoEm: new Date().toISOString(), pessoal: pers }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'biblioteca-ui-dados-pessoais.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  function importar(file) {
    if (!file) return;
    if (file.size > 1_000_000) { alert('Arquivo grande demais (limite de 1 MB).'); return; }
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const j = JSON.parse(rd.result), p = j && j.pessoal;
        if (!p || typeof p !== 'object') throw new Error('formato');
        const strs = a => Array.isArray(a) ? a.filter(x => typeof x === 'string').slice(0, 500) : [];
        const clean = { fav: strs(p.fav), hist: strs(p.hist).slice(0, 40), notas: {}, tags: {}, user: [] };
        Object.entries(p.notas || {}).slice(0, 1000).forEach(([k, v]) => { if (typeof v === 'string') clean.notas[k] = v.slice(0, 4000); });
        Object.entries(p.tags || {}).slice(0, 1000).forEach(([k, v]) => { if (Array.isArray(v)) clean.tags[k] = strs(v).slice(0, 12); });
        (Array.isArray(p.user) ? p.user : []).slice(0, 500).forEach(u => { if (u && typeof u.id === 'string' && /^u-[a-z0-9]+$/.test(u.id) && typeof u.nome === 'string' && catById[u.cat]) clean.user.push({ id: u.id, nome: u.nome.slice(0, 120), url: u.url ? safeUrl(u.url) : '', cat: u.cat, tipo: META.tipos[u.tipo] ? u.tipo : 'recurso', desc: String(u.desc || '').slice(0, 800), tags: strs(u.tags).slice(0, 12), add: /^\d{4}-\d{2}-\d{2}$/.test(u.add) ? u.add : META.verificadoEm, ctx: 'ambos' }); });
        if (!confirm('Importar substitui favoritos, notas, tags, histórico e referências pessoais atuais. Continuar?')) return;
        Object.assign(pers, clean); savePers(); build(); renderNav(); route(); announce('Dados importados.');
      } catch (_) { alert('Arquivo inválido. Use um arquivo exportado por esta biblioteca.'); }
    };
    rd.readAsText(file);
  }

  /* ---------------- tema ---------------- */
  const root = document.documentElement;
  const temaAtual = () => { const t = root.getAttribute('data-tema'); if (t === 'claro' || t === 'escuro') return t; return matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'; };
  $('#btn-tema').onclick = () => { const n = temaAtual() === 'escuro' ? 'claro' : 'escuro'; root.setAttribute('data-tema', n); try { localStorage.setItem('uilib.tema', n); } catch (_) {} const r = parseHash(); if (r.a === 'item' || S.view === 'galeria') route(); };

  /* ---------------- roteador ---------------- */
  function route() {
    const r = parseHash(); renderNav();
    if (r.a === 'item') viewItem(r.b);
    else if (r.a === 'c' && r.b === 'X') viewPecas();
    else if (r.a === 'c') viewExplorar(r.b);
    else if (r.a === 'problemas') r.b ? viewExplorar(null, r.b) : viewProblemas();
    else if (r.a === 'fontes') viewFontes();
    else if (r.a === 'comparar') viewComparar();
    else if (r.a === 'favoritos') viewLista('Favoritos', 'Referências que você marcou para consulta rápida.', pers.fav, 'Nenhum favorito ainda');
    else if (r.a === 'historico') viewLista('Histórico', 'Fichas que você abriu recentemente, da mais nova para a mais antiga.', pers.hist, 'Nenhuma ficha consultada ainda');
    else if (r.a === 'recentes') viewLista('Adicionadas recentemente', 'Referências incluídas nesta evolução da biblioteca e as que você adicionou nos últimos 30 dias.', recentes().map(i => i.id), 'Nada adicionado recentemente');
    else viewExplorar();
    if (r.a !== 'item') window.scrollTo({ top: 0 });
    closeNav();
  }
  window.addEventListener('hashchange', () => { S.shown = 60; route(); });

  /* ---------------- busca ---------------- */
  let qt; const qi = $('#q');
  $('#form-busca').onsubmit = e => e.preventDefault();
  qi.oninput = () => { clearTimeout(qt); qt = setTimeout(() => { S.q = qi.value; S.shown = 60; const r = parseHash(); if (['item', 'fontes', 'comparar', 'favoritos', 'historico', 'recentes', 'problemas'].includes(r.a) && !(r.a === 'problemas' && r.b)) { location.hash = '#/'; } else if (r.a === 'c' && r.b === 'X') viewPecas(); else route(); }, 160); };
  document.addEventListener('keydown', e => { if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !document.querySelector('dialog[open]')) { e.preventDefault(); qi.focus(); } });

  /* ---------------- menu mobile ---------------- */
  const nav = $('#nav'), veu = $('#veu'), bm = $('#btn-menu');
  function openNav() { nav.classList.add('is-aberto'); veu.hidden = false; bm.setAttribute('aria-expanded', 'true'); }
  function closeNav() { nav.classList.remove('is-aberto'); veu.hidden = true; bm.setAttribute('aria-expanded', 'false'); }
  bm.onclick = () => nav.classList.contains('is-aberto') ? closeNav() : openNav();
  veu.onclick = closeNav;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-aberto')) { closeNav(); bm.focus(); } });
  $('#btn-add').onclick = dlgAdicionar;

  // ordem estável para "recentes"
  ITEMS.forEach((i, n) => { i._ord = n; });
  route();
})();
