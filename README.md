Atualização de teste do Git — 27/10/2026.

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
│   └── componentes.html ← testes automáticos (abra no navegador)
├── docs/
│   ├── pesquisa-referencias.md ← pesquisa em 28 sites + 4squad
│   └── mudancas-2026-10-27.md  ← o que mudou nesta atualização
├── index.html          ← site de documentação
├── build.py            ← gera dist/
└── dist/
    ├── orthos-ui.html  ← site inteiro em um arquivo (abre em qualquer visualizador)
    ├── orthos.css
    └── orthos.js
```

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

- Tema: `data-theme="light"` ou `"dark"` no `<html>`; sem o atributo, segue o sistema.
- Componentes declarativos: `data-ac="tabs | accordion | segmented | menu | otp | combo | datepicker | dropzone | slider | counter | validate | table | sidebar | stepper | text-effect | number | scramble | magnetic | spotlight | spark | bars | palette | copy | select | popover | hovercard | contextmenu | menubar | toggle | toolbar | number-field | people | tags | daterange | area | collapsible | result"`.
- Conteúdo inserido depois do carregamento: `Orthos.init(elemento)`.
- APIs: `Orthos.toast()` (com `.update()`), `Orthos.toast.promise(promessa, mensagens)`, `Orthos.command()`, `Orthos.skeleton(el, on)`, `Orthos.open(dialog)`, `Orthos.close(dialog)`, `Orthos.results` (textos das páginas de erro), `Orthos.logo.load(el, arquivo)`, `Orthos.logo.replay(el)`, `Orthos.loading({ logo, text })` (tela de carregamento), `Orthos.tour(passos)`, `Orthos.dirty.baseline(form)`.
- Atalho global: `Alt+T` leva o foco aos avisos.
- Tokens de forma e movimento: `--ac-btn-radius`, `--ac-dur-fast | base | slow | overlay`, `--ac-ease-standard`, `--ac-ease-out`.
- Eventos: `ac:change`, `ac:select`, `ac:complete`.

## Componentes (50)

**Fundamentos:** Button (variantes, carregando, shimmer), Magnetic button, Badge e Kbd, Avatar, Tooltip, Toggle/Toolbar/grupo de botões/separador.
**Formulários:** Input e Field, Validação, Input OTP, Checkbox/Radio/Switch, Slider, Segmented, Combobox, Date picker, File dropzone, Color palette 3D, Select, Number field, Seletor de pessoas e tags, Intervalo de datas, Alterações não salvas, Campo de dinheiro, Telefone com país.
**Navegação:** Tabs, Sidebar, Dropdown menu, Command palette, Breadcrumb e Pagination, Stepper, Accordion, Context menu e Menubar, Abas com muitas seções, Tour de apresentação; Sidebar com largura ajustável.
**Feedback:** Toast (pilha, promessa, arrastar, Alt+T), Alert e Banner, Dialog e confirmação, Sheet, Progress e Spinner, Skeleton automático, Empty state, Popover e Hover card, Páginas de erro e resultado, Carregamento com logo (SVG traçado ou imagem, tela inteira).
**Dados:** Data table (busca, filtro, ordenação, seleção em lote com desfazer, paginação), Stat cards e gráficos, Gráficos de área/barras/meta/empilhada, Card e cartão recolhível.
**Movimento:** Text effect, Text shimmer e scramble, Marquee.

## Adicionar um componente

1. Estilos em `src/orthos.css` (prefixo `.ac-`), comportamento em `src/orthos.js` como `C.nome = el => { … }`.
2. Demonstração em `site/demos.js` ou `site/demos-novos.js` (objeto com `id, grupo, nome, desc, ref, html, api, a11y`).
3. Guia em `site/guia.js` (`usar`, `evitar`, `dicas`). O teste falha se faltar.
4. Teste em `tests/componentes.html` para o comportamento de teclado.
5. `python build.py` para atualizar `dist/`.

## Testes

Sirva a pasta (`python -m http.server`) e abra `/tests/componentes.html`. A página monta todos os componentes, confere a
documentação de cada um e testa o teclado dos componentes interativos; o resultado aparece na tela e em `window.RESULTADO`.

## Acessibilidade

Foco visível em tudo, teclado completo nos componentes interativos (padrões ARIA para tabs, menu, combobox, diálogos),
textos de erro e status anunciados, e `prefers-reduced-motion` respeitado.

## Ícones

Os ícones vêm do conjunto gratuito do [Hugeicons](https://hugeicons.com/icons) (`@hugeicons/core-free-icons` 4.3.5,
estilo stroke rounded, licença MIT, © 2025 Hugeicons). Ficam embutidos como SVG em `ICONS` (`src/orthos.js`) e no `P` das
demos; o traço segue a espessura do `.ac-icon` no CSS. Para incluir outro, copie os elementos do ícone sem os atributos de traço.
