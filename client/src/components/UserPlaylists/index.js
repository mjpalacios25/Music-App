import React, { useState, useEffect } from 'react';
import {List, ListItem} from './components/List';
import {Input, SubmitBtn, SelectDrop, SelectItem} from "./components/Form"
import API from "../../utils/API";


var request = require('request'); // "Request" library

function Playlists() {
  const [userState, setUser] = useState({});
  const [playlistState, setPlaylist] = useState({});

  useEffect(() => {
    loadusers();
    
  }, []);

  function loadusers() {
    
    const id = "5ea8c3eebb48ce2f46ef9806"; //user id goes here
    API.getSingleUser(id)
      .then(res => {
        console.log({res});
        setUser(res.data);
      })
      .catch(err => console.log(err))
  };

//create and retrieve playlists
  function createPlaylist(event){
    event.preventDefault();
    const id = "5ea8c3eebb48ce2f46ef9806"; //user id goes here

    console.log(playlistState)

    API.createPlaylist(id, playlistState)
      .then( res => {
        console.log(res.data);
        setUser(res.data);
        loadusers();

      })
  };
//delete and retrieve playlists
  function deletePlaylist(event, id){
    event.preventDefault()
    console.log(id) //user id 

    API.removePlaylist(id, playlistState)
      .then( res => {
        console.log(res.data);
        setUser(res.data);
        loadusers();

      })
  };

// as you type into the text box, this updates the playlist state
  function handlePlaylistChange(event) {
    const { name, value } = event.target;
    setPlaylist({...playlistState, name: value});
    console.log(name, value)
  };

  return (
    <div >
        {/* input field to create a playlist. the submit button takes the playlist info,
        creates the new playlist on the server, returns an object, then reloads the user's info */}
      <form className="form-inline">
        <Input 
        label = "Create a Playlist"
        onChange = {handlePlaylistChange}
        name = "playlistname"
        />
        <SubmitBtn onClick={ (event) => createPlaylist(event)} > Create Playlist </SubmitBtn>
      </form>

        {/* looks at the users info, then maps over each playlist to list the playlist name and songs.
        there's also a delete button for deleting a playlist */}
      {userState.playlists  ? (
        <List>
          {userState.playlists.map(user => (
            <ListItem key={user._id}>
              <p>{user.name}</p>
              {user.songs ? ( 
              <ul> {user.songs.map(songs => (
                <li> {songs.name} </li>
              ))} </ul> ) : 
              (" ") }
              <SubmitBtn onClick={ (event) => deletePlaylist(event, user._id)}>Delete Playlist</SubmitBtn>
            </ListItem>
          ))}
        </List>
      ) : (
        <h2>No playlists</h2>
      ) }
      
    </div>
  );
}

export default Playlists;
