import React, { useRef, useState } from 'react';
import { Button, Box, TextField, Grid } from '@mui/material';
import Router from 'next/router';

function LoginForm() {
  const handleSignUp = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });
    const json = await resp.json();
    if (!resp.ok) {
      setErrorMessage(json.message);
    } else {
      Router.replace('/login');
    }
  };
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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
          <TextField required id="outlined-required" label="Username" fullWidth={true} inputRef={usernameRef} />

          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth={true}
            inputRef={passwordRef}
          />

          <div>{errorMessage}</div>

          <Button variant="outlined" size="large" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
