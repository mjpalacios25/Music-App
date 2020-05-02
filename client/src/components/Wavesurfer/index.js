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
            playing: false,
             songLink: "https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86",
            //songLink: props.songLink,
            songName: "props.songName"


        };
    }
    

    componentDidMount() {
        

        this.waveform = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'rgb(14, 243, 174)',
            progressColor: 'rgb(43, 88, 75)'
        });
        this.waveform.load(this.state.songLink);
        // this.waveform.load("https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86");
    };

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
    };

    render() {
        return (
            <div>
            <WaveformContainer>
                <PlayButton onClick={this.handlePlay}>
                    {!this.state.playing ? "Play" : "Pause"}
                </PlayButton>
                <Wave id="waveform" />
                {/* <div>Playlist Here</div> */}
                 <p className="slash">{this.state.songName}</p>
                {/* <Playlists _id={this.state._id}></Playlists> */}
            </WaveformContainer>
            <br />
                <div class="text-center">
                <iframe src="https://giphy.com/embed/ftdEPX8jF6SvC" width="240" height="135" frameBorder="0"></iframe>
                </div>
            </div>
        );
    }
};

export default Waveform;