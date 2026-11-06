/* Markdown de cada componente ("Ver como Markdown"): documentação + tudo o que é preciso para recriá-lo sem a biblioteca.
   O CSS e o JS saem de src/orthos.css e src/orthos.js no momento em que o markdown é gerado, recortados para o
   componente: só as regras das famílias de classe que ele usa e só os trechos de JS de que o comportamento depende.
   Funciona no navegador (window.orthosMarkdown) e no Node (module.exports.build), para exportar os arquivos. */
(function (root) {
  'use strict';

  /* ---------- CSS: árvore de regras ---------- */
  function parseCss(src) {
    src = src.replace(/\r\n?/g, '\n');
    let i = 0;
    const skipStr = q => { i++; while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; } i++; };
    function block() {
      const out = [];
      let start = i;
      while (i < src.length) {
        const c = src[i];
        if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? src.length : e + 2; if (!src.slice(start, i).replace(/\/\*[\s\S]*?\*\//g, '').trim()) start = i; continue; }
        if (c === '"' || c === "'") { skipStr(c); continue; }
        if (c === '}') { i++; return out; }
        if (c === ';') { const t = src.slice(start, i).replace(/\/\*[\s\S]*?\*\//g, '').trim(); if (t) out.push({ type: 'stmt', text: t + ';' }); i++; start = i; continue; }
        if (c === '{') {
          const head = src.slice(start, i).replace(/\/\*[\s\S]*?\*\//g, '').trim(); i++;
          if (head[0] === '@' && !/^@(font-face|page|property|counter-style)\b/.test(head) && !/^@(-webkit-)?keyframes\b/.test(head)) out.push({ type: 'at', head, kids: block() });
          else { const b0 = i; let depth = 1; while (i < src.length && depth) { const ch = src[i]; if (ch === '"' || ch === "'") { skipStr(ch); continue; } if (ch === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 2; continue; } if (ch === '{') depth++; else if (ch === '}') depth--; i++; } out.push({ type: head[0] === '@' ? 'atblock' : 'rule', head, body: src.slice(b0, i - 1).trim() }); }
          start = i; continue;
        }
        i++;
      }
      return out;
    }
    return block();
  }
  // divide uma lista de seletores nas vírgulas de fora de parênteses e colchetes
  function splitTop(s, sep = ',') {
    const out = []; let d = 0, cur = '', q = '';
    for (const ch of s) {
      if (q) { cur += ch; if (ch === q) q = ''; continue; }
      if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
      if ('([{'.includes(ch)) d++; else if (')]}'.includes(ch)) d--;
      if (ch === sep && d === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  const family = c => c.split(/__|--/)[0];
  const acClasses = s => [...s.matchAll(/\.(ac-[\w-]+)/g)].map(m => m[1]);
  function filterCss(tree, keep, depth = 0) {
    const pad = '  '.repeat(depth), out = [];
    for (const n of tree) {
      if (n.type === 'rule') {
        const items = splitTop(n.head).filter(keep);
        if (items.length) out.push(`${pad}${items.join(', ')} { ${n.body.replace(/\s*\n\s*/g, ' ')} }`);
      } else if (n.type === 'at') {
        const inner = filterCss(n.kids, keep, depth + 1);
        if (inner.length) out.push(`${pad}${n.head} {\n${inner.join('\n')}\n${pad}}`);
      } else if (n.type === 'atblock') out.push({ kf: (n.head.match(/keyframes\s+([\w-]+)/) || [])[1], text: `${pad}${n.head} { ${n.body.replace(/\s*\n\s*/g, ' ')} }` });
    }
    return out;
  }
  // keyframes só entram se alguma regra (ou o JS) as usar
  function cssFor(tree, keep, alsoUses = '') {
    const all = filterCss(tree, keep), rules = all.filter(x => typeof x === 'string'), kfs = all.filter(x => typeof x !== 'string');
    const used = rules.join('\n') + '\n' + alsoUses;
    return rules.concat(kfs.filter(k => k.kf && new RegExp(`(^|[^\\w-])${k.kf}([^\\w-]|$)`).test(used)).map(k => k.text)).join('\n');
  }

  /* ---------- JS: trechos de primeiro nível e dependências ---------- */
  // tokenizador mínimo: identificadores (com profundidade e se vêm depois de ponto) e pontuação, pulando textos e comentários
  function tokens(src) {
    const out = []; let i = 0, depth = 0, last = '';
    const regexOk = () => !last || /[(,=:[!&|?{};+\-*%<>~^]$/.test(last) || /^(return|typeof|case|in|of|void|delete|new)$/.test(last);
    const push = t => { out.push(t); last = t.v; };
    const tmpl = () => { // `...${expr}...`
      i++;
      while (i < src.length && src[i] !== '`') {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === '$' && src[i + 1] === '{') { i += 2; const s = i; let d = 1; while (i < src.length && d) { if (src[i] === '{') d++; else if (src[i] === '}') d--; else if (src[i] === '`') { tmpl(); continue; } else if (src[i] === '"' || src[i] === "'") { const q = src[i++]; while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; } } i++; } tokens(src.slice(s, i - 1)).forEach(t => out.push({ ...t, depth: t.depth + depth + 1 })); continue; }
        i++;
      }
      i++; last = 'str';
    };
    while (i < src.length) {
      const c = src[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); i = e < 0 ? src.length : e + 2; continue; }
      if (c === '"' || c === "'") { const s = ++i; while (i < src.length && src[i] !== c) { if (src[i] === '\\') i++; i++; } out.push({ t: 'str', v: src.slice(s, i), depth }); i++; last = 'str'; continue; }
      if (c === '`') { tmpl(); continue; }
      if (c === '/' && regexOk()) { i++; let cls = false; while (i < src.length && (src[i] !== '/' || cls)) { if (src[i] === '\\') i++; else if (src[i] === '[') cls = true; else if (src[i] === ']') cls = false; i++; } i++; while (/[a-z]/i.test(src[i] || '')) i++; last = 'str'; continue; }
      if (/[A-Za-z_$]/.test(c)) { const s = i; while (/[\w$]/.test(src[i] || '')) i++; push({ t: 'id', v: src.slice(s, i), dot: last === '.', depth }); continue; }
      if (/[0-9]/.test(c)) { while (/[\w.]/.test(src[i] || '')) i++; last = 'num'; continue; }
      if ('([{'.includes(c)) { push({ t: 'p', v: c, depth }); depth++; i++; continue; }
      if (')]}'.includes(c)) { depth--; push({ t: 'p', v: c, depth }); i++; continue; }
      if (c === '=' && src[i + 1] === '>') { push({ t: 'p', v: '=>', depth }); i += 2; continue; }
      push({ t: 'p', v: c, depth }); i++;
    }
    return out;
  }
  function analyze(seg) {
    const tk = tokens(seg), decl = new Set(), uses = new Set(); let patch = null, keys = [];
    for (let k = 0; k < tk.length; k++) {
      const t = tk[k];
      if (t.t !== 'id') continue;
      if (t.depth === 0 && /^(const|let|var)$/.test(t.v)) {
        // const a = …, b = … (até o ; de primeiro nível)
        let n = k + 1; if (tk[n] && tk[n].t === 'id') decl.add(tk[n].v);
        for (; n < tk.length && !(tk[n].depth === 0 && tk[n].v === ';'); n++) if (tk[n].depth === 0 && tk[n].v === ',' && tk[n + 1] && tk[n + 1].t === 'id' && tk[n + 2] && tk[n + 2].v === '=') decl.add(tk[n + 1].v);
        continue;
      }
      if (t.depth === 0 && t.v === 'function' && tk[k + 1] && tk[k + 1].t === 'id') { decl.add(tk[k + 1].v); k++; continue; }
      // C.nome = … e C['nome-composto'] = … declaram um comportamento; em outro lugar, usam
      const dotName = tk[k + 1] && tk[k + 1].v === '.' && tk[k + 2] && tk[k + 2].t === 'id' ? [tk[k + 2].v, 3] : tk[k + 1] && tk[k + 1].v === '[' && tk[k + 2] && tk[k + 2].t === 'str' && tk[k + 3] && tk[k + 3].v === ']' ? [tk[k + 2].v, 4] : null;
      if (t.v === 'C' && !t.dot && dotName) {
        if (k === 0 && tk[k + dotName[1]] && tk[k + dotName[1]].v === '=') decl.add('C.' + dotName[0]); else uses.add('C.' + dotName[0]);
        uses.add('C'); k += dotName[1] - 1; continue;
      }
      // ICONS.x = …, toast.promise = …, Object.assign(ICONS, …): complementam o que já existe e entram junto com ele
      if (k === 0 && !t.dot && dotName && tk[k + dotName[1]] && tk[k + dotName[1]].v === '=') { patch = t.v; keys = [dotName[0]]; k += dotName[1] - 1; continue; }
      if (k === 0 && t.v === 'Object' && tk[2] && tk[2].v === 'assign' && tk[4] && tk[4].t === 'id') { patch = tk[4].v; keys = tk.filter((x, n) => x.depth === 2 && (x.t === 'id' || x.t === 'str') && tk[n + 1] && tk[n + 1].v === ':').map(x => x.v); k = 4; continue; }
      if (!t.dot) uses.add(t.v);
    }
    decl.forEach(d => uses.delete(d));
    return { decl, uses, patch, keys };
  }
  function parseJs(src) {
    const lines = src.replace(/\r\n?/g, '\n').split('\n');
    const a = lines.findIndex(l => /^\(function \(global\) \{/.test(l)), b = lines.length - 1 - [...lines].reverse().findIndex(l => /^\}\)\(window\);/.test(l));
    const header = lines.slice(0, a).join('\n'), segs = []; let cur = null, notes = [];
    for (const l of lines.slice(a + 1, b)) {
      const top = /^ {2}\S/.test(l) && !/^ {2}[}\])]/.test(l), comment = /^ {2}(\/\/|\/\*)/.test(l);
      if (top && comment && !(cur && cur.open)) { if (cur) segs.push(cur); cur = null; notes.push(l); if (/^ {2}\/\*/.test(l) && !/\*\//.test(l)) notes.open = true; continue; }
      if (notes.open) { notes.push(l); if (/\*\//.test(l)) notes.open = false; continue; }
      if (top) { if (cur) segs.push(cur); cur = { lines: notes.concat(l) }; notes = []; continue; }
      if (cur) cur.lines.push(l); else if (l.trim()) notes.push(l); else notes = [];
    }
    if (cur) segs.push(cur);
    segs.forEach(s => { s.text = s.lines.join('\n').replace(/\s+$/, ''); Object.assign(s, analyze(s.text)); });
    return { header, segs };
  }
  // chaves de global.Orthos = { … } → nomes internos de que cada uma depende
  function exportsOf(seg) {
    const body = seg.text.slice(seg.text.indexOf('{') + 1, seg.text.lastIndexOf('}'));
    return splitTop(body).map(p => { const m = p.match(/^([\w$]+)\s*:\s*([\s\S]+)$/); const key = m ? m[1] : p.trim(); return { key, text: p.trim(), uses: analyze(m ? m[2] : p).uses }; });
  }

  function jsFor(js, roots, hint, extra = '') {
    const { segs } = js;
    const isExport = s => /^\s*global\.Orthos\s*=/m.test(s.text.replace(/^\s*(\/\/.*|\/\*[\s\S]*?\*\/)\s*$/gm, ''));
    const isBoot = s => /document\.readyState/.test(s.text) && !s.decl.size;
    const exp = segs.find(isExport), keys = exp ? exportsOf(exp) : [];
    const byName = new Map(); segs.forEach(s => s.decl.forEach(n => byName.set(n, s)));
    const need = new Set(['init']), inc = new Set();
    roots.behaviors.forEach(b => need.add('C.' + b));
    keys.filter(k => roots.api.has(k.key)).forEach(k => k.uses.forEach(u => need.add(u)));
    // trechos sem declaração (ouvintes globais, como data-ac-open ou data-tip) entram se falam de algo que a demo usa
    const loose = segs.filter(s => !s.decl.size && !s.patch && s !== exp && !isBoot(s) && !/^\s*'use strict';\s*$/.test(s.text));
    const patches = segs.filter(s => s.patch);
    // …ou se só dependem de trechos que já entraram (document.addEventListener('focusout', hideTip))
    const touches = s => [...s.text.matchAll(/data-[\w-]+|ac-[\w-]+/g)].some(m => hint.has(m[0]) || hint.has(family(m[0])))
      || (deps => deps.length > 0 && deps.every(u => inc.has(byName.get(u))))([...s.uses].filter(u => byName.has(u)));
    let grew = true;
    while (grew) {
      grew = false;
      need.forEach(n => { const s = byName.get(n); if (s && !inc.has(s)) { inc.add(s); grew = true; s.uses.forEach(u => need.add(u)); } });
      loose.forEach(s => { if (!inc.has(s) && touches(s)) { inc.add(s); grew = true; s.uses.forEach(u => need.add(u)); } });
      // um complemento (ICONS.lock = …) só entra se a chave aparece no que já entrou, na demo ou no script dela
      const said = () => [...inc].map(x => x.text).join('\n') + '\n' + extra;
      patches.forEach(s => { const t = byName.get(s.patch); if (t && inc.has(t) && !inc.has(s) && s.keys.some(key => new RegExp('(^|[^\\w-])' + key.replace(/[$]/g, '\\$&') + '([^\\w-]|$)').test(said()))) { inc.add(s); grew = true; s.uses.forEach(u => need.add(u)); } });
    }
    const avail = n => byName.has(n) ? inc.has(byName.get(n)) : true;
    const body = segs.filter(s => inc.has(s) || /^\s*'use strict';\s*$/.test(s.text)).map(s => s.text);
    const used = keys.filter(k => k.key === 'init' || roots.api.has(k.key) && [...k.uses].every(avail));
    // dois recortes na mesma página duplicariam os ouvintes globais e o segundo apagaria o Orthos do primeiro: avisa
    body.push(`  if (global.Orthos) console.warn('[Orthos] já existe um Orthos nesta página. Recortes de componentes diferentes não foram feitos para conviver: para usar vários, inclua orthos.css e orthos.js inteiros.');`);
    body.push(`  global.Orthos = { ${used.map(k => k.text).join(', ')} };`);
    body.push(`  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();`);
    // atributos que os ouvintes globais incluídos tratam (data-tip, data-ac-open…), para dizer ao leitor o que o JS faz
    const globals = [...new Set(loose.filter(s => inc.has(s)).flatMap(s => [...s.text.matchAll(/data-[\w-]+/g)].map(m => m[0])).filter(a => hint.has(a)))];
    return { code: `(function (global) {\n${body.join('\n')}\n})(window);`, api: used.map(k => k.key), globals };
  }

  /* ---------- script da demonstração (DEMO_HOOKS) como texto ---------- */
  // target: expressão do elemento em que a demo roda. noDevice: o HTML veio sem a moldura de aparelho do site,
  // então H.device (que só mexe na moldura) sai do script; uma demo que só chamava H.device fica sem script.
  // o código-fonte da função, sem o recuo que ela tinha dentro do arquivo (a 1ª linha já vem sem)
  const fnSrc = f => {
    const lines = String(f).replace(/\r\n?/g, '\n').split('\n'), rest = lines.slice(1).filter(l => l.trim());
    const pad = rest.length ? Math.min(...rest.map(l => l.match(/^ */)[0].length)) : 0;
    return [lines[0], ...lines.slice(1).map(l => l.slice(Math.min(pad, l.match(/^ */)[0].length)))].join('\n');
  };
  function demoScript(d, hooks, target, opts = {}) {
    const h = hooks[d.id]; if (!h) return '';
    const strip = s => opts.noDevice ? s.replace(/^[ \t]*H\.device\(root\);[ \t]*\n/gm, '').replace(/H\.device\(root\);\s*/g, '') : s;
    const hook = strip(fnSrc(h));
    if (opts.noDevice && /^root\s*=>\s*H\.device\(root\);?$/.test(hook.trim())) return '';
    // demo que embrulha outra (H.x = (prev => …)(H.x)) guarda a anterior em .prev
    const prev = h.prev ? `const prev = ${strip(fnSrc(h.prev))};` : '';
    // scripts de demo que chamam outros (H.device(root)) levam junto os que chamam
    const deps = [], seen = new Set([d.id, ...(opts.noDevice ? ['device'] : [])]);
    (function dig(src) { for (const m of src.matchAll(/\bH(?:\.([\w$]+)|\['([\w-]+)'\])/g)) { const k = m[1] || m[2]; if (seen.has(k) || !hooks[k]) continue; seen.add(k); const s = strip(fnSrc(hooks[k])); dig(s); deps.push(`H['${k}'] = ${s};`); } })(hook + prev);
    const all = [prev, ...deps, hook].join('\n');
    // ready: espera o DOMContentLoaded, quando o orthos.js (no <head>) já montou os componentes que o script procura
    const call = opts.ready ? `const run = () => (${hook})(${target});\nif (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();` : `(${hook})(${target});`;
    return [/\bO\(\)/.test(all) ? 'const O = () => window.Orthos;' : '', deps.length ? 'const H = {};' : '', ...deps, prev, call].filter(Boolean).join('\n');
  }

  /* ---------- o código da aba "Código" ---------- */
  // o HTML que funciona colado numa página com orthos.css e orthos.js: sem a moldura de aparelho do site
  // e, quando a demo tem comportamento extra, com o script dela num <script> no fim
  function unframe(html) {
    const m = /^\s*<div class="device-demo">[\s\S]*?<div class="device-frame"[^>]*>\n?([\s\S]*?)\n?\s*<\/div>\s*<\/div>\s*$/.exec(html);
    if (!m) return html;
    const lines = m[1].split('\n'), pad = Math.min(...lines.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
    return lines.map(l => l.slice(pad)).join('\n').trim();
  }
  function codeFor(d, hooks) {
    const html = unframe(d.html), framed = html !== d.html;
    const script = demoScript(d, hooks, 'document', { noDevice: framed, ready: true });
    return { html, script, full: script ? `${html}\n\n<!-- Só da demonstração: simula o que a sua aplicação faria. Rode depois do orthos.js. -->\n<script>\n${script}\n</script>` : html };
  }

  /* ---------- o markdown ---------- */
  const cell = s => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const fence = '```';
  const SITE_BASE = new Set(['body', 'a', 'code', 'pre code', ':focus-visible']);
  function build(d, o) {
    const g = (o.guia || {})[d.id] || {}, li = a => (a || []).map(x => `- ${x}`).join('\n');
    const fn = fnSrc; // o código-fonte das funções vem com as quebras de linha do arquivo
    const hooks = o.hooks || {}, hook = hooks[d.id] ? fn(hooks[d.id]) : '';
    // demo que embrulha outra (H.x = (prev => …)(H.x)) guarda a anterior em .prev
    const hookPrev = hooks[d.id] && hooks[d.id].prev ? `const prev = ${fn(hooks[d.id].prev)};` : '';
    const html = d.html;
    const behaviors = new Set([...html.matchAll(/data-ac="([^"]+)"/g)].flatMap(m => m[1].split(/\s+/)));
    const api = new Set([...(html + '\n' + hook + '\n' + hookPrev).matchAll(/\b(?:Orthos|O\(\))\.([\w$]+)/g)].map(m => m[1]));
    (d.api || []).forEach(r => [...String(r[0]).matchAll(/Orthos\.([\w$]+)/g)].forEach(m => api.add(m[1])));
    const htmlClasses = new Set([...html.matchAll(/class="([^"]*)"/g)].flatMap(m => m[1].split(/\s+/)).filter(Boolean));
    const hint = new Set([...html.matchAll(/data-[\w-]+/g)].map(m => m[0]));
    const fams = new Set();
    const addFams = s => [...String(s).matchAll(/(?:^|[^\w-])(ac-[a-z0-9][\w-]*)/g)].forEach(m => fams.add(family(m[1])));
    addFams(html); addFams(hook); (d.api || []).forEach(r => addFams(r[0]));
    // o JS pode criar classes que não estão no HTML (pops, toasts, dicas): duas voltas bastam para fechar
    addFams(hookPrev);
    const ctx = html + '\n' + hook + '\n' + hookPrev;
    let js = jsFor(o.js, { behaviors, api }, new Set([...hint, ...fams]), ctx);
    addFams(js.code); js = jsFor(o.js, { behaviors, api }, new Set([...hint, ...fams]), ctx); addFams(js.code);
    fams.forEach(f => hint.add(f));
    const dataAc = s => [...s.matchAll(/data-ac[~|^*]?="([\w-]+)"/g)].map(m => m[1]);
    const keepLib = item => {
      const cs = acClasses(item);
      if (dataAc(item).some(n => !behaviors.has(n))) return false;
      // regras globais que mexeriam na página de quem copia: só entram quando o componente precisa delas
      if (/view-transition/.test(item) && !api.has('transition')) return false;
      const hl = item.match(/::highlight\(([\w-]+)\)/); if (hl && !fams.has(family(hl[1]))) return false;
      return cs.every(c => fams.has(family(c)));
    };
    const css = cssFor(o.cssTree, keepLib, js.code);
    const keepSite = item => SITE_BASE.has(item) || (() => { const cs = [...item.matchAll(/\.([\w-]+)/g)].map(m => m[1]); return cs.length > 0 && cs.every(c => c === 'canvas' || c === 'canvas__inner' || (c.startsWith('ac-') ? fams.has(family(c)) : htmlClasses.has(c))) && !/canvas__tools|\.canvas\[hidden\]/.test(item); })();
    const frame = o.siteTree ? cssFor(o.siteTree, keepSite) : '';
    // <use href="#id"> que aponta para um <symbol> da página do site (o logo, por exemplo)
    const symbols = [...new Set([...(html + hook).matchAll(/<use[^>]+href="#([\w-]+)"/g)].map(m => m[1]))].map(id => o.symbol && o.symbol(id)).filter(Boolean);
    const assets = [...new Set([...(html + hook).matchAll(/(?:assets|brand)\/[\w./-]+\.(?:jpe?g|png|webp|svg|mp4|webm|gif)/g)].map(m => m[0]))];
    const page = [
      '<!doctype html>', '<html lang="pt-BR">', '<head>', '<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">', `<title>${d.nome}</title>`,
      '<style>/* cole aqui o bloco "Estilos" e, em seguida, a "Moldura da demonstração" */</style>', '</head>', '<!-- class="ac" no body: a base .ac, .ac * (box-sizing) vale para tudo, como no site -->', '<body class="ac">',
      symbols.length ? '<!-- cole aqui o SVG com o símbolo (logo abaixo do bloco "Estrutura") -->' : '',
      `<div class="canvas"${d.wide ? ' data-wide' : ''}><div class="canvas__inner" id="demo">`, '  <!-- cole aqui o bloco "Estrutura" -->', '</div></div>',
      '<script>/* cole aqui o bloco "Comportamento" */</script>', hook ? '<script>/* e depois o bloco "Script da demonstração" */</script>' : '', '</body>', '</html>'].filter(Boolean).join('\n');
    // o que é só do site: classes da moldura (device-demo…), atributos e ids que só o script da demo usa
    const siteOnly = [...htmlClasses].filter(c => !/^ac(-|$)/.test(c) && new RegExp(`\\.${c}(?![\\w-])`).test(frame));
    const siteFrame = siteOnly.includes('device-frame')
      ? ' A demo fica dentro de uma moldura de aparelho do site (`.device-demo`, com o seletor Celular/Tablet/Computador, e `.device-frame`): no seu projeto, use só o que está dentro de `.device-frame`.'
      : siteOnly.length ? ` As classes ${siteOnly.map(c => '`' + c + '`').join(', ')} são só do site: pode tirar o elemento que as usa e manter o que está dentro.` : '';
    const demoAttrs = [...new Set([...html.matchAll(/data-demo-[\w-]+/g)].map(m => m[0]))];
    const needsJs = behaviors.size > 0 || js.globals.length > 0 || js.api.length > 1;
    const code = s => '`' + s + '`', list = a => a.map(code).join(', ');
    const steps = [
      `1. **CSS:** copie o bloco **Estilos** para a folha de estilos do projeto (ou para um \`<style>\` no \`<head>\`). Ele define os tokens \`--ac-*\` no \`:root\` e o \`color-scheme\`, então o componente acompanha o tema escuro do sistema. Se o seu site só tem tema claro, ponha \`data-theme="light"\` no \`<html>\`; \`data-theme="dark"\` fixa o escuro.`,
      '2. **Base:** ponha `class="ac"` no `<body>`. A regra `.ac, .ac *` acerta o `box-sizing`, e os elementos que o JS cria direto no `<body>` (avisos, balões, dicas, diálogos) também dependem dela. Para ficar com a mesma tipografia e as mesmas cores do site, use também `body { font: var(--ac-fs-base)/1.55 var(--ac-font); color: var(--ac-text); background: var(--ac-bg); }`.',
      `3. **HTML:** cole a **Estrutura** onde o componente deve aparecer e troque textos, dados e imagens pelos seus.${siteFrame}${hook ? ` Parte do que a demo faz não é da biblioteca: vem do **Script da demonstração**, no fim${demoAttrs.length ? ` (é ele que faz os ${list(demoAttrs)} funcionarem)` : ''}. Leve e adapte esse script se quiser o mesmo comportamento, ou ligue esses pontos à sua própria lógica.` : ''}${assets.length ? (assets.some(a => /\.(mp4|webm)$/.test(a)) ? ` Os arquivos (${list(assets)}) são exemplos do site: use os seus.` : ` As imagens (${list(assets)}) são fotos de exemplo do site: use as suas.`) : ''}${symbols.length ? ' O `<use href="#…">` precisa do SVG com o símbolo (abaixo da Estrutura) em algum lugar do `<body>`.' : ''}`,
      needsJs
        ? `4. **JS:** cole o bloco **Comportamento** num \`<script>\` no fim do \`<body>\` (ou num arquivo carregado com \`defer\`). Ao carregar, ele ativa sozinho os elementos com \`data-ac\`. Se o HTML entrar depois (React, Vue, conteúdo trazido por \`fetch\`), chame \`Orthos.init(elemento)\` logo depois de inserir.${js.api.length > 1 ? ` Também expõe ${list(js.api.filter(k => k !== 'init').map(k => 'Orthos.' + k))}.` : ''}`
        : '4. **JS:** não precisa. O componente é só CSS; o bloco **Comportamento** traz apenas o `Orthos.init` e pode ficar de fora.',
      '5. **Vários componentes:** cada markdown traz um recorte da mesma biblioteca, e os recortes não foram feitos para conviver. Para usar dois ou mais na mesma página, inclua `orthos.css` e `orthos.js` inteiros (seção **Com a biblioteca inteira**). Juntar recortes repetiria os ouvintes globais, e o segundo substituiria o `Orthos` do primeiro; o JS avisa no console quando isso acontece.'];
    const jsWhat = [behaviors.size ? `comportamento ${list([...behaviors].map(b => 'data-ac="' + b + '"'))}` : '', js.globals.length ? `os atributos ${list(js.globals)}` : '', js.api.length > 1 ? `a API ${list(js.api.filter(k => k !== 'init').map(k => 'Orthos.' + k))}` : ''].filter(Boolean);
    const demoJs = demoScript(d, hooks, "document.getElementById('demo')");
    return [`# ${d.nome}`, '', ...(d.aka ? [`Em inglês: ${d.aka}`, ''] : []), d.desc, '', `Grupo: ${d.grupo}${d.ref && d.ref.nome ? ` · Referência estudada: ${d.ref.url ? `[${d.ref.nome}](${d.ref.url})` : d.ref.nome}` : ''}`, '',
      g.usar ? `## Quando usar\n\n${li(g.usar)}\n` : '', g.evitar ? `## Quando evitar\n\n${li(g.evitar)}\n` : '', g.dicas ? `## Boas práticas\n\n${li(g.dicas)}\n` : '',
      '## Usar no seu projeto', '', 'Sem instalar nada: os blocos **Estrutura**, **Estilos** e **Comportamento** abaixo trazem o HTML, o CSS e o JS deste componente, recortados de `orthos.css` e `orthos.js`. Não dependem de servidor nem de outras bibliotecas.', '', ...steps, '',
      '## API', '', '| Propriedade | Tipo | Padrão | Descrição |', '|---|---|---|---|', ...(d.api || []).map(r => `| \`${cell(r[0])}\` | ${cell(r[1])} | ${cell(r[2])} | ${cell(r[3])} |`), '',
      '## Acessibilidade', '', li(d.a11y), '',
      '## Estrutura (HTML)', '', 'O HTML da demonstração do site, com os ícones SVG completos. Os textos e os dados são de exemplo.', '', fence + 'html', html.trim(), fence, '',
      symbols.length ? `Símbolo usado pelo \`<use href="#…">\`: coloque este SVG em qualquer lugar do \`<body>\`.\n\n${fence}html\n<svg width="0" height="0" style="position:absolute" aria-hidden="true">${symbols.join('')}</svg>\n${fence}\n` : '',
      '## Estilos (CSS)', '', `Tokens de cor, tipografia e movimento (\`--ac-*\`, tema escuro por \`data-theme="dark"\` no \`<html>\` ou pelo sistema), a base comum e as regras das famílias de classe usadas: ${list([...fams].sort().map(f => '.' + f)) || '—'}. A fonte da pilha \`--ac-font\` ("Geist", "Inter") não é baixada: sem ela instalada, vale a fonte do sistema, como no site.`, '', fence + 'css', css, fence, '',
      '## Comportamento (JS)', '', needsJs ? `Recorte de \`orthos.js\` com ${jsWhat.join('; ')}. Ativa sozinho ao carregar; para HTML inserido depois, chame \`Orthos.init(elemento)\`.` : 'Opcional: este componente é só CSS, e o script abaixo traz apenas o `Orthos.init`.', '', fence + 'js', js.code, fence, '',
      '## Com a biblioteca inteira', '', 'Para usar vários componentes, inclua a biblioteca toda no lugar dos blocos **Estilos** e **Comportamento**. A **Estrutura** continua a mesma.', '', fence + 'html', '<link rel="stylesheet" href="orthos.css">', '<script src="orthos.js" defer></script>', fence, '',
      '## Reproduzir a demonstração do site (opcional)', '', 'Nada desta seção é necessário no seu projeto. Ela serve para montar uma página igual à do site e comparar.', '',
      hook ? `### Script da demonstração\n\nComportamento extra da demo, fora da biblioteca: ${demoAttrs.length ? `faz os ${list(demoAttrs)} funcionarem e ` : ''}simula o que a sua aplicação faria (envio, retorno, avisos). Rode depois do **Comportamento**.\n\n${fence}js\n${demoJs}\n${fence}\n` : '',
      '### Moldura da demonstração', '', `No site, a demo fica numa área centralizada (\`.canvas\`${d.wide ? ', larga' : ''}). Estas regras do site reproduzem esse enquadramento e a fonte da página, mas também estilizam \`body\`, \`a\`, \`code\` e \`:focus-visible\`: não leve para o seu projeto.`, '', fence + 'css', frame, fence, '',
      assets.length ? `### Recursos\n\nArquivos usados pela demo, com caminho a partir da raiz do projeto Orthos UI: ${list(assets)}. Se a página ficar numa subpasta, ajuste o caminho (ex.: \`../assets/…\`).\n` : '',
      '### Montagem', '', fence + 'html', page, fence, '',
      '- Tema: sem `data-theme` no `<html>`, a página segue o sistema, como o site na primeira visita.', ''].filter((x, k, a) => !(x === '' && a[k - 1] === '')).join('\n');
  }

  /* ---------- no navegador ---------- */
  let cache = null;
  async function sources() {
    if (cache) return cache;
    const inline = test => [...document.querySelectorAll('style, script:not([src])')].map(n => n.textContent).find(test);
    const get = async (url, test) => { try { const r = await fetch(url); if (r.ok) return await r.text(); } catch (_) { /* file:// ou offline: tenta o embutido (dist) */ } return inline(test) || null; };
    const [css, js, site] = await Promise.all([
      get('src/orthos.css', t => /--ac-bg:/.test(t) && /\.ac-btn\b/.test(t)),
      get('src/orthos.js', t => /global\.Orthos\s*=/.test(t)),
      get('site/site.css', t => /\.canvas__inner\b/.test(t))]);
    if (!css || !js) throw new Error('fontes indisponíveis');
    cache = { cssTree: parseCss(css), js: parseJs(js), siteTree: site ? parseCss(site) : null };
    return cache;
  }
  const api = { build, parseCss, parseJs, demoScript, codeFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.orthosCode = d => codeFor(d, root.DEMO_HOOKS || {});
  if (!(typeof module !== 'undefined' && module.exports)) root.orthosMarkdown = async d => build(d, { ...(await sources()), guia: root.GUIA, hooks: root.DEMO_HOOKS || {}, symbol: id => { const s = document.getElementById(id); return s && s.closest('svg') ? s.outerHTML : null; } });
})(typeof window !== 'undefined' ? window : globalThis);
