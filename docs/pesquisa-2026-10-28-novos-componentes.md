# Pesquisa de 28/10/2026 (2ª rodada): referências revisitadas, carregamentos do 4squad, sites, 3D e telas

Três frentes em paralelo:
1. As 24 bibliotecas já citadas no projeto, revisitadas página a página.
2. Os efeitos de carregamento do `mvp-validacao.html`, lidos no código do bundle (só Grep; o arquivo é igual a `biblioteca-ui/legacy/biblioteca-4squad-original.html`).
3. Pesquisa web de galerias, 3D/profundidade e recomendações por tipo de tela.

Item marcado **não verificado** não abriu (página só em JS ou 403). Nada aqui foi implementado ainda.

## 1. Status das referências citadas

| Site | No ar | O que mudou |
|---|---|---|
| ui.shadcn.com | sim | Docs divididas em `/docs/components/base/…` e `/docs/components/aria/…`; novos Code Block, Trace e a seção "AI Elements" |
| radix-ui.com | sim | Lista de primitivas não verificada (menu em JS) |
| kobra.systems | sim | Quase tudo fora do "Free" virou **Pro (US$ 19 por componente)**, com o código borrado; novas seções Generative UI e Agents. O Input OTP continua grátis |
| motion-primitives.com | sim | 33 componentes; "Advanced" é pago |
| magicui.design | sim | 77 componentes; Pro só para templates |
| ui.aceternity.com | sim | Componentes grátis; blocks e templates no "All-Access" pago |
| reactbits.dev | sim | Novas categorias Micro (35 microinterações) e Backgrounds |
| 21st.dev | sim | Agora limita a **2 cópias grátis por dia** |
| base-ui.com | sim | 37 componentes (Autocomplete, Checkbox Group, Meter, Preview Card) |
| heroui.com | sim | **Endereço mudou**: `/docs/react/components` (o antigo dá 404) |
| coss.com | sim | 56 componentes; Composer e Chat UI novos |
| mantine.dev | sim | Novos ActionBar, FloatingWindow, OverflowList, RollingNumber, AngleSlider, MaskInput |
| ant.design | sim | **v6**: Masonry, Listy, BorderBeam |
| carbondesignsystem.com | sim | **Endereço mudou**: `/building-blocks/core/components/…`; novo "AI label" |
| m3.material.io | parcial | Página só em JS; componentes não verificados |
| fluent2, GOV.UK, Sonner, Headless UI, Chakra, MUI, Bootstrap | sim | Sem mudança relevante para o Orthos (Bootstrap continua 5.3.8) |
| boneyard.vercel.app | sim | É uma ferramenta que gera skeletons a partir da tela real, não uma biblioteca |

Links de galerias que mudaram: **godly.website → recent.design** (redireciona) e **screenlane.com → pageflows.com**.

## 2. Carregamentos do `mvp-validacao.html` (4squad)

O Orthos já tem: botão carregando, spinner, barra de progresso, skeleton automático com brilho, logo se desenhando e tela cheia com `delay` e `min` (`Orthos.loading()`). Os efeitos que **não** temos:

| Efeito | Como acha no arquivo | Como funciona | Vale? |
|---|---|---|---|
| **Espera longa** (navegador desenhado) | `b-espera-flui` | SVG de uma janela de navegador com 6 blocos pulsando (1,8 s, defasados em .15 s) e 4 traços de luz que correm até ela (5 s). Para esperas de 1–2 min que não travam a tela; `role="status"`, parado com movimento reduzido | **sim, prioridade 1**: não temos nada parecido e serve para IA e tarefas longas |
| **Sincronizando** (sonar) | `b-sinc-onda` | Círculo com ícone e 3 anéis que se expandem (2,4 s), título e detalhe ("tentando de novo"). Substitui o aviso de erro quando um sistema externo demora | **sim, prioridade 2** |
| **Quatro pontos girando** + **carregando na área** | `b-pontos-gira`, `.b-carregando-area{` | 4 bolinhas nos cantos de um quadrado, opacidades diferentes, giram em 2 s com pulso de escala; a área centraliza os pontos e um texto | **sim, prioridade 3** (crédito no catálogo: Uiverse/AbanoubMagdy1, MIT) |
| **Skeleton: pulso, parado e cascata** | `b-esqueletos--pulso`, `b-esqueletos--cascata` | Variante de opacidade (1,8 s), variante sem animação e atraso de 80 ms por bloco | **sim, prioridade 4**: opções novas no `Orthos.skeleton()` |
| **Troca skeleton → conteúdo** | `b-carregavel[data-entrou=false]` | Só mostra o skeleton se a espera passar de 150 ms; o conteúdo entra com fade de .3 s | **sim**, junto com o item anterior |

