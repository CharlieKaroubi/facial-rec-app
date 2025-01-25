import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const PAT = 'fc9b8805dc694df88c258f18d1b86f73';
const USER_ID = 'k5wu94txg24b';
const APP_ID = 'facial-rec-app';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
const IMAGE_URL = 'https://samples.clarifai.com/face-det.jpg';

const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
                  // "base64": IMAGE_BYTES_STRING
              }
          }
      }
  ]
});

const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

function App() {
  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [user, setUser] = useState({});

  const loadUser = (data) => {
    setUser({... data});
  }

  console.log('user', user);

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFace.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
    });
  }

  const displayFaceBox = (boxes) => {
    setBoxes(boxes);
  }

  const onButtonSubmit = () => {
    displayFaceBox([]);
    if (!input) {
      return;
    }
    setImageURL(input);

    const updatedRaw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": input // Use the input state here
                  }
              }
          }
      ]
    });
  
    const updatedRequestOptions = {
      ...requestOptions,
      body: updatedRaw
    };

    fetch("/api/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", updatedRequestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(result => {
        if (result.status.description === 'Ok') {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
            })
            .then(count => {
              setUser({ ...user, entries: count });
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        }
        const faceBoxes = calculateFaceLocation(result);
        displayFaceBox(faceBoxes);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
  }

  const onRouteChange = (event) => {
    setRoute(event);
  }

  return (
    <div className="App">
      {route === 'signin' ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : route === 'signup' ? (
        <SignUp onRouteChange={onRouteChange} loadUser={loadUser}/>
      ) : route === 'home' ? (
        <div>
          <Navigation onRouteChange={onRouteChange} loadUser={loadUser}/>
          <Logo />
          <Rank user={user}/>
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          <FaceRecognition imageURL={imageURL} boxes={boxes} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
