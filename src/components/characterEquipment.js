import React, { Component } from 'react';
import {Characters, Actions} from '../backend';
import Character from './character';
import CardCollection from './cardCollection';
import AllCardsView from './allCardsView';
import Equipment from '../model/equipment';
import CardForm from './cardForm';


class CharacterEquipment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			equipped: [],
		}
		this.equipAction = this.equipAction.bind(this);
		this.unequipAction = this.unequipAction.bind(this);
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
				const equipped = [e, ...this.state.equipped];
				this.setState({ equipped })
			});
	}
	unequipAction(a) {
		let equipped = this.state.equipped;
		const e = equipped.find((e) => a.id === e.actionId)
		equipped = equipped.filter((eq) => e.id !== eq.id)
		this.setState({ equipped });
		Characters.equipment(this.props.character).del(e)
	}

	// character
	// close
	render () {
		const character = this.props.character
		const action = this.state.equipped.map(e => e.action)
		return <div>
			<div className="character-equipment">
				<div>
					<Character className="full" character={character} />
				</div>
				<CardCollection
					className="half"
					actions={action}
					addAction={this.equipAction}
					removeAction={this.unequipAction}
					edit={true}
				>
					<CardForm className="half" addAction={this.props.addAction} />
				</CardCollection>
			</div>
			<hr/>
			<AllCardsView edit={false} select={this.equipAction} />
		</div>
	}
}

export default CharacterEquipment
