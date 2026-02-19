# CSS Utility Functions

A collection of reusable CSS custom native functions using the new `@function` syntax.

⚠️ **Experimental Feature**: CSS `@function` is currently experimental. Check [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/@function#browser_compatibility) before using in production.

## Installation

```bash
npm install css-utility-functions
```

Or download and include in your project.

## Usage

### Option 1: Use Bundled Version (Recommended)

```css
/* All functions in one file */
@import 'css-utility-functions';

/* Or use minified version */
@import 'css-utility-functions/dist/index.min.css';
```

### Option 2: Import Individual Functions

```css
@import 'css-utility-functions/src/alpha.css';
@import 'css-utility-functions/src/fluid.css';
/* ... import only what you need */
```

### Option 3: Development (Source Files)

```css
@import './src/index.css';
```

## Building

```bash
# Install dependencies
npm install

# Build bundled version
npm run build

# Build minified version
npm run build:min

# Build both
npm run build:all

# Watch for changes
npm run watch
```

## Available Functions

### Color Utilities

#### `--alpha()`
Creates a semi-transparent version of any color.

```css
.overlay {
  background: --alpha(#6366f1, 0.2);
}
```

#### `--lighten()` / `--darken()`
Adjust a color's lightness. Use decimal values (0.1 = 10%, 0.2 = 20%).

```css
.btn:hover {
  background: --lighten(var(--btn-bg), 0.15);
}
```

#### `--saturate()` / `--desaturate()`
Adjust a color's saturation/chroma. Use decimal values (0.4 = 40%, 1.0 = 100%).

```css
.vibrant {
  background: --saturate(var(--primary), 0.4);
}
```

#### `--mix()`
Blend two colors by percentage.

```css
.tinted {
  background: --mix(white, var(--brand), 90%);
}
```

#### `--contrast-text()`
Auto-select black or white text for optimal contrast.

```css
.badge {
  background: var(--badge-color);
  color: --contrast-text(var(--badge-color));
}
```

---

### Spacing & Sizing

#### `--space()`
Consistent spacing scale (4px base).

```css
.card {
  padding: --space(4);        /* 1rem */
  gap: --space(2);            /* 0.5rem */
}
```

#### `--fluid()`
Responsive sizing that scales smoothly between viewports.

```css
h1 {
  font-size: --fluid(1.5rem, 4rem);
}
```

#### `--ratio-height()`
Calculate height from width and aspect ratio.

```css
.video-thumb {
  width: 320px;
  height: --ratio-height(320px, 16, 9);  /* 180px */
}
```

---

### Visual Effects

#### `--shadow()`
Elevation shadows based on level (1-5). Optionally control shadow direction with angle parameter.

```css
.card {
  box-shadow: --shadow(2);
}

.lit-from-top-right {
  box-shadow: --shadow(3, oklch(0% 0 0 / 0.15), 135deg);
}

.lit-from-left {
  box-shadow: --shadow(2, oklch(0% 0 0 / 0.1), 180deg);
}
```

#### `--bevel()`
Inset elevation shadows for embossed/debossed effects. Optionally control light source direction with angle parameter.

```css
.pressed-button {
  box-shadow: --bevel(2);
}

.lit-from-top {
  box-shadow: --bevel(2, oklch(0% 0 0 / 0.1), 270deg);
}

.input-field {
  box-shadow: --bevel(1, oklch(0% 0 0 / 0.08), 90deg);
}
```

---

### Layout Utilities

#### `--neg()`
Negate a value (useful for negative margins).

```css
.pull-up {
  margin-top: --neg(var(--header-height));
}
```

---

### Unit Conversion

#### `--to-rem()` / `--to-px()`
Convert between pixels and rem (assumes 16px base).

```css
.legacy {
  font-size: --to-rem(18);    /* 1.125rem */
  width: --to-px(10);         /* 160px */
}
```

---

## Quick Reference

| Function | Purpose | Example |
|----------|---------|---------|
| **Color Utilities** |||
| `--alpha()` | Color transparency | `--alpha(blue, 0.3)` |
| `--lighten()` | Increase lightness | `--lighten(#333, 0.2)` |
| `--darken()` | Decrease lightness | `--darken(#ccc, 0.1)` |
| `--saturate()` | Boost saturation | `--saturate(gray, 0.5)` |
| `--desaturate()` | Reduce saturation | `--desaturate(#f00, 0.3)` |
| `--mix()` | Blend colors | `--mix(red, blue, 25%)` |
| `--contrast-text()` | Auto text color | `--contrast-text(var(--bg))` |
| `--grayscale()` | Remove saturation | `--grayscale(#6366f1)` |
| `--invert()` | Invert lightness | `--invert(#fff)` → `#000` |
| `--complement()` | Complementary color | `--complement(blue)` → orange |
| **Spacing & Sizing** |||
| `--space()` | Spacing scale | `--space(4)` → `1rem` |
| `--fluid()` | Viewport-responsive sizing | `--fluid(1rem, 3rem)` |
| `--fluid-container()` | Container-responsive sizing | `--fluid-container(1rem, 2rem)` |
| `--ratio-height()` | Aspect ratio calc | `--ratio-height(100px, 16, 9)` |
| **Visual Effects** |||
| `--shadow()` | Elevation shadows | `--shadow(3)` |
| `--bevel()` | Inset shadows (emboss/deboss) | `--bevel(2)` |
| `--diagonal-lines()` | Diagonal line pattern | `--diagonal-lines(--angle: 45deg)` |
| **Layout Utilities** |||
| `--neg()` | Negate value | `--neg(2rem)` → `-2rem` |
| **Math Utilities** |||
| `--lerp()` | Linear interpolation | `--lerp(100px, 500px, 0.5)` |
| `--circle-x()` / `--circle-y()` | Circle coordinates | `--circle-x(100px, 45deg)` |
| `--modular()` | Typographic scale | `--modular(2, 1rem, 1.25)` |
| `--poly-angle()` | Polygon vertex angle | `--poly-angle(6, 0)` |
| **Unit Conversion** |||
| `--to-rem()` | px → rem | `--to-rem(16)` → `1rem` |
| `--to-px()` | rem → px | `--to-px(2)` → `32px` |
| **Logic Operations** |||
| `--not()` | Boolean negation | `--not(1)` → `0` |
| `--and()` | Logical AND | `--and(1, 1)` → `1` |
| `--or()` | Logical OR | `--or(0, 1)` → `1` |
| `--xor()` | Exclusive OR | `--xor(1, 0)` → `1` |
| `--nand()` | NOT AND | `--nand(1, 1)` → `0` |
| `--nor()` | NOT OR | `--nor(0, 0)` → `1` |
| `--xnor()` | Exclusive NOR | `--xnor(1, 1)` → `1` |

---

## Browser Support

CSS `@function` is an experimental feature. Check [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@function) for current browser support.

## License

MIT (or your preferred license)

