const { MessageEmbed } = require("discord.js")

module.exports = {
    cmd:"ping",
    subcmd:["pingofbot"],
    run: async(client, message, args) => {
        const msg = await message.channel.send("🏓 Retrieving data ...");
        try {
            const ping = Math.floor(msg.createdTimestamp - message.createdTimestamp);
            const embed = new MessageEmbed()
            .addField("Ping of bot",`\`${ping}ms\``)
            .setColor(0xff99ff);
            msg.delete();
            message.channel.send(embed);
            return;
        } catch(e) {
            console.log(e);
            msg.delete()
            message.channel.send("Error! An error occurred. Please try again later!");
            return;
        }
    }
}