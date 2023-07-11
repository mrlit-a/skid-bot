const chalk = require('chalk');
const moment = require('moment');

function logPrivateMessage(pushname, budy) {
  console.log(chalk.green(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] 📩 Mensaje en Mensaje Privado 📉`));
  console.log(chalk.green(`🙋 Nombre: ${pushname}`));
  console.log(chalk.green(`💬 Mensaje: ${budy}`));
}

function logGroupMessage(pushname, budy, groupName) {
  console.log(chalk.green(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] 📩 Mensaje en Grupo 📉`));
  console.log(chalk.green(`👥 Grupo: ${groupName}`));
  console.log(chalk.green(`🙋 Nombre: ${pushname}`));
  console.log(chalk.green(`💬 Mensaje: ${budy}`));
}

function logPrivateCommand(pushname, budy, comando) {
  console.log(chalk.blue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ⚡️ Comando en Mensaje Privado 📈`));
  console.log(chalk.blue(`➡️ Comando: ${comando}`));
  console.log(chalk.blue(`🙋 Nombre: ${pushname}`));
  console.log(chalk.blue(`💬 Mensaje: ${budy}`));
}

function logGroupCommand(pushname, budy, groupName, comando) {
  console.log(chalk.blue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ⚡️ Comando en Grupo 📈`));
  console.log(chalk.blue(`👥 Grupo: ${groupName}`));
  console.log(chalk.blue(`➡️ Comando: ${comando}`));
  console.log(chalk.blue(`🙋 Nombre: ${pushname}`));
  console.log(chalk.blue(`💬 Mensaje: ${budy}`));
}

module.exports = {
  logPrivateMessage,
  logGroupMessage,
  logPrivateCommand,
  logGroupCommand,
};
