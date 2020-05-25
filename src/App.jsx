import React from 'react';
import './App.css';
import {getPlaylists} from './api';
import {baseUrl} from './config';
import axios from "axios";
import {loadProgressBar} from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
import Player from './Player';
import {isEqual} from "lodash";

const isEmpty = (object) =>
{
    if (Object.keys(object).length === 0)
    {
        return true;
    } else return false;
};

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

    componentDidMount()
    {
        this.getPlaylistInitialFunction();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (this.state.playlist && !isEmpty(this.state.playlist) && !isEqual(this.state.playlist, prevState.playlist))
        {
            loadProgressBar();
            axios.post(`${baseUrl}/download`, {files: this.state.playlist.files})
                .then(res =>
                {
                    this.setState({
                        files: this.state.playlist.files,
                        screens: this.state.playlist.screens,
                        ticker: this.state.playlist.playlist.ticker,
                        loaded: true,
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
                this.setState({playlist})
            }
        });
    };

    render()
    {
        const {loaded, files, screens, ticker} = this.state;
        return (
            <div className="App">
                {loaded && files && screens && ticker ?
                    <Player {...this.state} /> : null
                }
            </div>
        );
    }
}

export default App;

