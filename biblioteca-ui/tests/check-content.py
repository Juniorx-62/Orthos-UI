"""Confere se cada URL de referência trata do tema esperado: procura palavras da última parte da URL
(e do título) no texto da página. Páginas renderizadas por JavaScript sem texto aparecem como 'SEM TEXTO'.
Uso: python tests/check-content.py"""
import re, json, ssl, urllib.request, subprocess, pathlib, concurrent.futures as cf, unicodedata
raiz = pathlib.Path(__file__).resolve().parent.parent
dump = subprocess.run(['node', '-e', "global.window={};require('./data/meta.js');require('./data/refs.js');console.log(JSON.stringify(window.LIB_REFS.map(r=>({id:r.id,url:r.url,nome:r.nome}))))"], cwd=raiz, capture_output=True, text=True, encoding='utf-8').stdout
refs = json.loads(dump)
ctx = ssl.create_default_context()
def norm(s): return ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if unicodedata.category(c) != 'Mn')
def run(r):
    try:
        req = urllib.request.Request(r['url'], headers={'User-Agent': 'Mozilla/5.0'})
        b = urllib.request.urlopen(req, timeout=25, context=ctx).read(1500000).decode('utf-8', 'replace')
    except Exception as e:
        return r['id'], 'ERRO', str(e)[:50]
    b = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', b, flags=re.S)
    t = norm(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', b)))
    if len(t) < 4000 and re.search(r"(404|page not found|couldn.t load that page|nao encontrad|not found)", t[:700]): return r['id'], 'SOFT404', t[:90]
    if len(t) < 400: return r['id'], 'SEM TEXTO', len(t)
    path = [p for p in re.split(r'[/?#]', r['url'].split('://', 1)[1])[1:] if p and p not in ('docs', 'components', 'patterns', 'overview', 'usage', 'core', 'react', 'learn', 'primitives', 'articles', 'building-blocks', 'product', 'ui-patterns', 'base', 'en-us', 'wai', 'aria', 'apg')]
    words = [w for seg in path[-2:] for w in re.split(r'[-_.]', seg) if len(w) >= 4 and w not in ('html', 'pattern', 'pages', 'with')]
    if not words: return r['id'], 'OK(home)', ''
    hit = [w for w in words if w.rstrip('s') in t]
    return r['id'], ('OK' if hit else 'REVISAR'), ','.join(words)
with cf.ThreadPoolExecutor(10) as ex: res = list(ex.map(run, refs))
cnt = {}
for i, s, d in res: cnt[s] = cnt.get(s, 0) + 1
print(cnt)
for i, s, d in res:
    if s not in ('OK', 'OK(home)'): print(s, i, d)
json.dump(res, open(raiz / 'tests' / 'conteudo-resultado.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
