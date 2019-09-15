import React, { useState, useEffect } from "react";
import Screen from "./Screen";

const Player = (props) => {

    const [sum, setSum]  = useState(0);

    useEffect(() => {
        if(props.files.length>0) 
        {
            let tempSum = sum;
            props.files.forEach(f => {
                if(f.screen.indexOf(1) !==-1){
                    tempSum += f.showTime;
                }
            })
            setSum(tempSum);
        }
    },[props.files]);

    return props.files && props.files.length ? (
        props.files.map((file,i) => {
            let startTime = 0;
            for(let j = 0; j < i; j++ ) {
                if(props.files[j].screen.indexOf(file.screen[0]) !==-1){
                    startTime += props.files[j].showTime;
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