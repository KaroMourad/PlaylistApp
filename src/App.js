import React, {useState,useEffect} from 'react';
import './App.css';
import { getPlaylists } from './api';
import { isEmpty } from './utils';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import Player from './Player';



function App() {

  const [playlist,setPlaylist] = useState({});
  const [played,setPlayed] = useState(0);

  useEffect(()=>{
    if(!isEmpty(playlist))
    {
      loadProgressBar();
      axios.post("http://localhost:7000/download", {files: playlist.files})
      .then(()=> {
          setPlayed(played + 1);
      })
      .catch(err =>{
        alert(err);
      });
    }
  },[playlist]);


  const getPlaylistInitialFunction = () => 
  {
    getPlaylists(setPlaylist);
  };
  return (
    <div className="App">
      {
        !played ? (
            isEmpty(playlist) ? <button onClick={getPlaylistInitialFunction}>Get Playlists</button> : null 
          ) 
          : <Player files={playlist.files} screens={playlist.screens} ticker={playlist.playlist.ticker ? playlist.playlist.ticker : null}/>
      }
    </div>
  );
}
export default App;