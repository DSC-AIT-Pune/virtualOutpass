import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {db,auth} from './firebase-config';
import { getDocs,doc,collection,updateDoc } from "firebase/firestore";
import './row.css';
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
    const [year,setyear]=useState("");
    const [batch,setbatch]=useState("");
    
return (
    
    <>
    <h1>ClassAuth Page it is</h1>
    <input type="text" placeholder="year" onChange={(event)=>{setyear(event.target.value)}}/>
    <input type="text" placeholder="batch" onChange={(event)=>{setbatch(event.target.value)}}/>
   
    {console.log(batch)}
    <h2 className="entry">
        <div>Name</div>
        <div>Reason</div>
        <div>YEs/No</div>
    </h2>
    <div>{users.map((users)=>{
        if(users.year==year && users.batch==batch){
            return(
           
                <div className="block" key={users.id}>
                    <h2>{users.name}</h2>
                    <h2>{users.reason}</h2>
                    <button onClick={()=>{updateyes(users.id,users.per_class)}}>Yes</button>
                    <button onClick={()=>{updateno(users.id,users.per_class)}}>No</button>
                </div>
                
            );
        }
        
    })}</div>
    </>
);
}
export default ClassAuth;