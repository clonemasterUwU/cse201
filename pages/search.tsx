import { Button, TextField, Grid, Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { searchResult } from './api/searchResult';
import { DataGrid, GridColDef, GridOverlay } from '@mui/x-data-grid';
import Apple from '@mui/icons-material/Apple';
import Adb from '@mui/icons-material/Adb';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

const column: GridColDef[] = [
  { field: 'logo', width: 52, headerName: '', renderCell: (e) => <img src={e.value} width={40} height={40} /> },
  { field: 'name', minWidth: 150, headerName: 'App Name' },
  { field: 'org', width: 150, headerName: 'Organization' },
  { field: 'category', width: 150, headerName: 'Category' },
  {
    field: 'ios',
    width: 75,
    headerName: 'IOS',
    renderCell: (e) =>
      e.value ? (
        <IconButton href={e.value}>
          <Apple fontSize="large" color={'primary'} />
        </IconButton>
      ) : (
        <Apple fontSize="large" color={'disabled'} />
      ),
  },
  {
    field: 'android',
    width: 100,
    headerName: 'Android',
    renderCell: (e) =>
      e.value ? (
        <IconButton href={e.value}>
          <Adb fontSize="large" color={'primary'} />
        </IconButton>
      ) : (
        <Adb fontSize="large" color={'disabled'} />
      ),
  },
  {
    field: 'pc',
    width: 75,
    headerName: 'PC',
    renderCell: (e) =>
      e.value ? (
        <IconButton href={e.value}>
          <DesktopWindowsIcon fontSize="large" color={'primary'} />
        </IconButton>
      ) : (
        <DesktopWindowsIcon fontSize="large" color={'disabled'} />
      ),
  },
];
export default function Search({ data, query }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [text, setText] = useState(query);
  const handleSearch = () => {
    router.push(`search?text=${text}`);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Box
          sx={{
            width: '40vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            '& > :not(style)': {
              m: 1,
            },
          }}
        >
          <TextField
            placeholder="Finding some app? Search by name or organization..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && text) handleSearch();
            }}
            sx={{ width: 1 }}
          />
          <Button variant="outlined" onClick={handleSearch} disabled={!text} sx={{ width: 1 / 3 }}>
            <SearchIcon fontSize="large" />
          </Button>
        </Box>
      </Grid>
      <Grid display="flex" style={{ width: 800, height: '80vh' }}>
        <DataGrid
          rows={data}
          columns={column}
          components={{
            NoRowsOverlay: NoRowsOverlay,
          }}
        ></DataGrid>
      </Grid>
    </Grid>
  );
}

function NoRowsOverlay() {
  const router = useRouter();
  return (
    <GridOverlay>
      <Typography>App not found. Maybe</Typography>
      <Button onClick={() => router.push('/user/add_request')}>Adding yours</Button>
    </GridOverlay>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { text } = context.query;
  if (text) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/search?text=${text}`);
      const data: searchResult[] = await res.json();
      return {
        props: {
          data: data.map((x, _id) => {
            return { ...x, id: _id };
          }),
          query: text,
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: '/500',
          permanent: true,
        },
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
};
