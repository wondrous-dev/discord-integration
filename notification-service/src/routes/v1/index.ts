import express from 'express'
import channelNotificationRouter from './channelNotification'
import serverInfoRouter from './serverInfo'
import userDMRouter from './userDM'

const router = express.Router()

router.use('/channel-notification', channelNotificationRouter)
router.use('/server-info', serverInfoRouter)
router.use('/user-dm', userDMRouter)

export default router
