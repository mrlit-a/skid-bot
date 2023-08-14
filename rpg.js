const fs = require("fs")
const chalk = require("chalk")

global.multiplier = 99
  
  global.rpg = {  
    emoticon(string) {  
      string = string.toLowerCase();  
      let emot = {  
        level: "🧬 Nivel",  
        limit: "💎 Diamante",
        money: "💵 Dolares",  
        exp: "⚡ Experiencia",    
        diamonds: "💎 Diamante",  
        health: "❤️ Salud",  
        gold: "👑 Oro",  
        gems: "🍀 Gemas",  
        iron: "⛓️ Hierro",  
        rock: "🪨 Roca",  
        potion: "🥤 Poción",  
        armor: "🥼 Armadura",  
        pickaxe: "⛏️ Pico",  
        sword: "⚔️ Espada",  
        trash: "🗑️ Basura",
      };  
      let results = Object.keys(emot)  
        .map((v) => [v, new RegExp(v, "gi")])  
        .filter((v) => v[1].test(string));  
      if (!results.length) return "";  
      else return emot[results[0][0]];  
    },  
  };  
  