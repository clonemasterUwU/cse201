import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import pool from '../../util/mysql';
import TinderCard from 'react-tinder-card';
import { Pool } from 'mysql2/promise';
import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Adb from '@mui/icons-material/Adb';
import { verify } from 'jsonwebtoken';

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
    console.log(result.status);
  };
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      {data.map((app, _id) => (
        <Grid item key={_id}>
          <TinderCard key={app.app} onSwipe={(dir) => swipeHandle(dir, app.name)}>
            <Card sx={{ display: 'flex', width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Name: {app.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Organization: {app.org}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Time request: {app.time.toString()}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  <IconButton>
                    <Adb fontSize="large" color={'primary'} />
                  </IconButton>
                </Box>
              </Box>
              <CardMedia component="img" sx={{ width: 151 }} image={app.logo} alt="Live from space album cover" />
            </Card>
          </TinderCard>
        </Grid>
      ))}
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  verify(context.req?.headers?.cookie?.auth, process.env.SECRET, async function (err, decoded) {
    if (err || !decoded || decoded.role !== 'ADMIN') {
      return {
        redirect: {
          destination: '/login',
        },
        props: {},
      };
    }
  });
  const [result] = await (pool as Pool).execute(
    `SELECT name,org,logo,category,ios,android,pc,time FROM ${process.env.TABLE_PENDING_APP} ORDER BY time DESC LIMIT 10;`
  );
  return {
    props: {
      data: result,
    },
  };
};
export default Admin;
