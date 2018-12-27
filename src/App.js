import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
  apiKey: 'fd7664c65e5b4714ab1f4309c7ddb53e'
})

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
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState( {input : event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
      console.log(err);
    }
  );
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
        <FaceRecognition imageUrl = { this.state.imageUrl }/>
      </div>
    );
  }
}

export default App;
