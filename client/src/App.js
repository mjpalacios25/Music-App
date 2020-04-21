import React, { useState, useEffect } from 'react';
import {Nav} from './components/NavBar';
import {MusicCard, Song} from './components/List';
import {Input, SubmitBtn} from "./components/Form"
import API from "./utils/API";
import axios from "axios";

var request = require('request'); // "Request" library

function App() {
  const [userState, setUser] = useState([]);
  const [resultState, setResults] = useState([]);
  const [artistState, setArtist] = useState();
  const searchUrl = "https://api.spotify.com/v1/search?q="

  useEffect(() => {
    loadusers();
    
  }, []);

  function loadusers() {
    API.getUsers()
      .then(res => {
        console.log(res);
        setUser(res.data)
      })
      .catch(err => console.log(err))
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setArtist({...artistState, [name]: value});
    console.log(artistState)
  };

  //function to load artist
  function loadartist(event) {
    event.preventDefault();
    let client_id = '9b0a14a74c624641947e67fd2eaafbf6', // Your client id
     client_secret = '6f975753ea5a46708e876e54750806c7'; // Your secret

    let artist = artistState.artistsearch ,
      type = "&type=artist",
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
          console.log(body);
          setResults(body.artists.items);
          
        });
      }
    });
        
  };

  return (
    <div >
      
      <Nav />
    
      {userState.length ? (
        <MusicCard>
          {userState.map(user => (
            <Song key={user._id}>
              <p>{user.username}</p>
            </Song>
          ))}
        </MusicCard>
      ) : (
        <h2>No Users</h2>
      ) }
      <form className="form-inline">
      <Input 
      label = "Search for Artists"
      //describeby = "artisthelp"
      //description = "Search for artist or band"
      onChange = {handleInputChange}
      name = "artistsearch"
      
      />
      <SubmitBtn onClick={loadartist} > Submit </SubmitBtn>
      </form>
      {resultState.length ? (
        <MusicCard>
          {resultState.map(results => (
            <Song key={results._id}>
              <p> {results.name} </p>
            </Song>
          ))}
        </MusicCard>
      ) : (" ")}
      
    </div>
  );
}

export default App;
