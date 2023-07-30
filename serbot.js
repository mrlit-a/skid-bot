require("./settings");
const { default: makeWaSocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, generateWAMessage, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@whiskeysockets/baileys');
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./lib/fuctions');
const fs = require("fs");
const log = (pino = require("pino"));
const qrcode = require('qrcode');
const path = require('path');
const chalk = require('chalk');
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

if (global.conns instanceof Array) console.log();
else global.conns = [];

const skbot = async (conn, m, from) => {
  const { sendMessage } = conn;
  const { sender } = m;
  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, `./jadibot/${sender.split("@")[0]}`), log({ level: "silent" }));
  try {
    async function start() {
      let { version, isLatest } = await fetchLatestBaileysVersion();
      const conn = await makeWaSocket({
        auth: state,
        browser: [`serbot, skid-bot`, "Chrome", "1.0.0"],
        logger: log({ level: "silent" }),
        version,
      });

      conn.ev.on('messages.upsert', async chatUpdate => {
        try {
          chatUpdate.messages.forEach(async (mek) => {
            try {
              if (!mek.message) return;
              mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
              if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
              if (!chatUpdate.type === 'notify') return;
              m = smsg(sock, mek);
              require("./skid")(sock, m, chatUpdate, mek);
            } catch (e) {
              console.log(e);
            }
          });

          store.bind(conn.ev);
          conn.ev.on("creds.update", saveCreds);
          conn.ev.on("connection.update", async up => {
            const { lastDisconnect, connection } = up;
            if (connection == "connecting") return;
            if (connection) {
              if (connection != "connecting") console.log("Connecting...");
            }
            console.log(up);
            if (up.qr) await conn.sendMessage(m.chat, { image: await qrcode.toDataURL(up.qr, { scale: 8 }), caption: 'escanea este qr'}, { quoted: m })
            console.log(connection);
            if (connection == "open") {
              conn.id = conn.decodeJid(conn.user.id);
              conn.time = Date.now();
              global.conns.push(conn);
              await m.reply(`*conectado con skid bot*\n\n*Usuario:*\n _*× id : ${conn.decodeJid(conn.user.id)}*_`);
              user = `${conn.decodeJid(conn.user.id)}`;
              txt = `*se detecto un nuevo usuario*\n _× Usuario : @${user.split("@")[0]}_`;
              conn.sendMessage(`5218442114446@s.whatsapp.net`, { text: txt, mentions: [user] });
            }
            if (connection === 'close') {
              let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
              if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Delete Session and Scan Again`);
                conn.logout();
              } else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting....");
                start();
              } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server, reconnecting...");
                start();
              } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                conn.logout();
              } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Scan Again And Run.`);
                conn.logout();
              } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...");
                start();
              } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut, Reconnecting...");
                start();
              } else conn.end(`Unknown DisconnectReason: ${reason}|${connection}`);
            }
          });

        } catch (err) {
          console.log(err);
        }
      });
    }

    start();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { skbot, conns };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
