const fs = require("fs");
const path = require("path");

// Helper function to copy a single file
const copyFile = (source, destination) => {
  try {
    fs.copyFileSync(source, destination);
    console.log(`Copied ${source} to ${destination}`);
  } catch (error) {
    console.error("Error copying file:", error);
  }
};

// Helper function to copy all files in a directory
const copyDirectory = (source, destination) => {
  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Copy each file in the source directory
  fs.readdirSync(source).forEach((file) => {
    copyFile(path.join(source, file), path.join(destination, file));
  });
};

// Copy manifest.json
const manifestSourcePath = path.join(__dirname, "src", "manifest.json");
const manifestDestPath = path.join(__dirname, "dist", "manifest.json");
copyFile(manifestSourcePath, manifestDestPath);

// Copy assets directory
const assetsSourcePath = path.join(__dirname, "src", "assets");
const assetsDestPath = path.join(__dirname, "dist", "assets");
copyDirectory(assetsSourcePath, assetsDestPath);

// Copy queries directory
const queriesSourcePath = path.join(__dirname, "src", "queries");
const queriesDestPath = path.join(__dirname, "dist", "queries");
copyDirectory(queriesSourcePath, queriesDestPath);
