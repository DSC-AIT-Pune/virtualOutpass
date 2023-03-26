import { collection ,getDocs} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {db,auth,storage} from './firebase-config';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
 const Gate = () => {
  const [reg,setreg]=useState("");
  const [req,setreq]=useState([]);
  const collectionref=collection(db,"user");
const datecheck=(s1,s2)=>{
  const arr1=s1.split("-");
  const arr2=s2.split("-")
  for (let i = 0; i < arr1.length; i++) {
    if(arr1[i]>arr2[i]){
      return false;
    }
  }
  return true;
}
var urrl="";
const showimage=async(id)=>{
 const imageref=ref(storage,id);
 getDownloadURL(imageref)
  .then((url) => {
    
urrl=url

console.log("done",urrl);
  }).catch((err)=>{console.log(err)})
}

var today=new Date();
var year=String(today.getFullYear());
var mon=String(today.getMonth());
var date=String(today.getDate());
today=year+"-"+mon+"-"+date;
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
showimage("WOyc1JfVzUQlt0MwoP9uyTw0lJE3");
  },[])


  return (
    <>
       <div>Gate Side</div>
       <input type="text" placeholder='registeration number'onChange={(e)=>{setreg(e.target.value)}}/>
       
       <div>
        {req.map((req)=>{
            if(req.regno==reg){
              return(
                <div key={req.id}>
                <div >Name : {req.name}</div>
                <div>Arrived late or not :</div>
             {datecheck(req.enddate,today)?<div style={{color:"red"}}>late comer</div>: <div style={{color:"green"}}>On time </div>}
          
                </div>
                
              );
             
            }
        })}

       </div>
       {/* {   <img src={`${urrl}`} alt="acha" />} */}
    </>
 
    
  ) 
}
export default Gate;
