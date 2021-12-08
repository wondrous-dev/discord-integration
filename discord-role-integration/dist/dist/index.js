import { Client, Intents, Permissions } from "discord.js";
var client = new Client({ intents: [Intents.FLAGS.GUILDS] });
var wonderBotId = process.env.BOT_ID; // Check if role.tags.botId is equal to this, filter out roles if so
var wonderAPI = ""; // Wonder API
client.on("ready", function () {
    // Should we sync all the guild permissions on start?
    console.log("Wonder bot ready!");
});
client.on("message", function (msg) {
    if (msg.content === "ping") {
        msg.reply("pong");
    }
});
client.on("guildCreate", function (guild) {
    var roles = guild.roles.cache;
    var responseArr = [];
    roles.forEach(function (role) {
        var _a;
        if (((_a = role === null || role === void 0 ? void 0 : role.tags) === null || _a === void 0 ? void 0 : _a.botId) !== wonderBotId) {
            // Skip if the role is the Wonder Bot
            var responseObj = {};
            responseObj["name"] = role === null || role === void 0 ? void 0 : role.name;
            // Check if certain properties exist in role
            var permissions = role === null || role === void 0 ? void 0 : role.permissions;
            if (permissions === null || permissions === void 0 ? void 0 : permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                responseObj["KICK_MEMBERS"] = true;
            }
            if (permissions === null || permissions === void 0 ? void 0 : permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                responseObj["BAN_MEMBERS"] = true;
            }
            if (permissions === null || permissions === void 0 ? void 0 : permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                responseObj["MANAGE_ROLES"] = true;
            }
            if (permissions === null || permissions === void 0 ? void 0 : permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                responseObj["ADMINISTRATOR"] = true;
            }
            responseArr.push(responseObj);
        }
    });
    console.log("responseArr", responseArr);
});
client.login(process.env.TOKEN);
