# GYMTRACKO — Design System

Landing page para o produto GYMTRACKO ("El futuro de tu gimnasio"), migrada de HTML/CSS/JS estático
para React + TypeScript + Vite. Este documento descreve a linguagem visual, as convenções de código
e a estrutura de componentes usadas no projeto.

## 1. Identidade visual

O tom é **dark, editorial e "tech-fitness"**: fundo quase preto, laranja vibrante como cor de destaque
única, tipografia condensada em caixa alta para títulos, muito espaço negativo e animações discretas
de scroll-reveal. A referência estética mistura painel de academia premium com dashboard SaaS.

### Paleta de cores

Definida em `src/styles/variables.css` como custom properties CSS (`:root`):

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#080A0C` | Fundo base da página |
| `--bg2` | `#0D1014` | Fundo de seções alternadas (Admin, Retention) |
| `--bg3` | `#111519` | Fundo em hover de cards |
| `--line` | `rgba(255,255,255,0.06)` | Bordas e divisores sutis |
| `--text` | `#F0EEE8` | Texto principal (off-white quente) |
| `--muted` | `rgba(240,238,232,0.66)` | Texto secundário |
| `--orange` | `#FF5C1A` | Cor de destaque (CTAs, títulos em ênfase, ícones) |
| `--orange-dim` | `rgba(255,92,26,0.15)` | Fundos sutis com tom laranja |
| `--orange-glow` | `rgba(255,92,26,0.35)` | Glows e sombras coloridas |

Cores semânticas pontuais (não tokenizadas, usadas apenas no mockup do painel admin):
verde `#639922` (positivo/ativo), vermelho `#E24B4A` (alerta/negativo), âmbar `#EF9F27` (atenção).

### Tipografia

Duas famílias do Google Fonts, carregadas no `index.html`:

- **`--font-display`**: `'Barlow Condensed'` — títulos, números grandes, labels em uppercase.
  Usada em pesos 300/400/600/700/900 e itálico 700.
- **`--font-body`**: `'Barlow'` — corpo de texto, parágrafos, formulário. Pesos 300/400/500.

Escala tipográfica é majoritariamente fluida via `clamp()` (ex.: `font-size: clamp(72px, 12vw, 160px)`
no título do hero), garantindo responsividade sem breakpoints extras para tamanho de fonte.

### Espaçamento e layout

- Grid/flex nativo do CSS (sem framework de utilitários).
- Padding horizontal padrão de seção: `48px` (desktop) → `32px` (tablet, ≤1024px) → `20px` (mobile, ≤768px).
- Divisores entre seções: `border-top`/`border-bottom: 1px solid var(--line)`.
- `cursor: none` no body (substituído por cursor customizado) em dispositivos com mouse; em touch
  (`@media (hover: none), (pointer: coarse)`) o cursor nativo volta a aparecer.

### Motion

- **Scroll reveal**: cards e blocos entram com `opacity 0 → 1` + `translateY`/`translateX`, disparados
  por `IntersectionObserver` (hook `useInView`), com `transition-delay` escalonado por `nth-child`.
- **Entrada do hero**: sequência de `@keyframes fadeUp`/`fadeIn` com delays crescentes (0.3s → 1.5s).
- **Contadores**: números (`7 días`, `70%`, `$480`) contam de 0 até o valor final com easing cúbico
  ao entrarem em viewport (hook `useCountUp`).
- **Cursor custom**: ponto sólido que segue o mouse 1:1 + anel com lerp (easing) que persegue o ponto,
  ambos implementados via `requestAnimationFrame`.
- **Glitch title**: efeito de distorção RGB-split em "RETENCIÓN" usando `clip-path` animado.
- **Canvas de fundo**: grid estático redesenhado no resize + campo de partículas conectadas (estilo
  "constellation"), ambos em `<canvas>` com `requestAnimationFrame`.

## 2. Metodologia de nomenclatura CSS: BEM + CSS Modules

Cada componente React tem seu próprio arquivo `Componente.module.css`. Dentro de cada módulo, as
classes seguem a convenção **BEM adaptada ao escopo do módulo**:

- O **Bloco** é implícito no arquivo/componente (não precisa repetir o nome do componente no seletor,
  já que o CSS Module já isola o escopo). Ex.: em `Nav.module.css`, a classe raiz é `.nav`.
- **Elemento** → `.bloco__elemento` (ex.: `.nav__logo`, `.nav__dropdown-toggle`,
  `.nav__service-item`).
- **Modificador** → `.bloco__elemento--modificador` ou `.bloco--modificador`
  (ex.: `.nav--scrolled`, `.card--visible`, `.statusDot--red`).

Exemplo (`Nav.module.css`):

