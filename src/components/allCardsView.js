import React, { Component } from 'react';

import {Actions} from '../backend';
import CardForm from './cardForm';
import CardCollection from './cardCollection'
import Types from '../model/types';
import {actionFromJSON} from '../model/actions';

const baseActionState = {
				name: "",
				type: Types.Attack,
				dice: [],
				editDie: {
					val: 1
				},
				effect: "",
				reusable: ""
}
const merge = (a, b) => Object.assign({}, a, b);

class AllCardsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actions: [],
			editAction: baseActionState,
		}
		this.addAction = this.addAction.bind(this);
		this.removeAction = this.removeAction.bind(this);
		this.handleActionChange = this.handleActionChange.bind(this);
	}

	componentDidMount() {
		Actions.get()
			.then(actions => {
				this.setState({
					actions
				})
			})
	}

	// for ongoing edits
	handleActionChange(a) {
		this.setState((state) => 
			merge(state, {
				editAction: merge(state.editAction, a)
			})
		);
	}

	removeAction(a) {
		let actions = this.state.actions.filter(action => action !== a)
		const editAction = merge(baseActionState, a)
		this.setState({
			actions,
			editAction,
		});
		Actions.del(a)
	}

	addAction() {
		const action = Object.assign({ format: "TextAction" }, this.state.editAction)
		const a = actionFromJSON(action)
		Actions.post(a)
			.then(response => {
				a.id = response.id;
				this.setState({
					actions: [a, ...this.state.actions],
					editAction: baseActionState,
				});
			})
	}

	render() {
		return <div className="row">
			{ this.props.edit ?
				<CardForm
					action={this.state.editAction}
					addAction={this.addAction}
					update={this.handleActionChange}
				/>
				: ''
			}
			<CardCollection
			className="half"
			actions={this.state.actions}
			addAction={this.addAction}
			removeAction={this.removeAction}
			selectAction={this.props.select}
			edit={this.props.edit}
			>
			</CardCollection>
		</div>
	}

}

export default AllCardsView
