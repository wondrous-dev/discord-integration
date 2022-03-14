import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import config from './config/config'
import routes from './routes/v1'

const app = express()

app.use(morgan('tiny'))

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// v1 api routes
app.use('/v1', routes)

export default app
