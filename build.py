"""Gera dist/orthos-ui.html (site completo em um único arquivo) e copia a biblioteca para dist/.
Uso: python build.py"""
import re, shutil, pathlib
r = pathlib.Path(__file__).resolve().parent
d = r / 'dist'; d.mkdir(exist_ok=True)
h = (r / 'index.html').read_text(encoding='utf-8')
safe = lambda s: s.replace("</script", "<" + chr(92) + "/script")
h = re.sub(r'<link rel="stylesheet" href="((?:src|site)/[^"]+)">', lambda m: '<style>\n' + (r / m.group(1)).read_text(encoding='utf-8') + '\n</style>', h)
h = re.sub(r'<script src="((?:src|site)/[^"]+)"></script>', lambda m: '<script>\n' + safe((r / m.group(1)).read_text(encoding='utf-8')) + '\n</script>', h)
(d / 'orthos-ui.html').write_text(h, encoding='utf-8')
for f in ('orthos.css', 'orthos.js'): shutil.copy(r / 'src' / f, d / f)
print('dist/orthos-ui.html', len(h), 'bytes')
