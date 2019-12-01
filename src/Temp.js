import React , {useState , useEffect} from "react";
import Screen from "./Screen";
import Ticker from 'react-ticker'
import { WIDTH, HEIGHT } from "./config";

const Temp = (props) =>
{
    const {files,screens} = props;
    const [ticker,setTicker] = useState("");

    useEffect(()=> {
        if(screens) 
        {
            const ticker = document.querySelector(".ticker");
            if(ticker) {
                ticker.style.width = WIDTH*screens + 'px';
            }
        }
    },[])

    useEffect(()=> {
        if(screens) 
        {
            const ticker = document.querySelector(".ticker");
            if(ticker) {
                ticker.style.width = WIDTH*screens + 'px';
            }
            setTicker(props.ticker);
        }
    },[props.ticker,screens,files])

    return ( 
        <div style={{height: `${HEIGHT}px`}}>
            {
                files.map((file,i) => {
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
            {ticker ? StockTicker() : null }
        </div>
    );

    function StockTicker() {
        return (
          <Ticker offset="run-in" speed={10}>
            {() => <h1 style={{color: "#fff", whiteSpace: "nowrap"}}>{ticker}</h1>}
          </Ticker>
        );
    }
};

export default Temp;