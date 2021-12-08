import { Client, Intents, Permissions } from 'discord.js'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const wonderBotId = process.env.BOT_ID // Check if role.tags.botId is equal to this, filter out roles if so
const wonderAPI = '' // Wonder API

client.on('ready', () => {
	// Should we sync all the guild permissions on start?
	console.log('Wonder bot ready!')
})

client.on('message', (msg) => {
	if (msg.content === 'ping') {
		msg.reply('pong')
	}
})

client.on('guildCreate', (guild) => {
	const roles = guild.roles.cache
	const responseArr = []
	roles.forEach((role) => {
		if (role?.tags?.botId !== wonderBotId) {
			// Skip if the role is the Wonder Bot
			const responseObj = {}
			responseObj['name'] = role?.name
			// Check if certain properties exist in role
			const permissions = role?.permissions
			if (permissions?.has(Permissions.FLAGS.KICK_MEMBERS)) {
				responseObj['KICK_MEMBERS'] = true
			}
			if (permissions?.has(Permissions.FLAGS.BAN_MEMBERS)) {
				responseObj['BAN_MEMBERS'] = true
			}
			if (permissions?.has(Permissions.FLAGS.MANAGE_ROLES)) {
				responseObj['MANAGE_ROLES'] = true
			}

			if (permissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
				responseObj['ADMINISTRATOR'] = true
			}
			responseArr.push(responseObj)
		}
	})
	console.log('responseArr', responseArr)
	// Send this information to the Wonder API
})

client.login(process.env.TOKEN)
