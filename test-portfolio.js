const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve(__dirname);

console.log('--- RUNNING MULTI-PAGE PORTFOLIO INTEGRITY TESTS ---');
console.log('Testing directory:', baseDir);

const expectedFiles = [
  'index.html',
  'about.html',
  'skills.html',
  'projects.html',
  'achievements.html',
  'contact.html',
  'README.md',
  'css/style.css',
  'css/components.css',
  'css/responsive.css',
  'js/main.js',
  'js/canvas-bg.js',
  'js/projects-filter.js',
  'js/contact.js',
  'js/animations-3d.js'
];

let failed = false;

// 1. Check all files exist and have content
expectedFiles.forEach(f => {
  const fullPath = path.join(baseDir, f);
  if (!fs.existsSync(fullPath)) {
    console.error('FAIL: Missing file:', f);
    failed = true;
    return;
  }
  const size = fs.statSync(fullPath).size;
  if (size === 0) {
    console.error('FAIL: Empty file:', f);
    failed = true;
    return;
  }
  console.log('PASS: File exists & non-empty:', f, `(${size} bytes)`);
});

// 2. Validate HTML Structure of index.html
const indexHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

const requiredSections = ['hero', 'about', 'skills', 'projects', 'achievements', 'contact'];
requiredSections.forEach(sec => {
  const pattern = new RegExp(`id=["']${sec}["']`);
  if (!pattern.test(indexHtml)) {
    console.error('FAIL: Missing section id in index.html:', sec);
    failed = true;
  } else {
    console.log('PASS: Found section in index.html:', sec);
  }
});

// 3. Check for specific required text on index.html
const requiredTexts = [
  'Takshil Patel',
  'Building Digital Solutions',
  'Exploring Cybersecurity',
  'Solving Problems',
  'Explore My Work',
  'Contact Me',
  'TbMH0R9',
  'Takshpat15544',
  'Unstop'
];

requiredTexts.forEach(txt => {
  if (!indexHtml.includes(txt)) {
    console.error('FAIL: Required text missing from index.html:', txt);
    failed = true;
  } else {
    console.log('PASS: index.html contains required text:', txt);
  }
});

// 4. Validate Multi-Page Pages: Navigation, Titles, and Structure
const htmlPages = [
  { file: 'index.html', title: 'Takshil Patel', activeLink: 'Home', expectedText: 'Building Digital Solutions' },
  { file: 'about.html', title: 'About Me', activeLink: 'About', expectedText: 'About Takshil Patel' },
  { file: 'skills.html', title: 'Technical Skills', activeLink: 'Skills', expectedText: 'Technical Skills &amp; Stack' },
  { file: 'projects.html', title: 'Featured Projects', activeLink: 'Projects', expectedText: 'Featured Projects' },
  { file: 'achievements.html', title: 'Achievements', activeLink: 'Achievements', expectedText: 'Unstop Online Coding Challenge' },
  { file: 'contact.html', title: 'Contact', activeLink: 'Contact', expectedText: 'Get In Touch' }
];

const allNavHrefs = ['index.html', 'about.html', 'skills.html', 'projects.html', 'achievements.html', 'contact.html'];

htmlPages.forEach(p => {
  const content = fs.readFileSync(path.join(baseDir, p.file), 'utf8');

  // Verify Title
  if (!content.includes(p.title)) {
    console.error(`FAIL: ${p.file} missing expected title string "${p.title}"`);
    failed = true;
  } else {
    console.log(`PASS: ${p.file} title contains "${p.title}"`);
  }

  // Verify expected distinctive page text
  if (!content.includes(p.expectedText)) {
    console.error(`FAIL: ${p.file} missing expected content string "${p.expectedText}"`);
    failed = true;
  } else {
    console.log(`PASS: ${p.file} contains "${p.expectedText}"`);
  }

  // Verify all navigation links are present
  allNavHrefs.forEach(href => {
    if (!content.includes(`href="${href}"`)) {
      console.error(`FAIL: ${p.file} missing navigation href to "${href}"`);
      failed = true;
    }
  });
  console.log(`PASS: ${p.file} contains all 6 multi-page navigation links`);

  // Verify Brand Logo links to home
  if (!content.includes('href="index.html" class="brand-logo"')) {
    console.error(`FAIL: ${p.file} missing brand logo link to index.html`);
    failed = true;
  }

  // Verify mobile nav toggle exists
  if (!content.includes('id="mobile-nav-toggle"')) {
    console.error(`FAIL: ${p.file} missing mobile nav toggle`);
    failed = true;
  }

  // Verify footer exists
  if (!content.includes('class="site-footer"')) {
    console.error(`FAIL: ${p.file} missing footer`);
    failed = true;
  }
});

// 5. Verify CSS syntax & references
const cssFiles = ['css/style.css', 'css/components.css', 'css/responsive.css'];
cssFiles.forEach(cf => {
  const content = fs.readFileSync(path.join(baseDir, cf), 'utf8');
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    console.error(`FAIL: Mismatched braces in ${cf}: {=${openBraces}, }=${closeBraces}`);
    failed = true;
  } else {
    console.log(`PASS: CSS syntax balanced in ${cf} (${openBraces} rulesets)`);
  }
});

// 6. Verify JavaScript syntax
const jsFiles = ['js/main.js', 'js/canvas-bg.js', 'js/projects-filter.js', 'js/contact.js', 'js/animations-3d.js'];
jsFiles.forEach(jf => {
  const code = fs.readFileSync(path.join(baseDir, jf), 'utf8');
  try {
    new vm.Script(code);
    console.log('PASS: JS code compiles without syntax error:', jf);
  } catch (syntaxErr) {
    console.error(`FAIL: Syntax error in ${jf}:`, syntaxErr.message);
    failed = true;
  }
});

if (failed) {
  console.error('\n>>> SOME TESTS FAILED <<<');
  process.exit(1);
} else {
  console.log('\n>>> ALL MULTI-PAGE PORTFOLIO VERIFICATION TESTS PASSED SUCCESSFULLY! <<<');
}
