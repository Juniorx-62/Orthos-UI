# Relatório — Biblioteca de referências UI/UX (26/10/2026)

> Registro de 26/10/2026. Em 29/10/2026 saíram a pasta `legacy/`, as 20 seções da vitrine e 5 fontes sem uso; o estado atual está em `MANUTENCAO.md`.

## 1. Diagnóstico do arquivo original (`mvp-validacao.html`, 9,9 MB)

- É um **bundle Vite/React minificado** (um único `<script type="module">` de ~9,6 MB + 290 KB de CSS), com fontes Inter/Sora do Google Fonts (única dependência externa) e roteamento por hash.
- Conteúdo real:
  - **Vitrine ao vivo** de 20 seções de componentes do 4squad (cores, botões, campos, selos, gráficos, estados do dado, carregamento, mensagens, páginas de erro, janela e confirmação, menu lateral, esqueletos…). São componentes React renderizados; não existem como dados.
  - **117 “peças da base”** (componentes, hooks e funções de `components/base/*`) com arquivo e descrição, embutidos como JSON; 66 aparecem na vitrine.
  - **50 telas** do console e do app do criador, em tema claro e escuro (100 imagens JPEG embutidas como `data:` URI, ~6,7 MB), com dados fictícios, em 8 grupos.
  - Navegação lateral, busca apenas na lista de peças, filtro por tipo e tema claro/escuro.
- Específico do 4squad: marca, rotas, telas, nomes de componentes. Reaproveitável: as próprias telas (como exemplos de páginas completas) e a vitrine (como referência de implementação).
- Limitações para crescer: tudo (código + dados + imagens) num bundle compilado, sem como adicionar uma referência sem recompilar o projeto-fonte; sem categorias/tags/fontes externas; busca só em “peças”; sem favoritos, notas ou comparação; imagens inseparáveis do JS.
- Duplicidade: nenhum nome de peça repetido (conferido). Nada foi removido.

## 2. O que foi feito

- **Preservação:** `legacy/biblioteca-4squad-original.html` é cópia idêntica ao arquivo original (SHA-256 igual). A vitrine ao vivo continua funcionando; as 20 seções são abertas por âncoras (`#c-s-…`) conferidas contra os ids reais.
- **Extração sem perda:** 50 telas → 100 JPEGs em `assets/4squad/` (resolução original) + metadados; 117 peças → `legacy/pecas-4squad.json` e `data/local-4squad.js`.
- **Nova arquitetura** (HTML/CSS/JS puro, sem build): dados separados da interface (`data/meta.js`, `refs.js`, `local-4squad.js`). Justificativa: o acervo tem ~300 itens e precisa de edição manual simples; um framework não traria benefício proporcional.
- **Catálogo:** 298 itens = 228 referências externas + 50 telas do 4squad + 20 seções da vitrine (+ 117 peças de código em categoria própria “X”).
- **Interface:** busca global com sinônimos e destaque; filtros por tipo, contexto, origem, acesso e tecnologia (só opções com dados); categorias; “por problema observado” (16 problemas); cards, galeria de capturas, ficha detalhada, comparação (até 3), favoritos, histórico, notas e tags pessoais, adição de referências, exportar/importar, tema claro/escuro, menu e filtros adaptados ao celular.

## 3. Pesquisa externa

- 55 fontes registradas (`META.fontes`) com acesso, licença e **status de verificação**: 30 verificadas, 20 parciais, 4 com acesso limitado, 1 não verificada.
- Licenças só foram registradas quando confirmadas pela API do GitHub (campo `license`). Fluent, USWDS, Pajamas, Atlassian etc. aparecem como “Não verificada”.
- Principais descobertas além da lista inicial: **The Component Gallery** (comparação entre 95 design systems), **Cloudscape** (padrões de consoles administrativos), **GOV.UK** (formulários, validação, erros), **Primer/Carbon/Pajamas** (padrões de produto), **NN/G**, **W3C APG/WCAG**, **boneyard**, **Uiverse**, **FreeFrontend**, **Hugeicons**, **Kobra**.
- Links que você enviou: Kobra Input OTP (livre) e Color Palette (**Pro, US$ 19; código oculto, não acessado**), Hugeicons (Free + Pro), FreeFrontend, boneyard (MIT), Uiverse (site bloqueou leitura automatizada), 21st.dev (planos pagos; conta grátis limitada a 2 cópias/dia), Motion-Primitives (MIT).

## 4. Testes realmente executados

| Teste | Resultado |
|---|---|
| `tests/check-links.py`: 258 URLs de fontes e referências | 256 respondem HTTP 200. **Falhas conhecidas:** Dribbble (202 sem conteúdo) e Awwwards (erro de certificado TLS neste ambiente). 43 URLs redirecionam dentro do mesmo site (shadcn, Carbon, MDN, HeroUI); `tailwindcss.com/plus` redireciona para login |
| `tests/check-content.py`: a página trata do tema do item? | 185 OK, 18 só home, 24 **não lidas** (Material 3 e Atlassian são renderizados por JS; Uiverse/Land-book bloqueiam; Awwwards/Dribbble/Refero). Esses 24 itens têm o aviso “Conferir na fonte”. O teste achou **1 página inexistente respondendo 200** (Fluent DataGrid), que foi **removida** |
| Dados | 0 ids duplicados, 0 URLs duplicadas, 0 categorias/fontes/problemas inexistentes |
| Fichas | as 298 fichas abrem e mostram o título correto |
| Imagens | as 100 capturas existem (HEAD 200); fallback testado por código, não por falha real |
| Busca | “tabela com filtros” → 22 resultados (Table view, Data Table, Ant Table…); “erro de formulário” → 16; “modal de confirmação” → 28; “botões sem hierarquia” → 7; termo inexistente → estado vazio |
| Categorias | todas abrem; contagens: A 33 · B 23 · C 37 · D 39 · E 65 · F 53 · G 15 · H 33 · X 117 peças |
| Responsividade | 375 px: sem rolagem horizontal; menu em gaveta abre/fecha com Esc; filtros em painel expansível. Desktop e tablet verificados em capturas |
| Persistência | favoritar, anotar e tema gravam no `localStorage`; URL `javascript:` é rejeitada no formulário |
| Console | sem erros |
| Original | abre e a âncora `#c-s-cores` mostra a seção “Cores” |

**Não executado:** navegação completa por teclado/leitor de tela, Firefox/Safari, aparelho físico, importação de arquivo (só o código foi escrito), contraste medido por ferramenta. Os testes de interface foram feitos no navegador embutido do app. Capturas em `docs/capturas/`.

## 5. Limitações e lacunas

- **Sem referência verificada** para: sessão expirada, estados de conflito/concorrência, feedback otimista, atualização em tempo real, permissões por função, recursos bloqueados por plano e desfazer. Não foram inventadas; cadastre quando encontrar fonte verificável (o NN/G “undo-redo” e “bulk-actions” deram 404).
- **Tailwind Plus** (pago) e **Kobra Pro**: conteúdo inacessível sem conta/compra; usados só como registro.
- Dribbble, Awwwards, Land-book, Refero, Uiverse: existem, mas o conteúdo não foi lido; tratados como inspiração.
- Muitas entradas de “quando usar/evitar/acessibilidade” são **orientação do curador**, não texto da fonte; a descrição principal foi conferida contra a página nos itens “OK” do teste acima.
- Um grupo de itens é breve de propósito (ex.: comparações entre sistemas); a biblioteca privilegia ficha curta e link direto.
- As capturas do 4squad não são mais pesquisáveis por texto interno (são imagens); a busca usa título, rota, tags e descrição.
