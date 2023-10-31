import mongoose from 'mongoose'
import { Event } from '../entities/Event'
import { EventRepository } from './event.repository'
import { Location } from '../entities/Location'
import { eventSchema } from '../schemas/event.schema'

const EventModel = mongoose.model('Event', eventSchema)

class EventRepositoryMongoose implements EventRepository {
  async add(event: Event): Promise<Event> {
    const model = new EventModel(event)
    await model.save()
    return event
  }

  async findByLocationAndDate(
    location: Location,
    date: Date,
  ): Promise<Event | undefined> {
    const eventFound = await EventModel.findOne({
      location,
      date,
    }).exec()

    return eventFound?.toObject() || undefined
  }

  public async findEventsByCity(city: string): Promise<Event[]> {
    const findEvent = await EventModel.find({
      city,
    }).exec()

    return findEvent.map((event) => event.toObject())
  }

  public async findEventsByCategory(category: string): Promise<Event[]> {
    const foundEvent = await EventModel.find({ categories: category }).exec()

    return foundEvent.map((event) => event.toObject())
  }

  public async findEventByName(name: string): Promise<Event[]> {
    const foundEvent = await EventModel.find({
      title: {
        $regex: name,
        $options: 'i',
      },
    }).exec()

    return foundEvent.map((event) => event.toObject())
  }

  public async findEventById(id: string): Promise<Event | undefined> {
    const event = await EventModel.findById(id).exec()

    return event?.toObject() || undefined
  }

  public async update(event: Event, id: string): Promise<any> {
    return await EventModel.findByIdAndUpdate(id, event)
  }
}

export { EventRepositoryMongoose }
