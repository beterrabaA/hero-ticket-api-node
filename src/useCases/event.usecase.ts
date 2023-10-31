import axios from 'axios'
import { Event } from '../entities/Event'
import { HttpException } from '../interfaces/HttpException'
import { EventRepository } from '../repositories/event.repository'
import { calculateDistance } from '../utils'
import { UserRepositoryMongoose } from '../repositories/UserRepositoryMongoose'

class EventUseCase {
  constructor(private eventRepository: EventRepository) {
    this.eventRepository = eventRepository
  }

  public async create(eventData: Event): Promise<Event> {
    if (!eventData.banner) throw new HttpException(400, 'Banner is required')
    if (!eventData.flyers) throw new HttpException(400, 'Flyers is required')
    if (!eventData.location) {
      throw new HttpException(400, 'Location is required')
    }

    const eventFound = await this.eventRepository.findByLocationAndDate(
      eventData.location,
      eventData.date,
    )

    if (eventFound) {
      throw new HttpException(400, 'Event already exists')
    }

    eventData.city = await this.getCityNameByCoordinates(
      eventData.location.latitude,
      eventData.location.longitude,
    )

    return await this.eventRepository.add(eventData)
  }

  public async findEventByLocation(
    latitude: string,
    longitude: string,
  ): Promise<Event[]> {
    const cityName = await this.getCityNameByCoordinates(latitude, longitude)

    const foundEventsByCity = await this.eventRepository.findEventsByCity(
      cityName,
    )

    return foundEventsByCity.filter((event) => {
      const distance = calculateDistance(
        Number(latitude),
        Number(longitude),
        Number(event.location.latitude),
        Number(event.location.longitude),
      )
      return distance < 3
    })
  }

  public async findEventByCategory(category: string): Promise<Event[]> {
    if (!category) throw new HttpException(400, 'Category is required')
    return await this.eventRepository.findEventsByCategory(category)
  }

  public async findEventByName(name: string): Promise<Event[]> {
    if (!name) throw new HttpException(400, 'Name is required')
    return await this.eventRepository.findEventByName(name)
  }

  public async findEventById(id: string): Promise<Event> {
    if (!id) throw new HttpException(400, 'Id is required')
    const event = await this.eventRepository.findEventById(id)

    if (!event) throw new HttpException(404, 'Event not found')

    return event
  }

  public async addParticipants(
    id: string,
    name: string,
    email: string,
  ): Promise<Event> {
    const event = await this.findEventById(id)

    if (!event) throw new HttpException(400, 'Event not found')

    const userRepository = new UserRepositoryMongoose()
    const isUserExist = await userRepository.findUserByEmail(email)
    let user: any = {}
    if (!isUserExist) {
      user = await userRepository.add({ name, email })
    } else {
      user = isUserExist
    }

    console.log(event.participants)

    if (event.participants.includes(user._id)) {
      throw new HttpException(400, 'User already participate')
    }

    event.participants.push(user._id)

    await this.eventRepository.update(event, id)

    return event
  }

  private async getCityNameByCoordinates(
    latitude: string,
    longitude: string,
  ): Promise<string> {
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    try {
      const { data } = await axios.get(URL)

      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].address_components
        const cityType = address.find(
          (item: any) =>
            item.types.includes('administrative_area_level_2') &&
            item.types.includes('political'),
        )
        return cityType.long_name
      }
      throw new HttpException(404, 'City not found')
    } catch (error) {
      throw new HttpException(400, 'Error on get city name')
    }
  }
}

export { EventUseCase }
