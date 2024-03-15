import supertest from 'supertest';
import { describe, it, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import app from '@/app';

const request = supertest(app);

vi.mock('../repository', () => ({
  create: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    sprintId: 1,
    templateId: 3,
    gifUrl:
      'https://media2.giphy.com/media/5mCQOcUfywmyI/giphy.gif?cid=b391e65d35ohapm9mcqgudplahfcav3e10oztyv1vpu6uz7h&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  }),
}));

describe('send a new message', () => {
  it('should send a message successfully', async () => {
    request
      .post('/messages')
      .send({
        username: 'akveda',
        sprintCode: 'WD-1.1',
      })
      .expect(StatusCodes.CREATED)
      .expect('Content-Type', /json/);
  });
});

describe('retrieving messages', () => {
  it('should return all user messages', async () => {
    request
      .get('/messages')
      .send({
        username: 'akveda',
      })
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/);
  });

  it('should return all sprint messages', async () => {
    request
      .get('/messages')
      .send({
        sprintCode: 'WD-1.1',
      })
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/);
  });

  it('should return all messages', async () => {
    request
      .get('/messages')
      .send({})
      .expect(StatusCodes.OK)
      .expect('Content-Type', /json/);
  });
});
