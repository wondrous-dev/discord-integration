import app from './app'
import config from './config/config'
import logger from './config/logger'
import client from './discordClient'

let server

client.on('ready', () => {
	// Should we sync all the guild permissions on start?
	console.log('Wonder bot ready!')
	server = app.listen(config.PORT, () => {
		logger.info(`Listening to port ${config.PORT}`)
	})
})

const exitHandler = () => {
	if (server) {
		client.destroy()
		server.close(() => {
			logger.info('Server closed')
			process.exit(1)
		})
	} else {
		process.exit(1)
	}
}

const unexpectedErrorHandler = (error) => {
	logger.error(error)
	exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
	logger.info('SIGTERM received')
	client.destroy()
	if (server) {
		server.close()
	}
})
