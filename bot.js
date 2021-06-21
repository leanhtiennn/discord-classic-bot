const { Client, MessageEmbed, Collection } = require("discord.js");
const client = new Client({ disableMentions: "everyone" });
const fs = require("fs");

const settingTest = require("./jsonFolder/settings.json");
const settingPublic = require("./jsonFolder/settingPublic.json");
const adminInfo = require("./jsonFolder/admin.json");
const cre = adminInfo.cre;

const setting = settingTest;


client.cmd = new Collection();
client.subcmd = new Collection();
client.folder = fs.readdirSync("./cmds/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    client.user.setPresence({
        status: `${setting.presence.status}`,
        activity: {
            name: `${setting.presence.name}`,
            type: `${setting.presence.type}`
        }
    });

    console.log(`${client.user.tag} is online now !`);
});

client.on("message", async message => {
    if (message.author.bot) return;
    let prefix = setting.prefix;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmdinput = args.shift().toLowerCase();
    if (cmdinput.length === 0) return;
    
    let command = client.cmd.get(cmdinput);

    if(!command) command = client.cmd.get(client.subcmd.get(cmdinput));
    if (command) {
        command.run(client, message, args, cre)
    }
});

client.on('err', (err) => {
    log(err)
});

client.login(setting.token);