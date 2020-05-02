import React from "react";

export function List({ children }) {
    return (
      <div className="list-overflow-container search-results" style={{border: '4px solid rgb(14, 243, 174)', borderRadius: '5px'}}>
        <ul className="list-group" >{children}</ul>
      </div>
    );
  };

export function ListItem({ children }) {
  return <li className="list-group-item list-group " style={{borderRadius: '5px', fontFamily: 'Megrim, cursive', fontWeight: 'bold'}}>{children}</li>;
};