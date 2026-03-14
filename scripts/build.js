const fs = require('fs');
const path = require('path');

// Copy public folder to dist
const publicDir = path.join(__dirname, '..', 'public');
const distDir = path.join(__dirname, '..', 'dist');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(distDir)) {
  // Remove existing dist directory
  fs.rmSync(distDir, { recursive: true, force: true });
}

copyRecursiveSync(publicDir, distDir);
console.log('Public files copied to dist successfully');
