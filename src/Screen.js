import React,{useState,useEffect,useRef} from "react";
const path = "/files/";

const HEIGHT = 1080; // display height
const WIDTH = 720; // one display width

const Screen = (props) => {
    const { screens, name, type, startTime, showTime, interval } = props;
    const [display, setDisplay] = useState("none");

    let time = 0;
    const videoRef = useRef(null);

    useEffect(() => 
    {
        reset();
        time = setTimeout( toBlock ,startTime);
        return () => {
            reset();
            videoRef.current = null;
            setDisplay("none");
        };
    },[]);

    useEffect(() => 
    {
        reset();
        time = setTimeout( toBlock ,startTime);
        return () => {
            reset();
            setDisplay("none");
        };
    },[name,startTime,showTime,interval]);

    const toBlock = () => 
    {
        reset();
        setDisplay("block");
        if(videoRef && videoRef.current && type.split("/")[0]==="video") {
            videoRef.current.play();
        }
        time = setTimeout( toNone ,showTime);
    };
    
    const toNone = () => 
    {
        reset();
        setDisplay("none");
        time = setTimeout( toBlock ,interval);
    };

    const reset = () => 
    {
        clearTimeout(time);
        time=0;
        if(videoRef && videoRef.current && type.split("/")[0] ==="video") {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const styleFile = 
    {
        position: "absolute",
        height: HEIGHT + "px",
        objectFit: "cover",
        left: (screens[0] === 1) ? "0px" : (screens[0] === 2) ? WIDTH + "px" : WIDTH*2 + "px",
        display: display,
        width: `${WIDTH*screens.length}px`
    };

    return ( 
        type.split("/")[0] === "image" ? 
                <img 
                    style={styleFile}
                    display={display}
                    src={`${path + name}`}
                    alt={name} />
                :
                <video 
                    loop
                    ref={videoRef}
                    style={styleFile}
                    display={display}
                    src={`${path + name}`}
                    alt={name} />
    );
};

export default Screen;

