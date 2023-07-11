const fs = require("fs");
const fetch = require("fetch")
const { WAConnection } = require("@whiskeysockets/baileys");

const imgerror = fs.readFileSync('./media/error.jpg');
const imgdumb = fs.readFileSync('./media/dumb.jpg');
const imgsuccess = fs.readFileSync('./media/success.jpg');
const hentai = fs.readFileSync('./media/hentai.jpg');
const lolquery = fs.readFileSync('./media/query.jpg');
const url = `https://wa.me/+5284421114446`;
const prefijos = ['!', '#', '?', '/', '.'];

let conn;
let from;
let mek;

const skidenviar2 = {
  key: {
   participant: '0@s.whatsapp.net'
  },
  message: {
   orderMessage: {
    itemCount: 9999999,
    status: 1,
    surface: 1,
    message: '𐎟 𝚜𝚔𝚒𝚍 𝚋𝚘𝚝 🔊 𐎟',
    orderTitle: '𐎟 𝚜𝚔𝚒𝚍 ⿻ 𝚋𝚘𝚝𐎟', 
    sellerJid: '0@s.whatsapp.net'
   }
  }
 }
 
 
 
async function conn2(connection2, from2, mek2) {
  conn = connection2;
  from = from2;
  mek = mek2
}

function enviar(blk) {
  conn.sendMessage(from, { text: blk }, { quoted: mek });
}

function enviarerror(text) {
  conn.sendMessage(from, {text: text, contextInfo: {
    externalAdReply: {
      title: `error encontrado`,
      mediaUrl: null,
      sourceUrl: null,
      previewType: 'PHOTO',
      showAdAttribution: true,
      thumbnail: imgerror,
      sourceUrl: url
    }
  }}, {});
}

function react(emoji) {
conn.sendMessage(from, { react: { text: emoji,  key: mek.key}})
}

function query(text, sk) {
  conn.sendMessage(from, {text: text, contextInfo: {
    externalAdReply: {
      title: sk,
      body: "©SKID BOT",
      mediaUrl: null,
      sourceUrl: null,
      previewType: 'PHOTO',
      showAdAttribution: true,
      thumbnail: lolquery,
      sourceUrl: url
    }
  }}, {});
}

const msg = {
  noreg: `🗳️ ᴘᴀʀᴀ ᴜsᴀʀ ᴀ sᴋɪᴅ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀs ʀᴇɢɪsᴛʀᴀʀᴛᴇ\n!ʀᴇɢɪsᴛʀᴏ ɴᴏᴍʙʀᴇ ᴇᴅᴀᴅ`,
  reg: `🎩 ɴᴏ ʜᴀᴄᴇ ғᴀʟᴛᴀ ǫᴜᴇ ᴛᴇ ᴠᴜᴇʟᴠᴀs ᴀ ʀᴇɢɪsᴛʀᴀʀ ʏᴀ ᴇsᴛᴀs ʀᴇɢɪsᴛʀᴀᴅᴏ!!`,
  owner: `🚫 sᴏʟᴏ ʟᴏs ᴏᴡɴᴇʀs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ`,
  wait: `ᴇsᴘᴇʀᴀ ᴇsᴛᴀᴍᴏs ᴘʀᴏᴄᴇsᴀɴᴅᴏ ᴛᴜ ᴘᴇᴅɪᴅᴏ...`,
  admin: `❌ sᴏʟᴏ ᴀᴅᴍɪɴs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴏ`,
  botAdmin: `ɴᴇsᴇᴄɪᴛᴀs ǫᴜᴇ ᴇʟ ʙᴏᴛ sᴇᴀ ᴀᴅᴍɪɴ`,
  grupo: `ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ sᴇ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇɴ ɢʀᴜᴘᴏs`,
  priv: `ᴘᴀʀᴀ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴅᴇʙᴇ sᴇʀ ᴇɴ ᴇʟ ᴘʀɪᴠ`,
  error: `ʟᴏ sɪᴇɴᴛᴏ ʜᴜʙᴏ ᴜɴ ᴇʀʀᴏʀ ɪɴᴛᴇɴᴛᴀʟᴏ ᴅᴇ ɴᴜᴇᴠᴏ`
};

module.exports = {
  enviar,
  enviarerror,
  query,
  msg,
  conn2,
  skidenviar2,
  react
};