Os demais keyframes do arquivo são de outros componentes (gaveta, janela, dica) ou brilhos decorativos de fundo. Não há indicador "digitando", pull-to-refresh nem progresso de upload no código.

Observação: no 4squad cada efeito define o próprio estado parado para movimento reduzido (anel em 1,3×, traço a 45%, logo preenchido). Os efeitos novos do Orthos devem fazer o mesmo, em vez de depender só da regra global.

## 3. Componentes candidatos das bibliotecas

Os que mais valem para produtos como 4squad e 4selet:

| Prioridade | Componente | Fonte | Para quê | Esforço |
|---|---|---|---|---|
| alta | Barra de ações em massa | [Chakra Action Bar](https://chakra-ui.com/docs/components/action-bar) | Fecha o fluxo de seleção da Data table | P |
| alta | Lista de resumo (chave/valor com "Alterar") | [GOV.UK Summary list](https://design-system.service.gov.uk/components/summary-list/) | Telas de detalhe e revisão antes de enviar | P |
| alta | Resumo de erros | [GOV.UK Error summary](https://design-system.service.gov.uk/components/error-summary/) | Formulários longos acessíveis, liga no `validate` | P |
| alta | Lista de tarefas | [GOV.UK Task list](https://design-system.service.gov.uk/components/task-list/) | Cadastros e onboarding em várias partes | P |
| alta | Lista com "+N" | [Mantine OverflowList](https://mantine.dev/core/overflow-list/) | Tags, avatares e filtros responsivos | M |
| alta | Árvore | [Chakra Tree view](https://chakra-ui.com/docs/components/tree-view) | Pastas, categorias, permissões | M |
| alta | Seletor de horário | [Ant TimePicker](https://ant.design/components/time-picker) | Completa Date picker e Intervalo | M |
| média | Contador de caracteres | [GOV.UK Character count](https://design-system.service.gov.uk/components/character-count/) | Textarea com limite | P |
| média | Avaliação (estrelas) | [Chakra Rating](https://chakra-ui.com/docs/components/rating) | Feedback, meia estrela, teclado | P |
| média | Texto editável no lugar | [Chakra Editable](https://chakra-ui.com/docs/components/editable) | Renomear sem modal | P |
| média | Progresso em anel / medidor | [Mantine RingProgress](https://mantine.dev/core/ring-progress/) | Cotas e metas em KPIs | P |
| média | Índice da página (scrollspy) | [Mantine TableOfContents](https://mantine.dev/core/table-of-contents/) | Docs, termos, configurações longas | P |
| média | Ajuda que abre no clique (toggletip) | [Carbon Toggletip](https://carbondesignsystem.com/building-blocks/core/components/toggletip) | Tooltip que funciona no toque e aceita link | P |
| média | Segurar para confirmar | [React Bits Hold button](https://reactbits.dev/micro/hold-button) | Ação destrutiva sem modal | P |
| média | Painéis redimensionáveis | [Ant Splitter](https://ant.design/components/splitter) | Lista e detalhe lado a lado | M |
| média | Seleção em níveis | [Ant Cascader](https://ant.design/components/cascader) | Estado → cidade, categorias | M |
| média | Transferência entre listas | [Ant Transfer](https://ant.design/components/transfer) | Permissões e membros | M |
| média | QR code | [Ant QRCode](https://ant.design/components/qr-code) | Pix, login no celular, com estado "expirado" | M |
| média | Painel flutuante | [Chakra Floating panel](https://chakra-ui.com/docs/components/floating-panel) | Base para a bandeja de tarefas em segundo plano | M |
| média | Trace de agente + caixa de prompt | [shadcn Trace](https://ui.shadcn.com/docs/components/base/trace), [coss Composer](https://coss.com/ui/docs/components/composer) | Completa a Conversa para produtos com IA | M |
| baixa | Comparar imagens, popover que se transforma, botão flutuante, molduras de aparelho | Motion Primitives, MUI, Magic UI | Acabamento | P–M |

Lacunas antigas: recorte de foto e grade de dashboard editável continuam sem boa referência aberta.

Tendências vistas: componentes de IA virando categoria própria em quase todas as bibliotecas; docs com MCP e "skills" para agentes; mais coisa paga (Kobra, 21st.dev); microinterações físicas (segurar ou deslizar para confirmar).

## 4. Referências para sites, 3D e telas

### Galerias

| Galeria | Melhor para | Acesso |
|---|---|---|
| [Awwwards](https://www.awwwards.com) | Sites premiados, motion, 3D | misto |
| [Recent](https://recent.design) (antigo Godly) | Web experimental e motion | grátis |
| [Siteinspire](https://www.siteinspire.com) | Editorial e minimalista | grátis |
| [One Page Love](https://onepagelove.com) | Sites de uma página, por seção | grátis |
| [Landingfolio](https://www.landingfolio.com) | Landing pages e seções | freemium |
| [Saaspo](https://saaspo.com) | Sites SaaS por tipo de página | grátis (parcial) |
| [Lapa Ninja](https://www.lapa.ninja) | Mais de 7 mil landing pages | misto (parcial) |
| [Minimal Gallery](https://minimal.gallery), [Httpster](https://httpster.net), [Dark Mode Design](https://www.darkmodedesign.com), [Curated](https://curated.design) | Estilos específicos | grátis / misto |
| [Mobbin](https://mobbin.com), [Page Flows](https://pageflows.com), [Refero](https://refero.design) | Telas e fluxos de apps reais | pagos ou muito limitados no grátis |

### 3D e profundidade (o que serve para um projeto sem framework)

| Técnica | Sem framework | Custo | Uso sugerido |
|---|---|---|---|
| [CSS 3D](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective) (`perspective`, `rotateX/Y`) | sim | 0 KB | Cartão que inclina com o mouse e brilho que segue o cursor |
| [Animações por scroll](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) (`animation-timeline`) | sim | 0 KB | Revelar ao rolar, barra de leitura; Firefox ainda sem suporte, usar `@supports` |
| [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) | sim | 0 KB | Troca entre páginas do site e lista → detalhe |
| [OGL](https://github.com/oframe/ogl) | sim | ~29 KB | Fundo com gradiente em shader (template, não no núcleo) |
| [three.js](https://github.com/mrdoob/three.js) | sim | ~120 KB | Só em templates de hero |
| [`<model-viewer>`](https://modelviewer.dev) | sim | médio | Produto 3D, com AR |
| [Rive](https://rive.app) / [Lottie](https://github.com/airbnb/lottie-web) | sim | runtime | Ilustrações de vazio, sucesso e onboarding |
| [GSAP](https://gsap.com/pricing/) | sim | ~25 KB | Grátis inclusive plugins (segundo a página de preços); só em demos |
| React Three Fiber, Unicorn Studio | não / licença | — | Fora: exige React ou licença comercial paga |

Regra para tudo: estado parado com `prefers-reduced-motion`, pausar fora da tela e funcionar sem o efeito.

### Recomendações por tela

- **Dashboard:** barras e linhas em vez de pizza e gauge; cor só para categoria; um dashboard por tarefa; conteúdo principal com painel de apoio ao lado ([NN/g](https://www.nngroup.com/articles/dashboards-preattentive/), [Material 3](https://m3.material.io/foundations/adaptive-design/canonical-layouts)).
- **Onboarding:** evitar carrossel de tutorial; dicas no primeiro uso; estado vazio que ensina e tem um botão para a próxima ação ([NN/g](https://www.nngroup.com/articles/mobile-app-onboarding/), [NN/g](https://www.nngroup.com/articles/empty-state-interface-design/)).
- **Login:** "mostrar senha", colar permitido, mínimo de 8 sem máximo, mensagem que não diz se o erro foi no usuário ou na senha; considerar OTP e passkeys ([GOV.UK](https://design-system.service.gov.uk/patterns/passwords/)).
- **Configurações:** sub-opção só aparece quando a opção-mãe está ligada; campos agrupados; navegação de seções na lateral ([NN/g](https://www.nngroup.com/articles/complex-application-design/)).
- **Preços:** mostrar o preço; poucos planos, um em destaque; exemplos de cenário em vez de calculadora ([NN/g](https://www.nngroup.com/articles/show-price/), [Laws of UX](https://lawsofux.com)).
- **Checkout:** cerca de 8 campos; compra sem cadastro; bandeira detectada e número espaçado; dados mantidos após erro; total antes do cartão ([Baymard](https://baymard.com/blog/checkout-flow-average-form-fields), [Baymard](https://baymard.com/blog/payment-ux)).
- **Lista e detalhe:** duas colunas em telas largas; cabeçalho e primeira coluna fixos; filtros ativos visíveis; editar num painel lateral, não num modal ([NN/g](https://www.nngroup.com/articles/data-tables/)).
- **Vazio e erro:** nunca deixar área em branco; erro junto ao campo, sem culpar e sem depender de cor; página não encontrada sem o número "404" ([NN/g](https://www.nngroup.com/articles/error-message-guidelines/), [GOV.UK](https://design-system.service.gov.uk/patterns/page-not-found-pages/)).

## 5. O que eu faria, em ordem

1. **Carregamentos do 4squad** (M): espera longa, sincronizando, quatro pontos + área, e as opções novas do skeleton (pulso, parado, cascata, atraso de 150 ms e fade).
2. **Pacote de formulário e dados** (M): barra de ações em massa, lista de resumo, resumo de erros, lista de tarefas, contador de caracteres, seletor de horário.
3. **Profundidade sem dependência** (P): cartão com inclinação 3D, revelar ao rolar, View Transitions no site.
4. **Modelos de tela** (G): app shell com dashboard, login/cadastro com OTP, checkout no padrão Baymard, preços, vazio/404/serviço indisponível.
5. **Segunda leva de componentes** (M): árvore, lista com "+N", anel de progresso, toggletip, segurar para confirmar, QR code.
6. **Biblioteca de referências** (P): cadastrar as galerias e ferramentas 3D novas em `biblioteca-ui/data/refs.js` e trocar Godly por Recent.

## 6. Feito: carregamentos do 4squad

Reimplementados a partir do código do `mvp-validacao.html` (mesmas medidas e tempos), com a classe `ac-` e as cores do Orthos:

| Peça | Uso | Movimento reduzido |
|---|---|---|
| Quatro pontos | `data-ac="orbit"` (`data-size`, `.ac-orbit--inherit`) | parado |
| Carregando na área | `.ac-loading-area` com `role="status"` e `.ac-loading-area__text` | parado |
| Espera longa | `data-ac="wait"` (`data-label`, `data-note`, `--light-a`, `--light-b`) | blocos parados, traços apagados |
| Sincronizando | `data-ac="sync"` (`data-title`, `data-detail`, `data-variant="dots"`) | um anel parado |
| Skeleton | `Orthos.skeleton(el, on, { animation: 'shimmer' \| 'pulse' \| 'static', cascade, delay })` e `.ac-skel--pulse`, `.ac-skel--static` | regra global |

Também corrigido: chamar `Orthos.skeleton(el, true)` com o esqueleto já ligado media o conteúdo escondido e não gerava nenhum bloco.
Ícone do Sincronizando: Hugeicons "refresh". Testes: 4 novos (129 no total).

## 7. Feito: imagens, banner, 3D e modelos de tela

| Peça | Uso | Observação |
|---|---|---|
| Galeria e lightbox | `data-ac="gallery"` (`.ac-gallery--featured`, `.ac-gallery--masonry`), `Orthos.lightbox()` | setas, miniaturas, arrastar, Home/End, Esc devolve o foco |
| Carrossel de imagens | `data-thumbs`, `data-lightbox` no carrossel existente | miniaturas no lugar das bolinhas |
| Coverflow 3D | `data-ac="coverflow"` | só CSS 3D; ← → no palco; só a imagem da frente é lida |
| Banner com fotos | `data-ac="hero"` | inspirado na tela de entrada do 4squad; barrinhas tipo stories, pausa (WCAG 2.2.2) |
| Cartão com inclinação 3D | `data-ac="tilt"`, `data-depth` | desligado em toque e com movimento reduzido |
| Revelar ao rolar | `data-ac="reveal"`, `data-ac="scroll-progress"` | `animation-timeline: view()`; IntersectionObserver no Firefox |
| Fundo animado | `.ac-aurora` | `@property` + `conic-gradient` |
| View Transitions | `Orthos.transition(fn)` | fade de .22 s; tirado da navegação do site em 29/10 (dava sensação de travamento ao trocar de página) |
| Campo de cartão | `data-ac="card-number"` | bandeira (Visa, Mastercard, Elo, Amex, Hipercard) e número espaçado |
| Modelos | `.ac-shell`, `.ac-auth`, `.ac-checkout`, `.ac-pricing` | container queries: reagem à largura do contêiner |

- **Fotos reais:** 15 fotos da Unsplash em `assets/fotos/` (Licença da Unsplash conferida em 28/10/2026; nenhuma Unsplash+), com crédito de cada fotógrafo em `assets/fotos/CREDITOS.md`.
- **Site:** demos largas centralizadas na vertical; "Ver como Markdown" foi para a barra de cima; selo "novo" agora tem data (`novo: 'AAAA-MM-DD'`) e some depois de 30 dias; a suíte recusa `novo: true` sem data.
- **Tabela em cartões:** moldura de aparelho que abre em 375 px; o seletor esconde os tamanhos que não cabem na tela de quem vê.
- **biblioteca-ui:** 16 fontes novas (galerias, Baymard, Laws of UX, Unsplash, three.js, OGL, model-viewer, Rive, GSAP) e 27 referências novas; Awwwards verificado.
- **Corrigido no caminho:** `@keyframes ac-grow` repetido (a barra de leitura usava a animação das barras do gráfico); segmented com `hidden` continuava visível.

## 8. Mais efeitos 3D (29/10/2026)

Catálogos revisitados: Aceternity UI (3D Card, 3D Marquee, 3D Pin, Parallax Hero, Background Cubes Grid, Comet Card) e Magic UI (Retro Grid, Icon Cloud, Text 3D Flip, Orbiting Circles, Floating 3D Particles). Reimplementados em CSS 3D e JS do Orthos, sem React nem Motion:

| Peça | Uso | Referência |
|---|---|---|
| Cartão que vira | `data-ac="flip"` (frente e verso; a face de costas fica inert) | MDN backface-visibility |
| Marquee 3D | `data-ac="marquee3d"` (4 colunas inclinadas, pausa) | Aceternity 3D Marquee |
| Grade retrô | `.ac-retro-grid` (só CSS) | Magic UI Retro Grid |
| Nuvem em esfera | `data-ac="sphere"` (espiral de Fibonacci, arrastar empurra) | Magic UI Icon Cloud |
| Anel 3D | `data-ac="ring3d"` (cilindro, encaixa ao soltar, ← →) | MDN preserve-3d |
| Palavras que viram | `data-ac="flip-words"` (letra a letra; o leitor ouve a frase uma vez) | Magic UI Text 3D Flip |

Ficaram para depois: 3D Pin, cubos em grade que ondulam sob o cursor (Background Cubes Grid), globo 3D (precisa de WebGL) e partículas 3D.
Também nesta rodada: rodapé da página inicial compacto (marca à esquerda, links à direita), "Ver todos" na lista de componentes e nenhuma menção a 4squad ou 4Selet no site e na biblioteca publicada.

## 9. Peças da Kobra (29/10/2026)

Estudadas em kobra.systems (seção grátis) e reimplementadas em JS puro, sem React, Loomix nem Motion:

| Peça | Uso | Observação |
|---|---|---|
| Player de vídeo | `data-ac="video"` (`data-title`, `data-youtube`, `data-glass="liquid|blur"`) | controles em vidro, barra com tempo no hover, velocidade, legendas, PiP, tela cheia, teclado |
| Halftone | `data-ac="halftone"` (`data-images`, `data-labels`, `data-gradient`) | canvas; figuras com fundo transparente viram pontos em degradê; a demo usa o símbolo do Orthos e ícones do Hugeicons |
| Ícones que se transformam | `data-ac="morph-icon"` com `<svg data-off>` e `<svg data-on>` | traços se apagam e se desenham; 12 pares do Hugeicons na demo |
| Editor com IA | `data-ac="ai-editor"` + evento `ac:ask` | barra na seleção, pedido, resposta em streaming, Substituir/Inserir/Descartar |
| Conversa em sequência | `data-ac="conversation"` (`data-play`, `.ac-conversation--ios`) | reaproveita os balões da Conversa; “digitando…” e entrada com desfoque |

O vídeo da demo é do Pexels (licença conferida; crédito em `assets/video/CREDITOS.md`).
Também nesta rodada: a navegação pelo menu ficou sem View Transition (dava sensação de travamento), o menu não é mais redesenhado a cada página e o sparkline não força layout; os modelos de tela corrigidos no celular (a container query não alcança o próprio contêiner, então a grade foi para um elemento interno).

