import React, { Component } from 'react';

import Types from '../model/types';
import {dieFromJSON, DieTypes} from '../model/dice';
import Form from './form';

import {Card, FlipCard} from './cards';
import getDieComp from './die';
import DiceForm from './diceForm';

class CardForm extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDiceChange = this.handleDiceChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEditDieChange = this.handleEditDieChange.bind(this);
	}

	// for ongoing edits
	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.props.update({
			[name]: value
		})
	}

	handleDiceChange(dice) {
		this.props.update({
			dice
		})
	}
	// in progress dice edit
	handleEditDieChange(die) {
		const merge = (a, b) => Object.assign({}, a, b);
		const ed = this.props.action.editDie;
		this.props.update({
			editDie: merge(ed, die)
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.addAction()
	}

	render() {
		const action = this.props.action
		const cls = (this.props.className || '') + " card form type-"+action.type
		const update = this.handleChange
		return (
			<form onSubmit={this.handleSubmit} >
				<div className={cls}>
					<input className="Name" placeholder="Name" type="text" onChange={update} value={action.name} name="name" />
					<div className="nap">
						<DiceForm
							dice={action.dice}
							editDie={action.editDie}
							updateEdit={this.handleEditDieChange}
							handleDiceChange={this.handleDiceChange}
						/>
						<input placeholder="Effect" className="effect" type="text" onChange={update} value={action.effect} name="effect" />
						<input placeholder="Reuse" className="reuse" type="text" onChange={update} value={action.reusable} name="reusable" />
						<div className="row">
							<select value={action.type} onChange={update} name="type">
								{ Object.keys(Types).map((t) => <option key={t} value={Types[t]}>{t}</option>)}
							</select>
							<input type="submit" value="Submit" />
						</div>
					</div>
				</div>
			</form>
		);
	}
}


export default CardForm
