import React, { Component } from 'react';
import './App.scss';

class App extends Component {
	render() {
		let actions = this.props.actions || []
		return (<div className="cards">
				{ actions.map( a => <Card action={a} key={a.id}/> ) }
				</div>);
	}
}

class Card extends Component {
	render() {
		let action = this.props.action;
		if (!action) {
			return ''
		}
		let reusable = action.getReusableText();
		return (
			// TODO color switching
			<div className="card">
				<p className="name">
					{ action.name }
				</p>
				<div className="nap">
					<div className="dice">
						{ action.dice.map( d => <Die die={d} key={d.id}/> ) }
						<p className="effect">
							{action.getEffectText()}
						</p>
					</div>
					{ reusable && <p className="reuse"> { reusable } </p> }
				</div>
			</div>
		);
	}
}

class Die extends Component {
	render() {
		return (
				<div className="die">
					<p> Die </p>
				</div>
		);
	}
}



export default App;
