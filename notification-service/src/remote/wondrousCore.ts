import { HttpService } from './restService'

class CoreService extends HttpService {
	async setupDiscordBotNotification (data) {
		const response = await this.callUrl({
			method: 'post',
			endpoint: '/v1/discord/bot/notification_setup',
			data
		})
		return response
	}
}

const coreService = new CoreService()

export { CoreService, coreService }
