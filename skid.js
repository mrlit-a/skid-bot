// Código desde cero y comentarios hecho por:   
  // @gata_dios  
  // @Skidy89  
  
  // Importaciones   
  const { downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent, generateWAMessage, prepareWAMessageMedia, relayMessage} = require('@whiskeysockets/baileys'); 
  const moment = require('moment-timezone')  
  const gradient = require('gradient-string') 
  const { execSync, exec, spawn  } = require('child_process') 
  const chalk = require('chalk')   
  const os = require('os') 
  const fs = require('fs') 
  const fetch = require('node-fetch')  
  const axios = require('axios')  
  const cheerio = require('cheerio')
  const { skmenu } = require('./lib/menu.js')
  const QrCode = require('qrcode-reader')
  const qrcode = require('qrcode')
  const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader.js')
  const { toAudio, toPTT, toVideo } = require('./lib/converter.js')
  const mimetype = require("mime-types")  
  const {jadibot, listJadibot } = require('./serbot.js')  
  const webp = require("node-webpmux")  
  const { pinterest } = require('./lib/RandomFuctions.js')  
  const ffmpeg = require('fluent-ffmpeg')
  const JavaScriptObfuscator = require('javascript-obfuscator')
  const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, msToTime, downloadMediaMessage } = require('./lib/fuctions')  
  const { default: makeWASocket, proto } = require("@whiskeysockets/baileys")
  const speed = require("performance-now")  
  
  const color = (text, color) => { 
  return !color ? chalk.cyanBright(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)
  }
  
  const msgs = (message) => { 
  if (message.length >= 10) { 
  return `${message.substr(0, 500)}` 
  } else { 
  return `${message}`}} 
  
  const addCmd = (cmd, id) =>  {
    const stickerdb = global.db.data.sticker // gracias a aiden
    stickerdb[id] = {
    id: id,
    cmd: cmd
    }
  }
  
  const getCmd = (id) => {
  const stickerdb = global.db.data.sticker
  let anu = null;  
  Object.keys(stickerdb).forEach(nganu => { 
  if (stickerdb[nganu].id === id) { 
  anu = nganu  
  }})  
  if (anu !== null) {  
  return stickerdb[anu].cmd  
  }}
 const downloadMp3 = async (Link) => {
    try {
    await ytdl.getInfo(Link)
    let mp3File = getRandom('.mp3')
    console.log(color('Download Audio With ytdl-core'))
    ytdl(Link, { filter: 'audioonly' })
    .pipe(fs.createWriteStream(mp3File))
    .on('finish', async () => {
    await conn.sendMessage(from, { audio: fs.readFileSync(mp3File), mimetype: 'audio/mp4' }, { quoted: m })
    fs.unlinkSync(mp3File)
    })
    } catch (err) {
    m.reply(`${err}`)
    }
    }

    const downloadMp4 = async (Link) => {
    try {
    await ytdl.getInfo(Link)
    let mp4File = getRandom('.mp4')
    console.log(color('Download Video With ytdl-core'))
    let nana = ytdl(Link)
    .pipe(fs.createWriteStream(mp4File))
    .on('finish', async () => {
    await conn.sendMessage(from, { video: fs.readFileSync(mp4File), gifPlayback: false }, { quoted: m })
    fs.unlinkSync(`./temp/${mp4File}`)
    })
    } catch (err) {
    m.reply(`${err}`)
    }
    }
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
  module.exports = conn = async (conn, m, chatUpdate, mek) => {  
  var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage' && m.message.imageMessage.caption) ? m.message.imageMessage.caption : (m.mtype == 'videoMessage' && m.message.videoMessage.caption ) ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :  (m.mtype == 'stickerMessage') && (getCmd(m.message.stickerMessage.fileSha256.toString()) !== null && getCmd(m.message.stickerMessage.fileSha256.toString()) !== undefined) ? getCmd(m.message.stickerMessage.fileSha256.toString()) : ''  
  
  
  if (m.key.id.startsWith("BAE5")) return  
  var budy = (typeof m.text == 'string' ? m.text : '') 
  global.prefix = new RegExp('^[°•π÷×¶∆£¢€¥®™+✓_=/|~!?@#$%^&.©^' + '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@'.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']', 'i')  
  var prefix = global.prefix.test(body) ? body.match(global.prefix)[0] : '' 
  const isCmd = body.startsWith(prefix)   
  const from = m.chat 
  const msg = JSON.parse(JSON.stringify(mek, undefined, 2)) 
  const content = JSON.stringify(m.message) 
  const type = m.mtype 
  const arg = body.substring(body.indexOf(' ') + 1) 
  const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() 
  const args = body.trim().split(/ +/).slice(1) 
  const q = args.join(" ") 
  let t = m.messageTimestamp 
  const pushname = m.pushName || "Sin nombre" 
  const botnm = conn.user.id.split(":")[0] + "@s.whatsapp.net"  
  const userSender = m.key.fromMe ? botnm : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid  
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) 
  const itsMe = m.sender == conn.user.id ? true : false 
  const text = args.join(" ") 
  const quoted = m.quoted ? m.quoted : m 
  const sender = m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid 
  const mime = (quoted.msg || quoted).mimetype || ''  
  const isMedia = /image|video|sticker|audio/.test(mime) 
  
  const mentions = []  
  if (m.message[type].contextInfo) {   
  if (m.message[type].contextInfo.mentionedJid) {  
  const msd = m.message[type].contextInfo.mentionedJid  
  for (let i = 0; i < msd.length; i++) {  
  mentions.push(msd[i])}}}  
  
  // ‿︵‿︵ʚɞ『 GRUPO 』ʚɞ‿︵‿︵  
  const groupMetadata = m.isGroup ? await conn.groupMetadata(from) : ''
  const groupName = m.isGroup ? groupMetadata.subject : '' 
  const participants = m.isGroup ? await groupMetadata.participants : '' 
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
  
  const isBotAdmins = m.isGroup ? groupAdmins.includes(botnm) : false  
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false 
  const isBaneed = m.isGroup ? blockList.includes(userSender) : false 
  const isPremium = m.isGroup ? premium.includes(userSender) : false   
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  
  
  // mensajes :v  
  const reply = (text) => {  
  m.reply(text)} 
  const sendAdMessage = (text, title, body, image, url) => { conn.sendMessage(m.chat, {text: text, contextInfo: { externalAdReply: { title: title, body: body, mediaUrl: url, sourceUrl: url, previewType: 'PHOTO', showAdAttribution: true, thumbnail: image, sourceUrl: url }}}, {})}  
  const sendImage = ( image, caption ) => { conn.sendMessage(m.chat, { image: image, caption: caption }, { quoted: m })}  
  const sendImageAsUrl = ( url, caption ) => { conn.sendMessage(m.chat, { image:  {url: url }, caption: caption }, { quoted: m })}  

  
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
    async function loading () {
    var hawemod = [
    "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
    "《 ████▒▒▒▒▒▒▒▒》30%",
    "《 ███████▒▒▒▒▒》50%",
    "《 ██████████▒▒》80%",
    "《 ████████████》100%",
    "~_*CARGA COMPLETA*_~"
    ]
    let { key } = await conn.sendMessage(from, {text: '_*cargando*_'}) // loading message

    for (let i = 0; i < hawemod.length; i++) {
    /*await delay(10)*/
    await conn.sendMessage(from, {text: hawemod[i], edit: key }) // load complete (edited text)
    }
    }
  

