import React from "react";
import './student.css';
 import './Homepage.css';
import { useEffect,useState } from "react";
import {getDocs,collection,doc,addDoc,setDoc,getDoc, updateDoc} from 'firebase/firestore';
import {db,auth,storage} from './firebase-config';
import {ref, uploadBytes} from 'firebase/storage';
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
       const [enddate,setenddate]=useState("");
       const [startDate,setstartDate]=useState("");
       const collectionref=collection(db,"user");
      const [Image,setImage]=useState(null);

const uploadImage=async()=>{
   
   if(Image==null){
      return ;
   }else{
         const imageref=ref(storage,auth.currentUser.uid);
         uploadBytes(imageref,Image).then(()=>{
            alert('uploaded');
         });
   }

}


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
            
            const user=doc(collectionref,auth.currentUser.uid);
            
           const change= {
            name:name,
               reason:reason,
               per_hod:per,
               per_class:per,
               per_jd:per,
               email:auth.currentUser.email,
               branch:branch,
               year:year,
               startDate:startDate,
               denialreason:"",
               enddate:enddate,
               
            }
            updateDoc(user,change)
     }catch(err){
    console.log(err);
      }
          
       }


       return(
       <>
    
      
       <h1 className="cen">This is the student page</h1>
       <h4>Welcome {req.name}</h4>
       <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>
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
        <input type="date" onChange={(e)=>{setstartDate(e.target.value)}}/>
     <h4>End Date</h4>
       <input type="date" onChange={(e)=>{setenddate(e.target.value)}}/>
   
        <button onClick={pushdata}>Create Request</button>
    <h2>This are your requests</h2>
   
   
    {
     !( (req.per_once_class && req.per_once_hod) && req.per_jd )? <div className="status"> 
      <h3 >Name : {req.name}</h3>
    
    <h3>Reason :{req.reason}</h3>
    {req.per_once_class ? <h4>

      {!req.per_class ? <h4> Permission from Class Authority : No ,reason : {req.denialreason}</h4>: <h4>Permission from Class Authority: Yes
{req.per_once_hod ? <h4>

   { !req.per_hod ? <h4>Permision form HOD sir: No ,Reason : {req.denialreason}</h4>: <h4>Permission from HOD: Yes
{req.per_once_jd ? <h4>
   { !req.per_jd ? <h4>Permision form JD sir : No ,Reason : {req.denialreason}</h4>: <h4>Permission from JD : Yes</h4> }
</h4>:<h4>Not seen by JD sir</h4>}


</h4> }
</h4>:<h4>Not seen by HOD </h4>}



</h4> }
    </h4> : <h4>Not seen yet by class authority .</h4>}
       

      
      
        </div>: <h4>NO Applictaion under view</h4>
    }
    
 
      </>);
    }

export default Stu;