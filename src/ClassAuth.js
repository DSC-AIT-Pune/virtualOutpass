import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {db,auth} from './firebase-config';
import { getDocs,doc,collection,updateDoc } from "firebase/firestore";
const ClassAuth=()=>{
    const collectionref=collection(db,"user");
    const [users,setusers]=useState([]);
    useEffect(()=>{
        const getuser=async()=>{
            try{
            const data=await getDocs(collectionref);
            setusers(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
                    
            console.log("done");
            console.log(users);
            }
            catch(err){
                console.log("error:",err);
            }
        }
        getuser();
    },[])
    const updateyes=async (id,per)=>{
        const userdoc=doc(collectionref,id);
        const change={per_class:true};
        updateDoc(userdoc,change);

    }
    const updateno=(id,per)=>{
        const userdoc=doc(collectionref,id);
        const change={per_class:false};
        updateDoc(userdoc,change);
    }
return (
    
    <>
    <h1>ClassAuth Page it is</h1>
    <h1>{users.map((users)=>{
        return(
            <div className="block" key={users.id}>
                <h2>{users.name}</h2>
                <h2>{users.reason}</h2>
                <button onClick={()=>{updateyes(users.id,users.per_class)}}>YES</button>
                <button onClick={()=>{updateno(users.id,users.per_class)}}>NO</button>
            </div>
            
        );
    })}</h1>
    </>
);
}
export default ClassAuth;