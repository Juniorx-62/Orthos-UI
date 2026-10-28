# Pesquisa de referências: Orthos UI

Data das observações: **27/10/2026**. Navegador embutido (Chromium), sem login, sem enviar formulários e sem aceitar banners.
Nenhum código, texto, imagem ou marca foi copiado. Os achados abaixo são medições e padrões observados.

## Método

Em cada site, a página inicial (ou a página pública equivalente) foi aberta em três larguras:

| Largura | Viewport | O que foi medido |
|---|---|---|
| Desktop | 1440 × 900 | Fonte e tamanho base, título (tamanho, peso, tracking), cores, `color-scheme`, quantidade de variáveis CSS, regras de `prefers-reduced-motion` e de tema escuro, raio e transição dos botões (os 3 valores mais comuns), atributos ARIA, landmarks, skip link, imagens com `loading=lazy`, layout shift (CLS acumulado) e rolagem horizontal |
| Tablet | 768 × 1024 | Rolagem horizontal e presença de botão de menu |
| Mobile | 390 × 844 | Rolagem horizontal, botão de menu e alvos de toque menores que 24 px (WCAG 2.5.8) |

Também foram examinados de perto o comportamento do toast (Sonner), as regras CSS de diálogo (shadcn/ui e Base UI) e os catálogos de componentes (shadcn/ui, Radix, Base UI e Ant Design), para a análise de frequência.

Limitações: a medição automática vê o CSS que a página expõe (folhas de outra origem podem ficar de fora) e a página inicial, não todas as telas. Valores de transição vêm dos botões e links.

## 1. Sites da lista fixa

Legenda: **rm** = regras de `prefers-reduced-motion`; **dark** = regras de tema escuro; **aria** = aria-label / aria-expanded / aria-live / role; **mob <24px** = alvos menores que 24 px no mobile.

| Site (URL) | Tipografia (desktop) | Título h1 | Raio dos botões | Transição mais comum | Tokens e tema | A11y observada | Tablet / mobile |
|---|---|---|---|---|---|---|---|
| shadcn/ui · https://ui.shadcn.com/ | Geist 16px | 48px / 600 / −2,4px | 10px; 18–19,6px | 150ms cubic-bezier(0.4,0,0.2,1) | 101 variáveis; rm 3; dark 15; usa `@container` | aria 26/8/2/70; sem skip link; CLS 0 | Sem rolagem lateral; menu em botão |
| Radix · https://www.radix-ui.com/ | Untitled Sans 16px | 66px / 400 / −3,3px | 4px; 6px | (nenhuma no botão) | 1.287 variáveis (escalas de cor); rm 8; dark 13 | aria 11/11/0/15; sem skip | Sem rolagem lateral |
| Material 3 · https://m3.material.io/ | Google Sans Text 16px | 96px / 475 | 48px (pílula); 50% (FAB) | 200ms cubic-bezier(0.2,…) | 267 variáveis; dark 6 | **skip link**; aria-live 16; imagens lazy 17/17 | Sem rolagem lateral |
| Ant Design · https://ant.design/ | system-ui 14px | — | 6px; 4px; 8px | 200ms cubic-bezier(0.645,…) | 833 variáveis (CSS-in-JS); dark 62 | aria 72/2/2/112; sem skip | Sem rolagem lateral; mobile não mediu alvos (camada fixa) |
| Carbon · https://carbondesignsystem.com/ | IBM Plex Sans 16px | 187px / 200 (display) | **0px** | 110ms ease; 70ms | dark 0 (tema via outro CSS) | aria-expanded 37; roles 157 | Sem rolagem lateral |
| Fluent 2 · https://fluent2.microsoft.design/ | Segoe UI 18px | 40px / 600 / −1,6px | 8px; 2px | 100ms ease; 150ms ease-in-out | rm 16 | **skip link**; aria 17/13/2/13 | Tablet com menu; mobile renderiza com largura mínima de 455px; 8/129 alvos pequenos |
| Bootstrap · https://getbootstrap.com/ | **Geist** 16px, cores em **oklch** | 48px / 600 / −1,2px | 8px; 12px; 10px | 150ms ease-in-out | 492 variáveis; rm 11; dark 5 | **skip link**; CLS 0,003 | Menu em botão; mobile 25/39 alvos pequenos |
| Tailwind Plus · https://tailwindcss.com/plus | InterVariable, oklch | — | — | — | — | — | **Redireciona para /plus/login: conteúdo não analisado** (exige conta) |
| Headless UI · https://headlessui.com/ | Inter var 16px | 48px / 600 / −1,2px | 16px | — | — | aria baixa na home | Menu em botão; 0/20 alvos pequenos |
| Aceternity UI · https://ui.aceternity.com/ | fonte local 16px | 48px / 600 / −1,2px | 10px; 7,6px | 150ms cubic-bezier(0.4,0,0.2,1) | 94 variáveis; dark 22 | imagens lazy 81/111 | Menu em botão; **127/233 alvos pequenos** |
| Magic UI · https://magicui.design/ | **Geist**, oklch | 72px / 600 / −3,6px | 14px; 10px | 200ms e 150ms (curva Tailwind) | 136 variáveis; dark 11 | lazy 88/130 | Menu em botão; 26/153 alvos pequenos |
| 21st.dev · https://21st.dev/ | General Sans; tema **escuro** | 85px / 700 / −4,2px | 8px; 10px | 120ms ease; 150ms; 180ms ease | rm 15; dark 36 | lazy 86/109 | Menu em botão; **102/202 alvos pequenos** |
| Mobbin · https://mobbin.com/ | fonte no conteúdo (body sem fonte) | 32px / 700 | — | — | — | lazy 286/295 | **Rolagem horizontal no desktop e tablet** (faixa de telas); mobile ok |
| Page Flows · https://pageflows.com/ | Geist | 57px / 700 / −3px | 10px; 8px | — | 89 variáveis | **0/224 imagens lazy** | **Rolagem horizontal no tablet**; sem botão de menu no mobile |
| Land-book · https://land-book.com/ | Inter 14px | 24,5px / 600 | pílula (800px) | 200ms ease; 80ms ease-out | 475 variáveis; rm 41; dark 174 | lazy 29/35 | Sem rolagem; 62/137 alvos pequenos |
| Refero · https://refero.design/ | Base Variable | 50px / 400 / −1px | 12px | 200–300ms ease | 156 variáveis | **0 aria-label**; quase sem landmarks | Sem rolagem; 36/92 alvos pequenos |
| Dribbble · https://dribbble.com/ | Mona Sans | 52px / 600 | pílula; 50% | 50ms; 250ms ease-in-out; 200ms cubic-bezier(0.34,1.56,…) (mola) | 457 variáveis | aria-label 129; roles 185 | Menu em botão; 88/254 alvos pequenos |
| Awwwards · https://www.awwwards.com/ | Inter Tight 14px | 127px / 600 | 8px | 300ms ease | 179 variáveis | aria-label 45 | Menu em botão; 53/121 alvos pequenos |

