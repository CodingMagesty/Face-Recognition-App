import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const ParticlesOptions = {
	    particles: {
	        number: {
	            value: 150,
              density: {
                enable: true,
                value_area: 800
              }
	        }
	    }
	}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      <div className="App">
      <Particles className='particles'
        params= {ParticlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange = {this.onInputChange}
          onButtonSubmit = {this.onButtonSubmit}/>
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
