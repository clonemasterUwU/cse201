import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import pool from '../../util/mysql';
import TinderCard from 'react-tinder-card';
import { Pool } from 'mysql2';
function Admin({ data }): InferGetServerSidePropsType<typeof getServerSideProps> {
  const swipeHandle = async (direction, app) => {
    const result = await fetch('/api/admin/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app: app,
        approve: direction === 'right',
      }),
    });
  };
  return (
    <div>
      {data.map((app) => (
        <TinderCard key={app.app} onSwipe={(dir) => swipeHandle(dir, app.name)}>
          <div>{app.name}</div>
          <div>{app.org}</div>
          {/* <div>{app.time}</div> */}
          <div>{app.logo}</div>
        </TinderCard>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [result] = await (pool as Pool).execute(
    `SELECT name,org,logo,category,ios,android,pc FROM ${process.env.TABLE_PENDING_APP} ORDER BY time DESC LIMIT 10;`
  );

  return {
    props: {
      data: result,
    },
  };
};
export default Admin;
