import { collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {db,auth} from './firebase-config';
 const Gate = () => {
  const [reg,setreg]=useState("");
  const [req,setreq]=useState([]);
  const collectionref=collection(db,"user");
  useEffect(()=>{
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
  },[])
  return (
    <>
       <div>Gate Side</div>
       <input type="text" placeholder='Enter the registeration number'onChange={(e)=>{setreg(e.target.value)}}/>
    </>
 
    
  ) 
}
export default Gate;
