import React, { Component } from 'react';
import {Characters, Actions} from '../backend';
import Character from './character';
import CardCollection from './cardCollection';
import AllCardsView from './allCardsView';
import Equipment from '../model/equipment';
import CardForm from './cardForm';
import CharacterForm from './characterForm';


class EditableCharacter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
			character: {},
		}
		this.update = this.update.bind(this);
		// this.submit = this.submit.bind(this);
	}
	// FIXME this whole thing is just a little funky
	// TODO submit / finish, should be delegated upwards?
	// TODO allow delete
	update(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState((state) => ({
			character: Object.assign({}, state.character, { [name]: value })
		}))
	}
	render () {
		const character = this.props.character;
		const startEdit = ()=>{this.setState({ editing: true })}
		const newChar = Object.assign({}, character, this.state.character);
		console.log(newChar, character, this.state.character);

		return this.state.editing?
					<CharacterForm handleChange={this.update} character={newChar} /> :
					<Character onClick={startEdit} character={character} />
	}
}

class CharacterEquipment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			equipped: [],
		}
		this.equipAction = this.equipAction.bind(this);
		this.unequipAction = this.unequipAction.bind(this);
		this.addAction = this.addAction.bind(this);
	}

	componentDidMount() {
		Characters.equipment(this.props.character).get()
			.then(equipped => {
				this.setState({
					equipped
				})
			})
	}

	addAction(a) {
		Actions.post(a)
			.then(response => {
				a.id = response.id;
				this.equipAction(a)
			})
	}

	equipAction(a) {
		let e = new Equipment(this.props.character, a)
		console.log('equip', e);
		Characters.equipment(this.props.character)
			.post(e)
			.then((resp) => {
				e.id = resp.id
				this.setState((state)=>({
					equipped: [e, ...state.equipped]
				}))
			});
	}
	unequipAction(a) {
		let equipped = this.state.equipped;
		const e = equipped.find((e) => a.id === e.actionId)
		this.setState((state) => ({
			equipped: state.equipped.filter((eq) => e.id !== eq.id),
		}));
		Characters.equipment(this.props.character).del(e)
	}

	// character
	// close
	render () {
		const character = this.props.character
		const action = this.state.equipped.map(e => e.action)
		return <div>
			<div className="character-equipment">
				<EditableCharacter character={character} />
				<CardCollection
					className="half"
					actions={action}
					addAction={this.equipAction}
					removeAction={this.unequipAction}
					edit={true}
				>
					<CardForm className="half" addAction={this.addAction} />
				</CardCollection>
			</div>
			<hr/>
			<AllCardsView edit={false} select={this.equipAction} />
		</div>
	}
}

export default CharacterEquipment
