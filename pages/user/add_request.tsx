import React, { useRef, useState } from 'react';
import { Button, Box, TextField, Grid } from '@mui/material';
import Router from 'next/router';

function AddRequestForm() {
  const handleRequest = async () => {
    const resp = await fetch('http://localhost:3000/api/user/add_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app: appNameRef.current?.value,
        org: orgNameRef.current?.value,
        category: categoryRef.current?.value,
        logo: logoRef.current?.value,
        android: androidRef.current?.value,
        ios: iosRef.current?.value,
        pc: pcRef.current?.value,
      }),
    });
    const json = await resp.json();
    if (!json.ok) {
      setErrorMessage(json.message);
    } else {
      Router.replace('/');
    }
  };
  const appNameRef = useRef<HTMLInputElement>(null);
  const orgNameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const androidRef = useRef<HTMLInputElement>(null);
  const iosRef = useRef<HTMLInputElement>(null);
  const pcRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState('');
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
            flexDirection: 'column',
            '& > :not(style)': {
              m: 1,
            },
          }}
        >
          <TextField required id="outlined-required" label="App Name" fullWidth={true} inputRef={appNameRef} />
          <TextField required id="outlined-required" label="Organization Name" fullWidth={true} inputRef={orgNameRef} />
          <TextField required id="outlined-required" label="Category" fullWidth={true} inputRef={categoryRef} />
          <TextField required id="outlined-required" label="Logo link" fullWidth={true} inputRef={logoRef} />
          <TextField id="outlined" label="Android link" fullWidth={true} inputRef={androidRef} />
          <TextField id="outlined" label="IOS link" fullWidth={true} inputRef={iosRef} />
          <TextField id="outlined" label="PC link" fullWidth={true} inputRef={pcRef} />

          <div>{errorMessage}</div>

          <Button variant="outlined" size="large" onClick={handleRequest}>
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddRequestForm;
