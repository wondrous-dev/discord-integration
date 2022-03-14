import { Client, Intents } from 'discord.js'
import config from './config/config'

const client = new Client({
	intents: [Intents.FLAGS.GUILDS]
})

client.login(config.WONDER_DISCORD_BOT_TOKEN)

export default client
