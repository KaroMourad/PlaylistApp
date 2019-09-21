import React, { useState, useEffect } from "react";
import Temp from "./Temp";

const Player = (props) => {

    const [files,setFiles] = useState(null);

    useEffect( () => 
    {
        if(props.files && props.files.length>0) 
        {
            setFiles(props.files);
        }
        return () => {
            setFiles(null);
        };
    },[props.files]);
    
    return files && files.length ? <Temp files={files} /> : null;
};

export default Player;