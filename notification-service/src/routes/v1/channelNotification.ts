import express from 'express'
import client from '../../discordClient'
import { TextChannel, MessageEmbed } from 'discord.js'
import { ChannelNotificationError } from '../../lib/error'
import logger from '../../config/logger'

const router = express.Router()

router.post('/push', function (req, res) {
	const guildId = req.body?.guild_id
	const channelId = req.body?.channel_id
	logger.info(`channel push ${guildId} ${channelId}`)
	const channel = client?.channels.cache.get(channelId)
	if (!channel) {
		const guild = client?.guilds.cache.get(guildId)
		if (!guild) { // this stuff is actually probably not needed
			// throw new ChannelNotificationError('wonder bot no longer connected to guild')
			logger.error(`wonder bot no longer connected to guild ${guildId}`)
			res.status(400).json({ error: 'wonder bot no longer connected to guild' })
			return
		}
		// throw new ChannelNotificationError('channel id no longer exist')
		logger.error(`channel id no longer exist ${channelId}`)
		res.status(400).json({ error: 'channel id no longer exist' })
		return
	}
	const message = req.body?.message
	const title = req.body?.title
	const description = req.body?.description
	const url = req.body?.url
	const embed = formatDiscordChannelMessage(title, description, url)
	const textChannel = channel as TextChannel
	logger.info(`message ${message}`)
	try {
		textChannel.send({ content: message, embeds: [embed] })
	} catch (e) {
		logger.error('error pushing to discord')
		console.error(e)
	}
	res.send('ok')
})


function formatDiscordChannelMessage (title, description, url) {
	const message = new MessageEmbed()
		.setTitle(title)
		.setURL(url)
	if (description) {
		message.setDescription(description)
	}
	return message
}

export default router