## 2. Sites descobertos (não estavam na lista)

Critério de "em alta": **downloads semanais no npm** (api.npmjs.org, semana de 20 a 26/10/2026) e **estrelas no GitHub** (api.github.com), consultados em 27/10/2026. Ficaram de fora sites sem métrica pública verificável (por exemplo Linear, Stripe, Notion e Godly).

| Site | Por que entrou | Achados |
|---|---|---|
| Base UI · https://base-ui.com/ | **Tendência**: `@base-ui/react` com 17,0 mi downloads/semana, 11,2 mil estrelas. As docs do shadcn/ui agora abrem na variante `/base/` | `color-scheme: light dark`; transições por `data-starting-style`/`data-ending-style`; diálogos aninhados com keyframes próprios; botão "View as Markdown" na doc; catálogo inclui Meter, Number Field, OTP Field, Toolbar, Preview Card |
| React Aria · https://react-aria.adobe.com/ | **Qualidade técnica** (acessibilidade): 4,6 mi/semana | aria-label 160, aria-expanded 35, roles 286; `color-scheme: light dark`; **rolagem horizontal no tablet**; 47/142 alvos pequenos |
| Vercel Geist · https://vercel.com/geist/introduction | **Popularidade**: pacote `geist` com 2,58 mi/semana; fonte adotada por shadcn, Bootstrap, Magic UI e outros | Geist 16px; h1 40/600/−2,4px; raio 6px/4px; 200 e 150ms; dark 49; 2/20 alvos pequenos |
| Mantine · https://mantine.dev/ | **Popularidade**: 2,47 mi/semana; 31,9 mil estrelas | 1.327 variáveis; 645 regras de tema; raio 8px; 100ms ease e 250ms ease |
| Chakra UI · https://chakra-ui.com/ | **Popularidade**: 1,41 mi/semana; 40,7 mil estrelas | Wix Madefor Text; raio 4px; 200ms ease; lazy 4/203 |
| MUI · https://mui.com/ | **Popularidade**: `@mui/material` com 8,87 mi/semana | IBM Plex Sans; raio 18/12px; 250ms cubic-bezier(0.4,…); **72 regras de movimento reduzido**; **skip link** |
| HeroUI · https://heroui.com/ | **Popularidade**: 722 mil/semana; 31 mil estrelas | Cores em `lab()`; raio 24px, pílula e 12px; 250ms ease e cubic-bezier(0.165,…) |
| React Bits · https://reactbits.dev/ | **Tendência**: 50,4 mil estrelas (efeitos e animações) | Tema escuro; Geist; 150–200ms cubic-bezier(0.23,1,0.32,1) (ease-out forte); rm 35 |
| coss / Origin UI · https://coss.com/ | **Tendência**: 10,8 mil estrelas | Cores em `lab()`; h1 84/600/−2,94px; **grupos de botões com raios unidos** (10px só nas pontas); 150ms |
| Sonner · https://sonner.emilkowal.ski/ | **Popularidade**: 38,6 mi downloads/semana (toasts) | Região `<section aria-label="Notifications alt+T" aria-live="polite" aria-relevant="additions text">`; **atalho Alt+T** para focar; toasts empilhados (`data-front`, `data-index`), **arrastar para dispensar** (`data-swiping`), **toast de promessa** (`data-promise`); transição de 400ms em transform/opacity/height; espaço de 14px; canto inferior direito |

