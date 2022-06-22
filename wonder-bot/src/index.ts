import client from './bot'
import * as Sentry from '@sentry/node'
import config from './config/config'

Sentry.init({
	dsn: config.SENTRY_DSN,
	tracesSampleRate: 1.0
})

client.on('ready', () => {
	// const guilds = client.guilds.cache.map((guild) => guild.id) // for discord v11 //let guilds = client.guilds.map(guild => guild.id)
	// console.log(guilds)
	console.log('Wonder bot ready!')
})

const exitHandler = () => {
	if (client) {
		client.destroy()
	} else {
		process.exit(1)
	}
}

const unexpectedErrorHandler = (error) => {
	console.error(error)
	exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
	console.log('SIGTERM received')
	client.destroy()
})
