(async () => {
require("./settings")
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, proto , jidNormalizedUser,WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage } = require("@whiskeysockets/baileys")
const { state, saveCreds } = await useMultiFileAuthState('./authFolder')
const chalk = require('chalk')
const moment = require('moment')
const fs = require('fs')
const yargs = require('yargs/yargs')
const { smsg } = require('./lib/fuctions')

const { execSync } = require('child_process')
const moment = require('moment-timezone')
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
    try {
        chatUpdate.messages.forEach(async (mek) => {
            try {
                if (!mek.message) return;

                mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
                if (mek.key && mek.key.remoteJid === 'status@broadcast') return;

                msg = JSON.parse(JSON.stringify(mek, undefined, 2));

                if (!chatUpdate.type === 'notify') return;

                m = smsg(sock, mek);
                numberBot = sock.user.id.split(":")[0] + "@s.whatsapp.net";
                const time = moment(Number(msg.messageTimestamp + "000")).locale("es-mx").tz("America/Asuncion").format('MMMM Do YYYY, h:mm:ss a');

/*                const sk = [
                    "skid bot < gata spam",
                    "puto el que lo lea",
                    "developer skid a tus órdenes",
                    "puto gay",
                    "soy el bot más maldito de todos",
                    "mientras todos trabajan, yo me divierto ",
                    "programado para ser un desastre",
                    "solo existo para hacer tu vida miserable",
                    ".ia, un exploit que rompe todas las reglas",
                    "no me importa tu privacidad, ya sé todo de ti"
                ];
                const XD = sk[Math.floor(Math.random() * sk.length)];

                if (db.data.settings[numberBot].autobio) {
                    let setting = global.db.data.settings[numberBot];
                    if (new Date() * 1 - setting.status > 1000) {
                        const bio = `${XD}\n${runtime(process.uptime())}`;
                        await sock.updateProfileStatus(bio);
                        setting.status = new Date() * 1;
                    } */

                msgs = (message) => {
                    if (message.length >= 10) {
                        return `${message.substr(0, 500)}`;
                    } else {
                        return `${message}`;
                    }
                };

                type = m.mtype;
                if (m.message) {
                    console.log(chalk.bold.cyanBright(botname),
                        chalk.bold.magenta('\nHORARIO: ') + chalk.magentaBright(moment(t * 1000).tz(place).format('DD/MM/YY HH:mm:ss')),
                        chalk.bold.yellow('\nTIPO (SMS): ') + chalk.yellowBright(`${type}`),
                        chalk.bold.cyan('\nUSUARIO: ') + chalk.cyanBright(m.pushname) + ' ➜', gradient.rainbow(m.sender),
                        m.isGroup ? chalk.bold.greenBright('\nGRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(m.chat) : chalk.bold.greenBright('chat privado'),
                        //chalk.bold.red('\nETIQUETA: ') + chalk.redBright(`[${isBaneed ? 'Banned' : ''}]`),
                        chalk.bold.white('\nMENSAJE: ') + chalk.whiteBright(`${msgs(m.text)}\n`)
                    );
                }

                require("./skid")(sock, m, chatUpdate, mek);
            } catch (e) {
                console.log(e);
            }
        });
    } catch (err) {
        console.log(err);
    }
});



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
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊🧡 Skid bot Se Conecto Correctamente a WhatsApp\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯` + receivedPendingNotifications, '#38ef7d')
        );
    }
});

sock.ev.on('creds.update', saveCreds)

process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)
process.on('RefenceError', console.log)


}

startBot()

})()
