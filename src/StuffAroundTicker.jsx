import React from "react";
import Ticker from 'react-ticker'

const StuffAroundTicker = ({ ticker }) => 
{
	const { r, g, b, a } = ticker.color;
	const {fontSize} = ticker;
	return (
		<Ticker>
			{({ index }) => (
				<div className="ticker" key={index} style={{ color: `rgba(${r},${g},${b},${a})`, fontSize}}>
					{ticker.text}
				</div>
			)}
		</Ticker>
	);
};

export default StuffAroundTicker;