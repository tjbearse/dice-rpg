import React, { Component } from 'react';
import './App.css';

class Card extends Component {
	render() {
		let action = this.props.action;
		if (!action) {
			return ''
		}
		return (
			<div className="card">
				Card
				<div className="dice">
				{ action.dice.map( d => <Die die={d} key={d.id}/> ) }
				</div>
				<p className="effect">
					{action.effect}
				</p>
			</div>
		);
	}
}

class Die extends Component {
	render() {
		return (
				<div className="die">
				Die
				</div>
		);
	}
}

class App extends Component {
	render() {
		let actions = this.props.actions || []
		return (<div>
				{ actions.map( a => <Card action={a} key={a.id}/> ) }
				</div>);
	}
}


export default App;
