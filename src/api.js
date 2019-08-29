import {branchId, baseUrl} from './config';
import axios from 'axios';

export function getPlaylists(setPlaylist)
{
    axios.get(baseUrl + '/playlists/' + branchId + '&:withFiles')
    .then(result => {
        if(result.data.length){
            const dateNow = new Date().valueOf();
            let match = false;
            const playlists = result.data;
            playlists.forEach(pl => {
                if(!match) {
                    const start = new Date(pl.playlist.startDate).valueOf();
                    const end = new Date(pl.playlist.endDate).valueOf();
                    if(dateNow >= start && dateNow <= end ){
                        setPlaylist(pl);
                        match = true;
                    }
                }
            })
            if(!match){
                throw new Error('no playlist to date now');
            }
        } else {
            throw new Error('no playlists');
        }
    })
    .catch(err => {
        console.log(err);
    })
}