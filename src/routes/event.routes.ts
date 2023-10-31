import { Router } from 'express'
import { EventRepositoryMongoose } from '../repositories/EventRepositoryMongoose'
import { EventController } from '../controllers/event.controller'
import { EventUseCase } from '../useCases/event.usecase'
import { upload } from '../infra/multer'

class EventRoutes {
  public router: Router
  private controller: EventController
  constructor() {
    this.router = Router()
    const eventRepository = new EventRepositoryMongoose()
    const eventUseCase = new EventUseCase(eventRepository)
    this.controller = new EventController(eventUseCase)
    this.initRoutes()
  }

  initRoutes() {
    this.router.post(
      '/',
      upload.fields([
        { name: 'banner', maxCount: 1 },
        { name: 'flyers', maxCount: 3 },
      ]),
      this.controller.create.bind(this.controller),
    )
    this.router.get(
      '/',
      this.controller.findEventsByLocation.bind(this.controller),
    )
    this.router.get('/:id', this.controller.findEventById.bind(this.controller))
    this.router.post(
      '/:id/participants',
      this.controller.addParticipants.bind(this.controller),
    )
    this.router.get(
      '/category/:category',
      this.controller.findEventsByCategory.bind(this.controller),
    )
    this.router.get(
      '/name/:name',
      this.controller.findEventsByName.bind(this.controller),
    )
  }
}

export { EventRoutes }
