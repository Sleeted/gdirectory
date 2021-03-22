const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const discordThings = require("./discord_things");

var prefix = "#";
const whitelist = ["480446184004124702"];



client.on("ready", ()=>{
  client.user.setActivity("#help");
  console.log("Discord bot online.");
  discordThings.webhook({message: "Bot online"});
});


client.on("message", msg => {
  if (msg.content.substring(0, prefix.length)===prefix && whitelist.indexOf(msg.author.id)!=-1 ) {
    
    let args = msg.content.substring(prefix.length).split(" ");
    
  }
});
