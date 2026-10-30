/* Componentes vindos do levantamento de 28/10/2026 (padrões reimplementados, sem copiar React nem Blade). Cada um entra logo depois do último item do seu grupo, como em demos-novos.js. */
(function () {
  const I = n => window.Orthos.icon(n);
  const ico = p => `<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const P = {
    feed: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M3.5 12H20.5M12 3.5V20.5"/>',
    story: '<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10.5 18.5H13.5"/>',
    box: '<path d="M12 22C11.1818 22 10.4002 21.6698 8.83693 21.0095C4.94564 19.3657 3 18.5438 3 17.1613V7M12 22C12.8182 22 13.5998 21.6698 15.1631 21.0095C19.0544 19.3657 21 18.5438 21 17.1613V7M12 22V11.3548"/><path d="M8.32592 9.69138L5.40472 8.27785C3.80157 7.5021 3 7.11423 3 6.5C3 5.88577 3.80157 5.4979 5.40472 4.72215L8.32592 3.30862C10.1288 2.43621 11.0303 2 12 2C12.9697 2 13.8712 2.4362 15.6741 3.30862L18.5953 4.72215C20.1984 5.4979 21 5.88577 21 6.5C21 7.11423 20.1984 7.5021 18.5953 8.27785L15.6741 9.69138C13.8712 10.5638 12.9697 11 12 11C11.0303 11 10.1288 10.5638 8.32592 9.69138Z"/>'
  };
  const slide = (tag, title, text, cta) => `<article class="ac-card" style="display:grid;align-content:start;gap:8px;min-height:190px;padding:22px;background:linear-gradient(135deg,color-mix(in oklab,var(--ac-accent) 16%,var(--ac-surface)),var(--ac-surface) 72%)">
        <span class="ac-badge" style="justify-self:start">${tag}</span><h3 class="ac-card__title" style="font-size:18px">${title}</h3><p class="ac-card__desc" style="margin:0">${text}</p><a class="ac-link" href="#" onclick="return false" style="justify-self:start;margin-top:4px">${cta}</a></article>`;
  const plan = (name, price, note, items) => `<article class="ac-card" style="display:grid;align-content:start;gap:6px;padding:18px"><span class="ac-label">${name}</span><span class="ac-stat__value" style="margin:0;font-size:24px">${price}</span><span class="ac-hint">${note}</span><ul style="margin:6px 0 0;padding-left:18px;color:var(--ac-text-2);font-size:13px;line-height:1.6">${items.map(i => `<li>${i}</li>`).join('')}</ul></article>`;
  const msg = (side, who, time, text, extra = '') => `<div class="ac-msg ac-msg--${side}" data-author="${who}" data-time="${time}"><div class="ac-msg__bubble">${text}${extra}</div></div>`;
  const node = (ic, sr) => `<span class="ac-timeline__node" aria-hidden="true">${ic}</span><span class="ac-sr">${sr}</span>`;

  const REFS = [
    /* ---------- Formulários ---------- */
    { id: 'password', grupo: 'Formulários', nome: 'Campo de senha', novo: '2026-10-28',
      desc: 'Botão para mostrar e esconder, regras que se marcam enquanto a pessoa digita (somem com os campos vazios) e “as senhas conferem”. A validade fica no próprio campo, então o formulário com data-ac="validate" não envia senha fraca. Modo segredo para chaves de API.',
      ref: { nome: 'zero-7 · password-rules', url: '' },
      html: `<form class="ac-card" data-ac="validate" id="pw-form" style="width:min(400px,100%)">
  <div class="ac-card__head"><h3 class="ac-card__title">Trocar senha</h3><p class="ac-card__desc">Use uma senha que você não usa em outro site.</p></div>
  <div class="ac-card__body" style="display:grid;gap:16px">
    <div class="ac-field"><label class="ac-label" for="pw-nova">Nova senha</label>
      <div data-ac="password" data-rules="min:8,numero,maiuscula,minuscula,especial" data-confirm="#pw-conf"><input class="ac-input" type="password" id="pw-nova" name="senha" autocomplete="new-password" required></div></div>
    <div class="ac-field"><label class="ac-label" for="pw-conf">Confirme a nova senha</label>
      <div data-ac="password"><input class="ac-input" type="password" id="pw-conf" name="confirmacao" autocomplete="new-password" required></div></div>
    <div class="ac-field"><label class="ac-label" for="pw-chave">Chave da API</label>
      <div data-ac="password" data-secret><input class="ac-input" type="password" id="pw-chave" name="chave" value="chv_live_9f2c41d87ab35e60" style="font-family:var(--ac-mono)" aria-describedby="pw-chave-h"></div><p class="ac-hint" id="pw-chave-h">Modo segredo: fora do preenchimento automático e dos gerenciadores de senha.</p></div>
  </div>
  <div class="ac-card__foot"><button class="ac-btn" type="submit">Salvar</button></div>
</form>`,
      api: [['data-ac="password"', 'div com <input type=password>', '—', 'Põe o botão Mostrar/Esconder (aria-pressed)'], ['data-rules', 'lista', '—', 'min:8, numero, maiuscula, minuscula, especial'], ['data-confirm', 'seletor', '—', 'Campo de confirmação; acrescenta “as senhas conferem”'], ['data-secret', 'atributo', '—', 'Chave de API: autocomplete=new-password, spellcheck=false, data-1p-ignore, data-lpignore'], ['setCustomValidity', 'validade', '—', 'Senha fraca ou diferente deixa o campo inválido; o data-ac="validate" barra o envio e mostra a mensagem']],
      a11y: ['O botão tem nome fixo (“Mostrar senha”) e o estado em aria-pressed; a dica visível troca entre Mostrar e Esconder.', 'A lista de regras descreve o campo (aria-describedby) e cada item diz “atendido” ou “falta”.', 'Um só anúncio educado, 400 ms depois que a pessoa para de digitar, e não um por tecla.'] },

    { id: 'copyfield', grupo: 'Formulários', nome: 'Campo copiável', novo: '2026-10-28',
      desc: 'Valor só de leitura, cortado com reticências, com o botão de copiar colado. Copia o valor inteiro de data-copy (a chave sem máscara), não o texto da tela. Se a área de transferência falhar, o valor aparece selecionado com a dica do atalho.',
      ref: { nome: 'zero-7 · clipboard-text (porte do Kumo)', url: '' },
      html: `<div style="display:grid;gap:18px;width:min(420px,100%)">
  <div class="ac-field"><span class="ac-label">Link de convite</span><div class="ac-copyfield ac-copyfield--lg" data-ac="copyfield" data-label="Copiar link de convite" data-toast="Link de convite copiado"><span class="ac-copyfield__value">https://app.exemplo.com.br/convite/8f3k2q-equipe-aurora</span></div></div>
  <div class="ac-field"><span class="ac-label">Chave da API</span><div class="ac-copyfield" data-ac="copyfield" data-label="Copiar chave da API" data-toast="Chave da API copiada" data-copy="chv_live_4f8a1c9e0b7d2a6f7Q2x"><span class="ac-copyfield__value">chv_live_••••••••••••7Q2x</span></div><p class="ac-hint">Copia a chave inteira, não a versão mascarada.</p></div>
  <div class="ac-field"><span class="ac-label">Pix copia e cola</span><div class="ac-copyfield ac-copyfield--sm" data-ac="copyfield" data-label="Copiar código Pix" data-toast="Código Pix copiado"><span class="ac-copyfield__value">00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d5204000053039865406189.905802BR5912LOJA AURORA6009SAO PAULO62070503***6304B14F</span></div></div>
</div>`,
      api: [['data-ac="copyfield"', 'div', '—', 'Monta o botão e o aviso'], ['data-toast', 'texto | "false"', 'Copiado para a área de transferência', 'Mensagem do aviso que aparece no topo ao copiar; "false" desliga'], ['.ac-copyfield__value', 'span', 'texto do div', 'O que aparece (pode estar mascarado)'], ['data-copy', 'texto', 'o texto visível', 'O que vai para a área de transferência'], ['data-label', 'texto', 'Copiar', 'Nome do botão (“Copiar chave da API”)'], ['.ac-copyfield--sm / --lg', 'classe', 'base', 'Alturas 32, 40 e 48 px'], ['ac:copy', 'evento', '—', 'detail: { text }']],
      a11y: ['Depois de copiar, o botão passa a se chamar “Copiado” por 1,5 s e uma região educada anuncia.', 'Os ícones trocam de lugar por escala e desfoque; com movimento reduzido, a troca é seca.', 'Se copiar falhar, o texto fica selecionado e a dica diz o atalho (Ctrl+C ou ⌘C).'] },

    { id: 'choice-cards', grupo: 'Formulários', nome: 'Escolha em cartões', novo: '2026-10-28',
      desc: 'Rádios desenhados como cartões, com título, linha de apoio e ícone opcional. O rádio nativo continua por baixo: setas, leitor de tela e formulário funcionam como num grupo de rádios comum.',
      ref: { nome: '', url: '' },
      html: `<form style="display:grid;gap:22px;width:min(540px,100%)" onsubmit="return false">
  <fieldset class="ac-choice-cards">
    <legend>Formato do post</legend>
    <label class="ac-choice-card"><input type="radio" name="formato" value="feed" checked><span class="ac-choice-card__icon">${ico(P.feed)}</span><span class="ac-choice-card__text"><span class="ac-choice-card__title">Feed</span><span class="ac-choice-card__desc">Quadrado ou retrato, fica no perfil.</span></span></label>
    <label class="ac-choice-card"><input type="radio" name="formato" value="stories"><span class="ac-choice-card__icon">${ico(P.story)}</span><span class="ac-choice-card__text"><span class="ac-choice-card__title">Stories</span><span class="ac-choice-card__desc">Vertical, some em 24 horas.</span></span></label>
    <label class="ac-choice-card"><input type="radio" name="formato" value="reels" disabled><span class="ac-choice-card__icon">${I('play')}</span><span class="ac-choice-card__text"><span class="ac-choice-card__title">Reels</span><span class="ac-choice-card__desc">Em breve.</span></span></label>
  </fieldset>
  <fieldset class="ac-choice-cards">
    <legend>Quem aprova antes de publicar</legend>
    <label class="ac-choice-card"><input type="radio" name="aprova" value="ninguem"><span class="ac-choice-card__text"><span class="ac-choice-card__title">Ninguém</span><span class="ac-choice-card__desc">Publica no horário marcado.</span></span></label>
    <label class="ac-choice-card"><input type="radio" name="aprova" value="cliente" checked><span class="ac-choice-card__text"><span class="ac-choice-card__title">O cliente</span><span class="ac-choice-card__desc">Recebe um link e aprova pelo celular.</span></span></label>
  </fieldset>
</form>`,
      api: [['.ac-choice-cards', '<fieldset>', '—', 'Grade que se ajusta à largura (cartões de 180 px no mínimo)'], ['.ac-choice-card', '<label>', '—', 'Um <input type=radio> + .ac-choice-card__icon (opcional) + __text com __title e __desc'], ['checked / disabled', 'HTML', '—', 'Escolhido (borda de destaque e marca) e indisponível']],
      a11y: ['É um grupo de rádios nativo: Tab entra no escolhido e as setas trocam a opção.', 'A legenda do <fieldset> nomeia o grupo.', 'Foco visível no cartão inteiro; opção indisponível fica esmaecida e não recebe foco.'] },

    /* ---------- Feedback ---------- */
    { id: 'banners', grupo: 'Feedback', nome: 'Faixas de aviso em fila', novo: '2026-10-28',
      desc: 'Aviso que vale para a conta inteira (pagamento recusado, integração desconectada), preso no topo, um por vez, do mais grave ao mais leve. Com mais de um aparecem as setas e eles trocam a cada 10 s, parando com o mouse ou o foco em cima.',
      ref: { nome: '', url: '' },
      wide: true,
      html: `<div class="ac-card" style="width:100%;overflow:hidden">
  <div class="ac-banners" data-ac="banners" aria-label="Avisos da conta">
    <div class="ac-banners__item" data-tone="ok" data-dismissible id="bn-dominio"><span class="ac-banners__icon" aria-hidden="true">${I('check')}</span><p class="ac-banners__text"><span class="ac-banners__long">O domínio loja-aurora.com.br foi verificado e já está no ar.</span><span class="ac-banners__short">Domínio verificado.</span></p></div>
    <div class="ac-banners__item" data-tone="atencao" data-dismissible id="bn-insta"><span class="ac-banners__icon" aria-hidden="true">${I('alert')}</span><p class="ac-banners__text"><span class="ac-banners__long">O Instagram da loja foi desconectado. Reconecte para continuar publicando.</span><span class="ac-banners__short">Instagram desconectado.</span></p><button class="ac-banners__action" type="button">Reconectar</button></div>
    <div class="ac-banners__item" data-tone="critico" id="bn-pagamento"><span class="ac-banners__icon" aria-hidden="true">${I('alert')}</span><p class="ac-banners__text"><span class="ac-banners__long">O pagamento da assinatura falhou. Atualize o cartão até 31/10 para não perder o acesso.</span><span class="ac-banners__short">Pagamento da assinatura falhou.</span></p><button class="ac-banners__action" type="button">Atualizar cartão</button></div>
    <div class="ac-banners__item" data-tone="neutro" id="bn-equipe"><span class="ac-banners__icon" aria-hidden="true">${I('info')}</span><p class="ac-banners__text"><span class="ac-banners__long">Você está vendo o painel como Equipe Aurora.</span><span class="ac-banners__short">Vendo como Equipe Aurora.</span></p><button class="ac-banners__action" type="button">Voltar à minha conta</button></div>
  </div>
  <div class="ac-card__body" style="display:grid;gap:10px"><h3 class="ac-card__title">Painel da loja</h3><p class="ac-card__desc" style="margin:0">O conteúdo da página continua aqui embaixo; a faixa fica presa no topo enquanto a página rola.</p><span class="ac-skel" style="height:12px;width:72%"></span><span class="ac-skel" style="height:12px;width:54%"></span></div>
</div>`,
      api: [['data-ac="banners"', 'div', '—', 'Fila de .ac-banners__item; mostra um por vez'], ['data-tone', '"critico" | "perigo" | "atencao" | "ok" | "neutro"', 'neutro', 'Cor da faixa e ordem padrão (do mais grave ao mais leve)'], ['data-priority', 'número', 'o tom', 'Ordem explícita (menor primeiro)'], ['data-dismissible', 'atributo', '—', 'Mostra o X; evento ac:dismiss com detail: { id }'], ['.ac-banners__long / __short', 'span', '—', 'Texto do computador e o curto, do celular (< 640 px)'], ['.ac-banners__icon / __text / __action', 'classes', '—', 'Ícone num quadrado translúcido, texto centralizado e ação sublinhada'], ['data-interval', 'ms', '10000', 'Tempo da troca automática']],
      a11y: ['Região nomeada (“Avisos da conta”); cada aviso começa com “Aviso 2 de 3” para o leitor de tela.', 'Trocar pelas setas ou dispensar anuncia o aviso novo numa região educada; a troca automática não interrompe ninguém.', 'Sem troca automática com movimento reduzido; ela também para com o mouse ou o foco em cima.'] },

    { id: 'sheet-mobile', grupo: 'Feedback', nome: 'Diálogo em bottom sheet', novo: '2026-10-28',
      desc: 'No celular (abaixo de 640 px), todo .ac-dialog sobe da borda de baixo, ocupa a largura toda e só os cantos de cima são arredondados. O conteúdo rola dentro dele e as ações ficam sempre à vista; quando o teclado virtual abre, o sheet sobe junto e o campo focado continua visível.',
      ref: { nome: 'zero-7 · dialogo-teclado.js', url: '' },
      html: `<div style="display:grid;gap:12px;justify-items:center;text-align:center">
  <button class="ac-btn ac-btn--secondary" type="button" data-ac-open="#bs-end">Novo endereço</button>
  <p class="ac-hint" style="max-width:42ch;margin:0">No computador, é o diálogo de sempre. Abra numa tela estreita (ou no modo celular do navegador) para ver o sheet.</p>
</div>
<dialog class="ac ac-dialog" id="bs-end" aria-labelledby="bs-end-t" aria-describedby="bs-end-d"><form class="ac-dialog__in" method="dialog">
  <h2 class="ac-dialog__title" id="bs-end-t">Novo endereço de entrega</h2><p class="ac-dialog__desc" id="bs-end-d">Usado nos próximos pedidos desta conta.</p>
  <div class="ac-field"><label class="ac-label" for="bs-cep">CEP</label><input class="ac-input" id="bs-cep" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000"></div>
  <div class="ac-field"><label class="ac-label" for="bs-rua">Rua</label><input class="ac-input" id="bs-rua" autocomplete="address-line1"></div>
  <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.6fr);gap:12px"><div class="ac-field"><label class="ac-label" for="bs-num">Número</label><input class="ac-input" id="bs-num" inputmode="numeric"></div><div class="ac-field"><label class="ac-label" for="bs-comp">Complemento</label><input class="ac-input" id="bs-comp" autocomplete="address-line2"></div></div>
  <div class="ac-field"><label class="ac-label" for="bs-bairro">Bairro</label><input class="ac-input" id="bs-bairro"></div>
  <div class="ac-field"><label class="ac-label" for="bs-cidade">Cidade</label><input class="ac-input" id="bs-cidade" autocomplete="address-level2"></div>
  <div class="ac-field"><label class="ac-label" for="bs-ref">Ponto de referência</label><textarea class="ac-textarea" id="bs-ref" rows="2"></textarea></div>
  <div class="ac-dialog__actions"><button class="ac-btn ac-btn--ghost" type="button" data-ac-close>Cancelar</button><button class="ac-btn" type="button" data-ac-close="ok" data-demo-saved>Salvar endereço</button></div>
</form></dialog>`,
      api: [['automático', '.ac-dialog', '< 640 px', 'Vira bottom sheet; o computador não muda'], ['--ac-keyboard-h / --ac-visible-h', 'CSS no <html>', '—', 'Postos pelo JS quando o teclado virtual cobre mais de 120 px com um campo do diálogo focado'], ['.ac-command', 'classe', '—', 'A paleta de comandos continua no topo (não vira sheet)']],
      a11y: ['É o mesmo <dialog> modal: foco preso, Esc e clique fora fecham.', 'Entra subindo em 400 ms e sai em 250 ms; com movimento reduzido, sem animação.', 'Com o teclado aberto, o campo focado rola para a área visível (sem scrollIntoView).'] },

    { id: 'confirm', grupo: 'Feedback', nome: 'Confirmar e alertar', novo: '2026-10-28',
      desc: 'Orthos.confirm() monta o diálogo na hora e devolve uma promessa: título, a consequência em texto, botão que repete o nome da ação e Cancelar com o foco inicial. Se onConfirm devolver uma promessa, o botão carrega e o diálogo espera; com erro, a mensagem aparece dentro dele. Orthos.alert() tem um OK só.',
      ref: { nome: '', url: '' },
      html: `<div style="display:grid;gap:16px;justify-items:center">
  <div class="ac-btn-group" style="justify-content:center">
    <button class="ac-btn ac-btn--danger" type="button" id="cf-del">${I('trash')}Excluir 3 arquivos</button>
    <button class="ac-btn ac-btn--secondary" type="button" id="cf-arq">Arquivar projeto</button>
    <button class="ac-btn ac-btn--ghost" type="button" id="cf-alert">Mostrar alerta</button>
  </div>
  <label class="ac-switch"><input type="checkbox" role="switch" id="cf-falha"><span>Simular falha ao excluir</span></label>
  <p class="ac-hint" id="cf-out" aria-live="polite" style="margin:0">Escolha uma ação.</p>
</div>`,
      api: [['Orthos.confirm(opções)', 'função', '—', 'Devolve Promise<boolean>: true se confirmou'], ['title / text', 'texto', '“Tem certeza?”', 'Pergunta e consequência'], ['confirmLabel / cancelLabel', 'texto', 'Confirmar / Cancelar', 'Use o nome da ação: “Excluir 3 arquivos”'], ['danger', 'boolean', 'false', 'Ícone de alerta e botão vermelho'], ['onConfirm', 'função', '—', 'Se devolver promessa: botão carregando, diálogo aberto até terminar e erro dentro dele'], ['Orthos.alert(mensagem | { title, text, okLabel })', 'função', '“Atenção”', 'Devolve Promise<void> ao fechar'], ['aria-busy="true"', 'no <dialog>', '—', 'Qualquer .ac-dialog assim não fecha por Esc, clique fora ou data-ac-close']],
      a11y: ['role="alertdialog" com título e consequência ligados por aria-labelledby/describedby.', 'O foco começa em Cancelar e volta para quem abriu ao fechar.', 'Enquanto a ação roda, o diálogo fica aria-busy e não fecha; o erro entra em role="alert".'] },

    /* ---------- Dados ---------- */
    { id: 'orbit', grupo: 'Feedback', nome: 'Quatro pontos e carregando na área', novo: '2026-10-28',
      desc: 'Quatro bolinhas nos cantos de um quadrado, cada uma mais clara, girando com um pulso a cada quarto de volta. Sozinho é o indicador de espera dentro de uma área; com .ac-loading-area vira o “carregando” centralizado de uma tela que está abrindo, com o texto embaixo.',
      ref: { nome: 'Uiverse · loader de AbanoubMagdy1 (licença MIT)', url: 'https://uiverse.io/' },
      html: `<div style="display:grid;gap:18px;width:min(520px,100%)">
  <div class="ac-card"><div class="ac-loading-area" role="status"><span data-ac="orbit"></span><span class="ac-loading-area__text">Carregando o relatório de outubro…</span></div></div>
  <div class="ac-btn-group" style="gap:28px;justify-content:center;align-items:center">
    <span data-ac="orbit" data-size="24" role="status" aria-label="Carregando"></span>
    <span data-ac="orbit" data-size="36" role="status" aria-label="Carregando" style="color:var(--ac-success)"></span>
    <span class="ac-btn ac-btn--secondary" style="pointer-events:none"><span data-ac="orbit" class="ac-orbit--inherit" data-size="16"></span>Atualizando</span>
  </div>
</div>`,
      api: [['data-ac="orbit"', 'span', '—', 'Monta as 4 bolinhas; sem role fica aria-hidden (quem nomeia a espera é o contêiner)'], ['data-size', 'px', '48', 'Tamanho do quadrado (ou --size no CSS)'], ['.ac-orbit--inherit', 'classe', '—', 'Usa a cor do texto em volta em vez do destaque'], ['.ac-loading-area', 'classe', '—', 'Coluna centralizada, min-height 160px; ponha role="status" e o texto em .ac-loading-area__text (ou .ac-sr)']],
      a11y: ['O desenho é aria-hidden; o texto da área (ou o aria-label) é o que o leitor de tela anuncia, via role="status".', 'Com movimento reduzido, os pontos ficam parados.'] },

    { id: 'wait-long', grupo: 'Feedback', nome: 'Espera longa', novo: '2026-10-28',
      desc: 'Para tarefas de 1 a 2 minutos que não travam a tela (gerar uma arte, um relatório, uma pesquisa): um navegador desenhado, com os blocos da página pulsando e a luz correndo pelos traços até ele. O rótulo vai na barra do navegador.',
      ref: { nome: '', url: '' },
      html: `<div style="display:grid;gap:14px;width:min(520px,100%);justify-items:center">
  <div data-ac="wait" data-label="Gerando a arte" data-note="Leva de 1 a 2 minutos. Pode continuar usando o app; avisamos quando ficar pronto."></div>
</div>`,
      api: [['data-ac="wait"', 'div', '—', 'Monta o desenho (SVG) e o texto para leitor de tela'], ['data-label', 'texto', 'Gerando', 'Rótulo da barra do navegador, lido pelo leitor de tela'], ['data-note', 'texto', '—', 'Aviso embaixo (ex.: quanto tempo leva)'], ['--light-a / --light-b', 'CSS', 'destaque / sucesso', 'Cores da luz que corre pelos traços']],
      a11y: ['role="status" com aria-live="polite": o rótulo é anunciado uma vez, sem repetir.', 'O SVG é aria-hidden; o rótulo também vai num .ac-sr.', 'Com movimento reduzido, fica parado: blocos estáticos e traços apagados.'] },

    { id: 'sync', grupo: 'Feedback', nome: 'Sincronizando', novo: '2026-10-28',
      desc: 'Quando um sistema externo demora (banco, rede social, integração) e a tela tenta de novo sozinha: um sonar com três ondas, título e detalhe. Fica no lugar do aviso de erro enquanto ainda há chance de dar certo; a variante com pontos é mais discreta.',
      ref: { nome: '', url: '' },
      html: `<div style="display:grid;gap:16px;width:min(460px,100%)">
  <div class="ac-card"><div class="ac-card__body"><div data-ac="sync" data-title="Sincronizando com o banco" data-detail="O extrato está demorando para chegar. Tentamos de novo a cada 30 segundos."></div></div></div>
  <div class="ac-card"><div class="ac-card__body"><div data-ac="sync" data-variant="dots" data-title="Buscando as métricas do Instagram" data-detail="Pode levar alguns segundos."></div></div></div>
</div>`,
      api: [['data-ac="sync"', 'div', '—', 'Monta o sonar (ou os pontos), título e detalhe'], ['data-title', 'texto', 'Sincronizando', 'O que está acontecendo'], ['data-detail', 'texto', '—', 'Detalhe: por que demora e o que a tela está fazendo'], ['data-variant="dots"', 'texto', 'sonar', 'Troca o sonar pelos quatro pontos (30 px)']],
      a11y: ['role="status" com aria-live="polite": título e detalhe são anunciados.', 'Ondas e ícone são aria-hidden.', 'Com movimento reduzido, fica um anel parado.'] },

    { id: 'table-stack', grupo: 'Dados', nome: 'Tabela em cartões', novo: '2026-10-28',
      desc: 'Quando o espaço da tabela fica abaixo de 640 px (no celular, mas também num painel lateral ou numa coluna estreita), cada linha vira um cartão e cada célula uma linha “rótulo: valor”, com o rótulo vindo de data-label. A célula sem rótulo vira o título do cartão e a coluna de ações vai para o fim, à direita. A demo abre numa tela de celular (375 px); troque o tamanho no seletor para ver a mesma tabela voltar a ser tabela. O Data table (data-ac="table") já faz isso sozinho.',
      ref: { nome: 'zero-7 · table/cell.blade.php', url: '' },
      wide: true,
      html: `<div class="device-demo">
  <div class="ac-segmented" data-ac="segmented" id="ts-size" aria-label="Tamanho da tela"><button type="button" aria-pressed="true" value="375">Celular · 375 px</button><button type="button" value="768">Tablet · 768 px</button><button type="button" value="full">Computador</button></div>
  <div class="device-frame" id="ts-frame" data-size="375" style="--w:375px;width:min(var(--w),100%)">
    <div class="ac-table-wrap"><div class="ac-table-scroll"><table class="ac-table ac-table--stack" data-ac="stack">
    <caption class="ac-sr">Pedidos recentes</caption>
    <thead><tr><th scope="col">Pedido</th><th scope="col">Cliente</th><th scope="col">E-mail</th><th scope="col">Data</th><th scope="col" class="num">Valor</th><th scope="col">Status</th><th scope="col" class="ac-table__actions"><span class="ac-sr">Ações</span></th></tr></thead>
    <tbody>
    <tr><td><b>#4821</b> · Kit café especial</td><td data-label="Cliente">Marina Teles</td><td data-label="E-mail">marina.teles@exemplo.com.br</td><td data-label="Data">27/10/2026</td><td class="num" data-label="Valor">R$ 189,90</td><td data-label="Status"><span class="ac-badge ac-badge--success">Pago</span></td><td class="ac-table__actions"><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button" aria-label="Ver pedido #4821">Ver pedido</button></td></tr>
    <tr><td><b>#4820</b> · Assinatura anual</td><td data-label="Cliente">Ricardo Nogueira Vasconcelos</td><td data-label="E-mail">ricardo.nogueira.vasconcelos@empresa-exemplo.com.br</td><td data-label="Data">27/10/2026</td><td class="num" data-label="Valor">R$ 1.188,00</td><td data-label="Status"><span class="ac-badge ac-badge--warning">Pendente</span></td><td class="ac-table__actions"><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button" aria-label="Ver pedido #4820">Ver pedido</button></td></tr>
    <tr><td><b>#4819</b> · Curso de fotografia</td><td data-label="Cliente">Tatiana Moura</td><td data-label="E-mail">tati.moura@exemplo.com.br</td><td data-label="Data">26/10/2026</td><td class="num" data-label="Valor">R$ 497,00</td><td data-label="Status"><span class="ac-badge">Reembolsado</span></td><td class="ac-table__actions"><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button" aria-label="Ver pedido #4819">Ver pedido</button></td></tr>
    </tbody>
    </table></div></div>
  </div>
</div>`,
      api: [['.ac-table--stack', 'classe na <table>', '—', 'Liga o modo cartão quando o .ac-table-wrap em volta fica abaixo de 640 px (container query)'], ['data-label', '<td>', '—', 'Rótulo mostrado antes do valor (::before)'], ['<td> sem data-label', '—', '—', 'Ocupa a linha inteira: use para o título do cartão'], ['.ac-table__actions', '<td>/<th>', '—', 'Vira a última linha, alinhada à direita'], ['.ac-table__select', '<td>/<th>', '—', 'Caixa de seleção no canto do cartão'], ['.ac-stack-host', 'classe', '—', 'Marca outro pai como o espaço medido, para tabela sem .ac-table-wrap'], ['data-ac="stack"', '<table>', 'opcional', 'Sem .ac-table-wrap, marca o pai como .ac-stack-host; Põe a classe e os papéis ARIA de tabela (o Safari perde a tabela com display: block)'], ['data-ac="table"', 'Data table', 'automático', 'Já gera data-label; a coluna name vira o título']],
      a11y: ['O cabeçalho some só da tela: continua na tabela para o leitor de tela.', 'Com data-ac="stack" (e no Data table), role="table/row/cell" garante que a tabela siga sendo lida como tabela.', 'Valores longos quebram dentro do cartão (sem rolagem de lado); um elemento ou texto por célula.'] },

    { id: 'timeline', grupo: 'Dados', nome: 'Linha do tempo', novo: '2026-10-28',
      desc: 'Etapas de um pedido, saque ou aprovação: nó quadrado com ícone, linha fina por trás e estados feito, atual, falhou e próximo (tracejado). Cada item tem data, título com valor opcional à direita e detalhe. A versão horizontal vira vertical no celular.',
      ref: { nome: '', url: '' },
      html: `<div style="display:grid;gap:36px;width:min(640px,100%)">
  <ol class="ac-timeline" aria-label="Andamento do pedido #4821">
    <li class="ac-timeline__item is-done">${node(I('check'), 'Concluído.')}<div class="ac-timeline__body"><time class="ac-timeline__date" datetime="2026-10-27T14:02">27 out · 14:02</time><div class="ac-timeline__head"><span class="ac-timeline__title">Pedido recebido</span><span class="ac-timeline__value">R$ 189,90</span></div><p class="ac-timeline__detail">Pix confirmado pelo banco.</p></div></li>
    <li class="ac-timeline__item is-done">${node(I('check'), 'Concluído.')}<div class="ac-timeline__body"><time class="ac-timeline__date" datetime="2026-10-27T16:40">27 out · 16:40</time><div class="ac-timeline__head"><span class="ac-timeline__title">Nota fiscal emitida</span></div><p class="ac-timeline__detail">NF-e 000.381 enviada por e-mail.</p></div></li>
    <li class="ac-timeline__item is-current" aria-current="step">${node(I('clock'), 'Em andamento.')}<div class="ac-timeline__body"><time class="ac-timeline__date" datetime="2026-10-28T09:15">28 out · 09:15</time><div class="ac-timeline__head"><span class="ac-timeline__title">Em separação</span></div><p class="ac-timeline__detail">Previsão de envio: hoje até as 18h.</p></div></li>
    <li class="ac-timeline__item is-next">${node(ico(P.box), 'Próxima etapa.')}<div class="ac-timeline__body"><span class="ac-timeline__date">Previsão: 30 out</span><div class="ac-timeline__head"><span class="ac-timeline__title">Entrega</span></div><p class="ac-timeline__detail">Pelos Correios, com rastreio por e-mail.</p></div></li>
  </ol>
  <ol class="ac-timeline ac-timeline--h" aria-label="Andamento do saque">
    <li class="ac-timeline__item is-done">${node(I('check'), 'Concluído.')}<div class="ac-timeline__body"><time class="ac-timeline__date" datetime="2026-10-25">25 out</time><div class="ac-timeline__head"><span class="ac-timeline__title">Solicitado</span><span class="ac-timeline__value">R$ 1.250,40</span></div></div></li>
    <li class="ac-timeline__item is-done">${node(I('check'), 'Concluído.')}<div class="ac-timeline__body"><time class="ac-timeline__date" datetime="2026-10-26">26 out</time><div class="ac-timeline__head"><span class="ac-timeline__title">Aprovado</span></div></div></li>
    <li class="ac-timeline__item is-failed">${node(I('x'), 'Falhou.')}<div class="ac-timeline__body"><time class="ac-timeline__date" datetime="2026-10-27">27 out</time><div class="ac-timeline__head"><span class="ac-timeline__title">Transferência</span></div><p class="ac-timeline__detail">O banco recusou: conta encerrada.</p></div></li>
    <li class="ac-timeline__item is-next">${node(I('check'), 'Próxima etapa.')}<div class="ac-timeline__body"><span class="ac-timeline__date">—</span><div class="ac-timeline__head"><span class="ac-timeline__title">Na sua conta</span></div></div></li>
  </ol>
</div>`,
      api: [['.ac-timeline', '<ol>', 'vertical', 'Lista de .ac-timeline__item'], ['.ac-timeline--h', 'classe', '—', 'Horizontal; vira vertical abaixo de 640 px'], ['.is-done / .is-current / .is-failed / .is-next', 'no item', 'neutro', 'Feito (verde), atual (âmbar), falhou (vermelho) e próximo (tracejado, texto apagado)'], ['.ac-timeline__node', 'span', '—', 'Quadrado de 32 px com ícone de 16 px'], ['__date / __head / __title / __value / __detail', 'classes', '—', 'Data, título com valor à direita e detalhe']],
      a11y: ['É uma lista ordenada com nome (aria-label); a ordem é a do tempo.', 'O estado não fica só na cor: o ícone muda e um texto oculto (“Concluído.”) diz o estado.', 'aria-current="step" marca a etapa atual.'] },

    { id: 'chat', grupo: 'Dados', nome: 'Conversa', novo: '2026-10-28',
      desc: 'Balões enviados à direita e recebidos à esquerda, colados quando seguidos. Tocar no balão mostra a hora; rascunho da IA, erro com “tentar de novo” e reação presa à borda. Longe do fim, aparece o botão para a mensagem mais nova. Ctrl/⌘+Enter envia.',
      ref: { nome: '', url: '' },
      html: `<section class="ac-chat" data-ac="chat" aria-label="Conversa com Marina Teles" style="width:min(420px,100%)">
  <div class="ac-chat__log" aria-label="Mensagens">
    <p class="ac-chat__day">Ontem</p>
    ${msg('in', 'Marina', 'Ontem, 18:02', 'Oi! Comprei o kit café especial ontem.')}
    ${msg('in', 'Marina', 'Ontem, 18:02', 'Vocês sabem quando ele sai para entrega?')}
    ${msg('out', 'Você', 'Ontem, 18:10', 'Oi, Marina! O pedido #4821 já foi separado.')}
    ${msg('out', 'Você', 'Ontem, 18:10', 'Sai hoje até as 18h, pelos Correios.')}
    ${msg('in', 'Marina', 'Ontem, 18:12', 'Perfeito, obrigada!', '<span class="ac-msg__reaction" role="img" aria-label="Reação: coração">❤️</span>')}
    <p class="ac-chat__day">Hoje</p>
    ${msg('in', 'Marina', 'Hoje, 09:41', 'Chegou! O rastreio era o <a href="#" onclick="return false">BR482913015BR</a>, né?')}
    ${msg('out', 'Você', 'Hoje, 09:44', 'Esse mesmo. Aproveite o café!')}
    <div class="ac-msg ac-msg--out ac-msg--error" data-author="Você" data-time="Hoje, 09:45"><div class="ac-msg__bubble">Mandei um cupom de 10% para a próxima compra.</div><button class="ac-msg__retry" type="button">Não enviada. Toque para tentar de novo</button></div>
    <div class="ac-msg ac-msg--out ac-msg--soft" data-time="Sugestão de agora"><span class="ac-msg__tag">Rascunho da IA</span><div class="ac-msg__bubble">Que bom que chegou! Se puder, conte o que achou: sua opinião ajuda outros clientes.</div></div>
  </div>
  <form class="ac-chat__composer"><textarea class="ac-chat__input" rows="1" aria-label="Mensagem para Marina" placeholder="Escreva uma mensagem"></textarea><button class="ac-btn ac-btn--accent ac-btn--icon ac-btn--sm" type="submit" aria-label="Enviar" data-tip="Enviar (Ctrl+Enter)">${I('send')}</button></form>
</section>`,
      api: [['.ac-chat + data-ac="chat"', 'section', '—', 'Lista (.ac-chat__log) e campo de escrever (.ac-chat__composer)'], ['.ac-msg--in / --out', 'div', '—', 'Recebida (esquerda) e enviada (direita); o balão é .ac-msg__bubble'], ['.ac-msg--soft / --error', 'classe', '—', 'Rascunho da IA e não enviada (com .ac-msg__retry)'], ['data-time / data-author', 'texto', '—', 'Hora mostrada ao tocar no balão e quem falou (para o leitor de tela)'], ['.ac-msg__reaction', 'span', '—', 'Selo de reação preso à borda'], ['ac:send', 'evento', '—', 'detail: { text }; cancele para manter o texto no campo'], ['ac:retry', 'evento', '—', 'detail: { message } ao tocar em “tentar de novo”']],
      a11y: ['A lista é role="log" com aria-live educado: mensagem nova é lida sem roubar o foco.', 'Cada balão diz quem falou (texto oculto) e a hora está na árvore de acessibilidade mesmo fechada.', 'A lista recebe foco e rola pelo teclado; Ctrl/⌘+Enter envia e Enter quebra a linha.'] },

    { id: 'carousel', grupo: 'Dados', nome: 'Carrossel', novo: '2026-10-28',
      desc: 'Trilha com scroll-snap, setas e bolinhas numa cápsula, slides fora da vista fora do Tab e troca automática opcional que para no hover, no foco e no botão Pausar. Sem troca automática com movimento reduzido.',
      ref: { nome: 'WAI-ARIA APG · Carousel', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/carousel/' },
      html: `<div style="display:grid;gap:30px;width:min(560px,100%)">
  <section class="ac-carousel" data-ac="carousel" data-autoplay="12000" aria-label="Novidades da loja">
    <div class="ac-carousel__track">
      ${slide('Novo', 'Checkout em uma página', 'Menos campos e Pix com QR na mesma tela. A conversão subiu 12% nos testes.', 'Ver novidade')}
      ${slide('Cupons', 'Cupons com prazo', 'Crie cupons que expiram sozinhos e mostre a contagem regressiva no checkout.', 'Criar cupom')}
      ${slide('Relatórios', 'Quem comprou de novo', 'Recompra em 30, 60 e 90 dias, por produto e por campanha.', 'Abrir relatório')}
      ${slide('Área de membros', 'Aulas sem internet', 'Os alunos baixam as aulas no celular e assistem no metrô.', 'Saiba mais')}
    </div>
  </section>
  <section class="ac-carousel" data-ac="carousel" aria-label="Planos" style="--slide:min(240px,78%)">
    <div class="ac-carousel__track">
      ${plan('Básico', 'R$ 49', 'por mês', ['1 loja', 'Checkout e Pix', 'Suporte por e-mail'])}
      ${plan('Pro', 'R$ 129', 'por mês', ['3 lojas', 'Cupons e order bump', 'Relatórios de recompra'])}
      ${plan('Equipe', 'R$ 349', 'por mês', ['10 lojas', '5 pessoas na equipe', 'Suporte prioritário'])}
      ${plan('Empresa', 'Sob consulta', 'contrato anual', ['Lojas ilimitadas', 'SSO e auditoria', 'Gerente de conta'])}
    </div>
  </section>
</div>`,
      api: [['data-ac="carousel"', 'section', '—', 'Precisa de .ac-carousel__track com os slides; monta a cápsula de controles'], ['aria-label', 'texto', 'Carrossel', 'Nome da região'], ['data-autoplay', 'ms', '—', 'Troca sozinho (ex.: 12000); para no hover, no foco e no botão Pausar'], ['--slide / --gap', 'CSS', '100% / 12px', 'Largura de cada slide (ex.: min(240px, 78%) para ver o próximo espiando)'], ['el._carousel', 'objeto', '—', '{ go(i), next(), prev(), pause(), play() }'], ['ac:change', 'evento', '—', 'detail: { index, total }']],
      a11y: ['Região com aria-roledescription “carrossel”; cada slide é um grupo “2 de 4”.', 'Slides fora da vista ficam inert: o Tab não cai num link escondido.', 'Com o foco nos controles, ← → trocam de slide e Home/End vão às pontas; as bolinhas têm um só ponto de Tab e aria-current.', 'O botão Pausar vem primeiro e vale mais que o hover; troca automática some com movimento reduzido.'] }
  ];

  const D = window.DEMOS;
  REFS.forEach(n => { let at = -1; D.forEach((d, i) => { if (d.grupo === n.grupo) at = i; }); D.splice(at + 1, 0, n); });

  // documentação nova em demos antigas
  const add = (id, rows) => { const d = D.find(x => x.id === id); if (d) d.api.push(...rows); };
  add('otp', [['colar', 'texto', '—', 'Acha o código de N dígitos dentro do texto colado (“Seu código: 482 913. Válido por 10 min”) e converte dígitos arábicos (٠–٩, ۰–۹)']]);
  add('table', [['modo cartão', '< 640 px', 'automático', 'Cada linha vira um cartão com data-label; a coluna name é o título (veja Tabela em cartões no celular)']]);
  add('dialog', [['< 640 px', 'CSS', 'automático', 'Vira bottom sheet (veja Diálogo em bottom sheet)'], ['Orthos.confirm / Orthos.alert', 'função', '—', 'Confirmação e alerta montados na hora, com promessa (veja Confirmar e alertar)']]);

  const H = window.DEMO_HOOKS, O = () => window.Orthos;
  /* Moldura de aparelho (.device-demo): o seletor troca a largura entre celular, tablet e computador, sempre centralizada.
     Tamanhos que não cabem na tela de quem vê somem do seletor; se o escolhido sumir, fica o maior que cabe. */
  H.device = root => {
    const frame = root.querySelector('.device-frame'), seg = frame && frame.parentElement.querySelector(':scope > .ac-segmented'); if (!seg) return;
    const host = frame.parentElement, btns = [...seg.querySelectorAll('button')];
    const set = v => { frame.dataset.size = v; frame.style.setProperty('--w', v === 'full' ? '100%' : v + 'px'); };
    const fit = () => {
      const room = host.clientWidth;
      btns.forEach((b, i) => { b.hidden = i > 0 && (b.value === 'full' ? 900 : +b.value + 24) > room; }); // computador = toda a área, só se houver espaço de verdade
      const shown = btns.filter(b => !b.hidden); seg.hidden = shown.length < 2;
      const on = btns.find(b => b.getAttribute('aria-pressed') === 'true');
      if (on && on.hidden) shown[shown.length - 1].click();
    };
    seg.addEventListener('ac:change', () => { const b = btns.find(x => x.getAttribute('aria-pressed') === 'true'); if (b) set(b.value); });
    set(frame.dataset.size || '375'); new ResizeObserver(fit).observe(host); fit();
  };
  H['table-stack'] = root => H.device(root);
  H.password = root => { const f = root.querySelector('#pw-form'); f && f.addEventListener('ac:valid', e => { e.preventDefault(); O().toast({ type: 'success', title: 'Senha alterada', desc: 'Na próxima entrada, use a senha nova.' }); }); };
  H.chat = root => {
    const c = root.querySelector('[data-ac="chat"]'); if (!c) return;
    const log = c.querySelector('.ac-chat__log');
    c.addEventListener('ac:send', e => { const m = document.createElement('div'); m.className = 'ac-msg ac-msg--out'; m.dataset.author = 'Você'; m.dataset.time = 'Agora'; m.innerHTML = `<div class="ac-msg__bubble">${esc(e.detail.text).replace(/\n/g, '<br>')}</div>`; log.appendChild(m); });
    c.addEventListener('ac:retry', e => { const m = e.detail.message; m.classList.remove('ac-msg--error'); m.querySelector('.ac-msg__retry')?.remove(); O().toast({ type: 'success', title: 'Mensagem enviada' }); });
  };
  H.banners = root => root.addEventListener('click', e => { const a = e.target.closest('.ac-banners__action'); if (a) O().toast({ title: a.textContent.trim(), desc: 'Na sua aplicação, este botão leva à tela certa.' }); });
  H['sheet-mobile'] = root => root.addEventListener('click', e => { if (e.target.closest('[data-demo-saved]')) O().toast({ type: 'success', title: 'Endereço salvo' }); });
  H.confirm = root => {
    const out = root.querySelector('#cf-out'), falha = root.querySelector('#cf-falha'); if (!out) return;
    const say = t => { out.textContent = t; };
    root.querySelector('#cf-del').onclick = async () => {
      const ok = await O().confirm({ title: 'Excluir 3 arquivos?', text: 'Os arquivos saem da pasta “Contratos 2026” e da lixeira. Não é possível desfazer.', confirmLabel: 'Excluir 3 arquivos', danger: true,
        onConfirm: () => new Promise((res, rej) => setTimeout(() => falha.checked ? rej(new Error('Sem conexão com o servidor. Nada foi excluído; tente de novo.')) : res(), 1200)) });
      say(ok ? 'Resultado: 3 arquivos excluídos.' : 'Resultado: exclusão cancelada.');
      if (ok) O().toast({ title: '3 arquivos excluídos' });
    };
    root.querySelector('#cf-arq').onclick = async () => { const ok = await O().confirm({ title: 'Arquivar “Site 2026”?', text: 'O projeto sai da lista principal, mas continua em Arquivados e pode voltar quando quiser.', confirmLabel: 'Arquivar projeto' }); say(ok ? 'Resultado: projeto arquivado.' : 'Resultado: nada mudou.'); };
    root.querySelector('#cf-alert').onclick = async () => { await O().alert({ title: 'Sua sessão vai terminar', text: 'Por segurança, saímos da conta em 5 minutos sem uso. Salve o que estiver fazendo.', okLabel: 'Entendi' }); say('Resultado: alerta fechado.'); };
  };
})();
