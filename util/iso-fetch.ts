import { NextPageContext } from 'next';
import Router from 'next/router';

const iso_fetch = async (url: string, ctx: NextPageContext) => {
  const cookie = ctx.req?.headers.cookie;

  const response = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  if (response.status === 401) {
    if (!ctx.req) {
      //client routing
      Router.replace('/login');
      return;
    } else {
      // server-side routing
      ctx.res?.writeHead(302, {
        Location: 'http://localhost:3000/login',
      });
      ctx.res?.end();
      return;
    }
  } else {
    return await response.json();
  }
};

export default iso_fetch;
