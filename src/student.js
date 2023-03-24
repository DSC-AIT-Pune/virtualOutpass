import React from "react";
import './student.css';
    import './Homepage.css';
  import { useEffect,useState } from "react";
    import {getDocs,collection,doc,addDoc,setDoc,getDoc} from 'firebase/firestore';
       import {db,auth} from './firebase-config';
    const Stu=()=>{
      const [req,setreq]=useState({name:"",
      reason:"",
      per_jd:false,
      per_class:false,
      per_hod:false, 
   });
      const [name,setname]=useState("");
       const [reason,setreason]=useState("");
       const [year,setyear]=useState("");
       const [branch,setbranch]=useState("");
       const per=false;
       
      const [startDate,setstartDate]=useState("");
      const [noDays,setnoDays]=useState("");
       const collectionref=collection(db,"user");




    useEffect(() => {
       const getUser=async()=>{
          try{
            
         const data= await getDoc(doc(collectionref,auth.currentUser.uid));
         //setreq(data.docs.map((docs)=>({...docs.data(),id:docs.id})));
         const res=data.data();
         setreq({...data.data()});
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
               per_class:per,
               per_jd:per,
               email:auth.currentUser.email,
               branch:branch,
               year:year,
               startDate:startDate,
               noDays:noDays   ,
               denialreason:""
            })
     }catch(err){
    console.log(err);
      }
          
       }
       return(
       <>
      
       <h1 className="cen">This is the student page</h1>
       
       <input type="text" placeholder="name" onChange={(event)=>{
    setname(event.target.value);
       }}/>
    
       <input type="text" placeholder="Reason" onChange={(event)=>{
    setreason(event.target.value);
       }}/>
       <select name="" id="" onChange={(e)=>{setyear(e.target.value)}}>
        <option value="">Select Year</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>

        <select name="" id="" onChange={(e)=>{setbranch(e.target.value)}}>
          <option value="">Select Branch</option>
          <option value="CompA">Comp A</option>
          <option value="CompB">Comp B</option>
          <option value="IT">IT</option>
          <option value="EntcA">Entc A</option>
          <option value="EntcB">Entc B</option>
          <option value="Mech">Mech</option>
        </select>
       <h4>Start Date</h4>
        <input type="text" placeholder="dd/mm/yy" onchange={(e)=>{setstartDate(e.target.value)}}/>
        <h4>Total Days</h4>
        <input type="text" placeholder="no. of days" onChange={(e)=>{setnoDays(e.target.value)}}/>
        <button onClick={pushdata}>Create Request</button>
    <h2>This are your requests</h2>
   
    <div className="up">
      <div>Name</div>
      <div>Reason</div>
      <div>Per Class Auth</div>
      <div>Per HOD</div>
      <div>Per JD </div>
    </div>
    {
      req.name ? <div className="status"> 
      <h3>{req.name}</h3>
    <h3>{req.reason}</h3>
        {!req.per_class ? <h4>No</h4>: <h4>Yes</h4> }
       { !req.per_hod ? <h4>No</h4>: <h4>Yes</h4> }
       { !req.per_jd ? <h4>{req.denialreason}</h4>: <h4>Yes</h4> }
      
        </div>: <h4>NO Applictaion under view</h4>
    }
    
 
      </>);
    }

export default Stu;