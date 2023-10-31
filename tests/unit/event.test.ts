import { EventRepository } from '../../src/repositories/event.repository'
import { EventUseCase } from '../../src/useCases/event.usecase'
import { showCategoryEvents } from '../mock/events'

describe('Unit Test events', () => {
  const eventRepository: EventRepository = {
    add: jest.fn(),
    findByLocationAndDate: jest.fn(),
    findEventsByCategory: jest.fn(),
    findEventsByCity: jest.fn(),
    findEventByName: jest.fn(),
    findEventById: jest.fn(),
  }

  const eventUseCases = new EventUseCase(eventRepository)
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Precisa ser consertado
  // it('should return an array of events by category', async () => {
  //   eventRepository.findEventsByCategory.mockResolvedValue(showCategoryEvents)
  //   const result = await eventUseCases.findEventByCategory('Show')

  //   expect(result).toEqual(showCategoryEvents)
  // })
  // Precisa ser consertado

  it('should return a error if category is not provided', async () => {
    try {
      await eventUseCases.findEventByCategory('')
    } catch (error: any) {
      expect(error.message).toBe('Category is required')
    }
  })
})
