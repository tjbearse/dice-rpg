import React, { Component } from 'react';

import Types from '../model/types';
import {dieFromJSON, DieTypes} from '../model/dice';
import Form from './form';

import {Card, FlipCard} from './cards';
import getDieComp from './die';

class DiceForm extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.props.updateEdit({
			[name]: value
		})
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
		const editDie = this.props.editDie
		const die = dieFromJSON(editDie);
		const PreviewDie = getDieComp(die);
		// TODO disable non-applicable fields
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
							<select value={this.props.editDie} onChange={this.handleChange} name="type">
								{ Object.keys(DieTypes).map((t) => <option key={t} value={t}>{t}</option>)}
							</select>
						</div>
						{
						<div>
							<label className="text"> Text:</label>
							<input type="text" onChange={this.handleChange} value={editDie.text} name="text" />
						</div>
						}
						<div>
						<label className="val"> Val:</label>
						<input type="number" step="1" onChange={this.handleChange} value={editDie.val} name="val" />
						</div>
					</div>
					<PreviewDie die={die} />
				</div>
			</div>
		)
	}
}

export default DiceForm
