import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {db,auth} from './firebase-config';
import { getDocs,doc,collection,updateDoc } from "firebase/firestore";
import './row.css';
import { async } from "@firebase/util";
const Hod=()=>{
    const collectionref=collection(db,"user");
    const [users,setusers]=useState([]);
    const [department,setdepartment]=useState("");
    const [denialreason,setdenialreason]=useState("");
    var cnt=0;
    useEffect(()=>{
        const getuser=async()=>{
            try{
            const data=await getDocs(collectionref);
            setusers(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
                    
            
            console.log(users);
            }
            catch(err){
                console.log("error:",err);
            }
        }
        getuser();
    },[])
    {console.log(department)}
    const updateyes=async (id,per)=>{
        const userdoc=doc(collectionref,id);
        const change={per_hod:true,
            per_once_hod:true
        };
        updateDoc(userdoc,change);

    }
    const updateno=(id,per)=>{
        const userdoc=doc(collectionref,id);
        const change={per_hod:false
        ,per_once_hod:true
        };
        updateDoc(userdoc,change);
    }
    const updatedecision=async(id,reason)=>{
        const userdoc=doc(db,"user",id);
        const change={denialreason:reason
        
        };
        updateDoc(userdoc,change)
    }
    
return (
    
    <>
    <h1>HOD Page it is</h1>
    <select name="" id="" onChange={(e)=>{setdepartment(e.target.value)}}>
        <option value="">Select Branch</option>
        <option value="CompA">Comp A</option>
        <option value="CompB">Comp B</option>
        <option value="It">It</option>
        <option value="EntcA">EntcA</option>
        <option value="EntcB">EntcB</option>
        <option value="">Mech</option>
    </select>
    <div className="entry">
        <div>Name</div>
        <div>Reason</div>
        <div>Email</div>
        <div>Start date</div>
        <div>ENd date</div>
        <div>class auth </div>
        <div>YEs/No</div>
    </div>
    
    <div>{users.map((users)=>{
        if(users.branch==department){
            if(users.per_class==true && users.per_once_hod==false){

            {cnt++}
            return(
                <div className="block" key={users.id}>
                    <div>{users.name}</div>
                    <div>{users.reason}</div>
                    <div>{users.email}</div>
                    <div>{users.startDate}</div>
                    <div>{users.enddate}</div>    
                    {!users.per_class ? <div className="circle_red"></div> : <div className="circle_green"></div> }
        
                    <button onClick={()=>{updateyes(users.id,users.per_hod)}}>YES</button>
                    <button onClick={()=>{updateno(users.id,users.per_hod)}}>NO</button>
                    <input type="text" placeholder="reason of denial" onChange={(e)=>{setdenialreason(e.target.value)}}/>
                    <button onClick={()=>{updatedecision(users.id,denialreason)}}>OK</button>
                </div>
                
            );
        }
    }
       
    })}</div>
    {(cnt)?<div></div>:<div>Nothing pending</div>}
    </>
);
}
export default Hod;