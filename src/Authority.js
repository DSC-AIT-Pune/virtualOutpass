import React from "react";
import { useEffect,useState } from "react";
import {db} from './firebase-config';
import {getDocs,collection,doc,addDoc,updateDoc} from 'firebase/firestore';
import './Authority.css'
import './row.css';
const Authority=()=>{
    const collectionref=collection(db,"user");
      const [denialreason,setdenialreason]=useState("");
       const [req,setreq]=useState([]);
     var cnt=0;
       const updatedecyes=async(id,per)=>{
        const userdoc=doc(db,"user",id);
        const changed={per_jd:true,
            per_once_jd:true,
            final_per:true
        }
        updateDoc(userdoc,changed)
            console.log("called update");
       }
       const updatedecno=async(id,per)=>{
        const userdoc=doc(db,"user",id);
        const changed={per_jd:false,
            per_once_jd:true
        }
        updateDoc(userdoc,changed);
       }
      const updatereason=async(id,reason)=>{
        const user=doc(db,"user",id);
        const changed={denialreason:denialreason
      
        };
        updateDoc(user,changed);
      }

    useEffect(() => {
       const getUser=async()=>{
          try{
            
         const data= await getDocs(collectionref);
         setreq(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
     
          }
          catch(err){
             console.log(err);
             console.log("eror");
          }
       }
    
    getUser();
    }, [])
return(
    <>
    
    <h1>This is authority page .</h1>
    <h2 className="entry">
        <div>Name</div>
        <div>Reason</div>
        <div>email</div>
        <div>Start date</div>
        <div>End Date</div>
        <div>class Auth decision</div>
        <div>hod decision</div>
        <div>Yes/No</div>
        
    </h2>
 
<div>{
req.map((req)=>{
    if(req.per_hod==true && req.per_once_jd==false){
        {cnt++}
    return(
        <div className="block" key={req.id}>
            <div>{req.name}</div>
            <div>{req.reason}</div>
            <div>{req.email}</div>
            <div>{req.startDate}</div>
            <div>{req.enddate}</div>    
            {!req.per_class ? <div className="circle_red"></div> : <div className="circle_green"></div> }
            {!req.per_hod ? <div className="circle_red"></div> : <div className="circle_green"></div> }
            <button onClick={()=>{updatedecyes(req.id,req.per_jd)}}>Do Yes</button>
            <button onClick={()=>{updatedecno(req.id,req.per_jd)}}>Do No</button>
            <input type="text" placeholder="reason of denial" onChange={(e)=>{setdenialreason(e.target.value)}}/>
            <button onClick={()=>{updatereason(req.id,req.denialreason)}}>ok</button>
        </div>
        
    );
    }
})}</div>
{(cnt)?<div></div>:<div>Nothing Pending</div>}
    </>

);
}
export default Authority;