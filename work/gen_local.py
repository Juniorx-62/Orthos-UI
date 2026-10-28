import json,re,unicodedata
cv=json.load(open('work/cv.json',encoding='utf-8'))
sv=json.load(open('work/sv.json',encoding='utf-8'))
def pv(t):
    n=unicodedata.normalize('NFD',t.lower())
    return 's-'+re.sub(r'[^a-z0-9]+','-',n)
# idx(1-based) -> (cat, tags, problemas)
M={
1:('F',['login','autenticação','console'],['p-feedback']),
2:('F',['login','autenticação','app'],[]),
3:('F',['convite','cadastro','onboarding','senha'],[]),
4:('F',['seleção de contexto','multi-empresa','login'],[]),
5:('D',['dashboard','visão geral','métricas'],['p-hierarquia']),
6:('D',['lista','cards','agentes'],[]),
7:('C',['formulário','abas','briefing'],[]),
8:('D',['lista','conteúdo','pautas'],[]),
9:('C',['formulário','perfil','abas'],[]),
10:('F',['biblioteca de mídia','imagens','galeria'],[]),
11:('F',['gerenciamento de conteúdo','marca'],[]),
12:('D',['feed','pesquisa','mercado'],[]),
13:('F',['gerenciamento de conteúdo','publicação','calendário'],[]),
14:('F',['usuários','permissões','tabela','equipe'],['p-tabela']),
15:('F',['usuários','tabela','criadores'],['p-tabela']),
16:('F',['página de detalhes','posts','abas'],[]),
17:('F',['página de detalhes','perfil'],[]),
18:('F',['página de detalhes','fontes','configuração'],[]),
19:('F',['assinatura e planos','chaves','cobrança'],[]),
20:('F',['permissões','acesso','usuários'],[]),
21:('D',['histórico','trilha de auditoria','log'],[]),
22:('F',['configurações','contas','integrações'],[]),
23:('F',['configurações','integrações'],[]),
24:('F',['perfil','conta'],[]),
25:('D',['dashboard','visão do dia','cards'],['p-hierarquia']),
26:('D',['calendário','agenda'],[]),
27:('C',['formulário','criação','pré-visualização'],[]),
28:('F',['mensagens','conversa','lista-detalhe'],[]),
29:('G',['assistente','rascunho','ação sugerida'],[]),
30:('D',['feed','pesquisa','radar'],[]),
31:('C',['configuração','fontes','lista'],[]),
32:('D',['métricas','gráficos','resultados'],[]),
33:('F',['biblioteca de mídia','fotos','grade'],[]),
34:('F',['biblioteca de mídia','modelos'],[]),
35:('C',['formulário','marca','posicionamento'],[]),
36:('C',['formulário','marca','voz'],[]),
37:('C',['formulário','estilo visual','marca'],[]),
38:('F',['conta','configurações'],[]),
39:('F',['integração','conexão','configurações'],[]),
40:('F',['integração','chaves','configurações'],[]),
41:('E',['notificações','avisos','lista'],[]),
42:('C',['passo a passo','configuração guiada','onboarding'],[]),
43:('F',['vendas','recuperação','métricas'],[]),
44:('C',['conexões','passo a passo','integração'],[]),
45:('C',['sequência','editor','e-mail'],[]),
46:('H',['mobile','dashboard','celular'],['p-mobile']),
47:('H',['mobile','formulário','celular'],['p-mobile']),
48:('H',['mobile','calendário','celular'],['p-mobile']),
49:('H',['mobile','dashboard','console'],['p-mobile']),
50:('H',['mobile','tabela','lista','celular'],['p-mobile','p-tabela']),
}
out=[]
for i,t in enumerate(cv,1):
    cat,tags,probs=M[i]
    area='Console da equipe' if t['grupo'].startswith(('Console','Entrar'))and i!=2 and i!=3 else 'App do criador'
    if i in (46,47,48): area='App do criador (celular)'
    if i in (49,50): area='Console da equipe (celular)'
    out.append(dict(id='l4-tela-%02d'%i,nome=t['titulo'],cat=cat,tipo='pagina',local=True,origem='4squad',
      grupo=t['grupo'],area=area,rota=t['rota'],desc=t['descricao'],tags=tags,problemas=probs,
      ctx='mobile' if cat=='H' and i>=46 else 'desktop',
      imagens=dict(claro='assets/4squad/tela-%02d-claro.jpg'%i,escuro='assets/4squad/tela-%02d-escuro.jpg'%i),
      add='2026-10-26'))
vit=[("Cores",'H'),("Esquema de cores",'H'),("Letras",'H'),("Botões",'A'),("Campos",'A'),("Selos e avisos",'E'),("Pessoas e cores",'A'),("Números (valores de exemplo)",'D'),("Período e gráficos (valores de exemplo)",'D'),("Estados do dado",'E'),("Cartões do mesmo tamanho",'D'),("Carregamento",'E'),("Faixa de aviso no topo",'E'),("Mensagens",'E'),("Páginas de erro",'E'),("Cartões e abas",'B'),("Passo a passo em acordeão (conexões)",'C'),("Janela e confirmação",'E'),("Menu lateral",'B'),("Esqueletos com a forma real",'E')]
vout=[]
for i,(t,c) in enumerate(vit,1):
    vout.append(dict(id='l4-vitrine-%02d'%i,nome=t,cat=c,tipo='implementavel',local=True,origem='4squad',
      desc='Seção da vitrine ao vivo da biblioteca original (componentes reais do 4squad renderizados). Abre o arquivo original preservado.',
      legado='legacy/biblioteca-4squad-original.html#c-'+pv(t),tags=['vitrine','4squad'],problemas=[],add='2026-10-26'))
pecas=[dict(id='l4-peca-%03d'%i,nome=p['nome'],cat='X',tipo='peca',local=True,origem='4squad',arquivo=p['arquivo'],tipoPeca=p['tipo'],desc=p.get('descricao',''),naVitrine=bool(p.get('naVitrine'))) for i,p in enumerate(sv,1)]
js='window.LIB_LOCAL4SQUAD='+json.dumps(dict(telas=out,vitrine=vout,pecas=pecas),ensure_ascii=False,indent=1)+';\n'
open('biblioteca-ui/data/local-4squad.js','w',encoding='utf-8').write(js)
print(len(out),len(vout),len(pecas),len(js))
