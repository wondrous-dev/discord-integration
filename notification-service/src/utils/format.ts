import { MessageEmbed } from 'discord.js'

export const formatDiscordChannelMessage = (
	title: string,
	description: string,
	url: string
): MessageEmbed => {
	const message = new MessageEmbed().setTitle(title).setURL(url)
	if (description) {
		message.setDescription(description)
	}
	if (url) {
		message.setURL(url)
	}
	return message
}
