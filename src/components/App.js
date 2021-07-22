import '../App.scss';
import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import DisplayData from './DisplayData';
import WeatherWidget from './WeatherWidget';

function App() {
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: "Tell me the weather in *",
      callback: (city) => {
        const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
        const weatherParams = {
          q: city,
          units: 'metric',
          appid: '6ae0f50b6e18f61ba631bcf5f473a36f'
        };
        axios.get(weatherURL, {params: weatherParams}).then((result) => {
          const weatherData = result.data;
          const weatherObj = {
            icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
            iconDesc: weatherData.weather[0].description,
            locName: weatherData.name,
            currTemp: weatherData.main.temp,
            maxMin: `${Math.floor(weatherData.main.temp_max)}°C/${Math.floor(weatherData.main.temp_min)}°C`,
            feelsLike: weatherData.main.feels_like,
            windSpeed: parseInt(weatherData.wind.gust) * (18/5),
          }
          setWeatherObj(weatherObj)
          debugger;
        })
      }
    },
    {
      command: "Give me the weekly forecast",
      callback: () => {
        const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall';
        const weatherParams = {
          lat: -33.87,
          lon: 151.21,
          units: 'metric',
          appid: '6ae0f50b6e18f61ba631bcf5f473a36f'
        };
        axios.get(weatherURL, {params: weatherParams}).then((result) => {
          console.log(result.data);

        })
      }
    },
    {
      command: "Give me a number fact",
      callback: () => {
        axios.get('http://numbersapi.com/random/trivia').then((response) => {
          const fact = response.data;
          setData(fact);
        });
      }
    },
    {
      command: "How old am I if my name is *",
      callback: (name) => {
        axios.get('https://api.agify.io/?name=' + name).then((response) => {
          setData(response.data.age);
        })
      }
    },
    {
      command: "I'm bored",
      callback: () => {
        axios.get('https://www.boredapi.com/api/activity').then((response) => {
          setData(response.data.activity);
        })
      }
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "stop",
      callback: () => {
        stopHandle();
      }
    },
    {
      command: "Give me a recipe",
      callback: () => {}
    },
    {
      command: "change background to trees",
      callback: () => {
        const body = document.querySelector('body');
        body.classList.add("trees")
      },
    },
  ]

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const [data, setData] = useState(null);
  const [weatherObj, setWeatherObj] = useState({});
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleListening = () => {
    resetTranscript();
    setIsListening(true);
    microphoneRef.current.classList.add("pulse");
    SpeechRecognition.startListening({
        continuous: true,
    });

  };

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("pulse");
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const handleReset = () => {
    stopHandle();
    setData(null);
  };

  return (
    <div className="App">
      <div className="microphone-container">
        <h1>Your mini assitant is at your service</h1>
        <div className="microphone-wrapper">
          <div className="microphone-icon-circle" ref={microphoneRef} onClick={handleListening}>
            <FontAwesomeIcon icon={faMicrophone} size="4x" color="white" className="fa-icon"/>
          </div>
          <div className="microphone-status">
            { isListening? <h3>Your wish is my command</h3> : <h3>Click to start listening</h3>}
          </div>
        </div>

        <div className="microphone-result">
          <div className="speech-transcript">{transcript}</div>
        <button className="reset-transcript controls" onClick={handleReset}>Reset</button>

          { isListening && (
            <button className="microphone-stop btn controls" onClick={stopHandle} >
             Stop
           </button>
          )}
          { data && <DisplayData data={data}/>}
          { weatherObj && <WeatherWidget weatherObj={weatherObj} /> }
        </div>

      </div>

    </div>
  );
}

export default App;
