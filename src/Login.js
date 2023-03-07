import { useState } from "react";
import Stu from './student'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./Login.css";
import { auth } from "./firebase-config";
import { useNavigate } from "react-router-dom";
import Homepage from "./Homepage";

const Login=({setIsAuth,setcurruser}) =>{
  var err=false;
  
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message,setmessage]=useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
const navigate=useNavigate();
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      
      console.log(user);
    
    } catch (error) {
  
      console.log(error.message);
      
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setIsAuth(true);
      setcurruser(loginEmail);
      
  navigate("/stu")
    } catch (error) {
      err=true;
      console.log(error.message);
      console.log(err);
      setmessage(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="form">
    <div className="x">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div className="y">
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    
     <div>{message}</div>
    </div>
    </div>
  );

  }

export default Login;