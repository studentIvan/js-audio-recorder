import React from 'react';
import { connect } from 'react-redux';

import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';

import { STEP } from './index';
import Recorder from 'recorderjs';

class MainView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      step: STEP.DEFAULT,
      highlight: 0,
      recorder: null,
      recordingTimeSecPerLine: 10,
      linesCount: 3,
      playTimer: null
    };
  }

  startRecording() {

    if (this.state.step & ~(STEP.DEFAULT | STEP.RECORDED | STEP.UPLOADED)) {
      return;
    }

    /**
     * @type {NavigatorUserMedia.getUserMedia}
     */
    let audioContext;
    
    try {
      /* init browser audio */
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      audioContext = new AudioContext();
    } catch (e) {
      /* prevent work in old browsers */
      alert('No web audio support in this browser!');
      throw e;
    }
    
    navigator.getUserMedia({ audio: true }, (stream) => {
      const { linesCount, recordingTimeSecPerLine } = this.state;
      const input = audioContext.createMediaStreamSource(stream);
      const recorder = new Recorder(input);
      recorder.record();

      this.setState({
        step: STEP.RECORDING,
        highlight: 1,

        recorder
      });

      for (let i = 1; i <= linesCount; i++) {
        setTimeout(() => {
          const isEnd = i + 1 === linesCount + 1;

          this.setState({
            step: isEnd ? STEP.RECORDED : STEP.RECORDING,
            highlight: isEnd ? 0 : i + 1
          });

          if (isEnd) {
            recorder.stop();
            this.setState({ recorder });
          }
        }, recordingTimeSecPerLine * 1000 * i);
      }
    }, (e) => {
      alert('No live audio input: ' + e);
    });
  }

  togglePlayRecorded() {
    if (this.state.step & ~(STEP.RECORDED | STEP.UPLOADED) & ~STEP.PLAYING_ONLY) {
      return;
    }
    
    if (this.state.step & STEP.PLAYING_ONLY) {
      this.stopPlaying();
    }
    else {
      this.playRecorded();
    }
  }

  stopPlaying() {
    const audioElement = document.getElementById('recorded-playing');
    audioElement.pause();
    audioElement.currentTime = 0;

    clearTimeout(this.state.playTimer);
    audioElement.remove();

    this.setState({ step: STEP.RECORDED });
  }

  playRecorded() {
    const { linesCount, recordingTimeSecPerLine } = this.state;
    this.state.recorder.exportWAV((blob) => {
      const url = URL.createObjectURL(blob);
      const audioElement = document.createElement('audio');

      /* garbage collection */
      (document.getElementById('recorded-playing') || { remove() {} }).remove();
      
      /* audio element configuration */
      audioElement.id = 'recorded-playing';
      audioElement.controls = true;
      audioElement.src = url;
      audioElement.style.visibility = 'hidden';
      
      /* play audio using html5 */
      document.body.appendChild(audioElement);
      audioElement.play();

      this.setState({
        step: STEP.PLAYING,
        playTimer: setTimeout(() => {
          this.setState({ step: STEP.UPLOADED });
        }, recordingTimeSecPerLine * 1000 * linesCount),
      });
    });
  }

  saveRecorded() {
    if (this.state.step & ~(STEP.RECORDED | STEP.UPLOADED) & ~STEP.UPLOADED) {
      return;
    }

    this.setState({ step: STEP.UPLOADING });
    const apiSaveURL = '/save';
    this.state.recorder.exportWAV((blob) => {

      const request = new XMLHttpRequest();
      request.open('POST', apiSaveURL, true);
      request.setRequestHeader('Content-Type', 'audio/wav');

      request.onreadystatechange = () => {
        if (request.readyState === 4 /*&& request.status === 200*/) {
          this.setState({ step: STEP.UPLOADED });
        }
      };

      setTimeout(() => {
        request.send(blob);
      }, 1000); // simulate query time
    });
  }

  render() {
    return(
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <HeaderBar/>
        <main className="mdl-layout__content">
          <div className="mdl-layout__tab-panel is-active" id="application">
            <section className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
              <header className="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white">
                <img src="https://images-na.ssl-images-amazon.com/images/I/51ZnKCLwzWL._SY355_.jpg" 
                  width="180px" role="presentation" />
              </header>
              <div className="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                <div className="mdl-card__supporting-text">
                  <h4>
                    Rick Astley - Never Gonna Give You Up
                    
                    <div className="mdl-spinner mdl-js-spinner is-active" style={{
                      position: 'absolute',
                      right: '110px',
                      top: '40px',
                      display: this.state.step & (STEP.UPLOADING | STEP.RECORDING) 
                        ? 'block' : 'none'
                    }}></div>
                  </h4>
                  
                  <div>
                    Click on "Start" button to start audio recording. <br/>
                    Don't forget to add the allow on microphone recording to this site. 
                  </div>
                  <br/>
                  <div className="mdl-typography--subhead lyrics-lines">
                    <div className={ this.state.highlight === 1 ? 
                      'mdl-color-text--accent' : '' }>
                      Never gonna give you up
                    </div>
                    <div className={ this.state.highlight === 2 ? 
                      'mdl-color-text--accent' : '' }>
                      Never gonna let you down
                    </div>
                    <div className={ this.state.highlight === 3 ? 
                      'mdl-color-text--accent' : '' }>
                      Never gonna run around and desert you
                    </div>
                  </div>
                </div>
                <div className="mdl-card__actions">
                  <a href="#" className="mdl-button" 
                    disabled={ this.state.step & ~(STEP.RECORDED | STEP.UPLOADED) & ~STEP.UPLOADED }
                    onClick={ this.saveRecorded.bind(this) }>
                    <i className="material-icons">cloud_upload</i>&nbsp;
                    Upload
                  </a>
                  <a href="#" className="mdl-button" 
                    disabled={ this.state.step & ~(STEP.RECORDED | STEP.UPLOADED) & ~STEP.PLAYING_ONLY }
                    onClick={ this.togglePlayRecorded.bind(this) }>
                    <i className="material-icons">play_circle_filled</i>&nbsp;
                    { this.state.step & STEP.PLAYING_ONLY ? 'Stop' : 'Play' }
                  </a>
                  <a href="#" className="mdl-button" 
                    disabled={ 
                      this.state.step & ~(STEP.DEFAULT | STEP.RECORDED | STEP.UPLOADED) }
                    onClick={ this.startRecording.bind(this) }>
                    <i className="material-icons">mic</i>&nbsp;
                    { 
                      this.state.step & (STEP.RECORDED | STEP.UPLOADING | STEP.UPLOADED)
                        ? 'Start Again' : 'Start' 
                    }
                  </a>
                </div>
              </div>
            </section>
          </div>
          <FooterBar/>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.main.message,
  }
}

export default connect(mapStateToProps, {})(MainView);
