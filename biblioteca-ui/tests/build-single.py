"""Gera biblioteca-single.html: index.html com CSS, dados e JS embutidos (para visualizadores que só abrem um arquivo).
As capturas do 4squad continuam sendo lidas de assets/4squad/ (ao lado do arquivo) e têm fallback se faltarem.
Uso: python tests/build-single.py"""
import re, pathlib
r = pathlib.Path(__file__).resolve().parent.parent
h = (r / 'index.html').read_text(encoding='utf-8')
safe = lambda s: s.replace('</script', '<' + chr(92) + '/script')
h = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)">', lambda m: '<style>\n' + (r / m.group(1)).read_text(encoding='utf-8') + '\n</style>', h)
h = re.sub(r'<script src="((?:data|js)/[^"]+)"></script>', lambda m: '<script>\n' + safe((r / m.group(1)).read_text(encoding='utf-8')) + '\n</script>', h)
(r / 'biblioteca-single.html').write_text(h, encoding='utf-8')
print('ok', len(h))
