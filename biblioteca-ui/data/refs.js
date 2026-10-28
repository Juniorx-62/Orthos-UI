/* Referências externas curadas. Cada URL foi aberta (HTTP 200, sem redirecionar para home/login) em 2026-10-26.
   Campos: d descrição · pr problema resolvido · u quando usar · e quando evitar · a acessibilidade · o observação de auditoria
           t tags · p problemas (ids de meta.js) · ctx desktop|mobile|ambos · est estados · vars variantes
   Os textos de u/e/a/o são notas do curador (orientação geral), não citações da fonte. */
(function () {
  const L = [];
  const R = (id, cat, tipo, fonte, nome, url, o) => L.push({ id, cat, tipo, fonte, nome, url, ctx: 'ambos', add: '2026-10-26', ...o });

  /* ===================== A. Elementos fundamentais ===================== */
  R('shadcn-field', 'A', 'implementavel', 'shadcn', 'Field (rótulo, controle, ajuda e erro)', 'https://ui.shadcn.com/docs/components/field', {
    d: 'Estrutura que agrupa rótulo, controle, texto de ajuda e mensagem de erro de um campo.',
    pr: 'Campos soltos, sem rótulo associado ou com erros desconectados do input.',
    u: 'Base de qualquer formulário; padroniza o espaçamento e a associação rótulo↔campo.',
    e: 'Controles isolados em barras de ferramentas, onde o rótulo ocupa espaço demais.',
    a: 'Conferir se rótulo e mensagem de erro estão associados por for/aria-describedby.',
    o: 'Auditar: todo input tem rótulo visível? O erro aparece junto ao campo?', t: ['formulário', 'campo', 'rótulo', 'erro'], p: ['p-form'], tech: 'React, Tailwind'
  });
  R('m3-text-fields', 'A', 'conceitual', 'm3', 'Campos de texto (Material 3)', 'https://m3.material.io/components/text-fields/overview', {
    d: 'Diretrizes para campos preenchidos e contornados, com rótulo flutuante, texto de apoio, ícones e estados.',
    pr: 'Campos sem estados claros (foco, erro, desabilitado) ou sem texto de apoio.',
    u: 'Referência de anatomia e estados de input em apps, inclusive mobile.',
    e: 'Rótulo flutuante em formulários longos pode dificultar a leitura; avaliar rótulo fixo acima do campo.',
    est: ['normal', 'foco', 'erro', 'desabilitado'], t: ['input', 'estados', 'mobile'], p: ['p-form']
  });
  R('shadcn-combobox', 'A', 'implementavel', 'shadcn', 'Combobox (seleção com busca)', 'https://ui.shadcn.com/docs/components/combobox', {
    d: 'Campo de seleção que permite digitar para filtrar as opções.',
    pr: 'Selects com dezenas de opções que obrigam a rolar a lista inteira.',
    u: 'Listas médias/longas (países, usuários, projetos).',
    e: 'Poucas opções (até ~5): prefira radio ou select simples. Em mobile, avaliar o seletor nativo.',
    a: 'Seguir o padrão ARIA combobox (ver entrada do APG).', t: ['select', 'busca', 'combobox'], p: ['p-form'], tech: 'React, Tailwind'
  });
  R('apg-combobox', 'A', 'conceitual', 'apg', 'Combobox (padrão ARIA)', 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/', {
    d: 'Especificação de papéis, estados e teclas de um combobox acessível.',
    pr: 'Comboboxes que só funcionam com mouse.',
    u: 'Critério para auditar qualquer select com busca/autocomplete.', a: 'Documento normativo de referência para teclado e ARIA.', t: ['teclado', 'aria', 'combobox'], p: ['p-contraste']
  });
  R('shadcn-switch', 'A', 'implementavel', 'shadcn', 'Switch', 'https://ui.shadcn.com/docs/components/switch', {
    d: 'Alternador liga/desliga com efeito imediato.',
    pr: 'Checkbox usado para preferências que se aplicam na hora, confundindo o usuário sobre salvar.',
    u: 'Configurações que valem imediatamente.', e: 'Quando é preciso clicar em “Salvar” para aplicar: use checkbox.',
    a: 'Rótulo claro do estado e alvo de toque suficiente.', t: ['switch', 'toggle', 'configuração'], tech: 'React, Tailwind'
  });
  R('nng-toggle', 'A', 'conceitual', 'nngroup', 'Diretrizes para toggle switches', 'https://www.nngroup.com/articles/toggle-switch-guidelines/', {
    d: 'Artigo do NN/G sobre quando usar toggles e como rotulá-los.',
    pr: 'Toggles ambíguos (o rótulo descreve o estado ou a ação?).', u: 'Justificar uma troca de checkbox por switch (ou o contrário).', t: ['toggle', 'rótulo'], p: ['p-form']
  });
  R('radix-slider', 'A', 'implementavel', 'radix', 'Slider', 'https://www.radix-ui.com/primitives/docs/components/slider', {
    d: 'Controle de valor ou intervalo por arrastar, com teclado.',
    pr: 'Ajuste numérico sem feedback do valor.', u: 'Valores aproximados em intervalo conhecido.', e: 'Precisão exata: combine com campo numérico.',
    a: 'Setas, Home/End e Page Up/Down ajustam o valor.', t: ['slider', 'intervalo'], tech: 'React'
  });
  R('shadcn-date-picker', 'A', 'implementavel', 'shadcn', 'Date Picker', 'https://ui.shadcn.com/docs/components/date-picker', {
    d: 'Seletor de data composto por popover e calendário.',
    pr: 'Datas digitadas em formatos inconsistentes.', u: 'Datas próximas do presente.',
    e: 'Datas muito distantes (nascimento): campos separados de dia/mês/ano costumam ser mais rápidos.', t: ['data', 'calendário', 'popover'], p: ['p-form'], tech: 'React, Tailwind'
  });
  R('m3-date-pickers', 'A', 'conceitual', 'm3', 'Date pickers (Material 3)', 'https://m3.material.io/components/date-pickers/overview', {
    d: 'Variações modal, modal com entrada e intervalo para escolher datas, com foco em mobile.',
    pr: 'Seletor de data minúsculo e difícil de tocar no celular.', u: 'Apps mobile e fluxos de agendamento.', ctx: 'mobile', t: ['data', 'mobile', 'intervalo']
  });
  R('gov-date-input', 'A', 'conceitual', 'govuk', 'Date input (GOV.UK)', 'https://design-system.service.gov.uk/components/date-input/', {
    d: 'Três campos (dia, mês, ano) com rótulos e regras de erro.',
    pr: 'Seletores de calendário lentos para datas conhecidas de cor.', u: 'Datas de nascimento ou documentos.', t: ['data', 'formulário', 'erro'], p: ['p-form']
  });
  R('shadcn-input-otp', 'A', 'implementavel', 'shadcn', 'Input OTP', 'https://ui.shadcn.com/docs/components/input-otp', {
    d: 'Campo segmentado para códigos de verificação.', pr: 'Código digitado em campo único sem indicação de quantidade de dígitos.',
    u: 'Verificação em duas etapas, confirmação de e-mail ou telefone.', t: ['otp', 'verificação', 'login'], tech: 'React, Tailwind'
  });
  R('kobra-input-otp', 'A', 'inspiracao', 'kobra', 'Input OTP (Kobra)', 'https://kobra.systems/components/input-otp', {
    d: 'Variação de OTP com estado de erro (“Invalid code. Please try again.”) na demonstração.', pr: 'Referência de feedback de código inválido.',
    u: 'Comparar com a versão do shadcn/ui.', t: ['otp', 'erro', 'verificação']
  });
  R('kobra-color-palette', 'A', 'inspiracao', 'kobra', 'Color Palette (Kobra, Pro)', 'https://kobra.systems/components/color-palette', {
    d: 'Roda de dezenove amostras, matiz ao redor e saturação para dentro (descrição da página).', pr: 'Referência visual para seletores de cor predefinidos.',
    u: 'Inspiração. O código é pago e não foi acessado.', o: 'Item Pro: página mostra “Buy component ($19)”.', t: ['cor', 'paleta', 'pago']
  });
  R('mantine-color-picker', 'A', 'implementavel', 'mantine', 'ColorPicker (Mantine)', 'https://mantine.dev/core/color-picker/', {
    d: 'Seletor de cor com saturação/matiz, campo de valor e amostras predefinidas.', pr: 'Entrada de cor só por hexadecimal.',
    u: 'Edição de tema, tags coloridas.', e: 'Quando há poucas cores permitidas, use amostras fixas.', t: ['cor', 'paleta'], tech: 'React'
  });
  R('antd-color-picker', 'A', 'implementavel', 'antd', 'ColorPicker (Ant Design)', 'https://ant.design/components/color-picker', {
    d: 'Seletor de cor com painel, presets e formatos de saída.', pr: 'Escolha de cor sem presets.', u: 'Personalização de tema.', t: ['cor', 'paleta'], tech: 'React'
  });
  R('gallery-color-picker', 'A', 'inspiracao', 'compgallery', 'Color picker (galeria de design systems)', 'https://component.gallery/components/color-picker/', {
    d: 'Exemplos de seletores de cor de vários design systems lado a lado.', pr: 'Decidir entre roda, quadro, amostras ou campo.', u: 'Comparação de alternativas.', t: ['cor', 'comparação']
  });
  R('antd-upload', 'A', 'implementavel', 'antd', 'Upload (Ant Design)', 'https://ant.design/components/upload', {
    d: 'Upload com arrastar e soltar, lista de arquivos, progresso e pré-visualização.', pr: 'Envio sem progresso ou sem como remover.',
    u: 'Anexos, imagens, documentos.', est: ['vazio', 'enviando', 'concluído', 'erro'], t: ['upload', 'arquivos', 'progresso'], p: ['p-feedback'], tech: 'React'
  });
  R('gov-file-upload', 'A', 'conceitual', 'govuk', 'File upload (GOV.UK)', 'https://design-system.service.gov.uk/components/file-upload/', {
    d: 'Campo de arquivo com orientações sobre erros e tipos aceitos.', pr: 'Falhas de upload sem explicação.', u: 'Serviços onde o upload é obrigatório.', t: ['upload', 'erro', 'acessibilidade'], p: ['p-erro']
  });
  R('gallery-file-upload', 'A', 'inspiracao', 'compgallery', 'File upload (galeria)', 'https://component.gallery/components/file-upload/', {
    d: 'Exemplos de upload em diferentes design systems.', pr: 'Escolher entre botão simples e dropzone.', u: 'Comparação.', t: ['upload', 'comparação']
  });
  R('shadcn-badge', 'A', 'implementavel', 'shadcn', 'Badge', 'https://ui.shadcn.com/docs/components/badge', {
    d: 'Rótulo curto de status ou categoria.', pr: 'Status indicado só por cor.', u: 'Estado de registro, contagens, categorias.',
    e: 'Como botão (use Button).', a: 'Não depender apenas da cor; incluir texto.', t: ['badge', 'status'], tech: 'React, Tailwind'
  });
  R('radix-tooltip', 'A', 'implementavel', 'radix', 'Tooltip', 'https://www.radix-ui.com/primitives/docs/components/tooltip', {
    d: 'Dica contextual que aparece em hover e foco.', pr: 'Ícones sem rótulo.', u: 'Complementar um ícone ou abreviação.',
    e: 'Conteúdo essencial ou interativo: tooltips não funcionam em toque; use texto visível ou popover.', a: 'Deve abrir com foco de teclado.', t: ['tooltip', 'ajuda'], tech: 'React'
  });
  R('apg-tooltip', 'A', 'conceitual', 'apg', 'Tooltip (padrão ARIA)', 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/', {
    d: 'Papel e comportamento esperados de um tooltip acessível.', pr: 'Dicas inacessíveis por teclado.', u: 'Auditar tooltips existentes.', t: ['tooltip', 'aria'], p: ['p-contraste']
  });
  R('m3-chips', 'A', 'conceitual', 'm3', 'Chips (Material 3)', 'https://m3.material.io/components/chips/overview', {
    d: 'Chips de assistência, filtro, entrada e sugestão.', pr: 'Filtros e tags sem representação compacta.', u: 'Filtros rápidos e entrada de tags.', t: ['chips', 'filtros', 'tags'], p: ['p-filtros']
  });
  R('hugeicons-lib', 'A', 'recurso', 'hugeicons', 'Hugeicons (biblioteca de ícones)', 'https://hugeicons.com/', {
    d: 'Mais de 60.000 ícones em vários estilos; integração com React, Vue, Angular e outros.', pr: 'Ícones de famílias diferentes na mesma interface.',
    u: 'Padronizar um único conjunto de ícones.', o: 'Parte do catálogo é Pro (página /pricing).', t: ['ícones', 'consistência']
  });
  R('uiverse-lib', 'A', 'recurso', 'uiverse', 'Uiverse (elementos de UI)', 'https://uiverse.io/', {
    d: 'Coleção open source de botões, toggles, loaders e cards em HTML/CSS.', pr: 'Ideias rápidas para elementos isolados.',
    u: 'Inspiração visual.', e: 'Como evidência de usabilidade: a qualidade varia por autor.', t: ['elementos', 'css', 'inspiração']
  });
  R('freefrontend-lib', 'A', 'recurso', 'freefrontend', 'FreeFrontend (snippets)', 'https://freefrontend.com/', {
    d: 'Exemplos de HTML/CSS/JS com preview, código, nível, compatibilidade de navegadores e download.', pr: 'Aprender uma técnica visual específica.',
    u: 'Estudo de técnica.', e: 'Reutilizar sem verificar a licença do exemplo.', t: ['snippets', 'css']
  });

  R('shadcn-button', 'A', 'implementavel', 'shadcn', 'Button (variantes e tamanhos)', 'https://ui.shadcn.com/docs/components/button', {
    d: 'Botão com variantes visuais (primário, secundário, contorno, fantasma, destrutivo), tamanhos e estado de carregamento.', pr: 'Todas as ações com o mesmo peso visual.',
    u: 'Definir uma ação principal por área e rebaixar as demais.', e: 'Várias ações primárias lado a lado na mesma barra.', est: ['normal', 'hover', 'foco', 'desabilitado', 'carregando'],
    a: 'Alvo de toque suficiente e foco visível; botão só com ícone precisa de rótulo acessível.', t: ['botão', 'hierarquia', 'ações'], p: ['p-botoes', 'p-hierarquia'], tech: 'React, Tailwind'
  });
  R('m3-buttons', 'A', 'conceitual', 'm3', 'Buttons (Material 3)', 'https://m3.material.io/components/buttons/overview', {
    d: 'Diretrizes de botões do Material 3 (a página é renderizada por JavaScript e seu texto não pôde ser lido neste ambiente; confira os detalhes na fonte).', pr: 'Ações sem diferença de ênfase.', u: 'Comparar o critério de ênfase com outros sistemas.', t: ['botão', 'hierarquia', 'ênfase'], p: ['p-botoes', 'p-hierarquia']
  });
  R('primer-button', 'A', 'implementavel', 'primer', 'Button (Primer)', 'https://primer.style/product/components/button/', {
    d: 'Botão do Primer. A documentação define o primário como a ação de maior prioridade, a usar com parcimônia e nunca mais de um por grupo de botões; há variantes secundária, invisível e de perigo.', pr: 'Variantes usadas sem critério.', u: 'Regra clara de uso do botão primário.', t: ['botão', 'hierarquia'], p: ['p-botoes'], tech: 'React'
  });
  R('gitlab-button', 'A', 'implementavel', 'pajamas', 'Button (Pajamas)', 'https://design.gitlab.com/components/button/', {
    d: 'Botão do GitLab com categorias primária, secundária e terciária e variantes (como confirmar e perigo).', pr: 'Variantes sem critério.', u: 'Comparar com Primer.', t: ['botão', 'hierarquia'], p: ['p-botoes'], tech: 'Vue'
  });
  R('carbon-common-actions', 'G', 'conceitual', 'carbon', 'Common actions (Carbon)', 'https://www.carbondesignsystem.com/building-blocks/core/patterns/common-actions', {
    d: 'Define o significado e o uso de ações comuns, como Add, Cancel, Clear, Close, Copy, Delete, Edit, Next, Refresh, Remove e Reset.', pr: 'Ações com nomes e comportamentos inconsistentes entre telas.', u: 'Padronizar rótulos e comportamento de ações em formulários e barras de ação.', t: ['ações', 'botões', 'hierarquia'], p: ['p-botoes', 'p-hierarquia']
  });

  /* ===================== B. Navegação e estrutura ===================== */
  R('shadcn-sidebar', 'B', 'implementavel', 'shadcn', 'Sidebar', 'https://ui.shadcn.com/docs/components/sidebar', {
    d: 'Barra lateral colapsável com grupos, itens, subitens e rodapé.', pr: 'Menu lateral sem agrupamento ou sem recolher.',
    u: 'Aplicações com mais de ~5 áreas.', e: 'Produtos com 3 seções: abas superiores bastam.', est: ['expandida', 'recolhida', 'item ativo'],
    resp: 'Vira painel deslizante no celular.', a: 'Item atual deve ser indicado de forma programática (aria-current).', t: ['sidebar', 'menu lateral', 'colapsável'], p: ['p-sidebar', 'p-nav'], ctx: 'desktop', tech: 'React, Tailwind'
  });
  R('m3-nav-drawer', 'B', 'conceitual', 'm3', 'Navigation drawer', 'https://m3.material.io/components/navigation-drawer/overview', {
    d: 'Menu lateral amplo para destinos de alto nível.', pr: 'Menu com muitos destinos sem hierarquia.', u: 'Telas grandes com muitas seções.', t: ['sidebar', 'menu lateral'], p: ['p-sidebar'], ctx: 'desktop'
  });
  R('m3-nav-rail', 'B', 'conceitual', 'm3', 'Navigation rail', 'https://m3.material.io/components/navigation-rail/overview', {
    d: 'Faixa estreita de ícones com rótulos para tablet/desktop.', pr: 'Aproveitar largura sem perder a navegação.', u: 'Entre 3 e 7 destinos em telas médias.', t: ['sidebar', 'tablet'], p: ['p-sidebar'], ctx: 'desktop'
  });
  R('m3-nav-bar', 'B', 'conceitual', 'm3', 'Navigation bar (barra inferior)', 'https://m3.material.io/components/navigation-bar/overview', {
    d: 'Barra inferior com 3 a 5 destinos principais.', pr: 'Navegação difícil de alcançar com o polegar.', u: 'Apps mobile.', e: 'Mais de 5 destinos.', ctx: 'mobile', t: ['mobile', 'navegação inferior'], p: ['p-mobile', 'p-nav']
  });
  R('radix-nav-menu', 'B', 'implementavel', 'radix', 'Navigation Menu', 'https://www.radix-ui.com/primitives/docs/components/navigation-menu', {
    d: 'Menu superior com submenus e navegação por teclado.', pr: 'Menu de topo que só abre com hover.', u: 'Sites e produtos com várias seções.', ctx: 'desktop', t: ['topo', 'menu'], p: ['p-nav'], tech: 'React'
  });
  R('bootstrap-offcanvas', 'B', 'implementavel', 'bootstrap', 'Offcanvas', 'https://getbootstrap.com/docs/5.3/components/offcanvas/', {
    d: 'Painel lateral oculto que desliza sobre a página.', pr: 'Menu mobile ocupando a tela inteira.', u: 'Menu mobile e filtros.', ctx: 'mobile', t: ['mobile', 'drawer', 'menu'], p: ['p-mobile'], tech: 'HTML, CSS, JS'
  });
  R('nng-hamburger', 'B', 'conceitual', 'nngroup', 'Menus hambúrguer e descoberta', 'https://www.nngroup.com/articles/hamburger-menus/', {
    d: 'Pesquisa sobre o custo de esconder a navegação atrás de um ícone.', pr: 'Funcionalidades que o usuário nunca descobre.', u: 'Justificar navegação visível em vez de oculta.', t: ['navegação', 'descoberta', 'mobile'], p: ['p-nav', 'p-mobile']
  });
  R('nng-mobile-nav', 'B', 'conceitual', 'nngroup', 'Padrões de navegação mobile', 'https://www.nngroup.com/articles/mobile-navigation-patterns/', {
    d: 'Comparação de padrões de navegação em dispositivos móveis.', pr: 'Escolher o padrão mais adequado para o app.', u: 'Decisão arquitetural de navegação.', ctx: 'mobile', t: ['mobile', 'navegação'], p: ['p-mobile', 'p-nav']
  });
  R('shadcn-breadcrumb', 'B', 'implementavel', 'shadcn', 'Breadcrumb', 'https://ui.shadcn.com/docs/components/breadcrumb', {
    d: 'Trilha de localização hierárquica.', pr: 'Usuário perdido em páginas profundas.', u: 'Hierarquias de 3+ níveis.', e: 'Estruturas planas.', a: 'nav com rótulo e item atual marcado.', t: ['breadcrumb', 'trilha'], p: ['p-nav'], ctx: 'desktop', tech: 'React, Tailwind'
  });
  R('nng-breadcrumbs', 'B', 'conceitual', 'nngroup', 'Breadcrumbs: boas práticas', 'https://www.nngroup.com/articles/breadcrumbs/', {
    d: 'Diretrizes de usabilidade para trilhas.', pr: 'Trilhas que não refletem a estrutura.', u: 'Justificar a adoção.', t: ['breadcrumb'], p: ['p-nav']
  });
  R('shadcn-tabs', 'B', 'implementavel', 'shadcn', 'Tabs', 'https://ui.shadcn.com/docs/components/tabs', {
    d: 'Alterna painéis relacionados no mesmo contexto.', pr: 'Página única longa com seções independentes.', u: 'Conteúdos paralelos de um mesmo objeto.',
    e: 'Etapas sequenciais (use stepper) ou navegação entre páginas.', a: 'Setas movem entre abas; ver padrão do APG.', t: ['tabs', 'abas'], p: ['p-nav'], tech: 'React, Tailwind'
  });
  R('apg-tabs', 'B', 'conceitual', 'apg', 'Tabs (padrão ARIA)', 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/', {
    d: 'Papéis, estados e teclas esperados de abas.', pr: 'Abas feitas com divs sem semântica.', u: 'Auditar abas existentes.', t: ['tabs', 'aria', 'teclado'], p: ['p-contraste']
  });
  R('shadcn-pagination', 'B', 'implementavel', 'shadcn', 'Pagination', 'https://ui.shadcn.com/docs/components/pagination', {
    d: 'Navegação entre páginas de resultados.', pr: 'Listas longas sem divisão.', u: 'Tabelas e resultados de busca.', e: 'Feeds contínuos: avaliar carregar mais.', t: ['paginação', 'lista'], p: ['p-tabela'], tech: 'React, Tailwind'
  });
  R('gov-pagination', 'B', 'conceitual', 'govuk', 'Pagination (GOV.UK)', 'https://design-system.service.gov.uk/components/pagination/', {
    d: 'Paginação simples e com elipses, com recomendações de quando usar.', pr: 'Paginação com muitos números e sem contexto.', u: 'Resultados de busca.', t: ['paginação'], p: ['p-tabela']
  });
  R('shadcn-command', 'B', 'implementavel', 'shadcn', 'Command (command palette)', 'https://ui.shadcn.com/docs/components/command', {
    d: 'Paleta de comandos com busca e atalhos.', pr: 'Funcionalidades enterradas em menus profundos.', u: 'Produtos com muitas ações; usuários frequentes.',
    e: 'Produtos simples onde ninguém buscaria por comando.', a: 'Abrir por atalho e fechar com Esc.', t: ['command palette', 'busca', 'atalho'], p: ['p-nav'], ctx: 'desktop', tech: 'React, cmdk'
  });
  R('mantine-spotlight', 'B', 'implementavel', 'mantine', 'Spotlight (Mantine)', 'https://mantine.dev/x/spotlight/', {
    d: 'Command palette com ações e busca.', pr: 'Descoberta de funcionalidades.', u: 'Alternativa pronta em Mantine.', ctx: 'desktop', t: ['command palette', 'busca'], tech: 'React'
  });
  R('m3-search', 'B', 'conceitual', 'm3', 'Search (Material 3)', 'https://m3.material.io/components/search/overview', {
    d: 'Barra e visão de busca com sugestões.', pr: 'Busca sem sugestões ou histórico.', u: 'Apps com conteúdo extenso.', t: ['busca', 'sugestões', 'mobile'], p: ['p-nav']
  });
  R('cloudscape-wizard', 'B', 'implementavel', 'cloudscape', 'Wizard (navegação entre etapas)', 'https://cloudscape.design/components/wizard/', {
    d: 'Fluxo em etapas com navegação lateral e revisão final.', pr: 'Formulário longo em uma só tela.', u: 'Tarefas complexas e raras.', e: 'Formulários curtos.', est: ['etapa atual', 'concluída', 'com erro'], t: ['etapas', 'wizard', 'formulário'], p: ['p-form', 'p-fluxo'], ctx: 'desktop', tech: 'React'
  });
  R('antd-steps', 'B', 'implementavel', 'antd', 'Steps', 'https://ant.design/components/steps', {
    d: 'Indicador visual de etapas, horizontal ou vertical.', pr: 'Usuário sem noção de quanto falta.', u: 'Fluxos de 3 a 6 etapas.', t: ['etapas', 'progresso'], p: ['p-fluxo'], tech: 'React'
  });
  R('gov-task-list', 'B', 'conceitual', 'govuk', 'Task list', 'https://design-system.service.gov.uk/components/task-list/', {
    d: 'Lista de tarefas com status para fluxos longos fora de ordem.', pr: 'Fluxo extenso que o usuário precisa retomar.', u: 'Cadastros longos com partes independentes.', t: ['etapas', 'progresso', 'rascunho'], p: ['p-fluxo']
  });
  R('gov-multiple-tasks', 'B', 'conceitual', 'govuk', 'Completar várias tarefas', 'https://design-system.service.gov.uk/patterns/complete-multiple-tasks/', {
    d: 'Padrão para organizar processos com várias tarefas.', pr: 'Fluxos com ordem fixa desnecessária.', u: 'Processos retomáveis.', t: ['etapas', 'tarefas'], p: ['p-fluxo']
  });

  /* ===================== C. Formulários e fluxos ===================== */
  R('gov-validation', 'C', 'conceitual', 'govuk', 'Validação (GOV.UK)', 'https://design-system.service.gov.uk/patterns/validation/', {
    d: 'Quando validar, como escrever mensagens e como combinar resumo de erros e mensagem por campo.', pr: 'Mensagens vagas (“entrada inválida”).',
    u: 'Referência principal de texto de erro.', a: 'Mover o foco ao resumo de erros.', t: ['validação', 'erro', 'mensagens'], p: ['p-erro', 'p-form']
  });
  R('gov-error-summary', 'C', 'implementavel', 'govuk', 'Error summary', 'https://design-system.service.gov.uk/components/error-summary/', {
    d: 'Bloco no topo que lista os erros com links para os campos.', pr: 'Erros que o usuário não vê por estarem fora da tela.', u: 'Formulários com vários campos.', a: 'Receber foco ao aparecer.', t: ['erro', 'validação', 'formulário'], p: ['p-erro', 'p-form']
  });
  R('wcag-error-id', 'C', 'conceitual', 'wcag', 'WCAG: identificação de erro', 'https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html', {
    d: 'Critério que exige identificar e descrever o erro em texto.', pr: 'Erro indicado só por cor.', u: 'Critério normativo para auditoria.', t: ['erro', 'acessibilidade'], p: ['p-erro', 'p-contraste']
  });
  R('wcag-error-prevention', 'C', 'conceitual', 'wcag', 'WCAG: prevenção de erros (dados legais/financeiros)', 'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html', {
    d: 'Exige reversão, verificação ou confirmação em envios sensíveis.', pr: 'Envio definitivo sem revisão.', u: 'Pagamentos, contratos, exclusões.', t: ['prevenção de erro', 'revisão'], p: ['p-destrutiva', 'p-fluxo']
  });
  R('gov-check-answers', 'C', 'conceitual', 'govuk', 'Check answers (revisão antes de enviar)', 'https://design-system.service.gov.uk/patterns/check-answers/', {
    d: 'Página de resumo editável antes da submissão final.', pr: 'Envio de dados sem chance de revisão.', u: 'Fluxos com várias etapas.', t: ['revisão', 'confirmação', 'etapas'], p: ['p-fluxo', 'p-form']
  });
  R('gov-question-pages', 'C', 'conceitual', 'govuk', 'Question pages (uma pergunta por página)', 'https://design-system.service.gov.uk/patterns/question-pages/', {
    d: 'Estruturar um formulário em páginas curtas e focadas.', pr: 'Formulário intimidante e longo.', u: 'Fluxos para público amplo e mobile.', e: 'Usuários experientes que preferem ver tudo.', ctx: 'ambos', t: ['formulário', 'etapas', 'mobile'], p: ['p-form', 'p-mobile']
  });
  R('gov-char-count', 'C', 'implementavel', 'govuk', 'Character count', 'https://design-system.service.gov.uk/components/character-count/', {
    d: 'Contador de caracteres com limite.', pr: 'Truncamento silencioso de texto.', u: 'Campos com limite.', t: ['contador', 'textarea'], p: ['p-form']
  });
  R('carbon-forms', 'C', 'conceitual', 'carbon', 'Forms (Carbon)', 'https://carbondesignsystem.com/patterns/forms-pattern/', {
    d: 'Padrão de layout, agrupamento e validação de formulários.', pr: 'Formulários sem estrutura consistente.', u: 'Base para revisar formulários administrativos.', t: ['formulário', 'layout'], p: ['p-form']
  });
  R('primer-forms', 'C', 'conceitual', 'primer', 'Forms (Primer)', 'https://primer.style/product/ui-patterns/forms/', {
    d: 'Padrões de formulários de produto no GitHub.', pr: 'Formulários inconsistentes entre páginas.', u: 'Comparar com Carbon e GOV.UK.', t: ['formulário'], p: ['p-form']
  });
  R('gitlab-forms', 'C', 'conceitual', 'pajamas', 'Forms (Pajamas)', 'https://design.gitlab.com/patterns/forms/', {
    d: 'Padrões de formulário do GitLab.', pr: 'Ordem e ações de formulário inconsistentes.', u: 'Comparar com outros sistemas.', t: ['formulário'], p: ['p-form']
  });
  R('cloudscape-validation', 'C', 'conceitual', 'cloudscape', 'Validação (Cloudscape)', 'https://cloudscape.design/patterns/general/errors/validation/', {
    d: 'Quando e como validar campos em consoles administrativos.', pr: 'Validação disparada cedo demais ou tarde demais.', u: 'Formulários administrativos.', t: ['validação', 'erro'], p: ['p-form', 'p-erro']
  });
  R('cloudscape-multipage', 'C', 'conceitual', 'cloudscape', 'Criar em várias páginas', 'https://cloudscape.design/patterns/resource-management/create/multi-page-create/', {
    d: 'Quando dividir a criação de um recurso em várias páginas.', pr: 'Escolher entre página única e etapas.', u: 'Criações complexas.', t: ['etapas', 'criação'], p: ['p-form', 'p-fluxo']
  });
  R('cloudscape-singlepage', 'C', 'conceitual', 'cloudscape', 'Criar em página única', 'https://cloudscape.design/patterns/resource-management/create/single-page-create/', {
    d: 'Estrutura de um formulário de criação em uma só página.', pr: 'Criações simples transformadas em wizard.', u: 'Criações com poucos campos.', t: ['criação', 'formulário'], p: ['p-form', 'p-fluxo']
  });
  R('cloudscape-defaults', 'C', 'conceitual', 'cloudscape', 'Valores padrão na criação', 'https://cloudscape.design/patterns/resource-management/create/defaults/', {
    d: 'Como definir padrões sensatos para reduzir o esforço.', pr: 'Formulários que exigem preencher tudo do zero.', u: 'Qualquer formulário com configurações usuais.', t: ['padrões', 'formulário'], p: ['p-form', 'p-fluxo']
  });
  R('primer-saving', 'C', 'conceitual', 'primer', 'Saving (Primer)', 'https://primer.style/product/ui-patterns/saving/', {
    d: 'Quando salvar automaticamente ou manualmente e como comunicar o estado.', pr: 'Usuário sem saber se as alterações foram salvas.', u: 'Escolher entre autosave e botão salvar.', t: ['salvamento', 'autosave'], p: ['p-feedback']
  });
  R('gitlab-saving', 'C', 'conceitual', 'pajamas', 'Saving and feedback (Pajamas)', 'https://design.gitlab.com/patterns/saving-and-feedback/', {
    d: 'Padrões de salvamento e retorno ao usuário.', pr: 'Salvamento sem retorno visual.', u: 'Complementar o Primer.', t: ['salvamento', 'feedback'], p: ['p-feedback']
  });
  R('cloudscape-unsaved', 'C', 'conceitual', 'cloudscape', 'Comunicar alterações não salvas', 'https://cloudscape.design/patterns/general/unsaved-changes/', {
    d: 'Como alertar sobre perda de dados ao sair de uma edição.', pr: 'Perda silenciosa de dados.', u: 'Qualquer formulário editável.', t: ['prevenção de perda', 'rascunho'], p: ['p-destrutiva', 'p-form']
  });
  R('cloudscape-inline-edit', 'C', 'conceitual', 'cloudscape', 'Edição inline', 'https://cloudscape.design/patterns/resource-management/edit/inline-edit/', {
    d: 'Editar um valor no próprio lugar, sem abrir outra página.', pr: 'Fluxos longos para mudar um único campo.', u: 'Edições pequenas em tabelas e detalhes.', t: ['edição', 'inline'], p: ['p-fluxo']
  });
  R('primer-progressive', 'C', 'conceitual', 'primer', 'Progressive disclosure', 'https://primer.style/product/ui-patterns/progressive-disclosure/', {
    d: 'Revelar opções avançadas apenas quando necessário.', pr: 'Formulário poluído de opções raras.', u: 'Campos condicionais e configurações avançadas.', t: ['campos condicionais', 'divulgação progressiva'], p: ['p-form', 'p-hierarquia']
  });
  R('nng-progressive', 'C', 'conceitual', 'nngroup', 'Progressive disclosure (NN/G)', 'https://www.nngroup.com/articles/progressive-disclosure/', {
    d: 'Fundamento e riscos da divulgação progressiva.', pr: 'Esconder demais ou de menos.', u: 'Justificar a decisão.', t: ['divulgação progressiva'], p: ['p-form']
  });
  R('webdev-forms', 'C', 'conceitual', 'webdev', 'Learn Forms (web.dev)', 'https://web.dev/learn/forms', {
    d: 'Curso sobre construir formulários acessíveis com HTML nativo.', pr: 'Formulários que ignoram recursos nativos do navegador.', u: 'Base técnica para a revisão.', t: ['formulário', 'html', 'acessibilidade'], p: ['p-form']
  });
  R('bootstrap-validation', 'C', 'implementavel', 'bootstrap', 'Validação de formulários (Bootstrap)', 'https://getbootstrap.com/docs/5.3/forms/validation/', {
    d: 'Estilos de validação e feedback por campo.', pr: 'Falta de estado de erro e sucesso visuais.', u: 'Projetos HTML/CSS simples.', t: ['validação', 'css'], p: ['p-form'], tech: 'HTML, CSS'
  });
  R('rhf-lib', 'C', 'implementavel', 'rhf', 'React Hook Form e Zod', 'https://react-hook-form.com/', {
    d: 'Gestão de formulários e validação por schema (Zod).', pr: 'Validação feita à mão, inconsistente.', u: 'Validação em tempo real em React.', t: ['validação', 'react'], p: ['p-form'], tech: 'React, TypeScript'
  });
  R('mantine-stepper', 'C', 'implementavel', 'mantine', 'Stepper (Mantine)', 'https://mantine.dev/core/stepper/', {
    d: 'Fluxo em etapas.', pr: 'Etapas sem indicação de progresso.', u: 'Alternativa pronta em Mantine.', t: ['etapas'], p: ['p-fluxo'], tech: 'React'
  });
  R('uswds-step-indicator', 'C', 'implementavel', 'uswds', 'Step indicator (USWDS)', 'https://designsystem.digital.gov/components/step-indicator/', {
    d: 'Indicador de progresso de etapas.', pr: 'Falta de noção de progresso.', u: 'Fluxos sequenciais.', t: ['etapas', 'progresso'], p: ['p-fluxo']
  });
  R('wcag-status-messages', 'C', 'conceitual', 'wcag', 'WCAG: mensagens de status', 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html', {
    d: 'Mensagens de status devem ser anunciadas por tecnologias assistivas sem mover o foco.', pr: 'Toasts e atualizações mudas para leitores de tela.', u: 'Auditar toasts, salvamentos e contagens.', t: ['status', 'aria-live'], p: ['p-feedback']
  });

  /* ===================== D. Dados e gestão ===================== */
  R('shadcn-data-table', 'D', 'implementavel', 'shadcn', 'Data Table', 'https://ui.shadcn.com/docs/components/data-table', {
    d: 'Tabela baseada em TanStack Table com ordenação, filtros, seleção e visibilidade de colunas.', pr: 'Tabelas administrativas rígidas.',
    u: 'Listagens com várias ações.', e: 'Poucos registros: uma lista simples é mais legível.', resp: 'Planejar rolagem controlada ou layout em cards no celular.',
    a: 'Cabeçalhos e ordenação precisam ser anunciados.', t: ['tabela', 'ordenação', 'filtro', 'seleção', 'colunas'], p: ['p-tabela', 'p-filtros'], tech: 'React, TanStack Table'
  });
  R('tanstack-intro', 'D', 'implementavel', 'tanstack', 'TanStack Table', 'https://tanstack.com/table/latest', {
    d: 'Motor headless de tabelas; a interface é livre.', pr: 'Lógica de tabela reimplementada em cada tela.', u: 'Base técnica de tabelas complexas.', t: ['tabela', 'headless'], p: ['p-tabela'], tech: 'React, Vue, Solid, Svelte'
  });
  R('antd-table', 'D', 'implementavel', 'antd', 'Table (Ant Design)', 'https://ant.design/components/table', {
    d: 'Tabela rica com ordenação, filtros, paginação, expansão e seleção.', pr: 'Tabelas básicas sem ferramentas.', u: 'Painéis administrativos densos.', t: ['tabela', 'filtro', 'seleção', 'paginação'], p: ['p-tabela', 'p-filtros'], ctx: 'desktop', tech: 'React'
  });
  R('carbon-data-table', 'D', 'conceitual', 'carbon', 'Data table (Carbon)', 'https://carbondesignsystem.com/components/data-table/usage/', {
    d: 'Guia de uso com variações (seleção, expansão, toolbar, densidade).', pr: 'Tabela sem toolbar ou sem estados.', u: 'Referência de anatomia de tabelas empresariais.', t: ['tabela', 'toolbar', 'densidade'], p: ['p-tabela'], ctx: 'desktop'
  });
  R('cloudscape-table-view', 'D', 'conceitual', 'cloudscape', 'Table view (Cloudscape)', 'https://cloudscape.design/patterns/resource-management/view/table-view/', {
    d: 'Padrão para listar recursos com busca, filtros, paginação e ações.', pr: 'Listagens sem padrão de ações em lote.', u: 'Consoles de gestão.', t: ['tabela', 'ações', 'filtros'], p: ['p-tabela', 'p-filtros'], ctx: 'desktop'
  });
  R('cloudscape-card-view', 'D', 'conceitual', 'cloudscape', 'Card view (Cloudscape)', 'https://cloudscape.design/patterns/resource-management/view/card-view/', {
    d: 'Quando mostrar itens como cards em vez de tabela.', pr: 'Tabelas ruins para conteúdos visuais.', u: 'Itens com imagem ou resumo.', e: 'Comparação de muitos atributos: tabela.', t: ['cards', 'grade'], p: ['p-tabela', 'p-mobile']
  });
  R('primer-data-table', 'D', 'implementavel', 'primer', 'Data table (Primer)', 'https://primer.style/product/components/data-table/', {
    d: 'Tabela do GitHub com diretrizes de uso.', pr: 'Tabelas inconsistentes.', u: 'Comparação com outras fontes.', t: ['tabela'], p: ['p-tabela'], tech: 'React'
  });
  R('atlassian-dynamic-table', 'D', 'implementavel', 'atlassian', 'Dynamic table (Atlassian)', 'https://atlassian.design/components/dynamic-table/', {
    d: 'Tabela com ordenação, paginação e estado vazio.', pr: 'Tabela sem estado vazio.', u: 'Comparação.', t: ['tabela', 'vazio'], p: ['p-tabela'], tech: 'React'
  });
  R('mui-data-grid', 'D', 'implementavel', 'mui', 'MUI X Data Grid', 'https://mui.com/x/react-data-grid/', {
    d: 'Grade de dados avançada. Algumas funções são de edições pagas.', pr: 'Volume alto de linhas.', u: 'Grandes volumes.', o: 'Verificar a edição necessária.', t: ['tabela', 'grade'], p: ['p-tabela'], tech: 'React'
  });
  R('apg-grid', 'D', 'conceitual', 'apg', 'Grid e Table (padrão ARIA)', 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/', {
    d: 'Quando usar grid interativo e como navegar por teclado.', pr: 'Tabelas com interação mal semantizadas.', u: 'Auditar tabelas interativas.', t: ['tabela', 'aria', 'teclado'], p: ['p-tabela', 'p-contraste']
  });
  R('nng-data-tables', 'D', 'conceitual', 'nngroup', 'Data tables: boas práticas (NN/G)', 'https://www.nngroup.com/articles/data-tables/', {
    d: 'Diretrizes de design de tabelas de dados.', pr: 'Tabelas ilegíveis.', u: 'Justificar escolhas de alinhamento, densidade e ações.', t: ['tabela', 'legibilidade'], p: ['p-tabela']
  });
  R('gallery-table', 'D', 'inspiracao', 'compgallery', 'Table (galeria de design systems)', 'https://component.gallery/components/table/', {
    d: 'Exemplos de tabelas em dezenas de sistemas.', pr: 'Escolher uma abordagem.', u: 'Comparação.', t: ['tabela', 'comparação'], p: ['p-tabela']
  });
  R('carbon-filtering', 'D', 'conceitual', 'carbon', 'Filtering (Carbon)', 'https://carbondesignsystem.com/patterns/filtering/', {
    d: 'Padrões de filtro (inline, em painel, avançado).', pr: 'Filtros sem feedback sobre o que está aplicado.', u: 'Listagens e dashboards.', t: ['filtros', 'busca'], p: ['p-filtros']
  });
  R('cloudscape-saved-filters', 'D', 'conceitual', 'cloudscape', 'Saved filter sets', 'https://cloudscape.design/patterns/general/filter-patterns/saved-filter-sets/', {
    d: 'Salvar e reaplicar combinações de filtros.', pr: 'Refazer filtros a cada visita.', u: 'Usuários recorrentes.', t: ['filtros', 'persistentes'], p: ['p-filtros']
  });
  R('cloudscape-filter-persist', 'D', 'conceitual', 'cloudscape', 'Persistência de filtros', 'https://cloudscape.design/patterns/general/filter-patterns/filter-persistence-in-collection-views/', {
    d: 'Como manter filtros ao navegar e voltar.', pr: 'Filtros perdidos ao abrir um detalhe.', u: 'Listas com detalhe.', t: ['filtros', 'persistentes'], p: ['p-filtros', 'p-nav']
  });
  R('gitlab-filtering', 'D', 'conceitual', 'pajamas', 'Filtering (Pajamas)', 'https://design.gitlab.com/patterns/filtering/', {
    d: 'Padrões de filtro do GitLab.', pr: 'Filtros sem padrão.', u: 'Comparação.', t: ['filtros'], p: ['p-filtros']
  });
  R('carbon-search', 'D', 'conceitual', 'carbon', 'Search (Carbon)', 'https://carbondesignsystem.com/patterns/search-pattern/', {
    d: 'Padrões de busca (global, local, resultados).', pr: 'Busca sem diferença entre vazio e sem resultados.', u: 'Definir comportamento de busca.', t: ['busca', 'resultados'], p: ['p-filtros', 'p-vazio']
  });
  R('shadcn-chart', 'D', 'implementavel', 'shadcn', 'Chart', 'https://ui.shadcn.com/docs/components/chart', {
    d: 'Gráficos compostos sobre uma biblioteca de gráficos, com tema.', pr: 'Gráficos desalinhados do sistema visual.', u: 'Dashboards.', a: 'Oferecer valores em texto/tabela alternativa.', t: ['gráficos', 'dashboard'], tech: 'React, Recharts'
  });
  R('primer-dataviz', 'D', 'conceitual', 'primer', 'Data visualization (Primer)', 'https://primer.style/product/ui-patterns/data-visualization/', {
    d: 'Princípios para visualização de dados em produto.', pr: 'Gráficos difíceis de ler.', u: 'Dashboards e relatórios.', t: ['gráficos', 'dashboard'], p: ['p-hierarquia']
  });
  R('cloudscape-dashboard', 'D', 'conceitual', 'cloudscape', 'Configurable dashboard', 'https://cloudscape.design/patterns/general/service-dashboard/configurable-dashboard/', {
    d: 'Dashboard em que o usuário organiza os itens.', pr: 'Dashboard rígido.', u: 'Produtos com perfis de uso distintos.', ctx: 'desktop', t: ['dashboard', 'personalização'], p: ['p-hierarquia']
  });
  R('cloudscape-density', 'D', 'conceitual', 'cloudscape', 'Density settings', 'https://cloudscape.design/patterns/general/density-settings/', {
    d: 'Permitir alternar entre confortável e compacto.', pr: 'Tabela densa para uns, apertada para outros.', u: 'Listas e tabelas extensas.', t: ['densidade', 'tabela'], p: ['p-tabela']
  });
  R('gov-summary-list', 'D', 'implementavel', 'govuk', 'Summary list', 'https://design-system.service.gov.uk/components/summary-list/', {
    d: 'Pares rótulo-valor para visualizar um registro, com ações por linha.', pr: 'Detalhes de registro difíceis de escanear.', u: 'Página de detalhes e revisão.', t: ['detalhes', 'rótulo-valor'], p: ['p-hierarquia']
  });
  R('antd-descriptions', 'D', 'implementavel', 'antd', 'Descriptions', 'https://ant.design/components/descriptions', {
    d: 'Grade de campos para detalhar um registro.', pr: 'Detalhe de registro em blocos soltos.', u: 'Páginas de detalhe.', t: ['detalhes'], p: ['p-hierarquia'], tech: 'React'
  });
  R('cloudscape-details-tabs', 'D', 'conceitual', 'cloudscape', 'Details page with tabs', 'https://cloudscape.design/patterns/resource-management/details/details-page-with-tabs/', {
    d: 'Página de detalhe dividida em abas.', pr: 'Detalhe com informação demais em uma tela.', u: 'Objetos com muitas dimensões (como o “criador” do 4squad).', t: ['detalhes', 'abas'], p: ['p-hierarquia']
  });
  R('carbon-status', 'D', 'conceitual', 'carbon', 'Status indicators', 'https://carbondesignsystem.com/patterns/status-indicator-pattern/', {
    d: 'Como representar estados (sucesso, erro, em andamento) com ícone, cor e texto.', pr: 'Status só por cor.', u: 'Tabelas e listas com estado.', a: 'Combinar forma/texto com cor.', t: ['status', 'badge'], p: ['p-contraste']
  });
  R('cloudscape-timestamps', 'D', 'conceitual', 'cloudscape', 'Timestamps', 'https://cloudscape.design/patterns/general/timestamps/', {
    d: 'Como exibir datas e horas em históricos e logs.', pr: 'Formatos de data inconsistentes.', u: 'Histórico de atividades e trilhas de auditoria.', t: ['histórico', 'log', 'data'], p: ['p-hierarquia']
  });
  R('cloudscape-selection', 'D', 'conceitual', 'cloudscape', 'Seleção', 'https://cloudscape.design/patterns/general/selection/', {
    d: 'Quando usar seleção simples, múltipla e em lote em coleções.', pr: 'Seleção inconsistente entre telas.', u: 'Tabelas com ações em lote.', t: ['seleção', 'ações em lote'], p: ['p-tabela']
  });

  /* ===================== E. Feedback e estados ===================== */
  R('shadcn-skeleton', 'E', 'implementavel', 'shadcn', 'Skeleton', 'https://ui.shadcn.com/docs/components/skeleton', {
    d: 'Placeholder que imita a forma do conteúdo.', pr: 'Tela vazia durante o carregamento.', u: 'Carregamentos acima de ~300 ms com layout previsível.', e: 'Esperas muito curtas ou de tamanho desconhecido.', t: ['skeleton', 'loading'], p: ['p-loading'], tech: 'React, Tailwind'
  });
  R('boneyard-skel', 'E', 'implementavel', 'boneyard', 'boneyard (skeletons automáticos)', 'https://boneyard.vercel.app/overview', {
    d: 'Captura a UI real e gera “bones” posicionados, mantendo o skeleton igual ao layout.', pr: 'Skeletons feitos à mão que divergem do conteúdo.', u: 'Muitas telas com layouts distintos.', t: ['skeleton', 'loading', 'automático'], p: ['p-loading'], tech: 'React, Vue, Svelte, Angular e outros'
  });
  R('nng-skeleton', 'E', 'conceitual', 'nngroup', 'Skeleton screens (NN/G)', 'https://www.nngroup.com/articles/skeleton-screens/', {
    d: 'Quando skeletons ajudam e quando não.', pr: 'Skeletons usados por padrão.', u: 'Justificar skeleton versus spinner.', t: ['skeleton', 'loading'], p: ['p-loading']
  });
  R('bootstrap-placeholders', 'E', 'implementavel', 'bootstrap', 'Placeholders (Bootstrap)', 'https://getbootstrap.com/docs/5.3/components/placeholders/', {
    d: 'Placeholders CSS com animação opcional.', pr: 'Carregamento sem estrutura.', u: 'Projetos em HTML/CSS.', t: ['skeleton'], p: ['p-loading'], tech: 'HTML, CSS'
  });
  R('gallery-skeleton', 'E', 'inspiracao', 'compgallery', 'Skeleton (galeria)', 'https://component.gallery/components/skeleton/', {
    d: 'Skeletons de diferentes sistemas.', pr: 'Escolher o estilo.', u: 'Comparação.', t: ['skeleton', 'comparação'], p: ['p-loading']
  });
  R('shadcn-spinner', 'E', 'implementavel', 'shadcn', 'Spinner', 'https://ui.shadcn.com/docs/components/spinner', {
    d: 'Indicador de carregamento indeterminado.', pr: 'Ações sem sinal de processamento.', u: 'Esperas curtas ou de tamanho desconhecido.', e: 'Esperas longas: mostre progresso.', t: ['spinner', 'loading'], p: ['p-loading', 'p-feedback'], tech: 'React, Tailwind'
  });
  R('m3-progress', 'E', 'conceitual', 'm3', 'Progress indicators (Material 3)', 'https://m3.material.io/components/progress-indicators/overview', {
    d: 'Indicadores linear e circular, determinados e indeterminados.', pr: 'Processo longo sem avanço visível.', u: 'Escolher entre determinado e indeterminado.', t: ['progresso', 'loading'], p: ['p-loading']
  });
  R('nng-progress', 'E', 'conceitual', 'nngroup', 'Indicadores de progresso (NN/G)', 'https://www.nngroup.com/articles/progress-indicators/', {
    d: 'Quando usar spinner, barra e outras opções.', pr: 'Indicador errado para a espera.', u: 'Decisão de loading.', t: ['progresso', 'loading'], p: ['p-loading']
  });
  R('nng-response-times', 'E', 'conceitual', 'nngroup', 'Tempos de resposta: 3 limites', 'https://www.nngroup.com/articles/response-times-3-important-limits/', {
    d: 'Limites de percepção (instantâneo, fluxo, atenção) que orientam o feedback.', pr: 'Não saber quando mostrar loading.', u: 'Definir regras de feedback por duração.', t: ['loading', 'desempenho'], p: ['p-loading', 'p-feedback']
  });
  R('carbon-loading', 'E', 'conceitual', 'carbon', 'Loading (Carbon)', 'https://carbondesignsystem.com/patterns/loading-pattern/', {
    d: 'Padrão para estados de carregamento em página, componente e ação.', pr: 'Estratégia de loading inconsistente.', u: 'Consolidar regras.', t: ['loading'], p: ['p-loading']
  });
  R('primer-loading', 'E', 'conceitual', 'primer', 'Loading (Primer)', 'https://primer.style/product/ui-patterns/loading/', {
    d: 'Padrões de carregamento do GitHub.', pr: 'Salto de layout durante o carregamento.', u: 'Comparação.', t: ['loading'], p: ['p-loading']
  });
  R('cloudscape-loading', 'E', 'conceitual', 'cloudscape', 'Loading and refreshing', 'https://cloudscape.design/patterns/general/loading-and-refreshing/', {
    d: 'Carregamento inicial versus atualização.', pr: 'Atualizar apaga o conteúdo da tela.', u: 'Dados que se atualizam.', t: ['loading', 'atualização'], p: ['p-loading']
  });
  R('atlassian-skeleton', 'E', 'implementavel', 'atlassian', 'Skeleton (Atlassian)', 'https://atlassian.design/components/skeleton/', {
    d: 'Skeleton do sistema Atlassian.', pr: 'Comparar abordagens.', u: 'Comparação.', t: ['skeleton'], p: ['p-loading'], tech: 'React'
  });
  R('fluent-skeleton', 'E', 'implementavel', 'fluent', 'Skeleton (Fluent 2)', 'https://fluent2.microsoft.design/components/web/react/core/skeleton/usage', {
    d: 'Skeleton do Fluent 2.', pr: 'Comparar abordagens.', u: 'Comparação.', t: ['skeleton'], p: ['p-loading'], tech: 'React'
  });
  R('shadcn-toast', 'E', 'implementavel', 'shadcn', 'Toast', 'https://ui.shadcn.com/docs/components/sonner', {
    d: 'Mensagens temporárias não bloqueantes.', pr: 'Ação concluída sem confirmação.', u: 'Confirmações de ações curtas, com opção de desfazer.', e: 'Erros que exigem decisão ou informação longa.', a: 'Deve ser anunciado a leitores de tela e não sumir rápido demais.', t: ['toast', 'notificação'], p: ['p-feedback'], tech: 'React, Tailwind'
  });
  R('radix-toast', 'E', 'implementavel', 'radix', 'Toast (Radix)', 'https://www.radix-ui.com/primitives/docs/components/toast', {
    d: 'Primitivo de toast com foco e anúncio acessíveis.', pr: 'Toasts inacessíveis.', u: 'Base de toasts próprios.', t: ['toast', 'acessibilidade'], p: ['p-feedback'], tech: 'React'
  });
  R('m3-snackbar', 'E', 'conceitual', 'm3', 'Snackbar (Material 3)', 'https://m3.material.io/components/snackbar/overview', {
    d: 'Mensagem breve na parte inferior, com ação opcional.', pr: 'Feedback sem ação de desfazer.', u: 'Confirmações com “Desfazer”.', t: ['toast', 'snackbar', 'mobile'], p: ['p-feedback']
  });
  R('gallery-toast', 'E', 'inspiracao', 'compgallery', 'Toast (galeria)', 'https://component.gallery/components/toast/', {
    d: 'Toasts em dezenas de sistemas.', pr: 'Escolher posição e duração.', u: 'Comparação.', t: ['toast', 'comparação'], p: ['p-feedback']
  });
  R('carbon-notifications', 'E', 'conceitual', 'carbon', 'Notifications (Carbon)', 'https://carbondesignsystem.com/patterns/notification-pattern/', {
    d: 'Tipos de notificação (toast, inline, banner) e quando usar cada um.', pr: 'Todo aviso tratado como toast.', u: 'Definir a hierarquia de avisos.', t: ['notificação', 'toast', 'banner', 'alerta'], p: ['p-feedback']
  });
  R('primer-notification', 'E', 'conceitual', 'primer', 'Notification messaging (Primer)', 'https://primer.style/product/ui-patterns/notification-messaging/', {
    d: 'Escolha entre banner, flash e inline.', pr: 'Avisos mal posicionados.', u: 'Comparar com Carbon.', t: ['notificação', 'banner'], p: ['p-feedback']
  });
  R('shadcn-alert', 'E', 'implementavel', 'shadcn', 'Alert', 'https://ui.shadcn.com/docs/components/alert', {
    d: 'Aviso estático em contexto.', pr: 'Avisos que desaparecem antes de serem lidos.', u: 'Informação importante ligada ao conteúdo.', t: ['alerta', 'inline'], p: ['p-feedback'], tech: 'React, Tailwind'
  });
  R('gov-notification-banner', 'E', 'conceitual', 'govuk', 'Notification banner', 'https://design-system.service.gov.uk/components/notification-banner/', {
    d: 'Banner de sucesso ou importante no topo da página.', pr: 'Sucesso sem confirmação visível.', u: 'Confirmar ações concluídas.', t: ['banner', 'sucesso'], p: ['p-feedback']
  });
  R('atlassian-banner', 'E', 'implementavel', 'atlassian', 'Banner (Atlassian)', 'https://atlassian.design/components/banner/', {
    d: 'Faixa de aviso no topo.', pr: 'Avisos de sistema sem destaque.', u: 'Manutenção, estado degradado.', t: ['banner', 'faixa'], p: ['p-feedback'], tech: 'React'
  });
  R('fluent-messagebar', 'E', 'implementavel', 'fluent', 'MessageBar (Fluent 2)', 'https://fluent2.microsoft.design/components/web/react/core/messagebar/usage', {
    d: 'Barra de mensagem inline com níveis.', pr: 'Avisos sem níveis claros.', u: 'Comparação.', t: ['alerta', 'inline'], p: ['p-feedback'], tech: 'React'
  });
  R('apg-alert', 'E', 'conceitual', 'apg', 'Alert (padrão ARIA)', 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/', {
    d: 'Como anunciar mensagens importantes sem mover o foco.', pr: 'Alertas mudos.', u: 'Auditar alertas dinâmicos.', t: ['alerta', 'aria'], p: ['p-feedback']
  });
  R('shadcn-dialog', 'E', 'implementavel', 'shadcn', 'Dialog', 'https://ui.shadcn.com/docs/components/dialog', {
    d: 'Janela modal para tarefas curtas.', pr: 'Tarefas pequenas que levam o usuário a outra página.', u: 'Confirmações e edições curtas.', e: 'Formulários longos, fluxos de várias etapas ou conteúdo para comparar com a página.', a: 'Prender o foco, devolver ao disparador e fechar com Esc.', t: ['modal', 'dialog'], p: ['p-modal'], tech: 'React, Radix'
  });
  R('radix-dialog', 'E', 'implementavel', 'radix', 'Dialog (Radix)', 'https://www.radix-ui.com/primitives/docs/components/dialog', {
    d: 'Primitivo de dialog com gestão de foco.', pr: 'Modais que vazam foco.', u: 'Base de modais próprios.', t: ['modal', 'foco'], p: ['p-modal'], tech: 'React'
  });
  R('apg-dialog', 'E', 'conceitual', 'apg', 'Dialog modal (padrão ARIA)', 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/', {
    d: 'Comportamento esperado de foco e teclado em modais.', pr: 'Modais que não prendem o foco.', u: 'Auditar modais.', t: ['modal', 'aria', 'teclado'], p: ['p-modal', 'p-contraste']
  });
  R('shadcn-alert-dialog', 'E', 'implementavel', 'shadcn', 'Alert Dialog', 'https://ui.shadcn.com/docs/components/alert-dialog', {
    d: 'Modal de confirmação que exige uma decisão.', pr: 'Exclusão com um clique.', u: 'Ações destrutivas ou irreversíveis.', e: 'Confirmar ações triviais: gera fadiga e treino de clique automático.', t: ['confirmação', 'modal', 'exclusão'], p: ['p-destrutiva', 'p-modal'], tech: 'React, Radix'
  });
  R('nng-confirm', 'E', 'conceitual', 'nngroup', 'Confirmation dialogs (NN/G)', 'https://www.nngroup.com/articles/confirmation-dialog/', {
    d: 'Quando uma confirmação previne erros e quando é só atrito.', pr: 'Confirmações genéricas.', u: 'Justificar (ou remover) um diálogo de confirmação.', t: ['confirmação', 'exclusão'], p: ['p-destrutiva']
  });
  R('nng-modal', 'E', 'conceitual', 'nngroup', 'Modal e não modal (NN/G)', 'https://www.nngroup.com/articles/modal-nonmodal-dialog/', {
    d: 'Quando bloquear a página e quando manter a interação.', pr: 'Modais para tudo.', u: 'Escolher entre modal, painel lateral e inline.', t: ['modal', 'painel'], p: ['p-modal']
  });
  R('carbon-dialogs', 'E', 'conceitual', 'carbon', 'Dialogs (Carbon)', 'https://carbondesignsystem.com/patterns/dialog-pattern/', {
    d: 'Padrões de diálogo e boas práticas.', pr: 'Diálogos sem propósito claro.', u: 'Regras do uso de diálogo.', t: ['modal'], p: ['p-modal']
  });
  R('mdn-dialog', 'E', 'implementavel', 'mdn', 'Elemento <dialog> (MDN)', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog', {
    d: 'Modal nativo do HTML com showModal().', pr: 'Reimplementar modal em JavaScript.', u: 'Projetos sem biblioteca.', t: ['modal', 'html', 'nativo'], p: ['p-modal'], tech: 'HTML'
  });
  R('shadcn-sheet', 'E', 'implementavel', 'shadcn', 'Sheet (painel lateral)', 'https://ui.shadcn.com/docs/components/sheet', {
    d: 'Painel lateral que desliza sobre a página.', pr: 'Modal central para edições longas.', u: 'Edição ou detalhe sem perder o contexto.', t: ['painel', 'drawer'], p: ['p-modal'], tech: 'React, Tailwind'
  });
  R('shadcn-drawer', 'E', 'implementavel', 'shadcn', 'Drawer (Vaul)', 'https://ui.shadcn.com/docs/components/drawer', {
    d: 'Gaveta com gesto de arrastar, típica de mobile.', pr: 'Modais difíceis de dispensar no celular.', u: 'Ações em telas pequenas.', ctx: 'mobile', t: ['drawer', 'mobile'], p: ['p-mobile', 'p-modal'], tech: 'React, Vaul'
  });
  R('m3-bottom-sheets', 'E', 'conceitual', 'm3', 'Bottom sheets (Material 3)', 'https://m3.material.io/components/bottom-sheets/overview', {
    d: 'Painéis ancorados na base da tela.', pr: 'Menu/ação no topo, longe do polegar.', u: 'Mobile.', ctx: 'mobile', t: ['mobile', 'sheet'], p: ['p-mobile']
  });
  R('antd-popconfirm', 'E', 'implementavel', 'antd', 'Popconfirm', 'https://ant.design/components/popconfirm', {
    d: 'Confirmação leve ancorada ao botão.', pr: 'Interromper o fluxo com um modal para uma ação simples.', u: 'Ações destrutivas de baixo impacto.', e: 'Impacto alto (exclusão em cascata).', t: ['confirmação', 'popover'], p: ['p-destrutiva'], tech: 'React'
  });
  R('shadcn-empty', 'E', 'implementavel', 'shadcn', 'Empty', 'https://ui.shadcn.com/docs/components/empty', {
    d: 'Componente para estados vazios com título, descrição e ação.', pr: 'Lista vazia sem explicação.', u: 'Primeiro uso e resultados sem dados.', t: ['vazio', 'empty state'], p: ['p-vazio'], tech: 'React, Tailwind'
  });
  R('carbon-empty', 'E', 'conceitual', 'carbon', 'Empty states (Carbon)', 'https://carbondesignsystem.com/patterns/empty-states-pattern/', {
    d: 'Tipos de estado vazio e como escrever o texto.', pr: 'Vazio sem orientação.', u: 'Referência de redação e variantes.', t: ['vazio', 'empty state'], p: ['p-vazio']
  });
  R('primer-empty', 'E', 'conceitual', 'primer', 'Empty states (Primer)', 'https://primer.style/product/ui-patterns/empty-states/', {
    d: 'Padrões de estado vazio no GitHub.', pr: 'Vazio sem próximos passos.', u: 'Comparação.', t: ['vazio'], p: ['p-vazio']
  });
  R('gitlab-empty', 'E', 'conceitual', 'pajamas', 'Empty states (Pajamas)', 'https://design.gitlab.com/patterns/empty-states/', {
    d: 'Padrões de vazio do GitLab.', pr: 'Vazio sem ação.', u: 'Comparação.', t: ['vazio'], p: ['p-vazio']
  });
  R('cloudscape-empty', 'E', 'conceitual', 'cloudscape', 'Empty states (Cloudscape)', 'https://cloudscape.design/patterns/general/empty-states/', {
    d: 'Estados vazios em tabelas e coleções.', pr: 'Tabela vazia confundida com erro.', u: 'Listagens administrativas.', t: ['vazio', 'tabela'], p: ['p-vazio', 'p-tabela']
  });
  R('atlassian-empty', 'E', 'implementavel', 'atlassian', 'Empty state (Atlassian)', 'https://atlassian.design/components/empty-state/', {
    d: 'Componente de estado vazio.', pr: 'Vazio sem ação.', u: 'Comparação.', t: ['vazio'], p: ['p-vazio'], tech: 'React'
  });
  R('nng-empty', 'E', 'conceitual', 'nngroup', 'Empty state: design de interface (NN/G)', 'https://www.nngroup.com/articles/empty-state-interface-design/', {
    d: 'Pesquisa e diretrizes sobre estados vazios.', pr: 'Vazio tratado como erro.', u: 'Justificar a prioridade do estado vazio.', t: ['vazio'], p: ['p-vazio']
  });
  R('emptystates-gallery', 'E', 'inspiracao', 'emptystates', 'Empty States (galeria curada)', 'https://emptystat.es/', {
    d: 'Galeria de estados vazios em apps reais.', pr: 'Falta de repertório visual.', u: 'Inspiração de ilustração e texto.', t: ['vazio', 'galeria'], p: ['p-vazio']
  });
  R('gallery-empty', 'E', 'inspiracao', 'compgallery', 'Empty state (galeria de design systems)', 'https://component.gallery/components/empty-state/', {
    d: 'Estados vazios de vários sistemas.', pr: 'Escolher a abordagem.', u: 'Comparação.', t: ['vazio', 'comparação'], p: ['p-vazio']
  });
  R('gov-404', 'E', 'conceitual', 'govuk', 'Página não encontrada (404)', 'https://design-system.service.gov.uk/patterns/page-not-found-pages/', {
    d: 'Texto e estrutura para a página 404.', pr: '404 técnica sem saída.', u: 'Definir texto e ações de recuperação.', t: ['404', 'erro'], p: ['p-erro']
  });
  R('gov-500', 'E', 'conceitual', 'govuk', 'Problema com o serviço (500)', 'https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/', {
    d: 'Página para falhas inesperadas, com orientação ao usuário.', pr: 'Erro interno sem instruções.', u: 'Páginas 500 e falhas de sistema.', t: ['500', 'erro'], p: ['p-erro']
  });
  R('gov-unavailable', 'E', 'conceitual', 'govuk', 'Serviço indisponível', 'https://design-system.service.gov.uk/patterns/service-unavailable-pages/', {
    d: 'Página para manutenção ou indisponibilidade planejada.', pr: 'Manutenção sem previsão de retorno.', u: 'Manutenção.', t: ['manutenção', 'indisponibilidade'], p: ['p-erro']
  });
  R('gov-confirmation', 'E', 'conceitual', 'govuk', 'Páginas de confirmação', 'https://design-system.service.gov.uk/patterns/confirmation-pages/', {
    d: 'Telas de conclusão com o que acontece a seguir.', pr: 'Fim de fluxo sem confirmação.', u: 'Envios e solicitações.', t: ['sucesso', 'confirmação'], p: ['p-feedback', 'p-fluxo']
  });
  R('antd-result', 'E', 'implementavel', 'antd', 'Result (sucesso, info, aviso, 403, 404, 500, erro)', 'https://ant.design/components/result', {
    d: 'Componente de resultado com variantes de sucesso e de erro, incluindo 403, 404 e 500.', pr: 'Páginas de estado improvisadas (inclui “sem permissão”).', u: 'Fim de fluxo e páginas de erro.', t: ['sucesso', '403', '404', '500', 'sem permissão'], p: ['p-erro', 'p-feedback'], tech: 'React'
  });
  R('primer-degraded', 'E', 'conceitual', 'primer', 'Degraded experiences (Primer)', 'https://primer.style/product/ui-patterns/degraded-experiences/', {
    d: 'Como comunicar e projetar quando partes do sistema falham.', pr: 'Falha parcial tratada como falha total.', u: 'Falha de conexão e serviços parcialmente indisponíveis.', t: ['degradação', 'falha de conexão', 'erro'], p: ['p-erro']
  });
  R('nng-error-messages', 'E', 'conceitual', 'nngroup', 'Diretrizes de mensagens de erro (NN/G)', 'https://www.nngroup.com/articles/error-message-guidelines/', {
    d: 'Como escrever mensagens de erro claras e acionáveis.', pr: 'Mensagens genéricas ou acusatórias.', u: 'Revisar textos de erro.', t: ['erro', 'texto'], p: ['p-erro']
  });
  R('cloudscape-error-messages', 'E', 'conceitual', 'cloudscape', 'Mensagens de erro (Cloudscape)', 'https://cloudscape.design/patterns/general/errors/error-messages/', {
    d: 'Estrutura e texto de mensagens de erro.', pr: 'Mensagens sem causa ou solução.', u: 'Padronizar mensagens.', t: ['erro', 'texto'], p: ['p-erro']
  });
  R('cloudscape-disabled', 'E', 'conceitual', 'cloudscape', 'Estados desabilitado e somente leitura', 'https://cloudscape.design/patterns/general/disabled-and-read-only-states/', {
    d: 'Quando usar desabilitado, somente leitura e como explicar o motivo.', pr: 'Botão desabilitado sem explicação (inclui “sem permissão”).', u: 'Permissões e dependências.', t: ['desabilitado', 'somente leitura', 'permissões'], p: ['p-feedback', 'p-botoes']
  });
  R('carbon-disabled', 'E', 'conceitual', 'carbon', 'Disabled states (Carbon)', 'https://www.carbondesignsystem.com/building-blocks/core/patterns/disabled-states', {
    d: 'Padrão de estados desabilitados.', pr: 'Elementos desabilitados sem contexto.', u: 'Comparação.', t: ['desabilitado'], p: ['p-feedback']
  });

  /* ===================== F. Páginas completas ===================== */
  R('shadcn-blocks', 'F', 'pagina', 'shadcn', 'Blocks (login, dashboard, sidebar)', 'https://ui.shadcn.com/blocks', {
    d: 'Blocos prontos de páginas completas (autenticação, dashboards, barras laterais).', pr: 'Começar telas do zero sem referência.', u: 'Mostrar uma estrutura de página possível ao responsável.', t: ['login', 'dashboard', 'páginas'], tech: 'React, Tailwind'
  });
  R('carbon-login', 'F', 'pagina', 'carbon', 'Login (Carbon)', 'https://www.carbondesignsystem.com/building-blocks/core/patterns/login', {
    d: 'Padrão de página de login.', pr: 'Login sem estados de erro e recuperação.', u: 'Referência para autenticação.', t: ['login', 'autenticação'], p: ['p-erro']
  });
  R('gov-create-accounts', 'F', 'pagina', 'govuk', 'Criar contas (GOV.UK)', 'https://design-system.service.gov.uk/patterns/create-accounts/', {
    d: 'Fluxo de criação e acesso de contas com orientações.', pr: 'Cadastro e login com atrito.', u: 'Cadastro e recuperação de acesso.', t: ['cadastro', 'login', 'conta'], p: ['p-fluxo']
  });
  R('gov-passwords', 'F', 'pagina', 'govuk', 'Senhas (GOV.UK)', 'https://design-system.service.gov.uk/patterns/passwords/', {
    d: 'Padrão de campos e regras de senha.', pr: 'Regras de senha ocultas.', u: 'Cadastro e recuperação de senha.', t: ['senha', 'login'], p: ['p-form']
  });
  R('cloudscape-details-hub', 'F', 'pagina', 'cloudscape', 'Details page as hub', 'https://cloudscape.design/patterns/resource-management/details/details-page-as-hub/', {
    d: 'Página de detalhes como ponto de partida para ações relacionadas.', pr: 'Detalhes sem caminho para as ações.', u: 'Perfis e objetos com muitas ações.', t: ['detalhes', 'perfil'], p: ['p-nav']
  });
  R('primer-onboarding', 'F', 'conceitual', 'primer', 'Feature onboarding (Primer)', 'https://primer.style/product/ui-patterns/feature-onboarding/', {
    d: 'Como apresentar novas funcionalidades.', pr: 'Recurso novo que ninguém descobre.', u: 'Lançamentos e primeiros usos.', t: ['onboarding', 'descoberta'], p: ['p-nav']
  });
  R('cloudscape-onboarding', 'F', 'conceitual', 'cloudscape', 'Onboarding (Cloudscape)', 'https://cloudscape.design/patterns/general/onboarding/', {
    d: 'Padrões de onboarding de produto.', pr: 'Primeira sessão sem orientação.', u: 'Primeiro uso.', t: ['onboarding'], p: ['p-fluxo']
  });
  R('nng-onboarding', 'F', 'conceitual', 'nngroup', 'Onboarding e tutoriais (NN/G)', 'https://www.nngroup.com/articles/onboarding-tutorials/', {
    d: 'Pesquisa sobre tutoriais de primeiro uso.', pr: 'Tutorial longo que ninguém lê.', u: 'Justificar um onboarding mais leve.', t: ['onboarding'], p: ['p-fluxo']
  });
  R('pageflows-web', 'F', 'inspiracao', 'pageflows', 'Page Flows (web)', 'https://pageflows.com/web/', {
    d: 'Fluxos de produtos web populares em vídeo.', pr: 'Falta de referência de fluxo completo.', u: 'Comparar fluxos de cadastro, upgrade, filtro etc.', o: 'Acesso a todo o conteúdo não verificado.', t: ['fluxos', 'inspiração']
  });
  R('mobbin-web', 'F', 'inspiracao', 'mobbin', 'Mobbin (web)', 'https://mobbin.com/explore/web', {
    d: 'Biblioteca de telas e fluxos de produtos web reais.', pr: 'Falta de referência de produtos reais.', u: 'Mostrar a clientes como produtos conhecidos resolvem um fluxo.', o: 'A home oferece plano gratuito e planos pagos; limites não verificados.', t: ['fluxos', 'inspiração', 'apps']
  });
  R('refero-lib', 'F', 'inspiracao', 'refero', 'Refero', 'https://refero.design/', {
    d: 'Referências de UI/UX de produtos reais.', pr: 'Falta de referências de telas reais.', u: 'Pesquisa visual.', o: 'Conteúdo carregado por JavaScript; não analisado.', t: ['inspiração']
  });
  R('landbook-lib', 'F', 'inspiracao', 'landbook', 'Land-book', 'https://land-book.com/', {
    d: 'Galeria de landing pages.', pr: 'Referência de páginas de marketing.', u: 'Inspiração de página inicial.', e: 'Auditoria de aplicações.', t: ['landing', 'inspiração']
  });
  R('dribbble-lib', 'F', 'inspiracao', 'dribbble', 'Dribbble', 'https://dribbble.com/', {
    d: 'Portfólios de designers.', pr: 'Referência estética.', u: 'Inspiração visual.', e: 'Como prova de usabilidade: vários shots são conceitos.', t: ['inspiração', 'visual']
  });
  R('awwwards-lib', 'F', 'inspiracao', 'awwwards', 'Awwwards', 'https://www.awwwards.com/', {
    d: 'Galeria de sites premiados.', pr: 'Referência estética.', u: 'Inspiração visual.', e: 'Auditoria de usabilidade.', o: 'Não acessado neste ambiente.', t: ['inspiração', 'visual']
  });
  R('collectui-lib', 'F', 'inspiracao', 'collectui', 'Collect UI', 'https://collectui.com/', {
    d: 'Inspiração diária de interfaces curada.', pr: 'Repertório de componentes isolados.', u: 'Inspiração.', t: ['inspiração']
  });
  R('pttrns-lib', 'F', 'inspiracao', 'pttrns', 'Pttrns', 'https://www.pttrns.com/', {
    d: 'Padrões de design mobile.', pr: 'Referência mobile.', u: 'Inspiração mobile.', ctx: 'mobile', t: ['mobile', 'inspiração'], p: ['p-mobile']
  });
  R('s21st-lib', 'F', 'recurso', 's21st', '21st.dev', 'https://21st.dev/', {
    d: 'Registro comunitário de componentes React/Tailwind, com prompts para copiar.', pr: 'Repertório de variações.', u: 'Buscar variações de botões, inputs, navegação, cards.', o: 'Planos pagos; contas gratuitas limitadas a 2 cópias por dia.', t: ['componentes', 'registro']
  });
  R('aceternity-lib', 'F', 'recurso', 'aceternity', 'Aceternity UI', 'https://ui.aceternity.com/components', {
    d: 'Componentes com efeitos e animação.', pr: 'Referência de efeitos visuais.', u: 'Landing pages e vitrines.', e: 'Telas de trabalho: efeitos aumentam ruído.', t: ['animação', 'efeitos']
  });
  R('magicui-lib', 'F', 'recurso', 'magicui', 'Magic UI', 'https://magicui.design/docs/components', {
    d: 'Componentes animados.', pr: 'Referência de microinteração.', u: 'Páginas de marketing.', e: 'Excesso de animação em telas de trabalho.', t: ['animação']
  });
  R('motion-prim', 'F', 'recurso', 'motionprim', 'Motion-Primitives', 'https://motion-primitives.com/docs', {
    d: 'Primitivos animados (accordion, dialog, toolbar, text effects).', pr: 'Transições bruscas.', u: 'Microinteração discreta.', a: 'Respeitar prefers-reduced-motion.', t: ['animação', 'motion']
  });
  R('reactbits-lib', 'F', 'recurso', 'reactbits', 'React Bits', 'https://reactbits.dev/', {
    d: 'Componentes animados.', pr: 'Referência de animação.', u: 'Inspiração.', t: ['animação']
  });
  R('heroui-lib', 'F', 'recurso', 'heroui', 'HeroUI', 'https://www.heroui.com/docs/components', {
    d: 'Biblioteca React/Tailwind.', pr: 'Alternativa visual.', u: 'Comparação.', t: ['biblioteca']
  });
  R('daisy-lib', 'F', 'recurso', 'daisyui', 'daisyUI (skeleton e outros)', 'https://daisyui.com/components/skeleton/', {
    d: 'Classes de componentes para Tailwind.', pr: 'Prototipagem rápida.', u: 'Protótipos.', t: ['biblioteca']
  });
  R('flowbite-lib', 'F', 'recurso', 'flowbite', 'Flowbite (tabelas)', 'https://flowbite.com/docs/components/tables/', {
    d: 'Tabelas e componentes em Tailwind.', pr: 'Exemplos de tabelas.', u: 'Comparação.', t: ['biblioteca', 'tabela']
  });
  R('dsrepo-lib', 'F', 'recurso', 'dsrepo', 'Design Systems Repo', 'https://designsystemsrepo.com/', {
    d: 'Coleção de design systems, artigos e ferramentas.', pr: 'Descobrir novos sistemas.', u: 'Expandir a lista de fontes.', t: ['catálogo']
  });
  R('uxp-lib', 'F', 'recurso', 'uxpatterns', 'UX Patterns for Developers', 'https://uxpatterns.dev/', {
    d: 'Mais de 90 padrões de UI em 11 categorias (segundo a home).', pr: 'Vocabulário de padrões.', u: 'Consulta de trade-offs.', t: ['catálogo', 'padrões']
  });
  R('uip-lib', 'F', 'recurso', 'uipatterns', 'UI-Patterns.com', 'https://ui-patterns.com/', {
    d: 'Biblioteca de padrões de interface.', pr: 'Vocabulário de padrões.', u: 'Consulta.', t: ['catálogo', 'padrões']
  });
  R('gallery-home', 'F', 'recurso', 'compgallery', 'The Component Gallery', 'https://component.gallery/components/', {
    d: 'Componentes comparados entre design systems (60 componentes, 95 sistemas, 2.671 exemplos segundo a home).', pr: 'Comparar nomes e soluções.', u: 'Primeira parada ao investigar um componente.', t: ['catálogo', 'comparação']
  });
  R('gallery-nav', 'F', 'inspiracao', 'compgallery', 'Navigation (galeria)', 'https://component.gallery/components/navigation/', {
    d: 'Padrões de navegação de vários sistemas.', pr: 'Escolher uma estrutura de navegação.', u: 'Comparação.', t: ['navegação', 'comparação'], p: ['p-nav', 'p-sidebar']
  });

  /* ===================== G. Padrões avançados ===================== */
  R('cloudscape-delete-extra', 'G', 'conceitual', 'cloudscape', 'Delete com confirmação adicional', 'https://cloudscape.design/patterns/resource-management/delete/delete-with-additional-confirmation/', {
    d: 'Para exclusões de alto impacto, exigir digitar uma confirmação.', pr: 'Exclusão acidental de recursos importantes.', u: 'Recursos com dependências ou irreversíveis.', e: 'Exclusões triviais e reversíveis.', t: ['exclusão', 'confirmação', 'destrutivo'], p: ['p-destrutiva']
  });
  R('cloudscape-delete-simple', 'G', 'conceitual', 'cloudscape', 'Delete com confirmação simples', 'https://cloudscape.design/patterns/resource-management/delete/delete-with-simple-confirmation/', {
    d: 'Modal simples para exclusões de impacto moderado.', pr: 'Exclusão sem aviso.', u: 'Exclusões moderadas.', t: ['exclusão', 'confirmação'], p: ['p-destrutiva']
  });
  R('cloudscape-delete-oneclick', 'G', 'conceitual', 'cloudscape', 'One-click delete', 'https://cloudscape.design/patterns/resource-management/delete/one-click-delete/', {
    d: 'Exclusão sem confirmação para itens de baixo risco.', pr: 'Atrito em exclusões triviais.', u: 'Itens reversíveis; combine com desfazer.', t: ['exclusão', 'desfazer'], p: ['p-destrutiva']
  });
  R('gitlab-destructive', 'G', 'conceitual', 'pajamas', 'Destructive actions (Pajamas)', 'https://design.gitlab.com/patterns/destructive-actions/', {
    d: 'Padrões para ações destrutivas e seus níveis de confirmação.', pr: 'Ações destrutivas sem hierarquia de risco.', u: 'Definir regras por nível de impacto.', t: ['destrutivo', 'confirmação'], p: ['p-destrutiva']
  });
  R('cloudscape-global-actions', 'G', 'conceitual', 'cloudscape', 'Ações globais e em contexto', 'https://cloudscape.design/patterns/general/actions/', {
    d: 'Organizar ações por escopo (página, coleção, item).', pr: 'Ações misturadas sem hierarquia.', u: 'Páginas com muitas ações.', t: ['ações', 'hierarquia', 'botões'], p: ['p-botoes', 'p-hierarquia']
  });
  R('cloudscape-feedback', 'G', 'conceitual', 'cloudscape', 'Coletar feedback do usuário', 'https://cloudscape.design/patterns/general/collect-user-feedback/', {
    d: 'Mecanismos para coletar feedback.', pr: 'Feedback de produto invisível.', u: 'Produtos em evolução.', t: ['feedback']
  });
  R('cloudscape-drag-drop', 'G', 'conceitual', 'cloudscape', 'Drag and drop', 'https://cloudscape.design/patterns/general/drag-and-drop/', {
    d: 'Reordenar e mover itens com alternativa por teclado.', pr: 'Arrastar sem alternativa acessível.', u: 'Reordenação.', t: ['arrastar', 'teclado'], p: ['p-contraste']
  });
  R('cloudscape-help', 'G', 'conceitual', 'cloudscape', 'Help system', 'https://cloudscape.design/patterns/general/help-system/', {
    d: 'Ajuda contextual e documentação integrada.', pr: 'Ajuda fora do contexto.', u: 'Produtos complexos.', t: ['ajuda', 'tooltip']
  });
  R('cloudscape-secondary-panels', 'G', 'conceitual', 'cloudscape', 'Painéis secundários', 'https://cloudscape.design/patterns/general/secondary-panels/', {
    d: 'Painéis laterais para detalhes, ajuda e filtros.', pr: 'Modais cobrindo o contexto.', u: 'Alternativa a modais.', t: ['painel lateral'], p: ['p-modal']
  });
  R('nng-heuristics', 'G', 'conceitual', 'nngroup', '10 heurísticas de usabilidade', 'https://www.nngroup.com/articles/ten-usability-heuristics/', {
    d: 'Heurísticas de Nielsen para avaliação de interfaces.', pr: 'Falta de critério explícito de auditoria.', u: 'Estruturar um relatório de auditoria.', t: ['heurísticas', 'auditoria'], p: ['p-fluxo', 'p-feedback']
  });
  R('nng-wizards', 'G', 'conceitual', 'nngroup', 'Wizards (NN/G)', 'https://www.nngroup.com/articles/wizards/', {
    d: 'Prós e contras de wizards.', pr: 'Wizard imposto a tarefas simples.', u: 'Justificar etapas.', t: ['etapas', 'wizard'], p: ['p-fluxo']
  });
  R('nng-filters', 'G', 'conceitual', 'nngroup', 'Categorias e valores de filtros', 'https://www.nngroup.com/articles/filter-categories-values/', {
    d: 'Como organizar filtros por categoria e valor.', pr: 'Filtros mal agrupados.', u: 'Desenho de filtros.', t: ['filtros'], p: ['p-filtros']
  });
  R('webdev-reduced', 'G', 'conceitual', 'mdn', 'prefers-reduced-motion (MDN)', 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion', {
    d: 'Media query para respeitar a preferência por menos movimento.', pr: 'Animações forçadas.', u: 'Auditar transições e animações.', a: 'Critério direto para animações.', t: ['movimento', 'animação', 'acessibilidade'], p: ['p-contraste']
  });

  /* ===================== H. Design visual e responsividade ===================== */
  R('shadcn-theming', 'H', 'conceitual', 'shadcn', 'Theming (shadcn/ui)', 'https://ui.shadcn.com/docs/theming', {
    d: 'Tokens de cor via variáveis CSS e convenções de tema.', pr: 'Cores hardcoded em cada componente.', u: 'Estruturar tokens.', t: ['tokens', 'tema', 'cores'], tech: 'CSS variables'
  });
  R('shadcn-dark', 'H', 'conceitual', 'shadcn', 'Dark mode (shadcn/ui)', 'https://ui.shadcn.com/docs/dark-mode', {
    d: 'Estratégias de tema escuro em frameworks.', pr: 'Tema escuro inconsistente.', u: 'Implementar tema.', t: ['tema escuro', 'tokens']
  });
  R('bootstrap-colormodes', 'H', 'conceitual', 'bootstrap', 'Color modes (Bootstrap)', 'https://getbootstrap.com/docs/5.3/customize/color-modes/', {
    d: 'Modo claro e escuro com data-bs-theme.', pr: 'Tema escuro tardio.', u: 'Referência simples de tema.', t: ['tema escuro'], tech: 'CSS'
  });
  R('mdn-color-scheme', 'H', 'conceitual', 'mdn', 'prefers-color-scheme (MDN)', 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme', {
    d: 'Media query para a preferência de tema do sistema.', pr: 'Ignorar a preferência do usuário.', u: 'Respeitar o tema do sistema.', t: ['tema escuro', 'preferências']
  });
  R('m3-color', 'H', 'conceitual', 'm3', 'Color system (Material 3)', 'https://m3.material.io/styles/color/overview', {
    d: 'Papéis de cor, esquemas e acessibilidade.', pr: 'Paleta sem papéis semânticos.', u: 'Estruturar um sistema de cores.', t: ['cores', 'tokens']
  });
  R('carbon-color', 'H', 'conceitual', 'carbon', 'Color (Carbon)', 'https://carbondesignsystem.com/elements/color/overview/', {
    d: 'Tokens e temas de cor do Carbon.', pr: 'Cores sem hierarquia.', u: 'Comparação.', t: ['cores', 'tokens']
  });
  R('atlassian-tokens', 'H', 'conceitual', 'atlassian', 'Design tokens (Atlassian)', 'https://atlassian.design/foundations/design-tokens/', {
    d: 'Estrutura e uso de tokens de design.', pr: 'Valores soltos, sem tokens.', u: 'Planejar tokens.', t: ['tokens']
  });
  R('uswds-tokens', 'H', 'conceitual', 'uswds', 'Design tokens (USWDS)', 'https://designsystem.digital.gov/design-tokens/', {
    d: 'Tokens de cor, espaçamento e tipografia.', pr: 'Valores ad hoc.', u: 'Comparação.', t: ['tokens']
  });
  R('gov-colour', 'H', 'conceitual', 'govuk', 'Cores (GOV.UK)', 'https://design-system.service.gov.uk/styles/colour/', {
    d: 'Paleta com foco em contraste.', pr: 'Cores com contraste insuficiente.', u: 'Referência de contraste.', t: ['cores', 'contraste'], p: ['p-contraste']
  });
  R('m3-type', 'H', 'conceitual', 'm3', 'Tipografia (Material 3)', 'https://m3.material.io/styles/typography/overview', {
    d: 'Escala tipográfica e papéis.', pr: 'Tamanhos de texto sem escala.', u: 'Definir escala.', t: ['tipografia'], p: ['p-hierarquia']
  });
  R('carbon-type', 'H', 'conceitual', 'carbon', 'Tipografia (Carbon)', 'https://carbondesignsystem.com/elements/typography/overview/', {
    d: 'Escala e uso de tipografia.', pr: 'Hierarquia tipográfica fraca.', u: 'Comparação.', t: ['tipografia'], p: ['p-hierarquia']
  });
  R('fluent-type', 'H', 'conceitual', 'fluent', 'Tipografia (Fluent 2)', 'https://fluent2.microsoft.design/typography', {
    d: 'Escala tipográfica do Fluent.', pr: 'Escala inconsistente.', u: 'Comparação.', t: ['tipografia']
  });
  R('atlassian-spacing', 'H', 'conceitual', 'atlassian', 'Espaçamento (Atlassian)', 'https://atlassian.design/foundations/spacing/', {
    d: 'Escala de espaçamento em tokens.', pr: 'Margens e espaços arbitrários.', u: 'Padronizar espaçamento.', t: ['espaçamento', 'grid'], p: ['p-hierarquia']
  });
  R('carbon-grid', 'H', 'conceitual', 'carbon', '2x Grid (Carbon)', 'https://carbondesignsystem.com/elements/2x-grid/overview/', {
    d: 'Grid responsivo e breakpoints.', pr: 'Layout sem grid.', u: 'Definir grid.', t: ['grid', 'responsivo'], p: ['p-mobile']
  });
  R('bootstrap-breakpoints', 'H', 'conceitual', 'bootstrap', 'Breakpoints (Bootstrap)', 'https://getbootstrap.com/docs/5.3/layout/breakpoints/', {
    d: 'Breakpoints e media queries.', pr: 'Quebras ad hoc.', u: 'Definir quebras.', t: ['responsivo', 'breakpoints'], p: ['p-mobile']
  });
  R('m3-adaptive', 'H', 'conceitual', 'm3', 'Design adaptativo (Material 3)', 'https://m3.material.io/foundations/adaptive-design/overview', {
    d: 'Adaptar layouts a diferentes tamanhos e dobras.', pr: 'Layout desktop espremido no celular.', u: 'Planejar responsividade.', t: ['responsivo', 'adaptativo', 'mobile'], p: ['p-mobile']
  });
  R('wcag-contrast', 'H', 'conceitual', 'wcag', 'WCAG: contraste mínimo', 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', {
    d: 'Razões mínimas de contraste de texto.', pr: 'Texto cinza claro ilegível.', u: 'Auditar cores de texto.', t: ['contraste', 'acessibilidade'], p: ['p-contraste']
  });
  R('wcag-focus', 'H', 'conceitual', 'wcag', 'WCAG: aparência do foco', 'https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html', {
    d: 'Critério sobre visibilidade do indicador de foco.', pr: 'Foco invisível.', u: 'Auditar foco.', t: ['foco', 'acessibilidade'], p: ['p-contraste']
  });
  R('wcag-target', 'H', 'conceitual', 'wcag', 'WCAG: tamanho do alvo', 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html', {
    d: 'Tamanho mínimo de alvos de toque/clique.', pr: 'Botões minúsculos.', u: 'Auditar mobile.', ctx: 'mobile', t: ['alvos', 'mobile', 'acessibilidade'], p: ['p-mobile', 'p-contraste']
  });
  R('wcag-reflow', 'H', 'conceitual', 'wcag', 'WCAG: reflow', 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html', {
    d: 'Conteúdo sem rolagem horizontal em larguras estreitas.', pr: 'Rolagem horizontal em telas pequenas.', u: 'Auditar responsividade.', t: ['responsivo', 'acessibilidade'], p: ['p-mobile']
  });
  R('apg-keyboard', 'H', 'conceitual', 'apg', 'Interface de teclado (APG)', 'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/', {
    d: 'Práticas de foco e navegação por teclado.', pr: 'Interfaces inoperáveis por teclado.', u: 'Auditar teclado.', t: ['teclado', 'foco'], p: ['p-contraste']
  });
  R('radix-a11y', 'H', 'conceitual', 'radix', 'Acessibilidade (Radix)', 'https://www.radix-ui.com/primitives/docs/overview/accessibility', {
    d: 'Como o Radix trata WAI-ARIA e teclado.', pr: 'Componentes próprios sem a11y.', u: 'Entender o que se herda.', t: ['acessibilidade', 'aria']
  });
  R('carbon-a11y', 'H', 'conceitual', 'carbon', 'Acessibilidade (Carbon)', 'https://carbondesignsystem.com/guidelines/accessibility/overview/', {
    d: 'Diretrizes de acessibilidade de design e desenvolvimento.', pr: 'Acessibilidade tardia.', u: 'Checklist.', t: ['acessibilidade']
  });
  R('antd-spec', 'H', 'conceitual', 'antd', 'Valores de design (Ant Design)', 'https://ant.design/docs/spec/overview', {
    d: 'Valores e princípios de design do Ant Design.', pr: 'Decisões visuais sem princípios.', u: 'Inspiração de princípios.', t: ['princípios']
  });
  R('fluent-principles', 'H', 'conceitual', 'fluent', 'Princípios de design (Fluent 2)', 'https://fluent2.microsoft.design/design-principles', {
    d: 'Princípios do Fluent 2.', pr: 'Decisões sem princípios.', u: 'Comparação.', t: ['princípios']
  });

  /* Páginas cujo texto não pôde ser lido neste ambiente (renderizadas por JavaScript, bloqueio 403 ou erro de TLS).
   Sua descrição é um resumo do curador e deve ser conferida na fonte. Gerado por tests/check-content.py em 2026-10-26. */
  const NAO_LIDO = new Set(["m3-text-fields", "m3-date-pickers", "m3-chips", "uiverse-lib", "m3-buttons", "m3-nav-drawer", "m3-nav-rail", "m3-nav-bar", "m3-search", "atlassian-dynamic-table", "m3-progress", "atlassian-skeleton", "m3-snackbar", "atlassian-banner", "m3-bottom-sheets", "atlassian-empty", "refero-lib", "landbook-lib", "dribbble-lib", "awwwards-lib", "m3-color", "atlassian-tokens", "m3-type", "m3-adaptive"]);
  L.forEach(r => { if (NAO_LIDO.has(r.id)) r.naoLido = true; });
  window.LIB_REFS = L;
})();
