import React from "react";

export function Input(props) {
    return(
        <div className="form-group mb-3">
            <label className="mx-2" > {props.label} </label>
            <input {...props} type="text" className="form-control" aria-describedby={props.describeby} ></input>
            {/* <small id={props.describeby}> {props.description} </small> */}
        </div>
    )
};

export function SubmitBtn(props) {
    return(
        <button {...props} type="submit" className="btn btn-primary mb-3 mx-2"> {props.children} </button>
    )
}