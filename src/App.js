import React, { Component } from 'react';
import './App.scss';
import {Upgradable} from './model/actions';
import {Card, FlipCard} from './components/cards';
import {CardForm} from './components/cardForm';

class App extends Component {
	render() {
		let actions = this.props.actions || []
		return (<div className="cards">
				<CardForm />
				{ actions.map( a => {
					if (a instanceof Upgradable)
						return <FlipCard actionPair={a} key={a.id()}/>
					else
						return <Card action={a} key={a.id()}/>
					}
				) }
				</div>);
	}
}

/* TODO
	- Group
	- Half card / compact view?
	- Form for adding quickly
*/



export default App;
