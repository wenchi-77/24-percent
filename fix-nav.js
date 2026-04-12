import fs from 'fs/promises';

const htmlFiles = ['./index.html', './design.html', './system.html', './impact.html'];

(async () => {
  try {
    for (const file of htmlFiles) {
      let content = await fs.readFile(file, 'utf8');
      
      // Inject the mobile menu button right after the nav-links ul if it's not already there
      if (!content.includes('class="mobile-menu-btn"')) {
        content = content.replace(
          /<\/ul>\s*<\/div>\s*<\/nav>/,
          `</ul>\n      <div class="mobile-menu-btn">☰</div>\n    </div>\n  </nav>`
        );
        await fs.writeFile(file, content, 'utf8');
        console.log(`Updated ${file} with mobile menu button.`);
      } else {
        console.log(`${file} already has mobile menu button.`);
      }
    }
  } catch (error) {
    console.error('Error updating HTML:', error);
    process.exit(1);
  }
})();
