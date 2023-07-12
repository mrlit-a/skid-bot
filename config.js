const chalk = require("chalk");
const fs = require("fs");

global.owner = [
  ["5218442114446", "skid owner", true],
  ['5218441029462', "subowner", true]
];

global.hentai = fs.readFileSync('./media/hentai.jpg');
global.ask = fs.readFileSync('./media/query.jpg');
global.dumb = fs.readFileSync('./media/dumb.jpg');
global.error = fs.readFileSync('./media/error.jpg');

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['GataDios'];
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.APIs = { 
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',	
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',	
  rose: 'https://api.itsrose.site',
  popcat : 'https://api.popcat.xyz',
  xcoders : 'https://api-xcoders.site'
};

global.APIKeys = { 
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,	
  'https://violetics.pw': 'beta',
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren'
};

global.msg = {
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

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
