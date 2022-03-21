import { Client, Intents, Permissions, User, Message } from 'discord.js'
import { coreService } from './remote/wondrousCore'
import { AxiosError } from 'axios'
import config from './config/config'
import * as Sentry from '@sentry/node'

const WONDER_BOT_ID = '917630803314352208'

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})
const VALID_PREFIX = '!wonder'
client.on('messageCreate', async (msg) => {
	if (!msg.content.startsWith(VALID_PREFIX)) {
		return
	}
	const commandArray = msg.content.split(' ')
	const commandArrayFiltered = commandArray.filter((element) => {
		return element !== ''
	})
	if (commandArrayFiltered.length < 3) {
		return
	}
	console.log(msg.content)
	if (
		commandArrayFiltered[1] === 'setup' &&
		commandArrayFiltered[2] === 'notification'
	) {
		if (commandArrayFiltered.length === 3) {
			replyMsg(
				msg, 'please specify org username using !wonder setup notification {{org username}}'
			)
			return
		}
		const orgUsername = commandArrayFiltered[3]
		const author: User = msg.author
		const payload = {
			org_username: orgUsername,
			user_discord_id: author.id,
			guild_id: msg.guildId,
			channel_id: msg.channelId
		}
		try {
			await coreService.setupDiscordBotNotification(payload)
		} catch (e) {
			let replied = false
			const error = e as AxiosError
			const errorData = error?.response?.data
			if (!errorData) {
				replyMsg(
					msg,
					'Our server is experiencing issues please contact suport!'
				)
				return
			}
			if ('validation_error' in errorData) {
				replyMsg(msg, 'invalid input field missing!')
				replied = true
			}
			if ('error_code' in errorData) {
				if (errorData.error_code === 'no_org_found') {
					replyMsg(msg, 'invalid org username!')
					replied = true
				}
				if (errorData.error_code === 'no_user_found') {
					replyMsg(
						msg,
						'no user associated with discord id make sure you linked your discord account to wonder!'
					)
					replied = true
				}
				if (errorData.error_code === 'user_does_not_have_access') {
					replyMsg(
						msg,
						'user does not have access make sure you have the correct permission on wonder!'
					)
					replied = true
				}
			}
			if (!replied) {
				replyMsg(msg, 'unknown error ecountered!')
			}
			return
		}
		replyMsg(msg, 'notification configured to this current channel!')
		return
	}
	replyMsg(msg, "invalid command do you mean 'setup notification'")
})

async function replyMsg(msg: Message, content: string) {
	try {
		await msg.reply(content)
	} catch (e) {
		Sentry.captureException(e)
		console.error('could not reply message try sending')
		try {
			await msg.channel.send(content)
		} catch (e) {
			Sentry.captureException(e)
			console.error('could not send message')
		}
	}
}

client.on('guildCreate', (guild) => {
	const roles = guild.roles.cache
	console.log(roles)
})

client.login(config.WONDER_DISCORD_BOT_TOKEN)

export default client
