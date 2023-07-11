const fs = require('fs');

function deltemp() {
  const tempFolderPath = './temp'; // Carpeta temp

  if (fs.existsSync(tempFolderPath)) {
    fs.readdirSync(tempFolderPath).forEach((file) => {
      const filePath = `${tempFolderPath}/${file}`;
      fs.unlinkSync(filePath);
    });

    fs.rmdirSync(tempFolderPath);
    console.log('Carpeta temp y sus archivos han sido eliminados.');
  } else {
    console.log('La carpeta temp no existe.');
  }
}

module.exports = { deltemp };
