import React from "react";
import { useEffect,useState } from "react";
import {db} from './firebase-config';
import {getDocs,collection,doc,addDoc,updateDoc} from 'firebase/firestore';
import './Authority.css'
const Authority=()=>{
    const collectionref=collection(db,"user");
       const docref=doc(db,"user","wipYzeht0YXaog0CWJ5n");
       const [req,setreq]=useState([]);
       const updatedecyes=async(id,per)=>{
        const userdoc=doc(db,"user",id);
        const changed={per:true}
        updateDoc(userdoc,changed)
            console.log("called update");
       }
       const updatedecno=async(id,per)=>{
        const userdoc=doc(db,"user",id);
        const changed={per:false}
        updateDoc(userdoc,changed);
       }
    useEffect(() => {
       const getUser=async()=>{
          try{
            
         const data= await getDocs(collectionref);
         
         setreq(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
         console.log("dom");
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
        <div>YEs/No</div>
    </h2>
 
<h2>{
req.map((req)=>{
    return(
        <div className="entry">
            <div>{req.name}</div>
            <div>{req.reason}</div>
            <button onClick={()=>{updatedecyes(req.id,req.per)}}>Do Yes</button>
            <button onClick={()=>{updatedecno(req.id,req.per)}}>Do No</button>
        </div>
        
    );
})}</h2>
    </>

);
}
export default Authority;