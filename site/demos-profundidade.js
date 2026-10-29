/* Profundidade e movimento (pesquisa de 28/10/2026): cartão com inclinação 3D, revelar ao rolar com barra de leitura
   e fundo com gradiente animado. Tudo em CSS e JS do Orthos, sem biblioteca. */
(function () {
  const F = (/\/(tests|dist)\//.test(location.pathname) ? '../' : '') + 'assets/fotos/';
  const ICO = p => `<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const pin = ICO('<path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"/><path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"/>');
  const ALT = { 'montanha-neblina': 'Cume de montanha com neblina', atitlan: 'Píer no Lago Atitlán entre flores roxas', 'casa-lago': 'Casa de madeira à beira de um lago', 'canyon-estrelas': 'Cânion sob o céu estrelado', 'arvore-lago': 'Árvore solitária dentro de um lago', baloes: 'Balões sobre a Capadócia', 'floresta-luz': 'Raio de sol numa floresta de outono', yosemite: 'Rio no Vale de Yosemite', 'montanhas-neve': 'Montanhas com neve sobre um vale' };
  const tile = (n, t, d) => `<article class="ac-card"><div class="ac-card__body" style="display:grid;gap:6px"><span class="ac-badge" style="justify-self:start">${n}</span><h3 class="ac-card__title">${t}</h3><p class="ac-card__desc">${d}</p></div></article>`;

  const NOVOS = [
    { id: 'tilt', grupo: 'Movimento', nome: 'Cartão com inclinação 3D', novo: '2026-10-28',
      desc: 'O cartão inclina seguindo o mouse, com um brilho onde o cursor está e camadas que flutuam em profundidade (data-depth). Só CSS 3D (perspective, rotateX/Y e translateZ) e um JS de poucas linhas; em telas de toque e com movimento reduzido fica parado.',
      ref: { nome: 'MDN · perspective e transform-style', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style' },
      html: `<div style="display:flex;flex-wrap:wrap;gap:28px;justify-content:center;align-items:center">
  <article class="ac-card" data-ac="tilt" style="width:280px;overflow:hidden;border-radius:20px">
    <img src="${F}baloes-v.jpg" alt="Balões de ar quente sobre as rochas da Capadócia" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover">
    <div style="position:absolute;inset:auto 0 0;padding:18px;background:linear-gradient(transparent,rgb(0 0 0/.7));color:#fff;display:grid;gap:4px" data-depth="40">
      <b style="font-size:var(--ac-fs-xl);letter-spacing:-.02em">Capadócia</b><span style="display:flex;gap:6px;align-items:center;font-size:var(--ac-fs-base);opacity:.85">${pin} Turquia · 6 dias</span>
    </div>
  </article>
  <article class="ac-card" data-ac="tilt" data-max="6" style="width:280px;border-radius:20px">
    <div class="ac-card__body" style="display:grid;gap:14px;padding:24px">
      <span class="ac-badge ac-badge--success" style="justify-self:start" data-depth="24">Mais escolhido</span>
      <div data-depth="36"><div class="ac-label">Plano Pro</div><div style="font:700 var(--ac-fs-3xl)/1.1 var(--ac-font);letter-spacing:-.03em">R$ 49<span style="font-size:var(--ac-fs-base);font-weight:500;color:var(--ac-text-3)">/mês</span></div></div>
      <p class="ac-card__desc" style="margin:0">Projetos ilimitados, relatórios automáticos e suporte em até 2 horas.</p>
      <button class="ac-btn" type="button" data-depth="20">Assinar o Pro</button>
    </div>
  </article>
</div>`,
      api: [['data-ac="tilt"', 'elemento', '—', 'Inclina seguindo o mouse e mostra o brilho'], ['data-max', 'graus', '10', 'Inclinação máxima'], ['data-depth', 'px (filho)', '—', 'Distância da camada (translateZ): quanto maior, mais ela “flutua”'], ['--rx / --ry / --gx / --gy', 'CSS', '—', 'Inclinação e posição do brilho, atualizadas pelo JS']],
      a11y: ['É só visual: o conteúdo e os botões funcionam igual sem o efeito.', 'Desligado em telas de toque (hover: none) e com movimento reduzido.', 'Inclinação pequena (até 10°) para não causar desconforto.'] },

    { id: 'flip-card', grupo: 'Movimento', nome: 'Cartão que vira', novo: '2026-10-29',
      desc: 'Frente e verso no mesmo lugar: o cartão gira 180° em 3D pelo botão do canto ou com um clique fora de links e campos. A face de costas fica inert, então o Tab e o leitor de tela só veem o lado que está à mostra.',
      ref: { nome: 'MDN · backface-visibility', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility' },
      html: `<div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center">
  <div data-ac="flip" style="width:280px">
    <article class="ac-card" style="overflow:hidden;border-radius:20px"><img src="${F}atitlan-v.jpg" alt="Caminho de pedra entre flores roxas até um píer no Lago Atitlán" style="display:block;width:100%;aspect-ratio:3/4;object-fit:cover"><div style="position:absolute;inset:auto 0 0;padding:18px;background:linear-gradient(transparent,rgb(0 0 0/.72));color:#fff"><b style="font-size:var(--ac-fs-xl)">Lago Atitlán</b><div style="opacity:.85">Guatemala · 5 dias</div></div></article>
    <article class="ac-card" style="border-radius:20px"><div class="ac-card__body" style="display:grid;gap:12px;align-content:start;height:100%;padding:24px"><span class="ac-badge" style="justify-self:start">Roteiro</span><h3 class="ac-card__title" style="font-size:var(--ac-fs-xl)">Lago Atitlán</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px;color:var(--ac-text-2)"><li>Dia 1: Panajachel e o píer</li><li>Dia 2: San Juan e as cooperativas</li><li>Dia 3: trilha do Nariz Indígena</li><li>Dias 4 e 5: caiaque e descanso</li></ul><div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center"><b style="font-size:var(--ac-fs-xl)">R$ 3.480</b><button class="ac-btn ac-btn--sm" type="button">Reservar</button></div></div></article>
  </div>
  <div data-ac="flip" data-label-back="Ver a resposta" data-label-front="Ver a pergunta" style="width:280px">
    <article class="ac-card" style="border-radius:20px"><div class="ac-card__body" style="display:grid;place-content:center;gap:10px;min-height:373px;padding:28px;text-align:center"><span class="ac-badge" style="justify-self:center">Pergunta 3 de 10</span><p style="margin:0;font:600 var(--ac-fs-xl)/1.35 var(--ac-font)">Qual lei diz que menos opções levam a decisões mais rápidas?</p></div></article>
    <article class="ac-card" style="border-radius:20px"><div class="ac-card__body" style="display:grid;place-content:center;gap:10px;min-height:373px;padding:28px;text-align:center"><span class="ac-badge ac-badge--success" style="justify-self:center">Resposta</span><p style="margin:0;font:700 var(--ac-fs-2xl)/1.2 var(--ac-font)">Lei de Hick</p><p class="ac-card__desc" style="margin:0">O tempo para decidir cresce com o número de opções.</p></div></article>
  </div>
</div>`,
      api: [['data-ac="flip"', 'div', '—', 'O 1º filho é a frente e o 2º o verso'], ['data-label-back / data-label-front', 'texto', 'Ver o verso / Ver a frente', 'Rótulo do botão em cada lado'], ['.is-flipped', 'classe', '—', 'Estado virado (o botão tem aria-pressed)']],
      a11y: ['Botão com aria-pressed e rótulo que diz para onde vai.', 'A face de costas fica inert: nada escondido recebe foco.', 'Com movimento reduzido, a troca é instantânea.'] },

    { id: 'marquee3d', grupo: 'Movimento', nome: 'Marquee 3D', novo: '2026-10-29',
      desc: 'Uma grade inclinada em perspectiva com quatro colunas de imagens rolando em sentidos opostos, para topo de página, portfólio ou depoimentos. Só CSS 3D; pausa no hover, no foco e no botão; parada fora da tela.',
      ref: { nome: 'Aceternity UI · 3D Marquee', url: 'https://ui.aceternity.com/components/3d-marquee' },
      wide: true,
      html: `<div data-ac="marquee3d" aria-label="Destinos em movimento" style="width:min(1080px,100%);margin:0 auto">
  ${['yosemite', 'lago-barcos', 'montanha-neblina', 'floresta-aerea', 'colinas-verdes', 'atitlan', 'montanhas-neve', 'campo-por-do-sol', 'floresta-luz', 'casa-lago', 'lago-montanha', 'montanha-raios', 'arvore-lago', 'canyon-estrelas', 'baloes', 'yosemite'].map(n => `<img src="${F}${n}-p.jpg" alt="" loading="lazy">`).join('')}
</div>`,
      api: [['data-ac="marquee3d"', 'div', '—', 'As imagens de dentro viram 4 colunas inclinadas'], ['--t', 'CSS', '40s', 'Duração de uma volta'], ['--h', 'CSS', '460px', 'Altura da área']],
      a11y: ['Botão de pausa sempre visível; também pausa no hover e com o foco dentro (WCAG 2.2.2).', 'Com movimento reduzido fica parado.', 'Imagens decorativas (alt vazio); use alt quando cada foto disser algo.'] },

    { id: 'retro-grid', grupo: 'Movimento', nome: 'Grade retrô em perspectiva', novo: '2026-10-29',
      desc: 'Fundo com uma grade que some no horizonte e anda devagar na sua direção, com um brilho no meio. Só CSS (rotateX e uma máscara de gradiente); a cor e o tamanho das linhas são variáveis.',
      ref: { nome: 'Magic UI · Retro Grid', url: 'https://magicui.design/docs/components/retro-grid' },
      wide: true,
      html: `<section class="ac-retro-grid" style="display:grid;place-items:center;gap:14px;min-height:420px;padding:48px 24px;border:1px solid var(--ac-border);border-radius:var(--ac-r-lg);background:var(--ac-surface);text-align:center">
  <span class="ac-badge">Lançamento</span>
  <h2 style="margin:0;max-width:18ch;font:700 clamp(30px,5vw,52px)/1.05 var(--ac-font);letter-spacing:-.04em">Seu painel, agora em tempo real.</h2>
  <p class="ac-card__desc" style="margin:0;max-width:44ch">Os números atualizam a cada venda, sem recarregar a página.</p>
  <button class="ac-btn ac-btn--lg" type="button">Ver novidades</button>
</section>`,
      api: [['.ac-retro-grid', 'classe', '—', 'Grade animada atrás do conteúdo'], ['--line', 'CSS', 'texto a 18%', 'Cor das linhas'], ['--cell', 'CSS', '56px', 'Tamanho de cada quadrado']],
      a11y: ['É só fundo: o conteúdo fica por cima, com o contraste do tema.', 'Com movimento reduzido a grade fica parada.'] },

    { id: 'sphere', grupo: 'Movimento', nome: 'Nuvem em esfera 3D', novo: '2026-10-29',
      desc: 'Itens espalhados numa esfera que gira sozinha; arrastar com o mouse ou o dedo empurra a rotação, que volta ao ritmo normal aos poucos. Os de trás ficam menores e mais apagados. Bom para integrações, tecnologias ou habilidades.',
      ref: { nome: 'Magic UI · Icon Cloud', url: 'https://magicui.design/docs/components/icon-cloud' },
      html: `<ul data-ac="sphere" aria-label="Integrações" style="--size:360px">
  ${['Pix', 'Boleto', 'Cartão', 'Nota fiscal', 'Open Finance', 'WhatsApp', 'E-mail', 'Planilhas', 'ERP', 'API', 'Webhooks', 'Contador', 'Banco do Brasil', 'Itaú', 'Nubank', 'Inter', 'Santander', 'Bradesco', 'Caixa', 'Stone', 'Cielo', 'PagSeguro', 'Mercado Pago', 'Shopify'].map(t => `<li>${t}</li>`).join('')}
</ul>`,
      api: [['data-ac="sphere"', 'ul', '—', 'Cada <li> vai para um ponto da esfera'], ['--size', 'CSS', '320px', 'Diâmetro (encolhe até caber)']],
      a11y: ['Continua uma lista para o leitor de tela, na ordem do HTML.', 'Parada com movimento reduzido e fora da tela (economiza bateria).', 'Não use para nada que a pessoa precise clicar: os itens se movem.'] },

    { id: 'ring3d', grupo: 'Movimento', nome: 'Anel 3D', novo: '2026-10-29',
      desc: 'Imagens em volta de um cilindro que gira devagar. Arraste para girar (ao soltar, encaixa na mais próxima), use as setas ou ← → no palco. Para no foco e não gira sozinho com movimento reduzido.',
      ref: { nome: 'MDN · transform-style: preserve-3d', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style' },
      wide: true,
      html: `<div data-ac="ring3d" aria-label="Destinos" style="width:100%">
  ${['montanha-neblina', 'atitlan', 'casa-lago', 'canyon-estrelas', 'arvore-lago', 'baloes', 'floresta-luz', 'yosemite', 'montanhas-neve'].map(n => `<figure><img src="${F}${n}-v.jpg" alt="${ALT[n]}" loading="lazy"></figure>`).join('\n  ')}
</div>`,
      api: [['data-ac="ring3d"', 'div', '—', 'Cada filho com <img> vira uma face do anel (mínimo 3)'], ['--w', 'CSS', '200px', 'Largura de cada imagem (140px no celular)'], ['data-static', 'atributo', '—', 'Não gira sozinho']],
      a11y: ['Só a imagem da frente é lida; “3 de 9” é anunciado ao trocar.', 'O palco recebe foco e gira com ← →; o giro automático para com o foco dentro.'] },

    { id: 'flip-words', grupo: 'Movimento', nome: 'Palavras que viram em 3D', novo: '2026-10-29',
      desc: 'A palavra em destaque troca de tempos em tempos e cada letra entra girando no eixo X, uma depois da outra. O leitor de tela ouve a frase com todas as palavras uma vez, sem ser interrompido a cada troca.',
      ref: { nome: 'Magic UI · Text 3D Flip', url: 'https://magicui.design/docs/components/text-3d-flip' },
      html: `<h2 style="margin:0;font:700 clamp(28px,4.4vw,48px)/1.15 var(--ac-font);letter-spacing:-.03em;text-align:center">Uma empresa que <span data-ac="flip-words" data-words="vende mais,organiza tudo,fecha o mês,cresce junto"></span></h2>`,
      api: [['data-ac="flip-words"', 'span', '—', 'Troca as palavras com letras girando'], ['data-words', 'lista', '—', 'Palavras separadas por vírgula'], ['data-interval', 'ms', '2600', 'Tempo de cada palavra'], ['--accent', 'CSS', 'destaque', 'Cor das palavras']],
      a11y: ['As palavras ficam num .ac-sr (lidas uma vez); a animação é aria-hidden.', 'Com movimento reduzido mostra só a primeira, parada.'] },

    { id: 'reveal', grupo: 'Movimento', nome: 'Revelar ao rolar', novo: '2026-10-28',
      desc: 'Os blocos aparecem conforme entram na tela, com a animação presa à rolagem (animation-timeline: view(), sem JS no Chrome e no Safari). No Firefox, o IntersectionObserver faz o mesmo. Junto, a barra de leitura que cresce com a rolagem. Role a caixa abaixo.',
      ref: { nome: 'Chrome · Scroll-driven animations', url: 'https://developer.chrome.com/docs/css-ui/scroll-driven-animations' },
      wide: true,
      html: `<div style="width:min(720px,100%);margin:0 auto;height:440px;overflow-x:hidden;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--ac-border-strong) transparent;border:1px solid var(--ac-border);border-radius:var(--ac-r-lg);background:var(--ac-surface)" tabindex="0" aria-label="Exemplo de página que rola">
  <div data-ac="scroll-progress"></div>
  <div style="display:grid;gap:18px;padding:28px">
    <h3 style="margin:0;font:700 var(--ac-fs-2xl) var(--ac-font);letter-spacing:-.02em">Como funciona o fechamento do mês</h3>
    <p class="ac-card__desc" style="margin:0">Role para ver os blocos entrarem. Cada um usa um tipo de entrada.</p>
    <div data-ac="reveal" data-reveal-children style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
      ${tile('1', 'Importar extratos', 'Os bancos conectados enviam as movimentações às 6h.')}
      ${tile('2', 'Conciliar', 'Cada lançamento encontra a nota ou o boleto certo.')}
      ${tile('3', 'Revisar', 'Só as diferenças chegam para você aprovar.')}
    </div>
    <img data-ac="reveal" data-reveal="scale" src="${F}lago-montanha.jpg" alt="Lago calmo diante de uma montanha com neve" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:var(--ac-r-lg)">
    <div data-ac="reveal" data-reveal="left" class="ac-alert ac-alert--info" role="note"><div><b>Dica</b><p style="margin:2px 0 0">Feche o mês até o dia 5 para os relatórios saírem completos.</p></div></div>
    <div data-ac="reveal" data-reveal="right">${tile('4', 'Fechar', 'Gera DRE, fluxo de caixa e o resumo para o contador.')}</div>
    <img data-ac="reveal" src="${F}campo-por-do-sol.jpg" alt="Campo de grama verde com árvores ao pôr do sol" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:var(--ac-r-lg)">
    <p class="ac-card__desc" style="margin:0 0 120px">Fim. A barra no topo mostra quanto falta.</p>
  </div>
</div>`,
      api: [['data-ac="reveal"', 'elemento', '—', 'Entra ao aparecer na rolagem'], ['data-reveal-children', 'contêiner', '—', 'Revela cada filho, um depois do outro'], ['data-reveal', 'texto', 'up', 'up, scale, left ou right'], ['data-ac="scroll-progress"', 'div', '—', 'Barra de leitura presa no topo do contêiner que rola'], ['.ac-reveal', 'classe', '—', 'O mesmo efeito só com CSS (onde há animation-timeline)'], ['overflow-x: hidden', 'contêiner', '—', 'Com left/right, evita a rolagem lateral enquanto o bloco entra']],
      a11y: ['Nada depende do efeito: com movimento reduzido tudo aparece direto.', 'A barra de leitura é aria-hidden (é só indicação visual).', 'Prefira entradas curtas (até ~30 px): deslocamento grande cansa e distrai.'] },

    { id: 'aurora', grupo: 'Movimento', nome: 'Fundo com gradiente animado', novo: '2026-10-28',
      desc: 'Fundo de cores que giram devagar atrás do conteúdo, como nos sites de produto. Só CSS: um conic-gradient desfocado que gira com @property; as cores são variáveis. Com movimento reduzido, fica parado.',
      ref: { nome: 'MDN · @property', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@property' },
      wide: true,
      html: `<section class="ac-aurora" style="display:grid;place-items:center;gap:18px;min-height:420px;padding:48px 24px;border-radius:var(--ac-r-lg);text-align:center">
  <span class="ac-badge" style="background:rgb(255 255 255/.12);color:#fff;border-color:rgb(255 255 255/.2)">Novo · Relatórios automáticos</span>
  <h2 style="margin:0;max-width:16ch;font:700 clamp(32px,5vw,54px)/1.05 var(--ac-font);letter-spacing:-.04em">O mês fecha sozinho. Você só aprova.</h2>
  <p style="margin:0;max-width:46ch;font-size:var(--ac-fs-lg);line-height:1.55;color:rgb(255 255 255/.8)">Extratos, notas e boletos conciliados toda manhã, com o resumo pronto para o contador.</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center"><a class="ac-btn ac-btn--lg" href="#/aurora" style="background:#fff;color:#0b0b14">Começar grátis</a><a class="ac-btn ac-btn--lg ac-btn--ghost" href="#/aurora" style="color:#fff">Ver como funciona</a></div>
</section>`,
      api: [['.ac-aurora', 'classe', '—', 'Fundo animado atrás do conteúdo (texto branco)'], ['--c1 / --c2 / --c3', 'CSS', 'azul / verde-água / rosa', 'Cores do gradiente'], ['@property --ac-aurora-a', 'CSS', '—', 'Ângulo animado; sem suporte, o fundo fica parado']],
      a11y: ['Movimento lento (18 s por volta) e parado com movimento reduzido.', 'A sombra embaixo mantém o contraste do texto branco; confira com as suas cores.'] }
  ];

  const D = window.DEMOS;
  NOVOS.forEach(n => { let at = -1; D.forEach((d, i) => { if (d.grupo === n.grupo) at = i; }); D.splice(at + 1, 0, n); });
})();
