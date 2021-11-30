import { describe } from 'jest-circus';
import { createMocks } from 'node-mocks-http';
import request from '../pages/api/request';
import authenticate from '../pages/api/authenticate';
describe('/api/request', () => {
  it('request without user token', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        org: 'Google',
        name: 'Google Chrome',
        ios: '',
        android: '',
        pc: '',
      },
    });
    await request(req, res);
    expect(res._getStatusCode()).toBe(401);
  });
  it('proper request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        username: 'test_user',
        password: 'test_user',
      },
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RfdXNlciIsInJvbGUiOiJTVEFOREFSRCIsImlhdCI6MTYzNjEzNzU0MiwiZXhwIjoxNjM2MTQxMTQyfQ.jbD2G_CqVVTs0AkkBcuMW_EoJwP7ASIICkkIpn15IUg',
      },
    });
    await authenticate(req, res);
    expect(res._getStatusCode(), 200);
    // const { req, res } = createMocks({
    //   method: 'POST',
    //   body: {
    //     org: 'Google',
    //     name: 'Google Chrome',
    //     ios: '',
    //     android: '',
    //     pc: '',
    //   },
    // });
    // await search(req, res);
    // expect(res._getStatusCode()).toBe(401);
  });
});
