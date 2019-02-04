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
		this.removeAction = this.removeAction.bind(this);
	}

	componentDidMount() {
		Actions.get()
			.then(actions => {
				this.setState({
					actions
				})
			}
			)
	}

	removeAction(a) {
		let actions = this.state.actions.filter(action => action !== a)
		this.setState({
			actions
		});
		Actions.del(a)
	}

	addAction(a) {
		Actions.post(a)
			.then(response => {
				a.id = response.id;
				this.setState({
					actions: [a, ...this.state.actions],
				});
			})
	}

	render() {
		let actions = this.state.actions || []
		return (
			<div>
				<div className="cards">
					<CardForm addAction={this.addAction}/>
					{ actions.map( a => {
						if (a instanceof Upgradable)
							return <FlipCard actionPair={a} key={a.id}/>
						else
							return <Card remove={()=>{this.removeAction(a)}} action={a} key={a.id}/>
						}
					) }
				</div>
			</div>
		);
	}
}


/* TODO
	- Group
	- Half card / compact view?
*/



export default App
