import express from 'express'
import client from '../../discordClient'
import { TextChannel, MessageEmbed } from 'discord.js'
import { ChannelNotificationError } from '../../lib/error'
import axios from 'axios'
import logger from '../../config/logger'

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

router.get('/guild/channels', async function (req, res) {
	const guildId = req.body?.guildId
	const guild = client?.guilds.cache.get(guildId)
	if (!guild) {
		res.status(400).json({ error: 'guild is not found' })
		return
	}
	const textChannelArray: any = []
	const channels = await guild.channels.fetch()
	for (const channel of channels.values()) {
		if (channel.isText()) {
			textChannelArray.push({ name: channel.name, id: channel.id })
		}
		// channelArray.push({ id: channel.id })
	}
	// console.log(guild.channels)
	res.json({
		channels: textChannelArray
	})
})

interface RoleInfo {
	id: string
	name: string
	color: string
	permissions: any
	managed: boolean
}

router.get('/guild/roles', async function (req, res) {
	const guildId = req.body?.guild_id
	const guild = client?.guilds.cache.get(guildId)
	if (!guild) {
		res.status(400).json({ error: 'guild is not found' })
		return
	}
	const roles = await guild?.roles.fetch()
	if (!roles || roles.size === 0) {
		return res.json({
			roles: []
		})
	}
	const rolesData: RoleInfo[] = []
	roles.forEach((role) => {
		const roleInfo = {
			id: role?.id,
			name: role?.name,
			color: role?.hexColor,
			permissions: role?.permissions,
			managed: role?.managed
		}
		rolesData.push(roleInfo)
	})
	return res.json({
		roles: rolesData
	})
})

router.get('/guild/role', async function (req, res) {
	const guildId = req.body?.guild_id
	const roleId = req.body?.role_id
	const guild = await client?.guilds.cache.get(guildId)
	if (!guild) {
		res.status(400).json({ error: 'guild is not found' })
		return
	}
	const role = await guild?.roles?.fetch(roleId, { force: true })
	if (!role) {
		res.status(400).json({ error: 'role is not found' })
		return
	}
	const roleInfo = {
		id: role?.id,
		name: role?.name,
		color: role?.hexColor,
		permissions: role?.permissions,
		managed: role?.managed
	}
	// console.log(member)
	return res.json(roleInfo)
})

router.get('/user/has_role', async function (req, res) {
	// https://stackoverflow.com/questions/63205810/get-a-list-of-members-with-a-role-discord-js
	// https://stackoverflow.com/questions/64670762/role-member-count-discord-js
	const userId = req.body?.user_id
	const guildId = req.body?.guild_id
	const roleId = req.body?.role_id
	const guild = await client?.guilds.cache.get(guildId)
	// const guild = await client?.guilds.fetch(guildId)
	if (!guild) {
		res.status(400).json({ error: 'guild is not found' })
		return
	}
	const role = await guild?.roles?.fetch(roleId, { force: true })
	if (!role) {
		res.status(400).json({ error: 'role is not found' })
		return
	}
	const members = role?.members
	const memberWithRole = members.find((m) => m.id === userId)
	if (memberWithRole) {
		return res.json({
			exist: true
		})
	}
	// console.log(member)
	return res.json({
		exist: false
	})
})

router.get('/invite-code/guild', async function (req, res) {
	const inviteCode = req.body?.inviteCode
	let result
	try {
		result = await axios.get(`https://discord.com/api/invites/${inviteCode}`)
	} catch (e) {
		logger.error(`could not fetch guild from invite code ${inviteCode}`)
		res.status(400).json({ error: 'could not fetch guild from invite code' })
		return
	}
	console.log(result)
	const guild = result.data?.guild
	res.json({
		guildId: guild?.id,
		guildName: guild?.name
	})
})

router.get('/guild/bot-added', async function (req, res) {
	const guildId = req.body?.guildId
	const guild = await client.guilds.fetch(guildId)
	let botAdded = false
	if (guild) {
		botAdded = true
	}
	res.json({
		botAdded
	})
})

export default router
