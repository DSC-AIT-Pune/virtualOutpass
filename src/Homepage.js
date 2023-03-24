import React from "react";
import Card from "./Card";
const Homepage=()=>{
   return (
      <>
      <h1>This is homepage</h1>
   <Card linkname="Login" heading="Student Login and Registeration " link="login"/>
   <Card linkname="Login" heading="Hod Login" link="hodlogin"/>
   <Card linkname="Login" heading="Authority Login" link="authlogin"/>
   <Card linkname="Login" heading="ClassAuthority" link="classlogin"/>
      </>
      
   );
}
export default Homepage;