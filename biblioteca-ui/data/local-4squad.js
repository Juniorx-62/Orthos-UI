window.LIB_LOCAL4SQUAD={
 "telas": [
  {
   "id": "l4-tela-01",
   "nome": "Entrar no console",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Entrar e primeiro acesso",
   "area": "Console da equipe",
   "rota": "/",
   "desc": "A tela de entrada da equipe, sem sessão aberta.",
   "tags": [
    "login",
    "autenticação",
    "console"
   ],
   "problemas": [
    "p-feedback"
   ],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-01-claro.jpg",
    "escuro": "assets/4squad/tela-01-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-02",
   "nome": "Entrar no app",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Entrar e primeiro acesso",
   "area": "App do criador",
   "rota": "/app",
   "desc": "A entrada do criador; a sessão do app fica à parte da do console.",
   "tags": [
    "login",
    "autenticação",
    "app"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-02-claro.jpg",
    "escuro": "assets/4squad/tela-02-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-03",
   "nome": "Convite do criador",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Entrar e primeiro acesso",
   "area": "App do criador",
   "rota": "/app?convite=…",
   "desc": "O criador cria a senha pelo link do convite e segue para a configuração.",
   "tags": [
    "convite",
    "cadastro",
    "onboarding",
    "senha"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-03-claro.jpg",
    "escuro": "assets/4squad/tela-03-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-04",
   "nome": "Escolha da empresa",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Entrar e primeiro acesso",
   "area": "Console da equipe",
   "rota": "/",
   "desc": "Quem tem acesso a mais de uma empresa escolhe com qual entrar.",
   "tags": [
    "seleção de contexto",
    "multi-empresa",
    "login"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-04-claro.jpg",
    "escuro": "assets/4squad/tela-04-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-05",
   "nome": "Início",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: início e agentes",
   "area": "Console da equipe",
   "rota": "/",
   "desc": "O que pede a equipe agora e os números do período (posts, custo de IA, radar).",
   "tags": [
    "dashboard",
    "visão geral",
    "métricas"
   ],
   "problemas": [
    "p-hierarquia"
   ],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-05-claro.jpg",
    "escuro": "assets/4squad/tela-05-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-06",
   "nome": "Agentes",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: início e agentes",
   "area": "Console da equipe",
   "rota": "/?area=agentes",
   "desc": "Os perfis do squad, com busca.",
   "tags": [
    "lista",
    "cards",
    "agentes"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-06-claro.jpg",
    "escuro": "assets/4squad/tela-06-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-07",
   "nome": "Agente: briefing",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: início e agentes",
   "area": "Console da equipe",
   "rota": "/?agente=01&aba=briefing",
   "desc": "O briefing do dia que o radar monta para o agente.",
   "tags": [
    "formulário",
    "abas",
    "briefing"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-07-claro.jpg",
    "escuro": "assets/4squad/tela-07-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-08",
   "nome": "Agente: pautas",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: início e agentes",
   "area": "Console da equipe",
   "rota": "/?agente=01&aba=pautas",
   "desc": "Ideias de post na voz do agente.",
   "tags": [
    "lista",
    "conteúdo",
    "pautas"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-08-claro.jpg",
    "escuro": "assets/4squad/tela-08-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-09",
   "nome": "Agente: perfil",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: início e agentes",
   "area": "Console da equipe",
   "rota": "/?agente=01&aba=identidade",
   "desc": "Identidade, atributos e o resto do perfil, em abas.",
   "tags": [
    "formulário",
    "perfil",
    "abas"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-09-claro.jpg",
    "escuro": "assets/4squad/tela-09-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-10",
   "nome": "Agente: imagens",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: início e agentes",
   "area": "Console da equipe",
   "rota": "/?agente=01&aba=book",
   "desc": "O book de fotos (fotos-base, avatares e cenas) e a galeria.",
   "tags": [
    "biblioteca de mídia",
    "imagens",
    "galeria"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-10-claro.jpg",
    "escuro": "assets/4squad/tela-10-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-11",
   "nome": "Marca 4SELET",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: conteúdo",
   "area": "Console da equipe",
   "rota": "/?area=marca",
   "desc": "Pautas do Instagram, blog e editoriais da marca.",
   "tags": [
    "gerenciamento de conteúdo",
    "marca"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-11-claro.jpg",
    "escuro": "assets/4squad/tela-11-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-12",
   "nome": "Radar do mercado",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: conteúdo",
   "area": "Console da equipe",
   "rota": "/?area=radar",
   "desc": "O que mentores, concorrentes e a imprensa publicaram.",
   "tags": [
    "feed",
    "pesquisa",
    "mercado"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-12-claro.jpg",
    "escuro": "assets/4squad/tela-12-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-13",
   "nome": "Publicação",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: conteúdo",
   "area": "Console da equipe",
   "rota": "/?area=publicacao",
   "desc": "Onde cada post da 4SELET está e os celulares de publicação.",
   "tags": [
    "gerenciamento de conteúdo",
    "publicação",
    "calendário"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-13-claro.jpg",
    "escuro": "assets/4squad/tela-13-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-14",
   "nome": "Usuários: equipe",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?aba=equipe",
   "desc": "A equipe do console, com nível, situação e último acesso.",
   "tags": [
    "usuários",
    "permissões",
    "tabela",
    "equipe"
   ],
   "problemas": [
    "p-tabela"
   ],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-14-claro.jpg",
    "escuro": "assets/4squad/tela-14-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-15",
   "nome": "Usuários: criadores",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?aba=criadores",
   "desc": "Os criadores do app, com etapas e Instagram.",
   "tags": [
    "usuários",
    "tabela",
    "criadores"
   ],
   "problemas": [
    "p-tabela"
   ],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-15-claro.jpg",
    "escuro": "assets/4squad/tela-15-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-16",
   "nome": "Criador: posts",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?criador=5",
   "desc": "Os posts do criador que passam pela equipe.",
   "tags": [
    "página de detalhes",
    "posts",
    "abas"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-16-claro.jpg",
    "escuro": "assets/4squad/tela-16-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-17",
   "nome": "Criador: perfil",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?criador=5&secao=perfil",
   "desc": "As etapas da configuração e o que o criador preencheu.",
   "tags": [
    "página de detalhes",
    "perfil"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-17-claro.jpg",
    "escuro": "assets/4squad/tela-17-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-18",
   "nome": "Criador: fontes e pesquisa",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?criador=5&secao=fontes",
   "desc": "Quem o criador acompanha e o que falta para o radar dele.",
   "tags": [
    "página de detalhes",
    "fontes",
    "configuração"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-18-claro.jpg",
    "escuro": "assets/4squad/tela-18-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-19",
   "nome": "Criador: plano e chaves",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?criador=5&secao=plano",
   "desc": "As chaves de cada serviço e o que a 4Selet contratou para ele.",
   "tags": [
    "assinatura e planos",
    "chaves",
    "cobrança"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-19-claro.jpg",
    "escuro": "assets/4squad/tela-19-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-20",
   "nome": "Criador: acesso",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?criador=5&secao=acesso",
   "desc": "O e-mail de acesso, o convite e os links de senha.",
   "tags": [
    "permissões",
    "acesso",
    "usuários"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-20-claro.jpg",
    "escuro": "assets/4squad/tela-20-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-21",
   "nome": "Criador: histórico",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/usuarios?criador=5&secao=historico",
   "desc": "Tudo o que a equipe fez na conta do criador.",
   "tags": [
    "histórico",
    "trilha de auditoria",
    "log"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-21-claro.jpg",
    "escuro": "assets/4squad/tela-21-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-22",
   "nome": "Configurações: contas dos agentes",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/?area=configuracoes&secao=contas",
   "desc": "A conta de cada agente em cada rede.",
   "tags": [
    "configurações",
    "contas",
    "integrações"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-22-claro.jpg",
    "escuro": "assets/4squad/tela-22-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-23",
   "nome": "Configurações: integrações",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/?area=configuracoes&secao=integracoes",
   "desc": "As chaves dos serviços que alimentam o estudo dos agentes.",
   "tags": [
    "configurações",
    "integrações"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-23-claro.jpg",
    "escuro": "assets/4squad/tela-23-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-24",
   "nome": "Meu perfil",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "Console: gestão",
   "area": "Console da equipe",
   "rota": "/?area=perfil",
   "desc": "Foto, dados e senha de quem está no console.",
   "tags": [
    "perfil",
    "conta"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-24-claro.jpg",
    "escuro": "assets/4squad/tela-24-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-25",
   "nome": "Hoje",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#hoje",
   "desc": "Primeiros passos, o que pede o criador agora e os números.",
   "tags": [
    "dashboard",
    "visão do dia",
    "cards"
   ],
   "problemas": [
    "p-hierarquia"
   ],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-25-claro.jpg",
    "escuro": "assets/4squad/tela-25-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-26",
   "nome": "Agenda",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#agenda",
   "desc": "Cada post no dia em que sai, por mês, semana ou lista.",
   "tags": [
    "calendário",
    "agenda"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-26-claro.jpg",
    "escuro": "assets/4squad/tela-26-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-27",
   "nome": "Criar post",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#criar",
   "desc": "A ideia, o formato e a capa; a IA monta na voz do criador.",
   "tags": [
    "formulário",
    "criação",
    "pré-visualização"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-27-claro.jpg",
    "escuro": "assets/4squad/tela-27-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-28",
   "nome": "Mensagens",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#mensagens",
   "desc": "Direct e comentários do Instagram num lugar só.",
   "tags": [
    "mensagens",
    "conversa",
    "lista-detalhe"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-28-claro.jpg",
    "escuro": "assets/4squad/tela-28-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-29",
   "nome": "Assistente do direct",
   "cat": "G",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#mensagens/assistente",
   "desc": "Como o assistente responde o direct na voz do criador.",
   "tags": [
    "assistente",
    "rascunho",
    "ação sugerida"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-29-claro.jpg",
    "escuro": "assets/4squad/tela-29-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-30",
   "nome": "Radar",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#radar",
   "desc": "A leitura das fontes que o criador acompanha.",
   "tags": [
    "feed",
    "pesquisa",
    "radar"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-30-claro.jpg",
    "escuro": "assets/4squad/tela-30-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-31",
   "nome": "Fontes do Radar",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#radar/fontes",
   "desc": "A janela para acrescentar perfis, canais e sites.",
   "tags": [
    "configuração",
    "fontes",
    "lista"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-31-claro.jpg",
    "escuro": "assets/4squad/tela-31-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-32",
   "nome": "Resultados",
   "cat": "D",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#resultados",
   "desc": "Os números do Instagram, comparados ao período anterior.",
   "tags": [
    "métricas",
    "gráficos",
    "resultados"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-32-claro.jpg",
    "escuro": "assets/4squad/tela-32-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-33",
   "nome": "Biblioteca: fotos",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#biblioteca",
   "desc": "O banco de fotos e vídeos do criador.",
   "tags": [
    "biblioteca de mídia",
    "fotos",
    "grade"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-33-claro.jpg",
    "escuro": "assets/4squad/tela-33-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-34",
   "nome": "Biblioteca: modelos",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: dia a dia",
   "area": "App do criador",
   "rota": "/app#biblioteca/modelos",
   "desc": "Os modelos de post do criador e os da 4Selet.",
   "tags": [
    "biblioteca de mídia",
    "modelos"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-34-claro.jpg",
    "escuro": "assets/4squad/tela-34-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-35",
   "nome": "Minha marca: posicionamento",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#marca/posicionamento",
   "desc": "Nicho, público e o que o criador vende.",
   "tags": [
    "formulário",
    "marca",
    "posicionamento"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-35-claro.jpg",
    "escuro": "assets/4squad/tela-35-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-36",
   "nome": "Minha marca: voz",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#marca/voz",
   "desc": "O jeito de falar e os áudios da voz.",
   "tags": [
    "formulário",
    "marca",
    "voz"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-36-claro.jpg",
    "escuro": "assets/4squad/tela-36-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-37",
   "nome": "Minha marca: estilo visual",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#marca/estilo",
   "desc": "As paletas prontas e a prévia do post.",
   "tags": [
    "formulário",
    "estilo visual",
    "marca"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-37-claro.jpg",
    "escuro": "assets/4squad/tela-37-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-38",
   "nome": "Minha conta",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#conta",
   "desc": "Conexões, a marca resumida e o acesso.",
   "tags": [
    "conta",
    "configurações"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-38-claro.jpg",
    "escuro": "assets/4squad/tela-38-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-39",
   "nome": "Instagram",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#conta/instagram",
   "desc": "O passo a passo para conectar a conta profissional.",
   "tags": [
    "integração",
    "conexão",
    "configurações"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-39-claro.jpg",
    "escuro": "assets/4squad/tela-39-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-40",
   "nome": "Ferramentas de IA",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#conta/ferramentas",
   "desc": "As chaves de cada serviço de IA do criador.",
   "tags": [
    "integração",
    "chaves",
    "configurações"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-40-claro.jpg",
    "escuro": "assets/4squad/tela-40-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-41",
   "nome": "Avisos",
   "cat": "E",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#avisos",
   "desc": "O que avisar e por onde (celular e e-mail).",
   "tags": [
    "notificações",
    "avisos",
    "lista"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-41-claro.jpg",
    "escuro": "assets/4squad/tela-41-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-42",
   "nome": "Configurar o squad",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: marca e conta",
   "area": "App do criador",
   "rota": "/app#configurar",
   "desc": "A configuração inicial, em oito passos.",
   "tags": [
    "passo a passo",
    "configuração guiada",
    "onboarding"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-42-claro.jpg",
    "escuro": "assets/4squad/tela-42-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-43",
   "nome": "Vendas: recuperação",
   "cat": "F",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: vendas (desligada em produção até o VENDAS_ATIVO=1)",
   "area": "App do criador",
   "rota": "/app#vendas",
   "desc": "Recuperação de carrinho por e-mail na voz do criador.",
   "tags": [
    "vendas",
    "recuperação",
    "métricas"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-43-claro.jpg",
    "escuro": "assets/4squad/tela-43-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-44",
   "nome": "Vendas: conexões",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: vendas (desligada em produção até o VENDAS_ATIVO=1)",
   "area": "App do criador",
   "rota": "/app#vendas/conexoes",
   "desc": "As plataformas de venda ligadas.",
   "tags": [
    "conexões",
    "passo a passo",
    "integração"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-44-claro.jpg",
    "escuro": "assets/4squad/tela-44-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-45",
   "nome": "Vendas: sequência de e-mails",
   "cat": "C",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "App do criador: vendas (desligada em produção até o VENDAS_ATIVO=1)",
   "area": "App do criador",
   "rota": "/app#vendas/sequencia",
   "desc": "Remetente, link de compra e os e-mails da sequência.",
   "tags": [
    "sequência",
    "editor",
    "e-mail"
   ],
   "problemas": [],
   "ctx": "desktop",
   "imagens": {
    "claro": "assets/4squad/tela-45-claro.jpg",
    "escuro": "assets/4squad/tela-45-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-46",
   "nome": "Hoje",
   "cat": "H",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "No celular",
   "area": "App do criador (celular)",
   "rota": "/app#hoje",
   "desc": "O app do criador na largura de um celular.",
   "tags": [
    "mobile",
    "dashboard",
    "celular"
   ],
   "problemas": [
    "p-mobile"
   ],
   "ctx": "mobile",
   "imagens": {
    "claro": "assets/4squad/tela-46-claro.jpg",
    "escuro": "assets/4squad/tela-46-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-47",
   "nome": "Criar post",
   "cat": "H",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "No celular",
   "area": "App do criador (celular)",
   "rota": "/app#criar",
   "desc": "Criar post no celular.",
   "tags": [
    "mobile",
    "formulário",
    "celular"
   ],
   "problemas": [
    "p-mobile"
   ],
   "ctx": "mobile",
   "imagens": {
    "claro": "assets/4squad/tela-47-claro.jpg",
    "escuro": "assets/4squad/tela-47-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-48",
   "nome": "Agenda",
   "cat": "H",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "No celular",
   "area": "App do criador (celular)",
   "rota": "/app#agenda",
   "desc": "A agenda no celular.",
   "tags": [
    "mobile",
    "calendário",
    "celular"
   ],
   "problemas": [
    "p-mobile"
   ],
   "ctx": "mobile",
   "imagens": {
    "claro": "assets/4squad/tela-48-claro.jpg",
    "escuro": "assets/4squad/tela-48-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-49",
   "nome": "Console: início",
   "cat": "H",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "No celular",
   "area": "Console da equipe (celular)",
   "rota": "/",
   "desc": "O console na largura de um celular.",
   "tags": [
    "mobile",
    "dashboard",
    "console"
   ],
   "problemas": [
    "p-mobile"
   ],
   "ctx": "mobile",
   "imagens": {
    "claro": "assets/4squad/tela-49-claro.jpg",
    "escuro": "assets/4squad/tela-49-escuro.jpg"
   },
   "add": "2026-10-26"
  },
  {
   "id": "l4-tela-50",
   "nome": "Usuários: criadores",
   "cat": "H",
   "tipo": "pagina",
   "local": true,
   "origem": "4squad",
   "grupo": "No celular",
   "area": "Console da equipe (celular)",
   "rota": "/usuarios?aba=criadores",
   "desc": "A lista de criadores no celular.",
   "tags": [
    "mobile",
    "tabela",
    "lista",
    "celular"
   ],
   "problemas": [
    "p-mobile",
    "p-tabela"
   ],
   "ctx": "mobile",
   "imagens": {
    "claro": "assets/4squad/tela-50-claro.jpg",
    "escuro": "assets/4squad/tela-50-escuro.jpg"
   },
   "add": "2026-10-26"
  }
 ],
 "pecas": [
  {
   "id": "l4-peca-001",
   "nome": "Celular",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Aparelhos.tsx",
   "tipoPeca": "componente",
   "desc": "O celular (iPhone). `escuro`: a barra de status e o fundo da tela no escuro (story, Reels). `safari`: mostra a barra do Safari com o endereço (prévia de página da web). `largura`: a largura na tela, em px (o aparelho encolhe se o espaço for menor); `alturaMax`: encolhe também para caber na altura (numa janela, por exemplo)."
  },
  {
   "id": "l4-peca-002",
   "nome": "Navegador",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Aparelhos.tsx",
   "tipoPeca": "componente",
   "desc": "A janela do navegador (computador): as três bolinhas, os ícones e o endereço; o conteúdo vem embaixo."
  },
  {
   "id": "l4-peca-003",
   "nome": "Palco",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Aparelhos.tsx",
   "tipoPeca": "componente",
   "desc": "A mesa pontilhada da prévia (.b-palco): o aparelho no meio e, no canto de cima, a escolha Celular/Computador. `aparelho` e `aoTrocar` controlam a escolha; sem `aoTrocar`, a escolha não aparece."
  },
  {
   "id": "l4-peca-004",
   "nome": "CartaoApp",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Apps.tsx",
   "tipoPeca": "componente",
   "desc": "Cartão de integração (CartaoApp; estilos em base.css, .b-app). Ícone num quadrado com borda, o nome grande com o selo de estado ao lado e uma descrição curta. O cartão inteiro é o botão que abre a configuração (janela) ou o link da página dela. Vários lado a lado: grade .b-grade, todos do mesmo tamanho. Uso: ferramentas de IA do criador, integrações da equipe (Plataforma, no console)."
  },
  {
   "id": "l4-peca-005",
   "nome": "AvisosRapidos",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/AvisosRapidos.tsx",
   "tipoPeca": "componente",
   "desc": "Aviso rápido (toast) da base (ex.: \"Esquema aplicado\", depois do CarrosselEsquemas). Confirma uma ação que deu certo sem ocupar a tela; some sozinho em 3 s e é lido pelo leitor de tela. Erro que pede ação não é aviso rápido: use <Aviso tom=\"erro\"> perto do que falhou."
  },
  {
   "id": "l4-peca-006",
   "nome": "useAvisoRapido",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/AvisosRapidos.tsx",
   "tipoPeca": "hook",
   "desc": "`const avisar = useAvisoRapido(); avisar(\"Esquema aplicado\")`"
  },
  {
   "id": "l4-peca-007",
   "nome": "cx",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Botao.tsx",
   "tipoPeca": "funcao",
   "desc": "Botões da base. Estilos em base.css (.b-botao). Regra do projeto: botão nunca apagado. Não passe `disabled` para \"travar\" uma ação: deixe o clique mostrar o que falta. O único estado travado é o `carregando` (enquanto salva, envia ou abre)."
  },
  {
   "id": "l4-peca-008",
   "nome": "Botao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Botao.tsx",
   "tipoPeca": "componente",
   "desc": "Botões da base. Estilos em base.css (.b-botao). Regra do projeto: botão nunca apagado. Não passe `disabled` para \"travar\" uma ação: deixe o clique mostrar o que falta. O único estado travado é o `carregando` (enquanto salva, envia ou abre)."
  },
  {
   "id": "l4-peca-009",
   "nome": "BotaoGerar",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Botao.tsx",
   "tipoPeca": "componente",
   "desc": "Botão que gera algo pago com IA: mostra o custo estimado ao lado do texto, antes do clique (\"Gerar post · ~US$ 0,15\"). `custo` em dólar; sem valor (estimativa ainda carregando ou desconhecida), fica o botão comum. A dica ao passar o mouse diz de onde vem o valor."
  },
  {
   "id": "l4-peca-010",
   "nome": "BotaoLink",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Botao.tsx",
   "tipoPeca": "componente",
   "desc": "Mesmo visual, mas é um link (navega). Use quando o clique leva para outra tela."
  },
  {
   "id": "l4-peca-011",
   "nome": "BotaoIcone",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Botao.tsx",
   "tipoPeca": "componente",
   "desc": "Botões da base. Estilos em base.css (.b-botao). Regra do projeto: botão nunca apagado. Não passe `disabled` para \"travar\" uma ação: deixe o clique mostrar o que falta. O único estado travado é o `carregando` (enquanto salva, envia ou abre)."
  },
  {
   "id": "l4-peca-012",
   "nome": "BotaoLinkIcone",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Botao.tsx",
   "tipoPeca": "componente",
   "desc": "Link com cara de botão de ícone (o \"Detalhes\" de uma linha de lista): com Ctrl ou Cmd abre em outra aba."
  },
  {
   "id": "l4-peca-013",
   "nome": "CampoTexto",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Campos.tsx",
   "tipoPeca": "componente",
   "desc": "Campos da base. Estilos em base.css (.b-campo, .b-entrada). Todo campo tem rótulo de verdade (<label for>), a ajuda ou o erro ficam ligados ao campo (aria-describedby) e o erro aparece junto do campo, em português, no lugar da ajuda. Sem os avisos do navegador: o campo obrigatório leva aria-required, não o required nativo, e todo <form> leva noValidate. Quem confere é o código da tela, e o erro aparece aqui, no `erro` do campo."
  },
  {
   "id": "l4-peca-014",
   "nome": "CampoArea",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Campos.tsx",
   "tipoPeca": "componente",
   "desc": "Campos da base. Estilos em base.css (.b-campo, .b-entrada). Todo campo tem rótulo de verdade (<label for>), a ajuda ou o erro ficam ligados ao campo (aria-describedby) e o erro aparece junto do campo, em português, no lugar da ajuda. Sem os avisos do navegador: o campo obrigatório leva aria-required, não o required nativo, e todo <form> leva noValidate. Quem confere é o código da tela, e o erro aparece aqui, no `erro` do campo."
  },
  {
   "id": "l4-peca-015",
   "nome": "CampoSelecao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Campos.tsx",
   "tipoPeca": "componente",
   "desc": "Campos da base. Estilos em base.css (.b-campo, .b-entrada). Todo campo tem rótulo de verdade (<label for>), a ajuda ou o erro ficam ligados ao campo (aria-describedby) e o erro aparece junto do campo, em português, no lugar da ajuda. Sem os avisos do navegador: o campo obrigatório leva aria-required, não o required nativo, e todo <form> leva noValidate. Quem confere é o código da tela, e o erro aparece aqui, no `erro` do campo."
  },
  {
   "id": "l4-peca-016",
   "nome": "CampoSenha",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Campos.tsx",
   "tipoPeca": "componente",
   "desc": "Senha ou chave, com o olho para ver o que foi digitado. `segredo`: campo de chave de API ou senha de outra conta. O navegador não pode preencher com a senha de login (o Chrome ignora autocomplete=\"off\" em senha), então vai new-password + os atributos dos gerenciadores."
  },
  {
   "id": "l4-peca-017",
   "nome": "CaixaMarcar",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Campos.tsx",
   "tipoPeca": "componente",
   "desc": "Só a caixa de marcar, desenhada e animada (base.css, .b-caixa). A caixa enche e o \"certo\" se desenha ao marcar. O input nativo continua lá, invisível, por cima da caixa: teclado, leitor de tela, formulário e `checked`/`onChange` funcionam como num checkbox comum. Precisa de um rótulo em volta (Marcador) ou de `aria-label`."
  },
  {
   "id": "l4-peca-018",
   "nome": "Marcador",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Campos.tsx",
   "tipoPeca": "componente",
   "desc": "Caixa de marcar com o texto clicável junto."
  },
  {
   "id": "l4-peca-019",
   "nome": "EscolhaCartoes",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Campos.tsx",
   "tipoPeca": "componente",
   "desc": "Escolha de uma opção em cartões: no lugar do rádio cru do navegador, cada opção é um cartão com título e uma linha de apoio (Formato do post, Quem aprova). O rádio de verdade continua por baixo: setas do teclado trocam a opção e o leitor de tela lê o grupo. `desligada` mostra a opção sem deixar escolher (ex.: \"Reel · Em breve\"); `colunas` fixa quantas por linha (sem isso, se ajusta à largura)."
  },
  {
   "id": "l4-peca-020",
   "nome": "MarcaCarregando",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Carregando.tsx",
   "tipoPeca": "componente",
   "desc": "Só o símbolo animado. `tamanho` em px. `herdarCor`: usa a cor do texto em volta (telas antigas, como o console)."
  },
  {
   "id": "l4-peca-021",
   "nome": "PontosCarregando",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Carregando.tsx",
   "tipoPeca": "componente",
   "desc": "Os quatro pontos que giram e crescem (desenho do Uiverse, AbanoubMagdy1, MIT). Para a espera dentro de uma área; estilos em base.css (.b-pontos). `tamanho` em px."
  },
  {
   "id": "l4-peca-022",
   "nome": "EsperaLonga",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Carregando.tsx",
   "tipoPeca": "componente",
   "desc": "Espera longa que não trava a tela: gerar a arte do post, pesquisa. Um navegador desenhado, com os esqueletos da página pulsando e a luz correndo pelos traços até ele. Vai junto do aviso \"Leva de 1 a 2 minutos\" (quem usa põe o aviso); `rotulo` aparece na barra do navegador e é lido pelo leitor de tela. Estilos em base.css (.b-espera-longa); com movimento reduzido, fica parado."
  },
  {
   "id": "l4-peca-023",
   "nome": "Carregando",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Carregando.tsx",
   "tipoPeca": "componente",
   "desc": "Carregamento no meio de uma área (tela abrindo). O texto é lido pelo leitor de tela e, se `visivel`, aparece embaixo. Usa os quatro pontos; `simbolo` troca pelo símbolo do 4squad, só para a espera que ocupa a tela inteira (abrir o app)."
  },
  {
   "id": "l4-peca-024",
   "nome": "useEsperaVisivel",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Carregando.tsx",
   "tipoPeca": "hook",
   "desc": "Quando a espera aparece. Espera curta (menos de `atraso` ms) nem mostra o carregamento, para ele não piscar. Uma vez na tela, ele fica pelo menos `minimo` ms, o bastante para o símbolo se desenhar, em vez de sumir pela metade."
  },
  {
   "id": "l4-peca-025",
   "nome": "TAMANHO_TELA",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Carregando.tsx",
   "tipoPeca": "constante",
   "desc": "Tamanho do símbolo nas esperas que travam a tela inteira (88 px)."
  },
  {
   "id": "l4-peca-026",
   "nome": "TelaCarregando",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Carregando.tsx",
   "tipoPeca": "componente",
   "desc": "Carregamento por cima da tela inteira, com o fundo desfocado (base.css, .b-carregando-tela)."
  },
  {
   "id": "l4-peca-027",
   "nome": "CarrosselEsquemas",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/CarrosselEsquemas.tsx",
   "tipoPeca": "componente",
   "desc": "Carrossel de esquemas de cor: um carretel curvo e infinito, cada cartão é uma mini-prévia do painel pintada com o esquema (ESQUEMAS, em Preferencias.tsx). Gira pelas setas, pelo teclado (esquerda e direita), arrastando ou tocando no cartão; \"Usar este esquema\" aplica. Janela do Radix (foco preso, Esc fecha); a prévia leva o destaque do 4squad, que não muda com o esquema."
  },
  {
   "id": "l4-peca-028",
   "nome": "Conversa",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Conversa.tsx",
   "tipoPeca": "componente",
   "desc": "A lista de mensagens."
  },
  {
   "id": "l4-peca-029",
   "nome": "Balao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Conversa.tsx",
   "tipoPeca": "componente",
   "desc": "Um balão. `variante`: padrao = enviada (cor de destaque escura), recebida = cinza, suave = destaque clarinho."
  },
  {
   "id": "l4-peca-030",
   "nome": "BalaoTexto",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Conversa.tsx",
   "tipoPeca": "componente",
   "desc": "O texto (ou o link, ou o botão) dentro do balão. `como=\"a\"` ou `\"button\"` para o balão inteiro ser clicável."
  },
  {
   "id": "l4-peca-031",
   "nome": "BalaoReacoes",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Conversa.tsx",
   "tipoPeca": "componente",
   "desc": "Selo de reações preso ao balão (em cima ou embaixo, no começo ou no fim)."
  },
  {
   "id": "l4-peca-032",
   "nome": "horaOuDia",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/datas.ts",
   "tipoPeca": "funcao",
   "desc": "A hora curta de uma lista de conversas (o menu dos agentes do console): hoje, só a hora (\"19:34\"); ontem, \"Ontem\"; nesta semana, o dia (\"terça\"); antes disso, a data (\"24/10\")."
  },
  {
   "id": "l4-peca-033",
   "nome": "dataEHora",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/datas.ts",
   "tipoPeca": "funcao",
   "desc": "Data com hora para \"Gerado em\", \"Última coleta em\" e afins: \"24/10/2026 às 19:27\". O toLocaleString puro mostra os segundos (\"24/10/2026, 19:27:16\"), que não ajudam ninguém a ler quando algo aconteceu."
  },
  {
   "id": "l4-peca-034",
   "nome": "SUPORTE",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Erro.tsx",
   "tipoPeca": "constante",
   "desc": "Canal de suporte (WhatsApp, e-mail ou agenda). Vazio enquanto não for definido: sem ele, o 403 leva de volta ao início no lugar de \"Falar com o suporte\"."
  },
  {
   "id": "l4-peca-035",
   "nome": "useQuemEsta",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Erro.tsx",
   "tipoPeca": "hook",
   "desc": "Quem está vendo a página, pela sessão (o mesmo /api/auth/me do app e do console)."
  },
  {
   "id": "l4-peca-036",
   "nome": "codigoDoErro",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Erro.tsx",
   "tipoPeca": "funcao",
   "desc": "Converte um erro qualquer (da API, do roteador, da rede) no código da página."
  },
  {
   "id": "l4-peca-037",
   "nome": "PaginaErro",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Erro.tsx",
   "tipoPeca": "componente",
   "desc": ""
  },
  {
   "id": "l4-peca-038",
   "nome": "Esqueletos",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "Invólucro dos ossos: a animação e a cascata valem para todos os .b-esqueleto de dentro. Anuncia \"carregando\"."
  },
  {
   "id": "l4-peca-039",
   "nome": "EsqueletoConversa",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "A conversa: balões que alternam de lado, com larguras diferentes, e o avatar de quem escreve do outro lado."
  },
  {
   "id": "l4-peca-040",
   "nome": "EsqueletoGradeFotos",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "A grade de fotos: cada quadro na proporção e, embaixo, a legenda (nome e marcação)."
  },
  {
   "id": "l4-peca-041",
   "nome": "EsqueletoCartaoPost",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "O cartão de post: a imagem na proporção do destino, o título, duas linhas de texto e a linha de quem fez."
  },
  {
   "id": "l4-peca-042",
   "nome": "EsqueletoTabela",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "A tabela: cada linha com o avatar, o nome e a linha de baixo e, depois, as colunas (selos e texto curto), na mesma largura das colunas de verdade (`colunas`, como o grid-template-columns). Abaixo de 1024 px vira o bloco do celular."
  },
  {
   "id": "l4-peca-043",
   "nome": "EsqueletoLista",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "A lista simples (posts, fila): um selo, o título e a linha de detalhe; o botão à direita."
  },
  {
   "id": "l4-peca-044",
   "nome": "EsqueletoNumeros",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "Os números (CartaoNumero): o rótulo, o valor grande e a legenda, em cartões lado a lado."
  },
  {
   "id": "l4-peca-045",
   "nome": "Carregavel",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "Troca o esqueleto pelo conteúdo com um fade. Enquanto `carregando`, mostra o `esqueleto`; quando acaba, o conteúdo entra com uma transição curta. Espera curta (menos de 150 ms) não pisca o esqueleto."
  },
  {
   "id": "l4-peca-046",
   "nome": "Sincronizando",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Esqueletos.tsx",
   "tipoPeca": "componente",
   "desc": "Espera dentro do cartão quando um dado de fora não respondeu, no lugar do aviso vermelho. Quem usa tenta de novo sozinho e diz isso no detalhe. Duas formas: - \"pontos\": as quatro bolinhas que giram e respiram (PontosCarregando), para buscar um dado; - \"sonar\": o ícone no meio com ondas saindo dele, para esperar outro sistema (sincronizar). Com movimento reduzido no aparelho, fica parada."
  },
  {
   "id": "l4-peca-047",
   "nome": "Cartao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Peças de exibição da base. Estilos em base.css. Cartão em duas camadas (faixa com título + painel; .b-cartao em base.css)."
  },
  {
   "id": "l4-peca-048",
   "nome": "Variacao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Variação contra o período anterior. `bomQuandoSobe=false` para números em que subir é ruim (ex.: posts com falha)."
  },
  {
   "id": "l4-peca-049",
   "nome": "Minigrafico",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Minigráfico de linha: só a forma da série, sem eixos. Decorativo; o número e a variação dizem o valor."
  },
  {
   "id": "l4-peca-050",
   "nome": "CartaoNumero",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Número com contexto: rótulo por extenso, valor, variação e minigráfico. Regra do painel: sem número real, o cartão não aparece. Quem chama decide não renderizar."
  },
  {
   "id": "l4-peca-051",
   "nome": "Selo",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Selo de estado. Os tons do post (aprovar, agendado...) são as cores fixas já aprovadas no app."
  },
  {
   "id": "l4-peca-052",
   "nome": "Aviso",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Aviso dentro da tela: o que aconteceu e, quando houver, a ação que resolve. Onde ele vai, para o aviso não quebrar a tela: - assunto da conta (Instagram, chaves, configuração): na faixa do topo, nunca repetido dentro da tela; - assunto de uma parte da tela: dentro do cartão dessa parte, na largura dele; - recado sobre a lista ou o filtro: `compacto`, uma linha na barra de ferramentas; - nunca solto numa coluna estreita, empurrando ou espremendo o resto."
  },
  {
   "id": "l4-peca-053",
   "nome": "CabecalhoPagina",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Com `trilha`, o caminho aparece acima do título; o `voltar` vira uma trilha de dois passos (\"Minha conta > Minha marca\"), então as telas que usam `voltar` também mostram o caminho."
  },
  {
   "id": "l4-peca-054",
   "nome": "Vazio",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Estado vazio: diz o que vai aparecer ali e como fazer aparecer."
  },
  {
   "id": "l4-peca-055",
   "nome": "Esqueleto",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Exibicao.tsx",
   "tipoPeca": "componente",
   "desc": "Bloco cinza animado enquanto carrega (respeita \"reduzir movimento\")."
  },
  {
   "id": "l4-peca-056",
   "nome": "iniciais",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "funcao",
   "desc": "Iniciais para o avatar sem foto (as duas primeiras letras das duas primeiras palavras)."
  },
  {
   "id": "l4-peca-057",
   "nome": "fotoNoTamanho",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "funcao",
   "desc": "Peças avulsas da base (avatar, pilha, escolha de cor, linha de esqueleto, peças da conversa). Estilos em base.css."
  },
  {
   "id": "l4-peca-058",
   "nome": "Avatar",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "componente",
   "desc": "`cor`: a cor própria da pessoa (a de cada agente), com as iniciais escuras por cima Todo rosto de pessoa (equipe, criador, agente) é redondo e passa por aqui; o Monograma quadrado ficou só para as marcas das empresas."
  },
  {
   "id": "l4-peca-059",
   "nome": "PilhaAvatares",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "componente",
   "desc": "No Início do console, o clique num agente da pilha abre o agente, e o rosto dá uma leve levantada com o mouse em cima: com `aoClicar` nas pessoas (e `aoMais` no \"+N\"), cada rosto vira um botão que sobe um pouco no hover e no foco, com o nome na dica. Sem isso, a pilha continua uma imagem só."
  },
  {
   "id": "l4-peca-060",
   "nome": "SeletorCor",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "componente",
   "desc": "Escolha de cor em bolinhas, com o anel em volta da escolhida. É um grupo de rádios de verdade: setas do teclado trocam, o leitor de tela lê o nome de cada cor."
  },
  {
   "id": "l4-peca-061",
   "nome": "EsqueletoLinha",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "componente",
   "desc": "Linha de esqueleto com avatar: para listas de pessoas e conversas carregando."
  },
  {
   "id": "l4-peca-062",
   "nome": "AcoesMensagem",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "componente",
   "desc": "Ações pequenas embaixo de uma mensagem (copiar, refazer...), numa fileira de ícones."
  },
  {
   "id": "l4-peca-063",
   "nome": "BotaoDescer",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Extras.tsx",
   "tipoPeca": "componente",
   "desc": "Botão redondo \"Ir para o fim\" que aparece quando a conversa não está no fim. Recebe a área que rola; some sozinho quando a pessoa já está embaixo."
  },
  {
   "id": "l4-peca-064",
   "nome": "FaixasTopo",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Faixas.tsx",
   "tipoPeca": "componente",
   "desc": "Faixa de aviso no topo da tela (FaixasTopo; estilos em base.css, .b-faixa). Para aviso que vale para a conta inteira e pede uma ação, e não para um detalhe da tela: termos novos, Instagram desconectado, chave de IA recusada, plano vencendo, \"você está vendo o app como outro criador\", ambiente de desenvolvimento. O que é da tela (um post que falhou, um campo) continua no Aviso, dentro da página. Uma faixa por vez, na ordem da lista (a primeira é a mais importante). Com mais de uma, aparecem as setas e elas trocam a cada 10 s, parando com o mouse ou o foco em cima (e não andando com movimento reduzido)."
  },
  {
   "id": "l4-peca-065",
   "nome": "numeroCurto",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "funcao",
   "desc": "12400 vira \"12,4 mil\"; 1086 vira \"1.086\"."
  },
  {
   "id": "l4-peca-066",
   "nome": "GraficoArea",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Linha com área de uma série no tempo (ex.: alcance por dia). `comparacao` desenha o período anterior em cinza."
  },
  {
   "id": "l4-peca-067",
   "nome": "GraficoColunas",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Colunas no tempo ou por categoria (ex.: novos seguidores por dia, custo por dia)."
  },
  {
   "id": "l4-peca-068",
   "nome": "GraficoHoras",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "24 colunas de uma média por hora (ex.: seguidores online), com o pico marcado."
  },
  {
   "id": "l4-peca-069",
   "nome": "horaPico",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "funcao",
   "desc": "A hora com a maior média (null quando não há nenhuma)."
  },
  {
   "id": "l4-peca-070",
   "nome": "BarraEmpilhada",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Parte do todo numa barra só (ex.: posts por etapa). Cada parte leva a cor do papel; o texto vai dentro quando cabe."
  },
  {
   "id": "l4-peca-071",
   "nome": "BarrasHorizontais",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Quantidades com rótulo, numa cor só, com o valor na ponta (ex.: base de criadores, custo por grupo)."
  },
  {
   "id": "l4-peca-072",
   "nome": "BarraMeta",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Feito contra o combinado (ex.: 1 de 4 posts da semana)."
  },
  {
   "id": "l4-peca-073",
   "nome": "VazioGrafico",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Sem dados para desenhar: a onda apagada, a frase e, se couber, a ação. Uma vez por área, nunca em cada cartão."
  },
  {
   "id": "l4-peca-074",
   "nome": "LegendaGrafico",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Legenda para duas séries ou mais (uma série só não leva legenda)."
  },
  {
   "id": "l4-peca-075",
   "nome": "CartaoGrafico",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Graficos.tsx",
   "tipoPeca": "componente",
   "desc": "Cartão de gráfico: o título com o período, o gráfico e o \"Ver tabela\", que troca o gráfico pelos mesmos números em tabela (o jeito de ler o valor sem depender da dica nem da cor)."
  },
  {
   "id": "l4-peca-076",
   "nome": "Icone",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Icone.tsx",
   "tipoPeca": "componente",
   "desc": "Ícones do 4squad: Hugeicons, conjunto gratuito (@hugeicons/core-free-icons, MIT), no lugar de emojis e do Lucide. Busque o nome em https://hugeicons.com e importe de \"@hugeicons/core-free-icons\". Sem `rotulo`, o ícone é decorativo (o leitor de tela pula); com `rotulo`, ele é lido como imagem. Regra: nada de emoji na tela; todo símbolo visual é um destes ícones."
  },
  {
   "id": "l4-peca-077",
   "nome": "Janela",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Janela.tsx",
   "tipoPeca": "componente",
   "desc": "Janela (modal) e confirmação da base. Estilos em base.css (.b-janela). Regra: janela por cima para tarefa curta com começo e fim (criar algo, confirmar ação destrutiva ou com custo). Conteúdo longo ou que precisa de link vai para página própria. Esc, clique fora e o X fecham; o foco fica preso na janela enquanto ela está aberta (Radix Dialog) e volta para quem abriu quando ela fecha. A janela é desenhada no fim do <body>: para vestir a cor do estilo do criador, passe `dentroDe` (o elemento .sq)."
  },
  {
   "id": "l4-peca-078",
   "nome": "Confirmar",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Janela.tsx",
   "tipoPeca": "componente",
   "desc": "`rotuloCancelar` para quando \"Cancelar\" confunde (ex.: \"Sair sem salvar?\" → \"Continuar editando\")"
  },
  {
   "id": "l4-peca-079",
   "nome": "Alerta",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Janela.tsx",
   "tipoPeca": "componente",
   "desc": "Atenção: a janela \"Atenção!\" com o X e o OK, no lugar de um aviso na tela. Para o erro que vem DEPOIS de um clique (entrar, salvar, enviar): a mensagem abre por cima da tela, com o fundo desfocado, e o OK devolve a pessoa ao que estava fazendo. O que falta preencher continua no próprio campo (o `erro` dos campos) e o erro de carregar uma tela continua no lugar dela (com o \"Tentar de novo\"). Use `alertar(\"mensagem\")` de qualquer lugar: o AlertaGlobal (montado uma vez na raiz, routes/__root.tsx) mostra."
  },
  {
   "id": "l4-peca-080",
   "nome": "alertar",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Janela.tsx",
   "tipoPeca": "funcao",
   "desc": "Abre a janela \"Atenção!\" com a mensagem (de qualquer tela; precisa do AlertaGlobal montado na raiz)."
  },
  {
   "id": "l4-peca-081",
   "nome": "AlertaGlobal",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Janela.tsx",
   "tipoPeca": "componente",
   "desc": "A janela \"Atenção!\" da página inteira: montada uma vez, em routes/__root.tsx."
  },
  {
   "id": "l4-peca-082",
   "nome": "Marca",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Marca.tsx",
   "tipoPeca": "componente",
   "desc": "Marca do 4squad para qualquer tela: o logo em todos os lugares, no lugar de \"AI-SQUAD\", \"Time Comercial IA\" e do quadrado \"AS\". Os vetores são os do app do criador (squad/comum.tsx: o símbolo \"Pilha\" com o 4 vazado e o nome em Sora), os mesmos dos arquivos da marca. `escuro` = sobre fundo escuro."
  },
  {
   "id": "l4-peca-083",
   "nome": "Abas",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegacao.tsx",
   "tipoPeca": "componente",
   "desc": "Abas com semântica de abas (role=\"tablist\"/\"tab\"): setas esquerda/direita, Home e End trocam de aba pelo teclado. O conteúdo de cada aba deve ficar num elemento com role=\"tabpanel\" e aria-labelledby = `${prefixo}-${k}`."
  },
  {
   "id": "l4-peca-084",
   "nome": "useMenuRecolhido",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegacao.tsx",
   "tipoPeca": "hook",
   "desc": "Estado do menu (aberto ou recolhido) guardado neste navegador (localStorage). `chave`: o console guarda o dele (\"sq-console-menu\") à parte do app do criador (\"sq-menu\")."
  },
  {
   "id": "l4-peca-085",
   "nome": "MenuLateral",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegacao.tsx",
   "tipoPeca": "componente",
   "desc": "Sem `marca`, o menu não tem a linha da marca nem o botão de recolher (os dois ficam na BarraTopo, components/base/Topo.tsx) e começa logo abaixo da barra."
  },
  {
   "id": "l4-peca-086",
   "nome": "GavetaMenu",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegacao.tsx",
   "tipoPeca": "componente",
   "desc": "O menu escondido do celular: abre da esquerda por cima da página escurecida, com a marca e o X no alto, a troca de empresa ou de conta (`conta`), os mesmos itens do MenuLateral com os grupos (a lista rola por dentro) e o pé fixo: a linha \"Tema\" com o sol e a lua, os links do pé (`extras`) e \"Sair\" em vermelho. Radix Dialog (o mesmo da Janela): prende o foco, fecha com Esc, com o toque fora e com o X, e devolve o foco ao botão de menu. Escolher um item fecha. Se a tela passar para o computador com a gaveta aberta, ela fecha."
  },
  {
   "id": "l4-peca-087",
   "nome": "Segmentado",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegacao.tsx",
   "tipoPeca": "componente",
   "desc": "`icone` opcional por opção (pílula com o ícone só na ativa), que aparece só quando ela está escolhida (estilo em navegar.css)"
  },
  {
   "id": "l4-peca-088",
   "nome": "PularConteudo",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegacao.tsx",
   "tipoPeca": "componente",
   "desc": "O primeiro foco da página: pula a faixa, o topo e o menu e leva ao conteúdo (<main id=\"conteudo\" tabIndex={-1}>). Escondido até receber o foco do teclado. O clique só move o foco, sem mudar o endereço: o app do criador usa o # como rota (lerRota em routes/app.tsx) e \"#conteudo\" viraria uma tela."
  },
  {
   "id": "l4-peca-089",
   "nome": "Trilha",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegar.tsx",
   "tipoPeca": "componente",
   "desc": "Trilha de navegação (\"Minha conta > Minha marca\"). O último passo é a tela aberta. Com mais de `max` passos, os do meio viram \"…\" (o clique mostra todos)."
  },
  {
   "id": "l4-peca-090",
   "nome": "CartaoRecolhivel",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegar.tsx",
   "tipoPeca": "componente",
   "desc": "Cartão que abre e fecha, com o botão de abrir e fechar no canto. Fechado mostra o título e um resumo; aberto, as linhas. Para listas longas, em que tudo aberto vira uma rolagem sem fim."
  },
  {
   "id": "l4-peca-091",
   "nome": "LinhaDado",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegar.tsx",
   "tipoPeca": "componente",
   "desc": "Uma linha de dado dentro do cartão que abre e fecha (rótulo e valor, como \"Status · Enviado\")."
  },
  {
   "id": "l4-peca-092",
   "nome": "PainelFlutuante",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegar.tsx",
   "tipoPeca": "componente",
   "desc": "`dentroDe`: no app do criador, passe o elemento .sq para o painel vestir a cor do estilo (como na Janela) `aoLado`: para painel alto (o editor de cor da Minha marca). Abre ao lado do botão quando cabe, onde tem a altura toda da tela; embaixo ou em cima ele ficava espremido entre o botão e a borda, rolando por dentro."
  },
  {
   "id": "l4-peca-093",
   "nome": "Paginacao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegar.tsx",
   "tipoPeca": "componente",
   "desc": "Paginação (Anterior 1 2 3 … Próxima). Mostra a primeira, a última e as vizinhas da atual; o resto vira \"…\". Com uma página só, não aparece."
  },
  {
   "id": "l4-peca-094",
   "nome": "MenuAcoes",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegar.tsx",
   "tipoPeca": "componente",
   "desc": "O \"…\" da linha de uma lista (ex.: menu Usuários), com as ações que não cabem como botão. Setas, Enter e Esc funcionam pelo teclado. Ação com `false` ou `null` não aparece; sem nenhuma, o botão some. `perigo` pinta a ação de vermelho (ela deve passar pela confirmação)."
  },
  {
   "id": "l4-peca-095",
   "nome": "FiltroMenu",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Navegar.tsx",
   "tipoPeca": "componente",
   "desc": "Filtro de lista (ex.: o \"Status\" da lista de Usuários, um filtro só no lugar de vários campos): um botão com ícone, o nome do filtro e a seta; com algo escolhido (fora o padrão), a escolha aparece no próprio botão, depois de um divisor. O clique abre a lista das opções, cada uma com a quantidade."
  },
  {
   "id": "l4-peca-096",
   "nome": "PassoAPasso",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/PassoAPasso.tsx",
   "tipoPeca": "componente",
   "desc": "Passo a passo em acordeão. Cada item é uma linha que abre e fecha: número, título, uma linha de apoio e a seta. Aberto, mostra os passos, o vídeo, a nota, o link e \"Marcar como concluído\" embaixo, à esquerda. Concluído, o número vira um certo e o item fecha; quem usa decide se abre o próximo (aoMarcar)."
  },
  {
   "id": "l4-peca-097",
   "nome": "ContadorPassos",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/PassoAPasso.tsx",
   "tipoPeca": "componente",
   "desc": "Contador \"2 de 3 prontos\" para o topo do cartão que contém o passo a passo. O \"prontos\" vai escrito: ao lado de \"Passo 2 de 8\", um \"1 de 8\" solto parecia dizer outro passo."
  },
  {
   "id": "l4-peca-098",
   "nome": "isoDia",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Periodo.tsx",
   "tipoPeca": "funcao",
   "desc": "Período dos painéis: as abas de atalho (7 e 30 dias) e, na mesma faixa, o botão do calendário, que abre os atalhos por nome (Hoje, Últimos 15 dias, Esse mês...) e dois meses lado a lado para escolher início e fim (no celular, um mês só, o da data escolhida, com as duas setas). As datas andam como texto AAAA-MM-DD no horário local (sem fuso), o mesmo formato que as rotas de painel recebem em ?de=&ate=."
  },
  {
   "id": "l4-peca-099",
   "nome": "diaDeIso",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Periodo.tsx",
   "tipoPeca": "funcao",
   "desc": "Período dos painéis: as abas de atalho (7 e 30 dias) e, na mesma faixa, o botão do calendário, que abre os atalhos por nome (Hoje, Últimos 15 dias, Esse mês...) e dois meses lado a lado para escolher início e fim (no celular, um mês só, o da data escolhida, com as duas setas). As datas andam como texto AAAA-MM-DD no horário local (sem fuso), o mesmo formato que as rotas de painel recebem em ?de=&ate=."
  },
  {
   "id": "l4-peca-100",
   "nome": "rotuloIntervalo",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Periodo.tsx",
   "tipoPeca": "funcao",
   "desc": "\"20/10 a 09/11\" (com o ano quando não é o ano corrente)."
  },
  {
   "id": "l4-peca-101",
   "nome": "intervaloDe",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Periodo.tsx",
   "tipoPeca": "funcao",
   "desc": "O intervalo de datas de um valor de período (7 dias = hoje e os 6 anteriores)."
  },
  {
   "id": "l4-peca-102",
   "nome": "FiltroPeriodo",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Periodo.tsx",
   "tipoPeca": "componente",
   "desc": "Período do painel: abas de atalho e o calendário na mesma faixa. Com um intervalo escolhido, o botão do calendário fica marcado e mostra as datas. `maxDias` limita o tamanho do intervalo (a Meta entrega no máximo 30 dias por pedido; o histórico guardado vai até 92)."
  },
  {
   "id": "l4-peca-103",
   "nome": "Calendario",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Periodo.tsx",
   "tipoPeca": "componente",
   "desc": "O calendário de dois meses com os atalhos ao lado. Primeiro clique marca o início; o segundo, o fim."
  },
  {
   "id": "l4-peca-104",
   "nome": "ESQUEMAS",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Preferencias.tsx",
   "tipoPeca": "constante",
   "desc": "Os mesmos valores do base.css ([data-esquema]); aqui servem para pintar a mini-prévia de cada cartão do carrossel."
  },
  {
   "id": "l4-peca-105",
   "nome": "aplicarPreferencias",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Preferencias.tsx",
   "tipoPeca": "funcao",
   "desc": "Põe tema e esquema no <html>: assim valem também para janelas e avisos, que são desenhados no fim do <body>."
  },
  {
   "id": "l4-peca-106",
   "nome": "usePreferenciasVisuais",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Preferencias.tsx",
   "tipoPeca": "hook",
   "desc": "`aplicar`: falso enquanto a tela é a de entrar (ou o convite), que é só no tema claro, para o tema escolhido no app não ser aplicado por cima dela."
  },
  {
   "id": "l4-peca-107",
   "nome": "BotaoTema",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Preferencias.tsx",
   "tipoPeca": "componente",
   "desc": "Troca de tema com sol e lua, num botão só (no lugar dos botões \"Claro\" e \"Escuro\"). Mostra o ícone do tema para onde vai (lua no claro, sol no escuro); na troca, um some encolhendo e desfocando enquanto o outro aparece no mesmo lugar. `sobreEscuro`: em cima do menu ou de outra área escura."
  },
  {
   "id": "l4-peca-108",
   "nome": "PROPORCAO_DO_DESTINO",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Proporcao.tsx",
   "tipoPeca": "constante",
   "desc": "O formato que cada destino pede (a mesma regra do back ao montar a arte ou o vídeo)."
  },
  {
   "id": "l4-peca-109",
   "nome": "IconeProporcao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Proporcao.tsx",
   "tipoPeca": "componente",
   "desc": "Ícone com a forma da proporção (um retângulo arredondado dentro de um quadrado)."
  },
  {
   "id": "l4-peca-110",
   "nome": "FormatoDestino",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Proporcao.tsx",
   "tipoPeca": "componente",
   "desc": "O formato que o destino pede, para mostrar junto da prévia ou da opção: ícone, a proporção e, se houver, o destino (\"9:16 · Reels e stories\"). É informação, não escolha."
  },
  {
   "id": "l4-peca-111",
   "nome": "MolduraProporcao",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Proporcao.tsx",
   "tipoPeca": "componente",
   "desc": "Quadro da prévia que muda de forma, com transição, quando a proporção muda (a foto vai de vertical a horizontal). A altura máxima segura o quadro na tela; a largura acompanha a proporção, sem passar da coluna."
  },
  {
   "id": "l4-peca-112",
   "nome": "problemaDaFoto",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/RecorteFoto.tsx",
   "tipoPeca": "funcao",
   "desc": "O que o arquivo escolhido tem de errado (tipo ou tamanho), ou \"\" se pode abrir."
  },
  {
   "id": "l4-peca-113",
   "nome": "RecorteFoto",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/RecorteFoto.tsx",
   "tipoPeca": "componente",
   "desc": "Janela de recorte. Abre quando recebe um arquivo; `aoAplicar` recebe a foto pronta (512 x 512) e, se der erro, a mensagem aparece dentro da janela. `aoTrocarArquivo` deixa escolher outra imagem sem fechar."
  },
  {
   "id": "l4-peca-114",
   "nome": "FotoPerfil",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/RecorteFoto.tsx",
   "tipoPeca": "componente",
   "desc": "A foto da pessoa com o que dá para fazer com ela: escolher, arrastar uma imagem até aqui, recortar e tirar. `compacta`: só o avatar com a câmera (o cabeçalho de Minha conta do app)."
  },
  {
   "id": "l4-peca-115",
   "nome": "SeletorArquivos",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/SeletorArquivos.tsx",
   "tipoPeca": "componente",
   "desc": "`multiplo`: escolhe vários, na ordem dos toques (o número aparece no quadrado); sem ele, um só. `aoEnviar` recebe os arquivos soltos ou escolhidos e devolve os itens novos, que entram já escolhidos na biblioteca. `aoApagar` mostra o \"Apagar de vez\" nos detalhes, sempre com confirmação. `aceitar` vai para o input."
  },
  {
   "id": "l4-peca-116",
   "nome": "SeletorPessoas",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/SeletorPessoas.tsx",
   "tipoPeca": "componente",
   "desc": "Seletor de pessoas (várias): quem já foi escolhido aparece no campo como etiqueta com o rosto e o X para tirar; o campo abre a lista com busca (nome, e-mail ou o que vier em `detalhe`), cada pessoa com o rosto, o nome e o detalhe numa linha só. É o multiple com busca da 4selet-v2 (select2), no desenho da base. Teclado: setas andam na lista, Enter marca ou desmarca, Esc fecha. A lista fica aberta enquanto a pessoa escolhe várias. Estilos em base.css (.b-pessoas)."
  },
  {
   "id": "l4-peca-117",
   "nome": "BarraTopo",
   "cat": "X",
   "tipo": "peca",
   "local": true,
   "origem": "4squad",
   "arquivo": "components/base/Topo.tsx",
   "tipoPeca": "componente",
   "desc": "A barra do topo de ponta a ponta, acima do menu e do conteúdo. À esquerda, a marca na largura do menu lateral e o botão que recolhe o menu; à direita, as ações da tela, o sol e a lua, e a conta (avatar, nome e a seta) com o menu \"Meu perfil\" e \"Sair\" (a conta e o tema não ficam no pé do menu). No celular (abaixo de 900 px) a mesma barra mostra o botão do menu escondido no lugar do recolher, a marca e o avatar; o tema fica na gaveta. Usa as cores do menu (--b-menu-*), que acompanham o tema: clara no claro, escura no escuro."
  }
 ]
};
