import React from "react";



export function SubmitBtn(props) {
    return(
        <button {...props} type="submit" className="btn btn-primary mb-3 mx-2 float-right"> {props.children} </button>
    )
};



