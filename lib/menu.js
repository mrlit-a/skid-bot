const fs = require("fs")
const { smsg } = require("./fuctions.js")


let { money, limit } = global.db.data.users[m.sender]
const skmenu = (pushname) => {
return ` 
╭══════════════⪩
┃女⃟⃟女MENU❈⃟き 
┃ © *SKID*®
┃ 👤 Nombre: ${pushname}
┃ 💵 Dinero: ${user.money}
┃ 💎 Diamantes: ${user.limit}
╰══════════════⪨
 *SERBOT* 
╭══════════════⪩
┃§ *para que tengas tu propio bot*
┃
┃ ⪩ ${prefix}serbot
┃ ⪩ ${prefix}bots
┃ ⪩ ${prefix}public (modo publico)
┃ ⪩ ${prefix}self (modo privado)
┃
╰══════════════⪨
 ∆ 𝙇𝙤𝙜𝙤𝙨 ∆
╭══════════════⪩
┃§ Para/logos
┃
┃ ⪩ ${prefix}blackpink [texto]
┃ ⪩ ${prefix}neon [texto]
┃ ⪩ ${prefix}minion [texto]
┃ ⪩ ${prefix}avenger [texto]
┃ ⪩ ${prefix}space [texto]
┃ ⪩ ${prefix}pornhub [texto]
┃
╰══════════════⪨
∆ 𝙖𝙡𝙩𝙚𝙧𝙖𝙙𝙤𝙧𝙚𝙨 ∆
╭══════════════⪩
┃
┃ ⪩ ${prefix}bass
┃ ⪩ ${prefix}blown
┃ ⪩ ${prefix}deep
┃ ⪩ ${prefix}earrape
┃ ⪩ ${prefix}fast
┃ ⪩ ${prefix}fat
┃ ⪩ ${prefix}nightcore
┃ ⪩ ${prefix}reverse
┃ ⪩ ${prefix}robot
┃ ⪩ ${prefix}slow
┃ ⪩ ${prefix}smooth
┃ ⪩ ${prefix}squirrel
┃
╰══════════════⪨
∆ ADMIN ∆
╭══════════════⪩
┃§ *Para/Adms*
┃
┃ ⪩ ${prefix}ban
┃ ⪩ ${prefix}promote
┃ ⪩ ${prefix}demote
┃ ⪩ ${prefix}banchat off/on 
┃ ⪩ ${prefix}welcome off/on 
┃ ⪩ ${prefix}kick
┃
╰══════════════⪨
∆ *STIKERS* ∆
╭══════════════⪩
┃§ *Para/stikes*
┃
┃ ⪩ ${prefix}sticker
┃ ⪩ ${prefix}s
┃ ⪩ ${prefix}attp
┃
╰══════════════⪨
∆ *descargas* ∆
╭══════════════⪩
┃§ *Para/descargas*
┃
┃ ⪩ ${prefix}tiktok_video + [link]
┃ ⪩ ${prefix}play2 + [link]
┃ ⪩ ${prefix}play + [nombre | link]
┃
╰══════════════⪨
∆ *busqueda* ∆
╭══════════════⪩
┃§ *Para/descargas*
┃
┃ ⪩ ${prefix}yts + [nombre]
┃ ⪩ ${prefix}simi + [nombre]
┃ ⪩ ${prefix}pinterest + [nombre]
┃ ⪩ ${prefix}google + [nombre]
┃
╰══════════════⪨
∆ *otros* ∆ 
╭══════════════⪩
┃§ ${botname}
┃
┃ ⪩ ${prefix}estado
┃ ⪩ ${prefix}ping
┃
╰══════════════⪨
∆ *owner* ∆ 
╭══════════════⪩
┃§ ${botname}
┃
┃ ⪩ ${prefix}update
┃ ⪩ $
┃ ⪩ >
┃ ⪩ => 
┃
╰══════════════⪨`
}

module.exports = { skmenu }
