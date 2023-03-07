import React from "react";

    import './Homepage.css';
  import { useEffect,useState } from "react";
    import {getDoc,collection,doc,addDoc} from 'firebase/firestore';
    import {db} from './firebase-config';
    const Stu=()=>{
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
    
    
       const [name,setname]=useState("");
       const [reason,setreason]=useState("");
    
    
       const pushdata=async ()=>{
          try{
             await addDoc(collectionref,{name:name,reason:reason});
     }catch(err){
    console.log(err);
      }
          
       }
       return(
       <>
      
       <h1 className="cen">This is the student page</h1>
       <button onClick={pushdata}>Create Request</button>
       <input type="text" placeholder="name" onChange={(event)=>{
    setname(event.target.value);
       }}/>
    
       <input type="text" placeholder="Reason" onChange={(event)=>{
    setreason(event.target.value);
       }}/>
       
    
       </>
       );
    }

export default Stu;