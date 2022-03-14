class BaseError extends Error {
	constructor(message) {
		super(message)
		this.name = 'BaseError'
	}
}

class ChannelNotificationError extends BaseError {
	constructor(message) {
		super(message)
		this.name = 'ChannelNotificationError'
	}
}

export { BaseError, ChannelNotificationError }
