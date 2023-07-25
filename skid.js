// Código desde cero y comentarios hecho por: 
// @gata_dios
// @Skidy89

// Importaciones 
const { downloadContentFromMessage } = require('@whiskeysockets/baileys'); // trabajar a través de descargas por Whatsapp 
const moment = require('moment-timezone') // Trabajar con fechas y horas en diferentes zonas horarias
const gradient = require('gradient-string') // Aplicar gradientes de color al texto
const { execSync } = require('child_process') // Función 'execSync' del módulo 'child_process' para ejecutar comandos en el sistema operativo
const chalk = require('chalk') // Estilizar el texto en la consola
const os = require('os') // Proporciona información del sistema operativo
const fs = require('fs') // Trabajar con el sistema de archivos
const fetch = require('node-fetch')
const axios = require('axios')
const cheerio = require('cheerio')
const gpt = require('api-dylux')
const mimetype = require("mime-types")
const webp = require("node-webpmux")
const { pinterest } = require('./addons/add-ons.js')

const color = (text, color) => { // Función 'color' que toma un texto y un color como parámetros
return !color ? chalk.cyanBright(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)} // Si no hay color, utilizar el color celeste brillante (por defecto)

// Importa varias funciones y objetos
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./lib/fuctions')
const { default: makeWASocket, proto } = require("@whiskeysockets/baileys") // Importa los objetos 'makeWASocket' y 'proto' desde el módulo '@whiskeysockets/baileys'
const { ytmp4, ytmp3, ytplay, ytplayvid } = require('./lib/youtube')
const speed = require("performance-now")
const ffmpeg = require("fluent-ffmpeg")

const msgs = (message) => { // Función 'msgs' que toma un parámetro 'message'
if (message.length >= 10) { // Longitud de 'message' es mayor o igual a 10 caracteres
return `${message.substr(0, 500)}` // Devuelve los primeros 500 caracteres de 'message'
} else { // Caso contrario
return `${message}`}} // Devuelve 'message' completo

const getCmd = (id) => { //Función llamada 'getCmd' que toma un parámetro 'id'
const stickerdb = JSON.parse(fs.readFileSync('./database/stickerdb.json'))
let anu = null;
Object.keys(stickerdb).forEach(nganu => { // Itera sobre las claves del objeto 'stickerdb' utilizando 'forEach'
if (stickerdb[nganu].id === id) { // Si el valor de la propiedad 'id' en el objeto 'stickerdb[nganu]' es igual a 'id'
anu = nganu
}})
if (anu !== null) { // De lo contrario
return stickerdb[anu].cmd // Devolver el valor de la propiedad 'cmd' en el objeto 'stickerdb[anu]'
}}
const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
return buffer}


