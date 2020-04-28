import React, { useState, useEffect } from 'react';
import {Nav} from './components/NavBar';
import {MusicCard, Song} from './components/List';
import {Input, SubmitBtn} from "./components/Form"
import API from "./utils/API";
import axios from "axios";

var request = require('request'); // "Request" library

function App() {
  const [userState, setUser] = useState({});
  const [resultState, setResults] = useState([]);
  const [artistState, setArtist] = useState();
  const [playlistState, setPlaylist] = useState([]);
  const searchUrl = "https://api.spotify.com/v1/search?q="

  useEffect(() => {
    loadusers();
    
  }, []);

  function loadusers() {
    const id = "5e9a5d15d80a121abe1782cb";
    API.getSingleUser(id)
      .then(res => {
        console.log({res});
        setUser(res.data);
      })
      .catch(err => console.log(err))
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setArtist({...artistState, [name]: value});
    console.log(artistState)
  };

  function handlePlaylistChange(event) {
    const { name, value } = event.target;
    setPlaylist({...playlistState, [name]: value});
    console.log(playlistState)
  };

  //function to load artist, album, or track
  function loadartist(event, typeSearch) {
    event.preventDefault();
    let client_id = '9b0a14a74c624641947e67fd2eaafbf6', // Your client id
     client_secret = '6f975753ea5a46708e876e54750806c7'; // Your secret

    let artist = artistState.artistsearch ,
      type = "&type=" + typeSearch,
      compiledUrl = searchUrl + artist + type;

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
            console.log(body);
            setResults(body.artists.items);
          };
          
          if(typeSearch === "album") {
            console.log(body);
            setResults(body.albums.items);
          };

          if(typeSearch === "track") {
            console.log(body);
            setResults(body.tracks.items);
          };
          
        });
      }
    });
        
  };

  function loadPlaylists(){

  };

  return (
    <div >
      
      <Nav />

      <MusicCard>
          
            <Song key={userState._id}>
              <p>{userState.username}</p>
            </Song>
         
      </MusicCard>

      <form className="form-inline">

      <Input 
      label = "Create a Playlist"
      onChange = {handlePlaylistChange}
      name = "playlistcreate"
      
      />
      <SubmitBtn onClick={ (event) => loadPlaylists(event)} > Create Playlist </SubmitBtn>
      </form>
      {playlistState.length ? (
        <MusicCard>
          {playlistState.map(playlists => (
            <Song key={playlists._id}>
              <p>{playlists.playlistname}</p>
            </Song>
          ))}
        </MusicCard>
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
        <MusicCard>
          {resultState.map(results => (
            <Song key={results._id}>
              <p> {results.name} </p>
              <SubmitBtn>Add to Playlist</SubmitBtn>
            </Song>
          ))}
        </MusicCard>
      ) : (" ")}
      
    </div>
  );
}

export default App;
