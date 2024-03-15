import supertest from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import app from '@/app';
import * as templateRepository from '../repository';

const request = supertest(app);

vi.mock('../repository', () => ({
  create: vi.fn().mockResolvedValue({
    id: 1,
    templateText: '{userInfo} just successfully completed {sprintInfo}.',
  }),
}));

describe('create new template', () => {
  it('should create it successfully', async () => {
    const response = await request
      .post('/templates')
      .send({
        templateText: '{userInfo} just successfully completed {sprintInfo}.',
      })
      .expect(StatusCodes.CREATED)
      .expect('Content-Type', /json/);

    expect(templateRepository.create).toHaveBeenCalledWith({
      templateText: '{userInfo} just successfully completed {sprintInfo}.',
    });
    expect(response.body).toEqual({
      id: 1,
      templateText: '{userInfo} just successfully completed {sprintInfo}.',
    });
  });
});