// database  
let user = global.db.data.users[m.sender]
let chats = global.db.data.users[m.chat]
let setting = global.db.data.settings[conn.user.jid]  

    if (global.db.data.chats[m.chat].antiFake) {
     if (m.chat && m.sender.startsWith('1')) return conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    
    if (global.db.data.chats[m.chat].antiArabe) {
      if (m.chat && m.sender.startsWith('212')) return conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }

    if (global.db.data.chats[m.chat].isBanned && isCmd && !isGroupAdmins) {
    return
    }
    
  if (global.db.data.chats[m.chat].antilink) {  
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
  
  if (!conn.public) {
    if (!m.key.fromMe) return
    }


  const used = process.memoryUsage()  
  const cpus = os.cpus().map(cpu => {  
  cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)  
  return cpu  
  })  
  
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
  
  
  let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${userSender.split('@')[0]}:${userSender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
  const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: menu, surface: 200, message: "puta gata", orderTitle: "puto aiden me lo folle", sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}  
  const fdoc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: "A", jpegThumbnail: null}}}  
  
  
  const kick = function (from, orangnya) {  
  for (let i of orangnya) {  
  conn.groupParticipantsUpdate(m.chat, [i], "remove");  
  }}  
  const time = moment(Number(msg.messageTimestamp + "000")).locale("es-mx").tz("America/Asuncion").format('MMMM Do YYYY, h:mm:ss a')  
  
  // ‿︵‿︵ʚɞ『 INFO CONSOLE 』ʚɞ‿︵‿︵          
  if (m.message) {  
  console.log(  
  chalk.bold.cyanBright(botname + `${conn.user.id == global.numBot2 ? '' : '(jadibot)'}`),   
  chalk.bold.magenta('\n⏰ HORARIO: ') + chalk.magentaBright(moment(t * 1000).tz(place).format('DD/MM/YY HH:mm:ss'),  
  chalk.bold.yellow('\n📥 TIPO (SMS): ') + chalk.yellowBright(`${type}`),   
  chalk.bold.cyan('\n👤 USUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(userSender),   
  m.isGroup ? chalk.bold.greenBright('\n👥 GRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(from) : chalk.bold.greenBright('📊 CHAT PRIVADO'),   
  //chalk.bold.red('\n️ Tag: ') + chalk.redBright(`[${isBaneed ? 'Banned' : ''}]`),  
  chalk.bold.white('\n💬 MENSAJE: ') + chalk.whiteBright(`${msgs(m.text)}\n`))  
  )}    
/*  if (getCmd) {
  console.log(gradient.cyan(cmd))
  } */

  let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let jid of mentionUser) {
let user = global.db.data.users[jid]
if (!user) continue
let afkTime = user.afkTime
if (!afkTime || afkTime < 0) continue
let reason = user.afkReason || ''
m.reply(`¡No lo etiquetes!
*el esta afk ${reason ? 'por la razon: ' + reason : 'sin razon'}*
Durante ${clockString(new Date - afkTime)}
`.trim())
}
if (global.db.data.users[m.sender].afkTime > -1) {
let user = global.db.data.users[m.sender]
m.reply(`
dejo de estar afk ${user.afkReason ? 'por: ' + user.afkReason : ''}
durante ${clockString(new Date - user.afkTime)}
`.trim())
user.afkTime = -1
user.afkReason = ''
}

  let mathGame = global.db.data.game.math = [] 
  let ppt = global.db.data.game.ppt = []
  let ttt = global.db.data.game.ppt = []
  
  
    if (global.db.data.chats[m.chat].autoSticker) {  
          if (/image/.test(mime)) {  
          reply(`Espera, estamos creando tu sticker...\n*Auto Sticker Activado*`)  
          media = await quoted.download()  
          let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
          await fs.unlinkSync(encmedia)  
        } else if (/video/.test(mime)) {  
          if ((quoted.msg || quoted).seconds > 40) return reply('¡Máximo 40 segundos!')  
          media = await quoted.download()  
          let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: goblal.author })  
          await new Promise((resolve) => setTimeout(resolve, 2000));   
          await fs.unlinkSync(encmedia)  
      }}

  
  switch (command) {  
              case 'acortar':
            if (!text) return m.reply(`*[❗] INFO [❗]*\n*Ingresa un link para acortar!!*`)
            let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()  
            if (!shortUrl1) return m.reply(`*[❗] ERROR [❗]*`)
            let done = `*LINK ACORTADO CORRECTAMENTE*\n*link: ${text}*\n*Link Acortado: ${shortUrl1}*`
            m.reply(done)
            break
   case 'menu':
   await loading()
   conn.adReply(m.chat, skmenu(conn, prefix, pushname, m), global.menu, fkontak, true)
   break 
   
   case 'afk':
   let user = global.db.data.users[m.sender]
    user.afkTime = + new Date
    user.afkReason = text
    m.reply(`${pushname}... estara afk por ${text ? ': ' + text : ''}`)
   break
   
   
    
  
     case 'nowa': 
     let regex = /x/g 
     if (!text) m.reply('⚠️ Falto el número.')
     if (!text.match(regex)) m.reply(`*Ejemplo de uso: ${prefix + command} 521999340434x*`)
     let random = text.match(regex).length, total = Math.pow(10, random), array = [] 
     for (let i = 0; i < total; i++) { 
     let list = [...i.toString().padStart(random, '0')] 
     let result = text.replace(regex, () => list.shift()) + '@s.whatsapp.net' 
     if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) { 
     let info = await conn.fetchStatus(result).catch(_ => {}) 
     array.push({ exists: true, jid: result, ...info }) 
     } else { 
     array.push({ exists: false, jid: result }) 
     }} 
     let txt = 'Registrados\n\n' + array.filter(v => v.exists).map(v => `• Nro: wa.me/${v.jid.split('@')[0]}\n*• Bio:* ${v.status || 'Sin descripcion'}\n*• Fecha:* ${formatDate(v.setAt)}`).join('\n\n') + '\n\n*No registrados*\n\n' + array.filter(v => !v.exists).map(v => v.jid.split('@')[0]).join('\n') 
     m.reply(txt) 
     function formatDate(n, locale = 'id') { 
     let d = new Date(n) 
     return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' })} 
    break 


    case 'qc': case'text': {
    if (!args[0] && !m.quoted) {
      return conn.adReply(m.chat, `*nesecitas un texto*`)
    }
    let userPfp
    if (m.quoted) {
      try {
        userPfp = await conn.profilePictureUrl(m.quoted.sender, "image")
      } catch (e) {
        userPfp = defaultpp
      }
    } else {
      try {
        userPfp = await conn.profilePictureUrl(m.sender, "image")
      } catch (e) {
        userPfp = defaultpp
      }
    }
    const waUserName = pushname
    const quoteText = m.quoted ? m.quoted.body : args.join(" ")
    const quoteJson = {
      type: "quote",
      format: "png",
      backgroundColor: "#FFFFFF",
      width: 700,
      height: 580,
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: waUserName,
            photo: {
              url: userPfp,
            },
          },
          text: quoteText,
          replyMessage: {},
        },
      ],
    }
    try {
      const quoteResponse = await axios.post("https://bot.lyo.su/quote/generate", quoteJson, {
        headers: { "Content-Type": "application/json" },
      })
      const buffer = Buffer.from(quoteResponse.data.result.image, "base64")
      conn.sendImageAsSticker(m.chat, buffer, m, {
        packname: packname,
        author: author,
      })
    } catch (error) {
      console.error(error)
      conn.adReply(m.chat, 'Error', menu, fkontak)
    }
    }
    break

     case 'grupo':
    if (!m.isGroup) return reply(mess.group);  
    if (!isBotAdmins) return reply(mess.botAdmin);  
    if (!isGroupAdmins) return reply(mess.admin)
      if (args[0] === 'abrir') {
    m.reply(`*GRUPO ABIERTO CON EXITO✅*`)
    await conn.groupSettingUpdate(m.chat, 'not_announcement')
    } else if (args[0] === 'cerrar') {
    m.reply(`*GRUPO CERRADO CON EXITO✅*`)
    await conn.groupSettingUpdate(m.chat, 'announcement')
    }
    break



    case 'public':
      if(!conn.user.id) return conn.fakeReply(m.chat, mess.owner, '0@s.whatsapp.net', 'no eres owner 😵‍💫')
      conn.public = true
      m.reply('*ahora el bot es de uso publico*')
      break
  
      case 'self':
      if(!conn.user.id) return conn.fakeReply(m.chat, mess.owner, '0@s.whatsapp.net', 'no eres owner 😵‍💫')
      conn.public = false
      m.reply('*ahora el bot es de uso privado*')
      break
  
  
      case 'serbot':  
      if (m.isGroup) return m.reply(mess.priv) 
      await jadibot(conn, m, m.chat, command, prefix)  
      break  
  
      case 'bots':  
     try { 
     let user = [... new Set([...global.listJadibot.filter(conn => conn.user).map(conn => conn.user)])] 
     te = "*lista de subbots*\n\n" 
     for (let i of user){ 
     y = await conn.decodeJid(i.id) 
     te += " × User : @" + y.split("@")[0] + "\n" 
     te += " × Name : " + i.name + "\n\n" 
     } 
     conn.sendMessage(from ,{text: te, mentions: [y], },{quoted: m}) 
     } catch (err) { 
     reply(`*no hay subbots activos*`) 
     } 
     break 
    case "call":
    if (!isCreator) return m.reply(mess.owner)
    if (!args[0]) return reply(`*${prefix+command} +52xxx*\n*Ejemplo ${prefix+command} +584125778026*`)
    let nosend = "+" + text.split("|")[0].replace(/[^0-9]/g, '')
    if (args[0].startsWith(`+528442114446`)) return reply('¡No puedo llamar a este número!')
    axios.post('https://magneto.api.halodoc.com/api/v1/users/authentication/otp/requests',{'phone_number':`${nosend}`,'channel': 'voice'},{headers: {'authority': 'magneto.api.halodoc.com','accept-language': 'id,en;q=0.9,en-GB;q=0.8,en-US;q=0.7','cookie': '_gcl_au=1.1.1860823839.1661903409; _ga=GA1.2.508329863.1661903409; afUserId=52293775-f4c9-4ce2-9002-5137c5a1ed24-p; XSRF-TOKEN=12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636; _gid=GA1.2.798137486.1664887110; ab.storage.deviceId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%2218bb4559-2170-9c14-ddcd-2dc80d13c3e3%22%2C%22c%22%3A1656491802961%2C%22l%22%3A1664887110254%7D; amp_394863=nZm2vDUbDAvSia6NQPaGum...1gehg2efd.1gehg3c19.f.0.f; ab.storage.sessionId.1cc23a4b-a089-4f67-acbf-d4683ecd0ae7=%7B%22g%22%3A%22f1b09ad8-a7d9-16f3-eb99-a97ba52677d2%22%2C%22e%22%3A1664888940400%2C%22c%22%3A1664887110252%2C%22l%22%3A1664887140400%7D','origin': 'https://www.halodoc.com','sec-ch-ua': '"Microsoft Edge";v="105", "Not)A;Brand";v="8", "Chromium";v="105"','sec-ch-ua-mobile': '?0','sec-ch-ua-platform': '"Windows"','sec-fetch-dest': 'empty','sec-fetch-mode': 'cors','sec-fetch-site': 'same-site','user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.53','x-xsrf-token': '12D59ACD8AA0B88A7ACE05BB574FAF8955D23DBA28E8EE54F30BCB106413A89C1752BA30DC063940ED30A599C055CC810636'}}).then(function (response) {reply(`${JSON.stringify(response.data, null, 2)}`)}).catch(function (error) {reply(`${JSON.stringify(error, null, 2)}`)})
    break
    case 'fake':
    var gh = body.slice(11);
    var mentioned = m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.mentionedJid ? m.message.extendedTextMessage.contextInfo.mentionedJid[0] : null;
    var replace = gh.split("|")[0];
    var target = gh.split("|")[1];
    var bot = gh.split("|")[2];

    if (mentioned && target && bot) {
      var quotedMessage = {
        key: {
          fromMe: false,
          participant: mentioned
        },
        message: {
          conversation: target
        }
      };

      var sendMessageOptions = {
        text: `${bot}`,
        quoted: quotedMessage
      };

      conn.sendMessage(m.chat, sendMessageOptions, { quoted: quotedMessage });
    } else {
      conn.sendMessage(m.chat, { text: 'Uso incorrecto del comando. Ejemplo: ${prefix + command} @usuario1|Este es el mensaje falso|Hola, esto es un mensaje real que se citará' });
    }
    break
  
      case 's':  
      case 'sticker': {  
          if (/image/.test(mime)) {  
          reply(`Espera, estamos creando tu sticker...`)  
          media = await quoted.download()  
          let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
          await fs.unlinkSync(encmedia)  
        } else if (/video/.test(mime)) {  
          if ((quoted.msg || quoted).seconds > 40) return reply('¡Máximo 40 segundos!')  
          media = await quoted.download()  
          let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: goblal.author })  
          await new Promise((resolve) => setTimeout(resolve, 2000));   
          await fs.unlinkSync(encmedia)  
      } else {  
          reply(`*Envía una imagen/video con ${prefix + command}*\n_*(La duración del video solo puede ser de 10 segundos)*_`)  
          }  
      }  
      break
  
            
      case 'tiktokvideo':
      case 'tiktok':
    if (!text) return m.reply( `*Ejemplo: ${prefix + command} link`)
    if (!q.includes('tiktok')) return m.reply(`*link invalido!*`)
    await loading ()
    require('./lib/tiktok').Tiktok(q).then( data => {
    conn.sendMessage(m.chat, { video: { url: data.nowm }}, { quoted: m })
    })    
    break
    
    case 'tiktokmp3':
    case 'tiktokaudio':
    if (!text) return m.reply( `*Ejemplo: ${prefix + command} link*`)
    if (!q.includes('tiktok')) return m.reply(`*link invalido!*`)
    require('./lib/tiktok').Tiktok(q).then( data => {
    conn.sendMessage(m.chat, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
    })    
    break
            

    case 'tomp3': case 'mp3':
    if (!/video/.test(mime) && !/audio/.test(mime)) return conn.sendCart(m.chat, `*Responde a un video para convertitlo a mp3*`, global.query, fkontak)
    if (!m.quoted) return conn.sendCart(m.chat, `*responde a un video para convertirlo a mp3 con ${prefix + command}*`, global.query, fkontak)
    let { toAudio } = require('./lib/converter')
    let medias = await downloadMediaMessage(m.quoted)
    let audio = await toAudio(medias, 'mp4')
    conn.sendAudio(m.chat, audio, m)
    break
    
         case 'ofuscar':
       if (!text) return m.reply("*Ingresa el codigo que vas a ofuscar.*"); 
         function obfuscateCode(code) { 
        return JavaScriptObfuscator.obfuscate(code, { 
        compact: false, 
          controlFlowFlattening: true, 
        deadCodeInjection: true, 
        simplify: true, 
          numbersToExpressions: true, 
        }).getObfuscatedCode(); 
       } 
      let obfuscatedCode = await obfuscateCode(text); 
       conn.sendMessage(m.chat, {text: obfuscatedCode}, {quoted: m});
       break
            
  case 'getcase':  
    if (!isCreator) return conn.sendMessage(m.chat, { text: `*ESTE COMANDO ES PARA MI JEFE*` }, { quoted: msg });  
    if (!text) return m.reply(`no hay comando a buscar o que?`)  
    try {  
    bbreak = 'break'  
  reply('case ' + `'${args[0]}'` + fs.readFileSync('./skid.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak)  
  } catch (err) {  
  console.error(err)  
  reply(" Error, tal vez no existe el comando")  
  }  
  break
  



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
    await conn.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: fkontak });  
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
    await conn.groupParticipantsUpdate(m.chat, [users], 'promote')
  }  
  break  
  
  case 'demote': {  
    if (!m.isGroup) return reply(mess.group);  
    if (!isBotAdmins) return reply(mess.botAdmin);  
    if (!isGroupAdmins) return reply(mess.admin);  
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    await conn.groupParticipantsUpdate(m.chat, [users], 'demote')
  }  
  break  
  

  case 'toqr':{
  if (!text) return m.reply('*por favor manda un link para convertirlo en qr*')

   let qruwu = await qrcode.toDataURL(q, { scale: 35 })
   let data = new Buffer.from(qruwu.replace('data:image/png;base64,', ''), 'base64')
   let buff = getRandom('.jpg')
   await fs.writeFileSync('./'+buff, data)
   let medi = fs.readFileSync('./' + buff)
  await conn.sendMessage(m.chat, { image: medi, caption: `*aqui tienes tu qr*\n*${botname}*`}, { quoted: m })
   setTimeout(() => { fs.unlinkSync(buff) }, 10000)
  }
  break		
  
  case 'hidetag':  
    if (!m.isGroup) return reply(mess.group)
    if (!isGroupAdmins) return m.reply(mess.admin)
    if (isGroupAdmins || isCreator || !m.quoted ) {  
      conn.sendMessage(m.chat, { text: q ? q : "", mentions: participants.map((a) => a.id) }, { quoted: m })  
    }
    if (m.quoted) return conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) }, { quoted: m }) // Mario is going to steal it
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
    conn.sendMessage(m.chat, { text: `*Pong 🏓  ${latensi.toFixed(4)}*` }, { quoted: msg });  
    break  
  

    case 'ytmp3': case 'youtubemp3': 
    if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`
    downloadMp3(text)
    break
  
    case 'ytmp4': case 'youtubemp4': 
    if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27 360p`
    let { ytv } = require('./lib/y2mate')
    let quality = args[1] ? args[1] : '360p'
    let media = await ytv(text, quality)
    if (media.filesize >= 100000) return m.reply('el archivo es demasiado pesado '+util.format(media))
    conn.sendMessage(m.chat, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `Titulo: ${media.title}\nTamaño: ${media.filesizeF}\nurl: ${isUrl(text)}\n\ncalidad: ${args[1] || '360p'}` }, { quoted: m })
    break
  
          case 'update':  
            if (!isCreator) return conn.sendMessage(m.chat, { text: `*ESTE COMANDO ES PARA MI JEFE*` }, { quoted: msg });  
           try {  
           let stdout = execSync('git pull' + (m.fromMe && q ? ' ' + q : ''))  
            await conn.sendMessage(m.chat, { text: stdout.toString() }, { quoted: msg });  
          } catch {  
           let updatee = execSync('git remote set-url origin https://github.com/Skidy89/skid-bot && git pull')  
            await conn.sendMessage(m.chat, { text: updatee.toString() }, { quoted: msg });  
         }  
           break  
  
         case 'simi': {  
          if (!text) return conn.sendMessage(m.chat, { text: `𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚑𝚊𝚋𝚕𝚊𝚛 𝚌𝚘𝚗 𝚜𝚒𝚖𝚒` }, { quoted: msg });  
          await conn.sendPresenceUpdate('composing', m.chat);  
            let anu = await fetchJson(`https://api.simsimi.net/v2/?text=${text}&lc=es&cf=false`);  
            let res = anu.success;  
            m.reply(res)
        }  
         break  
  
          case 'ia':
          if (!text) return m.reply(`*ingresa un texto para hablar con chatgpt`)
          try {     
         let tioress = await fetch(`https://api.lolhuman.xyz/api/openai-turbo?apikey=${lolkeysapi}&text=${text}`) 
         let hasill = await tioress.json() 
         m.reply(`${hasill.result}`.trim())    
         } catch (e) {
        m.reply(`${e}`)
        }
         break

          case 'pinterest':  
          if (!text) return reply('𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚙𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝')  
          m.reply(mess.wait)  
          lol = await pinterest(text) //.catch(m.reply)  
          result = lol[Math.floor(Math.random() * lol.length)];  
          sendImageAsUrl(result, `*-------「 PINTEREST 」-------*\n🤠 busqueda de ${text}\n🔗 url ${result}`)  
          break  
  
 
			
		  
		  
		    case 'blackpink':
    		case 'neon':
	    	case 'greenneon':
	    	case 'advanceglow':
    		case 'futureneon':
	    	case 'sandwriting':
       		case 'sandsummer':
	    	case 'sandengraved':
    		case 'metaldark':
    		case 'neonlight':
    		case 'holographic':
    		case 'text1917':
    		case 'minion':
	    	case 'deluxesilver':
    		case 'newyearcard':
	    	case 'bloodfrosted':
		    case 'halloween':
		    case 'jokerlogo':
		    case 'fireworksparkle':
		    case 'natureleaves':
		    case 'bokeh':
		    case 'toxic':
		    case 'strawberry':
		    case 'box3d':
		    case 'roadwarning':
		    case 'breakwall':
		    case 'icecold':
		    case 'luxury':
		    case 'cloud':
		    case 'summersand':
		    case 'horrorblood':
		    case 'thunder':
			if (args.length == 0) return reply(`Ejemplo de uso: ${prefix + command} ${botname}`)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${lolkeysapi}&text=${text}` } })
			break
			case 'wetglass':
		    case 'multicolor3d':
    		case 'watercolor':
    		case 'luxurygold':
    		case 'galaxywallpaper':
    		case 'lighttext':
    		case 'beautifulflower':
    		case 'puppycute':
    		case 'royaltext':
    		case 'heartshaped':
    		case 'birthdaycake':
    		case 'galaxystyle':
    		case 'hologram3d':
    		case 'greenneon':
    		case 'glossychrome':
    		case 'greenbush':
    		case 'metallogo':
	    	case 'noeltext':
    		case 'glittergold':
    		case 'textcake':
	    	case 'starsnight':
	    	case 'wooden3d':
	    	case 'textbyname':
	    	case 'writegalacy':
    		case 'galaxybat':
    		case 'snow3d':
    		case 'birthdayday':
    		case 'goldplaybutton':
    		case 'silverplaybutton':
    		case 'freefire':
			if (args.length == 0) return reply(`Ejemplo: ${prefix + command} skid bot`)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${lolkeysapi}&text=${text}` } })
			break
			case 'shadow':
	    	case 'cup':
    		case 'cup1':
    		case 'romance':
    		case 'smoke':
    		case 'burnpaper':
    		case 'lovemessage':
    		case 'undergrass':
    		case 'love':
    		case 'coffe':
    		case 'woodheart':
	    	case 'woodenboard':
	    	case 'summer3d':
	    	case 'wolfmetal':
    		case 'nature3d':
    		case 'underwater':
    		case 'golderrose':
    		case 'summernature':
    		case 'letterleaves':
	    	case 'glowingneon':
	    	case 'fallleaves':
	    	case 'flamming':
	    	case 'harrypotter':
	    	case 'carvedwood':
			if (args.length == 0) return reply(`Ejemplo de uso: ${prefix + command} ${botname}`)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${lolkeysapi}&text=${text}` }}, {quoted: m })
			break
			case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':  
                  try {  
                  let set  
                  if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'  
                  if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'  
                  if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'  
                  if (/earrape/.test(command)) set = '-af volume=12'  
                  if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'  
                  if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'  
                  if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'  
                  if (/reverse/.test(command)) set = '-filter_complex "areverse"'  
                  if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'  
                  if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'  
                  if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'  
                  if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'  
                  if (/audio/.test(mime)) {  
                  let media = await conn.downloadAndSaveMediaMessage(quoted)  
                  let ran = getRandom('.mp3')  
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {  
                  fs.unlinkSync(media)  
                  if (err) return reply(err)  
                  let buff = fs.readFileSync(ran)  
                  conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })  
                  fs.unlinkSync(ran)  
                  })  
                  } else reply(`Reply to the audio you want to change with a caption *${prefix + command}*`)  
                  } catch (e) {  
                  m.reply(`hubo un error... ${e}`)  
                  }  
                  break  
			

		    
	    	case 'lewd':
	    	case 'feed':
	    	case 'gasm':
	    	case 'anal':
	    	case 'holo':
	    	case 'tits':
	    	case 'kuni':
	    	case 'kiss':
    		case 'erok':
	    	case 'smug':
	    	case 'solog':
	    	case 'feetg':
	    	case 'lewdk':
	    	case 'waifu':
	    	case 'pussy':
	    	case 'femdom':
	    	case 'cuddle':
	    	case 'eroyuri':
	    	case 'cum_jpg':
	    	case 'blowjob':
		    case 'holoero':
		    case 'erokemo':
		    case 'fox_girl':
		    case 'futanari':
		    case 'wallpaper':
		    if (!m.isGroup) return m.reply('_*este comando solo puede ser utilizado en grupos*_')
		    if (!global.db.data.chats[m.chat].antiNsfw) return m.reply(`*el comando ${command} esta desabilitado en este grupo*\n*usa ${prefix}disable antinsfw*`)
	        sendImageAsUrl(`https://api.lolhuman.xyz/api/random2/${command}?apikey=${lolkeysapi}`, `*🔥 ${command} 🔥*`)
		    break
		
		    case 'enable':
			let inChat = global.db.data.chats[m.chat] // inChat database ?
			let inBot = global.db.data.settings[conn.user.jid] // inBot database ?
			let inEnable = (args[0] || '').toLowerCase() // args ?
			let actived = `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}enable ${inEnable}*`
			let inSuccess = `*el ${inEnable} fue activado en este grupo*`
			let inBotSuccess = `*el ${inEnable} fue activado en este bot*`
			switch (inEnable) { // inEnable ? inEnable : commands
			
			case 'antilink':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (inChat.antilink) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, global.query, botname)
			inChat.antilink = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'detect':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (inChat.autoDetect) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.autoDetect = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antifakes':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (inChat.antiFake) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.antiFake = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antiarabes':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (inChat.antiArabe) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.antiArabe = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'welcome':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (inChat.welcome) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.welcome = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antillamadas':
			if (!conn.user.jid) return conn.sendCart(m.chat, `*solo un bot/subbot puede usar este comando*`, query)
			if (inChat.antiCall) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inBot.antiCall = true
			conn.sendCart(m.chat, inBotSuccess, success)
			break
			case 'jadibot':
			if (!isCreator) return conn.sendCart(m.chat, mess.owner, success)
			if (inBot.jadibot) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inBot.jadibot = true
			conn.sendCart(m.chat, inBotSuccess, success)
			break
			default:
	        
			
			}
			break
			
			case 'disable':
			let Chat = global.db.data.chats[m.chat] // Chat database ?
			let Bot = global.db.data.settings[conn.user.jid] // Bot database ?
			let inDisable = (args[0] || '').toLowerCase() // args ?
			let disable = `*el ${inDisable} ya esta desactivado!!*\n*puedes activarlo con ${prefix}enable ${inDisable}*`
			let inSuccessDisable = `*el ${inDisable} fue desactivado en este grupo*`
			let inBotDisable = `*el ${inDisable} fue desactivado en este bot*`
			switch (inDisable) { // inDisable ? inDisable : commands
			
			case 'antilink':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);  
			if (!Chat.antilink) return conn.sendCart(m.chat, disable, global.query, botname)
			Chat.antilink = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'detect':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (!Chat.autoDetect) return conn.sendCart(m.chat, disable, query)
			Chat.autoDetect = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antifakes':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (!Chat.antiFake) return conn.sendCart(m.chat, disable, query)
			Chat.antiFake = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antiarabes':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (!Chat.antiArabe) return conn.sendCart(m.chat, disable, query)
			Chat.antiArabe = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'welcome':
			if (!m.isGroup) return reply(mess.group);  
            if (!isBotAdmins) return reply(mess.botAdmin);  
            if (!isGroupAdmins) return reply(mess.admin);
			if (!Chat.welcome) return conn.sendCart(m.chat, disable, query)
			Chat.welcome = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antillamadas':
			if (!conn.user.jid) return conn.sendCart(m.chat, `*solo un bot/subbot puede usar este comando*`, query)
			if (!Bot.antiCall) return conn.sendCart(m.chat, disable, query)
			Bot.antiCall = false
			conn.sendCart(m.chat, inBotDisable, success)
			break
			case 'jadibot':
			if (!isCreator) return conn.sendCart(m.chat, mess.owner, success)
			if (!Bot.jadibot) return conn.sendCart(m.chat, disable, query)
			Bot.jadibot = false
			conn.sendCart(m.chat, inBotDisable, success)
			break
			default:
	        
			
			}
			break
			
 case 'addcmd':
    if (!isCreator) return conn.adReply(m.chat, mess.owner, query, m, false)
    if (!m.quoted) return conn.adReply(m.chat, `*Responde a un sticker/imagen!!*`, query, m, false)
    if (!m.quoted.fileSha256) return conn.AdReply(m.chat, `*Solo puedes asignar comandos a stickers/imagenes*`, query, m, false)
    if (!text) return conn.AdReply(m.chat, `*Necesitas un texto para añadirlo al sticker!!*`, query, m, false)
    var hash = m.quoted.fileSha256.toString('base64')
    addCmd(text, hash)
    m.reply(`*El comando fue asignado con exito*`)
    break
    
    case 'delcmd': 
    if (!isCreator) return conn.adReply(m.chat, mess.owner, query, m, false)
    if (!m.quoted) return conn.adReply(m.chat, `*Responde a un sticker/imagen!!*`, query, m, false)
    var hash = m.quoted.fileSha256.toString('base64')
    if (!hash) return conn.adReply(m.chat, `*Este sticker no tiene un comando asignado!!*`, query, m, false)
    delete global.db.data.sticker[hash]
    m.reply(`*hecho*`)
    break
    
			

            case 'inspeccionar': case 'vergrupo':
    let linkRegex = args.join(" ")
    let textt = ``
    let coded = linkRegex.split("https://chat.whatsapp.com/")[1]
    if (!coded) return m.reply("Link Invalid")
    conn.query({
    tag: "iq",
    attrs: {
    type: "get",
    xmlns: "w:g2",
    to: "@g.us"
    },
    content: [{ tag: "invite", attrs: { code: coded } }]
    }).then(async(res) => { 
    textt = `「 inspector de grupos」
▸ Nombre del grupo: ${res.content[0].attrs.subject ? res.content[0].attrs.subject : "undefined"}

▸ Descripción: ${res.content[0].attrs.s_t ? moment(res.content[0].attrs.s_t *1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Creador del grupo: ${res.content[0].attrs.creator ? "@" + res.content[0].attrs.creator.split("@")[0] : "undefined"}
▸ Grupo creado: ${res.content[0].attrs.creation ? moment(res.content[0].attrs.creation * 1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Miembros: ${res.content[0].attrs.size ? res.content[0].attrs.size : "undefined"} Miembros

▸ ID: ${res.content[0].attrs.id ? res.content[0].attrs.id : "undefined"}

${botname}`
    try {
    pp = await conn.profilePictureUrl(res.content[0].attrs.id + "@g.us", "image")
    } catch {
    pp = "https://tse2.mm.bing.net/th?id=OIP.n1C1oxOvYLLyDIavrBFoNQHaHa&pid=Api&P=0&w=153&h=153"
    }
    conn.sendMessage(m.chat, { text: textt }, { quoted: m })
    })
    break
            
			
// games nigga 


    
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
              if(budy.startsWith(`hola`)) {
              if (!global.db.data.chats[m.chat].audios) return
              let vn = fs.readFileSync('./audios/Hola.mp3')
              conn.sendAudio(m.chat, vn, m)
              }
              if(budy.startsWith(`shitpost`)) {
              if (!global.db.data.chats[m.chat].audios) return
              let vn = fs.readFileSync('./audios/shitpost.mp3')
              conn.sendAudio(m.chat, vn, m)
              }
              if(budy.startsWith(`a`)) {
              if (!global.db.data.chats[m.chat].audios) return
              let vn = fs.readFileSync('./audios/a.mp3')
              conn.sendAudio(m.chat, vn, m)
              }
              if(budy.startsWith(`uwu`)) {
              if (!global.db.data.chats[m.chat].audios) return
              let vn = fs.readFileSync('./audios/UwU.mp3')
              conn.sendAudio(m.chat, vn, m)
              }
              if(budy.startsWith(`mauu`)) {
              if (!global.db.data.chats[m.chat].audios) return
              let vn = fs.readFileSync('./audios/mauu1.mp3')
              conn.sendAudio(m.chat, vn, m)
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