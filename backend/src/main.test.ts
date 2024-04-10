import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from './main'

describe('test suite', () => {
  it('configuration-data', async () => {
    const response = await request(app).get('/api/configuration')

    expect(response.body).toStrictEqual({ data: 'some-configuration-data-from-backend' })
  })

  it('login', async () => {
    const response = await request(app).post('/api/login').send({ username: 'foo', password: 'bar' })

    expect(response.body).toStrictEqual({ token: 'some-auth-token', status: 200 })
  })
})

export {}
