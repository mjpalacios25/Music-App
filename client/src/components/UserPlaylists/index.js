import React, { useState, useEffect } from 'react';
import {List, ListItem} from '../List';
import {Input, SubmitBtn, SelectDrop, SelectItem} from "../Form"
import API from "../../utils/API";


function Playlists(props) {
  const [userState, setUser] = useState({});
  const [playlistState, setPlaylist] = useState({});
  const [songState, setSong] = useState([]);
  const updateUser = props._id

  // this.handleSong = this.handleSong.bind(this)
  useEffect(() => {
    loadusers(props._id);
    
  }, []);
//On click of an element in the song list will make the songLink update on the profile page which in turn will be passed to the wavesurfer component
  // function handleSong(event, songLink) {
  //   event.preventDefault()
  //   this.props.updateSong({
  //     songLink: songLink
  //   })
  // }

  function loadusers(id) {
    console.log(id)
    // const id = "5ea8c3eebb48ce2f46ef9806"; //user id goes here
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
    const id = updateUser; //user id goes here

    console.log(playlistState, id)

    API.createPlaylist(id, playlistState)
      .then( res => {
        console.log(res.data);
        setUser(res.data);
        loadusers(props._id);

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

  function seeSongs(event){
    event.preventDefault()
    console.log(event.target.value);
    const id = event.target.value;
    const targetPlaylist = userState.playlists.filter(songs => songs._id === id);
    console.log(targetPlaylist)
    setSong(targetPlaylist)
    
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
        <div className="row">
          <div className="col-md-5 mx-auto ">
        {userState.playlists ? (
          <SelectDrop defaulttext="Select Playlist" onChange={(event) => seeSongs(event)}>
            {userState.playlists.map(playlist => (
              <SelectItem key={playlist._id} value={playlist._id} >
                {playlist.name}
              </SelectItem>
            ))}
          </SelectDrop>
        ) : (
            <h1>No playlists</h1>
          )}
        </div>
        </div>
        
{/* <SubmitBtn onClick={(event) => deletePlaylist(event, user._id)}>Delete Playlist</SubmitBtn> */}
        <div className="row">
          <div className="col-md-6 mx-auto ">
          {songState ? (
          <List>
            {songState.map(user => (
              <ListItem key={user._id}>
                {user.songs ? (
                  <ul> {user.songs.map(songs => (
                    <li> {songs.name} </li>
                  ))} </ul>) :
                  (" ")}
              </ListItem>
            ))}
          </List>
        ) : (
            <h2>No playlists</h2>
          )}
          </div>

        </div>
     
      
    </div>
  );
}

export default Playlists;
