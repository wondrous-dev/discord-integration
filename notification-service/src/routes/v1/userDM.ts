import express from 'express'
import client from '../../discordClient'
import { TextChannel, MessageEmbed } from 'discord.js'
import logger from '../../config/logger'
import { formatDiscordChannelMessage } from '../../utils/format'

const router = express.Router()

router.post('/send', async function (req, res) {
	const userDiscordId = req.body?.discord_user_id
	let discordUser = client.users.cache.get(userDiscordId)
	if (!discordUser) {
		try {
			discordUser = await client.users.fetch(userDiscordId)
		} catch (e) {
			logger.error(`error fetching user ${userDiscordId}`)
			console.error(e)
			return
		}
	}
	if (!discordUser) {
		logger.error(`no user found ${userDiscordId}`)
		return
	}
	const message = req.body?.message
	const title = req.body?.title
	const description = req.body?.description
	const url = req.body?.url
	const embed = formatDiscordChannelMessage(title, description, url)
	try {
		discordUser?.send({ content: message, embeds: [embed] })
	} catch (e) {
		logger.error('error pushing to discord')
		console.error(e)
	}

	res.send('ok')
})

export default router