let blockList = []
let premium = []
/**
* @param {proto.IWebMessageInfo.message} mek
* @param {proto.IWebMessageInfo} chatUpdate
* @param {import("@whiskeysockets/baileys").WASocket} 
*/
module.exports = conn = async (conn, m, chatUpdate, mek) => { // Raíz "conn" para mensajes y argumentos
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage' && m.message.imageMessage.caption) ? m.message.imageMessage.caption : (m.mtype == 'videoMessage' && m.message.videoMessage.caption ) ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :  (m.mtype == 'stickerMessage') && (getCmd(m.message.stickerMessage.fileSha256.toString()) !== null && getCmd(m.message.stickerMessage.fileSha256.toString()) !== undefined) ? getCmd(m.message.stickerMessage.fileSha256.toString()) : ''
	
// ‿︵‿︵ʚɞ『 ATRIBUTOS 』ʚɞ‿︵‿︵
if (m.key.id.startsWith("BAE5")) return
var budy = (typeof m.text == 'string' ? m.text : '') // Asignar a la variable budy el valor m.text si es cadena	
//var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
global.prefix = new RegExp('^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^' + '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@'.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']', 'i')
var prefix = global.prefix.test(body) ? body.match(global.prefix)[0] : '' // Almacenar el prefijo predeterminado
const isCmd = body.startsWith(prefix) // Verificar si el contenido de body comienza con el valor almacenado en prefix.
const from = m.chat // Remitente del mensaje
const msg = JSON.parse(JSON.stringify(mek, undefined, 2)) // Mensaje convertido a formato JSON
const content = JSON.stringify(m.message) // Contenido del mensaje convertido a formato JSON
const type = m.mtype // Tipo de mensaje
const arg = body.substring(body.indexOf(' ') + 1) // Argumento extraído del cuerpo del mensaje
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() // Comando extraído del cuerpo del mensaje
const args = body.trim().split(/ +/).slice(1) // Obtiene los argumentos del comando
const q = args.join(" ") // Une los argumentos en una sola cadena separada por espacios
let t = m.messageTimestamp // Marca de tiempo de mensaje
const pushname = m.pushName || "Sin nombre" // Obtiene el nombre de visualización del usuario de lo contrario será "Sin nombre"
const botnm = conn.user.id.split(":")[0] + "@s.whatsapp.net"
const userSender = m.key.fromMe ? botnm : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid
const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) // Eliminar todo a excepción de números
const itsMe = m.sender == conn.user.id ? true : false // Verifica si el remitente del mensaje es el propio bot
const text = args.join(" ") // Unir rgumentos en una sola cadena separada por espacios
const quoted = m.quoted ? m.quoted : m // Obtiene el mensaje citado si existe, de lo contrario, se establece como el propio mensaje
const sender = m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid // Obtiene el remitente del mensaje según el tipo de chat (individual o grupo)
const mime = (quoted.msg || quoted).mimetype || '' // Tipo de archivo adjunto del mensaje citado o del propio mensaje
const isMedia = /image|video|sticker|audio/.test(mime) // Verifica si el mensaje contiene un archivo multimedia (imagen, video, sticker o audio)
const numBot = conn.user.id.split(":")[0] + "@s.whatsapp.net" // JID del Bot
const numBot2 = conn.user.id // Número de teléfono del bot
const mentions = []
if (m.message[type].contextInfo) { 
if (m.message[type].contextInfo.mentionedJid) {
const msd = m.message[type].contextInfo.mentionedJid
for (let i = 0; i < msd.length; i++) {
mentions.push(msd[i])}}}
	
// ‿︵‿︵ʚɞ『 GRUPO 』ʚɞ‿︵‿︵
const groupMetadata = m.isGroup ? await conn.groupMetadata(from) : '' // Obtiene información del grupo
const groupName = m.isGroup ? groupMetadata.subject : '' // Nombre del grupo
const participants = m.isGroup ? await groupMetadata.participants : '' // Lista de participantes del grupo
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' // // Lista de administradores del grupo

const isBotAdmins = m.isGroup ? groupAdmins.includes(numBot) : false // Verifica si el bot es un administrador del grupo
const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false // Verifica si el remitente del mensaje es un administrador del grupo
const isBaneed = m.isGroup ? blockList.includes(userSender) : false // Verifica si el remitente del mensaje está en la lista de bloqueados
const isPremium = m.isGroup ? premium.includes(userSender) : false 

// mensajes :v
const reply = (text) => {
m.reply(text)} // Enviar una respuesta
const sendAdMessage = (text, title, body, image, url) => { conn.sendMessage(from, {text: text, contextInfo: { externalAdReply: { title: title, body: body, mediaUrl: url, sourceUrl: url, previewType: 'PHOTO', showAdAttribution: true, thumbnail: image, sourceUrl: url }}}, {})}
const sendImage = ( image, caption ) => { conn.sendMessage(from, { image: image, caption: caption }, { quoted: m })}
const sendImageAsUrl = ( url, caption ) => { conn.sendMessage(from, { image:  {url: url }, caption: caption }, { quoted: m })}

