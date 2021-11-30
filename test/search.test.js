import { describe } from 'jest-circus';
import { createMocks } from 'node-mocks-http';
import search from '../pages/api/search';

describe('/api/search', () => {
  it('searching function one query params', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        text: 'Google',
      },
    });
    await search(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
  it('searching function no query params', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        org: '',
        name: '',
      },
    });
    await search(req, res);
    expect(res._getStatusCode()).toBe(400);
  });
  it('searching function two query params', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        org: 'Google',
        name: 'Google',
      },
    });
    await search(req, res);
    expect(res._getStatusCode()).toBe(400);
  });
});
