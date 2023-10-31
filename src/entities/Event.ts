import { Location } from './Location'
import { Price } from './Price'
import { User } from './User'

class Event {
  constructor(
    public title: string,
    public location: Location,
    public date: Date,
    public categories: string[],
    public description: string,
    public flyers: string[],
    public banner: string,
    public cupons: string[],
    public participants: User[],
    public price: Price[],
    public city: string,
  ) {
    this.title = title
    this.location = location
    this.date = date
    this.description = description
    this.flyers = flyers
    this.banner = banner
    this.cupons = cupons
    this.participants = participants
    this.price = price
    this.city = city
  }
}

export { Event }
