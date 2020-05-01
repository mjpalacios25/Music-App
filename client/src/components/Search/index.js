import React, { useState, useEffect } from 'react';

import {List, ListItem} from '../List';
import {Input, SubmitBtn, SelectDrop, SelectItem} from "../Form"
import API from "../../utils/API";


var request = require('request'); // "Request" library

function SearchSpotify(props) {
  const [userState, setUser] = useState({});
  const [resultState, setResults] = useState([]);
  const [searchState, setSearch] = useState();
  const [songState, setSong] = useState([]);
  const [playlistState, setPlaylist] = useState({});
  const searchUrl = "https://api.spotify.com/v1/"

  useEffect(() => {
    loadusers(props._id);
    
  }, []);

  function loadusers(id) {
    
    //const id = "5ea8c3eebb48ce2f46ef9806";
    console.log(id)
    API.getSingleUser(id)
      .then(res => {
        console.log({res});
        setUser(res.data);
      })
      .catch(err => console.log(err))
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
    setSearch({...searchState, [name]: value});
    console.log(searchState)
  };
  


  //function to load artist, album, or track
  function loadSearch(event, typeSearch, extraTerm) {
    event.preventDefault();
    let client_id = '9b0a14a74c624641947e67fd2eaafbf6', // Your client id
     client_secret = '6f975753ea5a46708e876e54750806c7', 
     compiledUrl = "",
     artist = searchState.searchTerms

     

    if (typeSearch === "artist" || typeSearch === "album" || typeSearch === "track"){
      let type = "&type=" + typeSearch;
      compiledUrl = `${searchUrl}search?q="${artist}${type}&limit=5`;
      
      console.log(compiledUrl)
    } else if( typeSearch === "artistAlbums"){
      let artistID = extraTerm;
      compiledUrl = `${searchUrl}artists/${artistID}/albums`;

      console.log(compiledUrl)
    } else if( typeSearch === "albumSongs"){
      let albumID = extraTerm;
      compiledUrl = `${searchUrl}albums/${albumID}/tracks`;

      console.log(compiledUrl)
    } 
    

    //console.log(compiledUrl)

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

          if(typeSearch === "artistAlbums") {
            console.log(body);
            setResults(body.items);
          };

          if(typeSearch === "albumSongs") {
            console.log(body);
            setSong(body.items);
          };
          
        });
      }
    });
        
  };



  return (
    <div >

      <form className="form-inline text-center search-form">

      <Input 
      label = "Search for Artists"
      onChange = {handleInputChange}
      name = "searchTerms"
      />

      <SubmitBtn onClick={ (event) => loadSearch(event, "artist")} id="artist-search" > Submit </SubmitBtn>
      <br />
      <Input
      label = "Search for Albums"
      onChange = {handleInputChange}
      name = "searchTerms"
      />

      <SubmitBtn  onClick={(event) => loadSearch(event, "album")} id="album-search" > Submit </SubmitBtn>
      <br />
      <Input 
      label = "Search for Songs"
      onChange = {handleInputChange}
      name = "searchTerms"
      
      />
      <SubmitBtn onClick={(event) => loadSearch(event, "track")} id="song-search"> Submit </SubmitBtn>
      <br />
      </form>
      <div className="col-md-5 fluid search-results">
        {resultState.length ? (
          <List >
            {resultState.map(results => (
              <ListItem key={results.id} >
                <img
                  src={results.images.length ? (results.images[0].url) : (" ")}
                  style={{ width: "200px", margin: "0 auto" }}
                />
                <p> {results.name} </p>
                {results.type === "artist" ? (<button onClick={(event) => loadSearch(event, "artistAlbums", results.id)} className="userButton" >See Albums</button>)
                  :
                  (<SubmitBtn onClick={(event) => loadSearch(event, "albumSongs", results.id)} >See Songs</SubmitBtn>)}
              </ListItem>
            ))}
          </List>
        ) : (" ")}
      </div>

      <div className="col-md-7 fluid">
        {songState.length ? (
          <List>
            {songState.map(results => (
              <ListItem key={results.id}>
                <p> Song: {results.name} </p>
                <p> Artist: {results.artists[0].name} </p>
                {userState.playlists ? (
                  <SelectDrop defaultext="Add to Playlist" onChange={(event) => addToPlaylist(event, results)} >
                    {userState.playlists.map(playlist => (
                      <SelectItem key={playlist._id} value={playlist._id} > {playlist.name} </SelectItem>
                    ))}

                  </SelectDrop>) : (" ")}

              </ListItem>
            ))}
          </List>
        ) : (" ")}
      </div>
     



      
      
    </div>
  );
}

export default SearchSpotify;
