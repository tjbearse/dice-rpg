import React, { Component } from 'react';
import CharacterForm from './characterForm';

import Character from './character';

class EditableCharacter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
			character: { id: this.props.character.id },
		}
		this.update = this.update.bind(this);
		this.submit = this.submit.bind(this);
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
	submit() {
		this.props.updateCharacter(this.state.character)
		this.setState({
			editing: false,
			character: { id: this.props.character.id },
		});
	}
	render () {
		const character = this.props.character;
		const startEdit = ()=>{this.setState({ editing: true })}
		const newChar = Object.assign({}, character, this.state.character);

		return this.state.editing?
					<CharacterForm submit={this.submit} handleChange={this.update} character={newChar} /> :
					<Character onClick={startEdit} character={character} />
	}
}
export default EditableCharacter
