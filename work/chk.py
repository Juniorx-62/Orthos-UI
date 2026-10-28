import sys,re,concurrent.futures as cf,urllib.request,ssl,json
ctx=ssl.create_default_context()
def get(u):
    req=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0 (compatible; library-audit/1.0)'})
    try:
        r=urllib.request.urlopen(req,timeout=20,context=ctx)
        b=r.read(200000).decode('utf-8','replace')
        m=re.search(r'<title[^>]*>(.*?)</title>',b,re.S|re.I)
        return u,r.status,r.geturl(),(re.sub(r'\s+',' ',m.group(1)).strip() if m else '')
    except Exception as e:
        code=getattr(e,'code',None)
        return u,code or 'ERR',str(e)[:60],''
urls=[l.strip() for l in open(sys.argv[1]) if l.strip()]
out=[]
with cf.ThreadPoolExecutor(12) as ex:
    for r in ex.map(get,urls): out.append(r);print(*r,sep=' | ')
json.dump(out,open(sys.argv[2],'w',encoding='utf-8'),ensure_ascii=False,indent=0)
