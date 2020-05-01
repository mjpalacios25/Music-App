import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import {Nav} from './components/NavBar';
import {List, ListItem} from './components/List';
import {Input, SubmitBtn, SelectDrop, SelectItem} from "./components/Form"
import API from "./utils/API";


var request = require('request'); // "Request" library

function App() {
  const [userState, setUser] = useState({});
  const [resultState, setResults] = useState([]);
  const [artistState, setArtist] = useState();
  const [songState, setSong] = useState([]);
  const [playlistState, setPlaylist] = useState({});
  const searchUrl = "https://api.spotify.com/v1/search?q="

  useEffect(() => {
    loadusers();
    
  }, []);

  function loadusers() {
    
    const id = "5ea8c3eebb48ce2f46ef9806";
    API.getSingleUser(id)
      .then(res => {
        console.log({res});
        setUser(res.data);
      })
      .catch(err => console.log(err))
  };
  
  function createPlaylist(event){
    event.preventDefault();
    
    //create and retrieve playlists
    const id = "5ea8c3eebb48ce2f46ef9806";

    console.log(playlistState)

    API.createPlaylist(id, playlistState)
      .then( res => {
        console.log(res.data);
        setUser(res.data);
        loadusers();

      })
  };

  function deletePlaylist(event, id){
    event.preventDefault()
    //delete and retrieve playlists

    console.log(id)

    API.removePlaylist(id, playlistState)
      .then( res => {
        console.log(res.data);
        setUser(res.data);
        loadusers();

      })
  };

  function addToPlaylist(event,results){
    event.preventDefault();
    console.log({results}, event.target.value);
    
    const {id, name, artists:[ {name: artistname} ]} = results;

    const song = {
      songID: id,
      name: name,
      artist: artistname
    };

    console.log(song)

    API.updatePlaylist(event.target.value, song)
      .then( res => {
        console.log(res.data);
        setUser(res.data);
        loadusers();

      })
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setArtist({...artistState, [name]: value});
    console.log(artistState)
  };

  function handlePlaylistChange(event) {
    const { name, value } = event.target;
    setPlaylist({...playlistState, name: value});
    console.log(name, value)
  };

  //function to load artist, album, or track
  function loadartist(event, typeSearch) {
    event.preventDefault();
    let client_id = '9b0a14a74c624641947e67fd2eaafbf6', // Your client id
     client_secret = '6f975753ea5a46708e876e54750806c7'; // Your secret

    let artist = artistState.artistsearch ,
      type = "&type=" + typeSearch,
      compiledUrl = `${searchUrl}${artist}${type}&limit=5`;

    console.log(compiledUrl)

    // your application requests authorization
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: compiledUrl,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function (error, response, body) {
          //add if statment for artist, songs, albums
          if(typeSearch === "artist") {
            console.log(body.artists.items);
            setResults(body.artists.items);
          };
          
          if(typeSearch === "album") {
            console.log(body);
            setResults(body.albums.items);
          };

          if(typeSearch === "track") {
            console.log(body);
            setSong(body.tracks.items);
          };
          
        });
      }
    });
        
  };



  return (
    <div >
      <Nav />

      <List>
          
            <ListItem key={userState._id}>
              <p>{userState.username}</p>
            </ListItem>
         
      </List>

      <form className="form-inline">

      <Input 
      label = "Create a Playlist"
      onChange = {handlePlaylistChange}
      name = "playlistname"
      
      />
      <SubmitBtn onClick={ (event) => createPlaylist(event)} > Create Playlist </SubmitBtn>
      </form>
      {userState.playlists  ? (
        <List>
          {userState.playlists.map(user => (
            <ListItem key={user._id}>
              <p>{user.name}</p>
              {user.songs ? ( 
              <ul> {user.songs.map(songs => (
                <li> Title:{songs.name}, Id: {songs.songID} </li>
              ))} </ul> ) : 
              (" ") }
              <SubmitBtn onClick={ (event) => deletePlaylist(event, user._id)}>Delete Playlist</SubmitBtn>
            </ListItem>
          ))}
        </List>
      ) : (
        <h2>No playlists</h2>
      ) }
    
      {/* {userState.length ? (
        <MusicCard>
          {userState.map(user => (
            <Song key={user._id}>
              <p>{user.username}</p>
            </Song>
          ))}
        </MusicCard>
      ) : (
        <h2>No Users</h2>
      ) } */}
      <form className="form-inline">

      <Input 
      label = "Search for Artists"
      onChange = {handleInputChange}
      name = "artistsearch"
      
      />
      <SubmitBtn onClick={ (event) => loadartist(event, "artist")} > Submit </SubmitBtn>

      <Input 
      label = "Search for Albums"
      onChange = {handleInputChange}
      name = "artistsearch"
      
      />
      <SubmitBtn onClick={(event) => loadartist(event, "album")} > Submit </SubmitBtn>

      <Input 
      label = "Search for Songs"
      onChange = {handleInputChange}
      name = "artistsearch"
      
      />
      <SubmitBtn onClick={(event) => loadartist(event, "track")} > Submit </SubmitBtn>
      
      </form>
      {resultState.length ? (
        <List>
          {resultState.map(results => (
            <ListItem key={results.id}>
              <img 
              src = {results.images.length ? (results.images[0].url) : (" ")}
              style={{ width: "200px", margin: "0 auto" }}
              />
              <p> {results.name} </p>
              <SubmitBtn>Add to Playlist</SubmitBtn>
            </ListItem>
          ))}
        </List>
      ) : (" ")}



      {songState.length ? (
        <List>
          {songState.map(results => (
            <ListItem key={results.id}>
              <p> Song: {results.name} </p>
              <p> Artist: {results.artists[0].name} </p>
              {userState.playlists ? (
              <SelectDrop onChange={(event) => addToPlaylist(event,results)} >
                {userState.playlists.map(playlist => (
                  <SelectItem key={playlist._id} value={playlist._id} > {playlist.name} </SelectItem>
                ))}
                
              </SelectDrop>) : ( " " )}
              
            </ListItem>
          ))}
        </List>
      ) : (" ")}
      
    </div>
  );
}

export default App;
