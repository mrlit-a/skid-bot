const fs = require("fs");
const fetch = require("fetch")
const { WAConnection } = require("@whiskeysockets/baileys");
let url = `wa.me/+528442114446`
let conn, from, mek
const skidenviar2 = { key: { participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 9999999, status: 1, surface: 1, message: '𐎟 𝚜𝚔𝚒𝚍 𝚋𝚘𝚝 🔊 𐎟', orderTitle: '𐎟 𝚜𝚔𝚒𝚍 ⿻ 𝚋𝚘𝚝𐎟', sellerJid: '0@s.whatsapp.net' }}}
 
async function conn2(connection2, from2, mek2) {
conn = connection2
from = from2
mek = mek2
}

function enviar(blk) {
conn.sendMessage(from, { text: blk }, { quoted: mek })}

function enviarerror(text) {
conn.sendMessage(from, {text: text, contextInfo: { externalAdReply: { title: `error encontrado`, mediaUrl: null, sourceUrl: null, previewType: 'PHOTO', showAdAttribution: true, thumbnail: error, sourceUrl: url }}}, {})}

function react(emoji) {
conn.sendMessage(from, { react: { text: emoji,  key: mek.key}})}

function query(text, sk) {
conn.sendMessage(from, {text: text, contextInfo: { externalAdReply: { title: sk, body: "©SKID BOT", mediaUrl: null, sourceUrl: null, previewType: 'PHOTO', showAdAttribution: true, thumbnail: ask, sourceUrl: url }}}, {})}

module.exports = { enviar, enviarerror, query, conn2, skidenviar2, react }
