/* Componentes adicionados após a pesquisa de 27/10/2026 (docs/pesquisa-referencias.md).
   Cada um entra logo depois do último item do seu grupo, para a navegação e o "Anterior/Próximo" seguirem a ordem. */
(function () {
  const I = n => window.Orthos.icon(n);
  const ico = p => `<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const P = {
    bold: '<path d="M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12"/>',
    italic: '<path d="M12 4H19"/><path d="M8 20L16 4"/><path d="M5 20H12"/>',
    under: '<path d="M5.5 3V11.5C5.5 15.0899 8.41015 18 12 18C15.5899 18 18.5 15.0899 18.5 11.5V3"/><path d="M3 21H21"/>',
    left: '<path d="M3 3H21"/><path d="M3 9H11"/><path d="M3 15H21"/><path d="M3 21H11"/>', center: '<path d="M3 3H21"/><path d="M8 9H16"/><path d="M3 15H21"/><path d="M8 21H16"/>', right: '<path d="M3 3H21"/><path d="M13 9H21"/><path d="M3 15H21"/><path d="M13 21H21"/>',
    link: '<path d="M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886"/><path d="M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309"/>',
    star: '<path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"/>',
    filter: '<path d="M3 7H6"/><path d="M3 17H9"/><path d="M18 17L21 17"/><path d="M15 7L21 7"/><path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"/><path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"/>',
    copy: '<path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"/><path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"/>',
    edit: '<path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"/><path d="M13 4L20 11"/><path d="M14 22L22 22"/>', calendar: '<path d="M16 2V6M8 2V6"/><path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"/><path d="M3 10H21"/><path d="M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z"/>',
    chev: '<path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"/>'
  };
  const attr = o => JSON.stringify(o).replace(/&/g, '&amp;').replace(/'/g, '&#39;');
  const team = [
    { id: 1, name: 'Ana Ribeiro', detail: 'ana@estudio.co' }, { id: 2, name: 'Bruno Costa', detail: 'bruno@estudio.co' },
    { id: 3, name: 'Carla Mendes', detail: 'carla@estudio.co' }, { id: 4, name: 'Diego Alves', detail: 'diego@estudio.co' },
    { id: 5, name: 'Elisa Prado', detail: 'elisa@estudio.co' }, { id: 6, name: 'Fábio Nunes', detail: 'fabio@estudio.co' },
    { id: 7, name: 'Gabriela Luz', detail: 'gabi@estudio.co' }
  ];

  const NOVOS = [
    /* ---------- Fundamentos ---------- */
    { id: 'toggle', grupo: 'Fundamentos', nome: 'Alternador e barra de ferramentas', aka: 'Toggle, Toolbar, Toggle group', novo: '2026-10-27',
      desc: 'Botões liga/desliga, barra de ferramentas com um só ponto de Tab, grupo de botões unidos e separador.',
      ref: { nome: 'Radix · Toolbar', url: 'https://www.radix-ui.com/primitives/docs/components/toolbar' },
      html: `<div class="ac-toolbar" data-ac="toolbar" aria-label="Formatação">
  <button class="ac-toggle" type="button" data-ac="toggle" aria-label="Negrito" data-tip="Negrito (Ctrl B)">${ico(P.bold)}</button>
  <button class="ac-toggle" type="button" data-ac="toggle" aria-label="Itálico" data-tip="Itálico (Ctrl I)">${ico(P.italic)}</button>
  <button class="ac-toggle" type="button" data-ac="toggle" aria-label="Sublinhado" data-tip="Sublinhado (Ctrl U)">${ico(P.under)}</button>
  <hr class="ac-sep ac-sep--v" aria-orientation="vertical">
  <div class="ac-toggle-group" data-ac="toggle-group" aria-label="Alinhamento">
    <button class="ac-toggle" type="button" aria-checked="true" aria-label="Alinhar à esquerda" value="esquerda">${ico(P.left)}</button>
    <button class="ac-toggle" type="button" aria-label="Centralizar" value="centro">${ico(P.center)}</button>
    <button class="ac-toggle" type="button" aria-label="Alinhar à direita" value="direita">${ico(P.right)}</button>
  </div>
  <hr class="ac-sep ac-sep--v" aria-orientation="vertical">
  <button class="ac-toggle" type="button" aria-label="Inserir link">${ico(P.link)}</button>
</div>
<div class="ac-btn-group">
  <div class="ac-btn-joined" role="group" aria-label="Arquivo"><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button">Anterior</button><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button">Hoje</button><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button">Próximo</button></div>
  <button class="ac-toggle ac-toggle--outline" type="button" data-ac="toggle">${ico(P.star)}Favoritar</button>
</div>`,
      api: [['data-ac="toggle"', 'button', '—', 'Alterna aria-pressed; evento ac:change (true/false)'], ['data-ac="toggle-group"', 'container de .ac-toggle', '1º marcado', 'Escolha única (alinhamento, visualização): marcar um desmarca os outros; aria-checked; evento ac:change com o value'], ['data-ac="toolbar"', 'container', '—', 'role=toolbar e setas entre controles'], ['.ac-btn-joined', 'grupo', '—', 'Botões colados com raio só nas pontas'], ['.ac-sep / .ac-sep--v', '<hr>', 'horizontal', 'Separador']],
      a11y: ['A toolbar tem um só ponto de Tab; ← → Home End andam entre os itens.', 'Toggle anuncia o estado por aria-pressed.', 'Botões só com ícone têm aria-label e dica.'] },

    /* ---------- Formulários ---------- */
    { id: 'select', grupo: 'Formulários', nome: 'Lista de opções', aka: 'Select', novo: '2026-10-27',
      desc: 'Lista de opções desenhada sobre um <select> nativo: o formulário continua recebendo o valor, com grupos, opção desabilitada e busca por digitação.',
      ref: { nome: 'Radix · Select', url: 'https://www.radix-ui.com/primitives/docs/components/select' },
      html: `<div style="display:grid;gap:16px;width:min(300px,100%)">
  <div class="ac-field"><label class="ac-label" for="sel-fuso">Fuso horário</label>
    <select class="ac-select" id="sel-fuso" data-ac="select" data-placeholder="Escolha um fuso">
      <option value="">Escolha um fuso</option>
      <optgroup label="Brasil"><option value="sp">Brasília (GMT−3)</option><option value="am">Manaus (GMT−4)</option><option value="ac">Rio Branco (GMT−5)</option><option value="fn">Fernando de Noronha (GMT−2)</option></optgroup>
      <optgroup label="Europa"><option value="lis">Lisboa (GMT+0)</option><option value="mad">Madri (GMT+1)</option><option value="ber" disabled>Berlim (indisponível)</option></optgroup>
    </select><p class="ac-hint">Usado nos horários de publicação.</p></div>
</div>`,
      api: [['data-ac="select"', '<select>', '—', 'Melhora o select nativo; o valor segue no formulário'], ['data-placeholder', 'texto', 'Selecione', 'Texto quando vazio'], ['<optgroup> / disabled', 'HTML', '—', 'Grupos e opções indisponíveis'], ['change', 'evento', '—', 'Disparado no <select> original']],
      a11y: ['Padrão ARIA select-only combobox: ↑ ↓ Home End, Enter escolhe, Esc fecha.', 'Digitar letras pula para a opção.', 'O rótulo do <label> passa para o botão.'] },

    { id: 'number', grupo: 'Formulários', nome: 'Campo numérico', aka: 'Number field', novo: '2026-10-27',
      desc: 'Campo numérico com − e +, segurar para repetir, setas, Page Up/Down e formato brasileiro.',
      ref: { nome: 'Base UI · Number Field', url: 'https://base-ui.com/react/components/number-field' },
      html: `<div style="display:grid;gap:18px">
  <div class="ac-field"><span class="ac-label" id="nf-l">Assentos</span><div class="ac-number-field" data-ac="number-field" data-min="1" data-max="50"><input aria-labelledby="nf-l" value="5"></div></div>
  <div class="ac-field"><span class="ac-label" id="nf-p">Preço por assento</span><div class="ac-number-field" data-ac="number-field" data-min="0" data-step="0.5" data-decimals="2" data-suffix="R$"><input aria-labelledby="nf-p" value="49,90"></div></div>
</div>`,
      api: [['data-min / data-max', 'número', '—', 'Limites'], ['data-step', 'número', '1', 'Passo (Page Up/Down = 10 passos)'], ['data-decimals', 'número', '0', 'Casas decimais'], ['data-suffix', 'texto', '—', 'Unidade exibida'], ['ac:change', 'evento', '—', 'detail: número']],
      a11y: ['role="spinbutton" com aria-valuenow/min/max.', '↑ ↓ Page Up/Down Home End.', 'Os botões ficam fora da ordem de Tab (o teclado usa as setas).'] },

    { id: 'people', grupo: 'Formulários', nome: 'Seletor de pessoas e tags', novo: '2026-10-27',
      desc: 'Seleção múltipla com busca e rosto e campo de tags livres.',
      ref: { nome: 'Kobra · Multi Select', url: 'https://kobra.systems/components/multi-select' },
      html: `<div style="display:grid;gap:18px;width:min(420px,100%)">
  <div class="ac-field"><span class="ac-label" id="pp-l">Responsáveis</span><div data-ac="people" data-label="Adicionar responsável" data-value="[1,3]" data-options='${attr(team)}'></div></div>
  <div class="ac-field"><span class="ac-label">Tags do projeto</span><div data-ac="tags" data-value="site,2026" data-max="6" data-label="Nova tag"></div><p class="ac-hint">Enter ou vírgula para adicionar. Backspace apaga a última.</p></div>
</div>`,
      api: [['data-ac="people"', 'div', '—', 'data-options: [{ id, name, detail }], data-value: ids'], ['data-ac="tags"', 'div', '—', 'data-value separado por vírgula, data-max'], ['ac:change', 'evento', '—', 'detail: lista atual']],
      a11y: ['Lista com aria-multiselectable; Enter marca e desmarca.', 'Cada etiqueta tem botão “Remover nome”.', 'Mudanças das tags são anunciadas.'] },

    { id: 'daterange', grupo: 'Formulários', nome: 'Intervalo de datas', aka: 'Date range', novo: '2026-10-27',
      desc: 'Atalhos por nome e dois meses lado a lado (um no celular), com prévia do intervalo ao passar o mouse.',
      ref: { nome: 'Ant Design · RangePicker', url: 'https://ant.design/components/date-picker' },
      html: `<div class="ac-field"><span class="ac-label" id="dr-l">Período do relatório</span><button class="ac-btn ac-btn--secondary ac-btn--square ac-date-trigger" type="button" data-ac="daterange" data-empty aria-labelledby="dr-l" style="width:260px">${ico(P.calendar)}<span>Escolha o período</span></button></div>`,
      api: [['data-ac="daterange"', 'button', '—', 'Abre atalhos e calendário duplo'], ['ac:change', 'evento', '—', 'detail: { de: Date, ate: Date }']],
      a11y: ['Setas andam pelos dias; a instrução (“escolha a data de fim”) é anunciada.', 'Esc fecha e devolve o foco.'] },

    { id: 'dirty', grupo: 'Formulários', nome: 'Alterações não salvas', novo: '2026-10-27',
      desc: 'Quando algo muda no formulário, a barra de salvar aparece; se a pessoa voltar ao valor original, ela some. Ao tentar sair da página com alterações, o navegador pergunta antes.',
      ref: { nome: '', url: '' },
      html: `<form class="ac-card" data-ac="dirty" id="dirty-demo" style="width:min(460px,100%)" data-warn="false">
  <div class="ac-card__head"><h3 class="ac-card__title">Perfil da loja</h3><p class="ac-card__desc">Mude qualquer campo para ver a barra.</p></div>
  <div class="ac-card__body" style="display:grid;gap:14px">
    <div class="ac-field"><label class="ac-label" for="dd-nome">Nome da loja</label><input class="ac-input" id="dd-nome" name="nome" value="Estúdio Norte"></div>
    <div class="ac-field"><label class="ac-label" for="dd-mail">E-mail de suporte</label><input class="ac-input" id="dd-mail" name="email" type="email" value="ajuda@estudionorte.com"></div>
    <label class="ac-switch"><input type="checkbox" role="switch" name="vitrine" checked><span>Mostrar na vitrine</span></label>
    <div class="ac-savebar" data-dirty-show aria-hidden="true"><p class="ac-savebar__hint"><span class="ac-savebar__dot" aria-hidden="true"></span>Você tem alterações não salvas.</p><div class="ac-savebar__actions"><button class="ac-btn ac-btn--ghost ac-btn--sm" type="reset">Descartar</button><button class="ac-btn ac-btn--sm" type="submit">Salvar</button></div></div>
  </div>
</form>`,
      api: [['data-ac="dirty"', '<form>', '—', 'Compara os campos com o retrato inicial'], ['[data-dirty-show]', 'elemento', '—', 'Aparece com alterações (dentro do form ou com data-dirty-for="id")'], ['.ac-savebar', 'componente', '—', 'Barra fixa com aviso e ações'], ['data-warn="false"', 'atributo', 'avisa', 'Desliga o aviso ao sair da página'], ['Orthos.dirty.baseline(form)', 'função', '—', 'Novo retrato depois de salvar'], ['ac:dirty', 'evento', '—', 'detail: true/false']],
      a11y: ['O aviso da barra é anunciado quando aparece.', 'Descartar é um reset de verdade: volta ao estado inicial e a barra some.', 'Campos sem name não contam.'] },

    { id: 'money', grupo: 'Formulários', nome: 'Campo de dinheiro', novo: '2026-10-27',
      desc: 'Valor em reais digitado como no caixa eletrônico: os centavos entram pela direita e os números rolam como num contador. Valida mínimo, máximo e taxa.',
      ref: { nome: '', url: '' },
      html: `<form id="money-form" style="display:grid;gap:14px;justify-items:center;width:min(380px,100%)" onsubmit="return false">
  <div data-ac="money" data-label="Quanto você quer sacar?" data-name="valor" data-min="10" data-max="1250.40" data-fee="3.67"></div>
  <button class="ac-btn" type="submit" style="width:100%">Solicitar saque</button>
</form>`,
      api: [['data-ac="money"', 'div', '—', 'Monta o campo'], ['data-label', 'texto', 'Valor', 'Rótulo'], ['data-min / data-max / data-fee', 'reais', '—', 'Regras e taxa mostradas na dica'], ['data-name', 'texto', '—', 'Campo oculto com o valor (ex.: 1250.40)'], ['data-value', 'reais', '—', 'Valor inicial'], ['el._money.set(v) / get()', 'função', '—', 'Lê e muda o valor'], ['ac:change', 'evento', '—', 'detail: { cents, valid }'], ['data-lock-submit="false"', 'atributo', 'trava', 'Por padrão, o botão de enviar fica desligado enquanto o valor é inválido']],
      a11y: ['Por baixo é um input de texto real (inputmode numérico) com rótulo; o desenho é aria-hidden.', 'A dica com limites e erros é anunciada (aria-live).', 'Movimento reduzido: os números trocam sem rolar.'] },

    { id: 'phone', grupo: 'Formulários', nome: 'Telefone com país', novo: '2026-10-27',
      desc: 'País com busca, máscara do país e os valores separados (número, DDI e país) em campos ocultos. Colar “+55 11 9…” escolhe o país sozinho.',
      ref: { nome: '', url: '' },
      html: `<div style="display:grid;gap:16px;width:min(360px,100%)">
  <div class="ac-field"><label class="ac-label" for="tel-demo">WhatsApp</label><div data-ac="phone" data-id="tel-demo" data-name="whatsapp" data-country="BR"></div><p class="ac-hint" id="tel-out" aria-live="polite">Formato do país escolhido.</p></div>
</div>`,
      api: [['data-ac="phone"', 'div', '—', 'Monta o campo'], ['data-country', 'ISO', 'BR', 'País inicial'], ['data-name', 'texto', '—', 'Cria name, name_ddi e name_pais (ocultos)'], ['data-value', 'texto', '—', 'Número inicial'], ['ac:change', 'evento', '—', 'detail: { numero, ddi, pais, completo, valido }'], ['Orthos.countries', 'lista', '19 países', 'DDI, máscara e tamanhos válidos']],
      a11y: ['Botão do país com aria-label e lista com busca por teclado.', 'Número incompleto marca aria-invalid.', 'autocomplete="tel-national" para o preenchimento automático.'] },

    /* ---------- Navegação ---------- */
    { id: 'contextmenu', grupo: 'Navegação', nome: 'Menu de contexto e barra de menus', aka: 'Context menu, Menubar', novo: '2026-10-27',
      desc: 'Menu no botão direito (também por Shift+F10) e barra de menus de aplicativo com navegação por setas entre menus.',
      ref: { nome: 'Radix · Context Menu', url: 'https://www.radix-ui.com/primitives/docs/components/context-menu' },
      html: `<div class="ac-menubar" data-ac="menubar" aria-label="Editor">
  <button class="ac-menubar__trigger" type="button" data-target="#mb-arq">Arquivo</button>
  <button class="ac-menubar__trigger" type="button" data-target="#mb-edit">Editar</button>
  <button class="ac-menubar__trigger" type="button" data-target="#mb-ver">Ver</button>
</div>
<div class="ac-pop" id="mb-arq" hidden><button class="ac-menu__item" type="button">Novo<kbd class="ac-kbd">Ctrl N</kbd></button><button class="ac-menu__item" type="button">Abrir…<kbd class="ac-kbd">Ctrl O</kbd></button><div class="ac-menu__sep" role="separator"></div><button class="ac-menu__item" type="button">Exportar PDF</button></div>
<div class="ac-pop" id="mb-edit" hidden><button class="ac-menu__item" type="button">Desfazer<kbd class="ac-kbd">Ctrl Z</kbd></button><button class="ac-menu__item" type="button" disabled>Refazer<kbd class="ac-kbd">Ctrl Y</kbd></button><div class="ac-menu__sep" role="separator"></div><button class="ac-menu__item" type="button">Recortar</button><button class="ac-menu__item" type="button">Copiar</button></div>
<div class="ac-pop" id="mb-ver" hidden><button class="ac-menu__item" type="button" role="menuitemcheckbox" aria-checked="true">Régua</button><button class="ac-menu__item" type="button" role="menuitemcheckbox" aria-checked="false">Grade</button></div>
<div class="ac-context-area" data-ac="contextmenu" data-target="#ctx-demo" aria-label="Área do arquivo; abra o menu com o botão direito ou Shift+F10">Clique com o botão direito aqui<br><small>ou foque e use Shift+F10</small></div>
<div class="ac-pop" id="ctx-demo" hidden><button class="ac-menu__item" type="button">${ico(P.copy)}Copiar<kbd class="ac-kbd">Ctrl C</kbd></button><button class="ac-menu__item" type="button">${ico(P.edit)}Renomear</button><div class="ac-menu__sep" role="separator"></div><button class="ac-menu__item ac-menu__item--danger" type="button">${I('trash')}Excluir</button></div>`,
      api: [['data-ac="contextmenu"', 'área', '—', 'data-target: o .ac-pop do menu'], ['data-ac="menubar"', 'container', '—', '.ac-menubar__trigger com data-target'], ['aria-checked', 'item', '—', 'Item marcável (menuitemcheckbox)'], ['ac:select', 'evento', '—', 'detail: item escolhido']],
      a11y: ['Menubar: ← → trocam de menu, ↓ abre, Esc fecha.', 'Context menu também abre por Shift+F10 ou tecla Menu.', 'Itens: ↑ ↓ Home End e letra inicial.'] },

    { id: 'tabs-many', grupo: 'Navegação', nome: 'Abas com rolagem', aka: 'Tabs overflow', novo: '2026-10-27',
      desc: 'Quando as abas não cabem, a lista rola de lado, as bordas esmaecem e aparecem setas; a aba escolhida sempre fica à vista. Vale para todo data-ac="tabs".',
      ref: { nome: '', url: '' },
      html: `<div class="ac-tabs" data-ac="tabs" style="width:min(420px,100%)">
  <div class="ac-tabs__list" aria-label="Configurações do produto"><button class="ac-tabs__tab" type="button" aria-selected="true">Geral</button><button class="ac-tabs__tab" type="button">Preços</button><button class="ac-tabs__tab" type="button">Checkout</button><button class="ac-tabs__tab" type="button">Order bump</button><button class="ac-tabs__tab" type="button">Upsell</button><button class="ac-tabs__tab" type="button">Cupons</button><button class="ac-tabs__tab" type="button">Afiliados</button><button class="ac-tabs__tab" type="button">Integrações</button><button class="ac-tabs__tab" type="button">Certificado</button></div>
  <div class="ac-tabs__panel">Nome, descrição e categoria do produto.</div><div class="ac-tabs__panel">Planos, parcelas e moeda.</div><div class="ac-tabs__panel">Campos pedidos no checkout.</div><div class="ac-tabs__panel">Oferta extra no pagamento.</div><div class="ac-tabs__panel">Oferta depois da compra.</div><div class="ac-tabs__panel">Descontos e validade.</div><div class="ac-tabs__panel">Comissões e materiais.</div><div class="ac-tabs__panel">Webhooks e e-mail marketing.</div><div class="ac-tabs__panel">Modelo e regras de emissão.</div>
</div>`,
      api: [['automático', 'data-ac="tabs"', '—', 'Entra sozinho quando as abas não cabem'], ['[data-overflow-start] / [data-overflow-end]', 'atributos', '—', 'Indicam o lado com mais abas (para estilizar)']],
      a11y: ['As setas são só para mouse (aria-hidden); no teclado, ← → já trazem a aba à vista.', 'No toque, a lista rola com o dedo e as setas somem.'] },

    { id: 'tour', grupo: 'Navegação', nome: 'Tour de apresentação', novo: '2026-10-27',
      desc: 'Destaca um elemento por vez com um recorte de luz e um balão com título, texto, “2 de 4”, Voltar, Próximo e Pular. Alvo escondido é pulado; pode ficar salvo como já visto.',
      ref: { nome: '', url: '' },
      html: `<div style="display:grid;gap:16px;width:min(520px,100%)">
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
    <article class="ac-card" id="tour-vendas"><div class="ac-card__body"><div class="ac-stat__label">Vendas</div><div class="ac-stat__value">R$ 18.420</div></div></article>
    <article class="ac-card" id="tour-ticket"><div class="ac-card__body"><div class="ac-stat__label">Ticket médio</div><div class="ac-stat__value">R$ 129</div></div></article>
  </div>
  <div class="ac-btn-group"><button class="ac-btn ac-btn--secondary" type="button" id="tour-produto">Novo produto</button><button class="ac-btn ac-btn--ghost" type="button" id="tour-ajuda">Ajuda</button></div>
  <button class="ac-btn" type="button" id="tour-start">Começar o tour</button>
</div>`,
      api: [['Orthos.tour(passos, opções)', 'função', '—', 'passos: [{ target, title, text, position }]; sem target = balão no centro'], ['position', '"bottom" | "top" | "right" | "left"', 'bottom', 'Troca de lado sozinho se não couber'], ['opções', 'objeto', '—', '{ id, once, doneLabel, skipLabel, onStep, onClose }'], ['retorno', 'objeto', '—', '{ next, prev, go, close } ou null se já visto']],
      a11y: ['O balão é um diálogo não modal com título e texto ligados por aria-labelledby/describedby.', '← → andam entre os passos; Esc fecha e devolve o foco.', 'O foco vai para “Próximo” a cada passo.'] },

    /* ---------- Feedback ---------- */
    { id: 'popover', grupo: 'Feedback', nome: 'Balão e cartão de prévia', aka: 'Popover, Hover card', novo: '2026-10-27',
      desc: 'Balão para conteúdo interativo curto, preso a um botão; cartão de prévia, com conteúdo rico, ao passar o mouse ou focar um link.',
      ref: { nome: 'Radix · Popover e Hover Card', url: 'https://www.radix-ui.com/primitives/docs/components/popover' },
      html: `<div class="ac-btn-group">
  <button class="ac-btn ac-btn--secondary" type="button" data-ac="popover" data-target="#pop-dim">${ico(P.filter)}Dimensões</button>
  <p style="margin:0;color:var(--ac-text-2);font-size:14px">Responsável: <a class="ac-link" href="#" data-ac="hovercard" data-target="#hc-ana" onclick="return false">@ana.ribeiro</a></p>
</div>
<div id="pop-dim" hidden>
  <h3 class="ac-popover__title">Dimensões</h3><p class="ac-popover__text">Defina o tamanho da camada.</p>
  <div class="ac-field"><label class="ac-label" for="pd-w">Largura</label><input class="ac-input" id="pd-w" value="100%"></div>
  <div class="ac-field"><label class="ac-label" for="pd-h">Altura</label><input class="ac-input" id="pd-h" value="25px"></div>
  <div class="ac-dialog__actions"><button class="ac-btn ac-btn--ghost ac-btn--sm" type="button" data-ac-close>Cancelar</button><button class="ac-btn ac-btn--sm" type="button" data-ac-close>Aplicar</button></div>
</div>
<div id="hc-ana" hidden><div class="ac-hovercard__head"><span class="ac-avatar">AR</span><div><b>Ana Ribeiro</b><div class="ac-hint">Design · São Paulo</div></div></div><p>Cuida do design system e da pesquisa com clientes desde 2023.</p><div class="ac-hovercard__meta"><span><b>128</b> projetos</span><span><b>4,9</b> avaliação</span></div></div>`,
      api: [['data-ac="popover"', 'botão', '—', 'data-target, data-side, data-align'], ['data-ac-close', 'botão', '—', 'Fecha o popover'], ['data-ac="hovercard"', 'link', '—', 'data-target, data-delay (500 ms)']],
      a11y: ['Popover: role="dialog", foco vai para o 1º campo e Esc devolve o foco ao botão.', 'Hover card abre também com foco de teclado e não deve conter a única forma de fazer algo.'] },

    { id: 'result', grupo: 'Feedback', nome: 'Páginas de erro e resultado', novo: '2026-10-27',
      desc: 'Uma página só que muda pelo código: 401, 403, 404, 500, 503, sem internet, erro na tela e sucesso. No desenho das páginas de erro do 4squad: ilustração, código grande, o que houve, o que fazer e a saída certa para quem está vendo.',
      ref: { nome: 'Ant Design · Result', url: 'https://ant.design/components/result' },
      wide: true,
      html: `<div style="display:grid;gap:12px;justify-items:center;width:100%;grid-template-columns:minmax(0,1fr)">
  <div class="ac-segmented" data-ac="segmented" id="res-codes" aria-label="Código" style="white-space:nowrap"><button type="button" value="404" aria-pressed="true">404</button><button type="button" value="403">403</button><button type="button" value="401">401</button><button type="button" value="500">500</button><button type="button" value="503">503</button><button type="button" value="offline">Sem internet</button><button type="button" value="error">Erro na tela</button><button type="button" value="success">Sucesso</button></div>
  <div class="ac-segmented" data-ac="segmented" id="res-who" aria-label="Quem está vendo"><button type="button" value="guest" aria-pressed="true">Sem login</button><button type="button" value="user">Usuário</button><button type="button" value="admin">Equipe</button></div>
  <div style="width:100%;margin-top:6px;border:1px solid var(--ac-border);border-radius:var(--ac-r-lg);background:var(--ac-bg);overflow:hidden">
    <div data-ac="result" data-code="404" data-audience="guest" data-support="#suporte" id="res-demo"></div>
  </div>
</div>`,
      api: [['data-ac="result"', 'div', '—', 'Desenha a página a partir do código'], ['data-code', '"401" | "403" | "404" | "500" | "503" | "offline" | "error" | "success"', '404', 'Caso'], ['data-audience', '"guest" | "user" | "admin"', 'guest', 'Quem está vendo: muda o “voltar” (início, app ou painel)'], ['data-home / data-login / data-support', 'URL', '"/"', 'Destinos do “voltar”, do “Entrar de novo” (401) e do “Falar com o suporte” (403, só com ele)'], ['data-home-label', 'texto', 'pelo público', 'Rótulo do “voltar”'], ['data-error-id', 'texto', '—', 'Código para o suporte, com botão de copiar (500 e error mostram também o horário)'], ['data-retry-at', '"15:30" | data ISO', '—', 'Previsão de volta do 503'], ['data-title / data-text', 'texto', 'padrão do caso', 'Substitui título e texto'], ['data-level', '1…6', '2', 'Nível do título (1 numa página só de erro)'], ['conteúdo interno', 'HTML', 'ações padrão', 'Substitui as ações; data-for="admin" (ou "user admin") mostra só para esse público'], ['.ac-result--page', 'classe', '—', 'Ocupa a tela toda e centraliza'], ['ac:action', 'evento', '—', 'detail { action, code }; sem preventDefault, retry recarrega e back volta no histórico'], ['ac:online', 'evento', '—', 'A conexão voltou; sem preventDefault, a página recarrega'], ['Orthos.results', 'objeto', '—', 'Textos de cada caso e Orthos.results.labels, para traduzir ou ajustar']],
      a11y: ['Título em <h2> (ou data-level) diz o problema em linguagem simples; o código grande é decorativo e o título leva “(código 404)” para leitores de tela.', 'Erros entram como role="alert"; sucesso como role="status".', 'Sempre há uma saída; “Voltar para a página anterior” só aparece quando há histórico.', 'Copiar o código do erro avisa “Código copiado” numa região viva.'] },

    { id: 'logo-loader', grupo: 'Feedback', nome: 'Carregamento com logo', novo: '2026-10-27',
      desc: 'O logo se desenha, aparece preenchido com um brilho passando e o traço some, em ciclos de 3,2 s. Carregue o seu logo (SVG é traçado; PNG, JPG e WebP são ajustados a um quadrado padrão), recarregue a animação ou veja na tela inteira.',
      ref: { nome: '', url: '' },
      html: `<div style="display:grid;gap:18px;justify-items:center;width:100%;grid-template-columns:minmax(0,1fr)">
  <div class="ac-logo-stage"><div data-ac="logo-loader" id="ll-demo" data-label="Carregando"></div></div>
  <p class="ac-hint" id="ll-info" aria-live="polite">Logo padrão do Orthos (SVG, 4 formas)</p>
  <div class="ac-btn-group" style="justify-content:center">
    <button class="ac-btn ac-btn--secondary" type="button" id="ll-pick">${ico('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>')}Carregar imagem</button>
    <input type="file" id="ll-file" accept=".svg,image/svg+xml,image/png,image/jpeg,image/webp" hidden>
    <button class="ac-btn ac-btn--secondary" type="button" id="ll-replay">${ico('<path d="M4 12a8 8 0 1 0 2.3-5.6L4 8.7M4 4v4.7h4.7"/>')}Recarregar</button>
    <button class="ac-btn" type="button" id="ll-full">Ver na tela inteira</button>
    <button class="ac-btn ac-btn--ghost" type="button" id="ll-reset">Voltar ao padrão</button>
  </div>
  <div class="ac-segmented" data-ac="segmented" id="ll-size" aria-label="Tamanho do logo"><button type="button" value="56">56 px</button><button type="button" value="88" aria-pressed="true">88 px</button><button type="button" value="120">120 px</button></div>
  <p class="ac-error" id="ll-err" role="alert" hidden></p>
</div>`,
      api: [['data-ac="logo-loader"', 'div', 'logo do Orthos', 'Anima o <svg> de dentro, o data-src ou o logo padrão'], ['data-src', 'URL', '—', 'SVG (traçado) ou imagem (ajustada a 240 × 240)'], ['--size / --cycle', 'CSS', '88px / 3.2s', 'Tamanho e duração do ciclo'], ['Orthos.logo.load(el, arquivo | URL | texto SVG)', 'função', '—', 'Troca o logo; aceita File de um <input type=file> (até 2 MB)'], ['Orthos.logo.replay(el)', 'função', '—', 'Recomeça a animação do zero'], ['Orthos.loading({ logo, text, delay, min, duration, dismissible })', 'função', 'delay 250 · min 1000', 'Mostra na tela inteira e devolve a função que esconde'], ['ac:load', 'evento', '—', 'detail: { type: "svg" | "image", shapes }']],
      a11y: ['A animação é decorativa; o texto (“Carregando”) vai em role="status" e é lido pelo leitor de tela.', 'Com movimento reduzido, mostra só o logo parado.', 'Espera curta não aparece (sem piscar) e, uma vez visível, fica ao menos 1 s.'] },

    /* ---------- Dados ---------- */
    { id: 'charts', grupo: 'Dados', nome: 'Gráficos: área, barras e meta', novo: '2026-10-27',
      desc: 'Área com comparação ao período anterior e leitura por teclado, barras horizontais, barra de meta e barra empilhada, com “Ver tabela”.',
      ref: { nome: 'shadcn/ui · Chart', url: 'https://ui.shadcn.com/docs/components/chart' },
      wide: true,
      html: `<article class="ac-card" style="width:100%"><div class="ac-card__head"><h3 class="ac-card__title">Alcance por dia</h3><p class="ac-card__desc">Últimos 14 dias, comparado aos 14 anteriores</p></div><div class="ac-card__body"><div data-ac="area" data-label="Alcance" data-values="820,940,880,1020,1180,1100,1260,1210,1380,1460,1390,1540,1620,1710" data-compare="760,800,790,840,900,880,910,950,980,1010,990,1040,1080,1100" data-labels="14/10,15/10,16/10,17/10,18/10,19/10,20/10,21/10,22/10,23/10,24/10,25/10,26/10,27/10"></div></div></article>
<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));width:100%">
  <article class="ac-card"><div class="ac-card__head"><h3 class="ac-card__title">Origem das visitas</h3></div><div class="ac-card__body"><ul class="ac-hbars"><li>Busca<span class="ac-hbars__track"><span class="ac-hbars__bar" style="--v:82%"></span></span><b>4.120</b></li><li>Instagram<span class="ac-hbars__track"><span class="ac-hbars__bar" style="--v:64%;animation-delay:60ms"></span></span><b>3.210</b></li><li>Direto<span class="ac-hbars__track"><span class="ac-hbars__bar" style="--v:38%;animation-delay:120ms"></span></span><b>1.905</b></li><li>E-mail<span class="ac-hbars__track"><span class="ac-hbars__bar" style="--v:17%;animation-delay:180ms"></span></span><b>860</b></li></ul></div></article>
  <article class="ac-card"><div class="ac-card__head"><h3 class="ac-card__title">Meta do mês</h3></div><div class="ac-card__body" style="display:grid;gap:20px">
    <div class="ac-goal" style="--v:72%;--goal:100%"><div class="ac-goal__row"><span>Novos clientes</span><span><b>72</b> de 100</span></div><div class="ac-goal__track" role="progressbar" aria-label="Novos clientes" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div></div>
    <div class="ac-stack"><div class="ac-stack__bar" role="img" aria-label="Planos: Pro 58%, Equipe 27%, Grátis 15%"><span style="--v:58;--c:var(--ac-text)"></span><span style="--v:27;--c:var(--ac-text-3)"></span><span style="--v:15;--c:var(--ac-border-strong)"></span></div><ul class="ac-stack__legend"><li style="--c:var(--ac-text)">Pro <b>58%</b></li><li style="--c:var(--ac-text-3)">Equipe <b>27%</b></li><li style="--c:var(--ac-border-strong)">Grátis <b>15%</b></li></ul></div>
  </div></article>
