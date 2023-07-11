const chalk = require("chalk")
const fs = require("fs")

global.owner = [["5218442114446", "skid owner", true],
['5218441029462', "subowner", true]]

global.hentai = fs.readFileSync('./media/hentai.jpg')
global.query = fs.readFileSync('./media/query.jpg')
global.dumb = fs.readFileSync('./media/dumb.jpg')
global.error = fs.readFileSync('./media/error.jpg')




let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})