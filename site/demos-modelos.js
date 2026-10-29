/* Modelos de tela (pesquisa de 28/10/2026): telas inteiras montadas só com componentes do Orthos, seguindo as
   recomendações de NN/g, Baymard, GOV.UK e Material 3 (fontes em docs/pesquisa-2026-10-28-novos-componentes.md).
   Cada modelo abre numa moldura de aparelho; o seletor troca entre celular, tablet e computador. */
(function () {
  const F = (/\/(tests|dist)\//.test(location.pathname) ? '../' : '') + 'assets/fotos/';
  const ico = p => `<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const I = n => window.Orthos.icon(n);
  // Hugeicons (stroke rounded)
  const P = {
    home: '<path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z"/>',
    chart: '<path d="M7 17L7 13"/><path d="M12 17L12 7"/><path d="M17 17L17 11"/><path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"/>',
    users: '<path d="M18.4995 20.5C18.2663 17.5685 15.8417 15.2477 12.808 15.0521L11.9995 15C11.7107 15.0076 11.4416 15.0178 11.1877 15.0298C8.18075 15.1723 5.7304 17.5974 5.49951 20.5"/><path d="M15.2495 9.25C15.2495 11.0449 13.7944 12.5 11.9995 12.5C10.2046 12.5 8.74952 11.0449 8.74952 9.25C8.74952 7.45507 10.2046 6 11.9995 6C13.7944 6 15.2495 7.45507 15.2495 9.25Z"/><path d="M5.50249 8.5C5.17908 7.99485 4.99158 7.39432 4.99158 6.75C4.99158 4.95507 6.44665 3.5 8.24157 3.5C8.68752 3.5 9.1125 3.58982 9.49939 3.75235"/><path d="M18.4963 8.5C18.8197 7.99485 19.0072 7.39432 19.0072 6.75C19.0072 4.95507 17.5521 3.5 15.7572 3.5C15.3113 3.5 14.8863 3.58982 14.4994 3.75235"/><path d="M22.0007 17.9996C21.8208 15.7374 19.9995 13.5 17.9995 13"/><path d="M1.99927 17.9996C2.17923 15.7374 4.00049 13.5 6.00049 13"/>',
    invoice: '<path d="M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z"/><path d="M11 11H8"/><path d="M14 7L8 7"/>',
    card: '<path d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z"/><path d="M10 16H11.5"/><path d="M14.5 16L18 16"/><path d="M2 9H22"/>',
    gear: '<path d="M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z"/><path d="M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z"/>',
    bell: '<path d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18"/><path d="M19.2311 18H4.76887C3.79195 18 3 17.208 3 16.2311C3 15.762 3.18636 15.3121 3.51809 14.9803L4.12132 14.3771C4.68393 13.8145 5 13.0514 5 12.2558V9.5C5 5.63401 8.13401 2.5 12 2.5C15.866 2.5 19 5.634 19 9.5V12.2558C19 13.0514 19.3161 13.8145 19.8787 14.3771L20.4819 14.9803C20.8136 15.3121 21 15.762 21 16.2311C21 17.208 20.208 18 19.2311 18Z"/>',
    lock: '<path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12105 13.2453 4 14.3624 4 15.5C4 16.6376 4.12105 17.7547 4.26781 18.8447Z"/><path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"/>',
    mail: '<path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"/><path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"/>',
    check: '<path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"/><path d="M8 12.5L10.5 15L16 9"/>'
  };
  // moldura com seletor de tamanho (o mesmo da Tabela em cartões); start = tamanho inicial
  const device = (start, inner) => `<div class="device-demo">
  <div class="ac-segmented" data-ac="segmented" aria-label="Tamanho da tela"><button type="button" value="375"${start === '375' ? ' aria-pressed="true"' : ''}>Celular · 375 px</button><button type="button" value="768"${start === '768' ? ' aria-pressed="true"' : ''}>Tablet · 768 px</button><button type="button" value="full"${start === 'full' ? ' aria-pressed="true"' : ''}>Computador</button></div>
  <div class="device-frame" data-size="${start}" style="--w:${start === 'full' ? '100%' : start + 'px'};width:min(var(--w),100%);padding:0;overflow:hidden">
${inner}
  </div>
</div>`;
  const stat = (label, delta, up, value, spark) => `<article class="ac-card"><div class="ac-card__body"><div class="ac-stat__label">${label} <span class="ac-stat__delta ac-stat__delta--${up ? 'up' : 'down'}">${delta}</span></div><div class="ac-stat__value" style="font-size:var(--ac-fs-2xl)">${value}</div><div data-ac="spark" data-values="${spark}"></div></div></article>`;
  const plan = (name, m, y, note, items, featured) => `<article class="ac-plan${featured ? ' ac-plan--featured' : ''}">${featured ? '<span class="ac-badge ac-badge--success ac-plan__badge">Mais escolhido</span>' : ''}
      <h3 class="ac-plan__name">${name}</h3>
      <div class="ac-plan__price" data-m="${m}" data-y="${y}">${m}<small>/mês</small></div>
      <p class="ac-plan__note" data-note="${note}"></p>
      <ul>${items.map(i => `<li>${ico(P.check)}${i}</li>`).join('')}</ul>
      <button class="ac-btn${featured ? '' : ' ac-btn--secondary'}" type="button">${name === 'Grátis' ? 'Começar grátis' : 'Assinar o ' + name}</button>
    </article>`;
  const faq = (q, a, open) => `<div class="ac-accordion__item${open ? ' is-open' : ''}"><button class="ac-accordion__trigger" type="button">${q}${I('chevron')}</button><div class="ac-accordion__panel"><div><p>${a}</p></div></div></div>`;

  const NOVOS = [
    { id: 'tpl-dashboard', grupo: 'Modelos', nome: 'Painel (dashboard)', novo: '2026-10-28',
      desc: 'App shell com menu lateral, topo com busca, quatro números com tendência, gráfico principal com painel de apoio ao lado (padrão “supporting pane” do Material 3) e a tabela das últimas movimentações. Abaixo de 720 px o menu sai e a tabela vira cartões.',
      ref: { nome: 'NN/g · Dashboards e Material 3 · Layouts canônicos', url: 'https://m3.material.io/foundations/adaptive-design/canonical-layouts' },
      wide: true,
      html: device('full', `<div class="ac-shell"><div class="ac-shell__in">
  <nav class="ac-sidebar ac-shell__side" data-ac="sidebar" aria-label="Principal">
    <div class="ac-sidebar__head"><span class="ac-sidebar__brand"><span class="ac-sidebar__logo"></span><span>Finanças</span></span></div>
    <a class="ac-sidebar__item" href="#" aria-current="page">${ico(P.home)}<span class="ac-sidebar__text">Início</span></a>
    <a class="ac-sidebar__item" href="#">${ico(P.chart)}<span class="ac-sidebar__text">Relatórios</span></a>
    <a class="ac-sidebar__item" href="#">${ico(P.invoice)}<span class="ac-sidebar__text">Notas e boletos</span><span class="ac-badge">3</span></a>
    <a class="ac-sidebar__item" href="#">${ico(P.card)}<span class="ac-sidebar__text">Cartões</span></a>
    <div class="ac-sidebar__label">Empresa</div>
    <a class="ac-sidebar__item" href="#">${ico(P.users)}<span class="ac-sidebar__text">Equipe</span></a>
    <a class="ac-sidebar__item" href="#">${ico(P.gear)}<span class="ac-sidebar__text">Configurações</span></a>
  </nav>
  <main class="ac-shell__main">
    <header class="ac-shell__top">
      <div><span class="ac-shell__brand-m"><span class="ac-sidebar__logo"></span>Finanças</span><h2 class="ac-shell__title">Bom dia, Ana</h2><p class="ac-hint" style="margin:2px 0 0">Resumo de outubro · atualizado às 7h</p></div>
      <div class="ac-shell__actions"><input class="ac-input ac-shell__search" type="search" placeholder="Buscar" aria-label="Buscar"><button class="ac-btn ac-btn--ghost ac-btn--icon" type="button" aria-label="Avisos (2 novos)">${ico(P.bell)}</button><span class="ac-avatar" aria-label="Ana Ribeiro">AR</span></div>
    </header>
    <div class="ac-shell__kpis">
      ${stat('Receita', '+18%', true, 'R$ 48,3 mil', '12,18,15,22,19,28,26,34,31,40')}
      ${stat('Despesas', '−6%', true, 'R$ 21,9 mil', '30,28,29,26,27,25,24,23,22,21')}
      ${stat('A receber', '+4', false, 'R$ 12,4 mil', '8,9,9,10,11,10,12,13,12,14')}
      ${stat('Saldo', '+R$ 3,1 mil', true, 'R$ 86,0 mil', '60,62,64,63,67,70,72,76,80,86')}
    </div>
    <div class="ac-shell__grid">
      <article class="ac-card"><div class="ac-card__head"><h3 class="ac-card__title">Entradas e saídas</h3><p class="ac-card__desc">Por semana, em milhares de reais</p></div><div class="ac-card__body"><div data-ac="bars" data-label="Entradas por semana" data-values="9,11,8,12,10,13,12,15" data-labels="S1,S2,S3,S4,S5,S6,S7,S8" style="height:150px"></div></div></article>
      <article class="ac-card"><div class="ac-card__head"><h3 class="ac-card__title">Metas do mês</h3></div><div class="ac-card__body" style="display:grid;gap:16px">
        <div class="ac-goal" style="--v:72%;--goal:100%"><div class="ac-goal__row"><span>Receita</span><span><b>72%</b></span></div><div class="ac-goal__track" role="progressbar" aria-label="Receita" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div></div>
        <div class="ac-goal" style="--v:45%;--goal:100%"><div class="ac-goal__row"><span>Notas emitidas</span><span><b>45%</b></span></div><div class="ac-goal__track" role="progressbar" aria-label="Notas emitidas" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div></div>
        <div class="ac-goal" style="--v:90%;--goal:100%"><div class="ac-goal__row"><span>Conciliação</span><span><b>90%</b></span></div><div class="ac-goal__track" role="progressbar" aria-label="Conciliação" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div></div>
      </div></article>
    </div>
    <div class="ac-table-wrap"><div class="ac-table-scroll"><table class="ac-table ac-table--stack" data-ac="stack">
      <caption class="ac-sr">Últimas movimentações</caption>
      <thead><tr><th scope="col">Descrição</th><th scope="col">Categoria</th><th scope="col">Data</th><th scope="col" class="num">Valor</th><th scope="col">Situação</th></tr></thead>
      <tbody>
        <tr><td><b>Mensalidade Pro</b> · cliente Vértice</td><td data-label="Categoria">Receita</td><td data-label="Data">27/10</td><td class="num" data-label="Valor">R$ 1.290,00</td><td data-label="Situação"><span class="ac-badge ac-badge--success">Recebido</span></td></tr>
        <tr><td><b>Aluguel do escritório</b></td><td data-label="Categoria">Despesa fixa</td><td data-label="Data">25/10</td><td class="num" data-label="Valor">− R$ 4.800,00</td><td data-label="Situação"><span class="ac-badge">Pago</span></td></tr>
        <tr><td><b>Projeto site</b> · Casa Alta</td><td data-label="Categoria">Receita</td><td data-label="Data">05/11</td><td class="num" data-label="Valor">R$ 7.500,00</td><td data-label="Situação"><span class="ac-badge ac-badge--warning">A receber</span></td></tr>
      </tbody>
    </table></div></div>
  </main>
</div></div>`),
      api: [['.ac-shell > .ac-shell__in', 'div', '—', 'O .ac-shell é medido (container query) e o __in é a grade menu + conteúdo'], ['.ac-shell__top / __kpis / __grid', 'div', '—', 'Topo, linha de números (4 → 2 → 1 colunas) e gráfico com painel de apoio (2/3 + 1/3)'], ['.ac-shell__brand-m', 'span', '—', 'Marca que aparece quando o menu lateral sai (abaixo de 720 px)']],
      a11y: ['Um <h2> por tela e regiões com nome (menu “Principal”).', 'Números sempre com o texto da tendência, não só a cor.', 'Gráficos com rótulo e a tabela com <caption> para leitor de tela.'] },

    { id: 'tpl-login', grupo: 'Modelos', nome: 'Entrar', novo: '2026-10-28',
      desc: 'Tela de entrada com foto e depoimento ao lado do formulário. Segue o GOV.UK e a NN/g: e-mail e senha com “mostrar senha” (o campo de senha do Orthos), colar permitido, “Esqueci a senha” à vista e a opção de entrar com um código por e-mail (Input OTP), sem senha.',
      ref: { nome: 'GOV.UK · Senhas e NN/g · Login sem senha', url: 'https://design-system.service.gov.uk/patterns/passwords/' },
      wide: true,
      html: device('full', `<div class="ac-auth"><div class="ac-auth__in">
  <aside class="ac-auth__panel"><img src="${F}montanhas-neve.jpg" alt=""><span style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:var(--ac-fs-lg)"><span class="ac-sidebar__logo"></span>Finanças</span>
    <blockquote class="ac-auth__quote">“Fechamos o mês em dois dias, não em duas semanas. A equipe só aprova o que o sistema já conciliou.”<cite>Marina Teles, diretora financeira na Vértice</cite></blockquote></aside>
  <div class="ac-auth__form">
    <form class="ac-auth__box" data-ac="validate" data-tpl="login" novalidate>
      <div><h2 class="ac-auth__title">Entrar</h2><p class="ac-hint" style="margin:6px 0 0">Bem-vinda de volta. Use o e-mail da sua empresa.</p></div>
      <div class="ac-field"><label class="ac-label" for="tl-mail">E-mail</label><input class="ac-input" id="tl-mail" type="email" name="email" autocomplete="username" required></div>
      <div data-tpl-step="senha">
        <div class="ac-field"><div class="ac-auth__row"><label class="ac-label" for="tl-pass">Senha</label><a href="#" class="ac-hint">Esqueci a senha</a></div><div data-ac="password"><input class="ac-input" id="tl-pass" type="password" name="senha" autocomplete="current-password" required></div></div>
        <button class="ac-btn ac-btn--lg" type="submit">Entrar</button>
        <div class="ac-auth__or">ou</div>
        <button class="ac-btn ac-btn--secondary ac-btn--lg" type="button" data-tpl-go="codigo">${ico(P.mail)}Receber um código por e-mail</button>
      </div>
      <div data-tpl-step="codigo" hidden>
        <p class="ac-hint" style="margin:0">Enviamos um código de 6 dígitos para o seu e-mail. Ele vale por 10 minutos.</p>
        <div class="ac-otp" data-ac="otp" data-length="6" data-valid="246810" data-label="Código recebido por e-mail"></div>
        <p class="ac-hint" style="margin:0">Código de teste: <code>246810</code> · <a href="#" data-tpl-go="senha">Entrar com senha</a></p>
      </div>
      <p class="ac-hint" style="margin:0;text-align:center">Não tem conta? <a href="#">Criar conta</a></p>
    </form>
  </div>
</div></div>`),
      api: [['.ac-auth > .ac-auth__in', 'div', '—', 'Painel de imagem + formulário; abaixo de 720 px fica só o formulário'], ['.ac-auth__panel', 'aside', '—', 'Foto de fundo (img) com depoimento em .ac-auth__quote'], ['.ac-auth__box', 'form', '—', 'Coluna do formulário (até 380 px)'], ['.ac-auth__or', 'div', '—', 'Divisor “ou”']],
      a11y: ['Rótulos visíveis e autocomplete (username, current-password) para gerenciadores de senha.', 'Mostrar senha e colar permitidos (GOV.UK).', 'O código chega num campo único com one-time-code; o erro é anunciado.'] },

    { id: 'tpl-checkout', grupo: 'Modelos', nome: 'Pagamento (checkout)', novo: '2026-10-28',
      desc: 'Checkout no padrão Baymard: poucos campos, compra sem cadastro, bandeira do cartão detectada e número espaçado enquanto digita, área de pagamento destacada e o resumo com o total sempre à vista (no celular, o resumo vem primeiro). Com erro, o que foi digitado continua lá.',
      ref: { nome: 'Baymard · Checkout e formulário de cartão', url: 'https://baymard.com/blog/payment-ux' },
      wide: true,
      html: device('full', `<div class="ac-checkout"><div class="ac-checkout__in">
  <form class="ac-checkout__form" data-ac="validate" data-tpl="checkout" novalidate>
    <fieldset class="ac-checkout__section"><legend>Contato e entrega</legend>
      <div class="ac-field"><label class="ac-label" for="tc-mail">E-mail</label><input class="ac-input" id="tc-mail" type="email" autocomplete="email" required><span class="ac-hint">Para o recibo e o código de rastreio. Não precisa criar conta.</span></div>
      <div class="ac-field"><label class="ac-label" for="tc-nome">Nome completo</label><input class="ac-input" id="tc-nome" autocomplete="name" required></div>
      <div class="ac-checkout__row">
        <div class="ac-field"><label class="ac-label" for="tc-cep">CEP</label><input class="ac-input" id="tc-cep" inputmode="numeric" autocomplete="postal-code" required pattern="\\d{5}-?\\d{3}" data-pattern-msg="Use o formato 00000-000."></div>
        <div class="ac-field"><label class="ac-label" for="tc-num">Número</label><input class="ac-input" id="tc-num" autocomplete="address-line2" required></div>
      </div>
      <div class="ac-field"><label class="ac-label" for="tc-end">Endereço</label><input class="ac-input" id="tc-end" autocomplete="address-line1" required></div>
    </fieldset>
    <fieldset class="ac-checkout__section"><legend>Pagamento</legend>
      <div class="ac-checkout__secure">
        <div class="ac-field"><label class="ac-label" for="tc-card">Número do cartão</label><div data-ac="card-number"><input class="ac-input" id="tc-card" required minlength="15"></div></div>
        <div class="ac-checkout__row">
          <div class="ac-field"><label class="ac-label" for="tc-exp">Validade</label><input class="ac-input" id="tc-exp" inputmode="numeric" autocomplete="cc-exp" placeholder="MM/AA" required pattern="(0[1-9]|1[0-2])/\\d{2}" data-pattern-msg="Use MM/AA, como 08/29."></div>
          <div class="ac-field"><label class="ac-label" for="tc-cvv">Código de segurança</label><input class="ac-input" id="tc-cvv" inputmode="numeric" autocomplete="cc-csc" required pattern="\\d{3,4}" data-pattern-msg="São 3 ou 4 números no verso do cartão."></div>
        </div>
        <p class="ac-checkout__note">${ico(P.lock)}Pagamento criptografado. Não guardamos o número do cartão.</p>
      </div>
    </fieldset>
    <button class="ac-btn ac-btn--lg" type="submit">Pagar R$ 1.287,90</button>
  </form>
  <aside class="ac-checkout__summary" aria-label="Resumo do pedido">
    <h3 class="ac-card__title" style="margin:0">Seu pedido</h3>
    <div class="ac-checkout__item"><img src="${F}baloes-p.jpg" alt=""><div>Passeio de balão<small>2 pessoas · 14/11</small></div><b>R$ 980,00</b></div>
    <div class="ac-checkout__item"><img src="${F}canyon-estrelas-p.jpg" alt=""><div>Observação de estrelas<small>2 pessoas · 15/11</small></div><b>R$ 290,00</b></div>
    <dl class="ac-checkout__lines"><div><dt>Subtotal</dt><dd>R$ 1.270,00</dd></div><div><dt>Taxa de serviço</dt><dd>R$ 17,90</dd></div><div class="ac-checkout__total"><dt>Total</dt><dd>R$ 1.287,90</dd></div></dl>
    <details><summary class="ac-hint" style="cursor:pointer">Tem um cupom?</summary><div style="display:flex;gap:8px;margin-top:8px"><input class="ac-input" aria-label="Cupom"><button class="ac-btn ac-btn--secondary" type="button">Aplicar</button></div></details>
  </aside>
</div></div>`),
      api: [['.ac-checkout > .ac-checkout__in', 'div', '—', 'Formulário + resumo fixo ao lado; abaixo de 760 px o resumo vem primeiro'], ['.ac-checkout__secure', 'div', '—', 'Área do cartão destacada (aumenta a sensação de segurança, segundo a Baymard)'], ['data-ac="card-number"', 'div', '—', 'Espaça o número e mostra a bandeira (Visa, Mastercard, Elo, Amex, Hipercard) em data-brand'], ['.ac-checkout__lines', 'dl', '—', 'Linhas do resumo; .ac-checkout__total no total']],
      a11y: ['Campos com autocomplete de cartão e endereço (cc-number, cc-exp, cc-csc, postal-code).', 'Erros em texto ao lado do campo, sem apagar o que foi digitado.', 'A bandeira detectada é anunciada (aria-live).'] },

    { id: 'tpl-pricing', grupo: 'Modelos', nome: 'Preços', novo: '2026-10-28',
      desc: 'Página de planos: alternância mensal/anual que recalcula os preços, três planos com o do meio em destaque (Lei de Von Restorff), o que cada um inclui e perguntas frequentes. O preço aparece sempre (NN/g: esconder manda o cliente para o concorrente).',
      ref: { nome: 'NN/g · Mostre o preço e Laws of UX', url: 'https://www.nngroup.com/articles/show-price/' },
      wide: true,
      html: device('full', `<div class="ac-pricing" data-tpl="pricing">
  <span class="ac-badge">Preços</span>
  <h2 class="ac-pricing__title">Um plano para cada fase da empresa</h2>
  <p class="ac-hint" style="margin:-8px 0 0;max-width:46ch">Todos com 14 dias grátis, sem cartão. Cancele quando quiser.</p>
  <div class="ac-segmented" data-ac="segmented" aria-label="Cobrança" data-tpl-period><button type="button" aria-pressed="true" value="m">Mensal</button><button type="button" value="y">Anual · 20% off</button></div>
  <div class="ac-pricing__plans">
    ${plan('Grátis', 'R$ 0', 'R$ 0', 'Para sempre', ['1 conta bancária', 'Conciliação manual', 'Relatório mensal'])}
    ${plan('Pro', 'R$ 49', 'R$ 39', 'R$ 468 por ano', ['5 contas bancárias', 'Conciliação automática', 'Relatórios toda manhã', 'Suporte em até 2 horas'], true)}
    ${plan('Equipe', 'R$ 129', 'R$ 103', 'R$ 1.236 por ano', ['Contas ilimitadas', 'Aprovação em duas etapas', 'Permissões por pessoa', 'Gerente de conta'])}
  </div>
  <div class="ac-accordion ac-pricing__faq" data-ac="accordion">
    ${faq('Posso trocar de plano depois?', 'Sim. A diferença é calculada pelos dias que faltam no ciclo e aparece na próxima fatura.', true)}
    ${faq('O que acontece no fim do teste grátis?', 'Você escolhe um plano ou continua no Grátis. Nada é cobrado sem você confirmar.')}
    ${faq('Emitem nota fiscal?', 'Sim, nota fiscal de serviço em todo pagamento, enviada para o e-mail da conta.')}
  </div>
</div>`),
      api: [['.ac-pricing', 'div', '—', 'Página de planos; abaixo de 760 px os planos empilham e o destaque vem primeiro'], ['.ac-plan / .ac-plan--featured', 'article', '—', 'Plano e plano em destaque (borda e sombra)'], ['.ac-plan__price', 'div', '—', 'Preço; no exemplo, data-m e data-y guardam mensal e anual'], ['.ac-plan__badge', 'span', '—', 'Selo “Mais escolhido”']],
      a11y: ['A troca mensal/anual é um grupo de botões com aria-pressed.', 'O que cada plano inclui está em lista; o check é decorativo.', 'Perguntas no accordion acessível do Orthos.'] }
  ];

  const D = window.DEMOS;
  NOVOS.forEach(n => D.push(n)); // grupo novo: entra no fim do menu

  const H = window.DEMO_HOOKS, O = () => window.Orthos;
  const login = root => {
    H.device(root);
    const f = root.querySelector('[data-tpl="login"]'); if (!f) return;
    const step = s => { f.querySelectorAll('[data-tpl-step]').forEach(x => { x.hidden = x.dataset.tplStep !== s; }); const pass = f.querySelector('#tl-pass'); pass.required = s === 'senha'; if (s === 'codigo') f.querySelector('.ac-otp__input')?.focus(); };
    f.addEventListener('click', e => { const g = e.target.closest('[data-tpl-go]'); if (g) { e.preventDefault(); step(g.dataset.tplGo); } });
    f.addEventListener('ac:valid', e => { e.preventDefault(); O().toast({ type: 'success', title: 'Entrou', desc: 'No seu app, aqui vai para o painel.' }); });
    f.addEventListener('ac:complete', e => { if (e.detail.valid) setTimeout(() => O().toast({ type: 'success', title: 'Código confirmado', desc: 'Entrou sem senha.' }), 900); });
  };
  const checkout = root => { H.device(root); const f = root.querySelector('[data-tpl="checkout"]'); f && f.addEventListener('ac:valid', e => { e.preventDefault(); O().toast({ type: 'success', title: 'Pagamento aprovado', desc: 'Pedido confirmado. O recibo foi para o seu e-mail.' }); }); };
  const pricing = root => {
    H.device(root);
    const seg = root.querySelector('[data-tpl-period]'); if (!seg) return;
    const paint = y => root.querySelectorAll('.ac-plan').forEach(p => { const pr = p.querySelector('.ac-plan__price'), nt = p.querySelector('.ac-plan__note'); pr.firstChild.textContent = y ? pr.dataset.y : pr.dataset.m; nt.textContent = y ? nt.dataset.note : (pr.dataset.m === 'R$ 0' ? nt.dataset.note : 'Cobrado todo mês'); });
    seg.addEventListener('ac:change', () => paint(seg.querySelector('[aria-pressed="true"]')?.value === 'y')); paint(false);
  };
  H['tpl-dashboard'] = root => H.device(root);
  H['tpl-login'] = login; H['tpl-checkout'] = checkout; H['tpl-pricing'] = pricing;
})();
