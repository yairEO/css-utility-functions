const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'docs', 'html');
const OUTPUT_FILE = path.join(__dirname, 'docs', 'index.html');

/**
 * Create directory structure if it doesn't exist
 */
function ensureDirectoryStructure() {
  const dirs = [
    SRC_DIR,
    path.join(SRC_DIR, 'partials'),
    path.join(SRC_DIR, 'sections')
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Track included files to prevent circular dependencies
const includedFiles = new Set();
const fileCache = new Map();

/**
 * Read file with caching and error handling
 */
function readFile(filePath) {
  const normalizedPath = path.normalize(filePath);

  // Check cache
  if (fileCache.has(normalizedPath)) {
    return fileCache.get(normalizedPath);
  }

  // Check if file exists
  if (!fs.existsSync(normalizedPath)) {
    throw new Error(`File not found: ${normalizedPath}`);
  }

  // Read file
  let content;
  try {
    content = fs.readFileSync(normalizedPath, 'utf8');
  } catch (error) {
    throw new Error(`Failed to read ${normalizedPath}: ${error.message}`);
  }

  // Cache content
  fileCache.set(normalizedPath, content);
  return content;
}

/**
 * Process template and replace includes recursively
 */
function processTemplate(template, baseDir = SRC_DIR, depth = 0) {
  // Prevent infinite recursion
  if (depth > 20) {
    throw new Error('Maximum include depth exceeded (20). Check for circular dependencies.');
  }

  // First, handle block-style includes: {{> partials/file.html }}...content...{{/partials/file.html }}
  template = template.replace(/\{\{>\s*([^}]+)\s*\}\}([\s\S]*?)\{\{\/\1\s*\}\}/g, (match, filePath, content) => {
    const trimmedPath = filePath.trim();

    // If path starts with 'partials/' or 'sections/', resolve from SRC_DIR
    let fullPath;
    if (trimmedPath.startsWith('partials/') || trimmedPath.startsWith('sections/')) {
      fullPath = path.join(SRC_DIR, trimmedPath);
    } else if (path.isAbsolute(trimmedPath)) {
      fullPath = trimmedPath;
    } else {
      fullPath = path.join(baseDir, trimmedPath);
    }

    const normalizedPath = path.normalize(fullPath);

    // Check for circular dependency
    if (includedFiles.has(normalizedPath)) {
      throw new Error(`Circular dependency detected: ${normalizedPath}`);
    }

    includedFiles.add(normalizedPath);

    try {
      let partialContent = readFile(normalizedPath);

      // Replace {{content}} placeholder with the nested content
      partialContent = partialContent.replace(/\{\{content\}\}/g, content.trim());

      // Recursively process included content
      const dir = path.dirname(normalizedPath);
      partialContent = processTemplate(partialContent, dir, depth + 1);

      includedFiles.delete(normalizedPath);
      return partialContent;
    } catch (error) {
      includedFiles.delete(normalizedPath);
      console.error(`❌ Error including ${trimmedPath}:`, error.message);
      throw error;
    }
  });

  // Then handle regular includes: {{> path/to/file.html }} or {{> partials/file.html }}
  return template.replace(/\{\{>\s*([^}]+)\s*\}\}/g, (match, filePath) => {
    const trimmedPath = filePath.trim();

    // If path starts with 'partials/' or 'sections/', resolve from SRC_DIR
    // Otherwise, resolve relative to current file's directory
    let fullPath;
    if (trimmedPath.startsWith('partials/') || trimmedPath.startsWith('sections/')) {
      fullPath = path.join(SRC_DIR, trimmedPath);
    } else if (path.isAbsolute(trimmedPath)) {
      fullPath = trimmedPath;
    } else {
      fullPath = path.join(baseDir, trimmedPath);
    }

    const normalizedPath = path.normalize(fullPath);

    // Check for circular dependency BEFORE adding
    if (includedFiles.has(normalizedPath)) {
      throw new Error(`Circular dependency detected: ${normalizedPath}`);
    }

    // Track inclusion
    includedFiles.add(normalizedPath);

    try {
      let content = readFile(normalizedPath);

      // Recursively process included content
      const dir = path.dirname(normalizedPath);
      content = processTemplate(content, dir, depth + 1);

      // Remove from tracking after processing
      includedFiles.delete(normalizedPath);

      return content;
    } catch (error) {
      includedFiles.delete(normalizedPath);
      console.error(`❌ Error including ${trimmedPath}:`, error.message);
      throw error;
    }
  });
}

