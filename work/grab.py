import re,sys,urllib.request,ssl
ctx=ssl.create_default_context()
def txt(u):
    try:
        r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=25,context=ctx)
        b=r.read(900000).decode('utf-8','replace')
        b=re.sub(r'<(script|style)[^>]*>.*?</\1>','',b,flags=re.S)
        return re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',b))
    except Exception as e: return 'ERR '+str(e)[:80]
for spec in sys.argv[1:]:
    u,_,kws=spec.partition('@')
    t=txt(u); print('##',u,len(t))
    if not kws: print(t[:700]); continue
    for k in kws.split(','):
        for m in list(re.finditer(re.escape(k),t,re.I))[:1]:
            print('  [%s]'%k,t[max(0,m.start()-120):m.start()+260])
        else:
            pass
