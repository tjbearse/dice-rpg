import React, { Component } from 'react';
import './App.scss';
import {Upgradable} from './model/actions';
import {Card, FlipCard} from './components/cards';
import {CardForm} from './components/cardForm';

import {Actions} from './backend';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actions: [],
		}
		this.addAction = this.addAction.bind(this);
	}

	componentDidMount() {
		Actions.get()
			.then(actions => {
				this.setState({
					actions
				})
				console.log(actions);
			}
			)
	}

	addAction(a) {
		this.setState({
			actions: [a, ...this.state.actions],
		});
		Actions.post(a)
	}

	render() {
		let actions = this.state.actions || []
		return (<div className="cards">
				<CardForm addAction={this.addAction}/>
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
*/



export default App
