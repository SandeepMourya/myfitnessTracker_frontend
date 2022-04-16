import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../UI/Navbar';
import classes from './UploadImage.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Typography, Button, Input } from '@mui/material';


function UploadImage() {
    console.log("function Ran")
    const nav = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            nav('/Error')
        }
    }, [nav])

    console.log("dhdhdh")
    const [image, setImage] = useState("s");
    const [calories, setcalories] = useState(0);
    const [protein, setprotein] = useState(0);
    const [carbohydrates, setcarbs] = useState(0);
    const [fat, setfat] = useState(0);
    const [fibre, setfibre] = useState(0);
    const [weight, setWeight] = useState(500);
    

    const data = [
        {
            name: 'Caloies ⚡',
            per_gram: calories / weight,


        },
        {
            name: 'Protein 🥩',
            per_gram: protein / weight,


        },
        {
            name: 'Carbs 🍚',
            per_gram: carbohydrates / weight,


        },
        {
            name: 'Fat 🧀',
            per_gram: fat / weight,


        },
        {
            name: 'Fibre 🌿',
            per_gram: fibre / weight,


        },


    ];

    var formData = new FormData()
    formData.append('image', image)


    var myHeaders = new Headers()
    myHeaders.append(
        "Authorization",
        "Bearer 302d51b8db74f587b313d4e44a65b1b77fec208e")

    var myHeaders1 = new Headers();
    myHeaders1.append("Cookie", "route=222fc2df52ebc04b5a35043498fc068c");

    var requestOptions1 = {
        method: "GET",
        headers: myHeaders1,
        redirect: "follow",
    };

    const changeHandler = (e) => {

        setImage(e.target.files[0]);

    }

    

    const submit = async () => {
       
        const response = await fetch("https://api.logmeal.es/v2/recognition/dish", { method: 'POST', body: formData, headers: myHeaders })
        
        const result = await response.json();
        console.log(response.status);

        const response2 = await fetch(
            `https://api.edamam.com/api/nutrition-data?app_id=094741c7&app_key=a61fce81e1ac154b92edc42aa189029d&nutrition-type=logging&ingr=${result.recognition_results[0].name}`,
            requestOptions1
        )
        
        const result2 = await response2.json()
        setcalories(result2.totalNutrients.ENERC_KCAL.quantity);
        setfat(result2.totalNutrients.FAT.quantity);
        setcarbs(result2.totalNutrients.CHOCDF.quantity);
        setprotein(result2.totalNutrients.PROCNT.quantity);
        setfibre(result2.totalNutrients.FIBTG.quantity);
        setWeight(result2.totalWeight)
        console.log(result2);

        const token = localStorage.getItem('token')

        var HeaderForfood = new Headers();

        HeaderForfood.append("Authorization", `Bearer ${token}`);
        HeaderForfood.append("Content-Type", "application/json");

        const data_to_send = {
            calories: result2.totalNutrients.ENERC_KCAL.quantity,
            protein: result2.totalNutrients.PROCNT.quantity,
            carbohydrates: result2.totalNutrients.CHOCDF.quantity,
            fats: result2.totalNutrients.FAT.quantity,
            fibres: result2.totalNutrients.FIBTG.quantity
        }
        let raw = JSON.stringify(data_to_send)
        console.log(raw)
        const responseFood = await fetch('https://myfitnesstracker-backend.herokuapp.com/foods', {
            method: 'POST',
            body: raw,
            headers: HeaderForfood,

        })
        const Data = await responseFood.json();
        if (Data) {
            console.log(Data.createdAt.slice(0, 10))
        }
        console.log(Data);


    }


    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.navbar}>
                    <Navbar></Navbar>
                </div>
                <div className={classes.content}>
                    <div className={classes.card}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Input type="file" onChange={changeHandler} />

                            <Button
                                variant="contained"
                                onClick={submit}
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#FB008B',
                                    width: '100px',
                                    marginTop: '24px',
                                    marginBottom: '24px'

                                }}
                            >
                                <Typography variant='body1'> Upload </Typography>
                            </Button>
                            
                                <div className={classes.Data}>
                                    Calories: {calories} kcal ⚡

                                </div>
                                <div className={classes.Data}>
                                    Proteins: {protein} grams 🥩
                                </div>
                                <div className={classes.Data}>
                                    Carbohydrates: {carbohydrates} grams 🍚
                                </div>
                                <div className={classes.Data}>
                                    Fibres: {fibre} grams 🌿
                                </div>
                                <div className={classes.Data}>
                                    Fats: {fat} grams 🧀
                                </div>
                            

                        </div>
                    </div>
                    <div className={classes.chart}>
                        <div className={classes.ChartTitle}>Nutritional Density</div>
                        <ResponsiveContainer width="100%" height="90%">

                            <BarChart

                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis type="number" domain={[0, 3]} />
                                <Tooltip />
                                <Legend />

                                <Bar dataKey="per_gram" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UploadImage;
