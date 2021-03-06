import {apiUrl, branchId} from './config';
import axios from 'axios';

let time;

export function getPlaylists(setPlaylist, current)
{
    clearTimeout(time);
    axios.get(apiUrl + '/playlists/' + branchId + '&:withFiles')
        .then(result =>
        {
            let tempPl;
            if (result.data.length)
            {
                const dateNow = new Date().valueOf();
                let match = false;
                const playlists = result.data;
                playlists.forEach(pl =>
                {
                    if (!match)
                    {
                        const start = new Date(pl.playlist["startDate"]).valueOf();
                        const end = new Date(pl.playlist["endDate"]).valueOf();
                        if (dateNow >= start && dateNow <= end && (!current || current.playlist["updatedAt"] !== pl.playlist["updatedAt"]))
                        {
                            setPlaylist(pl);
                            match = true;
                        }
                        tempPl = pl;
                    }
                })
            } else
            {
                throw new Error('no playlist');
            }
            time = setTimeout(() =>
            {
                getPlaylists(setPlaylist, tempPl)
            }, 10000);
        })
        .catch((err) =>
        {
            if (err.response && err.response.data.message)
            {
                alert(err.response.data.message);
                console.log(err.response);
            } else
            {
                alert(err.message);
                console.log(err);
            }
        })
}
