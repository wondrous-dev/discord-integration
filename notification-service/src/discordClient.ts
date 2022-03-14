import { Client, Intents } from 'discord.js'

const client = new Client({
	intents: [Intents.FLAGS.GUILDS]
})

client.login('OTE3NjMwODAzMzE0MzUyMjA4.Ya7gSA.NR_4Qv0Qwzb285roZBqFIMd93wg')

export default client
