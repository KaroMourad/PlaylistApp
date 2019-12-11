import React from "react";
import Screen from "./Screen";
import { WIDTH, HEIGHT } from "./config";
import {isEqual} from "lodash";
import StuffAroundTicker from "./StuffAroundTicker";

class Player extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			files: null,
			ticker: null,
			screens: 0
		}
	}

	componentDidMount() 
	{
		this.setState({
			files: this.props.files,
			ticker: this.props.ticker,
			screens: this.props.screens
		})
	}

	componentDidUpdate(prevProps, prevState) 
	{
		if (!isEqual(prevProps,this.props)) 
		{
			this.setState({
				files: this.props.files,
				ticker: this.props.ticker,
				screens: this.props.screens
			})
		}
	}

	componentWillUnmount() 
	{
		this.setState({
			files: null,
			ticker: null,
			screens: 0
		})
	}

	render()
	{
		const { screens, ticker, files } = this.state;
		const list = screens && ticker && files ? this.modifyData(this.state.files) : null;

		return screens && ticker && files ? (
			<div style={{ height: `${HEIGHT}px`, width: `${WIDTH * screens}px`, position: "relative" }}>
				{list}
				{ticker && ticker.text ?
					<div className="tickerContainer">
						<StuffAroundTicker ticker={ticker} />
					</div> : null
				}
			</div>
		) : <h1>Loading...</h1>;
	}

	modifyData = (files) =>
	{
		return files.map((file, i) =>
		{
			let startTime = 0;
			for (let j = 0; j < i; j++)
			{
				if (files[j].screen.indexOf(file.screen[0]) !== -1)
				{
					startTime += files[j].showTime;
				}
			}
			let sum = 0;
			for (let k = 0; k < files.length; k++) 
			{
				if (files[k].screen.indexOf(1) !== -1)
				{
					sum += files[k].showTime;
				}
			}

			let interval = sum - file.showTime;

			return (
				<Screen
					key={i}
					name={file.name}
					type={file.type}
					screens={file.screen}
					branchScr={this.state.screens}
					showTime={file.showTime * 1000}
					startTime={startTime * 1000}
					interval={interval * 1000}
				/>
			);
		})
	};
};

export default Player;