const { videoyt, audioyt, handleYouTubeSearch } = require('./lib/download.js');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');
const StartBlack = require('./lib/connection.js');
const chalk = require('chalk');
const logs = require('./lib/logs.js');
const moment = require('moment');
const util = require('util');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const config = require("./config.js");
const ffmpeg = require('fluent-ffmpeg');
const { promisify } = require('util');

const prefijos = ['!', '#', '?', '/', '.', '¿', '|', '_', '+'];
const botNombre = "skid bot";
const tempFolder = 'temp';
const axios = require('axios');
const { logPrivateMessage, logGroupMessage, logPrivateCommand, logGroupCommand, loadDatabase, registerUser, getUser, getUserData, saveDatabase, waifu, neko, megumin, nekonsfw,  simi, getBuffer } = require("./sk.js")
const speed = require("performance-now")
const imagendumb = fs.readFileSync('./media/dumb.jpg')
const { enviar, enviarerror, query, msg, conn2, react } = require('./messages.js')
loadDatabase();

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? conn.sendMessage(from, {text: teks.trim(), mentions: memberr}) : conn.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}

function usedPrefix(message) {
  for (const prefix of prefijos) {
    if (message.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

async function skidbot() {
  let conn = await StartBlack();



  conn.ev.on('messages.upsert', async m => {

const mek = m.messages[0]
if(!mek.key.fromMe);
if(!mek.message) return; 
if(!'status@broadcast') return;
const type = Object.keys(mek.message)[0]

   const body =
      (type === 'conversation' && usedPrefix(mek.message.conversation)) ? mek.message.conversation :
      (type === 'imageMessage') && usedPrefix(mek.message[type].caption) ? mek.message[type].caption :
      (type === 'videoMessage') && usedPrefix(mek.message[type].caption) ? mek.message[type].caption :
      (type === 'extendedTextMessage') && usedPrefix(mek.message[type].text) ? mek.message[type].text : '';

    const budy =
      (type === 'conversation') ? mek.message.conversation :
      (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : '';

    

    const from = mek.key.remoteJid;
    const isCmd = prefijos.some(p => body.startsWith(p));
    const isGroup = from.endsWith("@g.us") === true;
    const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const user = mek.sender && mek.sender.user ? mek.sender.user : botNombre;
    const args = body.trim().split(/ +/).splice(1);
    const q = args.join(' ');
    const numeroBot = conn.user.id.split(":")[0]+"@s.whatsapp.net"
    const sender = isGroup ? mek.key.participant : mek.key.remoteJid
    const pushname = mek.pushName ? mek.pushName : botNombre
    const groupMetadata = isGroup ? await conn.groupMetadata(from) : ""
    const groupName = isGroup ? groupMetadata.subject : ""
    const groupDesc = isGroup ? groupMetadata.desc : ""
    const groupMembers = isGroup ? groupMetadata.participants : ""
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ""
    const register = getUser(sender);
    const isBot = mek.key.fromMe ? true : false
    const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
    const isOwner = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(sender)
    let girastamp = speed()
    let latensi = speed() - girastamp

    conn2(conn, from, mek);

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    if (!isCmd && !isGroup) {
      logs.logPrivateMessage(pushname, budy);
    } else if (!isCmd && isGroup) {
      logs.logGroupMessage(pushname, budy, groupName);
    } else if (!isGroup && isCmd) {
      logs.logPrivateCommand(pushname, budy, comando);
    } else if (isGroup && isCmd) {
      logs.logGroupCommand(pushname, budy, groupName, comando);
    }
try {
switch (comando) {
case 'fake2':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  var params = body.slice(7).split("|");
  var target = params[0];
  var bot = params[1];
  var realMessage = params[2];
  
  if (target && bot && realMessage) {
    var quotedMessage = {
      key: {
        fromMe: false,
        participant: `${target}@s.whatsapp.net`
      },
      message: {
        conversation: bot
      }
    };

    var sendMessageOptions = {
      text: realMessage,
      quoted: quotedMessage
    };

    conn.sendMessage(from, sendMessageOptions, { quoted: quotedMessage });
  } else {
    query('Uso incorrecto del comando. Ejemplo: !fake2 0|bot|hola', '¿Sabes cómo usar este comando?');
  }
  break;
  case 'mek':
enviar(JSON.stringify(mek, null, 2))
break

case 'descargar':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  if (args.length < 2) {
    query('Ejemplo de uso: !descargar ytvideo https://www.youtube.com/watch?v=xxxxxxxxxxx', 'tu link es valido?')
  } else {
    const tipoDescarga = args[0];
    const url = args[1];

    switch (tipoDescarga) {
      case 'ytvideo':
        await videoyt(url, mek, conn, from, user);
        break;
      case 'ytaudio':
        await audioyt(url, mek, conn, from, user);
        break;
      default:
        conn.sendMessage(from, { text: 'Tipo de descarga no válido.' });
        break;
    }
  }
  break;

case 'registro':
  if (args.length !== 2) {
    conn.sendMessage(
      from, { text:
      `El formato correcto para registrarse es:\n.registro [nombre] [edad]`}, {quoted: fkontak });
    return;
  }
  var regis = getUser(sender);
  if (regis) {
  enviar(msg.reg);
    return;
  }
  const name = args[0];
  const age = args[1];

  registerUser(sender, name, age, 100, false);

  conn.sendMessage(from, { text: `¡Registrado exitosamente!\nNombre: ${name}\nEdad: ${age}`}, {quoted: mek })
  break;

case 'grupo':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  try {
    const caption = `Hola ${pushname}, actualmente estás en el grupo ${groupName}\nAquí tienes más información del grupo:\nNombre: ${groupName}\nDescripción: ${groupDesc}\nID: ${from}`;
    const ppimg = await conn.profilePictureUrl(from, 'image');
    const ppimgg = await getBuffer(ppimg);
    conn.sendMessage(from, { image: ppimgg, caption: caption }, { quoted: mek });
  } catch (error) {
    console.error(`Error al obtener la imagen de perfil: ${error}`);
    const ppimgg = imagendumb;
    conn.sendMessage(from, { image: ppimgg, caption: `Nombre: ${name}\nEdad: ${age}` }, { quoted: mek });
  }
  break;

case 'promote':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  if (!isGroup) return enviar(msg.grupo);
  if (!isBotGroupAdmins) return enviar(msg.botAdmin);
  if (!groupAdmins) return enviar(msg.admin);
  var mentionedMessage = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo ? mek.message.extendedTextMessage.contextInfo : null;

  if (!mentionedMessage) {
    enviar("ᴇᴛɪǫᴜᴇᴛᴀᴍᴇ ᴀ ᴀʟɢᴜɪᴇɴ ᴘᴀʀᴀ ʜᴀᴄᴇʀʟᴏ ᴀᴅᴍɪɴ");
    return;
  }
  var mentionedUser = mentionedMessage.participant;
  conn.groupParticipantsUpdate(from, [mentionedUser], 'promote').then(() => {
    react("✅")
    enviar("*ᴛᴜs ᴅᴇsᴇᴏs sᴏɴ ᴏʀᴅᴇɴᴇs*");
  }).catch((error) => {
    console.error(`Error al promover al usuario: ${error}`);
    react("❌");
    enviar("Ocurrió un error al promover al usuario");
  });
  break;

case 'demote':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  if (!isGroup) return enviar(msg.grupo);
  if (!isBotGroupAdmins) return enviar(msg.botAdmin);
  if (!groupAdmins) return enviar(msg.admin);
  var mentionedMessage = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo ? mek.message.extendedTextMessage.contextInfo : null;

  if (!mentionedMessage) {
    enviar("ᴇᴛɪǫᴜᴇᴛᴀᴍᴇ ᴀ ᴀʟɢᴜɪᴇɴ ᴘᴀʀᴀ ǫᴜɪᴛᴀʀʟᴇ ᴀᴅᴍɪɴ");
    return;
  }
  var mentionedUser = mentionedMessage.participant;
  conn.groupParticipantsUpdate(from, [mentionedUser], 'demote').then(() => {
    react("✅")
    enviar("*ʙᴜᴇɴᴏ... ʟᴇ ʜᴇᴍᴏs ǫᴜɪᴛᴀᴅᴏ ᴀᴅᴍɪɴ*");
  }).catch((error) => {
    console.error(`Error al promover al usuario: ${error}`);
    react("❌");
    enviar("*ᴄʀᴇᴏ ǫᴜᴇ ʜᴀʏ ᴜɴ ᴇʀʀᴏʀ*")
    })
    break
case 'kick':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  if (!isGroup) return enviar(msg.grupo);
  if (!isBotGroupAdmins) return enviar(msg.botAdmin);
  if (!groupAdmins) return enviar(msg.admin);
  var mentionedMessage = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo ? mek.message.extendedTextMessage.contextInfo : null;
  if (!mentionedMessage) {
    enviar("ᴍᴇɴᴄɪᴏɴᴀᴍᴇ ᴀʟ ǫᴜᴇ ǫᴜɪᴇʀᴇs ʙᴀɴᴇᴀʀ");
    return;
  }
  var mentionedUser = mentionedMessage.participant;
  conn.groupParticipantsUpdate(from, [mentionedUser], 'remove').then(() => {
    react("✅")
    enviar("*ᴛᴜs ᴅᴇsᴇᴏs sᴏɴ ᴏʀᴅᴇɴᴇs*");
  }).catch((error) => {
    console.error(`Error al promover al usuario: ${error}`);
    react("❌");
    enviar("Ocurrió un error al promover al usuario");
  });
  break;

case 'ping':
  enviar(`*pong!*\n${latensi.toFixed(4)}`)
  break;

case 'perfil':
  if (!register) {
    enviar(msg.noreg);
    return;
  }

  const userData = getUserData(sender);
  if (userData) {
    const { name, age, money, premium } = userData;

    try {
      const ppimg = await conn.profilePictureUrl(sender, 'image');
      const ppimgg = await getBuffer(ppimg);

      const profileMessage = `
        *ᴘᴇʀғɪʟ ᴅᴇ ${pushname}*
        👤 ɴᴏᴍʙʀᴇ: ${name}
        🎂 ᴇᴅᴀᴅ: ${age}
        💰 ᴅɪɴᴇʀᴏ: ${money}
        ⭐ ᴘʀᴇᴍɪᴜᴍ: ${premium ? '✅' : '❌'}
      `;

      conn.sendMessage(from, { image: ppimgg, caption: profileMessage }, { quoted: mek });
    } catch (error) {
      console.error(`Error al obtener la imagen de perfil: ${error}`);

      const profileMessage = `
        *ᴘᴇʀғɪʟ ${pushname}*
        👤 ɴᴏᴍʙʀᴇ: ${name}
        🎂 ᴇᴅᴀᴅ: ${age}
        💰 ᴅɪɴᴇʀᴏ: ${money}
        ⭐ ᴘʀᴇᴍɪᴜᴍ: ${premium ? '✅' : '❌'}
      `;

      const ppimgg = imagendumb;
      conn.sendMessage(from, { image: ppimgg, caption: profileMessage }, { quoted: fkontak });
    }
  }
  break;

case 'waifu':
  if (!register) {
   enviar(msg.noreg) 
   return 
   }
  waifu(conn, from, mek);
  break;

case 'neko':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  neko(conn, from, mek);
  break;

case 'nsfw':
  if (!register) {
    enviar(msg.noreg);
    return;
  }
  nekonsfw(conn, from, mek);
  break;

  default:
             if (budy.startsWith('>')) {
                if (!isOwner) return
                try {
                    return enviar(JSON.stringify(eval(budy.slice(2)), null, '\t'))
                } catch (e) {
                    e = String(e)
                    enviar(e)
                }
            }
            if (budy.startsWith('=>')) {
                if (!isOwner) return
                try {
                    return  enviar(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t')) 
                } catch (e) {
                    e = String(e)
                    enviar(e)
                }
            }
            if (budy.startsWith('$')) {
                if (!isOwner) return
                try {
                    return enviar(String(execSync(budy.slice(2), { encoding: 'utf-8' })))
                } catch (e) {
                    e = String(e)
                    enviar(e)
                }}
  
            }

} catch (error) {
      console.error(chalk.red(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ❌ Ocurrió un error al procesar el comando.`));
      console.error(chalk.red(`❗️ Error: ${error}`));
      enviarerror(`ocurrio un error con el comando ${comando}`)
    }
  })
}

skidbot().catch((error) => {
  console.error(chalk.red(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ❌ Ocurrió un error al iniciar el bot.`));
  console.error(chalk.red(`❗️ Error: ${error}`));
})
