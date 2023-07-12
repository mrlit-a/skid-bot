const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');
const axios = require('axios');
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

const databaseFile = './lib/database/database.json';
let database = [];

const chalk = require('chalk');

function logPrivateMessage(pushname, budy) {
  console.log(chalk.gray('┏━━━━━━━━━━━━━━━━━━━━━━━┓'));
  console.log(chalk.green('┃ ') + chalk.bold('📩 Mensaje en Mensaje Privado 📉'));
  console.log(chalk.green('┃'));
  console.log(chalk.green(`┃ ${chalk.bold('🙋 Nombre:')} ${pushname}`));
  console.log(chalk.green('┃'));
  console.log(chalk.green(`┃ ${chalk.bold('💬 Mensaje:')} ${budy}`));
  console.log(chalk.green('┃'));
  console.log(chalk.gray('┗━━━━━━━━━━━━━━━━━━━━━━━┛'));
}

function logGroupMessage(pushname, budy, groupName) {
  console.log(chalk.gray('┏━━━━━━━━━━━━━━━━━━━━━━━┓'));
  console.log(chalk.green('┃ ') + chalk.bold('📩 Mensaje en Grupo 📉'));
  console.log(chalk.green('┃'));
  console.log(chalk.green(`┃ ${chalk.bold('👥 Grupo:')} ${groupName}`));
  console.log(chalk.green('┃'));
  console.log(chalk.green(`┃ ${chalk.bold('🙋 Nombre:')} ${pushname}`));
  console.log(chalk.green('┃'));
  console.log(chalk.green(`┃ ${chalk.bold('💬 Mensaje:')} ${budy}`));
  console.log(chalk.green('┃'));
  console.log(chalk.gray('┗━━━━━━━━━━━━━━━━━━━━━━━┛'));
}

function logPrivateCommand(pushname, budy, comando) {
  console.log(chalk.gray('┏━━━━━━━━━━━━━━━━━━━━━━━┓'));
  console.log(chalk.blue('┃ ') + chalk.bold('⚡️ Comando en Mensaje Privado 📈'));
  console.log(chalk.blue('┃'));
  console.log(chalk.blue(`┃ ${chalk.bold('➡️ Comando:')} ${comando}`));
  console.log(chalk.blue('┃'));
  console.log(chalk.blue(`┃ ${chalk.bold('🙋 Nombre:')} ${pushname}`));
  console.log(chalk.blue('┃'));
  console.log(chalk.blue(`┃ ${chalk.bold('💬 Mensaje:')} ${budy}`));
  console.log(chalk.blue('┃'));
  console.log(chalk.gray('┗━━━━━━━━━━━━━━━━━━━━━━━┛'));
}

function logGroupCommand(pushname, budy, groupName, comando) {
  console.log(chalk.gray('┏━━━━━━━━━━━━━━━━━━━━━━━┓'));
  console.log(chalk.blue('┃ ') + chalk.bold('⚡️ Comando en Grupo 📈'));
  console.log(chalk.blue('┃'));
  console.log(chalk.blue(`┃ ${chalk.bold('👥 Grupo:')} ${groupName}`));
  console.log(chalk.blue('┃'));
  console.log(chalk.blue(`┃ ${chalk.bold('➡️ Comando:')} ${comando}`));
  console.log(chalk.blue('┃'));
  console.log(chalk.blue(`┃ ${chalk.bold('🙋 Nombre:')} ${pushname}`));
  console.log(chalk.blue('┃'));
  console.log(chalk.blue(`┃ ${chalk.bold('💬 Mensaje:')} ${budy}`));
  console.log(chalk.blue('┃'));
  console.log(chalk.gray('┗━━━━━━━━━━━━━━━━━━━━━━━┛'));
}


function loadDatabase() {
  try {
    const data = fs.readFileSync(databaseFile);
    database = JSON.parse(data);
  } catch (error) {
    console.log('Error loading database:', error);
    database = [];
  }
}

function saveDatabase() {
  try {
    const data = JSON.stringify(database);
    fs.writeFileSync(databaseFile, data);
  } catch (error) {
    console.log('Error saving database:', error);
  }
}

function registerUser(sender, name, age, money, premium) {
  const user = {
    sender,
    name,
    age,
    money,
    premium,
  };
  database.push(user);
  saveDatabase();
}

function getUser(sender) {
  return database.find(user => user.sender === sender);
}

function getUserData(sender) {
  const user = getUser(sender);
  return user ? {
    name: user.name,
    age: user.age,
    money: user.money,
    premium: user.premium
  } : undefined;
}


async function simi(conn, from, mek, q) {
  let res = await fetch(`https://api.simsimi.net/v2/?text=${q}&lc=es`);
  let json = await res.json();
  conn.sendMessage(from, { text: json.success });
}

const getBuffer = async (url, opciones) => {
  try {
    opciones = opciones || {};
    const post = await axios({
      method: "get",
      url,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
        'DNT': 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...opciones,
      responseType: 'arraybuffer',
    });
    return post.data;
  } catch (error) {
    console.log(color(`Error identificado: ${error}`, "red"));
  }
};

module.exports = {
  logPrivateMessage,
  logGroupMessage,
  logPrivateCommand,
  logGroupCommand,
  loadDatabase,
  registerUser,
  getUser,
  getUserData,
  saveDatabase,
  simi,
  getBuffer
};
