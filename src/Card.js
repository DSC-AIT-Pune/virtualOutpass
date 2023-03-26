import React from "react";
import {Link} from "react-router-dom";
const Card=(props)=>{
    return (
        <>
        <div className="card">
            <div className="heding">{props.heading}</div>
            <Link to={`/${props.link}`}>{props.linkname}</Link>
        </div>
        </>
    );
}
export default Card;