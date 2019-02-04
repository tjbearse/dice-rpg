import React, { Component } from 'react';

import {Actions} from '../backend';
import CardForm from './cardForm';
import CardCollection from './cardCollection'

class AllCardsView extends Component {
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
			})
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
		return <CardCollection
			className="half"
			actions={this.state.actions}
			addAction={this.addAction}
			removeAction={this.removeAction}
			selectAction={this.props.select}
			edit={this.props.edit}
		>
			{ this.props.edit && <CardForm addAction={this.props.addAction}/> }
		</CardCollection>
	}

}

export default AllCardsView
