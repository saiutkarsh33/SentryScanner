const fs = require('fs');
const path = require('path');

const copyFile = (source, destination) => {
  try {
    fs.copyFileSync(source, destination);
    console.log(`Copied ${source} to ${destination}`);
  } catch (error) {
    console.error('Error copying file:', error);
  }
};

const copyAssets = () => {
  const assetsSourcePath = path.join(__dirname, 'src', 'assets');
  const assetsDestPath = path.join(__dirname, 'dist', 'assets');

  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(assetsDestPath)){
    fs.mkdirSync(assetsDestPath, { recursive: true });
  }

  // Copy each file in the assets directory
  fs.readdirSync(assetsSourcePath).forEach(file => {
    copyFile(path.join(assetsSourcePath, file), path.join(assetsDestPath, file));
  });
};

// Copy manifest.json
const manifestSourcePath = path.join(__dirname, 'src', 'manifest.json');
const manifestDestPath = path.join(__dirname, 'dist', 'manifest.json');
copyFile(manifestSourcePath, manifestDestPath);

// Copy assets
copyAssets();
