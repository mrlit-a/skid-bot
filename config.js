const chalk = require("chalk")
const fs = require("fs")

global.owner = [
["5218442114446", "skid owner", true],
]



global.place = 'America/Bogota' // Aquí puede encontrar su ubicación https://momentjs.com/timezone/



let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})