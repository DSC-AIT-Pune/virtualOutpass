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
const App=()=>{
    const [curruser,setcurruser]=useState("");
    const [isAuth,setIsAuth]=useState(false);
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
            <Route path="/stu" element={<Stu />}/>
            <Route path="/auth" element={<Authority/>}></Route>
            <Route path="/hod" element={<Hod/>}></Route>
            <Route path="/classauth" element={<ClassAuth/>}></Route>
        </Routes>

   
        </BrowserRouter>
    );
}
export default App;