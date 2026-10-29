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
│   ├── pesquisa-referencias.md ← pesquisa em 28 sites + 4squad
│   ├── mudancas-2026-10-27.md  ← atualização de 27/10
│   ├── mudancas-2026-10-28.md  ← navegadores, correções, estrutura e componentes de referência
│   └── prototipos/color-picker.html ← protótipo que deu origem ao Color palette 3D
├── brand/              ← logo e símbolo (SVG)
├── biblioteca-ui/      ← app separado: biblioteca de referências UI/UX (298 referências + telas do 4squad)
├── index.html          ← site de documentação
├── build.py            ← gera dist/ (python build.py --check avisa se dist/ ficou para trás)
├── .vercelignore       ← o que não vai para o site publicado
└── dist/
    ├── orthos-ui.html  ← site inteiro em um arquivo (abre em qualquer visualizador)
    ├── orthos.css
    └── orthos.js
```

A pasta `work/` (extração do `mvp-validacao.html` e rascunhos) é local: está no `.gitignore` e fora do deploy.

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
- Componentes declarativos: `data-ac="tabs | accordion | segmented | menu | otp | combo | datepicker | dropzone | slider | counter | validate | table | sidebar | stepper | text-effect | number | scramble | magnetic | spotlight | spark | bars | palette | copy | select | popover | hovercard | contextmenu | menubar | toggle | toolbar | number-field | people | tags | daterange | area | collapsible | result | dirty | money | phone | carousel | password | copyfield | banners | chat | stack"`.
- Conteúdo inserido depois do carregamento: `Orthos.init(elemento)`.
- APIs: `Orthos.toast()` (com `.update()`), `Orthos.toast.promise(promessa, mensagens)`, `Orthos.command()`, `Orthos.skeleton(el, on)`, `Orthos.open(dialog)`, `Orthos.close(dialog)`, `Orthos.results` (textos das páginas de erro), `Orthos.logo.load(el, arquivo)`, `Orthos.logo.replay(el)`, `Orthos.loading({ logo, text })` (tela de carregamento), `Orthos.tour(passos)`, `Orthos.dirty.baseline(form)`, `Orthos.confirm(opções)` e `Orthos.alert(mensagem)` (devolvem Promise; com `onConfirm` assíncrono o botão fica carregando e o erro aparece dentro da janela).
- Atalho global: `Alt+T` leva o foco aos avisos.
- Escala de texto: `--ac-fs-xs` 12px · `sm` 13 · `base` 14 · `md` 15 · `lg` 17 · `xl` 20 · `2xl` 22 · `3xl` 28 · `touch` 16 (campos em telas de toque, para o Safari do iPhone não dar zoom). 12px é o mínimo; a suíte de testes falha se alguma demo tiver texto menor. Dicas (`.ac-hint`), erros (`.ac-error`) e cabeçalhos de tabela usam 14px. O site de documentação usa `--site-read` (16px) no texto corrido e no menu, e `--site-small` (14px) nos rótulos.
- Tokens de forma e movimento: `--ac-btn-radius`, `--ac-dur-fast | base | slow | overlay`, `--ac-ease-standard`, `--ac-ease-out`.
- Eventos: `ac:change`, `ac:select`, `ac:complete`, `ac:valid`.
- Formulário com `data-ac="validate"`: com erro, o envio é barrado e o foco vai ao primeiro campo inválido. Válido, emite `ac:valid` (cancelável) e o formulário é enviado normalmente; para enviar por `fetch`, chame `e.preventDefault()` nesse evento.

## Componentes (60)

**Fundamentos:** Button (variantes, carregando, shimmer), Magnetic button, Badge e Kbd, Avatar, Tooltip, Toggle/Toolbar/grupo de botões/separador.
**Formulários:** Input e Field, Validação, Input OTP (campo único no modelo do Kobra), Checkbox/Radio/Switch, Slider, Segmented, Combobox, Date picker, File dropzone, Color palette 3D, Select, Number field, Seletor de pessoas e tags, Intervalo de datas, Alterações não salvas, Campo de dinheiro, Telefone com país, Campo de senha (regras ao vivo, modo segredo), Campo copiável, Escolha em cartões.
**Navegação:** Tabs, Sidebar, Dropdown menu, Command palette, Breadcrumb e Pagination, Stepper, Accordion, Context menu e Menubar, Abas com muitas seções, Tour de apresentação; Sidebar com largura ajustável.
**Feedback:** Toast (pilha, promessa, arrastar, Alt+T), Alert e Banner, Dialog e confirmação, Sheet, Progress e Spinner, Skeleton automático, Empty state, Popover e Hover card, Páginas de erro e resultado, Carregamento com logo (SVG traçado ou imagem, tela inteira), Faixas de aviso em fila, Diálogo em bottom sheet no celular (com teclado virtual), Confirmar e alertar.
**Dados:** Data table (busca, filtro, ordenação, seleção em lote com desfazer, paginação), Stat cards e gráficos, Gráficos de área/barras/meta/empilhada, Card e cartão recolhível, Tabela em cartões no celular, Linha do tempo, Conversa (chat), Carrossel acessível.
**Movimento:** Text effect, Text shimmer e scramble, Marquee.

As 10 peças de 28/10/2026 vieram dos projetos próprios (4squad, zero-7-global, 4selet-v2, 4selet-pay e 4selet.Partners) e foram
reimplementadas em HTML/CSS/JS puro; o detalhe está em `docs/mudancas-2026-10-28.md`.

## Adicionar um componente

1. Estilos em `src/orthos.css` (prefixo `.ac-`), comportamento em `src/orthos.js` como `C.nome = el => { … }`.
2. Demonstração em `site/demos.js` ou `site/demos-novos.js` (objeto com `id, grupo, nome, desc, ref, html, api, a11y`).
3. Guia em `site/guia.js` (`usar`, `evitar`, `dicas`). O teste falha se faltar.
4. Teste em `tests/componentes.html` para o comportamento de teclado.
5. `python build.py` para atualizar `dist/`.

## Testes

A suíte roda no Chrome e no Safari (WebKit) com 122 testes; a mesma página publicada em https://orthos-ui.vercel.app/tests/componentes.html serve para conferir no Firefox e em aparelhos reais.

Sirva a pasta (`python -m http.server`) e abra `/tests/componentes.html`. A página monta todos os componentes, confere a
documentação de cada um e testa o teclado dos componentes interativos; o resultado aparece na tela e em `window.RESULTADO`.

## Acessibilidade

Foco visível em tudo, teclado completo nos componentes interativos (padrões ARIA para tabs, menu, combobox, diálogos),
textos de erro e status anunciados, e `prefers-reduced-motion` respeitado.

## Ícones

Os ícones vêm do conjunto gratuito do [Hugeicons](https://hugeicons.com/icons) (`@hugeicons/core-free-icons` 4.3.5,
estilo stroke rounded, licença MIT, © 2025 Hugeicons). Ficam embutidos como SVG em `ICONS` (`src/orthos.js`) e no `P` das
demos; o traço segue a espessura do `.ac-icon` no CSS. Para incluir outro, copie os elementos do ícone sem os atributos de traço.
