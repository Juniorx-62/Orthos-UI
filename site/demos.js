/* Catálogo de componentes exibidos no site. Cada item:
   id, grupo, nome, desc, ref {nome, url} (referência estudada), html (demo ao vivo), api [[prop, tipo, padrão, descrição]], a11y [] */
(function () {
  const I = n => window.Orthos.icon(n);
  const ico = (path) => `<svg class="ac-icon" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  const P = {
    home: '<path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z"/>',
    chart: '<path d="M21 21H10C6.70017 21 5.05025 21 4.02513 19.9749C3 18.9497 3 17.2998 3 14V3"/><path d="M13 10L13 21"/><path d="M18 13L18 21"/><path d="M8 13L8 20"/><path d="M21 7.98693C19.16 7.98693 17.1922 8.24252 15.8771 6.49346C14.3798 4.50218 11.6202 4.50218 10.1229 6.49346C8.80782 8.24252 6.84003 7.98693 5 7.98693H3"/>',
    users: '<path d="M18.4995 20.5C18.2663 17.5685 15.8417 15.2477 12.808 15.0521L11.9995 15C11.7107 15.0076 11.4416 15.0178 11.1877 15.0298C8.18075 15.1723 5.7304 17.5974 5.49951 20.5"/><path d="M15.2495 9.25C15.2495 11.0449 13.7944 12.5 11.9995 12.5C10.2046 12.5 8.74952 11.0449 8.74952 9.25C8.74952 7.45507 10.2046 6 11.9995 6C13.7944 6 15.2495 7.45507 15.2495 9.25Z"/><path d="M5.50249 8.5C5.17908 7.99485 4.99158 7.39432 4.99158 6.75C4.99158 4.95507 6.44665 3.5 8.24157 3.5C8.68752 3.5 9.1125 3.58982 9.49939 3.75235"/><path d="M18.4963 8.5C18.8197 7.99485 19.0072 7.39432 19.0072 6.75C19.0072 4.95507 17.5521 3.5 15.7572 3.5C15.3113 3.5 14.8863 3.58982 14.4994 3.75235"/><path d="M22.0007 17.9996C21.8208 15.7374 19.9995 13.5 17.9995 13"/><path d="M1.99927 17.9996C2.17923 15.7374 4.00049 13.5 6.00049 13"/>',
    inbox: '<path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"/><path d="M21.5 13.5H16.5743C15.7322 13.5 15.0706 14.2036 14.6995 14.9472C14.2963 15.7551 13.4889 16.5 12 16.5C10.5111 16.5 9.70373 15.7551 9.30054 14.9472C8.92942 14.2036 8.26777 13.5 7.42566 13.5H2.5"/>',
    gear: '<path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"/><path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z"/>',
    panel: '<path d="M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z"/><path d="M9.5 3L9.5 21"/><path d="M5 7H6M5 10H6"/>',
    plus: '<path d="M12.001 5.00003V19.002"/><path d="M19.002 12.002L4.99998 12.002"/>',
    dots: '<path d="M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z"/>',
    edit: '<path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"/><path d="M13 4L20 11"/><path d="M14 22L22 22"/>',
    copy: '<path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"/><path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"/>',
    folder: '<path d="M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7"/>',
    calendar: '<path d="M16 2V6M8 2V6"/><path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"/><path d="M3 10H21"/><path d="M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z"/>',
    mail: '<path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"/><path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"/>',
    lock: '<path d="M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z"/><path d="M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9"/><path d="M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z"/>',
    spark: '<path d="M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z"/><path d="M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z"/>',
    bell: '<path d="M15.5 18C15.5 19.933 13.933 21.5 12 21.5C10.067 21.5 8.5 19.933 8.5 18"/><path d="M19.2311 18H4.76887C3.79195 18 3 17.208 3 16.2311C3 15.762 3.18636 15.3121 3.51809 14.9803L4.12132 14.3771C4.68393 13.8145 5 13.0514 5 12.2558V9.5C5 5.63401 8.13401 2.5 12 2.5C15.866 2.5 19 5.634 19 9.5V12.2558C19 13.0514 19.3161 13.8145 19.8787 14.3771L20.4819 14.9803C20.8136 15.3121 21 15.762 21 16.2311C21 17.208 20.208 18 19.2311 18Z"/>'
  };

  const people = [
    { id: 1, name: 'Ana Ribeiro', email: 'ana@estudio.co', role: 'Admin', status: 'Ativo', plan: 1290 },
    { id: 2, name: 'Bruno Costa', email: 'bruno@estudio.co', role: 'Editor', status: 'Pendente', plan: 490 },
    { id: 3, name: 'Carla Mendes', email: 'carla@estudio.co', role: 'Leitor', status: 'Ativo', plan: 0 },
    { id: 4, name: 'Diego Alves', email: 'diego@estudio.co', role: 'Editor', status: 'Inativo', plan: 490 },
    { id: 5, name: 'Elisa Prado', email: 'elisa@estudio.co', role: 'Admin', status: 'Ativo', plan: 1290 },
    { id: 6, name: 'Fábio Nunes', email: 'fabio@estudio.co', role: 'Leitor', status: 'Ativo', plan: 0 },
    { id: 7, name: 'Gabriela Luz', email: 'gabi@estudio.co', role: 'Editor', status: 'Pendente', plan: 490 },
    { id: 8, name: 'Hugo Martins', email: 'hugo@estudio.co', role: 'Leitor', status: 'Inativo', plan: 0 },
    { id: 9, name: 'Isabela Rocha', email: 'isa@estudio.co', role: 'Admin', status: 'Ativo', plan: 1290 },
    { id: 10, name: 'João Pereira', email: 'joao@estudio.co', role: 'Editor', status: 'Ativo', plan: 490 },
    { id: 11, name: 'Karen Souza', email: 'karen@estudio.co', role: 'Leitor', status: 'Pendente', plan: 0 },
    { id: 12, name: 'Lucas Fernandes', email: 'lucas@estudio.co', role: 'Editor', status: 'Ativo', plan: 490 }
  ];
  const cols = [{ k: 'name', label: 'Pessoa', sort: true }, { k: 'role', label: 'Função', sort: true }, { k: 'status', label: 'Status', sort: true }, { k: 'plan', label: 'Plano', sort: true, num: true, money: true }];
  const attr = o => JSON.stringify(o).replace(/&/g, '&amp;').replace(/'/g, '&#39;');
  const countries = [['Brasil', 'BR'], ['Portugal', 'PT'], ['Argentina', 'AR'], ['Chile', 'CL'], ['Colômbia', 'CO'], ['México', 'MX'], ['Espanha', 'ES'], ['Estados Unidos', 'US'], ['Canadá', 'CA'], ['Alemanha', 'DE'], ['França', 'FR'], ['Itália', 'IT'], ['Japão', 'JP'], ['Uruguai', 'UY'], ['Peru', 'PE']].map(([label, hint]) => ({ label, hint }));

  window.DEMOS = [
    /* ---------------- Fundamentos ---------------- */
    { id: 'button', grupo: 'Fundamentos', nome: 'Button', desc: 'Ações com hierarquia clara: uma primária por área, as demais rebaixadas. Inclui estado de carregamento, ícone e variantes de destaque.',
      ref: { nome: 'shadcn/ui · Button', url: 'https://ui.shadcn.com/docs/components/button' },
      html: `<div class="ac-btn-group">
  <button class="ac-btn" type="button">Publicar</button>
  <button class="ac-btn ac-btn--secondary" type="button">Salvar rascunho</button>
  <button class="ac-btn ac-btn--ghost" type="button">Cancelar</button>
  <button class="ac-btn ac-btn--danger" type="button">Excluir</button>
</div>
<div class="ac-btn-group">
  <button class="ac-btn ac-btn--sm" type="button">Pequeno</button>
  <button class="ac-btn ac-btn--lg ac-btn--shimmer" type="button">Começar agora</button>
  <button class="ac-btn ac-btn--secondary ac-btn--icon" type="button" aria-label="Adicionar" data-tip="Adicionar">${ico(P.plus)}</button>
  <button class="ac-btn ac-btn--secondary" type="button" data-loading="true">Enviando</button>
</div>`,
      api: [['.ac-btn--secondary / --ghost / --danger / --accent', 'classe', '—', 'Variantes de ênfase'], ['.ac-btn--sm / --lg', 'classe', 'médio', 'Tamanhos'], ['.ac-btn--icon', 'classe', '—', 'Botão quadrado só com ícone (use aria-label)'], ['.ac-btn--shimmer', 'classe', '—', 'Brilho animado para CTA'], ['data-loading="true"', 'atributo', 'false', 'Mostra spinner e bloqueia cliques']],
      a11y: ['Use <button> para ações e <a> para navegação.', 'Botão só com ícone precisa de aria-label.', 'Foco visível com anel de 3px.'] },

    { id: 'magnetic', grupo: 'Fundamentos', nome: 'Magnetic button', desc: 'Botão que acompanha levemente o cursor, com retorno elástico. Para CTAs de destaque, sem exagero.',
      ref: { nome: 'Motion-Primitives · Magnetic', url: 'https://motion-primitives.com/docs/magnetic' },
      html: `<button class="ac-btn ac-btn--lg" type="button" data-ac="magnetic" data-strength="0.3">Passe o cursor aqui</button>`,
      api: [['data-ac="magnetic"', 'atributo', '—', 'Ativa o efeito'], ['data-strength', 'número', '0.35', 'Intensidade do deslocamento (0–1)']],
      a11y: ['Desativado automaticamente com prefers-reduced-motion.'] },

    { id: 'badge', grupo: 'Fundamentos', nome: 'Badge e Kbd', desc: 'Rótulos curtos de status, sempre com texto (não só cor). Kbd para atalhos de teclado.',
      ref: { nome: 'shadcn/ui · Badge', url: 'https://ui.shadcn.com/docs/components/badge' },
      html: `<div class="ac-btn-group">
  <span class="ac-badge">Rascunho</span>
  <span class="ac-badge ac-badge--solid">Novo</span>
  <span class="ac-badge ac-badge--success"><span class="ac-badge__dot ac-badge__dot--pulse"></span>Online</span>
  <span class="ac-badge ac-badge--warning"><span class="ac-badge__dot"></span>Pendente</span>
  <span class="ac-badge ac-badge--danger"><span class="ac-badge__dot"></span>Falhou</span>
</div>
<div class="ac-btn-group" style="color:var(--ac-text-2);font-size:14px">Abrir busca <kbd class="ac-kbd">⌘</kbd><kbd class="ac-kbd">K</kbd></div>`,
      api: [['.ac-badge--solid / --success / --warning / --danger', 'classe', 'neutro', 'Tom'], ['.ac-badge__dot', 'elemento', '—', 'Ponto de status; --pulse anima'], ['.ac-kbd', 'classe', '—', 'Tecla']],
      a11y: ['O texto do badge comunica o estado; a cor é reforço.'] },

    { id: 'avatar', grupo: 'Fundamentos', nome: 'Avatar', desc: 'Iniciais ou foto, com status e pilha para equipes.',
      ref: { nome: 'Kobra · Avatar', url: 'https://kobra.systems/components/avatar' },
      html: `<div class="ac-btn-group">
  <span class="ac-avatar" data-status="online">AR</span>
  <span class="ac-avatar" data-status="busy">BC</span>
  <div class="ac-avatar-stack" aria-label="5 pessoas na equipe" role="img">
    <span class="ac-avatar" style="background:#e9e4ff;color:#5b3fd6">AR</span><span class="ac-avatar" style="background:#ffe7d6;color:#b4500e">BC</span><span class="ac-avatar" style="background:#dcf5e7;color:#13804a">CM</span><span class="ac-avatar" style="background:#dfeeff;color:#1f5fc4">DA</span><span class="ac-avatar">+3</span>
  </div>
</div>`,
      api: [['data-status', '"online" | "busy"', '—', 'Indicador de presença'], ['.ac-avatar-stack', 'classe', '—', 'Sobrepõe avatares; hover eleva']],
      a11y: ['Em pilhas, descreva o grupo com aria-label.'] },

    { id: 'tooltip', grupo: 'Fundamentos', nome: 'Tooltip', desc: 'Dica curta em hover e foco de teclado. Para ícones e abreviações, nunca para conteúdo essencial.',
      ref: { nome: 'Radix · Tooltip', url: 'https://www.radix-ui.com/primitives/docs/components/tooltip' },
      html: `<div class="ac-btn-group">
  <button class="ac-btn ac-btn--secondary ac-btn--icon" type="button" aria-label="Copiar" data-tip="Copiar link">${ico(P.copy)}</button>
  <button class="ac-btn ac-btn--secondary ac-btn--icon" type="button" aria-label="Editar" data-tip="Editar (E)">${ico(P.edit)}</button>
  <button class="ac-btn ac-btn--secondary" type="button" data-tip="Aparece embaixo" data-tip-side="bottom">Embaixo</button>
</div>`,
      api: [['data-tip', 'texto', '—', 'Conteúdo da dica'], ['data-tip-side', '"top" | "bottom"', 'top', 'Lado preferido']],
      a11y: ['Abre com foco de teclado e fecha com Esc.', 'Vinculada por aria-describedby.'] },

    /* ---------------- Formulários ---------------- */
    { id: 'input', grupo: 'Formulários', nome: 'Input e Field', desc: 'Campo com rótulo, ajuda e erro associados. Ícones, atalho e contador de caracteres.',
      ref: { nome: 'shadcn/ui · Field', url: 'https://ui.shadcn.com/docs/components/field' },
      html: `<div style="display:grid;gap:18px;width:min(360px,100%)">
  <div class="ac-field"><label class="ac-label" for="d-email">E-mail</label><input class="ac-input" id="d-email" type="email" placeholder="nome@empresa.com"><p class="ac-hint">Usaremos só para avisos da conta.</p></div>
  <div class="ac-field"><label class="ac-label ac-sr" for="d-busca">Buscar</label><div class="ac-input-wrap">${I('search')}<input class="ac-input" id="d-busca" placeholder="Buscar projetos"><kbd class="ac-kbd">/</kbd></div></div>
  <div class="ac-field"><label class="ac-label" for="d-bio">Bio</label><textarea class="ac-textarea" id="d-bio" maxlength="120" data-ac="counter" placeholder="Conte em poucas palavras"></textarea></div>
  <div class="ac-field"><label class="ac-label" for="d-erro">Usuário</label><input class="ac-input" id="d-erro" value="ana ribeiro" aria-invalid="true" aria-describedby="d-erro-m"><p class="ac-error" id="d-erro-m">${I('alert')}Use apenas letras, números e ponto.</p></div>
</div>`,
      api: [['.ac-field', 'container', '—', 'Agrupa rótulo, controle, ajuda e erro'], ['aria-invalid="true"', 'atributo', '—', 'Estado de erro'], ['data-ac="counter"', 'textarea', '—', 'Contador usando maxlength'], ['.ac-input-wrap', 'container', '—', 'Ícone à esquerda e kbd à direita']],
      a11y: ['label for/id em todo campo.', 'Erro ligado via aria-describedby e escrito em texto.'] },

    { id: 'form', grupo: 'Formulários', nome: 'Validação de formulário', desc: 'Valida ao sair do campo e ao enviar, com mensagens específicas em português, foco no primeiro erro e retorno de sucesso.',
      ref: { nome: 'GOV.UK · Validation', url: 'https://design-system.service.gov.uk/patterns/validation/' },
      html: `<form class="ac-card" data-ac="validate" style="width:min(400px,100%)">
  <div class="ac-card__head"><h3 class="ac-card__title">Criar conta</h3><p class="ac-card__desc">Leva menos de um minuto.</p></div>
  <div class="ac-card__body" style="display:grid;gap:14px">
    <div class="ac-field"><label class="ac-label" for="f-nome">Nome</label><input class="ac-input" id="f-nome" required autocomplete="name"></div>
    <div class="ac-field"><label class="ac-label" for="f-mail">E-mail</label><input class="ac-input" id="f-mail" type="email" required autocomplete="email"></div>
    <div class="ac-field"><label class="ac-label" for="f-senha">Senha</label><input class="ac-input" id="f-senha" type="password" required minlength="8" autocomplete="new-password"><p class="ac-hint">Mínimo de 8 caracteres.</p></div>
    <label class="ac-check"><input type="checkbox" required id="f-termos"><span>Aceito os termos de uso</span></label>
  </div>
  <div class="ac-card__foot"><button class="ac-btn" type="submit">Criar conta</button></div>
</form>`,
      api: [['data-ac="validate"', '<form>', '—', 'Ativa validação nativa com mensagens próprias'], ['required / minlength / type="email" / pattern', 'HTML', '—', 'Regras usadas'], ['data-pattern-msg', 'texto', '—', 'Mensagem para pattern']],
      a11y: ['Erros aparecem em texto ao lado do campo.', 'Ao enviar com erros, o foco vai para o primeiro campo inválido.'] },

    { id: 'otp', grupo: 'Formulários', nome: 'Input OTP', desc: 'Código segmentado num único campo: um anel desliza até a casa ativa, os dígitos entram girando, colar deixa um rastro e, ao completar, as casas ondulam enquanto o código é conferido. Certo: varredura verde com salto. Errado: limpa, anel vermelho e mensagem.',
      ref: { nome: 'Kobra · Input OTP', url: 'https://kobra.systems/components/input-otp' },
      html: `<div style="display:grid;gap:12px;justify-items:center">
  <div class="ac-otp" data-ac="otp" data-length="6" data-valid="888813"></div>
  <p class="ac-hint">Código de teste: <code>888813</code> (cole também “Seu código: 888 813”)</p>
</div>`,
      api: [['data-length', 'número', '6', 'Quantidade de dígitos'], ['data-valid', 'texto', '—', 'Código esperado (demo); omita para validar fora'], ['data-delay', 'ms', '700', 'Tempo da conferência com data-valid'], ['data-error / data-success', 'texto', '—', 'Mensagens de erro e de acerto'], ['data-name / data-label / data-disabled', 'atributos', '—', 'Nome no formulário, rótulo do campo, desativado'], ['ac:complete', 'evento', '—', 'detail: { value, valid, resolve(ok, mensagem) }; sem data-valid, chame resolve depois de conferir no servidor'], ['data-state', 'saída', '—', 'pending | success | error'], ['--otp-size', 'CSS', '56px', 'Tamanho da casa (no celular encolhe até 11vw)']],
      a11y: ['Um único campo com rótulo “Código de verificação, 6 dígitos”; as casas são só desenho (aria-hidden).', 'autocomplete="one-time-code": o SMS preenche o código inteiro de uma vez, também no iOS.', 'Erro e acerto aparecem em texto num role="status"; o campo ganha aria-invalid no erro e aria-busy enquanto confere.', 'Setas, Home e End movem entre as casas; movimento reduzido desliga rastros, saltos e a onda.'] },

    { id: 'choice', grupo: 'Formulários', nome: 'Checkbox, Radio e Switch', desc: 'Controles nativos estilizados, com estado indeterminado e animação de mola.',
      ref: { nome: 'Radix · Switch', url: 'https://www.radix-ui.com/primitives/docs/components/switch' },
      html: `<div style="display:grid;gap:22px 56px;grid-template-columns:repeat(auto-fit,minmax(180px,max-content));justify-content:center;width:100%">
  <fieldset style="border:0;padding:0;margin:0;display:grid;gap:12px"><legend class="ac-label" style="margin-bottom:10px">Notificações</legend>
    <label class="ac-check"><input type="checkbox" checked><span>Comentários<small>Quando alguém responder</small></span></label>
    <label class="ac-check"><input type="checkbox"><span>Menções</span></label>
  </fieldset>
  <fieldset style="border:0;padding:0;margin:0;display:grid;gap:12px"><legend class="ac-label" style="margin-bottom:10px">Frequência</legend>
    <label class="ac-check"><input type="radio" name="freq" checked><span>Imediata</span></label>
    <label class="ac-check"><input type="radio" name="freq"><span>Resumo diário</span></label>
  </fieldset>
  <div style="display:grid;gap:14px;align-content:start">
    <label class="ac-switch"><input type="checkbox" role="switch" checked><span>Modo foco</span></label>
    <label class="ac-switch"><input type="checkbox" role="switch"><span>Sons</span></label>
  </div>
</div>`,
      api: [['.ac-check > input[type=checkbox|radio]', 'HTML', '—', 'Checkbox e radio'], ['.ac-switch > input[role=switch]', 'HTML', '—', 'Alternador de efeito imediato']],
      a11y: ['Controles nativos: teclado e leitores de tela funcionam sem JS.', 'Agrupe opções em <fieldset> com <legend>.'] },

    { id: 'slider', grupo: 'Formulários', nome: 'Slider', desc: 'Range nativo com trilha preenchida, valor ao vivo e polegar que cresce ao arrastar.',
      ref: { nome: 'Radix · Slider', url: 'https://www.radix-ui.com/primitives/docs/components/slider' },
      html: `<div style="display:grid;gap:20px;width:min(360px,100%)">
  <div class="ac-field"><label class="ac-label" for="s1">Volume</label><div class="ac-slider-row"><input class="ac-slider" id="s1" type="range" min="0" max="100" value="64" data-ac="slider"><output for="s1"></output></div></div>
  <div class="ac-field"><label class="ac-label" for="s2">Desconto</label><div class="ac-slider-row"><input class="ac-slider" id="s2" type="range" min="0" max="50" step="5" value="15" data-ac="slider" data-suffix="%"><output for="s2"></output></div></div>
</div>`,
      api: [['data-ac="slider"', 'input range', '—', 'Atualiza preenchimento e <output>'], ['data-suffix', 'texto', '—', 'Sufixo do valor']],
      a11y: ['Range nativo: setas, Home/End e Page Up/Down.'] },

    { id: 'segmented', grupo: 'Formulários', nome: 'Segmented control', desc: 'Grupo de opções exclusivas com pílula deslizante.',
      ref: { nome: 'Kobra · Toggle Group', url: 'https://kobra.systems/components/toggle-group' },
      html: `<div class="ac-segmented" data-ac="segmented" aria-label="Período">
  <button type="button" aria-pressed="true">Dia</button><button type="button">Semana</button><button type="button">Mês</button><button type="button">Ano</button>
</div>`,
      api: [['data-ac="segmented"', 'container', '—', 'Ativa o grupo'], ['ac:change', 'evento', '—', 'detail: texto da opção']],
      a11y: ['Botões com aria-pressed; o grupo tem aria-label.'] },

    { id: 'combobox', grupo: 'Formulários', nome: 'Combobox', desc: 'Seleção com busca, destaque do trecho encontrado, teclado completo e estado vazio.',
      ref: { nome: 'shadcn/ui · Combobox', url: 'https://ui.shadcn.com/docs/components/combobox' },
      html: `<div class="ac-field" style="width:min(300px,100%)"><label class="ac-label" for="cb-pais">País</label><div class="ac-combo" data-ac="combo" data-options='${attr(countries)}'><input class="ac-input ac-select" id="cb-pais" placeholder="Selecione um país"></div></div>`,
      api: [['data-options', 'JSON', '[]', 'Lista de { label, hint }'], ['ac:change', 'evento', '—', 'detail: opção escolhida']],
      a11y: ['Padrão ARIA combobox com aria-activedescendant.', '↑ ↓ navegam, Enter escolhe, Esc fecha.'] },

    { id: 'datepicker', grupo: 'Formulários', nome: 'Date picker', desc: 'Calendário em popover com navegação por mês e por setas, em português.',
      ref: { nome: 'shadcn/ui · Date Picker', url: 'https://ui.shadcn.com/docs/components/date-picker' },
      html: `<div class="ac-field"><span class="ac-label" id="dp-l">Data de entrega</span><button class="ac-btn ac-btn--secondary ac-btn--square ac-date-trigger" type="button" data-ac="datepicker" data-empty aria-labelledby="dp-l">${ico(P.calendar)}<span>Escolha uma data</span></button></div>`,
      api: [['data-ac="datepicker"', 'button', '—', 'Abre o calendário'], ['ac:change', 'evento', '—', 'detail: Date']],
      a11y: ['Setas movem entre dias; Enter seleciona; Esc fecha e devolve o foco.'] },

    { id: 'dropzone', grupo: 'Formulários', nome: 'File dropzone', desc: 'Arraste e solte com reação visual, lista de arquivos e progresso de envio (simulado).',
      ref: { nome: 'Kobra · Magnetic Dropzone', url: 'https://kobra.systems/components/magnetic-dropzone' },
      html: `<div style="width:min(420px,100%)">
  <div class="ac-drop" data-ac="dropzone" aria-label="Enviar arquivos"><span class="ac-drop__icon">${I('upload')}</span><strong>Solte arquivos aqui</strong><span>ou clique para escolher · até 10 MB</span><input type="file" multiple hidden></div>
  <ul class="ac-files" aria-label="Arquivos"></ul>
</div>`,
      api: [['data-ac="dropzone"', 'container', '—', 'Precisa de <input type=file> dentro e .ac-files logo após']],
      a11y: ['Focável e ativável com Enter/Espaço.', 'Progresso com role="progressbar".'] },

    { id: 'palette', grupo: 'Formulários', nome: 'Color palette 3D', desc: 'Seletor de cor em esferas, feito neste projeto. Hover destaca a esfera e afasta as vizinhas; o clique seleciona.',
      ref: { nome: 'Kobra · Color Palette (inspiração visual)', url: 'https://kobra.systems/components/color-palette' },
      html: `<div style="display:grid;gap:16px;justify-items:center"><div data-ac="palette" id="pal-demo" style="--size:200px"></div><p class="ac-hint" id="pal-out">Escolha uma cor</p></div>`,
      api: [['data-ac="palette"', 'div', '—', 'Gera 19 esferas'], ['--size', 'CSS', '200px', 'Diâmetro'], ['ac:change', 'evento', '—', 'detail: { name, color }'], ['dataset.value', 'leitura', '—', 'Cor selecionada']],
      a11y: ['radiogroup com setas para navegar.', 'Respeita prefers-reduced-motion.'] },

    /* ---------------- Navegação ---------------- */
    { id: 'tabs', grupo: 'Navegação', nome: 'Tabs', desc: 'Abas com indicador que desliza até a aba ativa e painel que entra suavemente.',
      ref: { nome: 'shadcn/ui · Tabs', url: 'https://ui.shadcn.com/docs/components/tabs' },
      html: `<div class="ac-tabs" data-ac="tabs" style="width:min(440px,100%)">
  <div class="ac-tabs__list" aria-label="Seções do projeto"><button class="ac-tabs__tab" type="button" aria-selected="true">Visão geral</button><button class="ac-tabs__tab" type="button">Métricas</button><button class="ac-tabs__tab" type="button">Relatórios</button><button class="ac-tabs__tab" type="button">Ajustes</button></div>
  <div class="ac-tabs__panel">Acompanhe métricas e o progresso dos projetos ativos. Você tem 12 projetos ativos e 3 tarefas pendentes.</div>
  <div class="ac-tabs__panel">Receita de outubro cresceu 18% em relação ao mês anterior.</div>
  <div class="ac-tabs__panel">Nenhum relatório agendado. Crie o primeiro para receber por e-mail.</div>
  <div class="ac-tabs__panel">Preferências do espaço de trabalho.</div>
</div>`,
      api: [['data-ac="tabs"', 'container', '—', 'Precisa de .ac-tabs__list, .ac-tabs__tab e .ac-tabs__panel'], ['aria-selected="true"', 'tab', '1ª', 'Aba inicial']],
      a11y: ['Padrão ARIA tabs: ← → Home End.', 'Só a aba ativa entra na ordem de Tab.'] },

    { id: 'sidebar', grupo: 'Navegação', nome: 'Sidebar', desc: 'Menu lateral agrupado, com item ativo marcado e modo recolhido com tooltips.',
      ref: { nome: 'shadcn/ui · Sidebar', url: 'https://ui.shadcn.com/docs/components/sidebar' },
      html: `<nav class="ac-sidebar" data-ac="sidebar" aria-label="Principal">
  <div class="ac-sidebar__head"><span class="ac-sidebar__brand"><span class="ac-sidebar__logo"></span><span>Estúdio</span></span><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-ac-toggle aria-label="Recolher menu" aria-expanded="true">${ico(P.panel)}</button></div>
  <a class="ac-sidebar__item" href="#" aria-current="page">${ico(P.home)}<span class="ac-sidebar__text">Início</span></a>
  <a class="ac-sidebar__item" href="#">${ico(P.inbox)}<span class="ac-sidebar__text">Caixa de entrada</span><span class="ac-badge">4</span></a>
  <a class="ac-sidebar__item" href="#">${ico(P.chart)}<span class="ac-sidebar__text">Relatórios</span></a>
  <div class="ac-sidebar__label">Equipe</div>
  <a class="ac-sidebar__item" href="#">${ico(P.users)}<span class="ac-sidebar__text">Pessoas</span></a>
  <a class="ac-sidebar__item" href="#">${ico(P.gear)}<span class="ac-sidebar__text">Configurações</span></a>
  <div class="ac-sidebar__resize" data-ac-resize></div>
</nav>`,
      api: [['data-ac="sidebar"', 'nav', '—', 'Ativa itens e o botão de recolher'], ['data-collapsed', '"true" | "false"', 'false', 'Estado recolhido'], ['[data-ac-toggle]', 'botão', '—', 'Alterna o modo'], ['.ac-sidebar__resize[data-ac-resize]', 'alça', '—', 'Arrastar muda a largura (200–420 px); abaixo de 180 px recolhe; duplo clique volta ao padrão'], ['data-width', 'px', '240', 'Largura padrão (a escolhida fica salva no navegador)']],
      a11y: ['aria-current="page" no item ativo.', 'No modo recolhido, os rótulos viram tooltips.', 'A alça é um separador focável: ← → mudam a largura (Shift anda mais), Home/End vão ao mínimo e ao máximo.'] },

    { id: 'menu', grupo: 'Navegação', nome: 'Dropdown menu', desc: 'Menu de ações com atalhos, separadores e ação destrutiva destacada.',
      ref: { nome: 'Radix · Dropdown Menu', url: 'https://www.radix-ui.com/primitives/docs/components/dropdown-menu' },
      html: `<button class="ac-btn ac-btn--secondary" type="button" data-ac="menu" data-target="#menu-demo">Opções ${I('chevron')}</button>
<div class="ac-pop" id="menu-demo" hidden>
  <div class="ac-menu__label">Projeto</div>
  <button class="ac-menu__item" type="button">${ico(P.edit)}Renomear<kbd class="ac-kbd">R</kbd></button>
  <button class="ac-menu__item" type="button">${ico(P.copy)}Duplicar<kbd class="ac-kbd">D</kbd></button>
  <button class="ac-menu__item" type="button">${ico(P.folder)}Mover para…</button>
  <div class="ac-menu__sep" role="separator"></div>
  <button class="ac-menu__item ac-menu__item--danger" type="button">${I('trash')}Excluir</button>
</div>`,
      api: [['data-ac="menu"', 'botão', '—', 'Gatilho'], ['data-target', 'seletor', '—', 'O .ac-pop do menu'], ['data-align', '"start" | "end"', 'start', 'Alinhamento'], ['ac:select', 'evento', '—', 'detail: item escolhido']],
      a11y: ['↓ abre e foca o 1º item; ↑ ↓ navegam; Esc fecha e devolve o foco.'] },

    { id: 'command', grupo: 'Navegação', nome: 'Command palette', desc: 'Busca de ações e páginas com agrupamento, teclado e atalho global.',
      ref: { nome: 'shadcn/ui · Command (cmdk)', url: 'https://ui.shadcn.com/docs/components/command' },
      html: `<button class="ac-btn ac-btn--secondary" type="button" id="cmd-demo" style="min-width:260px;justify-content:space-between">${I('search')}<span style="flex:1;text-align:left;color:var(--ac-text-3)">Buscar…</span><kbd class="ac-kbd">Ctrl K</kbd></button>`,
      api: [['Orthos.command({ items })', 'função', '—', 'items: { label, group, hint, keywords, run }']],
      a11y: ['Combobox dentro de <dialog>; foco preso e Esc fecha.'] },

    { id: 'breadcrumb', grupo: 'Navegação', nome: 'Breadcrumb e Pagination', desc: 'Trilha de localização e paginação compacta.',
      ref: { nome: 'shadcn/ui · Breadcrumb', url: 'https://ui.shadcn.com/docs/components/breadcrumb' },
      html: `<nav aria-label="Trilha"><ol class="ac-crumbs"><li><a href="#">Início</a></li><li><a href="#">Projetos</a></li><li><a href="#">Site 2026</a></li><li><span aria-current="page">Configurações</span></li></ol></nav>
<nav class="ac-pager" aria-label="Paginação"><button type="button" disabled aria-label="Anterior">${I('left')}</button><button type="button" aria-current="page">1</button><button type="button">2</button><button type="button">3</button><span>…</span><button type="button">12</button><button type="button" aria-label="Próxima">${I('right')}</button></nav>`,
      api: [['.ac-crumbs', '<ol>', '—', 'Trilha'], ['.ac-pager', '<nav>', '—', 'Paginação; aria-current="page" na atual']],
      a11y: ['<nav> com aria-label; página atual com aria-current.'] },

    { id: 'stepper', grupo: 'Navegação', nome: 'Stepper', desc: 'Etapas com progresso preenchendo a linha e conclusão animada.',
      ref: { nome: 'Ant Design · Steps', url: 'https://ant.design/components/steps' },
      html: `<div data-ac="stepper" style="width:min(560px,100%);display:grid;gap:22px">
  <ol class="ac-steps"><li data-state="current">Conta</li><li>Equipe</li><li>Plano</li><li>Revisão</li></ol>
  <div class="ac-btn-group" style="justify-content:flex-end"><button class="ac-btn ac-btn--ghost" type="button" data-step="-1">Voltar</button><button class="ac-btn" type="button" data-step="1">Continuar</button></div>
</div>`,
      api: [['data-ac="stepper"', 'container', '—', 'Controla .ac-steps'], ['data-step="1|-1"', 'botão', '—', 'Avança/volta']],
      a11y: ['Etapa atual com aria-current="step".'] },

    { id: 'accordion', grupo: 'Navegação', nome: 'Accordion', desc: 'Perguntas frequentes com abertura suave de altura automática.',
      ref: { nome: 'Motion-Primitives · Accordion', url: 'https://motion-primitives.com/docs/accordion' },
      html: `<div class="ac-accordion" data-ac="accordion" style="width:min(480px,100%)">
  <div class="ac-accordion__item is-open"><button class="ac-accordion__trigger" type="button">Posso cancelar quando quiser?${ico(P.plus)}</button><div class="ac-accordion__panel"><div><p>Sim. O cancelamento vale no fim do ciclo e você mantém o acesso até lá.</p></div></div></div>
  <div class="ac-accordion__item"><button class="ac-accordion__trigger" type="button">Há desconto anual?${ico(P.plus)}</button><div class="ac-accordion__panel"><div><p>O plano anual sai 20% mais barato que doze meses no mensal.</p></div></div></div>
  <div class="ac-accordion__item"><button class="ac-accordion__trigger" type="button">Meus dados ficam no Brasil?${ico(P.plus)}</button><div class="ac-accordion__panel"><div><p>Sim, em data centers em São Paulo, com backup diário.</p></div></div></div>
</div>`,
      api: [['data-ac="accordion"', 'container', '—', 'Ativa'], ['data-type="multiple"', 'atributo', 'single', 'Permite vários abertos'], ['.is-open', 'classe', '—', 'Item aberto inicialmente']],
      a11y: ['Botões com aria-expanded e aria-controls.'] },

    /* ---------------- Feedback ---------------- */
    { id: 'toast', grupo: 'Feedback', nome: 'Toast', desc: 'Notificações empilhadas com entrada em mola, pausa no hover e ação de desfazer.',
      ref: { nome: 'shadcn/ui · Toast', url: 'https://ui.shadcn.com/docs/components/sonner' },
      html: `<div class="ac-btn-group">
  <button class="ac-btn ac-btn--secondary" type="button" data-demo-toast="success">Sucesso</button>
  <button class="ac-btn ac-btn--secondary" type="button" data-demo-toast="undo">Com desfazer</button>
  <button class="ac-btn ac-btn--secondary" type="button" data-demo-toast="danger">Erro</button>
  <button class="ac-btn ac-btn--secondary" type="button" data-demo-toast="promise">Com promessa</button>
</div>`,
      api: [['Orthos.toast({ title, desc, type, action, duration })', 'função', '—', 'type: "default" | "success" | "danger" | "loading"; action: { label, onClick }; retorna uma função que fecha, com .update()'], ['Orthos.toast.promise(promessa, { loading, success, error })', 'função', '—', 'Aviso que acompanha a tarefa: carregando, depois sucesso ou erro'], ['Alt+T', 'atalho', '—', 'Leva o foco ao aviso mais recente; Esc o dispensa'], ['arrastar para a direita', 'gesto', '—', 'Dispensa o aviso']],
      a11y: ['Região aria-live="polite" criada no carregamento: o primeiro aviso também é anunciado.', 'Erros usam role="alert".', 'Alt+T foca os avisos; a pilha abre com foco ou hover.', 'Não some enquanto o cursor está em cima.'] },

    { id: 'alert', grupo: 'Feedback', nome: 'Alert e Banner', desc: 'Avisos em contexto, que ficam até serem lidos.',
      ref: { nome: 'shadcn/ui · Alert', url: 'https://ui.shadcn.com/docs/components/alert' },
      html: `<div style="display:grid;gap:12px;width:min(520px,100%)">
  <div class="ac-banner">Nova versão disponível. <a href="#">Ver novidades →</a></div>
  <div class="ac-alert" role="status">${I('info')}<p class="ac-alert__title">Manutenção programada</p><p class="ac-alert__text">Sábado, das 2h às 4h. Os relatórios podem atrasar.</p></div>
  <div class="ac-alert ac-alert--success" role="status">${I('check')}<p class="ac-alert__title">Pagamento confirmado</p><p class="ac-alert__text">O recibo foi enviado para financeiro@estudio.co.</p></div>
  <div class="ac-alert ac-alert--danger" role="alert">${I('alert')}<p class="ac-alert__title">Não foi possível sincronizar</p><p class="ac-alert__text">Verifique a conexão e tente de novo. Nada foi perdido.</p></div>
</div>`,
      api: [['.ac-alert--success / --warning / --danger', 'classe', 'neutro', 'Tom'], ['.ac-banner', 'classe', '—', 'Faixa de aviso global']],
      a11y: ['Use role="alert" só para erros urgentes.'] },

    { id: 'dialog', grupo: 'Feedback', nome: 'Dialog e confirmação', desc: 'Modal nativo com entrada em mola, saída suave e confirmação destrutiva que explica o impacto.',
      ref: { nome: 'Radix · Alert Dialog', url: 'https://www.radix-ui.com/primitives/docs/components/alert-dialog' },
      html: `<div class="ac-btn-group">
  <button class="ac-btn ac-btn--secondary" type="button" data-ac-open="#dlg-edit">Editar perfil</button>
  <button class="ac-btn ac-btn--danger" type="button" data-ac-open="#dlg-del">Excluir projeto</button>
</div>
<dialog class="ac ac-dialog" id="dlg-edit" aria-labelledby="dlg-edit-t"><form class="ac-dialog__in" method="dialog">
  <h2 class="ac-dialog__title" id="dlg-edit-t">Editar perfil</h2><p class="ac-dialog__desc">As alterações aparecem para toda a equipe.</p>
  <div class="ac-field"><label class="ac-label" for="dlg-n">Nome</label><input class="ac-input" id="dlg-n" value="Ana Ribeiro"></div>
  <div class="ac-dialog__actions"><button class="ac-btn ac-btn--ghost" type="button" data-ac-close>Cancelar</button><button class="ac-btn" type="button" data-ac-close="ok" data-demo-saved>Salvar</button></div>
</form></dialog>
<dialog class="ac ac-dialog" id="dlg-del" aria-labelledby="dlg-del-t" aria-describedby="dlg-del-d"><div class="ac-dialog__in">
  <span class="ac-dialog__icon">${I('alert')}</span>
  <h2 class="ac-dialog__title" id="dlg-del-t">Excluir “Site 2026”?</h2>
  <p class="ac-dialog__desc" id="dlg-del-d">Os 48 arquivos e 3 integrações deste projeto serão removidos. Não é possível desfazer.</p>
  <div class="ac-dialog__actions"><button class="ac-btn ac-btn--ghost" type="button" data-ac-close autofocus>Cancelar</button><button class="ac-btn ac-btn--danger" type="button" data-ac-close="del" data-demo-deleted>Excluir projeto</button></div>
</div></dialog>`,
      api: [['data-ac-open="#id"', 'gatilho', '—', 'Abre o <dialog>'], ['data-ac-close', 'botão', '—', 'Fecha com animação'], ['Orthos.open / close', 'função', '—', 'Controle por código']],
      a11y: ['<dialog> nativo: foco preso, Esc e clique fora fecham.', 'Na confirmação destrutiva, o foco inicial vai para “Cancelar”.'] },

    { id: 'sheet', grupo: 'Feedback', nome: 'Sheet (painel lateral)', desc: 'Painel lateral para edições longas sem perder o contexto da página.',
      ref: { nome: 'shadcn/ui · Sheet', url: 'https://ui.shadcn.com/docs/components/sheet' },
      html: `<button class="ac-btn ac-btn--secondary" type="button" data-ac-open="#sheet-demo">Abrir filtros</button>
<dialog class="ac ac-sheet" id="sheet-demo" aria-labelledby="sheet-t"><div class="ac-sheet__in">
  <div class="ac-sheet__head"><div><h2 class="ac-dialog__title" id="sheet-t">Filtros</h2><p class="ac-hint" style="margin:4px 0 0">Refine a lista de pessoas.</p></div><button class="ac-btn ac-btn--ghost ac-btn--icon ac-btn--sm" type="button" data-ac-close aria-label="Fechar">${I('x')}</button></div>
  <div class="ac-sheet__body">
    <div class="ac-field"><label class="ac-label" for="sh-f">Função</label><select class="ac-select" id="sh-f"><option>Todas</option><option>Admin</option><option>Editor</option></select></div>
    <label class="ac-switch"><input type="checkbox" role="switch" checked><span>Somente ativos</span></label>
    <div class="ac-field"><label class="ac-label" for="sh-s">Plano mínimo</label><div class="ac-slider-row"><input class="ac-slider" id="sh-s" type="range" min="0" max="1290" step="10" value="490" data-ac="slider"><output for="sh-s"></output></div></div>
  </div>
  <div class="ac-sheet__foot"><button class="ac-btn ac-btn--ghost" type="button" data-ac-close>Limpar</button><button class="ac-btn" type="button" data-ac-close>Aplicar</button></div>
</div></dialog>`,
      api: [['.ac-sheet', '<dialog>', '—', 'Painel à direita'], ['data-ac-open / data-ac-close', 'gatilhos', '—', 'Iguais ao Dialog']],
      a11y: ['Mesmo comportamento de foco do Dialog.'] },

    { id: 'progress', grupo: 'Feedback', nome: 'Progress e Spinner', desc: 'Progresso determinado (barra e anel), indeterminado e indicadores de espera curta.',
      ref: { nome: 'Material 3 · Progress indicators', url: 'https://m3.material.io/components/progress-indicators/overview' },
      html: `<div style="display:grid;gap:22px;width:min(420px,100%)">
  <div class="ac-field"><div style="display:flex;justify-content:space-between" class="ac-label"><span id="pg-l">Importando contatos</span><span class="ac-number" id="pg-v">0%</span></div><div class="ac-progress" id="pg-bar" style="--v:0%" role="progressbar" aria-labelledby="pg-l" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div></div>
  <div class="ac-progress" data-indeterminate role="progressbar" aria-label="Carregando"></div>
  <div class="ac-btn-group" style="gap:22px"><svg class="ac-ring" viewBox="0 0 56 56" style="--v:.72" role="img" aria-label="72% concluído"><circle class="t" cx="28" cy="28" r="22"/><circle class="v" cx="28" cy="28" r="22"/></svg><span class="ac-spinner" role="status" aria-label="Carregando"></span><span class="ac-dots" role="status" aria-label="Carregando"><i></i><i></i><i></i></span><button class="ac-btn ac-btn--secondary ac-btn--sm" type="button" id="pg-run">Simular importação</button></div>
</div>`,
      api: [['.ac-progress (--v)', 'CSS', '40%', 'Barra; data-indeterminate para indeterminado'], ['.ac-ring (--v)', 'SVG', '0.65', 'Anel de 0 a 1'], ['.ac-spinner / .ac-dots', 'classe', '—', 'Esperas curtas']],
      a11y: ['role="progressbar" com aria-valuenow.'] },

    { id: 'skeleton', grupo: 'Feedback', nome: 'Skeleton automático', desc: 'Gera o esqueleto medindo a interface real, como o boneyard: os blocos batem com o layout final.',
      ref: { nome: 'boneyard', url: 'https://boneyard.vercel.app/overview' },
      html: `<div style="display:grid;gap:14px;width:min(460px,100%)">
  <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
    <div class="ac-segmented" data-ac="segmented" id="skel-toggle" aria-label="Estado"><button type="button" aria-pressed="true" value="real">Interface real</button><button type="button" value="skel">Skeleton</button></div>
    <div class="ac-segmented" data-ac="segmented" id="skel-anim" aria-label="Animação"><button type="button" aria-pressed="true" value="shimmer">Brilho</button><button type="button" value="pulse">Pulso</button><button type="button" value="static">Parado</button></div>
    <label class="ac-check"><input type="checkbox" id="skel-cascade" checked> Cascata</label>
  </div>
  <article class="ac-card" id="skel-card"><div class="ac-card__body" style="display:grid;gap:14px">
    <div style="display:flex;gap:12px;align-items:center"><span class="ac-avatar">AR</span><div><div style="font-weight:600">Ana Ribeiro</div><div class="ac-hint">publicou há 2 horas</div></div><span class="ac-badge ac-badge--success" style="margin-left:auto">Ativo</span></div>
    <p style="margin:0;color:var(--ac-text-2);font-size:14px;line-height:1.55">Finalizamos a nova versão do painel. As métricas agora carregam três vezes mais rápido.</p>
    <div data-ac="bars" data-values="4,7,5,9,6,11,8,12" style="height:80px"></div>
  </div></article>
</div>`,
      api: [['Orthos.skeleton(el, true|false, opções)', 'função', '—', 'Liga/desliga o esqueleto medido do conteúdo de el'], ['animation', 'opção', 'shimmer', 'shimmer (brilho), pulse (pulso, mais calmo) ou static (parado); ou data-skeleton-animation'], ['cascade', 'opção', 'false', 'Cada osso começa 80 ms depois do de cima; ou data-skeleton-cascade'], ['delay', 'opção', '0', 'Espera menor que isso nem mostra o esqueleto; ou data-skeleton-delay'], ['.ac-skel--pulse / .ac-skel--static', 'classe', '—', 'As mesmas variantes no .ac-skel avulso'], ['ao desligar', 'comportamento', '—', 'Se o esqueleto chegou a aparecer, o conteúdo entra com fade de .3 s']],
      a11y: ['Marca aria-busy="true" enquanto carrega; os ossos ficam aria-hidden.'] },

    { id: 'empty', grupo: 'Feedback', nome: 'Empty state', desc: 'Estado vazio que explica o que falta e oferece o próximo passo.',
      ref: { nome: 'Carbon · Empty states', url: 'https://carbondesignsystem.com/patterns/empty-states-pattern/' },
      html: `<div class="ac-empty" style="width:min(440px,100%)"><span class="ac-empty__icon">${ico(P.folder)}</span><h4>Nenhum projeto ainda</h4><p>Projetos reúnem arquivos, pessoas e prazos. Crie o primeiro ou importe de outra ferramenta.</p><div class="ac-btn-group"><button class="ac-btn ac-btn--sm" type="button">${ico(P.plus)}Novo projeto</button><button class="ac-btn ac-btn--ghost ac-btn--sm" type="button">Importar</button></div></div>`,
      api: [['.ac-empty', 'container', '—', 'Ícone, título, texto e ações']],
      a11y: ['Texto orienta a ação; não use só ilustração.'] },

    /* ---------------- Dados ---------------- */
    { id: 'table', grupo: 'Dados', nome: 'Data table', desc: 'Tabela com busca, filtro de status, ordenação, seleção em lote com desfazer, paginação e estado vazio.',
      ref: { nome: 'shadcn/ui · Data Table', url: 'https://ui.shadcn.com/docs/components/data-table' },
      wide: true,
      html: `<div data-ac="table" style="width:100%" data-per-page="5" data-columns='${attr(cols)}' data-rows='${attr(people)}'></div>`,
      api: [['data-columns', 'JSON', '—', '{ k, label, sort, num, money }'], ['data-rows', 'JSON', '—', 'Registros (precisam de id)'], ['data-per-page', 'número', '5', 'Linhas por página']],
      a11y: ['Cabeçalhos com aria-sort.', 'Checkbox “selecionar página” com estado indeterminado.', 'Contagem anunciada via aria-live.'] },

    { id: 'stats', grupo: 'Dados', nome: 'Stat cards e gráficos', desc: 'Indicadores com número animado, variação, sparkline que se desenha e barras com tooltip.',
      ref: { nome: 'shadcn/ui · Chart', url: 'https://ui.shadcn.com/docs/components/chart' },
      wide: true,
      html: `<div style="display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));width:100%">
  <article class="ac-card ac-spotlight" data-ac="spotlight"><div class="ac-card__body"><div class="ac-stat__label">Receita <span class="ac-stat__delta ac-stat__delta--up">+18,2%</span></div><div class="ac-stat__value"><span data-ac="number" data-to="48290.5" data-decimals="2" data-prefix="R$ ">R$ 0</span></div><div data-ac="spark" data-values="12,18,15,22,19,28,26,34,31,40"></div></div></article>
  <article class="ac-card ac-spotlight" data-ac="spotlight"><div class="ac-card__body"><div class="ac-stat__label">Clientes ativos <span class="ac-stat__delta ac-stat__delta--up">+42</span></div><div class="ac-stat__value"><span data-ac="number" data-to="1284">0</span></div><div data-ac="spark" data-values="30,32,31,35,38,37,41,44,47,52"></div></div></article>
  <article class="ac-card ac-spotlight" data-ac="spotlight"><div class="ac-card__body"><div class="ac-stat__label">Cancelamentos <span class="ac-stat__delta ac-stat__delta--down">+0,4 p.p.</span></div><div class="ac-stat__value"><span data-ac="number" data-to="2.1" data-decimals="1" data-suffix="%">0</span></div><div data-ac="spark" data-values="8,7,9,6,7,8,10,9,11,12"></div></div></article>
</div>
<article class="ac-card" style="width:100%"><div class="ac-card__head"><h3 class="ac-card__title">Vendas por mês</h3><p class="ac-card__desc">2026, em milhares de reais</p></div><div class="ac-card__body"><div data-ac="bars" data-label="Vendas por mês em 2026" data-values="32,41,38,52,47,61,58,66,72,69,80,91" data-labels="Jan,Fev,Mar,Abr,Mai,Jun,Jul,Ago,Set,Out,Nov,Dez"></div></div></article>`,
      api: [['data-ac="number"', 'span', '—', 'data-to, data-decimals, data-prefix, data-suffix'], ['data-ac="spark"', 'div', '—', 'data-values separados por vírgula'], ['data-ac="bars"', 'div', '—', 'data-values, data-labels, data-label'], ['data-ac="spotlight"', 'card', '—', 'Luz que segue o cursor']],
      a11y: ['Barras focáveis mostram o valor; o gráfico tem aria-label.'] },

    /* ---------------- Movimento ---------------- */
    { id: 'text-effect', grupo: 'Movimento', nome: 'Text effect', desc: 'Texto que entra palavra por palavra, com desfoque e deslocamento.',
      ref: { nome: 'Motion-Primitives · Text Effect', url: 'https://motion-primitives.com/docs/text-effect' },
      html: `<p class="ac-text-effect" data-ac="text-effect" style="font:600 clamp(22px,4vw,34px)/1.2 var(--ac-font);letter-spacing:-.03em;margin:0;text-align:center;max-width:16ch">Interfaces calmas para trabalho sério.</p>`,
      api: [['data-ac="text-effect"', 'elemento', '—', 'Divide em palavras e anima'], ['el._replay()', 'função', '—', 'Reexecuta']],
      a11y: ['Texto completo em aria-label; palavras animadas aria-hidden.'] },

    { id: 'text-shimmer', grupo: 'Movimento', nome: 'Text shimmer e scramble', desc: 'Brilho percorrendo o texto (útil em “Pensando…”) e embaralhamento no hover.',
      ref: { nome: 'Motion-Primitives · Text Shimmer', url: 'https://motion-primitives.com/docs/text-shimmer' },
      html: `<div style="display:grid;gap:18px;justify-items:center">
  <span class="ac-text-shimmer" style="font:500 18px var(--ac-font)">Gerando relatório…</span>
  <span class="ac-scramble" data-ac="scramble" tabindex="0" style="font-size:18px;letter-spacing:.08em">PASSE O CURSOR</span>
</div>`,
      api: [['.ac-text-shimmer', 'classe', '—', 'Brilho contínuo'], ['data-ac="scramble"', 'elemento', '—', 'Embaralha no hover/foco']],
      a11y: ['Scramble mantém o texto real no aria-label.'] },

    { id: 'marquee', grupo: 'Movimento', nome: 'Marquee', desc: 'Faixa contínua de logos ou depoimentos, que pausa no hover.',
      ref: { nome: 'Magic UI · Marquee', url: 'https://magicui.design/docs/components/marquee' },
      html: `<div class="ac-marquee" style="width:100%;font:600 18px var(--ac-font);color:var(--ac-text-3)" aria-label="Clientes"><div class="ac-marquee__track"><span>Northwind</span><span>Acme Co.</span><span>Globex</span><span>Initech</span><span>Umbrella</span><span>Hooli</span></div><div class="ac-marquee__track" aria-hidden="true"><span>Northwind</span><span>Acme Co.</span><span>Globex</span><span>Initech</span><span>Umbrella</span><span>Hooli</span></div></div>`,
      api: [['.ac-marquee > .ac-marquee__track ×2', 'HTML', '—', 'Duplique a trilha (a 2ª com aria-hidden)'], ['--gap', 'CSS', '40px', 'Espaço entre itens']],
      a11y: ['Pausa no hover; parado com prefers-reduced-motion.'] }
  ];

  /* comportamentos extras só das demonstrações */
  window.DEMO_HOOKS = {
    // a biblioteca só valida; a demo simula o envio e o retorno de sucesso
    form: root => { const f = root.querySelector('[data-ac="validate"]'); f && f.addEventListener('ac:valid', e => {
      e.preventDefault();
      const btn = f.querySelector('[type="submit"]'); if (btn) btn.dataset.loading = 'true';
      setTimeout(() => { if (btn) btn.dataset.loading = 'false'; Orthos.toast({ type: 'success', title: 'Conta criada', desc: 'Enviamos um link de confirmação para o seu e-mail.' }); f.reset(); }, 1100);
    }); },
    toast: root => root.addEventListener('click', e => {
      const b = e.target.closest('[data-demo-toast]'); if (!b) return;
      const t = b.dataset.demoToast;
      if (t === 'success') Orthos.toast({ type: 'success', title: 'Alterações salvas', desc: 'Tudo sincronizado há instantes.' });
      if (t === 'undo') Orthos.toast({ title: 'Arquivo movido para a lixeira', action: { label: 'Desfazer', onClick: () => Orthos.toast({ type: 'success', title: 'Arquivo restaurado' }) } });
      if (t === 'danger') Orthos.toast({ type: 'danger', title: 'Falha no envio', desc: 'Sem conexão. Tentaremos de novo em 30 s.' });
    }),
    dialog: root => root.addEventListener('click', e => {
      if (e.target.closest('[data-demo-saved]')) Orthos.toast({ type: 'success', title: 'Perfil atualizado' });
      if (e.target.closest('[data-demo-deleted]')) Orthos.toast({ title: 'Projeto excluído' });
    }),
    command: root => { const b = root.querySelector('#cmd-demo'); b && b.addEventListener('click', () => window.openSiteCommand && window.openSiteCommand()); },
    palette: root => { const p = root.querySelector('#pal-demo'), o = root.querySelector('#pal-out'); p && p.addEventListener('ac:change', e => { o.innerHTML = `Selecionada: <b style="color:var(--ac-text)">${e.detail.name}</b> <code>${e.detail.color}</code>`; }); },
    progress: root => { const b = root.querySelector('#pg-run'), bar = root.querySelector('#pg-bar'), v = root.querySelector('#pg-v'); b && b.addEventListener('click', () => { let x = 0; b.disabled = true; const t = setInterval(() => { x = Math.min(100, x + 4 + Math.random() * 9); bar.style.setProperty('--v', x + '%'); bar.setAttribute('aria-valuenow', Math.round(x)); v.textContent = Math.round(x) + '%'; if (x >= 100) { clearInterval(t); b.disabled = false; Orthos.toast({ type: 'success', title: '1.284 contatos importados' }); } }, 160); }); },
    skeleton: root => {
      const seg = root.querySelector('#skel-toggle'), card = root.querySelector('#skel-card'), anim = root.querySelector('#skel-anim'), cas = root.querySelector('#skel-cascade'); if (!seg) return;
      let on = false, animation = 'shimmer';
      const paint = () => Orthos.skeleton(card, on, { animation, cascade: cas.checked });
      seg.addEventListener('ac:change', e => { on = e.detail === 'skel' || e.detail === 'Skeleton'; paint(); });
      anim.addEventListener('ac:change', e => { animation = { Brilho: 'shimmer', Pulso: 'pulse', Parado: 'static' }[e.detail] || e.detail; if (on) paint(); });
      cas.addEventListener('change', () => { if (on) paint(); });
    }
  };
})();