</div>`,
      api: [['data-ac="area"', 'div', '—', 'data-values, data-compare, data-labels, data-label'], ['.ac-hbars', '<ul>', '—', 'Cada <li>: rótulo, trilha com --v e valor'], ['.ac-goal', 'div', '—', '--v (atual) e --goal (marca da meta)'], ['.ac-stack', 'div', '—', 'Segmentos com --v (peso) e --c (cor)']],
      a11y: ['Área: foco no gráfico e ← → leem cada ponto.', '“Ver tabela” mostra os mesmos números em tabela.', 'Barras empilhadas têm descrição completa em aria-label.'] },

    { id: 'collapsible', grupo: 'Dados', nome: 'Cartão e cartão recolhível', aka: 'Card', novo: '2026-10-27',
      desc: 'O cartão base (cabeçalho, corpo e rodapé) e o cartão que abre e fecha com resumo, para listas longas de dados.',
      ref: { nome: 'shadcn/ui · Collapsible', url: 'https://ui.shadcn.com/docs/components/collapsible' },
      html: `<div style="display:grid;gap:14px;width:min(440px,100%)">
  <article class="ac-card"><div class="ac-card__head"><h3 class="ac-card__title">Plano Pro</h3><p class="ac-card__desc">Renova em 12/11/2026</p></div><div class="ac-card__body" style="font-size:14px;color:var(--ac-text-2)">5 assentos, 200 GB e suporte prioritário.</div><div class="ac-card__foot"><button class="ac-btn ac-btn--ghost ac-btn--sm" type="button">Cancelar plano</button><button class="ac-btn ac-btn--sm" type="button">Gerenciar</button></div></article>
  <section class="ac-collapsible" data-ac="collapsible"><div class="ac-collapsible__head"><div><h4>Pedido #4821</h4><p>Enviado · R$ 1.290,00</p></div><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-ac-trigger aria-label="Detalhes do pedido #4821">${ico(P.chev)}</button></div>
    <div class="ac-collapsible__panel"><div><div class="ac-datarow"><span>Status</span>Enviado</div><div class="ac-datarow"><span>Transportadora</span>Correios · SEDEX</div><div class="ac-datarow"><span>Previsão</span>30/10/2026</div></div></div></section>
