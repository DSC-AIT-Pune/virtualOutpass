import React from "react";
import { useEffect,useState } from "react";
import {db} from './firebase-config';
import {getDoc,collection,doc,addDoc} from 'firebase/firestore';
const Authority=()=>{
    const collectionref=collection(db,"user");
       const docref=doc(db,"user","wipYzeht0YXaog0CWJ5n");
    useEffect(() => {
       const getUser=async()=>{
          try{
            
         const data= getDoc(docref);
         
         console.log(data);
          }
          catch(err){
             console.log(err);
            
          }
       }
    
    getUser();
    }, [])
return(
<h1>This is authority page .</h1>

);
}
export default Authority;