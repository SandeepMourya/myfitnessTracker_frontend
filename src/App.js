import React from 'react'
import Login from "./components/login/Login.js"
import {BrowserRouter as Router,Route,Routes}from 'react-router-dom'
import Register from './components/login/Register.js';
import MoreInfo from './components/login/MoreInfo.js';
import Dashboard from './components/Dashboard/DashBoard.js';
import UploadImage from './components/UploadImage/UploadImage.js';
import Blogs from './components/Blogs/Blogs.js';
import Error from './components/Error/Error.js';
function App() {
  return (
   
        <>
          <div style={{width:"100vw",height:"100vh",boxSizing:"border-box",margin:"0px",padding:"0px"}}>
           <Router>
             <Routes>
                <Route path ="/" element={<Login></Login>}></Route>
                <Route path ="/register" element={<Register></Register>}></Route>
                <Route path ="/more-info" element={<MoreInfo></MoreInfo>}></Route>
                <Route path ="/dashboard" element={<Dashboard></Dashboard>}></Route>
                <Route path ="/uploadImage" element={<UploadImage></UploadImage>}></Route>
                <Route path ="/blogs" element={<Blogs></Blogs>}></Route>
                <Route path ="/Error" element={<Error></Error>}></Route>
             </Routes>
           </Router>
            
            
            
          </div>
        </>
     
  );
}

export default App;
