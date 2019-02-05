import React, { Component } from 'react';

class CharacterForm extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		if(!this.node.contains(e.target))
			this.props.submit()
	}
	componentWillMount() {
		document.addEventListener('mousedown', this.handleClick, false);
	}
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

	render() {
		const props = this.props;
		let character = props.character;
		if (!character) {
			throw Error("character not provided");
		}
		const cls = (props.className || "") + " card type-char"
		return <div ref={node => this.node = node} className={cls}>
			<input name="name" type="text" onChange={props.handleChange} value={character.name} className="name" />
			<div className="nap">
			<textarea name="description" onChange={props.handleChange} value={character.description} className="description" />
			</div>
			</div>
	}
}

export default CharacterForm
