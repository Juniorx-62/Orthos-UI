# Orthos UI

Biblioteca de componentes em HTML, CSS e JavaScript puro, sem dependências, com site de documentação.
Os padrões foram estudados em shadcn/ui, Radix, Kobra, Motion-Primitives, boneyard, Magic UI, GOV.UK e Carbon,
e reimplementados do zero (nenhum código dessas bibliotecas foi copiado).

## Estrutura

```
orthos-ui/
├── src/
│   ├── orthos.css      ← a biblioteca: tokens + estilos de todos os componentes
│   └── orthos.js       ← a biblioteca: comportamentos (data-ac="…") e APIs
├── site/
│   ├── site.css        ← layout do site de documentação
│   ├── site.js         ← rotas, palco de preview, código, busca
│   ├── demos.js        ← catálogo: demo, API e acessibilidade de cada componente
│   ├── demos-novos.js  ← componentes adicionados após a pesquisa de 27/10/2026
│   └── guia.js         ← quando usar, quando evitar, boas práticas e a página Padrões
├── tests/
│   └── componentes.html ← testes automáticos (abra no navegador; também publicado em /tests/componentes.html)
├── docs/
│   ├── pesquisa-referencias.md ← pesquisa em 28 sites
│   ├── mudancas-2026-10-27.md  ← atualização de 27/10
│   ├── mudancas-2026-10-28.md  ← navegadores, correções, estrutura e componentes de referência
│   ├── mudancas-2026-10-30.md  ← ajustes pedidos depois do teste no celular
│   └── prototipos/color-picker.html ← protótipo que deu origem ao Color palette 3D
├── brand/              ← logo e símbolo (SVG)
├── assets/fotos/       ← fotos das demos (Unsplash, licença conferida; créditos em CREDITOS.md)
├── assets/video/       ← vídeo da demo do player (Pexels, licença conferida; créditos em CREDITOS.md)
├── biblioteca-ui/      ← app separado: biblioteca de referências UI/UX (255 referências + 50 telas do 4squad)
├── index.html          ← site de documentação
├── build.py            ← gera dist/ (python build.py --check avisa se dist/ ficou para trás)
├── .vercelignore       ← o que não vai para o site publicado
└── dist/
    ├── orthos-ui.html  ← site inteiro em um arquivo (abre em qualquer visualizador)
    ├── orthos.css
    └── orthos.js
```

A pasta `work/` (extração do `mvp-validacao.html` e rascunhos) foi apagada em 29/10/2026; está no histórico do git (`git checkout 7401fa1 -- work`).

## Ver o site

Abra `index.html` no navegador, ou `dist/orthos-ui.html` se o visualizador só abrir um arquivo.
Atalho de busca: `Ctrl K`.

## Usar em um projeto

```html
<link rel="stylesheet" href="orthos.css">
<button class="ac-btn" data-ac-open="#confirmar">Excluir</button>
<dialog class="ac ac-dialog" id="confirmar">…</dialog>
<script src="orthos.js"></script>
```

