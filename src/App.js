import React, {useState} from 'react';
import './App.css';
import { getPlaylists } from './api';
import { isEmpty } from './utils';

function App() {

  const [playlist,setPlaylist] = useState({});
  const [played,setPlayed] = useState(false);
  
  const playPLaylist = () => 
  { 
    //....play
  };

  const stopPLaylist = () => 
  { 
    //...stop
  };

  const playOrStopPLaylist = () => 
  { 
    if(played) 
    {
      stopPLaylist();
      setPlayed(false);
    }
    else 
    {
      playPLaylist();
      setPlayed(true);
    }
  };

  return (
    <div className="App">
      {!isEmpty(playlist) && 
        <button onClick={playOrStopPLaylist}>
          {played ? "Stop" : "Play"}
        </button>
      }
      <button onClick={()=>getPlaylists(setPlaylist)}>Get Playlists</button>
    </div>
  );
}




export default App;