## 3. Projeto 4squad (referência própria)

Caminho: `C:\Users\4Selet\www\4squad\frontend\src\components\base` (React 19, Radix, Tailwind 4, Hugeicons). Por ser código seu, os padrões podem ser portados diretamente para HTML/JS. Peças que o Orthos ainda não tem:

- **Erro.tsx**: uma página de erro só, que muda pelo código: 404, 403, 401 (sessão encerrada), 500, 503 (manutenção), offline e erro genérico. Os botões dependem de quem está vendo.
- **Periodo.tsx**: atalhos de 7 e 30 dias, mais calendário com atalhos por nome e dois meses lado a lado (um no celular).
- **SeletorPessoas.tsx**: seleção múltipla com busca, etiquetas com rosto e X, e teclado completo.
- **Graficos.tsx**: área com comparação ao período anterior, colunas, horas de pico, barra empilhada, barras horizontais, barra de meta, gráfico vazio e “Ver tabela” com os mesmos números.
- **Navegar.tsx**: trilha que recolhe os passos do meio, cartão recolhível, painel flutuante, menu “…” da linha e filtro de lista.
- **CampoCodigo.tsx**: OTP com anel que desliza entre as casas, onda ao colar, aceita o código no meio de um texto e números arábicos.
- **Faixas.tsx**: faixas de aviso que se revezam a cada 10 s e param no hover ou foco.
- **Carregando.tsx**: espera longa (“Leva de 1 a 2 minutos”) sem travar a tela.
- **Conversa.tsx**, **Aparelhos.tsx** (molduras de celular e navegador) e **RecorteFoto.tsx** (recorte com prévia).

## 4. Padrões comuns e tendências

1. **Tipografia:** a Geist virou padrão de fato (shadcn, Bootstrap, Magic UI, Page Flows, Geist e React Bits), seguida da família Inter. Títulos grandes com tracking negativo de −0,025 a −0,05 em.
2. **Cor:** migração para `oklch()`/`lab()` (Bootstrap, Tailwind, Magic UI, 21st.dev, HeroUI e coss). Tokens semânticos via variáveis CSS são unânimes.
3. **Movimento:** a faixa de 150–200ms com cubic-bezier(0.4,0,0.2,1) é a mais comum. Overlays e toasts ficam em 300–400ms. A Carbon usa 70–110ms em ações produtivas. A mola, cubic-bezier(0.34,1.56,0.64,1), aparece em microinterações (Dribbble). Regras de `prefers-reduced-motion` existem em 21 de 28 sites.
4. **Raio:** botões de 6 a 10px na maioria. Pílulas no Material, Land-book, Dribbble e HeroUI. A Carbon é quadrada.
5. **Tema escuro:** presente em quase todos. Base UI e React Aria declaram `color-scheme: light dark`.
6. **Acessibilidade:** skip link em só 4 de 28 sites (Material, Fluent, Bootstrap e MUI). Alvos de toque menores que 24px são comuns nos sites de galeria e efeitos (Aceternity 55%, 21st.dev 50%, Bootstrap 64%). Regiões `aria-live` persistentes para toasts (Sonner).
7. **Performance percebida:** CLS praticamente 0 em todos. Imagens lazy são a norma em galerias, com exceção do Page Flows (0/224).
8. **Responsividade:** menu em botão no mobile é o padrão. Houve rolagem horizontal em Mobbin (desktop e tablet), Page Flows (tablet) e React Aria (tablet).
9. **Docs com IA:** “View as Markdown” (Base UI) e “Copy Page” (shadcn/ui) são documentação pronta para colar em assistentes.
10. **Catálogo mais frequente** (shadcn, Radix, Base UI, Ant e Kobra): Accordion, Alert Dialog, Avatar, Checkbox, Collapsible, Combobox, Context Menu, Dialog, Drawer, Dropdown/Menu, Hover Card, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, **Select**, Separator, Slider, Switch, Tabs, Toast, **Toggle/Toggle Group**, **Toolbar** e Tooltip.

## 5. Orthos medido com o mesmo método

Sem rolagem horizontal em 390px, **0/57 alvos menores que 24px**, skip link presente, movimento reduzido e tema escuro presentes.
**Problema encontrado:** a região de toasts só é criada no primeiro toast, então leitores de tela podem não anunciar o primeiro aviso. O Sonner mantém a região viva desde o carregamento.
