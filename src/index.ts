import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import usersRouter from './routes/usersRouter'
import postsRouter from './routes/postsRouter'
import notFound from './middleware/notFound'
import errorHandler from './middleware/errorHandler'

const app = express()

createConnection()
  .then(_ => {
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))

    app.use('/users', usersRouter)
    app.use('/posts', postsRouter)
    app.use(notFound)
    app.use(errorHandler)

    app.listen(3000, () => console.log('App is running on port 3000'))
  })
  .catch(err => console.log(`Error occurred connecting database: ${err}`))
