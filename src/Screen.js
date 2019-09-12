import React,{useState,useEffect,useRef} from "react";
const path = "./files/";

const Screen = (props) => {
    const {screens,name,type, startTime,showTime,interval} = props;
    const [display, setDisplay] = useState("none");
    
    const time = useRef(0);
    const videoRef = useRef(null);

    useEffect(() => {
        time.current = setTimeout(() => {
            toBlock();
        },startTime);
        return () => {
            clearTimeout(time);
        };
    },[]);

    const toBlock = () => {
        clearTimeout(time);
        setDisplay("block");
        if(type.split("/")[0]==="video") {
            videoRef.current.play();
        }
        time.current = setTimeout(() => {
            toNone();
        },showTime);
    };
    
    const toNone = () => {
        clearTimeout(time);
        if(type.split("/")[0] ==="video") {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setDisplay("none");
        time.current = setTimeout(() => {
            toBlock();
        },interval);
    };

    const scrWidth = screens.length;
    const left = (screens[0] === 1) ? "0px" : (screens[0] === 2) ? "720px" : "1440px";

    return (type.split("/")[0] === "image" ? 
                <img style={{position: "absolute", left:left, display: display,width: `${720*scrWidth}px`, height: `1080px`}}
                        src={require(`${path + name}`)} alt={name} />
                :
                <video ref={videoRef} style={{position: "absolute", left:left, display: display,width: `${720*scrWidth}px`, height: `1080px`}}
                        src={require(`${path + name}`)} alt={name} />
    );
};

export default Screen;