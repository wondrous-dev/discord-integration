import { Client, Intents } from 'discord.js'
import config from './config/config'

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]
})

client.login(config.WONDER_DISCORD_BOT_TOKEN)

export default client
