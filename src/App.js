import React, {useState,useEffect} from 'react';
import './App.css';
import { getPlaylists } from './api';
import { isEmpty } from './utils';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import Player from './Player';

loadProgressBar();

function App() {

  const [playlist,setPlaylist] = useState({});
  const [played,setPlayed] = useState(false);

  useEffect(()=>{
    if(!isEmpty(playlist))
    {
      axios.post("http://localhost:7000/download", {files: playlist.files})
      .then(()=> {
          setPlayed(true);
      })
      .catch(err =>{
        alert(err);
      });
    }
  },[playlist]);

  return (
    <div className="App">
      {
        !played ? (
            isEmpty(playlist) ? <button onClick={()=>getPlaylists(setPlaylist)}>Get Playlists</button> : null 
          ) 
          : <Player files={playlist.files} screens={playlist.screens}/>
      }
    </div>
  );
}
export default App;