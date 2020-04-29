import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";

import { WaveformContainer, Wave, PlayButton } from "./style";

class Waveform extends Component {
    componentDidMount() {
        const track = document.querySelector("#track");

        this.waveform = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'violet',
            progressColor: 'purple'
        });

        this.waveform.load(track);
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
                {/* <audio id="track" src={url}/> */}
            </WaveformContainer>
        );
    }
};

export default Waveform;