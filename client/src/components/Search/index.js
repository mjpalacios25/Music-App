import React, { useState, useEffect } from 'react';
import {List, ListItem} from '../List';
import {Input, SubmitBtn, SelectDrop, SelectItem} from "../Form"
import API from "../../utils/API";

var request = require('request'); // "Request" library

function Search(props) {
  const [userState, setUser] = useState({}); //a user's information is stored here
  const [searchState, setSearch] = useState(); // terms to search for are stored here
  const [resultState, setResults] = useState([]); //used for artist and album search results
  const [songState, setSong] = useState([]); //used for song search results
  const searchUrl = "https://api.spotify.com/v1/search?q="

  useEffect(() => {
    loadusers(props.id);
    
  }, []);

  function loadusers(id) {
    
    //const id = "5ea8c3eebb48ce2f46ef9806"; //user id goes here
    API.getSingleUser(id)
      .then(res => {
        console.log({res});
        setUser(res.data);
      })
      .catch(err => console.log(err))
  };
  //adds songs to selected playlist
  function addToPlaylist(event,results){
    event.preventDefault();
    console.log({results}, event.target.value);
    
    const {id, name, artists:[ {name: artistname} ]} = results;

    const song = {
      songID: id,
      name: name,
      artist: artistname
    };

//as you type into the text box, this updates the artistState
  function handleInputChange(event) {
    const { name, value } = event.target;
    setSearch({...searchState, [name]: value});
    console.log(searchState)
  };

 
  //function to load artist, album, or track. the typeSearch argument is a string of either
  // "artist", "album", or "track" to search by. Limits incoming results to 5
  
  function loadartist(event, typeSearch) {
    event.preventDefault();
    let client_id = '9b0a14a74c624641947e67fd2eaafbf6', // Your client id
     client_secret = '6f975753ea5a46708e876e54750806c7'; // Your secret

    let searchQuery = searchState.searchTerms ,
      type = "&type=" + typeSearch,
      compiledUrl = `${searchUrl}${searchQuery}${type}&limit=5`;

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
          //add if statment for artist, songs, albums. Sets the results state to whatever comes back from Stotify
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
      {/* text boxes to search by artists, alumbs, and songs. the onchage function updates the
      search state as you type */}
      <form className="form-inline">

      <Input 
      label = "Search for Artists"
      onChange = {handleInputChange}
      name = "searchTerms"
      />

      <SubmitBtn onClick={ (event) => loadartist(event, "artist")} > Submit </SubmitBtn>

      <Input 
      label = "Search for Albums"
      onChange = {handleInputChange}
      name = "searchTerms"
      />

      <SubmitBtn onClick={(event) => loadartist(event, "album")} > Submit </SubmitBtn>

      <Input 
      label = "Search for Songs"
      onChange = {handleInputChange}
      name = "searchTerms"
      />

      <SubmitBtn onClick={(event) => loadartist(event, "track")} > Submit </SubmitBtn>
      {/* artists and alumbs have photos while many songs do not. That is why they are separated here 
      into two lists. These map over the results from Spotify. Displays nothing if there are results */}
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
};

export default Search;
