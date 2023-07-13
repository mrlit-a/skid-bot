const chalk = require("chalk")
const fs = require("fs")

global.owner = [
["595992611272", "nombre1", true],
["50664668406", "nombre2", true],
["5218442114446"],
["593968585383"], 
["5492266613038"]
]


global.botname = "𝑮𝒂𝒕𝒂𝑩𝒐𝒕𝑷𝒍𝒖𝒔-𝑴𝑫 💝🐈"
global.vs = '1.0.0'
global.place = 'America/Bogota' // Aquí puede encontrar su ubicación https://momentjs.com/timezone/
global.language = 'es' // Aquí puede encontrar su idioma https://cloud.google.com/translate/docs/languages?hl=es-419
global.lolkeysapi = 'GataDios' //api lohum

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})
