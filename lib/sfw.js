const axios = require('axios')
const fetch = require('node-fetch');

const skid = {
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

const live = {key : { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },message: {liveLocationMessage: {}}} 


async function neko(conn, from, mek) {
waifuu = await axios.get('https://waifu.pics/api/sfw/neko')
image = {url:waifuu.data.url}
text = `ɴᴇᴋᴏ!!`
conn.sendMessage(from, { image: image, caption: text }, { quoted: live })
}
async function waifu(conn, from, mek) {
waifuu = await axios.get('https://waifu.pics/api/sfw/waifu')
image = {url:waifuu.data.url}
text = `ᴡᴀɪғᴜ!!`
conn.sendMessage(from, { image: image, caption: text }, { quoted: live })
}
async function megumin(conn, from, mek) {
waifuu = await axios.get('https://waifu.pics/api/sfw/megumin')
image = {url:waifuu.data.url}
text = `ɴᴇɢᴜᴍɪɴ!!`
conn.sendMessage(from, { image: image, caption: text }, { quoted: live })
}
async function nekonsfw(conn, from, mek) {
waifuu = await axios.get('https://waifu.pics/api/nsfw/neko')
image = {url:waifuu.data.url}
text = `ɴᴇᴋᴏ!?`
conn.sendMessage(from, { image: image, caption: text }, { quoted: skid })
}
async function simi(conn, from, mek, q) {
let res = await fetch(`https://api.simsimi.net/v2/?text=${q}&lc=es`)
let json = await res.json()
conn.sendMessage(from, { text: json.success })
    }

module.exports = {
waifu,
neko,
megumin,
nekonsfw,
simi
}

