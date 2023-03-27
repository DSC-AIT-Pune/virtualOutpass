import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {db,auth} from './firebase-config';
import { getDocs,doc,collection,updateDoc } from "firebase/firestore";
import './row.css';
const ClassAuth=()=>{
    const collectionref=collection(db,"user");
    const [users,setusers]=useState([]);
    var cnt=0;
    const [denialreason,setdenialreason]=useState("");
    const [department,setdepartment]=useState("");
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
        const change={per_class:true,
        per_once_class:true
        };
        updateDoc(userdoc,change);
       
    }
    const updateno=(id,per)=>{
        const userdoc=doc(collectionref,id);
        const change={per_class:false,
        per_once_class:true
        };
        updateDoc(userdoc,change);
    }
    const updatedecision=async(id,reason)=>{
        const userdoc=doc(db,"user",id);
        const change={denialreason:reason};
        updateDoc(userdoc,change)
    }
    const [year,setyear]=useState("");
    
    
return (
    
    <>
    <h1>ClassAuth Page it is</h1>
    <select name="" id="" onChange={(e)=>{setyear(e.target.value)}}>
        <option value="">Select Branch</option>
        <option value="FE">FE</option>
        <option value="SE">SE</option>
        <option value="TE">TE</option>
        <option value="BE">BE</option>
    </select>

    <select name="" id="" onChange={(e)=>{setdepartment(e.target.value)}}>
        <option value="">Select Branch</option>
        <option value="CompA">Comp A</option>
        <option value="CompB">Comp B</option>
        <option value="It">It</option>
        <option value="EntcA">EntcA</option>
        <option value="EntcB">EntcB</option>
        <option value="">Mech</option>
    </select>
 
    {/* {console.log(batch)} */}
    <h2 className="entry">
        <div>Name</div>
        <div>Reason</div>
        <div>Start Date</div>
        <div>End Date</div>
        <div>YEs/No</div>
        
    </h2>
    <div>{users.map((users)=>{
        if((users.year==year && users.branch==department) && users.per_once_class==false){
            {cnt++}
            return(
            
                <div className="block" key={users.id}>
                    <div>{users.name}</div>
                    <div>{users.reason}</div>
                    <div>{users.startDate}</div>
                    <div>{users.enddate}</div>    
                    <button onClick={()=>{updateyes(users.id,users.per_class)}}>Yes</button>
                    <button onClick={()=>{updateno(users.id,users.per_class)}}>No</button>
                    <input type="text" placeholder="denial reason" onChange={(e)=>{setdenialreason(e.target.value)}}/>
    <button onClick={()=>{updatedecision(users.id,denialreason)}}>OK</button>
                </div>
                
            );
        }
        
    })}</div>
    {(cnt)?<div></div>:<div>Nothing pending </div>}
    </>
);
}
export default ClassAuth;