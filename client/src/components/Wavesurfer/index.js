import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import Playlists from "../UserPlaylists" 

import { WaveformContainer, Wave, PlayButton } from "./style.js";

class Waveform extends Component {
    constructor(props) {
        super(props);
        
        console.log(props._id)
        this.state = {
            
            _id: props._id,
            playing: false


        };
    }
    

    componentDidMount() {
        const track = document.querySelector("#track");

        this.waveform = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'rgb(14, 243, 174)',
            progressColor: 'rgb(43, 88, 75)'
        });

        this.waveform.load(track.href);
    };

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
    };

    render() {
        return (
            <WaveformContainer>
                <PlayButton onClick={this.handlePlay}>
                    {!this.state.playing ? "Play" : "Pause"}
                </PlayButton>
                <Wave id="waveform" />
                {/* <div>Playlist Here</div> */}
                <a href="./assets/Smack_That.mp3"  id = "track" className="list-group-item">
        
                 Smack That
                </a>
                {/* <Playlists _id={this.state._id}></Playlists> */}
            </WaveformContainer>
        );
    }
};

export default Waveform;