import { Button, TextField, Grid, Box } from '@mui/material';
import { useState } from 'react';
// import useSWRInfinite from 'swr/infinite';
// import useSWR from 'swr';
// import useOnScreen from '../util/useCheckOnScreen';
import { searchResult } from './api/searchResult';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Apple from '@mui/icons-material/Apple';
import Adb from '@mui/icons-material/Adb';
// async function fetcher(...args: any[]) {
//   const res = await fetch(...args);
//   return res.json();
// }

// const PAGE_SIZE = 3;
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
export default function Search() {
  // const ref = useRef();
  const [appName, setAppName] = useState<string>('');
  const [orgName, setOrgName] = useState<string>('');
  //   const [org,setOrg] = useState("");
  //   const [app,setApp] = useState("");
  //   const getKey = (pageIndex: number, previousPageData: any[]) => {
  //     if (previousPageData && !previousPageData.length) {
  //       return null;
  //     }
  //     return `/api/search?${appNameRef ? `app=${appNameRef}&` : ""}${
  //       orgNameRef ? `org=${orgNameRef}&` : ""
  //     }page=${pageIndex}`;
  //   };

  //   const { data, size, error, setSize, isValidating } = useSWRInfinite(
  //     (...args) => getKey(...args),
  //     fetcher
  //   );

  //   const isVisible = useOnScreen(ref);
  //   const cache = data ? [].concat(...data) : [];
  //   const isLoadingInitial = !data && !error;
  //   const isLoadingMore =
  //     isLoadingInitial ||
  //     (size > 0 && data && typeof data[size - 1] === "undefined");

  //   const isEmpty = data?.[0]?.length === 0;
  //   const isReachingEnd = size === PAGE_SIZE;
  //   const isLoading = isValidating && data && data.length === size;

  //   useEffect(() => {
  //     if (isVisible && !isReachingEnd && !isLoading) {
  //       setSize(size + 1)
  //     }
  //   }, [isVisible, isLoading]);
  const [data, setData] = useState<searchResult[]>([]);
  const handleSearch = async () => {
    const result: searchResult[] = await (await fetch(`api/search?name=${appName}&org=${orgName}`)).json();
    setData(
      result.map((x, _id) => {
        return { ...x, id: _id };
      })
    );
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
            label="App Name"
            value={appName}
            disabled={!!orgName}
            onChange={(e) => setAppName(e.target.value)}
          />
          <TextField
            label="Org Name"
            value={orgName}
            disabled={!!appName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <Button variant="outlined" onClick={handleSearch}>
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
