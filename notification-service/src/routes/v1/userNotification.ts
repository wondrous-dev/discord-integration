import express from 'express'
import client from '../../discordClient'
import { TextChannel, MessageEmbed } from 'discord.js'
import { ChannelNotificationError } from '../../lib/error'
import logger from '../../config/logger'
import { formatDiscordChannelMessage } from '../../utils/format'

const router = express.Router()

router.post('/push', async function (req, res) {
	const userId = req.body?.discord_user_id
	logger.info(`user direction message ${userId}`)
	let user

	try {
		user = await client.users.fetch(userId)
	} catch (err) {
		logger.info(`could not find discord user ${userId}`)
		res.error(`Could not find discord user: ${userId}`)
	}

	const message = req.body?.message
	const title = req.body?.title
	const description = req.body?.description
	const url = req.body?.url
	const embed = formatDiscordChannelMessage(title, description, url)
	logger.info(`message ${message}`)
	try {
		user.send({ content: message, embeds: [embed] })
	} catch (e) {
		logger.error('error pushing to discord')
		console.error(e)
	}
	res.send('ok')
})

export default router
