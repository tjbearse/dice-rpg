import React, { Component } from 'react';

import * as Model from '../model/dice';

class Die extends Component {
	render() {
		return (
				<div {...this.props} className={["die", ...this.getClasses()].join(' ')}>
					{this.getContent(this.props.die)}
				</div>
		);
	}
	getClasses() {
		return []
	}
	getContent(d) {
		return ''
	}
}

let quickDie = (classes, contentFn) => class extends Die {
	getClasses() {
		return classes;
	}
	getContent(d) {
		return contentFn(d);
	}
}

let quickContentFn = (...props) => ( (die) => props.map((p,i) => <p key={i}> {die[p]} </p>) );

const Comparison = quickDie(['compare'], quickContentFn('text', 'val'))
const Restricted = quickDie(['restricted'], quickContentFn('text'))
const CountDown = quickDie(['countdown'], quickContentFn('val'))
const Exact = quickDie(['fixed'], (die) => <DieFace n={die.val} />)
const Constant = quickDie(['constant'], (die) => <DieFace n={die.val} />)

// FIXME: this can be a fn, no state
class DieFace extends Component {
	render() {
		let n = Math.max(+(this.props.n), 1);
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
	if (d instanceof Model.Exact) return Exact;
	if (d instanceof Model.Constant) return Constant;
	return Die
}

export default getDieComp
