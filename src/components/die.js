import React, { Component } from 'react';

import * as Model from '../model/dice';

class Die extends Component {
	render() {
		return (
				<div className="die">
				</div>
		);
	}
}

class Comparison extends Component {
	render() {
		return (
			<div className="die compare">
				<p> {this.props.die.text} </p>
				<p> {this.props.die.val} </p>
			</div>
		)
	}
}

class Restricted extends Component {
	render() {
		return (
			<div className="die restricted">
				<p> {this.props.die.text} </p>
			</div>
		)
	}
}

class CountDown extends Component {
	render() {
		return (
			<div className="die countdown">
				<p> {this.props.die.val} </p>
			</div>
		)
	}
}

class Fixed extends Component {
	render() {
		return (
			<div className={"die fixed"}>
				<DieFace n={this.props.die.val} />
			</div>
		)
	}
}

class Constant extends Component {
	render() {
		return (
			<div className={"die constant"}>
				<DieFace n={this.props.die.val} />
			</div>
		)
	}
}

class DieFace extends Component {
	render() {
		let n = this.props.n;
		let fixedClass = "die-face die-face-" + n;
		let pips;
		if (n === 4 || n === 5) {
			let fifthPip = n === 5 && ( <span key={5} className="pip" /> );
			pips = [
				<div key="r1" className="row">
					{ [1,2].map((i) => <span key={i} className="pip"/>) }
				</div>,
				fifthPip,
				<div key="r2" className="row">
					{ [3,4].map((i) => <span key={i} className="pip"/>) }
				</div>,
			];
			
		} else {
			pips = [...Array(n).keys()].map((i) => <span key={i} className="pip"/>)
		}
		return (
			<div className={fixedClass}>
				{ pips }
			</div>
		)
	}
}

function getDieComp(d) {
	if (d instanceof Model.Comparison) return Comparison;
	if (d instanceof Model.Restricted) return Restricted; // must happen after comparison
	if (d instanceof Model.CountDown) return CountDown;
	if (d instanceof Model.Fixed) return Fixed;
	if (d instanceof Model.Constant) return Constant;
	return Die
}

export default getDieComp
