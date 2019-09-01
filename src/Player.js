import React, { useState, useEffect } from "react";

const path = "./files/";

const Player = (props) => {

    const [files,setFiles] = useState();

    useEffect(() => {
        if(props.files.length>0) 
        {
            setFiles(props.files);
        }
    },[props.files]);

    return files && files.length ? (
        files.map((file,i) => {
           if(file.type.split("/")[0] === "image") {
            return (
                <div key={i}>
                    <img src={require(`${path + file.name}`)} alt={file.name} />
                </div>
            );
           }
           else if(file.type.split("/")[0] === "video") {
            return ( 
                <div key={i}>
                    <video src={require(`${path + file.name}`)} alt={file.name} autoPlay/>
                </div>
            );
           }
           return null;
        })
    ) : null;
};

export default Player;