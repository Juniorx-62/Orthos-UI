"""Valida todas as URLs externas dos dados (existência: HTTP 200 sem redirecionar para home/login).
Uso: python tests/check-links.py   (precisa de internet; leva ~1 min)"""
import re, sys, json, ssl, urllib.request, concurrent.futures as cf, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent
txt = ''.join((raiz / 'data' / f).read_text(encoding='utf-8') for f in ('meta.js', 'refs.js'))
urls = sorted(set(re.findall(r"'(https?://[^']+)'", txt)))
ctx = ssl.create_default_context()
def chk(u):
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (compatible; library-audit/1.0)'})
    try:
        r = urllib.request.urlopen(req, timeout=25, context=ctx)
        return u, r.status, r.geturl()
    except Exception as e:
        return u, getattr(e, 'code', 'ERR'), str(e)[:70]
with cf.ThreadPoolExecutor(10) as ex:
    res = list(ex.map(chk, urls))
ruins = [r for r in res if r[1] != 200]
redir = [r for r in res if r[1] == 200 and r[0].rstrip('/') != r[2].rstrip('/')]
print(f'{len(res)} URLs, {len(res)-len(ruins)} com HTTP 200, {len(ruins)} com falha, {len(redir)} redirecionadas')
for u, s, d in ruins: print('FALHA', s, u, d)
for u, s, d in redir: print('REDIRECIONA', u, '->', d)
json.dump(res, open(raiz / 'tests' / 'links-resultado.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
sys.exit(1 if ruins else 0)
