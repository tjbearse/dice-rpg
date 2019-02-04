import React, { Component } from 'react';

import {actionFromJSON} from '../model/actions';
import Types from '../model/types';
import {dieFromJSON, DieTypes} from '../model/dice';
import Form from './form';

import {Card, FlipCard} from './cards';
import getDieComp from './die';

class DiceForm extends Form {
	constructor(props) {
		super(props);
		this.state = {
			"type": "Die",
			"val": 1,
			"text": "",
		};
	}

	addDie(d) {
		this.props.handleDiceChange([d, ...this.props.dice])
	}
	// TODO populate form?
	removeDie(target) {
		let dice = this.props.dice.filter((d) => d!==target)
		this.props.handleDiceChange(dice);
	}

	render() {
		let die = dieFromJSON(this.state);
		let PreviewDie = getDieComp(die);
		return (
			<div className="dice">
				{ this.props.dice.map( d => {
						let D = getDieComp(d);
						return <D die={d} onClick={(e) => this.removeDie(d)} key={d.id}/>
					})
				}
				<div className="dice-form">
					<div className="dice-fields">
						<div>
							<button type="button" onClick={(e) => this.addDie(die)}>+</button>
							<select value={this.state.type} onChange={this.handleChange} name="type">
								{ Object.keys(DieTypes).map((t) => <option key={t} value={t}>{t}</option>)}
							</select>
						</div>
						<div>
							<label className="text"> Text:</label>
							<input type="text" onChange={this.handleChange} value={this.state.text} name="text" />
						</div>
						<div>
						<label className="val"> Val:</label>
						<input type="number" step="1" onChange={this.handleChange} value={this.state.val} name="val" />
						</div>
					</div>
					<PreviewDie die={die} />
				</div>
			</div>
		)
	}
}

class CardForm extends Form {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			type: Types.Attack,
			dice: [],
			effect: "",
			reusable: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDiceChange = this.handleDiceChange.bind(this);
	}

	handleDiceChange(dice) {
		this.setState({dice});
	}

	// TODO clear/change content on submit
	handleSubmit(event) {
		event.preventDefault();
		let action = Object.assign({ format: "TextAction" }, this.state)
		// FIXME this is not all JSON, particularly dice
		let actionObj = actionFromJSON(action)
		// TODO handle illformed actions nicely
		console.log('send it');
		this.props.addAction(actionObj)
	}

	render() {
		const cls = (this.props.className || '') + " card form type-"+this.state.type
		return (
			<form onSubmit={this.handleSubmit} >
				<div className={cls}>
					<input className="Name" placeholder="Name" type="text" onChange={this.handleChange} value={this.state.name} name="name" />
					<div className="nap">
						<DiceForm dice={this.state.dice} handleDiceChange={this.handleDiceChange} />
						<input placeholder="Effect" className="effect" type="text" onChange={this.handleChange} value={this.state.effect} name="effect" />
						<input placeholder="Reuse" className="reuse" type="text" onChange={this.handleChange} value={this.state.reusable} name="reusable" />
						<div className="row">
							<select value={this.state.type} onChange={this.handleChange} name="type">
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
