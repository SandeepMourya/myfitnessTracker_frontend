import React from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import Navbar from '../UI/Navbar';
import classes from './Dashboard.module.css'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PieChart from './PieChart';
import ExtraStats from './ExtraStats';

const date = moment().format('L');

const Dashboard = () => {
  const nav = useNavigate();

 

  

  const [value, setValue] = React.useState(date);
  // const [carbs, setCarb] = React.useState(0);
  // const [protein, setProtein] = React.useState(0);
  // const [fibre, setFibre] = React.useState(0);
  const [nutri, setNutri] = React.useState({ carbs: 0, protein: 0, fibre: 0 })
  const token = localStorage.getItem('token')


  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/JSON");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const fetchData = async () => {
    console.log(value);
    const response = await fetch(`https://myfitnesstracker-backend.herokuapp.com/foodsSend?parameter=${value}`, {
      method: 'GET',
      headers: myHeaders,
    }


    )
    const ressponseData = await response.json()
    const Carbs = ressponseData.reduce((acc, currVal) => { return acc + currVal.carbohydrates }, 0)
    const Protein = ressponseData.reduce((acc, currVal) => { return acc + currVal.protein }, 0)
    const Fibre = ressponseData.reduce((acc, currVal) => { return acc + currVal.fibres }, 0)
    setNutri({ carbs: Carbs, protein: Protein, fibre: Fibre })
    console.log(Carbs, Protein, Fibre)

    console.log(ressponseData);

  }
  useEffect(() => {
    if(!localStorage.getItem('token')){
      nav('/Error')
    }
    fetchData();

  }, [value,nav,fetchData])


  const handleChange = (newValue) => {
    
   
    var dateString = moment(newValue).format('L')

    console.log(dateString)
    // console.log(newValue.toLocaleString().slice(0, 9))
    // let temp = newValue.toLocaleString().slice(0, 9);
    // let confirm = ""
    // console.log(temp.length)
    // if (temp.length === 9) {
    //   confirm = '0' + temp
    // } else {
    //   confirm = temp;
    // }
    // console.log(confirm);
    setValue(dateString);
  };




  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.navbar}>
          <Navbar></Navbar>
        </div>
        <div className={classes.content}>
          <div className={classes.date}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

              <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />


            </LocalizationProvider>
          </div>
          <div className={classes.charts}>
            <div className={classes.radial}>
              <PieChart value={nutri.carbs} fillValue={300} name='Carbs'></PieChart>

            </div>
            <div className={classes.radial}>
              <PieChart value={nutri.protein} fillValue={80} name='Protein'></PieChart>
            </div>
            <div className={classes.radial}>
              <PieChart value={nutri.fibre} fillValue={60} name='Fibre'></PieChart>
            </div>
          </div>
          <div className={classes.extraStats}>
            <ExtraStats></ExtraStats>
          </div>

        </div>

      </div>

    </>
  )
}

export default Dashboard;
