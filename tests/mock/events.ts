import { Event } from '../../src/entities/Event'

export const showCategoryEvents: Event[] = [
  {
    title: 'Jorge e Matheus',
    price: [{ amount: '20', sector: 'Pista' }],
    categories: ['Show'],
    description: 'Evento descrição',
    city: 'Belo Horizonte',
    location: {
      latitude: '-19.8658619',
      longitude: '-43.9737064',
    },
    cupons: [],
    date: new Date(),
    participants: [],
    banner: '/Users/ls618/Downloads/ecommerce.png',
    flyers: [
      '/Users/ls618/Downloads/41oUTSNw4FL._SL500_.jpg',
      '/Users/ls618/Downloads/oipt.jpg',
    ],
  },
  {
    title: 'Jorge e Matheus',
    price: [{ amount: '20', sector: 'Pista' }],
    categories: ['Show'],
    description: 'Evento descrição',
    city: 'Belo Horizonte',
    location: {
      latitude: '-19.8658619',
      longitude: '-43.9737064',
    },
    cupons: [],
    date: new Date(),
    participants: [],
    banner: '/Users/ls618/Downloads/ecommerce.png',
    flyers: [
      '/Users/ls618/Downloads/41oUTSNw4FL._SL500_.jpg',
      '/Users/ls618/Downloads/oipt.jpg',
    ],
  },
  {
    title: 'Festa do Jorge',
    price: [{ amount: '14', sector: 'Quadra' }],
    categories: ['Show', 'Festa'],
    description: 'Evento festivo',
    city: 'São Paulo',
    cupons: ['JORGEFESTA', 'JORGEFESTA2'],
    date: new Date('2021-11-17T18:23:39Z'),
    location: {
      latitude: '-23.5475000',
      longitude: '-46.6361100',
    },
    participants: [],
    banner: '/Users/ls618/Downloads/ecommerce.png',
    flyers: [
      '/Users/ls618/Downloads/41oUTSNw4FL._SL500_.jpg',
      '/Users/ls618/Downloads/oipt.jpg',
    ],
  },
  {
    title: 'Festa do Matheus',
    price: [{ amount: '14', sector: 'Quadra' }],
    categories: ['Show', 'Festa'],
    description: 'Evento desfestivo',
    city: 'Rio de janeiro',
    cupons: ['MATHEUSFESTA', 'MATHEUSFESTA2'],
    date: new Date('2021-11-17T18:23:39Z'),
    location: {
      latitude: '-22.9035000',
      longitude: '-43.2096000',
    },
    participants: [],
    banner: '/Users/ls618/Downloads/ecommerce.png',
    flyers: [
      '/Users/ls618/Downloads/41oUTSNw4FL._SL500_.jpg',
      '/Users/ls618/Downloads/oipt.jpg',
    ],
  },
]
