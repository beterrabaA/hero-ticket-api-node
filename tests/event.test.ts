import request from 'supertest'
import { App } from '../src/app'
import { showCategoryEvents } from './mock/events'
const app = new App().app

describe('Test event routes', () => {
  it('/POST Event', async () => {
    const event = showCategoryEvents[1]
    const response = await request(app)
      .post('/events')
      .field('title', event.title)
      .field('description', event.description)
      .field('categories', event.categories)
      .field('city', event.city)
      .field('cupons', event.cupons)
      .field('date', event.date.toISOString())
      .field('location[latitude]', event.location.latitude)
      .field('location[longitude]', event.location.longitude)
      .field('price[amount]', event.price[0].amount)
      .field('price[sector]', event.price[0].sector)
      .attach('banner', event.banner)
      .attach('flyers', event.flyers[0])
      .attach('flyers', event.flyers[1])

    expect(response.status).toBe(201)
    expect(response.body).toEqual({ message: 'Event created' })
  })

  it('/GET/:id event by id', async () => {
    const response = await request(app).get('/events/651d6894163953e226c10cf5')

    expect(response.status).toBe(200)
  })

  it('/GET event by location', async () => {
    const response = await request(app).get(
      '/events?latitude=-19.8658619&longitude=-43.9737064',
    )

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('/GET event by category', async () => {
    const response = await request(app).get('/events/category/Show')

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('/GET event by name', async () => {
    const response = await request(app).get('/events/name/Jorge e Matheus')

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})
