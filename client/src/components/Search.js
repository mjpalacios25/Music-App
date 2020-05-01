import React from 'react';
import {useState, Component, searchUrl, request, Input, SubmitBtn} from 'react';

const [resultState, setResults] = useState([]);
const [artistState, setArtist] = useState();

function handleInputChange(event) {
    const { name, value } = event.target;
    setArtist({...artistState, [name]: value});
    console.log(artistState)
  };

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

class Search extends Component {
    render() {
        return (

            <div>
            <Input 
                  label = "Search for Artists"
                  onChange = {handleInputChange}
                  name = "artistsearch"
                  
                  />
                  <SubmitBtn onClick={ (event) => loadartist(event, "artist")} > Submit </SubmitBtn>

                  </div>




            )
        }
    }
    
    export default Search;