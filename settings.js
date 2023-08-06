const chalk = require("chalk")
const fs = require("fs")

global.owner = [
["595992611272", "nombre1", true],
["50664668406", "nombre2", true],
["5218442114446"],
["593968585383"], 
['584125778026'],
["5492266613038"]
]

global.noperfil = fs.readFileSync('./media/sinfoto.jpg')
global.chatgpt = fs.readFileSync('./media/chatgpt.jpg')
global.query = fs.readFileSync('./media/query.jpg')
global.menu = fs.readFileSync('./media/menu.jpg')
global.hentai = fs.readFileSync('./media/hentai.jpg')
global.simi = fs.readFileSync('./media/simi.jpeg')



global.mess = {
admin: "𝚗𝚘 𝚎𝚛𝚎𝚜 𝚊𝚍𝚖𝚒𝚗",
owner: "𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚎𝚜 𝚙𝚊𝚛𝚊 𝚘𝚠𝚗𝚎𝚛𝚜",
group: "𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚎𝚜 𝚙𝚊𝚛𝚊 𝚐𝚛𝚞𝚙𝚘𝚜",
priv: "𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘 𝚎𝚜 𝚜𝚘𝚕𝚘 𝚙𝚊𝚛𝚊 𝚖𝚎𝚗𝚜𝚊𝚓𝚎𝚜 𝚙𝚛𝚒𝚟𝚊𝚍𝚘𝚜",
botAdmin: " 𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚜𝚎𝚌𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗 𝚙𝚊𝚛𝚊 𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘",
wait: "𝚙𝚘𝚛 𝚏𝚊𝚟𝚘𝚛, 𝚎𝚜𝚙𝚎𝚛𝚊..."
}

global.botname = "sᴋɪᴅ ʙᴏᴛ ᴍᴅ"
global.packname = "sᴋɪᴅ ʙᴏᴛ ❥"
global.author = "𝚍𝚒𝚎𝚐𝚊 𝚜𝚎 𝚕𝚊 𝚌𝚘𝚖𝚎"
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
