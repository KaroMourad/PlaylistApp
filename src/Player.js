import React, { useState, useEffect } from "react";
import Screen from "./Screen";

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
            let startTime = 0;
            let flag = false;
            for(let j = 0; j < i; j++ ) {
                if(!flag) {
                    for(let t = 0; t < files[j].screen.length; t++) {
                        if(file.screen.indexOf(files[j].screen[t]) !==-1){
                            startTime += files[j].showTime;
                            flag=true;
                            break;
                        }
                    }
                }
            }
            let interval = 0;
            for(let k = 0; k < files.length; k++ ) {
                if(files[k].screen.indexOf(file.screen[0]) !==-1  && k !==i) {
                    interval += files[k].showTime;
                    break;
                }
            }

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