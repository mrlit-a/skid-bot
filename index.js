(async () => {
require("./settings")
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, proto , jidNormalizedUser,WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage } = require("@whiskeysockets/baileys")
const { state, saveCreds } = await useMultiFileAuthState('./authFolder')
const chalk = require('chalk')
const moment = require('moment')
const fs = require('fs')
const yargs = require('yargs/yargs')
const { smsg, sleep } = require('./lib/fuctions')

const { execSync } = require('child_process')
const pino = require('pino')
const color = (text, color) => {
return !color ? chalk.green(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)
}

//base de datos
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./database/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./database/mongoDB')

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`database.json`) //db
)
global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
}

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

//_________________

async function startBot() {

const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: [`skid bot`,'Safari','3.0']
})


sock.ev.on('messages.upsert', async chatUpdate => {
    //console.log(JSON.stringify(chatUpdate, undefined, 2))
    try {
    chatUpdate.messages.forEach(async (mek) => {
    try {
    //mek = (Object.keys(chatUpdate.messages[0])[0] !== "senderKeyDistributionMessage") ?  chatUpdate.messages[0] : chatUpdate.messages[1]

    if (!mek.message) return
    //console.log(chatUpdate.type)
    mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast') return
    
    if (!sock.public && !m.key.fromMe && !chatUpdate.type === 'notify') return
    m = smsg(sock, mek)
    //if (m.key.fromMe === true) return
    //if (m.mtype === 'senderKeyDistributionMessage') mek = chatUpdate.messages[1]
    global.numBot = sock.user.id.split(":")[0] + "@s.whatsapp.net"
    global.numBot2 = sock.user.id
    require("./skid")(sock, m, chatUpdate, mek)
    } catch (e) {
    console.log(e)
    }
    })
    } catch (err) {
        console.log(err)
    }
})

sock.ev.on("groups.update", async (json) => {
			try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
			console.log(color(json, '#009FFF'))
			const res = json[0];
			if (res.announce == true) {
				await sleep(2000)
				let text = `*「 Grupos 」*\n\n*El grupo ha sido cerrado por el administrador.*\n*¡Ahora solo los administradores pueden enviar mensajes!*`
		conn.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": botname,   
        "mediaType": 1,   
        "thumbnail": ppgroup,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if (res.announce == false) {
				await sleep(2000)
				let text = `*「 Grupos 」*\n\n*el grupo a sido abierto por un admin*\n*los participantes pueden mandar mensajes*`
		conn.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": botname,   
        "mediaType": 1,   
        "thumbnail": ppgroup,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if (res.restrict == true) {
				await sleep(2000)
			let text = `*「 Grupos 」*\n\n La información del grupo ha sido restringida, ¡ahora solo el administrador puede editar la información del grupo!`
		conn.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": botname,   
        "mediaType": 1,   
        "thumbnail": ppgroup,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if (res.restrict == false) {
				await sleep(2000)
		    let text = `*「 Grupos 」*\n\n*Se ha abierto la información del grupo para todos los participantes*\n*¡Ahora los participantes pueden editar la información del grupo!*`
	    conn.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": botname,   
        "mediaType": 1,   
        "thumbnail": ppgroup,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if(!res.desc == ''){
				await sleep(2000)
	    let text = `*「 Grupos 」*\n\n*La descripción del grupo se ha cambiado:*\n\n*nueva descripción: ${res.desc}*`
	    conn.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": botname,   
        "mediaType": 1,   
        "thumbnail": ppgroup,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
      } else {
				await sleep(2000)
				let text = `*「 Grupos 」*\n\n*El nombre del grupo ha sido cambiado:*\n\n*nuevo nombre: ${res.subject}*`
        conn.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": botname,   
        "mediaType": 1,   
        "thumbnail": ppgroup,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
				}
			
		})


sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr, receivedPendingNotifications } = update;
    console.log(receivedPendingNotifications)
    if (connection == 'connecting') {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊🧡 INICIANDO AGUARDE UN MOMENTO...\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`, '#f12711')
        );
    } else if (qr !== undefined) {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ESCANEA EL QR, EXPIRA 45 SEG...\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`, '#f12711')
        );
    } else if (connection === 'close') {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`⚠️ CONEXION CERRADA, SE INTENTARA RECONECTAR`, '#f64f59')
        );
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            ? startBot()
            : console.log(
                color('[SYS]', '#009FFF'),
                color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
                color(`Wa Web logged Out`, '#f64f59')
            );;
    } else if (connection == 'open') {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊Skid bot Se Conecto Correctamente a WhatsApp\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯` + receivedPendingNotifications, '#38ef7d')
        );
    }
});

sock.public = true

sock.ev.on('creds.update', saveCreds)

process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)
process.on('RefenceError', console.log)


}

startBot()

})()
