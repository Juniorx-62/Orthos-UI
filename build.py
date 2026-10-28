"""Gera dist/orthos-ui.html (site completo em um único arquivo) e copia a biblioteca para dist/.
Uso: python build.py   ·   python build.py --check (falha se dist/ estiver desatualizado; não grava nada)"""
import re, sys, shutil, base64, pathlib
r = pathlib.Path(__file__).resolve().parent
d = r / 'dist'; d.mkdir(exist_ok=True)
h = (r / 'index.html').read_text(encoding='utf-8')
safe = lambda s: s.replace("</script", "<" + chr(92) + "/script")
# o favicon vai embutido: dentro de dist/ o caminho brand/ não existe
h = re.sub(r'href="(brand/[^"]+\.svg)"', lambda m: 'href="data:image/svg+xml;base64,' + base64.b64encode((r / m.group(1)).read_bytes()).decode() + '"', h)
h = re.sub(r'<link rel="stylesheet" href="((?:src|site)/[^"]+)">', lambda m: '<style>\n' + (r / m.group(1)).read_text(encoding='utf-8') + '\n</style>', h)
h = re.sub(r'<script src="((?:src|site)/[^"]+)"></script>', lambda m: '<script>\n' + safe((r / m.group(1)).read_text(encoding='utf-8')) + '\n</script>', h)
if '--check' in sys.argv:
    read = lambda p: p.read_text(encoding='utf-8') if p.exists() else None
    stale = [n for n, new in (('orthos-ui.html', h), ('orthos.css', read(r / 'src/orthos.css')), ('orthos.js', read(r / 'src/orthos.js'))) if read(d / n) != new]
    print('dist/ desatualizado: ' + ', '.join(stale) + ' (rode python build.py)' if stale else 'dist/ em dia')
    sys.exit(1 if stale else 0)
(d / 'orthos-ui.html').write_text(h, encoding='utf-8')
for f in ('orthos.css', 'orthos.js'): shutil.copy(r / 'src' / f, d / f)
print('dist/orthos-ui.html', len(h), 'bytes')
