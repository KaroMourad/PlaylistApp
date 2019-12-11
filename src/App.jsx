import React from 'react';
import './App.css';
import { getPlaylists } from './api';
import { isEmpty } from './utils';
import { baseUrl } from './config';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import Player from './Player';
import { isEqual } from "lodash";

class App extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			playlist: null,
			loaded: false,
			files: null,
			screens: 0,
			ticker: null
		}
	}

	componentDidUpdate(prevProps, prevState) 
	{
		if (this.state.playlist && !isEmpty(this.state.playlist) && !isEqual(this.state.playlist, prevState.playlist))
		{
			loadProgressBar();
			axios.post(`${baseUrl}/download`, { files: playlist.files })
				.then(res =>
				{
					this.setState({
						loaded: true,
						files: this.state.playlist.files,
						screens: this.state.playlist.screens,
						ticker: this.state.playlist.playlist.ticker
					})
				})
				.catch(err =>
				{
					alert(err);
				});
		}
	}

	getPlaylistInitialFunction = () => 
	{
		getPlaylists((playlist) =>
		{
			if (playlist)
			{
				this.setState({
					playlist: playlist
				})
			}
		});
	};
	render()
	{
		const { loaded, files, screens, ticker } = this.state;
		return (
			<div className="App">
				{loaded ? null : <button onClick={this.getPlaylistInitialFunction}>Get Playlists</button>}
				{files && screens && ticker ?
					<Player
						files={files}
						screens={screens}
						ticker={ticker}
					/> : null
				}
			</div>
		);
	}
}
export default App;

