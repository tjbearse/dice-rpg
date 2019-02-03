import React, { Component } from 'react';
import './App.scss';
import getDieComp from './components/die';
import {Upgradable} from './model/actions';

class App extends Component {
	render() {
		let actions = this.props.actions || []
		return (<div className="cards">
				{ actions.map( a => {
					console.log(a, a instanceof Upgradable);
					if (a instanceof Upgradable)
						return <FlipCard actionPair={a} key={a.id()}/>
					else
						return <Card action={a} key={a.id()}/>
					}
				) }
				</div>);
	}
}

class Card extends Component {
	render() {
		let action = this.props.action;
		if (!action) {
			throw Error("action not provided");
		}
		let reusable = action.getReusableText();
		return (
			<div className={this.props.className + " card type-"+ action.type}>
				<p className="name">
					{ action.name }
				</p>
				<div className="nap">
					<div className="dice">
						{ action.dice.map( d => {
								let D = getDieComp(d);
							return <D die={d} key={d.id()}/>
							})
						}
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

class FlipCard extends Component {
	render() {
		let actionPair = this.props.actionPair;
		if (!actionPair || !actionPair instanceof Upgradable)
			throw Error("Flip card without 2 actions");

		let base = actionPair.actions[0];
		let upgrade = actionPair.actions[1];
		return (
			<div className="flip">
				<Card action={base}/>
				<Card className="flipped" action={upgrade} />
			</div>
		);
	}
}



export default App;
