import React, { Component } from 'react';

function getHighlight(t, key) {
	switch (t) {
	case 'sum':
		return <span className="highlight dice-sum" key={key} />
	default:
		return <span className="highlight" key={key}>{t}</span>;
	}
}

// TODO intro icons
function InterpText(props) {
	const text = String(props.text)
	const regex = /#(\w+)/gi;


	const parts = text.split(regex);
	for (var i = 1; i < parts.length; i += 2) {
		parts[i] = getHighlight(parts[i], i)
	}
	return (
		<p {...props}>
			{parts}
		</p>
	)
}

export default InterpText
