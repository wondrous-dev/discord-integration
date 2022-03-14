import express from 'express'
import client from '../../discordClient'
import { TextChannel, MessageEmbed } from 'discord.js'
import { ChannelNotificationError } from '../../lib/error'

const router = express.Router()

router.get('/channel', function (req, res) {
	const channelId = req.body?.channel_id
	const channel = client?.channels.cache.get(channelId)
	if (!channel) {
		res.status(400).json({ error: 'channel is not found' })
	}
	res.send('ok') // format this response
})

router.get('/guild', function (req, res) {
	const guildId = req.body?.guild_id
	const guild = client?.guilds.cache.get(guildId)
	if (!guild) {
		res.status(400).json({ error: 'guild is not found' })
	}
	res.send('ok')
})

export default router
