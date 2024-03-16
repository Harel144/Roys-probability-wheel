import React, { Component } from 'react';
import soundFile from '../sounds/SpinSound.mp3';

class RandomTextChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: "",
      currentIndex: 0,
      remainingTime: 10,
      lastText: "", // Keep track of the last displayed text
      isChangingText: false, // Flag to indicate if text is currently changing
      audio: new Audio(soundFile) // Create an instance of the Audio object with your sound file

    };
    this.interval = null;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  playSound = () => {
    const { audio } = this.state;
    audio.currentTime = 0; // Rewind the sound to the beginning
    audio.play()
      .then(() => console.log('Sound played successfully'))
      .catch(error => console.error('Error playing sound:', error));
  };

  stopSound = () => {
    const { audio } = this.state;
    audio.pause();
    audio.currentTime = 0;
  };

  changeText = () => {
    const { texts, stopAtIndex } = this.props;
    const { currentIndex, lastText } = this.state;
    const nextIndex = (currentIndex + 1) % texts.length;
    let newCurrentText = texts[nextIndex];
    let newCurrentIndex = nextIndex;
    
    // Check if the next text is empty
    while (newCurrentText === "") {
      newCurrentIndex = (newCurrentIndex + 1) % texts.length;
      newCurrentText = texts[newCurrentIndex];
    }

    if(texts.length == 2)
    {
      this.state.remainingTime = 0;
    }

    // Check if the remaining time is less than or equal to 0
    if (this.state.remainingTime <= 0) {
      // If so, set the current text to the text at stopAtIndex
      newCurrentText = texts[stopAtIndex];
      newCurrentIndex = stopAtIndex;
      this.stopSound();
    } else {
      this.setState({ lastText: newCurrentText }); // Update the last displayed text
    }

    this.setState(prevState => ({
      currentText: newCurrentText,
      currentIndex: newCurrentIndex,
      remainingTime: prevState.remainingTime - 0.2
    }));
  }

  handleButtonClick = () => {
    const { texts } = this.props;
    
    this.setState({
      currentText: texts[0], // Reset to the first text
      currentIndex: 0, // Reset to the first index
      remainingTime: 10,
      lastText: "",
      isChangingText: true // Set flag to indicate text changing process has started
    });

    if(texts.length != 2)
    {
      this.playSound();
    }

    if (this.interval) {
      clearInterval(this.interval);
    }


    this.interval = setInterval(() => {
      this.changeText();
      if (this.state.remainingTime <= 0) {
        clearInterval(this.interval);
        this.setState({ isChangingText: false }); // Set flag to indicate text changing process has finished
      }
    }, 187);
  }

  render() {
    const { currentText, isChangingText } = this.state;
    return (
      <div>
        <p>{currentText}</p>
        <button onClick={this.handleButtonClick} disabled={isChangingText}>
          {isChangingText ? 'Rolling...' : 'Start Rolling!'}
        </button>
      </div>
    );
  }
}

export default RandomTextChanger;
