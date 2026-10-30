# Biblioteca de referências UI/UX — manutenção

Abra `index.html` direto no navegador (funciona offline para o conteúdo local; os links externos exigem internet).
Sem build, sem dependências. Para servir por HTTP: `python -m http.server` na pasta e abrir `http://localhost:8000/`.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `index.html`, `css/app.css`, `js/app.js` | Interface (busca, filtros, fichas, comparação, favoritos, tema) |
| `data/meta.js` | **Categorias, tipos, fontes e problemas de auditoria** (fonte única de metadados) |
| `data/refs.js` | Referências externas curadas |
| `data/local-4squad.js` | Conteúdo original do 4squad: 50 telas e 117 peças de código |
| `assets/4squad/` | As 100 capturas de tela (50 telas × claro/escuro) extraídas do arquivo original |
| `tests/check-links.py` | Verifica todas as URLs externas (grava `links-resultado.json`, fora do git) |
| `docs/` | Este arquivo, o relatório e as capturas antes/depois |

## Categorias

A Elementos fundamentais · B Navegação e estrutura · C Formulários e fluxos · D Dados e gestão · E Feedback e estados · F Páginas completas · G Padrões avançados · H Design visual e responsividade · X Código do 4squad (peças).
Para criar uma categoria nova, acrescente um objeto em `META.categorias`.

## Como cadastrar uma nova referência externa

1. **Triagem.** Abra a URL. Confirme que existe e que é o componente/padrão específico (prefira a página do componente, não a home). Veja se já existe algo equivalente (busque na biblioteca). Anote se há paywall/login.
2. **Fonte.** Se o site ainda não está em `META.fontes` (`data/meta.js`), adicione: `id`, `nome`, `url`, `material`, `acesso` (`gratis|pago|misto|desconhecido`), `licenca` (só se confirmada; senão “Não verificada”), `status` (`verificado|parcial|bloqueado|nao-verificado`) e `statusNota` quando houver limitação.
   Dica: licença de código aberto pode ser confirmada em `https://api.github.com/repos/<dono>/<repo>` (campo `license`).
3. **Item.** Em `data/refs.js`, acrescente uma chamada:
   ```js
   R('id-unico', 'E', 'conceitual', 'idDaFonte', 'Nome claro', 'https://url.exata/', {
     d: 'O que é e como funciona.',
     pr: 'Problema que resolve.',
     u: 'Quando usar.', e: 'Quando evitar.',
     a: 'Acessibilidade (se aplicável).', o: 'Observação de auditoria.',
     est: ['normal', 'erro'], vars: ['simples', 'com ação'], resp: 'Comportamento em mobile.',
     t: ['tags', 'em', 'minúsculas'], p: ['p-erro'],   // p = ids de META.problemas
     ctx: 'ambos'                                       // desktop | mobile | ambos
   });
   ```
   Tipos: `implementavel`, `conceitual`, `pagina`, `inspiracao`, `recurso`. Use `inspiracao` para galerias visuais (não provam usabilidade).
   Não preencha campos que não souber: eles simplesmente não aparecem na ficha.
4. **Validar.** `python tests/check-links.py` (a URL nova deve responder 200) e abra a biblioteca para conferir a ficha.
5. Atualize `META.verificadoEm` se tiver reverificado as fontes.

Também é possível adicionar itens pelo botão **Adicionar** na interface; eles ficam só no seu navegador (e entram no “Exportar dados pessoais”).

## Como adicionar telas ou componentes do próprio projeto auditado

Coloque as imagens em `assets/<projeto>/` e acrescente objetos como os de `data/local-4squad.js` (`origem`, `imagens: {claro, escuro}`, `cat`, `tags`, `problemas`). Não inclua dados reais de clientes.

## Convenções

- Texto em português, sem rótulos de marca de projetos específicos nas categorias.
- Uma referência = um componente ou padrão específico, com URL direta. Evite entradas “comparação” sem conteúdo próprio.
- Não copie imagens ou código proprietários: use link + descrição. Capturas próprias ou oficiais com permissão podem ir para `assets/`.
- Texto de `u`/`e`/`a`/`o` é orientação do curador, não citação da fonte. Não atribua à fonte o que ela não diz.
- Não invente licença, preço ou funcionalidade. Quando não verificado, use “Não verificada”.

## Dados pessoais (no navegador)

Chave `uilib.pessoal.v1` do `localStorage`: favoritos, notas, tags, histórico e referências adicionadas. Use “Exportar dados pessoais” (menu lateral) para backup e “Importar” para restaurar; a importação valida o formato e as URLs (somente http/https).
O tema fica em `uilib.tema`. Se o navegador bloquear o armazenamento, a biblioteca continua funcionando, sem persistência.

## Segurança

Todo texto é inserido escapado; URLs só são aceitas se forem http/https; links externos usam `rel="noopener noreferrer"`. Nenhum código de exemplos externos é executado.

## Arquivo original, `legacy/` e pasta `work/` (limpeza de 29/10/2026)

- Saíram do repositório: `legacy/` (cópia de 9,9 MB do `mvp-validacao.html` e `pecas-4squad.json`), as 20 seções da vitrine (eram só atalhos para essa cópia), o selo “Na vitrine” das peças e 5 fontes que nenhuma referência usava (Tailwind Plus, Headless UI, Helios, NHS, React Aria). Sonner e cmdk ficaram: são dependências do 4squad, batuta, CRM-4ST e outros projetos.
- A pasta `work/` da raiz (extração do bundle, `cv.json`, `sv.json`, `gen_local.py`, capturas brutas) foi apagada do disco. Tudo continua no histórico do git: `git checkout b4fa940 -- biblioteca-ui/legacy` e `git checkout 7401fa1 -- work`.
- Para regenerar a partir de uma versão nova do arquivo: recuperar `work/` e `legacy/` do histórico, extrair do bundle o `sv=JSON.parse('…')` (peças) e o `cv=JSON.parse(`…`)` (telas com imagens), gravar as imagens em `assets/4squad/tela-NN-{claro,escuro}.jpg`, atualizar `legacy/pecas-4squad.json`, rodar `work/gen_local.py` (o mapa `M` de categorias das telas 1–50 está fixo no código) e depois `python tests/build-single.py`. O `gen_local.py` ainda gera a lista `vitrine` e o campo `naVitrine`: tire os dois do resultado.
- Defeito conhecido do original: "Entrar no console" e "Entrar no app" usam a mesma imagem nos quatro espaços (`tela-01`/`tela-02`).
