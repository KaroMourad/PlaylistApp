import React from "react";
import Screen from "./Screen";

const Temp = (props) =>
{
    const {files} = props;

    return files.map((file,i) => {
        let startTime = 0;
        for(let j = 0; j < i; j++ ) {
            if(files[j].screen.indexOf(file.screen[0]) !==-1){
                startTime += files[j].showTime;
            }
        }
        let sum = 0;
        files.forEach(f => {
            if(f.screen.indexOf(1) !==-1){
                sum += f.showTime;
            }
        });

        let interval = sum - file.showTime;
        console.log("interval",i,interval)

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
}

export default Temp;