import express from 'express'
import client from '../../discordClient'
import { TextChannel, MessageEmbed } from 'discord.js'
import { ChannelNotificationError } from '../../lib/error'

const router = express.Router()

router.post('/push', function (req, res) {
	const guildId = req.body?.guild_id
	const channelId = req.body?.channel_id
	const channel = client?.channels.cache.get(channelId)
	if (!channel) {
		const guild = client?.guilds.cache.get(guildId)
		if (!guild) { // this stuff is actually probably not needed
			// throw new ChannelNotificationError('wonder bot no longer connected to guild')
			res.status(400).json({ error: 'wonder bot no longer connected to guild' })
			return
		}
		// throw new ChannelNotificationError('channel id no longer exist')
		res.status(400).json({ error: 'channel id no longer exist' })
		return
	}
	const message = req.body?.message
	const title = req.body?.title
	const description = req.body?.description
	const url = req.body?.url
	const embed = formatDiscordChannelMessage(title, description, url)
	const textChannel = channel as TextChannel
	console.log('message', message)
	textChannel.send({ content: message, embeds: [embed] })
	res.send('ok')
})


function formatDiscordChannelMessage (title, description, url) {
	const message = new MessageEmbed()
		.setTitle(title)
		.setDescription(description)
		.setURL(url)
	return message
}

export default router
