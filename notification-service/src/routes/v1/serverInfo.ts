import express from 'express'
import client from '../../discordClient'
import { TextChannel, MessageEmbed } from 'discord.js'
import { ChannelNotificationError } from '../../lib/error'

const router = express.Router()

router.get('/channel', function (req, res) {
	const channelId = req.body?.channelId
	const guildId = req.body?.guildId
	const channel = client?.channels.cache.get(channelId)
	if (!channel) {
		if (guildId) {
			// optimization to potentially safe a query, if guild is found but channle not found means channel is delete
			const guild = client?.guilds.cache.get(guildId)
			res.json({
				guildName: guild?.name,
				channelName: null
			})
		} else {
			res.status(400).json({ error: 'channel is not found' })
		}
		return
	}
	if (!channel.isText()) {
		res.status(400).json({ error: 'must be text channel' })
		return
	}
	const textChannel = channel as TextChannel
	const guildName = textChannel.guild.name
	if (guildId && guildId !== textChannel.guild.id) {
		res.status(400).json({ error: 'guild id not match channel id' })
		return
	}
	res.json({
		guildName,
		channelName: textChannel.name
	})
})

router.get('/guild', function (req, res) {
	const guildId = req.body?.guildId
	const guild = client?.guilds.cache.get(guildId)
	if (!guild) {
		res.status(400).json({ error: 'guild is not found' })
		return
	}
	res.json({
		guildName: guild?.name
	})
})

export default router
