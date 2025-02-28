const fs = require('fs');
const path = require('path');

// Create the icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create placeholder files
const icons = ['icon-192x192.png', 'icon-512x512.png', 'icon-maskable-192x192.png', 'icon-maskable-512x512.png'];

icons.forEach(icon => {
  const filePath = path.join(iconsDir, icon);
  if (!fs.existsSync(filePath)) {
    console.log(`Creating placeholder icon: ${icon}`);
    // Create an empty file
    fs.writeFileSync(filePath, '');
  }
});

console.log('Placeholder icons created successfully!');
