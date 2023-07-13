const baileys = require('@whiskeysockets/baileys');
const moment = require('moment-timezone');
const gradient = require('gradient-string');
const { execSync } = require('child_process');
const chalk = require('chalk');
const os = require('os');
const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');
const cheerio = require('cheerio');
const gpt = require('api-dylux');

const color = (text, color) => {
  return !color
    ? chalk.cyanBright(text)
    : color.startsWith('#')
    ? chalk.hex(color)(text)
    : chalk.keyword(color)(text);
};

const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./libs/fuctions');
const { default: makeWASocket, proto } = require("@whiskeysockets/baileys");

const msgs = (message) => {
  if (message.length >= 10) {
    return `${message.substr(0, 500)}`;
  } else {
    return `${message}`;
  }
};

const getCmd = (id) => {
  const stickerdb = JSON.parse(fs.readFileSync('./database/stickerdb.json'));
  let anu = null;
  Object.keys(stickerdb).forEach(nganu => {
    if (stickerdb[nganu].id === id) {
      anu = nganu;
    }
  });
  if (anu !== null) {
    return stickerdb[anu].cmd;
  }
};

let blockList = [];

module.exports = conn = async (conn, m, chatUpdate, mek) => {
  var body = (m.mtype === 'conversation')
    ? m.message.conversation
    : (m.mtype == 'imageMessage' && m.message.imageMessage.caption)
    ? m.message.imageMessage.caption
    : (m.mtype == 'videoMessage' && m.message.videoMessage.caption)
    ? m.message.videoMessage.caption
    : (m.mtype == 'extendedTextMessage')
    ? m.message.extendedTextMessage.text
    : (m.mtype == 'buttonsResponseMessage')
    ? m.message.buttonsResponseMessage.selectedButtonId
    : (m.mtype == 'listResponseMessage')
    ? m.message.listResponseMessage.singleSelectReply.selectedRowId
    : (m.mtype == 'templateButtonReplyMessage')
    ? m.message.templateButtonReplyMessage.selectedId
    : (m.mtype === 'messageContextInfo')
    ? m.message.listResponseMessage.singleSelectReply.selectedRowId
    : (m.mtype == 'stickerMessage')
    && (getCmd(m.message.stickerMessage.fileSha256.toString()) !== null && getCmd(m.message.stickerMessage.fileSha256.toString()) !== undefined)
    ? getCmd(m.message.stickerMessage.fileSha256.toString())
    : '';

  if (m.key.id.startsWith("BAE5")) return;
  var budy = (typeof m.text == 'string' ? m.text : '');
  global.prefix = new RegExp('^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^' + '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@'.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']', 'i');
  var prefix = global.prefix.test(body) ? body.match(global.prefix)[0] : '';
  const isCmd = body.startsWith(prefix);
  const from = m.chat;
  const msg = JSON.parse(JSON.stringify(mek, undefined, 2));
  const content = JSON.stringify(m.message);
  const type = m.mtype;
  const arg = body.substring(body.indexOf(' ') + 1);
  const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
  const args = body.trim().split(/ +/).slice(1);
  const q = args.join(" ");
  let t = m.messageTimestamp;
  const pushname = m.pushName || "Sin nombre";
  const botnm = conn.user.id.split(":")[0] + "@s.whatsapp.net";
  const userSender = m.key.fromMe ? botnm : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid;
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender);
  const itsMe = m.sender == conn.user.id ? true : false;
  const text = args.join(" ");
  const quoted = m.quoted ? m.quoted : m;
  const sender = m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid;
  const mime = (quoted.msg || quoted).mimetype || '';
  const isMedia = /image|video|sticker|audio/.test(mime);
  const numBot = conn.user.id.split(":")[0] + "@s.whatsapp.net";
  const numBot2 = conn.user.id;
  const mentions = [];
  if (m.message[type].contextInfo) {
    if (m.message[type].contextInfo.mentionedJid) {
      const msd = m.message[type].contextInfo.mentionedJid;
      for (let i = 0; i < msd.length; i++) {
        mentions.push(msd[i]);
      }
    }
  }

  const groupMetadata = m.isGroup ? await conn.groupMetadata(from) : '';
  const groupName = m.isGroup ? groupMetadata.subject : '';
  const participants = m.isGroup ? await groupMetadata.participants : '';
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '';
  const isBotAdmins = m.isGroup ? groupAdmins.includes(numBot) : false;
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false;
  const isBaneed = m.isGroup ? blockList.includes(userSender) : false;

  if (m.message) {
console.log(chalk.bold.cyanBright(botname), 
chalk.bold.magenta('\nHorario: ') + chalk.magentaBright(moment(t * 1000).tz(place).format('DD/MM/YY HH:mm:ss'),
chalk.bold.yellow('\nTipo de mensaje: ') + chalk.yellowBright(`${type}`), 
chalk.bold.cyan('\nUusario: ') + chalk.cyanBright(pushname), gradient.rainbow(userSender), 
m.isGroup ? chalk.bold.greenBright('\nGrupo: ') + chalk.greenBright(groupName) + ' ' + gradient.rainbow(from) : chalk.bold.greenBright('Chat privado'), 
chalk.bold.red('\nTags: ') + chalk.redBright(`[${isBaneed ? 'Banned' : ''}]`),
chalk.bold.white('\nMensaje: ') + chalk.whiteBright(`${msgs(m.text)}\n`))
)}

  switch (command) {
    case 'yts':
      if (!text) throw `Ejemplo: ${prefix + command} historia wa anime`;
      const yts = require("youtube-yts");
      const search = await yts(text);
      let teks = 'Búsqueda en YouTube\n\nResultados de ' + text + '\n\n';
      let no = 1;
      let themeemoji = "✨";
      for (let i of search.all) {
        teks += `${themeemoji} No: ${no++}\n${themeemoji} Tipo: ${i.type}\n${themeemoji} ID del Video: ${i.videoId}\n${themeemoji} Título: ${i.title}\n${themeemoji} Vistas: ${i.views}\n${themeemoji} Duración: ${i.timestamp}\n${themeemoji} Subido: ${i.ago}\n${themeemoji} URL: ${i.url}\n\n━━━━━━━━━━━━\n\n`;
      }
      await conn.sendMessage(from, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: fkontak });
      break;

    case 'ping':
      var timestamp = speed();
      var latensi = speed() - timestamp;
      conn.sendMessage(from, { text: `*Pong 🏓  ${latensi.toFixed(4)}*` }, { quoted: msg });
      break;

    case 'ia':
    case 'chatgpt':
      if (!text) return conn.sendMessage(from, { text: `*INGRESE EL TEXTO DE LOS QUE QUIERE BUSCAR?*` }, { quoted: msg });
      await conn.sendPresenceUpdate('composing', m.chat);
      var syms = `Actuaras como un Bot de WhatsApp y tu lenguaje principal es multi lenguage, tu seras GataBotPlus-MD 🐈, y tu creadora es GataNina-Li, Si te piden tus comandos, menu tu mandas lo siguiente:\n\n*Soy un bot nuevo Que estoy desarollo :v*\n\nSi te piden un tutorial para hacer o instalar un Bot o algo relacion con tu instalacion o obetenerte para un grupo le recomiendas este canal https://www.youtube.com/@gatadios\nSi te piden numero numero de la creadora por ayudar dile esto: si tiene alguna duda, error, configurar GataBot, puede comentarla en el Grupo para que sea respodida entre todos Respete al Grupo y a sus integrantes, y recuerde dar Gracias por la ayuda brindada\n\nhttps://chat.whatsapp.com/IXZ0aBryB1cHjNxe0VIm76`;
      var res = await gpt.ChatGpt(text, syms);
      await m.reply(res.text);
      break;

    case 'play':
      if (!text) return conn.sendMessage(from, { text: `*ingrese nombre de alguna cancion*` }, { quoted: msg });
      conn.sendMessage(from, { text: `*Aguarde un momento*` }, { quoted: fdoc });
      let aud = await fetch(`https://api.lolhuman.xyz/api/ytplay2?apikey=GataDios&query=${text}`);
      let json = await aud.json();
      let kingcore = await ytplay(text);
      let audiodownload = json.result.audio;
      if (!audiodownload) audiodownload = kingcore.result;
      await conn.sendMessage(from, { audio: { url: audiodownload }, fileName: `error.mp3`, mimetype: 'audio/mp4' }, { quoted: msg });
      break;

    case 'play2':
      if (!text) return conn.sendMessage(from, { text: `*ingrese nombre de alguna cancion*` }, { quoted: msg });
      conn.sendMessage(from, { text: `*Aguarde un momento*` }, { quoted: fdoc });
      let mediaa = await ytplayvid(textoo);
      await conn.sendMessage(from, { video: { url: mediaa.result }, fileName: `error.mp4`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: msg });
      break;

    case 'update':
      if (!isCreator) return conn.sendMessage(from, { text: `*ESTE COMANDO ES PARA MI JEFE*` }, { quoted: msg });
      try {
        let stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''));
        await conn.sendMessage(from, { text: stdout.toString() }, { quoted: msg });
      } catch {
        let updatee = execSync('git remote set-url origin https://github.com/GataNina-Li/GataBotPlus-MD.git && git pull');
        await conn.sendMessage(from, { text: updatee.toString() }, { quoted: msg });
      }
      break;
        
        default:
            if (budy.startsWith('>')) {
                if (!isCreator) return
                try {
                    return reply(JSON.stringify(eval(budy.slice(2)), null, '\t'))
                } catch (e) {
                    e = String(e)
                    reply(e)
                }
            }
            if (budy.startsWith('=>')) {
                if (!isCreator) return
                try {
                    return  reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'))  //gata.sendMessage(from, JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'), text, { quoted: msg })
                } catch (e) {
                    e = String(e)
                    reply(e)
                }
            }
            if (budy.startsWith('$')) {
                if (!isCreator) return
                try {
                    return reply(String(execSync(budy.slice(2), { encoding: 'utf-8' })))
                } catch (e) {
                    e = String(e)
                    reply(e)
                }
            }
        }

}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
