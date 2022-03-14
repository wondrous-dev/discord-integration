import express from 'express'
import channelNotificationRouter from './channelNotification'
import serverInfoRouter from './serverInfo'

const router = express.Router()

router.use('/channel-notification', channelNotificationRouter)
router.use('/server-info', serverInfoRouter)

export default router
