import express, { Application } from 'express'
import { connect } from './infra/database'
import { errorMiddleware } from './middlewares/error.middleware'
import { EventRoutes } from './routes/event.routes'
import { UserRoutes } from './routes/user.routes'

class App {
  public app: Application
  private eventRoutes = new EventRoutes()
  private userRoutes = new UserRoutes()
  constructor() {
    this.app = express()
    this.middlewaresInitialize()
    this.initializeRoutes()
    this.interceptionError()
    connect()
  }

  private initializeRoutes() {
    this.app.use('/events', this.eventRoutes.router)
    this.app.use('/user', this.userRoutes.router)
  }

  private interceptionError() {
    this.app.use(errorMiddleware)
  }

  private middlewaresInitialize() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  listen() {
    this.app.listen(3333, () => console.log('server is running'))
  }
}

export { App }
