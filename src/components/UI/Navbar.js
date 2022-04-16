import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImageIcon from '@mui/icons-material/Image';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import logo from '../../assets/menu.png'
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const nav = useNavigate();
  var myHeaders = new Headers();
  const token = localStorage.getItem('token')
  // console.log(token);
  // myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const logoutHandler = async () => {
    const response = await fetch('https://myfitnesstracker-backend.herokuapp.com/users/logout',{
            method:'POST',
            headers:myHeaders
            
        })
        const Data = await response.json()
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        nav('/')
        console.log(Data);
  }


  return (
    <div style={{ height: '100vh', width: '270px',marginTop:"25px" }}>
      <div style={{ display: 'flex', flexDirection: 'row',alignItems:"center",justifyContent:"center" }}>
        <img src={logo} alt="logo" width={65} style={{ padding: '6px' }} />
        <div style={{ fontSize: '18px', color: '#FB008B', padding: '10px' ,fontFamily:"cursive"}}><b> MY HEALTH <br /> TRACKER </b> </div>
      </div>
      <ListItem button style={{ paddingTop: "10px", marginTop: '100px' }}>
        <ListItemIcon>
          <DashboardIcon style={{ color: '#FB008B' }} />
        </ListItemIcon>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          {" "}
          <ListItemText primary="Dashboard" />{" "}
        </Link>
      </ListItem>
      <ListItem button style={{ paddingTop: "10px", marginTop: '40px' }}>
        <ListItemIcon>
          <ImageIcon style={{ color: '#FB008B' }} />
        </ListItemIcon>
        <Link to="/uploadImage" style={{ textDecoration: "none" }}>
          {" "}
          <ListItemText primary="Upload Image" />{" "}
        </Link>
      </ListItem>
      <ListItem button style={{ paddingTop: "10px", marginTop: '40px' }}>
        <ListItemIcon>
          <PersonIcon style={{ color: '#FB008B' }} />
        </ListItemIcon>
        <Link to="/blogs" style={{ textDecoration: "none" }}>
          {" "}
          <ListItemText primary="Blogs" />{" "}
        </Link>
      </ListItem>
      <div style={{ marginTop: '300px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={logoutHandler} variant="contained" style={{ backgroundColor: '#FB008B', textTransform: 'none', width: '120px', height: '40px' }}> Logout </Button>
      </div>
    </div>
  );
}
