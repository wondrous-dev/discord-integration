import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { SlashCommandBuilder } from '@discordjs/builders'
import config from './config/config'

const commands = [
	new SlashCommandBuilder()
		.setName('wonder-notification-setup')
		.setDescription('configure wonder notification')
].map((command) => command.toJSON())

const rest = new REST({ version: '9' }).setToken(config.WONDER_DISCORD_BOT_TOKEN)
const clientId = ''

async function registerCommands(guildId) {
	const result = await rest.put(
		Routes.applicationGuildCommands(clientId, guildId),
		{
			body: commands
		}
	)
	console.log(result)
}

async function unregisterCommands(guildId) {
	rest
		.get(Routes.applicationGuildCommands(clientId, guildId))
		.then((data: any) => {
			const promises: Promise<any>[] = []
			for (const command of data) {
				console.log(command)
				const deleteUrl = `${Routes.applicationGuildCommands(
					clientId,
					guildId
				)}/${command.id}`
				promises.push(rest.delete(`/${deleteUrl}`))
			}
			return Promise.all(promises)
		})
}

export { registerCommands, unregisterCommands }