- Tema: `data-theme="light"` ou `"dark"` no `<html>`; sem o atributo, segue o sistema. O CSS declara `color-scheme`, e o tema claro escolhido usa `only light`: o escurecimento automático do Chrome ("Auto Dark Mode") não inverte as cores. No site também há `<meta name="darkreader-lock">` para a extensão Dark Reader.
- Componentes declarativos: `data-ac="tabs | accordion | segmented | menu | otp | combo | datepicker | dropzone | slider | counter | validate | table | sidebar | stepper | text-effect | number | scramble | magnetic | spotlight | spark | bars | palette | copy | select | popover | hovercard | contextmenu | menubar | toggle | toolbar | number-field | people | tags | daterange | area | collapsible | result | dirty | money | phone | carousel | password | copyfield | banners | chat | stack | orbit | wait | sync | gallery | coverflow | hero | tilt | reveal | scroll-progress | card-number | flip | marquee3d | sphere | ring3d | flip-words | video | halftone | morph-icon | ai-editor | conversation | pagination | toggle-group"`.
- Conteúdo inserido depois do carregamento: `Orthos.init(elemento)`.
- APIs: `Orthos.toast()` (com `.update()`), `Orthos.toast.promise(promessa, mensagens)`, `Orthos.command()`, `Orthos.skeleton(el, on, { animation, cascade, delay })`, `Orthos.open(dialog)`, `Orthos.close(dialog)`, `Orthos.results` (textos das páginas de erro), `Orthos.logo.load(el, arquivo)`, `Orthos.logo.replay(el)`, `Orthos.loading({ logo, text })` (tela de carregamento), `Orthos.tour(passos)`, `Orthos.dirty.baseline(form)`, `Orthos.lightbox(itens, início)`, `Orthos.transition(fn)` (View Transitions), `Orthos.confirm(opções)` e `Orthos.alert(mensagem)` (devolvem Promise; com `onConfirm` assíncrono o botão fica carregando e o erro aparece dentro da janela).
- Atalho global: `Alt+T` leva o foco aos avisos.
- Avisos: `Orthos.toast({ title, desc, type, position: 'top', swatch: '#6a4fd0' })`; `position: 'top'` usa uma pilha centralizada no alto da tela e `swatch` mostra uma amostra de cor no lugar do ícone. O Campo copiável mostra um aviso no topo ao copiar (`data-toast="mensagem"`, ou `"false"` para desligar).
- Busca: `Orthos.command({ items, groups: { 'Formulários': { icon, color } }, limit })` mostra o título de cada grupo com ícone e cor. Páginas de erro: `data-ac="result"` com `data-code` (404, 403, 401, 500, error, 503, offline, success), `data-audience` (visitante, usuário, equipe), `data-support`, `data-error-id`, `data-retry-at` e o evento cancelável `ac:action`.
- Escala de texto: `--ac-fs-xs` 12px · `sm` 13 · `base` 14 · `md` 15 · `lg` 17 · `xl` 20 · `2xl` 22 · `3xl` 28 · `touch` 16 (campos em telas de toque, para o Safari do iPhone não dar zoom). 12px é o mínimo; a suíte de testes falha se alguma demo tiver texto menor. Dicas (`.ac-hint`), erros (`.ac-error`) e cabeçalhos de tabela usam 14px. O site de documentação usa `--site-read` (16px) no texto corrido e no menu, e `--site-small` (14px) nos rótulos.
- Borda de campo: `--ac-border-input` (3:1 contra o fundo, WCAG 1.4.11) em input, textarea, select, checkbox, switch, number field, pessoas e tags, telefone, chat e campo copiável; as demais bordas continuam suaves (`--ac-border`, `--ac-border-strong`).
- Tokens de forma e movimento: `--ac-btn-radius`, `--ac-dur-fast | base | slow | overlay`, `--ac-ease-standard`, `--ac-ease-out`.
- Eventos: `ac:change`, `ac:select`, `ac:complete`, `ac:valid`.
- Formulário com `data-ac="validate"`: com erro, o envio é barrado e o foco vai ao primeiro campo inválido. Válido, emite `ac:valid` (cancelável) e o formulário é enviado normalmente; para enviar por `fetch`, chame `e.preventDefault()` nesse evento.

## Componentes (81) e modelos de tela (4)

Nomes em português; entre parênteses, o termo em inglês que o mercado usa (convenção de 30/10/2026). A busca do site também acha pelo nome em inglês.

