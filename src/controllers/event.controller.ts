import { NextFunction, Request, Response } from 'express'
import { EventUseCase } from '../useCases/event.usecase'
import { Event } from '../entities/Event'
import { IFileRequest } from '../types'

class EventController {
  constructor(private eventUseCase: EventUseCase) {
    this.eventUseCase = eventUseCase
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const eventData: Event = req.body

    const files = req.files as IFileRequest | undefined
    if (files) {
      const banner = files.banner[0]
      const flyers = files.flyers

      eventData.banner = banner.filename
      eventData.flyers = flyers.map((flyer) => flyer.filename)
    }

    try {
      await this.eventUseCase.create(eventData)
      return res.status(201).json({ message: 'Event created' })
    } catch (error) {
      next(error)
    }
  }

  public async findEventsByLocation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { latitude, longitude } = req.query

    try {
      const events = await this.eventUseCase.findEventByLocation(
        String(latitude),
        String(longitude),
      )

      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }

  public async findEventsByCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { category } = req.params

    try {
      const events = await this.eventUseCase.findEventByCategory(category)

      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }

  public async findEventsByName(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { name } = req.params

    try {
      const events = await this.eventUseCase.findEventByName(name)

      return res.status(200).json(events)
    } catch (error) {
      next(error)
    }
  }

  public async findEventById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const event = await this.eventUseCase.findEventById(id)

      return res.status(200).json(event)
    } catch (error) {
      next(error)
    }
  }

  public async addParticipants(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params
    const { name, email } = req.body

    try {
      const event = await this.eventUseCase.addParticipants(id, name, email)

      return res.status(200).json(event)
    } catch (error) {
      next(error)
    }
  }
}

export { EventController }
