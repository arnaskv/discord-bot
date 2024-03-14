import supertest from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import app from '@/app';
import * as userRepository from '../repository';

const request = supertest(app);

vi.mock('../repository', () => ({
  create: vi.fn().mockResolvedValue({
    id: 1,
    firstName: 'Kevin',
    lastName: 'Durant',
    username: 'kduran',
  }),
}));

describe('User Creation', () => {
  it('should create a new user', async () => {
    const response = await request
      .post('/users')
      .send({ firstName: 'Kevin', lastName: 'Durant' })
      .expect(StatusCodes.CREATED)
      .expect('Content-Type', /json/);

    expect(userRepository.create).toHaveBeenCalledWith('Kevin', 'Durant');
    expect(response.body).toEqual({
      id: 1,
      firstName: 'Kevin',
      lastName: 'Durant',
      username: 'kduran',
    });
  });

  // it('should return an error for missing data', async () => {
  //   const response = await request
  //     .post('/')
  //     .send({ firstName: 'Jane' })
  //     .expect(StatusCodes.NOT_FOUND);

  //   expect(response.body).toHaveProperty(
  //     'error',
  //     'Provide first and last name'
  //   );
  // });
});