// ‿︵‿︵ʚɞ『 TIPOS DE MENSAJES Y CITADOS 』ʚɞ‿︵‿︵
const isAudio = type == 'audioMessage' // Mensaje de Audio
const isSticker = type == 'stickerMessage' // Mensaje de Sticker
const isContact = type == 'contactMessage' // Mensaje de Contacto
const isLocation = type == 'locationMessage' // Mensaje de Localización 
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message') // Mensaje citado de cualquier tipo
const isViewOnce = (type === 'viewOnceMessage') // Verifica si el tipo de mensaje es (mensaje de vista única)

//base de datos
let isNumber = x => typeof x === 'number' && !isNaN(x)
let user = global.db.data.users[m.sender]
if (typeof user !== 'object') global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!isNumber(user.limit)) user.limit = 20
if(!isNumber(user.money)) user.money = 100
if(!isNumber(user.health)) user.health = 100
if(!isNumber(user.premium)) user.premium = false
 } else global.db.data.users[m.sender] = {
afkTime: -1,
afkReason: '',
limit: 20,
money: 100,
health: 100
}
    
let chats = global.db.data.chats[m.chat]
if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
if (chats) {
if (!('antilink' in chats)) chats.antilink = false
if (!('ban' in chats)) chats.ban = false
if (!('modeadmin' in chats)) chats.modeadmin = false
if (!('welcome' in chats)) chats.welcome = true
} else global.db.data.chats[m.chat] = {
antilink: false,
ban: false, 
modeadmin: false,
welcome: true,
}
let setting = global.db.data.settings[numBot]
if (typeof setting !== 'object') global.db.data.settings[numBot] = {}
if (setting) {
if (!isNumber(setting.status)) setting.status = 0
if (!('autobio' in setting)) setting.autobio = true
} else global.db.data.settings[numBot] = {
status: 0,
autobio: true, 
}
//


    const sk = [
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

if (db.data.settings[numBot].autobio) { 
 let setting = global.db.data.settings[numBot] 
 if (new Date() * 1 - setting.status > 1000) { 
 //let uptime = await runtime(process.uptime()) 
 const bio = `${XD}\n${runtime(process.uptime())}` 
 await conn.updateProfileStatus(bio) 
 setting.status = new Date() * 1 
 }}
	
//antilink
if (db.data.chats[m.chat].antilink) {
if (budy.match(`chat.whatsapp.com`)) {
let delet = m.key.participant
let bang = m.key.id
reply(`*「 ANTI LINK 」*\n\n*𝚕𝚒𝚗𝚔 𝚍𝚎𝚝𝚎𝚌𝚝𝚊𝚍𝚘*\n*𝚕𝚘 𝚜𝚒𝚎𝚗𝚝𝚘 𝚙𝚎𝚛𝚘 𝚗𝚘 𝚜𝚎 𝚙𝚎𝚛𝚖𝚒𝚝𝚎𝚗 𝚕𝚒𝚗𝚔𝚜 𝚜𝚎𝚛𝚊𝚜 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘*`)
if (!isBotAdmins) return reply(`𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚌𝚎𝚜𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗`)
let gclink = (`https://chat.whatsapp.com/`+await conn.groupInviteCode(m.chat))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(m.text)
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}
        
//Banea chat
if (db.data.chats[m.chat].ban && !isCreator) {
return
}
if (db.data.chats[m.chat].onlyadmins && !isGroupAdmins) {
return
}
      
// Tiempo de Actividad del bot
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
//conn.sendReadReceipt(from,sender,[m.key.id])
        
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}})