/**
 * Validate HTML structure
 */
function validateHTML(html) {
  const issues = [];

  // Basic checks
  if (!html.includes('<!DOCTYPE html>')) {
    issues.push('Missing DOCTYPE declaration');
  }
  if (!html.includes('<html')) {
    issues.push('Missing <html> tag');
  }
  if (!html.includes('</html>')) {
    issues.push('Missing closing </html> tag');
  }

  // Check for unprocessed includes
  const unprocessedIncludes = html.match(/\{\{>\s*[^}]+\s*\}\}/g);
  if (unprocessedIncludes) {
    issues.push(`Unprocessed includes found: ${unprocessedIncludes.join(', ')}`);
  }

  return issues;
}

/**
 * Build HTML from template
 * @param {boolean} exitOnError - If true, exit process on error (default: true)
 * @returns {boolean} - Returns true on success, false on error
 */
function buildHTML(exitOnError = true) {
  const startTime = Date.now();
  console.log('🔨 Building HTML...\n');

  // Clear cache on each build
  fileCache.clear();
  includedFiles.clear();

  try {
    // Ensure directory structure exists (but don't create layout.html automatically)
    ensureDirectoryStructure();

    // Check if src/html directory exists (should exist after ensureDirectoryStructure)
    if (!fs.existsSync(SRC_DIR)) {
      throw new Error(`Failed to create directory: ${SRC_DIR}`);
    }

    // Read layout template
    const layoutPath = path.join(SRC_DIR, 'layout.html');
    if (!fs.existsSync(layoutPath)) {
      console.error(`❌ Layout file not found: ${layoutPath}`);
      console.error(`\n💡 Create docs/html/layout.html with your main template.`);
      console.error(`   See BUILD_GUIDE.md for an example.\n`);
      throw new Error(`Layout file not found: ${layoutPath}`);
    }

    let template = readFile(layoutPath);

    // Process includes
    const processed = processTemplate(template);

    // Validate output
    const validationIssues = validateHTML(processed);
    if (validationIssues.length > 0) {
      console.warn('⚠️  Validation warnings:');
      validationIssues.forEach(issue => console.warn(`   - ${issue}`));
    }

    // Write output
    fs.writeFileSync(OUTPUT_FILE, processed, 'utf8');

    const duration = Date.now() - startTime;
    const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
    console.log(`✅ HTML built successfully`);
    console.log(`   → ${OUTPUT_FILE}`);
    console.log(`   → ${fileSize} KB`);
    console.log(`   → ${duration}ms\n`);

    return true;
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    if (exitOnError) {
      console.error(error.stack);
      process.exit(1);
    }
    return false;
  }
}

/**
 * Watch mode with debouncing
 */
function watchMode() {
  console.log('👀 Watching for changes...\n');

  // Ensure directory structure exists
  ensureDirectoryStructure();

  let debounceTimer;
  const DEBOUNCE_MS = 100;

  // Initial build (don't exit on error in watch mode)
  buildHTML(false);

  // Watch directory recursively
  function watchDirectory(dir) {
    if (!fs.existsSync(dir)) {
      console.error(`❌ Directory does not exist: ${dir}`);
      console.error(`\n💡 Create the directory structure first:`);
      console.error(`   mkdir -p docs/html/partials docs/html/sections`);
      console.error(`   See BUILD_GUIDE.md for setup instructions.\n`);
      process.exit(1);
    }

    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.html')) return;

      // Clear cache for changed file
      const changedPath = path.join(dir, filename);
      fileCache.delete(path.normalize(changedPath));

      // Debounce rapid changes
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log(`📝 Changed: ${filename}`);
        buildHTML(false); // Don't exit on error in watch mode
      }, DEBOUNCE_MS);
    });
  }

  watchDirectory(SRC_DIR);

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Stopping watch mode...');
    process.exit(0);
  });
}

// Main execution
if (require.main === module) {
  if (process.argv.includes('--watch')) {
    watchMode();
  } else {
    buildHTML();
  }
}

module.exports = { buildHTML, processTemplate, validateHTML };
