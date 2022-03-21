class DevConfig {
	WONDROUS_CORE_URL = process.env.WONDROUS_CORE_URL || 'http://127.0.0.1:5000'
	WONDER_DISCORD_BOT_TOKEN = process.env.WONDER_DISCORD_BOT_TOKEN
	SENTRY_DSN = 'https://567606376574429a9108c9be9f7c1c48@o552479.ingest.sentry.io/5678347'
}

class StagingConfig {
	WONDROUS_CORE_URL = 'http://staging-core:7843'
	WONDROUS_CORE_API_SECRET = process.env.STAGING_CORE_API_SECRET
	WONDER_DISCORD_BOT_TOKEN = process.env.WONDER_DISCORD_BOT_TOKEN
	SENTRY_DSN = 'https://567606376574429a9108c9be9f7c1c48@o552479.ingest.sentry.io/5678347'
}

class ProdConfig {
	WONDROUS_CORE_URL = 'http://wondrous-core:7843'
	WONDROUS_CORE_API_SECRET = process.env.CORE_API_SECRET
	WONDER_DISCORD_BOT_TOKEN = process.env.WONDER_DISCORD_BOT_TOKEN
	SENTRY_DSN = 'https://567606376574429a9108c9be9f7c1c48@o552479.ingest.sentry.io/5678347'
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