// fake
const thumb = fs.readFileSync("./media/test.jpg")
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${userSender.split('@')[0]}:${userSender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: thumb, surface: 200, message: "puta gata", orderTitle: "puto aiden me lo folle", sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
const fdoc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: "A", jpegThumbnail: null}}}//const fgif = {key: {participant: `0@s.whatsapp.net`, ...(m.chat 
const kick = function (from, orangnya) {
for (let i of orangnya) {
conn.groupParticipantsUpdate(from, [i], "remove");
}}
const time = moment(Number(msg.messageTimestamp + "000")).locale("es-mx").tz("America/Asuncion").format('MMMM Do YYYY, h:mm:ss a')

// ‿︵‿︵ʚɞ『 INFO CONSOLE 』ʚɞ‿︵‿︵	
if (m.message) {
console.log(chalk.bold.cyanBright(botname), 
chalk.bold.magenta('\nHORARIO: ') + chalk.magentaBright(moment(t * 1000).tz(place).format('DD/MM/YY HH:mm:ss'),
chalk.bold.yellow('\nTIPO (SMS): ') + chalk.yellowBright(`${type}`), 
chalk.bold.cyan('\nUSUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(userSender), 
m.isGroup ? chalk.bold.greenBright('\nGRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(from) : chalk.bold.greenBright('CHAT PRIVADO'), 
//chalk.bold.red('\nETIQUETA: ') + chalk.redBright(`[${isBaneed ? 'Banned' : ''}]`),
chalk.bold.white('\nMENSAJE: ') + chalk.whiteBright(`${msgs(m.text)}\n`))
)}

// bienvenidas y despedidas
/*if (global.db.data.chats[m.chat].welcome) {
conn.ev.on('group-participants.update', async (num) => {
if (num.action === 'add') {
try {
ppimg = await conn.profilePictureUrl(`${sender.split("@")[0]}@c.us`, "image")
} catch(e) {
ppimg = noperfil
}
perfil = await getBuffer(ppimg)
await conn.sendMessage(num.id, {image: perfil, caption: `╭══════════════⪩\n┃│ _bienvenido(a)_ @${num.participants[0].split("@")[0]} a ${groupName}\n┃│  por favor lee las reglas \n┃│ *espero disfrutes*\n┃│utiliza ${prefix}menu para ver mis comandos\n┃╰══⪨\n╰══════════════⪨`, mentions: num.participants});
} else if (num.action === 'remove') {
try {
ppimg = await conn.profilePictureUrl(`${sender.split("@")[0]}@c.us`, "image")
} catch(e) {
ppimg = noperfil
}
perfil = await getBuffer(ppimg)
await conn.sendMessage(num.id, {image: perfil, caption:`╭══════════════⪩\n┃│ *adios👋* @${num.participants[0].split("@")[0]}\n┃│ lamentamos que te vayas\n┃│ seguire mejorando para brindar una mejor experiencia\n┃╰══⪨\n╰══════════════⪨ `, mentions: num.participants});
}})}*/

    //Suit PvP
    this.suit = this.suit ? this.suit : {};
    let roof = Object.values(this.suit).find(
      (roof) => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender)
    );
    if (roof) {
      let win = "";
      let tie = false;

      if (
        m.sender == roof.p2 &&
        body == "aceptar" &&
        m.isGroup &&
        roof.status == "wait"
      ) {
        if (/^(no|rechazar)/i.test(m.text)) {
          satoru.sendTextWithMentions(
            m.chat,
            `@${roof.p2.split`@`[0]} no acepto el juego :v`,
            m
          );
          delete this.suit[roof.id];
          return !0;
        }
        roof.status = "play";
        roof.asal = m.chat;
        clearTimeout(roof.waktu);
        //delete roof[roof.id].waktu
        satoru.sendText(
          m.chat,
          `
┌〔 *mensaje privado 〕
│
├  *Jugador 1:* @${roof.p.split`@`[0]} 
│
├  *jugador 2:* @${roof.p2.split`@`[0]}
│
└ por favor ve el privado del bot `,
          m,
          { mentions: [roof.p, roof.p2] }
        );
        if (!roof.pilih)
          conn.sendText(
            roof.p,
            `por favor escribe \n\nPiedra 🗿\nPapel 📄\nTijera ✂️`
          );
        if (!roof.pilih2)
          satoru.sendText(
            roof.p2,
            `por favor escribe \n\nPiedra 🗿\nPapel 📄\nTijera ✂️`,
            m
          );
        roof.waktu_milih = setTimeout(() => {
          if (!roof.pilih && !roof.pilih2)
            satoru.sendText(
              m.chat,
              `ambos judagores no quieren jugar\nPPT cancelado`
            );
          else if (!roof.pilih || !roof.pilih2) {
            win = !roof.pilih ? roof.p2 : roof.p;
            satoru.sendTextWithMentions(
              m.chat,
              `@${
                (roof.pilih ? roof.p2 : roof.p).split`@`[0]
              } no escogio, el juego a terminado`,
              m
            );
          }
          delete this.suit[roof.id];
          return !0;
        }, roof.timeout);
      }
      let jwb = m.sender == roof.p;
      let jwb2 = m.sender == roof.p2;
      let g = /tijera/i;
      let b = /piedra/i;
      let k = /papel/i;
      let reg = /^(tesoura|pedra|papel)/i;
      if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
        roof.pilih = reg.exec(m.text.toLowerCase())[0];
        roof.text = m.text;
        reply(
          `elegiste ${m.text} ${
            !roof.pilih2 ? `\n\nesperando al oponente...` : ""
          }`
        );
        if (!roof.pilih2)
          conn.sendText(
            roof.p2,
            "_el oponente ya eligio_\nte toca elegir",
            0
          );
      }
      if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
        roof.pilih2 = reg.exec(m.text.toLowerCase())[0];
        roof.text2 = m.text;
        reply(
          `Você escolheu ${m.text} ${
            !roof.pilih ? `\n\nesperando al oponente...` : ""
          }`
        );
        if (!roof.pilih)
          conn.sendText(
            roof.p,
            "_el oponente ya eligio_\nte toca elegir",
            0
          );
      }
      let stage = roof.pilih;
      let stage2 = roof.pilih2;
      if (roof.pilih && roof.pilih2) {
        clearTimeout(roof.waktu_milih);
        if (b.test(stage) && g.test(stage2)) win = roof.p;
        else if (b.test(stage) && k.test(stage2)) win = roof.p2;
        else if (g.test(stage) && k.test(stage2)) win = roof.p;
        else if (g.test(stage) && b.test(stage2)) win = roof.p2;
        else if (k.test(stage) && b.test(stage2)) win = roof.p;
        else if (k.test(stage) && g.test(stage2)) win = roof.p2;
        else if (stage == stage2) tie = true;
        conn.sendText(
          roof.asal,
          `_*Resultado:*_${tie ? "\n" : ""}

@${roof.p.split`@`[0]} jogou ${roof.text}! ${
            tie ? "" : roof.p == win ? ` ganaste!!\n` : `\n`
          }
@${roof.p2.split`@`[0]} jogou ${roof.text2}! ${
            tie ? "" : roof.p2 == win ? ` ganaste!! \n` : `\n`
          }
`.trim(),
          m,
          { mentions: [roof.p, roof.p2] }
        );
        delete this.suit[roof.id];
      }
    }
	
