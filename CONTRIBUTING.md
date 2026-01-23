# Contributing Guide

Thank you for your interest in contributing to CSS Utility Functions! This guide will help you understand how to add, edit, and document CSS functions in this project.

## Table of Contents

- [Project Structure](#project-structure)
- [Adding a New CSS Function](#adding-a-new-css-function)
- [Editing Existing Functions](#editing-existing-functions)
- [Documentation Requirements](#documentation-requirements)
- [Code Style & Conventions](#code-style--conventions)
- [Build Process](#build-process)
- [Testing](#testing)
- [Pull Request Guidelines](#pull-request-guidelines)

---

## Project Structure

```
css-utility-functions/
├── src/                          # Source CSS files
│   ├── index.css                 # Main entry point (imports all functions)
│   ├── colors/                   # Color manipulation functions
│   ├── spacing/                  # Spacing & sizing utilities
│   ├── effects/                  # Visual effects
│   ├── layout/                   # Layout utilities
│   ├── math/                     # Mathematical functions
│   ├── units/                    # Unit conversion
│   └── logic/                    # Logical operations
├── dist/                         # Built output (generated)
│   ├── index.css                 # Bundled CSS
│   └── index.min.css             # Minified CSS
├── docs/                         # Documentation
│   ├── html/                     # HTML component system
│   │   ├── layout.html           # Main template
│   │   ├── partials/             # Reusable components
│   │   └── sections/             # Function documentation
│   └── index.html                # Generated documentation
└── add-header.js                 # Script to inject header comments
```

---

## Adding a New CSS Function

### Step 1: Create the CSS Function File

1. **Choose the appropriate category**:
   - `colors/` - Color manipulation (lighten, darken, mix, etc.)
   - `spacing/` - Spacing and sizing utilities
   - `effects/` - Visual effects (shadows, patterns, etc.)
   - `layout/` - Layout utilities (positioning, etc.)
   - `math/` - Mathematical operations
   - `units/` - Unit conversions
   - `logic/` - Boolean/logical operations

2. **Create a new file** in the appropriate directory:
   ```bash
   src/colors/my-function.css
   ```

3. **Follow the function template**:

```css
/**
 * --my-function() — Brief Description
 *
 * Detailed description of what the function does.
 * Explain the use case and behavior clearly.
 *
 * @param {type} --param-name - Parameter description, default: value
 * @param {type} --optional-param - Optional parameter description, default: value
 * @returns {type} - Return value description
 *
 * @example
 * .example {
 *   property: --my-function(value1, value2);
 * }
 */

@function --my-function(
  --param-name <type>,
  --optional-param <type>: default-value
) returns <type> {
  result: /* your calculation here */;
}
```

### Step 2: Add Import to `src/index.css`

Add your function import in the appropriate section:

```css
/* Color Utilities */
@import './colors/alpha.css';
@import './colors/my-function.css';  /* Add your import here */
```

**Important**: Maintain alphabetical order within each category.

### Step 3: Create Documentation Section

1. **Create documentation file**:
   ```bash
   docs/html/sections/colors/my-function.html
   ```

2. **Use this template**:

```html
<section id="my-function" class="function-section">
  <header>
    <h1><a href="#my-function">--my-function()</a></h1>
    <a href="https://github.com/yairEO/css-utility-functions/blob/main/src/colors/my-function.css" target="_blank">Source code</a>
  </header>
  <p class="function-description">
    Brief description of what the function does and when to use it.
  </p>

  <div class="parameters-section" style="margin: --space(4) 0;">
    <h3>Parameters</h3>
    <ul style="list-style: none; padding: 0; margin: --space(2) 0;">
      <li style="margin-bottom: --space(2);">
        <code style="font-weight: 600;">--param-name</code>
        <span style="color: var(--required-color);">(required)</span>
        — Parameter description. Default: <code>value</code>.
      </li>
      <li style="margin-bottom: --space(2);">
        <code style="font-weight: 600;">--optional-param</code>
        <span style="color: var(--optional-color);">(optional)</span>
        — Optional parameter description. Default: <code>value</code>.
      </li>
    </ul>
  </div>

  <div class="example-group">
    <h3>Basic Usage</h3>
    <div class="code-block">
      <code>.example {
  property: --my-function(value1, value2);
}</code>
    </div>
    <!-- Add demo/interactive examples if applicable -->
  </div>

  <div class="example-group">
    <h3>Examples</h3>
    <!-- Add more examples -->
  </div>
</section>
```

### Step 4: Add to Layout

Add your documentation section to `docs/html/layout.html` in the appropriate category:

```html
{{> sections/colors/alpha.html }}
{{> sections/colors/my-function.html }}  <!-- Add here -->
```

**Important**: Maintain alphabetical order within each category.

### Step 5: Add to Sidebar Navigation

Add your function to `docs/html/partials/sidebar.html`:

```html
<li><a href="#my-function">--my-function()</a></li>
```

**Important**: Maintain alphabetical order within each category.

---

## Editing Existing Functions

### Modifying Function Implementation

1. **Edit the CSS file** in `src/[category]/function-name.css`
2. **Update the JSDoc comment** if parameters or behavior changed
3. **Update documentation HTML file** in `docs/html/sections/[category]/function-name.html`:
   - Update function description if behavior changed
   - Update examples if they no longer reflect current behavior
   - Update interactive demos if applicable
   - Ensure the header's source code link is correct
4. **Rebuild** to verify changes:
   ```bash
   npm run build:all
   ```

### Changing Function Signature

If you change parameters or return types:

1. **Update the `@function` declaration** in `src/[category]/function-name.css`
2. **Update JSDoc `@param` and `@returns` comments** in the CSS file
3. **Update documentation HTML file** at `docs/html/sections/[category]/function-name.html`:
   - Update the function description if behavior changed
   - Update the Parameters section with new parameter descriptions, types, and defaults
   - Update the `<header>` section to ensure the source code link points to the correct file:
     ```html
     <header>
       <h1><a href="#function-name">--function-name()</a></h1>
       <a href="https://github.com/yairEO/css-utility-functions/blob/main/src/[category]/function-name.css" target="_blank">Source code</a>
     </header>
     ```
   - Update all code examples in the "Basic Usage" and "Examples" sections
   - Update interactive demos if parameters changed
   - Ensure examples reflect the new signature accurately
4. **Check consistency** - Review similar functions in the same category to maintain consistent documentation style
5. **Consider backward compatibility** - Use optional parameters for additions rather than breaking changes

---

## Documentation Requirements

### CSS Function Comments (JSDoc Style)

Every function **must** include:

- **Brief description** - One-line summary
- **Detailed description** - Explain behavior, use cases, edge cases
- **@param tags** - For each parameter:
  - Type annotation
  - Parameter name
  - Description
  - Default value (if optional)
- **@returns tag** - Return type and description
- **@example** - At least one usage example

**Example**:
```css
/**
 * --alpha() — Color Transparency
 *
 * Creates a semi-transparent version of any color.
 * Works exactly like CSS opacity property:
 * - 0 = fully transparent (invisible)
 * - 1 = fully opaque (solid)
 * - 0.5 = 50% opaque (50% transparent)
 *
 * @param {color} --color - The base color
 * @param {number} --opacity - Opacity level (0-1), default: 0.5
 *   Higher values = more opaque, lower values = more transparent
 * @returns {color} - Color with applied opacity
 *
 * @example
 * .overlay {
 *   background: --alpha(#6366f1, 0.2);
 * }
 */
```

### HTML Documentation Sections

Every function **must** have:

1. **Header section** - Must include:
   - `<header>` wrapper containing the `<h1>` title
   - Source code link pointing to the correct GitHub file:
     ```html
     <header>
       <h1><a href="#function-name">--function-name()</a></h1>
       <a href="https://github.com/yairEO/css-utility-functions/blob/main/src/[category]/function-name.css" target="_blank">Source code</a>
     </header>
     ```
2. **Function description** - Clear, concise explanation
3. **Parameters section** - List all parameters with:
   - Required/optional indicator
   - Type information
   - Default values
   - Clear descriptions
4. **Basic usage example** - Simple, practical example
5. **Additional examples** - Show edge cases, variations, or advanced usage
6. **Interactive demos** (if applicable) - Use the demo system for visual functions

**Important**: All documentation files are located in `docs/html/sections/[category]/` and must follow this structure. See existing files like `docs/html/sections/colors/alpha.html` for reference.

---

## Code Style & Conventions

### CSS Function Naming

- Use kebab-case: `--my-function-name`
- Be descriptive but concise
- Use verb-noun pattern when appropriate: `--lighten-color()`, `--calculate-size()`
- Avoid abbreviations unless widely understood

### Parameter Naming

- Use kebab-case: `--param-name`
- Prefix with `--` (CSS custom property convention)
- Use descriptive names: `--color` not `--c`, `--multiplier` not `--m`

### Type Annotations

Use CSS type system types:
- `<color>` - Color values
- `<number>` - Numeric values
- `<length>` - Length values (px, rem, em, etc.)
- `<length-percentage>` - Length or percentage
- `<angle>` - Angle values (deg, rad, turn)
- `<string>` - String values
- `<custom-ident>` - Custom identifier

### Default Values

- Always provide defaults for optional parameters
- Use sensible defaults that match common use cases
- Document default values in comments

### Function Body

- Keep calculations readable
- Use `calc()` for complex math
- Leverage CSS color functions (oklch, color-mix) for color operations
- Add comments for complex logic

**Example**:
```css
@function --lerp(
  --a <length-percentage>,
  --b <length-percentage>,
  --t <number>: 0.5
) returns <length-percentage> {
  /* Linear interpolation: a + (b - a) * t */
  result: calc(var(--a) * (1 - var(--t)) + var(--b) * var(--t));
}
```

---

## Build Process

### Development Workflow

1. **Make changes** to source files in `src/`
2. **Update documentation** in `docs/html/`
3. **Build and test**:
   ```bash
   # Build CSS and HTML
   npm run build:all

   # Watch mode (auto-rebuild on changes)
   npm run dev
   ```

### Build Scripts

- `npm run build` - Build CSS bundle (non-minified)
- `npm run build:min` - Build minified CSS
- `npm run build:html` - Build HTML documentation
- `npm run build:all` - Build everything
- `npm run watch` - Watch CSS files
- `npm run watch:html` - Watch HTML files
- `npm run dev` - Watch both CSS and HTML

### Build Output

- CSS files are built to `dist/`
- HTML documentation is built to `docs/index.html`
- Header comments are automatically injected with version/author/repo info

---

## Testing

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] Function compiles without errors
- [ ] Function works in supported browsers
- [ ] Documentation renders correctly
- [ ] Examples are accurate and work
- [ ] Interactive demos function (if applicable)
- [ ] Function appears in sidebar navigation
- [ ] Function is listed in correct category
- [ ] No console errors in documentation page
- [ ] Minified version builds successfully

### Browser Support

CSS `@function` is experimental. Test in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Check [MDN compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/@function#browser_compatibility) for current support.

---

## Pull Request Guidelines

### Before Submitting

1. **Rebuild everything**:
   ```bash
   npm run build:all
   ```

2. **Check for errors**:
   - No build errors
   - No linting errors
   - Documentation renders correctly

3. **Follow the checklist**:
   - [ ] Function follows naming conventions
   - [ ] JSDoc comments are complete
   - [ ] Documentation HTML is complete
   - [ ] Function is added to `src/index.css`
   - [ ] Function is added to `layout.html`
   - [ ] Function is added to sidebar navigation
   - [ ] Examples are clear and accurate
   - [ ] Code is properly formatted

### PR Description Template

```markdown
## Description
Brief description of the function and its purpose.

## Category
[colors|spacing|effects|layout|math|units|logic]

## Changes
- Added `--function-name()` CSS function
- Added documentation section
- Added examples and demos

## Testing
- [ ] Tested in Chrome/Edge
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Documentation renders correctly
- [ ] Examples work as expected

## Breaking Changes
None / [Describe if any]
```

### Code Review Process

1. Maintainer reviews code style and conventions
2. Functionality is tested
3. Documentation is reviewed for clarity
4. Feedback is addressed
5. PR is merged

---

## Common Patterns

### Color Manipulation

```css
@function --manipulate-color(--color <color>, --amount <number>: 0.1) returns <color> {
  result: oklch(from var(--color) /* manipulation */);
}
```

### Spacing Calculations

```css
@function --calculate-space(--multiplier <number>, --base <length>: 1rem) returns <length> {
  result: calc(var(--base) * var(--multiplier));
}
```

### Math Operations

```css
@function --math-operation(--a <number>, --b <number>) returns <number> {
  result: calc(var(--a) /* operation */ var(--b));
}
```

---

## Questions?

- Check existing functions for examples
- Review `ARCHITECTURE_REVIEW.md` for project structure
- Review `BUILD_GUIDE.md` for build system details
- Open an issue for questions or clarifications

Thank you for contributing! 🎉