```css
.nav { }                       /* Bloco */
.nav--scrolled { }             /* Bloco + modificador */
.nav__logo { }                 /* Elemento */
.nav__dropdown { }             /* Elemento */
.nav__dropdown--open { }       /* Elemento + modificador */
.nav__dropdown-toggle { }      /* Elemento composto */
```

No componente, as classes são combinadas condicionalmente com template strings:

```tsx
<nav className={`${styles.nav} ${scrolled ? styles['nav--scrolled'] : ''}`}>
```

### Por que CSS Modules + BEM

- **CSS Modules** garante isolamento automático (hash único por classe), eliminando colisão de nomes
  entre os ~15 componentes sem precisar prefixar manualmente cada seletor.
- **BEM** dentro de cada módulo mantém a leitura hierárquica (bloco → elemento → estado) legível tanto
  no CSS quanto no JSX, e facilita achar "qual elemento estiliza o quê" em componentes grandes como
  `Admin` ou `Nav`.
- **Keyframes globais**: como `@keyframes` (`fadeUp`, `fadeIn`, `glitch1`, `glitch2`, `ticker`,
  `scrollPulse`, `rotateSlow`) são compartilhados por vários componentes, ficam centralizados em
  `src/styles/animations.css` (arquivo **não** `.module.css`, portanto global). Para referenciá-los
  de dentro de um `.module.css` é necessário o escape `global(...)` do PostCSS Modules — nunca a
  sintaxe de seletor `:global(...)`:

  ```css
  /* correto — dentro de um .module.css */
  animation: global(fadeUp) 0.8s 0.3s forwards;
  ```

## 3. Estrutura de pastas

```
src/
├── components/            # Um componente por pasta: Componente.tsx + Componente.module.css
│   ├── Nav/
│   ├── Hero/
│   ├── HeroPhone/         # mockup de celular fixo, sincronizado por scroll com Features
│   ├── Ticker/
│   ├── Problem/
│   ├── Features/
│   ├── Admin/
│   ├── Retention/
│   ├── Timeline/
│   ├── Testimonial/
│   ├── CtaFinal/
│   ├── Footer/
│   ├── DemoModal/
│   ├── Cursor/            # cursor customizado (global, fixed)
│   ├── GridCanvas/        # grade de fundo em <canvas>
│   └── ParticleCanvas/    # partículas conectadas em <canvas>
├── context/
│   └── DemoModalContext.tsx   # estado global do modal "Agendar demo" (aberto/fechado + negócio pré-selecionado)
├── data/                   # conteúdo estruturado (arrays tipados) consumido via .map() pelos componentes
│   ├── navServices.tsx
│   ├── features.tsx
│   ├── admin.tsx
│   └── timeline.tsx
├── hooks/                   # comportamento client-side extraído do JS original, um hook por efeito
│   ├── useInView.ts               # wrapper de IntersectionObserver
│   ├── useCountUp.ts              # contador animado
│   ├── useCustomCursor.ts
│   ├── useGridCanvas.ts
│   ├── useParticleCanvas.ts
│   ├── useHeroPhoneTilt.ts        # tilt 3D do mockup de celular
│   ├── useHeroPhoneScrollFollow.ts
│   └── useNavScrollEffect.ts
├── styles/
│   ├── variables.css        # tokens de design (:root)
│   ├── reset.css            # reset + estilos base do body
│   └── animations.css       # @keyframes globais
├── App.tsx                  # composição de todas as seções na ordem da página
├── main.tsx
└── index.css                 # agrega variables + reset + animations
```

### Convenções de componente

- Cada seção da página (`Hero`, `Problem`, `Admin`, ...) é uma `<section id="...">` com
  `position: relative; z-index: 10;` no seu bloco raiz — substitui a regra global `section { }` do
  CSS original, já que agora cada seção vive em seu próprio módulo.
- Conteúdo repetido (cards de feature, módulos do admin, itens do menu de serviços, passos do
  timeline) é **data-driven**: um array tipado em `src/data/` + `.map()` no componente, em vez de
  JSX duplicado.
- Efeitos colaterais de DOM/browser (observers, canvas, listeners de scroll/mouse) ficam isolados em
  hooks reutilizáveis em `src/hooks/`, nunca inline nos componentes de seção.
- O modal de demo é global (`DemoModalProvider` envolve toda a `App`) porque é aberto a partir de
  múltiplos pontos independentes: nav (CTA e dropdown de serviços), footer e CTA final.

## 4. Assets

- Vídeo do hero: `public/video/hero.mp4`.
- Imagem de tela do mockup do celular: `public/img/teste.jpg`.
- Favicon: `public/favicon.svg` (anel laranja, mesmo motivo do logo).
- Fontes: carregadas via `<link>` do Google Fonts no `index.html` (não hospedadas localmente).