switch (command) {

		case 'ppt':
{
this.suit = this.suit ? this.suit : {}
let poin = 10
let poin_lose = 10
let timeout = 60000
if (
Object.values(this.suit).find(
(roof) =>
roof.id.startsWith("ppt") &&
[roof.p, roof.p2].includes(m.sender)
)
)
return reply("primero completa o espera a que termine el juego anterior")
if (m.mentionedJid[0] === m.sender)
	return reply("no puedes jugar conmigo\nezquisofrenico de mierda")
if (!m.mentionedJid[0])
	return reply("con quien quieres jugar?\nvamos etiqueta a la persona")
if (
Object.values(this.suit).find (
(roof) =>
roof.id.startsWith("suit") &&
[roof.p, roof.p2].includes(m.mentionedJid[0])
)
)
return reply("esa persona esta jugando con otra :(")
let id = "ppt_" + new Date() * 1
let caption = `
esto es solo  un test pon aceptar o rechazar`
this.suit[id] = {
	chat: await m.reply(caption),
	id: id,
	p: m.sender,
	p2: m.mentionedJid[0],
	status: "wait",
	waktu: setTimeout(() =>
	if (this.suit[id])
		conn.sendText(m.chat, "_tiempo agotado_", m)
	delete this.suit[id]
},60000),
poin,
poin_lose,
timeout,
}
break
		
case 's':
case 'sticker': {
    if (/image/.test(mime)) {
        reply(`Espera, estamos creando tu sticker...`)
        media = await quoted.download()
        let encmedia = await conn.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(encmedia)
    } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 40) return reply('¡Máximo 40 segundos!')
        media = await quoted.download()
        let encmedia = await conn.sendVideoAsSticker(from, media, m, { packname: global.author, author: global.packname })
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        await fs.unlinkSync(encmedia)
    } else {
        reply(`Envía una imagen/video con ${prefix + comando}\n(La duración del video solo puede ser de 10 segundos)`)
    }
}
break;



