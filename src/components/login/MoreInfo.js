import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import RegisterWrapper from './RegisterWrapper';
import Card from '../UI/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import ParticlesContainer from '../UI/Particles';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
const theme = createTheme();

export default function MoreInfo() {


    const nav = useNavigate();
    React.useEffect(()=>{
        if(!localStorage.getItem('token')){
            nav('/Error')
        }
    },[nav])
    
    var myHeaders = new Headers();
    const token = localStorage.getItem('token')
    console.log(token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    
    let gender ='';
    const handleChangeforGender = (event) => {
        gender=event.target.value

    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const raw = JSON.stringify({
            age: data.get('age'),
            gender: gender,
            height:data.get('height'),
            weight:data.get('weight')

        });

        console.log(raw);
        const response = await fetch('https://myfitnesstracker-backend.herokuapp.com/users/me',{
            method:'PATCH',
            headers:myHeaders,
            body:raw
        })
        const Data = await response.json()
        nav('/dashboard')
        console.log(Data);
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

                                <Avatar sx={{ m: 1, bgcolor: "#807cd4" }}>
                                    <RateReviewOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    {`Hey ${localStorage.getItem('name')} ! Help us to get to Know you a little better...`}
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <FormLabel id="demo-radio-buttons-group-label">
                                        Gender
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue=""
                                        name="radio-buttons-group"
                                        onChange={handleChangeforGender}
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Female"
                                        />
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Male"
                                        />
                                        <FormControlLabel
                                            value="other"
                                            control={<Radio />}
                                            label="Other"
                                        />
                                    </RadioGroup>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} >
                                            <TextField
                                                autoComplete=""
                                                name="height"
                                                required={false}
                                                fullWidth
                                                id="height"
                                                label="Height(cm)"
                                                autoFocus
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                required={false}
                                                fullWidth
                                                id="weight"
                                                label="Weight(kg)"
                                                name="weight"
                                                autoComplete=""
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required={false}
                                                fullWidth
                                                name="age"
                                                label="Age"
                                                type="Age"
                                                id="age"
                                                autoComplete=""
                                                
                                            />
                                        </Grid>
                                        

                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, height: '50px', background: "#807cd4", fontSize: "16px" }}
                                    >
                                    next
                                    </Button>
                                    
                                </Box>
                            </Box>

                        </Container>

                    </Card>
                </RegisterWrapper>


            </ThemeProvider>
        </>

    );
}