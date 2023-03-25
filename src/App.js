import React, { useState } from "react";
import Login from './Login';
import Navbar from './Navbar'
import {BrowserRouter,Routes,Route,Link,Navigate} from 'react-router-dom';
import Homepage from "./Homepage";
import './App.css';
import Stu from "./student";
import { Button } from "@mui/material";
import {auth} from './firebase-config';
import {signOut} from 'firebase/auth';
import Authority from "./Authority";
import Hod from './Hod';
import ClassAuth from "./ClassAuth";
import Hodlogin from "./Hodlogin";
import Gate from "./Gate";
const App=()=>{
    const [curruser,setcurruser]=useState("");
    const [isAuth,setIsAuth]=useState(false);
    const [isAuthau,setisAuthau]=useState(false);
    const logout = async () => {
        await signOut(auth);
        setIsAuth(false);
        window.location.pathname="/";
      };
    return (
        <BrowserRouter>
         <nav>
           <Link to="/">Home</Link>
         
         {!isAuth ?<Link to="Login">Login</Link> : <Button onClick={logout}>Logout</Button>}  
         {!isAuth ? <Link to="Login">Student</Link>:<Link to="/stu">Student</Link>}
         <h1>current user: {curruser}</h1>
         </nav>
         
        <Routes>
            <Route path="/"  element={<Homepage/>}/>
            <Route path="/login" element={<Login setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/>
            {(isAuth)  ? <Route path="/stu" element={<Stu/>}/> :<Route path="/stu" element={<Login setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/>}
            {!isAuthau ? <Route path="/auth" element={<Hodlogin logine="/auth" name="Authority" setisAuthau={setisAuthau}/>}/>:<Route path="/auth" element={<Authority/>}/>}
            {!isAuthau ? <Route path="/hod" element={<Hodlogin logine="/hod" name="HOD" setisAuthau={setisAuthau}/>}/>:<Route path="/hod" element={<Hod/>}/>}
            {!isAuthau ? <Route path="/classauth" element={<Hodlogin logine="/classauth" name="Class Authority Login" setisAuthau={setisAuthau}/>}/>:<Route path="/classauth" element={<ClassAuth/>}/>}
{/* <Route path="/auth" element={<Authority/>}/> */}
            {/* {!isAuthau ? <Route path="/hod" element={<Login setIsAuth={setIsAuth} setcurruser={setcurruser}/>}/>:<Route path="/hod" element={<Hod/>}/>} */}
           <Route path="/hodlogin" element={<Hodlogin logine="/hod" name="HOD" setisAuthau={setisAuthau}/>}/>
           <Route path="/authlogin" element={<Hodlogin logine="/auth" name="Authority" setisAuthau={setisAuthau}/>}/>
           <Route path="/classlogin" element={<Hodlogin logine="/classauth" name="Class Authority" setisAuthau={setisAuthau}/>}/>
           <Route path="/gate" element={<Gate/>}/>
        </Routes>   
        </BrowserRouter>
    );
}
export default App;