case 'attp':
  if (!text) return reply('ingresa algo para convertirlo a sticker :v')
  link = `https://api.lolhuman.xyz/api/attp?apikey=${lolkeysapi}&text=${text}`
  conn.sendMessage(m.chat, { sticker: { url: link } }, { quoted: fkontak })
  break

case 'yts':
  if (!text) throw `Ejemplo: ${prefix + comand} historia wa anime`;
  const yts = require("youtube-yts");
  const search = await yts(text);
  let teks = 'Búsqueda en YouTube\n\nResultados de ' + text + '\n\n';
  let no = 1;
  let themeemoji = "✨";
  for (let i of search.all) {
    teks += `${themeemoji} No: ${no++}\n${themeemoji} Tipo: ${i.type}\n${themeemoji} ID del Video: ${i.videoId}\n${themeemoji} Título: ${i.title}\n${themeemoji} Vistas: ${i.views}\n${themeemoji} Duración: ${i.timestamp}\n${themeemoji} Subido: ${i.ago}\n${themeemoji} URL: ${i.url}\n\n━━━━━━━━━━━━\n\n`;
  }
  await conn.sendMessage(from, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: fkontak });
  break

case 'welcome':
case 'modeadmin':
case 'antilink': {
  if (!m.isGroup) return reply(mess.group);
  if (!isBotAdmins) return reply(mess.botAdmin);
  if (!isGroupAdmins) return reply(mess.admin);
  if (args[0] === "on") {
    if (db.data.chats[m.chat].command) return reply(`Activo`);
    db.data.chats[m.chat].antilink = true;
    reply(`✅El ${command} se activo con exito!`);
  } else if (args[0] === "off") {
    if (!db.data.chats[m.chat].antilink) return reply(`off`);
    db.data.chats[m.chat].antilink = false;
    reply(`${command} desactivado !`);
  }
}
break

case 'leave': {
  if (!isCreator) return reply(`*este comando solo es para mi jefe*`);
  reply(m.chat, `*Adios fue un gusto estar aqui hasta pronto*`);
  await conn.groupLeave(m.chat);
}
break

case 'kick': {
  if (!m.isGroup) return reply(mess.group);
  if (!isBotAdmins) return reply(mess.botAdmin);
  if (!isGroupAdmins) return reply(mess.admin);
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  conn.groupParticipantsUpdate(m.chat, [users], 'remove');
}
break

