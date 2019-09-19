import React, { useState, useEffect } from "react";
import Screen from "./Screen";

const Player = (props) => {

    const [sum, setSum] = useState(0);
    const [files,setFiles] = useState(null);

    useEffect(() => {
        if(props.files && props.files.length>0) 
        {
            let tempSum = sum;
            props.files.forEach(f => {
                if(f.screen.indexOf(1) !==-1){
                    tempSum += f.showTime;
                }
            })
            setSum(tempSum);
            setFiles(props.files);
        }
        return () => {
            setSum(0);
            setFiles(null);
        };
    },[props.files]);

    return files && files.length ? (
            files.map((file,i) => {
                let startTime = 0;
                for(let j = 0; j < i; j++ ) {
                    if(files[j].screen.indexOf(file.screen[0]) !==-1){
                        startTime += files[j].showTime;
                    }
                }
                let interval = sum - file.showTime;
        
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