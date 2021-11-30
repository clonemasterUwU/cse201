import React, { useRef, useState } from 'react';
import { Button, Box, TextField, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Router from 'next/router';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

function LoginForm() {
  const handleLogin = async () => {
    const resp = await fetch('http://localhost:3000/api/authenticate', {
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
      Router.back();
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
      <Grid item xs={6}>
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

          <Button variant="contained" size="large" onClick={handleLogin}>
            Login
          </Button>
          <Div>{'Or just'}</Div>
          <Button variant="outlined" size="large" onClick={() => Router.replace('/signup')}>
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
