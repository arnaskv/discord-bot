import supertest from 'supertest';
import { describe, it, expect, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import app from '@/app';
import * as repo from '../repository';

const request = supertest(app);

vi.mock('../repository', () => ({
  create: vi.fn().mockResolvedValue({
    id: 1,
    sprintCode: 'WD-1.4',
    sprintInfo: 'Python capstone project',
  }),
}));

describe('create new template', () => {
  it('should create it successfully', async () => {
    const response = await request
      .post('/sprints')
      .send({
        sprintCode: 'WD-1.4',
        sprintInfo: 'Python capstone project',
      })
      .expect(StatusCodes.CREATED)
      .expect('Content-Type', /json/);

    expect(repo.create).toHaveBeenCalledWith({
      sprintCode: 'WD-1.4',
      sprintInfo: 'Python capstone project',
    });
    expect(response.body).toEqual({
      id: 1,
      sprintCode: 'WD-1.4',
      sprintInfo: 'Python capstone project',
    });
  });

  it('should return ZodError', async () => {
    const response = await request
      .post('/sprints')
      .send({
        sprintCode: 'WD-1.4',
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/);

    expect(response.body.error.name).toEqual('ZodError');
  });
});

describe('crud operations id check', () => {
  it('should return with a BAD_REQUEST status code', async () => {
    request
      .get('/sprints')
      .send({})
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.error.message).toEqual('Provide id');
      });

    request
      .get('/sprints')
      .send({
        id: 1.1,
      })
      .expect(StatusCodes.BAD_REQUEST)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body.error.message).toEqual('Id must be an integer');
      });
  });
});