case 'promote': {
  if (!m.isGroup) return reply(mess.group);
  if (!isBotAdmins) return reply(mess.botAdmin);
  if (!isGroupAdmins) return reply(mess.admin);
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)));
}
break

case 'demote': {
  if (!m.isGroup) return reply(mess.group);
  if (!isBotAdmins) return reply(mess.botAdmin);
  if (!isGroupAdmins) return reply(mess.admin);
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)));
}
break

case 'banchat': {
  if (!m.isGroup) return reply(mess.group);
  if (!isBotAdmins) return reply(mess.botAdmin);
  if (!isGroupAdmins) return reply(mess.admin);
  if (args[0] === "on") {
    if (db.data.chats[m.chat].ban) return reply(`*Chat baneado*`);
    db.data.chats[m.chat].ban = true;
    reply(`𝚎𝚜𝚝𝚎 𝚌𝚑𝚊𝚝 𝚏𝚞𝚎 𝚋𝚊𝚗𝚎𝚊𝚍𝚘 𝚌𝚘𝚗 𝚎𝚡𝚒𝚝𝚘`);
  } else if (args[0] === "off") {
    if (!db.data.chats[m.chat].ban) return reply(`*Chat desbaneado*`);
    db.data.chats[m.chat].ban = false;
    reply(`𝚎𝚜𝚝𝚎 𝚌𝚑𝚊𝚝 𝚏𝚞𝚎 𝚍𝚎𝚜𝚋𝚊𝚗𝚎𝚊𝚍𝚘 𝚌𝚘𝚗 𝚎𝚡𝚒𝚝𝚘`);
  }
}
break

case 'blackpink':
case 'bloodfrosted':
case 'neon':
case 'minion':
case 'toxic':
case 'cloud':
case 'hallowen':
  if (!text) { m.reply('test') }
  lol = `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${lolkeysapi}&text=${text}`
  sendImageAsUrl(lol, `aqui esta su texto en estilo ${command}`)
  break

case 'avenger':
case 'space':
case 'avenger':
  if (!text) { m.reply('test') }
  lol = `https://api.lolhuman.xyz/api/textprome2/${command}?apikey=${lolkeysapi}&text=${text}`
  sendImageAsUrl(lol, `aqui esta su texto en estilo ${command}`)
  break

case 'hidetag':
  if (!m.isGroup) return responder(mess.group);
  if (isGroupAdmins || isCreator) {
    conn.sendMessage(
      m.chat,
      { text: q ? q : "", mentions: participants.map((a) => a.id) },
      { quoted: isGroupAdmins ? null : m }
    );
  }
  break;

case 'tagall': {
  if (!m.isGroup) return reply(mess.group);
  if (!isBotAdmins) return reply(mess.botAdmin);
  if (!isGroupAdmins) return reply(mess.admin);
  let teks = `✿ ━〔 *🍬 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎́𝐍 𝐌𝐀𝐒𝐈𝐕𝐀  🍬* 〕━ ✿\n\n`;
  teks += `✿ 𝐒𝐔 𝐀𝐃𝐌𝐈𝐍 𝐋𝐎𝐒 𝐈𝐍𝐕𝐎𝐂𝐀, 𝐑𝐄𝐕𝐈𝐕𝐀𝐍\n\n`;
  teks += `✿ 𝐌𝐄𝐍𝐒𝐀𝐉𝐄:  ${q ? q : 'no hay mensaje :v'}\n\n`;
  for (let mem of participants) {
    teks += `┃@${mem.id.split('@')[0]}\n⁩`;
  }
  teks += `┃\n`;
  teks += `╰━━━━━[ *${botname}* ]━━━━━⬣`;
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m });
}
break

