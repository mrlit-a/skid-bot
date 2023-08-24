const { default: makeWasocket, decodeJid, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, generateWAMessage, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@whiskeysockets/baileys')   
   const logg = (pino = require("pino"))   
   const { Boom } = require('@hapi/boom')   
   const yargs = require('yargs/yargs')   
   const fs = require('fs')   
   const FileType = require('file-type')   
   const chalk = require('chalk')   
   const path = require('path')   
   const qrcode = require('qrcode')   
   const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./lib/fuctions')   
   const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })   
  
   const storetes = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'storetes' }) })   
  
  
   if (global.listJadibot instanceof Array) console.log()   
   else global.listJadibot = []   
  
   const jadibot = async (conn, msg, from, command, prefix) => {   
   const { sendImage, sendMessage } = conn;   
   const { reply, sender } = m;   
   let senderbot = m.sender   
   if (!global.db.data.settings[conn.user.jid].jadibot) return m.reply(`*[❗] este comando fue desabilitado por el creador*`)
   if (conn.user.id !== global.numBot2) return m.reply(`*[❗] Este comando solo puede ser usado en un Bot principal!!*\n\n*—◉ Da click aquí para ir:*\n*◉* https://api.whatsapp.com/send/?phone=${global.numBot.split`@`[0]}&text=${prefix + command}&type=phone_number&app_absent=0`) 
   const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, `./jadibot/${senderbot.split("@")[0]}`), logg({ level: "silent" }));   
   try {   
   async function startconn() {   
   let { version, isLatest } = await fetchLatestBaileysVersion();   
   const conn = await makeWasocket({   
   auth: state,   
   printQRInTerminal: true,   
   browser: ['skid bot (jadibot)', "Safari", "1.0.0"],   
   logger: logg({ level: "silent" }),   
   version,   
   })   
  
   conn.ev.on('messages.upsert', async chatUpdate => {   
       //console.log(JSON.stringify(chatUpdate, undefined, 2))   
       try {   
       chatUpdate.messages.forEach(async (mek) => {   
       try {   
       //mek = (Object.keys(chatUpdate.messages[0])[0] !== "senderKeyDistributionMessage") ?  chatUpdate.messages[0] : chatUpdate.messages[1]   
  
       if (!mek.message) return   
       //console.log(chatUpdate.type)   
       mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message   
       if (mek.key && mek.key.remoteJid === 'status@broadcast') return   
  
       if (!chatUpdate.type === 'notify') return   
       m = smsg(conn, mek)   
       //if (m.key.fromMe === true) return   
       //if (m.mtype === 'senderKeyDistributionMessage') mek = chatUpdate.messages[1]   
       require("./skid")(conn, m, chatUpdate, mek)   
       } catch (e) {   
       console.log(e)   
       }   
       })   
       } catch (err) {   
           console.log(err)   
       }   
   })   
  
   store.bind(conn.ev);   
 let countQR = 0; 
       let chatQR; 
       conn.ev.on('connection.update', async (up) => { 
         // console.log(countQR); 
         if (countQR > 3) return; 
         console.log('RUNNING connection.update ........'); 
         const { lastDisconnect, connection } = up; 
         if (connection == 'connecting') return; 
         if (connection) { 
           if (connection != 'connecting') 
             console.log('Connecting to jadibot..'); 
         } 
  
         console.log(up); 
  
         // console.log(countQR); 
         if (up.qr) { 
           countQR++; 
           if (countQR > 3) { 
             await reply( 
               '*[FALLO AL CONECTAR]*\n\n Código QR no escaneado, inténtalo de nuevo más tarde.' 
             ); 
  
             await sendMessage(from, { delete: chatQR.key }); 
           } else { 
             try { 
               const sendQR = await sendImage( 
                 from, 
                 await qrcode.toDataURL(up.qr, { scale: 8 }), 
                 String(countQR) + 
                   '/3\n\n Escanea este QR para convertirte en un bot temporal\n\n1. Haz clic en los tres puntos en la esquina superior derecha\n2. Toca WhatsApp Web\n3. Escanea este QR \nQR Expirado en 30 segundos\n\njadibot hecho por @Skidy89', 
                 m 
               ); 
               if (chatQR) { 
                 await sendMessage(from, { delete: chatQR.key }); 
               } 
               chatQR = sendQR; 
             } catch (error) { 
               reply(`${error}`); 
             } 
  
             // console.log(chatQR); 
           } 
         } 
     if (connection == "open") {   
   conn.id = conn.decodeJid(conn.user.id)   
   conn.time = Date.now()   
   global.listJadibot.push(conn)   
   await m.reply(`*Conectado con exito*\n\n*Usuario:*\n _*× ID : ${conn.decodeJid(conn.user.jid)}*_\n *NOTA: el bot se puede reiniciar si deja de recibir comandos use ${prefix + command} para volver a conectarte*`)   
   }   
   
   conn.ev.on("groups.update", async (json) => {
			console.log(json)
			const res = json[0];
			let autoDetect = global.db.data.chats[res.id].autoDetect
			if (!autoDetect) return
			if (res.announce == true) {
				await sleep(2000)
				try {
        ppgroup = await conn.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }

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
        "thumbnail": global.query,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if (res.announce == false) {
				await sleep(2000)
				try {
        ppgroup = await conn.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
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
        "thumbnail": global.query,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if (res.restrict == true) {
				await sleep(2000)
				try {
        ppgroup = await conn.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
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
        "thumbnail": global.query,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if (res.restrict == false) {
				await sleep(2000)
				try {
        ppgroup = await conn.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
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
        "thumbnail": global.query,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
			} else if(!res.desc == ''){
				await sleep(2000)
				try {
        ppgroup = await conn.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
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
        "thumbnail": global.query,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
      } else {
				await sleep(2000)
				try {
        ppgroup = await conn.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
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
        "thumbnail": global.query,  
        "mediaUrl": `https://wa.me/+5218442114446`,  
        "sourceUrl": `https://wa.me/+5218442114446`  
        }
        }  
        }, { quoted: null })
				}
			
		})
		conn.ev.on('group-participants.update', async (anu) => {
let isWelcome = global.db.data.chats[anu.id].welcome
if(!isWelcome) return
console.log(anu)
try {
let metadata = await conn.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
// Get Profile Picture User
try {
ppuser = await conn.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

// Get Profile Picture Group
try {
ppgroup = await conn.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

if (anu.action == 'add') {
conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `
*「 Grupos 」*

*Hola @${num.split("@")[0]} bienvenido a ${metadata.subject}*

*「 Reglas y desc 」*

${metadata.desc}
`})
} else if (anu.action == 'remove') {
conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `
*「 Grupos 」*

*se nos fue @${num.split("@")[0]}*
*adios 👋*
`})
} else if (anu.action == 'promote') {
conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `*「 Grupos 」*\n\n*@${num.split('@')[0]} 𝙴𝙽𝚃𝚁𝙰 𝙰𝙻 𝙶𝚁𝚄𝙿𝙾 𝙳𝙴 𝙰𝙳𝙼𝙸𝙽𝚂 𝙳𝙴 ${metadata.subject} 🎉🎉*`})
} else if (anu.action == 'demote') {
conn.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `*「 Grupos 」*\n\n*@${num.split('@')[0]} 𝙰𝙱𝙰𝙽𝙳𝙾𝙽𝙰 𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 𝙳𝙴 𝙰𝙳𝙼𝙸𝙽𝚂 𝙳𝙴 ${metadata.subject} 😑*`})
  }
}
} catch (err) {
console.log(err)
}
})
  
   if (connection === 'close') {   
   let reason = new Boom(lastDisconnect?.error)?.output.statusCode   
   if (reason === DisconnectReason.badSession) {    
   console.log(`Bad Session File, Please Delete Session and Scan Again`); conn.logout(); }   
   else if (reason === DisconnectReason.connectionClosed) {    
   console.log("Connection closed, reconnecting...."); startconn(); }   
   else if (reason === DisconnectReason.connectionLost) {    
   console.log("Connection Lost from Server, reconnecting..."); startconn(); }   
   else if (reason === DisconnectReason.connectionReplaced) {    
   console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); conn.logout(); }   
   else if (reason === DisconnectReason.loggedOut) {    
   console.log(`Device Logged Out, Please Scan Again And Run.`); conn.logout(); }   
   else if (reason === DisconnectReason.restartRequired) {    
   console.log("Restart Required, Restarting..."); startconn(); }   
   else if (reason === DisconnectReason.timedOut) {    
   console.log("Connection TimedOut, Reconnecting..."); startconn(); }   
   else conn.end(`Unknown DisconnectReason: ${reason}|${connection}`)   
   }   
   }) 
  
   conn.ev.on('creds.update', saveCreds)   
  
   conn.decodeJid = (jid) => {   
   if (!jid) return jid   
   if (/:\d+@/gi.test(jid)) {   
   let decode = jidDecode(jid) || {}   
   return decode.user && decode.server && decode.user + '@' + decode.server || jid   
   } else return jid   
   }   
   conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })   
  
   }   
   startconn()   
   } catch (e) {   
   console.log(e)   
   }   
   }   
  
  
   module.exports = { jadibot, listJadibot }   
  
  
   let file = require.resolve(__filename)   
   fs.watchFile(file, () => {   
   fs.unwatchFile(file)   
   console.log(chalk.redBright(`Update ${__filename}`))   
   delete require.cache[file]   
   require(file)   
   })