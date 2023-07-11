const fs = require("fs");
const StartBlack = require('../lib/connection.js');
const imgerror = fs.readFileSync('../media/error.jpg');
const imgdumb = fs.readFileSync('../media/dumb.jpg');
const imgsuccess = fs.readFileSync('../media/success.jpg');
const hentai = fs.readFileSync('../media/hentai.jpg');
const lolquery = fs.readFileSync('../media/query.jpg');
const url = `wa.me/+5284421114446`;

const conn = StartBlack;

const enviar = (blk) => {
  conn.sendMessage(from, { text: blk }, { quoted: mek });
};


const enviarerror = (text) => {
  conn.sendMessage(from, {
    externalAdReply: {
      title: `error encontrado`,
      body: "©SKID BOT",
      mediaUrl: text,
      sourceUrl: text,
      mediaType: 2,
      showAdAttribution: true,
      thumbnail: imgerror,
      sourceUrl: url
    }
  }, {});
};

const query = (text, sk) => {
  conn.sendMessage(from, {
    externalAdReply: {
      title: sk,
      body: "©SKID BOT",
      mediaUrl: text,
      sourceUrl: text,
      mediaType: 2,
      showAdAttribution: true,
      thumbnail: lolquery,
      sourceUrl: url
    }
  }, {});
};

const msg = {
  noreg: `🗳️ ᴘᴀʀᴀ ᴜsᴀʀ ᴀ sᴋɪᴅ ʙᴏᴛ ɴᴇᴄᴇsɪᴛᴀs ʀᴇɢɪsᴛʀᴀʀᴛᴇ\n${usedPrefix}ʀᴇɢɪsᴛʀᴏ ɴᴏᴍʙʀᴇ ᴇᴅᴀᴅ`,
  reg: `🎩 ɴᴏ ʜᴀᴄᴇ ғᴀʟᴛᴀ ǫᴜᴇ ᴛᴇ ᴠᴜᴇʟᴠᴀs ᴀ ʀᴇɢɪsᴛʀᴀʀ ʏᴀ ᴇsᴛᴀs ʀᴇɢɪsᴛʀᴀᴅᴏ!!`,
  owner: `🚫 sᴏʟᴏ ʟᴏs ᴏᴡɴᴇʀs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ`,
  wait: `ᴇsᴘᴇʀᴀ ᴇsᴛᴀᴍᴏs ᴘʀᴏᴄᴇsᴀɴᴅᴏ ᴛᴜ ᴘᴇᴅɪᴅᴏ...`,
  admin: `❌ sᴏʟᴏ ᴀᴅᴍɪɴs ᴘᴜᴇᴅᴇɴ ᴜsᴀʀ ᴇsᴛᴏ`,
  botAdmin: `ɴᴇsᴇᴄɪᴛᴀs ǫᴜᴇ ᴇʟ ʙᴏᴛ sᴇᴀ ᴀᴅᴍɪɴ`,
  grupo: `ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ sᴏʟᴏ sᴇ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇɴ ɢʀᴜᴘᴏs`,
  priv: `ᴘᴀʀᴀ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴅᴇʙᴇ sᴇʀ ᴇɴ ᴇʟ ᴘʀɪᴠ`,
};

module.exports = {
  enviar,
  enviarerror,
  query,
  msg
};
