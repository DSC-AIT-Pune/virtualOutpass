import React from "react";

    import './Homepage.css';
  import { useEffect,useState } from "react";
    import {getDocs,collection,doc,addDoc,setDoc,getDoc} from 'firebase/firestore';
       import {db,auth} from './firebase-config';
    const Stu=()=>{
      const [req,setreq]=useState({name:"",reason:"",per:false});
      const [name,setname]=useState("");
       const [reason,setreason]=useState("");
       const per=false;
       const department="entc";


       const collectionref=collection(db,"user");
       const docref=doc(db,"user","wipYzeht0YXaog0CWJ5n");



    useEffect(() => {
       const getUser=async()=>{
          try{
            
         const data= await getDoc(doc(collectionref,"WOyc1JfVzUQlt0MwoP9uyTw0lJE3"));
         //setreq(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
         const res=data.data();
         setreq({name:res.name,per:res.per,reason:res.per});
        // setreq({name:res.name,reason:res.reason,per:res.per})
         
         console.log("done");
         console.log(data.data());
          }
          catch(err){
             console.log(err);
            
          }
       }
    
    getUser();
    }, [])
    
    
       
   
    
       const pushdata=async ()=>{
          try{
            
            await setDoc(doc(collectionref,auth.currentUser.uid),{name:name,
               reason:reason,
               per_hod:per,
               department:department,
               per_class:per,
               per_jd:per,
               email:auth.currentUser.email})
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
       
    <h2>This are your requests</h2>
   <h3>{req.name}</h3>
   <h3>{req.reason}</h3>
       
      </>);
    }

export default Stu;