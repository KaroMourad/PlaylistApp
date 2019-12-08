import React from "react";
import Screen from "./Screen";
import Ticker from "react-ticker";
import { WIDTH, HEIGHT } from "./config";

const Player = (props) =>
{
	const list = modifyData(props.files);
	return (
		<div style={{ height: `${HEIGHT}px`, width: `${WIDTH * props.screens}px` }}>
			{list}
			{props.ticker ?
				<Ticker mode="await" offset="run-in" speed={10}>
					{() => <h1 style={{ color: "#fff", whiteSpace: "nowrap" }}>{props.ticker}</h1>}
				</Ticker>
				: null
			}
		</div>
	);

	function modifyData(files) 
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
				files.forEach(f =>
				{
					if (f.screen.indexOf(1) !== -1)
					{
						sum += f.showTime;
					}
				});

				let interval = sum - file.showTime;

				return (
					<Screen
						key={i}
						name={file.name}
						type={file.type}
						screens={file.screen}
						branchScr={props.screens}
						showTime={file.showTime * 1000}
						startTime={startTime * 1000}
						interval={interval * 1000}
					/>
				);
			})
	};
};

export default Player;