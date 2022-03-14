import client from './bot'

client.on('ready', () => {
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
