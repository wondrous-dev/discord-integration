class DevConfig {
	PORT = 5001
	WONDROUS_CORE_URL = process.env.WONDROUS_CORE_URL || 'http://127.0.0.1:5000'
	WONDER_DISCORD_BOT_TOKEN = process.env.WONDER_DISCORD_BOT_TOKEN
}

class StagingConfig {
	PORT = 5001
	WONDROUS_CORE_URL = 'http://staging-core:7843'
	WONDROUS_CORE_API_SECRET = process.env.STAGING_CORE_API_SECRET
	WONDER_DISCORD_BOT_TOKEN = process.env.WONDER_DISCORD_BOT_TOKEN
}

class ProdConfig {
	PORT = 5001
	WONDROUS_CORE_URL = 'http://wondrous-core:7843'
	WONDROUS_CORE_API_SECRET = process.env.CORE_API_SECRET
	WONDER_DISCORD_BOT_TOKEN = process.env.WONDER_DISCORD_BOT_TOKEN
}

let config

if (process.env.NODE_ENV === 'production') {
	config = new ProdConfig()
} else if (process.env.NODE_ENV === 'staging') {
	config = new StagingConfig()
} else {
	config = new DevConfig()
}

config.env = process.env.NODE_ENV

export default config
