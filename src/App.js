import React, {useState,useEffect} from 'react';
import './App.css';
import { getPlaylists } from './api';
import { isEmpty } from './utils';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

loadProgressBar();

// const Fs = require('fs')  
// const Path = require('path')  
// const Axios = require('axios')

// async function downloadImage (file) {  
//   const url = file.url;
//   const path = Path.resolve(__dirname, 'files', file.name)
//   const writer = Fs.createWriteStream(path)

//   const response = await Axios({
//     url,
//     method: 'GET',
//     responseType: 'stream'
//   })

//   response.data.pipe(writer)

//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve)
//     writer.on('error', reject)
//   })
// }
 

function App() {

  const [playlist,setPlaylist] = useState({});
  const [played,setPlayed] = useState(false);
  const [persentage,setPersentage] = useState(0);

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

  useEffect(()=>{
    if(!isEmpty(playlist))
    {
      // execute simultaneous requests 
      axios.all([
        playlist.files.forEach(file => {
          
          axios.get(file.url,
            {
              onDownloadProgress: progressEvent => {
                setPersentage(
                  parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                );
              },
            }
          )
        })
      ])
      .then(responseArr => {
        //this will be executed only when all requests are complete
        console.log('prc', responseArr);
      });
    }
  },[playlist]);

  return (
    <div className="App">
      {!isEmpty(playlist) ?
        <div>
          <button onClick={playOrStopPLaylist}>
            {played ? "Stop" : "Play"}
          </button>
          {//persentage !== 100 && <span>{persentage}%</span>
          }
        </div>
      : <div>
          <button onClick={()=>getPlaylists(setPlaylist)}>Get Playlists</button>
        </div>
      }
    </div>
  );
}




export default App;
