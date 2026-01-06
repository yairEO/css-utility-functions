# HTML Build System - Quick Reference

## Overview

The HTML build system breaks down the monolithic `index.html` (1773 lines) into manageable, reusable components.

## Directory Structure

```
docs/
├── index.html              # Built output (DO NOT edit directly)
└── html/
    ├── layout.html         # Main template
    ├── partials/           # Reusable components
    │   ├── head.html       # <head> content + styles
    │   ├── header.html     # Top navigation bar
    │   ├── sidebar.html    # Function navigation
    │   ├── intro.html      # Introduction section
    │   └── scripts.html    # JavaScript code
    └── sections/           # Function documentation sections
        ├── alpha.html
        ├── lighten.html
        ├── darken.html
        └── ... (one per function)
```

## Include Syntax

Use Handlebars-style syntax to include files:

```html
{{> partials/head.html }}
{{> sections/alpha.html }}
{{> partials/header.html }}
```

**Rules**:
- Paths are relative to `docs/html/`
- Must include `.html` extension
- Supports nested directories
- Can be nested (includes can include other includes)

## NPM Scripts

```bash
# Build HTML once
npm run build:html

# Watch HTML files for changes (auto-rebuild)
npm run watch:html

# Build everything (HTML + CSS)
npm run build:all

# Development mode (watch both HTML and CSS)
npm run dev
```

## Common Tasks

### Adding a New Function Section

1. Create `docs/html/sections/new-function.html`
2. Add include to `docs/html/layout.html`:
   ```html
   {{> sections/new-function.html }}
   ```
3. Add navigation link to `docs/html/partials/sidebar.html`
4. Run `npm run build:html` or use watch mode

### Editing a Component

1. Edit the file in `docs/html/partials/` or `docs/html/sections/`
2. If watch mode is running, changes appear automatically
3. Otherwise run `npm run build:html`

### Troubleshooting

**Build fails with "File not found"**
- Check file path is correct (case-sensitive)
- Ensure file exists in `docs/html/` directory
- Verify include syntax: `{{> path/to/file.html }}`

**Circular dependency error**
- Check for A.html → B.html → A.html pattern
- Simplify include structure

**Changes not appearing**
- Stop and restart watch mode
- Clear cache: delete `docs/index.html` and rebuild
- Check console for error messages

## Best Practices

1. **Keep components focused**: Each file should have a single responsibility
2. **Use semantic names**: `header.html` not `part1.html`
3. **Document complex includes**: Add comments for nested structures
4. **Test after changes**: Always verify output HTML renders correctly
5. **Commit source files**: Commit `docs/html/` files, not `docs/index.html` (or add to `.gitignore`)

## Example: Extracting a Section

**Before** (in `docs/index.html`):
```html
<section id="alpha" class="function-section">
  <h1><a href="#alpha">--alpha()</a></h1>
  <p>Creates a semi-transparent version...</p>
  <!-- ... 50 more lines ... -->
</section>
```

**After** (in `docs/html/sections/alpha.html`):
```html
<section id="alpha" class="function-section">
  <h1><a href="#alpha">--alpha()</a></h1>
  <p>Creates a semi-transparent version...</p>
  <!-- ... 50 more lines ... -->
</section>
```

**In `docs/html/layout.html`**:
```html
<main class="main-content">
  {{> partials/intro.html }}
  {{> sections/alpha.html }}
  <!-- ... other sections ... -->
</main>
```

## Performance

- **Build time**: ~20-30ms (cold), ~5-10ms (warm)
- **Watch rebuild**: ~10-15ms per change
- **Memory**: Negligible (~500KB cache)

## Architecture Details

See [ARCHITECTURE_REVIEW.md](./ARCHITECTURE_REVIEW.md) for:
- Detailed technical decisions
- Security considerations
- Performance analysis
- Migration plan
- Risk assessment

