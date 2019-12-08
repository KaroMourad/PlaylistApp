import React, { useState, useEffect } from 'react';
import './App.css';
import { getPlaylists } from './api';
import { isEmpty } from './utils';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import Player from './Player';

const App = () =>
{
	const [playlist, setPlaylist] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [files, setFiles] = useState(null);
	const [screens,setScreens] = useState(0);
	const [ticker,setTicker] = useState("");

	useEffect(() =>
	{
		if (!isEmpty(playlist))
		{
			loadProgressBar();
			axios.post(`http://localhost:7000/download`, { files: playlist.files })
				.then(res =>
				{
					setLoaded(true);
					setFiles(playlist.files);
					setScreens(playlist.screens);
					setTicker(playlist.playlist.ticker);
				})
				.catch(err =>
				{
					alert(err);
				});
		}
	}, [playlist]);

	const getPlaylistInitialFunction = () => 
	{
		getPlaylists(setPlaylist);
	};

	return (
		<div className="App">
			{ loaded ? null : <button onClick={getPlaylistInitialFunction}>Get Playlists</button> }
			{files ?
				<Player
					files={files}
					screens={screens}
					ticker={ticker}
				/> : null
			}
		</div>
	);
};
export default App;