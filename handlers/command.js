const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./cmds/").forEach(folder => {
        const cmd = readdirSync(`./cmds/${folder}`)
            .filter(file => file.endsWith(".js"));
        
        
        for (const file of cmd) {
            const infoFile = require(`../cmds/${folder}/${file}`);

            if(infoFile.cmd) {
                client.cmd.set(infoFile.cmd, infoFile);
            } else {
                continue;
            }

            if (infoFile.subcmd && Array.isArray(infoFile.subcmd)) {
                infoFile.subcmd.forEach(sub => client.subcmd.set(sub, infoFile.cmd));
            }
        }
    });
}