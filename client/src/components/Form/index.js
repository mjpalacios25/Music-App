import React from "react";

export function Input(props) {
    return(
        <div className="form-group mb-3 input-marg">
            <label className="mx-2" > {props.label} </label>
            <input {...props} type="text" className="form-control" aria-describedby={props.describeby} ></input>
            {/* <small id={props.describeby}> {props.description} </small> */}
        </div>
    )
};

export function SubmitBtn(props) {
    return(
        <button {...props} type="submit" className="btn btn-primary mb-3 mx-2 float-right userButton"> {props.children} </button>
    )
};

export function SelectDrop(props){
    return (
        <select defaultValue="1" className="custom-select custom-select-lg mb-3" {...props}>
            <option disabled value="1">{props.defaulttext}</option>
            {props.children}
        </select>
    )
};

export function SelectItem(props){
    return (
        <option value={props.value} {...props}>
            {props.children}
        </option>
    )
};