</div>`,
      api: [['.ac-card / __head / __title / __desc / __body / __foot', 'classes', '—', 'Estrutura do card'], ['data-ac="collapsible"', 'section', '—', 'Precisa de [data-ac-trigger] e .ac-collapsible__panel'], ['.is-open', 'classe', '—', 'Começa aberto'], ['.ac-datarow', 'linha', '—', 'Rótulo e valor']],
      a11y: ['O botão tem aria-expanded e aria-controls e um rótulo que diz o que abre.'] }
  ];

  const D = window.DEMOS;
  NOVOS.forEach(n => { let at = -1; D.forEach((d, i) => { if (d.grupo === n.grupo) at = i; }); D.splice(at + 1, 0, n); });

  const H = window.DEMO_HOOKS;
  H['logo-loader'] = root => {
    const L = window.Orthos, el = root.querySelector('#ll-demo'), info = root.querySelector('#ll-info'), err = root.querySelector('#ll-err'), file = root.querySelector('#ll-file');
    if (!el) return;
    const say = m => { err.hidden = !m; err.textContent = m || ''; };
    el.addEventListener('ac:load', e => { info.textContent = e.detail.type === 'svg' ? `SVG desenhado traço a traço (${e.detail.shapes} formas)` : 'Imagem ajustada a 240 × 240; a silhueta faz o papel do traço'; });
    root.querySelector('#ll-pick').onclick = () => file.click();
    file.onchange = async () => { const f = file.files[0]; file.value = ''; if (!f) return; say(''); try { await L.logo.load(el, f); } catch (e) { say(e.message); } };
    root.querySelector('#ll-replay').onclick = () => L.logo.replay(el);
    root.querySelector('#ll-reset').onclick = () => { say(''); L.logo.load(el, ''); };
    root.querySelector('#ll-full').onclick = () => L.loading({ logo: el, text: 'Carregando', duration: 3600, dismissible: true, size: 88 });
    root.querySelector('#ll-size').addEventListener('ac:change', e => el.style.setProperty('--size', e.detail + 'px'));
  };
  H.dirty = root => { const f = root.querySelector('#dirty-demo'); f && f.addEventListener('submit', e => { e.preventDefault(); const b = f.querySelector('[type=submit]'); b.dataset.loading = 'true'; setTimeout(() => { b.dataset.loading = 'false'; window.Orthos.dirty.baseline(f); window.Orthos.toast({ type: 'success', title: 'Alterações salvas' }); }, 700); }); };
  H.money = root => { const f = root.querySelector('#money-form'); f && f.addEventListener('submit', () => { const m = f.querySelector('[data-ac="money"]'); window.Orthos.toast({ type: 'success', title: 'Saque solicitado', desc: 'Valor: R$ ' + m._money.get().toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }); }); };
  H.phone = root => { const p = root.querySelector('[data-ac="phone"]'), o = root.querySelector('#tel-out'); p && p.addEventListener('ac:change', e => { const d = e.detail; o.textContent = d.numero ? (d.valido ? `Completo: ${d.completo}` : 'Número incompleto.') : 'Formato do país escolhido.'; }); };
  H.tour = root => { const b = root.querySelector('#tour-start'); b && (b.onclick = () => window.Orthos.tour([
    { title: 'Bem-vindo ao painel', text: 'Em quatro passos rápidos você conhece o principal. Use as setas do teclado ou os botões.' },
    { target: '#tour-vendas', title: 'Suas vendas', text: 'Total líquido do período. Clique para ver o detalhe na carteira.', position: 'bottom' },
    { target: '#tour-ticket', title: 'Ticket médio', text: 'Valor médio de cada venda. Produtos gratuitos não entram na conta.', position: 'bottom' },
    { target: '#tour-inexistente', title: 'Este passo é pulado', text: 'O alvo não existe na tela.' },
    { target: '#tour-produto', title: 'Crie um produto', text: 'Comece por aqui: nome, preço e checkout em poucos minutos.', position: 'top' }
  ], { doneLabel: 'Entendi' })); };
  H.result = root => {
    // redesenha com o código e o público escolhidos; 500 e erro na tela ganham um código para o suporte, 503 a previsão de volta
    const redraw = (k, v) => {
      const r = root.querySelector('#res-demo'); if (!r || r.dataset[k] === v) return;
      const n = r.cloneNode(false); n.dataset[k] = v; [...n.attributes].filter(a => /^data-(ac-init|error-id|retry-at)/.test(a.name)).forEach(a => n.removeAttribute(a.name));
      if (/^(500|error)$/.test(n.dataset.code)) n.dataset.errorId = 'A7F3-21C9';
      if (n.dataset.code === '503') n.dataset.retryAt = new Date(Date.now() + 45 * 6e4).toTimeString().slice(0, 5);
      n.innerHTML = ''; r.replaceWith(n); window.Orthos.init(n.parentElement);
    };
    [['#res-codes', 'code'], ['#res-who', 'audience']].forEach(([s, k]) => { const c = root.querySelector(s); c && c.addEventListener('ac:change', e => redraw(k, e.detail)); });
    // na vitrine, as ações só avisam o que fariam numa página de verdade
    const faz = { retry: 'recarrega a página', back: 'volta para a página anterior', home: 'abre o data-home', login: 'abre o data-login', support: 'abre o data-support', next: 'segue para o próximo passo' };
    root.addEventListener('ac:action', e => { if (!faz[e.detail.action]) return; e.preventDefault(); window.Orthos.toast({ title: `ac:action · ${e.detail.action}`, desc: `Numa página de verdade, ${faz[e.detail.action]}.` }); });
    root.addEventListener('ac:online', e => { e.preventDefault(); window.Orthos.toast({ type: 'success', title: 'A conexão voltou', desc: 'Numa página de verdade, ela recarrega sozinha.' }); });
  };
  H.toast = (prev => root => { prev && prev(root); root.addEventListener('click', e => { if (e.target.closest('[data-demo-toast="promise"]')) window.Orthos.toast.promise(new Promise((ok, no) => setTimeout(() => Math.random() > .25 ? ok(3) : no(), 1800)), { loading: 'Publicando 3 posts…', success: n => `${n} posts publicados`, error: 'Não foi possível publicar', errorDesc: 'Tente de novo em instantes.' }); }); })(H.toast);
})();