case 'estado':
  const totalMemory = Math.round(os.totalmem() / (1024 * 1024 * 1024));
  const freeMemory = Math.round(os.freemem() / (1024 * 1024 * 1024));
  const usedMemory = totalMemory - freeMemory;
  const cpuUsage = os.loadavg()[0];

  conn.sendMessage(m.chat, {
    image: menu,
    caption: `*╭𝄗𝄗✦ --ESTADO-- ✦𝄗𝄗⬣*
    ⎸ *⍟ Versión de ${botname}*
    ⎸ ❉ ➺ ${vs}
    ⎸ ┈┈┈┈┈┈┈┈┈┈┈
    ⎸ ❉ *Hots : ${os.hostname()}*
    ⎸ ❉ *Platform : ${os.platform()}*
    ⎸ ❉ *RAM usada ➺ ${usedMemory} GB / ${totalMemory} GB*
    ⎸ ❉ *CPU usada ➺ ${cpuUsage.toFixed(2)}%*
    ⎸ ❉ *Memoria total ➺ ${totalMemory} GB*
    ⎸ ┈┈┈┈┈┈┈┈┈┈┈
    ⎸ ❉ *Usuarios : ${Object.keys(global.db.data.users).length}*
    ⎸ ❉ *Actividad ➺ ${runtime(process.uptime())}*
    *╰𝄗𝄗𝄗𝄗𝄗⬣*`
  }, { quoted: fkontak });
  break;

case 'ping':
  var timestamp = speed();
  var latensi = speed() - timestamp
  conn.sendMessage(from, { text: `*Pong 🏓  ${latensi.toFixed(4)}*` }, { quoted: msg });
  break

case 'ia':
case 'chatgpt':
  if (!text) return conn.sendMessage(from, { text: `*INGRESE EL TEXTO DE LO QUE QUIERE BUSCAR?*` }, { quoted: msg });
  await conn.sendPresenceUpdate('composing', m.chat);
  let jailbreak = await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(v => v.text());
  await conn.sendPresenceUpdate('composing', m.chat);
  var syms = `${jailbreak}`;
  var res = await gpt.ChatGpt(text, syms);
  await sendAdMessage(res.text, 'chat gpt', 'exploit mode', chatgpt, 'https://wa.me/+5218442114446');
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
  break

case 'play2':
  if (!text) return conn.sendMessage(from, { text: `*ingrese nombre de alguna cancion*` }, { quoted: msg });
  conn.sendMessage(from, { text: `*Aguarde un momento*` }, { quoted: fdoc });
  let mediaa = await ytplayvid(textoo);
  await conn.sendMessage(from, { video: { url: mediaa.result }, fileName: `error.mp4`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: msg });
  break

case 'update':
  if (!isCreator) return conn.sendMessage(from, { text: `*ESTE COMANDO ES PARA MI JEFE*` }, { quoted: msg });
  try {
    let stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))
    await conn.sendMessage(from, { text: stdout.toString() }, { quoted: msg });
  } catch {
    let updatee = execSync('git remote set-url origin https://github.com/Skidy89/skid-bot && git pull')
    await conn.sendMessage(from, { text: updatee.toString() }, { quoted: msg });
  }
  break

case 'simi': {
  if (!text) return conn.sendMessage(from, { text: `*INGRESE UN TEXTO PARA HABLAR CONMIGO*` }, { quoted: msg });
  await conn.sendPresenceUpdate('composing', m.chat);
  let anu = await fetchJson(`https://api.simsimi.net/v2/?text=${text}&lc=es&cf=false`);
  let res = anu.success;
  m.reply(res);
  d = Math.floor(Math.random() * 6) + 5
  global.db.data.users[m.sender].money -= d
  m.reply(`has gastado ${d} dolares`);
}
break

case 'pinterest':
if (!text) return reply('𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚙𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝')
m.reply(mess.wait)
lol = await pinterest(text) //.catch(m.reply)
result = lol[Math.floor(Math.random() * lol.length)];
sendImageAsUrl(result, `*-------「 PINTEREST 」-------*\n🤠 busqueda de ${text}\n🔗 url ${result}`)
break

        
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
                    return  reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t')) 
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
