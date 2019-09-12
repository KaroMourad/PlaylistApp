import React, { useState, useEffect } from "react";
import Screen from "./Screen";

const Player = (props) => {

    const [files,setFiles] = useState();

    let sum = 0;

    useEffect(() => {
        if(props.files.length>0) 
        {
            
            props.files.forEach(f => {
                if(f.screen.indexOf(1) !==-1){
                    sum += f.showTime;
                }
            })
            setFiles(props.files);
        }
    },[props.files]);

    return files && files.length ? (
        files.map((file,i) => {
            let startTime = 0;
            for(let j = 0; j < i; j++ ) {
                    for(let t = 0; t < files[j].screen.length; t++) {
                        if(file.screen.indexOf(files[j].screen[t]) !==-1){
                            startTime += files[j].showTime;
                            break;
                        }
                    }
                
            }
            let interval = sum - file.showTime;
        
            console.log("i",i,"showTime",file.showTime,"startTime",startTime,"interval",interval)
            return (
                <Screen 
                    key={i}
                    temp={i}
                    name={file.name} 
                    type={file.type}
                    screens={file.screen} 
                    branchScr={props.screens}
                    showTime={file.showTime*1000}
                    startTime={startTime*1000}
                    interval={interval*1000}
                />
            );
        })
    ) : null;
};

export default Player;