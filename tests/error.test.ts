import { NextFunction, Request, Response } from 'express'
import { errorMiddleware } from '../src/middlewares/error.middleware'

describe('Error Middleware test', () => {
  it('should respond with the correct status adn message HttpExpception', () => {
    const errorHttp = {
      name: 'HttpException',
      message: 'Not found',
      status: 404,
    }

    const request = {} as Request
    const response: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    const next: NextFunction = jest.fn()

    errorMiddleware(errorHttp, request, response as Response, next)

    expect(response.status).toHaveBeenCalledWith(404)
    expect(response.json).toHaveBeenCalledWith({
      message: 'Not found',
      status: 404,
    })
  })
})
