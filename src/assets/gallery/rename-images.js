const fs = require('fs');
const path = require('path');

const imageFolder = './images'; // Change to your actual folder path
const files = fs.readdirSync(imageFolder)
  .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

files.forEach((file, index) => {
  const ext = path.extname(file);
  const newName = `${index + 1}${ext}`;
  const oldPath = path.join(imageFolder, file);
  const newPath = path.join(imageFolder, newName);
  fs.renameSync(oldPath, newPath);
});

console.log('Renamed images to 1.jpg, 2.jpg, ...');
