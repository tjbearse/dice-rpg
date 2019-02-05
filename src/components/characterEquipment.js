import React, { Component } from 'react';
import {Characters, Actions} from '../backend';
import CardCollection from './cardCollection';
import AllCardsView from './allCardsView';
import Equipment from '../model/equipment';
import CardForm from './cardForm';
import EditableCharacter from './editableCharacter';

class CharacterEquipment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			equipped: [],
			character: null
		}
		this.equipAction = this.equipAction.bind(this);
		this.unequipAction = this.unequipAction.bind(this);
		this.addAction = this.addAction.bind(this);
		this.updateCharacter = this.updateCharacter.bind(this);
	}

	componentDidMount() {
		if(!this.props.characterId) throw Error('no character selected');
		Characters.get(this.props.characterId)
			.then((c) => {
				this.setState({
					character: c
				})
				return c;
			}).then((c) => {
				return Characters.equipment(c).get()
			})
			.then(equipped => {
				this.setState({
					equipped,
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
		let e = new Equipment(this.state.character, a)
		Characters.equipment(this.state.character)
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
		Characters.equipment(this.state.character).del(e)
	}

	updateCharacter(c) {
		const unchanged = Object.keys(c).every((k) => c[k] === this.state.character[k])
		if (unchanged) return
		Characters.patch(c)
			.then((c) => {
				this.setState({ character: c })
			});
	}

	// character
	// close
	render () {
		const character = this.state.character
		const action = this.state.equipped.map(e => e.action)
		if (!character) return ''
		return <div>
			<div className="character-equipment">
				<EditableCharacter updateCharacter={this.updateCharacter} character={character} />
				<CardCollection
					className=""
					actions={action}
					addAction={this.equipAction}
					removeAction={this.unequipAction}
					edit={true}
				>
				</CardCollection>
			</div>
			<hr/>
			<AllCardsView edit={true} select={this.equipAction} />
		</div>
	}
}

export default CharacterEquipment
