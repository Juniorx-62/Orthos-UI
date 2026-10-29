/* Componentes de imagem (28/10/2026): galeria com lightbox, carrossel com miniaturas e coverflow 3D.
   Fotos reais da Unsplash (Licença da Unsplash: uso livre, inclusive comercial); créditos em assets/fotos/CREDITOS.md. */
(function () {
  // o site fica na raiz; a suíte de testes (tests/) e o arquivo único (dist/) estão uma pasta abaixo
  const F = (/\/(tests|dist)\//.test(location.pathname) ? '../' : '') + 'assets/fotos/';
  const FOTOS = {
    'yosemite': ['Rio no Vale de Yosemite', 'Rio que atravessa o Vale de Yosemite entre penhascos de granito e pinheiros', 'Bailey Zindel'],
    'lago-barcos': ['Barcos no lago', 'Três barcos de madeira na água azul de um lago entre montanhas', 'Pietro De Grandi'],
    'montanha-neblina': ['Montanha com neblina', 'Cume de montanha coberto de neblina ao amanhecer', 'v2osk'],
    'floresta-aerea': ['Floresta vista do alto', 'Copas de uma floresta escura vistas de cima', 'pine watt'],
    'colinas-verdes': ['Colinas verdes', 'Colinas verdes com floresta sob céu nublado', 'Claudio Testa'],
    'atitlan': ['Lago Atitlán', 'Caminho de pedra entre flores roxas até um píer no Lago Atitlán', 'Mark Harpur'],
    'montanhas-neve': ['Montanhas com neve', 'Montanhas cobertas de neve sobre um vale com floresta', 'Kalen Emsley'],
    'campo-por-do-sol': ['Campo ao pôr do sol', 'Campo de grama verde com árvores ao pôr do sol', 'Robert Lukeman'],
    'floresta-luz': ['Luz na floresta', 'Raio de sol atravessando uma floresta de outono', 'Johannes Plenio'],
    'casa-lago': ['Casa à beira do lago', 'Casa de madeira à beira de um lago com montanhas ao fundo', 'Luca Bravo'],
    'lago-montanha': ['Lago e montanha', 'Lago calmo diante de uma montanha com neve', 'Tobias Keller'],
    'montanha-raios': ['Raios de sol na montanha', 'Raios de sol sobre uma encosta com pinheiros e neblina', 'Urban Vintage'],
    'arvore-lago': ['Árvore no lago', 'Árvore solitária dentro de um lago, com montanhas ao fundo', 'Ken Cheung'],
    'canyon-estrelas': ['Cânion sob as estrelas', 'Formações de rocha de um cânion sob o céu estrelado', 'John Fowler'],
    'baloes': ['Balões na Capadócia', 'Balões de ar quente sobre as rochas da Capadócia', 'Daniela Cuevas']
  };
  const T = n => FOTOS[n][0], alt = n => FOTOS[n][1], cap = n => `${FOTOS[n][0]}. Foto: ${FOTOS[n][2]} / Unsplash`;
  const big = n => F + n + '.jpg', thumb = n => F + n + '-p.jpg', tall = n => F + n + '-v.jpg';
  const item = (n, src = thumb(n)) => `<a href="${big(n)}" data-caption="${cap(n)}"><img src="${src}" alt="${alt(n)}" loading="lazy"><span class="ac-gallery__cap">${T(n)}</span></a>`;
  const masonry = ['casa-lago', 'lago-montanha', 'montanha-raios', 'arvore-lago', 'canyon-estrelas', 'baloes', 'yosemite', 'atitlan', 'montanhas-neve', 'floresta-luz']
    .map((n, i) => item(n, [0, 2, 4, 6, 8].includes(i) ? tall(n) : thumb(n))).join('\n    ');

  const NOVOS = [
    { id: 'gallery', grupo: 'Dados', nome: 'Galeria e lightbox', novo: '2026-10-28',
      desc: 'Grade de imagens que abre um visualizador em tela cheia: setas, miniaturas, arrastar no celular, Home/End e Esc, com a legenda embaixo e a vizinha já carregada. Três arranjos: grade, destaque (a primeira ocupa 2×2) e mosaico (alturas livres).',
      ref: { nome: 'Ant Design · Image (preview) e Masonry', url: 'https://ant.design/components/image' },
      wide: true,
      html: `<div style="display:grid;gap:22px;width:min(1080px,100%);margin:0 auto">
  <p class="ac-label" style="margin:0">Grade com destaque</p>
  <div class="ac-gallery ac-gallery--featured" data-ac="gallery" style="--min:220px">
    ${['yosemite', 'lago-barcos', 'montanha-neblina', 'floresta-aerea', 'colinas-verdes', 'atitlan', 'montanhas-neve', 'campo-por-do-sol', 'floresta-luz'].map((n, i) => item(n, i ? thumb(n) : big(n))).join('\n    ')}
  </div>
  <p class="ac-label" style="margin:0">Mosaico</p>
  <div class="ac-gallery ac-gallery--masonry" data-ac="gallery" style="--min:180px">
    ${masonry}
  </div>
</div>`,
      api: [['data-ac="gallery"', 'div', '—', 'Cada filho com <img> abre o lightbox na posição dele'], ['<a href>', 'item', '—', 'Imagem grande (sem JS, o link abre a imagem); ou data-full'], ['data-caption', 'item', '—', 'Legenda no lightbox (ou <figcaption>)'], ['.ac-gallery__cap', 'span', '—', 'Legenda sobre a miniatura (aparece no hover e no foco; sempre em telas de toque)'], ['.ac-gallery--featured', 'classe', '—', 'A primeira imagem ocupa 2×2'], ['.ac-gallery--masonry', 'classe', '—', 'Mosaico em colunas, alturas livres'], ['--min / --gap / --ratio', 'CSS', '160px / 8px / 4/3', 'Largura mínima da coluna, espaço e proporção da miniatura'], ['Orthos.lightbox(itens, início)', 'função', '—', 'Abre o visualizador com [{ src, alt, caption, thumb }]; devolve { show, close }']],
      a11y: ['Cada miniatura é um link ou botão com o alt da imagem; o lightbox é um <dialog> modal com rótulo.', '“3 de 10” é anunciado a cada troca; as miniaturas dizem “Imagem 3 de 10: …”.', 'Esc fecha e o foco volta à miniatura que abriu; ← → Home End trocam de imagem.', 'No mosaico a ordem de leitura desce coluna a coluna: use a grade quando a ordem importa.'] },

    { id: 'carousel-images', grupo: 'Dados', nome: 'Carrossel de imagens', novo: '2026-10-28',
      desc: 'O carrossel acessível com fotos: legenda sobre a imagem, miniaturas no lugar das bolinhas (data-thumbs) e clique para ampliar no lightbox (data-lightbox). Arrastar, setas e Home/End continuam valendo.',
      ref: { nome: 'W3C APG · Carousel', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/' },
      wide: true,
      html: `<section class="ac-carousel" data-ac="carousel" data-thumbs data-lightbox aria-label="Paisagens" style="width:min(760px,100%);margin:0 auto">
  <div class="ac-carousel__track">
    ${['casa-lago', 'lago-montanha', 'montanha-raios', 'arvore-lago', 'canyon-estrelas', 'baloes'].map(n => `<figure class="ac-carousel__media"><img src="${big(n)}" alt="${alt(n)}" data-caption="${cap(n)}" loading="lazy"><figcaption>${T(n)}</figcaption></figure>`).join('\n    ')}
  </div>
</section>`,
      api: [['data-thumbs', 'section', '—', 'Miniaturas das fotos no lugar das bolinhas'], ['data-lightbox', 'section', '—', 'Clicar na foto amplia no lightbox'], ['.ac-carousel__media', 'figure', '—', 'Slide de foto com <figcaption> sobre a imagem'], ['--ratio', 'CSS', '16 / 9', 'Proporção das fotos'], ['data-autoplay', 'ms', '—', 'Como no carrossel: troca sozinho, com pausa']],
      a11y: ['As miniaturas são botões “Imagem 2 de 6: …” com aria-current na atual.', 'Herda do carrossel: região com “carrossel”, slides “2 de 6” e os de fora da vista inert.'] },

    { id: 'hero', grupo: 'Dados', nome: 'Banner com fotos', novo: '2026-10-28',
      desc: 'Banner de abertura (login, página inicial, campanha): a foto ocupa tudo e troca sozinha com fade e um zoom lento; título com uma palavra em destaque, etiqueta com subtítulo e barrinhas de progresso no estilo stories, que também levam ao slide. Pausa no botão, no hover e no foco.',
      ref: { nome: '', url: '' },
      wide: true,
      html: `<section class="ac-hero" data-ac="hero" data-interval="6000" aria-label="Destaques" style="--h:min(620px,78vh)">
  <a class="ac-hero__brand" href="#/"><svg width="28" height="28" aria-hidden="true"><use href="#orthos-mark"/></svg>Orthos</a>
  ${[['casa-lago', 'Sua equipe organiza enquanto você', 'descansa.', 'Rotina', 'Tarefas, prazos e lembretes no lugar certo.'],
     ['baloes', 'Cada projeto decola no', 'tempo certo.', 'Planejamento', 'Cronogramas que se ajustam quando algo muda.'],
     ['canyon-estrelas', 'Os números trabalham', 'de madrugada.', 'Relatórios', 'Tudo pronto no seu e-mail às 7h.'],
     ['montanha-raios', 'Do rascunho à entrega em', 'um só lugar.', 'Colaboração', 'Comentários, aprovações e versões juntos.']]
    .map(([n, a, b, tag, sub]) => `<article class="ac-hero__slide"><img src="${big(n)}" alt=""><div class="ac-hero__text"><h2 class="ac-hero__title">${a} <em>${b}</em></h2><p class="ac-hero__sub"><span class="ac-hero__tag">${tag}</span>${sub}</p></div></article>`).join('\n  ')}
</section>`,
      api: [['data-ac="hero"', 'section', '—', 'Cada .ac-hero__slide (foto + .ac-hero__text) vira um destaque'], ['data-interval', 'ms', '6000', 'Tempo de cada destaque'], ['data-start', 'número', '0', 'Destaque inicial'], ['.ac-hero__title em', 'HTML', '—', 'Palavra em destaque na cor --accent'], ['.ac-hero__tag', 'span', '—', 'Etiqueta antes do subtítulo'], ['.ac-hero__brand', 'a', '—', 'Logo no canto de cima'], ['--accent / --h', 'CSS', '#2dd4bf / 560px', 'Cor de destaque e altura'], ['ac:change', 'evento', '—', 'detail: { index, total }'], ['el._hero', 'objeto', '—', 'go(i), pause(), play()']],
      a11y: ['Região “carrossel” com slides “2 de 4”; os de fora ficam inert e aria-hidden.', 'Botão de pausa sempre visível; também pausa no hover e com o foco dentro (WCAG 2.2.2).', 'Com movimento reduzido começa pausado, sem zoom nem fade.', 'Foto decorativa (alt vazio): a mensagem está no título; sombra no rodapé garante contraste do texto branco.'] },

    { id: 'coverflow', grupo: 'Dados', nome: 'Coverflow 3D', novo: '2026-10-28',
      desc: 'A imagem do meio de frente e as vizinhas giradas em 3D para os lados, com reflexo. Troca pelas setas, clicando na vizinha, arrastando ou com ← → no palco. Com data-lightbox, a imagem da frente amplia. Só CSS 3D (perspective e rotateY), sem biblioteca.',
      ref: { nome: 'MDN · perspective e transformações 3D', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/perspective' },
      wide: true,
      html: `<div class="ac-coverflow" data-ac="coverflow" data-lightbox aria-label="Destinos" style="width:100%">
  ${['montanha-neblina', 'atitlan', 'casa-lago', 'canyon-estrelas', 'arvore-lago', 'baloes', 'floresta-luz'].map(n => `<figure><img src="${tall(n)}" alt="${alt(n)}" data-full="${big(n)}" data-caption="${cap(n)}"><figcaption>${T(n)}</figcaption></figure>`).join('\n  ')}
</div>`,
      api: [['data-ac="coverflow"', 'div', '—', 'Cada filho com <img> vira um item'], ['data-start', 'número', 'meio', 'Índice da imagem que começa na frente'], ['data-lightbox', 'div', '—', 'Clicar (ou Enter) na imagem da frente amplia'], ['--w / --ratio', 'CSS', '230px / 3 / 4', 'Largura e proporção dos itens (160px no celular)'], ['ac:change', 'evento', '—', 'detail: { index, total }']],
      a11y: ['O palco recebe foco e troca com ← → Home End; “3 de 7” é anunciado.', 'Só a imagem da frente fica visível para o leitor de tela; as giradas são aria-hidden.', 'Com movimento reduzido, a troca é instantânea (sem giro animado).'] }
  ];

  const D = window.DEMOS;
  NOVOS.forEach(n => { let at = -1; D.forEach((d, i) => { if (d.grupo === n.grupo) at = i; }); D.splice(at + 1, 0, n); });
})();
