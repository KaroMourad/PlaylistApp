import React, { createRef } from "react";
import { WIDTH, HEIGHT } from "./config";
const path = "/files/";


class Screen extends React.Component 
{
	constructor(props) 
	{
		super(props);
		this.state = {
			display: "none"
		}
		this.time = 0;
		this.videoRef = createRef(null);
	}

	toBlock = () =>
	{
		this.reset();
		this.setState({ display: "block" });
		if (this.videoRef && this.props.type.split("/")[0] === "video")
		{
			this.videoRef.current.play();
		}
		this.time = setTimeout(this.toNone, this.props.showTime);
	}

	toNone = () =>
	{
		this.reset();
		this.setState({ display: "none" });
		this.time = setTimeout(this.toBlock, this.props.interval);
	}

	reset = () => 
	{
		clearTimeout(this.time);
		this.time = 0;
		if (this.videoRef && this.props.type.split("/")[0] === "video")
		{
			this.videoRef.current.pause();
			this.videoRef.current.currentTime = 0;
		}
	}

	componentDidMount() 
	{
		this.time = setTimeout(this.toBlock, this.props.startTime)
	}

	componentDidUpdate(prevProps,prevState) 
	{
		if(prevProps !== this.props)
		{
			this.reset();
			this.time = setTimeout( this.toBlock ,this.props.startTime);
		}
	}

	componentWillUnmount() 
	{
		this.setState({ display: "none" });
		this.reset();
	}

	render()
	{
		const { screens, name, type } = this.props;

		const styleFile = {
			position: "absolute",
			height: HEIGHT + "px",
			//objectFit: "cover",
			left: (screens[0] === 1) ? "0px" : (screens[0] === 2) ? WIDTH + "px" : WIDTH * 2 + "px",
			display: this.state.display,
			width: `${WIDTH * screens.length}px`
		};
		return (
			type.split("/")[0] === "image" ?
				<img
					style={styleFile}
					src={`${path + name}`}
					alt={name} />
				:
				<video
					loop
					ref={this.videoRef}
					style={styleFile}
					src={`${path + name}`}
					alt={name} />
		);
	};
}
export default Screen;