**Fundamentos:** Botão, Botão magnético, Selo e tecla (Badge, Kbd), Avatar, Dica (Tooltip), Alternador e barra de ferramentas (Toggle, Toolbar), Ícones que se transformam.
**Formulários:** Campo de texto (Input), Validação de formulário, Código de verificação (OTP), Caixa de seleção, rádio e interruptor, Controle deslizante (Slider), Controle segmentado, Busca com lista (Combobox), Seletor de data (Date picker), Envio de arquivos (Dropzone), Paleta de cores 3D, Lista de opções (Select), Campo numérico, Seletor de pessoas e tags, Intervalo de datas, Alterações não salvas, Campo de dinheiro, Telefone com país, Campo de senha, Campo copiável, Escolha em cartões, Editor com IA.
**Navegação:** Abas (Tabs), Menu lateral (Sidebar), Menu suspenso (Dropdown), Paleta de comandos, Trilha e paginação (Breadcrumb, Pagination), Etapas (Stepper), Acordeão (Accordion), Menu de contexto e barra de menus, Abas com rolagem, Tour de apresentação.
**Feedback:** Aviso rápido (Toast), Alerta e faixa (Alert, Banner), Diálogo e confirmação (Dialog), Painel lateral (Sheet), Progresso e carregamento (Progress, Spinner), Esqueleto automático (Skeleton), Estado vazio, Balão e cartão de prévia (Popover, Hover card), Páginas de erro e resultado, Carregamento com logo, Faixas de aviso em fila, Diálogo no celular (bottom sheet), Confirmar e alertar, Carregamento com quatro pontos, Espera longa, Sincronizando.
**Dados:** Tabela de dados (Data table), Cartões de indicadores (Stat cards), Gráficos: área, barras e meta, Cartão e cartão recolhível (Card), Tabela em cartões, Linha do tempo, Conversa, Carrossel, Galeria e visualizador (Lightbox), Carrossel de imagens, Destaque com fotos (Hero), Coverflow 3D, Conversa em sequência, Player de vídeo.
**Movimento:** Texto animado por palavra, Brilho e embaralhamento de texto, Faixa rolante (Marquee), Cartão com inclinação 3D, Cartão que vira, Faixa rolante 3D, Grade retrô em perspectiva, Nuvem em esfera 3D, Anel 3D, Palavras que viram em 3D, Revelar ao rolar, Fundo com gradiente animado, Imagem em pontos (Halftone).
**Modelos:** Painel (dashboard), Tela de entrada (login), Pagamento (checkout), Página de preços.

As peças de 28/10/2026 foram reimplementadas em HTML/CSS/JS puro a partir de padrões observados; o detalhe está em `docs/mudancas-2026-10-28.md`.

## Adicionar um componente

1. Estilos em `src/orthos.css` (prefixo `.ac-`), comportamento em `src/orthos.js` como `C.nome = el => { … }`.
2. Demonstração em `site/demos.js` ou `site/demos-novos.js` (objeto com `id, grupo, nome, desc, ref, html, api, a11y`). Para o selo "novo" no menu, `novo: 'AAAA-MM-DD'` com a data de hoje: ele some sozinho depois de 30 dias (`NOVO_DIAS` em `site/site.js`). `novo: true` sem data faz o teste falhar.
3. Guia em `site/guia.js` (`usar`, `evitar`, `dicas`). O teste falha se faltar.
4. Teste em `tests/componentes.html` para o comportamento de teclado.
5. `python build.py` para atualizar `dist/`.

## Testes

A suíte roda no Chrome e no Safari (WebKit) com 174 testes; a mesma página publicada em https://orthos-ui.vercel.app/tests/componentes.html serve para conferir no Firefox e em aparelhos reais.

Sirva a pasta (`python -m http.server`) e abra `/tests/componentes.html`. A página monta todos os componentes, confere a
documentação de cada um e testa o teclado dos componentes interativos; o resultado aparece na tela e em `window.RESULTADO`.

## Acessibilidade

Foco visível em tudo, teclado completo nos componentes interativos (padrões ARIA para tabs, menu, combobox, diálogos),
textos de erro e status anunciados, e `prefers-reduced-motion` respeitado.

## Ícones

Os ícones vêm do conjunto gratuito do [Hugeicons](https://hugeicons.com/icons) (`@hugeicons/core-free-icons` 4.3.5,
estilo stroke rounded, licença MIT, © 2025 Hugeicons). Ficam embutidos como SVG em `ICONS` (`src/orthos.js`) e no `P` das
demos; o traço segue a espessura do `.ac-icon` no CSS. Para incluir outro, copie os elementos do ícone sem os atributos de traço.
