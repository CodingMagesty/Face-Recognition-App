import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Signin from './components/Signin/Signin.js';
import Signup from './components/Signup/Signup.js';
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState( {input : event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    if (route === 'signin') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;

    return (
      <div className="App">
      <Particles className='particles'
        params= {ParticlesOptions}/>
      <Navigation onRouteChange={ this.onRouteChange } isSignedIn={ isSignedIn }/>
      { route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange = {this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition imageUrl = { imageUrl } box = { box }/>
          </div>
          : (
            this.state.route === 'signin' ? <Signin onRouteChange={ this.onRouteChange }/>
            : <Signup onRouteChange={ this.onRouteChange }/>
          )
      }
    </div>
    );
  }
}

export default App;
