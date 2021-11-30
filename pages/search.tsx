import { Button, TextField, Grid, Box } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { searchResult } from './api/searchResult';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Apple from '@mui/icons-material/Apple';
import Adb from '@mui/icons-material/Adb';
const column: GridColDef[] = [
  { field: 'logo', width: 52, headerName: '', renderCell: (e) => <img src={e.value} width={40} height={40} /> },
  { field: 'name', minWidth: 150, headerName: 'App Name' },
  { field: 'org', width: 150, headerName: 'Organization' },
  { field: 'category', width: 150, headerName: 'Category' },
  {
    field: 'ios',
    width: 150,
    headerName: 'IOS',
    renderCell: (e) =>
      e.value ? (
        <a href={e.value}>
          <Apple fontSize="large" color={'primary'} />
        </a>
      ) : (
        <Apple fontSize="large" color={'disabled'} />
      ),
  },
  {
    field: 'android',
    width: 150,
    headerName: 'Android',
    renderCell: (e) =>
      e.value ? (
        <a href={e.value}>
          <Adb fontSize="large" color={'primary'} />
        </a>
      ) : (
        <Adb fontSize="large" color={'disabled'} />
      ),
  },
  { field: 'pc', width: 150 },
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
            Search
          </Button>
        </Box>
      </Grid>
      <Grid style={{ minWidth: '60vw', height: '80vh' }}>
        <DataGrid rows={data} columns={column}></DataGrid>
      </Grid>
    </Grid>
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
