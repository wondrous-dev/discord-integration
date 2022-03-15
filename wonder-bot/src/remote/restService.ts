import axios, { Method } from 'axios'

import config from '../config/config'

interface CallUrlOpts {
	method: Method
	endpoint: string
	data?: any
	params?: any
}

class HttpService {
	private baseUrl: string

	constructor () {
		this.baseUrl = config.WONDROUS_CORE_URL
	}

	async callUrl (callUrlOpts: CallUrlOpts) {
		const { method, endpoint, data, params } = callUrlOpts

		const response = await axios({
			method,
			headers: {
				Authorization: config.WONDROUS_CORE_API_SECRET
					? config.WONDROUS_CORE_API_SECRET
					: ''
			},
			url: `${this.baseUrl}${endpoint}`,
			...(data && {
				data
			}),
			...(params && {
				params
			})
		})
		return response
	}
}

export { HttpService }
