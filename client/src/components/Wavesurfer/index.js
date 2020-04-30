import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";

import { WaveformContainer, Wave, PlayButton } from "./style.js";

class Waveform extends Component {

    state = {
        playing: false,
    };

    componentDidMount() {
        const track = document.querySelector("#track");

        this.waveform = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple'
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
                <a href="./assets/Smack_That.mp3"  id = "track" class="list-group-item">
        
                 Smack That
                </a>
            </WaveformContainer>
        );
    }
};

export default Waveform;