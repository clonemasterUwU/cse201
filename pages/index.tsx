import { Button, TextField, Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Search() {
  const router = useRouter();
  const [text, setText] = useState('');
  const handleSearch = () => {
    router.push(`search?text=${text}`);
  };
  const handleAdd = () => {
    router.push('/user/add_request');
  };
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <Box
        sx={{
          width: '40vw',
          display: 'flex',
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
      </Box>
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
        <Button variant="outlined" onClick={handleSearch} disabled={!text} sx={{ width: 1 / 3 }}>
          Search
        </Button>
        <Button variant="outlined" onClick={handleAdd} fullWidth>
          Wanna add your app?
        </Button>
      </Box>
    </Grid>
  );
}
