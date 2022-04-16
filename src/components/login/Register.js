import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import RegisterWrapper from './RegisterWrapper';
import Card from '../UI/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import classes from "./animateAndTitle.module.css"
import ParticlesContainer from '../UI/Particles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Register() {

    const nav = useNavigate();
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        

        const raw = JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
            contact:data.get('contact'),
            name:data.get('name')

        })
        localStorage.setItem('name',data.get('name'))
        const response = await fetch('https://myfitnesstracker-backend.herokuapp.com/users',{
            method:"POST",
            body:raw,
            headers:myHeaders
        })
        const Data = await response.json();
        console.log(Data);
        localStorage.setItem('token',Data.token)
        if(Data){
            nav('/more-info')
        }
        
    };

    return (
        <>
            <ParticlesContainer></ParticlesContainer>
            <ThemeProvider theme={theme}>
            
            <RegisterWrapper>
                <Card paddingBottom={'80px'} height={'700px'}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div className={classes.animate} style={{
                                fontSize: '40px',
                                color: '#90b45c',
                                fontWeight: '400'
                            }}>
                                My Health Tracker
                            </div>
                            <Avatar sx={{ m: 1, bgcolor: "#807cd4" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <TextField
                                            autoComplete="given-name"
                                            name="name"
                                            required={false}
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required={false}
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required={false}
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required={false}
                                            fullWidth
                                            name="contact"
                                            label="Contact"
                                            type="Contact"
                                            id="contact"
                                            autoComplete=""
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, height: '60px', background: "#807cd4" ,fontSize:"20px"}}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item> Already have an account?
                                        <Link to="/" style={{ textDecoration: 'none', color: "#ff1493" }}>
                                            {' Sign In'}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                    </Container>

                </Card>
            </RegisterWrapper>
          

        </ThemeProvider>
        </>
        
    );
}