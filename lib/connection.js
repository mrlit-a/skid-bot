const chalk = require('chalk');
const P = require('pino');
const fs = require('fs');
const cfonts = require('cfonts');
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore } = require('@whiskeysockets/baileys');
const store = makeInMemoryStore({});
let botversion = `1.0.5`;

const loadingMessage = 'Cargando librerias...';
const loadingFrames = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
let loadingFrameIndex = 0;
let loadingInterval;
let skidstartt = false;

async function skidstart() {
  if (!skidstartt) {
    cfonts.say('skid\nbot', {
      font: 'chrome',
      align: 'center',
      gradient: ['blue', 'cyan']
    });

    loading();

    await new Promise(resolve => setTimeout(resolve, 3000));

    stoploading();

    const isBeta = false;
    const whiskeySocketsVersion = require('@whiskeysockets/baileys/package.json').version;

    console.log(chalk.cyan('Creado por skid'));
    console.log(chalk.cyan('Estás usando una versión', isBeta ? 'oficial' : 'beta'));
    console.log(chalk.cyan(`Tu versión del bot: ${botversion}`));
    console.log(chalk.cyan('Versión de whiskeysockets/baileys:', whiskeySocketsVersion));
    

    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(chalk.cyan(`Versión actual de Wa v${version.join('.')}`));

    skidstartt = true;
    console.log(chalk.green('Hecho ✅\n'));
  }
}

  skidstart();

  async function connectToWhatsApp() {
  const storePath = './connection/store.json';
  store.readFromFile(storePath);

  setInterval(() => {
    store.writeToFile(storePath);
  }, 10_000);
  
const { 
state, saveCreds 
} = await useMultiFileAuthState('./connection/qrcode')


const conn = makeWASocket({
auth: state,
syncFullHistory: true,
printQRInTerminal: true,
logger: P({ level: 'silent' }),
browser: ['skid bot', 'Safari', '9.7.0']
})

conn.ev.on('creds.update',saveCreds)
store.bind(conn.ev);

  conn.ev.on('chats.set', () => {
    console.log(chalk.yellow('\nChats actualizados:', store.chats.all()));
  });

  conn.ev.on('contacts.set', () => {
    console.log(chalk.yellow('\nContactos actualizados:', store.contacts.all()));
  });

conn.ev.on('connection.update', (update) => {
const {
connection, lastDisconnect
} = update

if(connection === 'close') {
const shouldReconnect = 
(lastDisconnect)?.output?.statusCode
!== DisconnectReason.loggedOut

console.log(
'tu conexion fue cerrada por:',
lastDisconnect.error,
`vamos a ver si te puedo reconectar`,
shouldReconnect
)

if(shouldReconnect) { connectToWhatsApp() }

} else if(connection === 'open') {
console.log(`te conectaste con skid bot`)
}})


return conn
}


function generateRandomText() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomText = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }

  return randomText;
}

function loading() {
  console.log(chalk.yellow('\n' + loadingMessage));

  loadingInterval = setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const frame = loadingFrames[loadingFrameIndex];
    loadingFrameIndex = (loadingFrameIndex + 1) % loadingFrames.length;
    process.stdout.write(chalk.yellow(`${loadingMessage} ${frame}`));
  }, 200);
}

function stoploading() {
  clearInterval(loadingInterval);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}

module.exports = connectToWhatsApp;
