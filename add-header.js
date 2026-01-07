const fs = require('fs');
const path = require('path');

const pkg = require('./package.json');
const outputFile = process.argv[2] || path.join(__dirname, 'dist', 'index.css');

if (!fs.existsSync(outputFile)) {
  console.error(`Output file not found: ${outputFile}`);
  process.exit(1);
}

// Extract author name (remove email if present)
const author = pkg.author.split('<')[0].trim();

// Extract repository URL (remove git+ prefix and .git suffix if present)
const repoUrl = pkg.repository?.url
  ? pkg.repository.url.replace(/^git\+/, '').replace(/\.git$/, '')
  : '';

// Create header comment
const header = `/**
 * CSS Utility Functions v${pkg.version}
 * Author: ${author}${repoUrl ? `\n * Repository: ${repoUrl}` : ''}
 *
 * A collection of reusable CSS custom functions using the @function syntax.
 * Import this file to use all utility functions in your project.
 *
 * ⚠️ Note: CSS @function is experimental. Check browser support before production use.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@function
 */

`;

// Read output file and prepend header if not already present
let css = fs.readFileSync(outputFile, 'utf8');

if (!css.includes(`v${pkg.version}`)) {
  // Remove any existing header comment block (/** ... */) at the start
  css = css.replace(/^\/\*\*[\s\S]*?\*\/\s*\n?/, '');
  fs.writeFileSync(outputFile, header + css, 'utf8');
}

