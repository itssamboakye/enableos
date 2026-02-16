const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '../public/logos');
const files = [
  'logo-white.svg',
  'logo-black.svg', 
  'logo-full-white.svg',
  'logo-full-black.svg'
];

files.forEach(filename => {
  const filePath = path.join(logosDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${filename} - file not found`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove background rectangle paths
  // Pattern: <path fill="#..." d="\n  M 1024.00 0.00\n  L 1024.00 683.00\n  L 0.00 683.00\n  L 0.00 0.00\n  L 1024.00 0.00\n  Z\n  M ...
  // We want to remove the "M 1024.00 0.00 ... Z" part but keep "M 355.41..." or similar logo paths
  
  // Remove the background rectangle from paths that start with the full viewBox rectangle
  content = content.replace(
    /(<path fill="#(fdfdfd|fcfcfd|fefefe|040404|050505|090909)" d="\s*M\s+1024\.00\s+0\.00\s+L\s+1024\.00\s+683\.00\s+L\s+0\.00\s+683\.00\s+L\s+0\.00\s+0\.00\s+L\s+1024\.00\s+0\.00\s+Z\s+)/g,
    '<path fill="#$2" d="'
  );
  
  // Also handle paths that might have the background as a separate path element
  content = content.replace(
    /<path fill="#(fdfdfd|fcfcfd|fefefe|040404|050505|090909)" d="\s*M\s+1024\.00\s+0\.00[\s\S]*?Z\s*"\s*\/>/g,
    ''
  );
  
  // Remove any remaining background-only paths
  content = content.replace(
    /<path fill="#(fdfdfd|fcfcfd|fefefe|040404|050505|090909)" d="\s*M\s+0\.00\s+0\.00[\s\S]*?L\s+1024\.00\s+0\.00[\s\S]*?Z\s*"\s*\/>/g,
    ''
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filename}`);
});

console.log('Done removing backgrounds from SVG files');
