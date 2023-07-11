const fs = require('fs');

const databaseFile = './lib/database/database.json';

let database = [];

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

module.exports = {
  loadDatabase,
  registerUser,
  getUser,
  getUserData,
  saveDatabase
};
