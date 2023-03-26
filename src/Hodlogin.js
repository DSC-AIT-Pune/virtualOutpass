import React, { useState } from "react";
import {BrowserRouter,Link, Navigate, useNavigate} from 'react-router-dom';
import {db,auth } from './firebase-config';
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
const Hodlogin=(props)=>{  
    const navigate=useNavigate();
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    onAuthStateChanged(auth, (currentUser) => {
        
        props.setisAuthau(true);
      });


    const login = async ()=>{
        try{
const user=await signInWithEmailAndPassword(auth,email,password);
console.log(user);
navigate(props.logine);
props.setisAuthau(true);
        }
        catch(err){
            console.log("error",err);
        }
    }

    return (
        <>
        <h1>{props.name} LOGIN </h1>
        <input type="text" placeholder="email" onChange={(e)=>{setemail(e.target.value)}}/>
        <input type="text" placeholder="password..." onChange={(e)=>{setpassword(e.target.value)}}/>
        <button onClick={login}>VERIFY</button>
        </>
    );

}
export default Hodlogin;