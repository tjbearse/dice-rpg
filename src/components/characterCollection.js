import React, { Component } from 'react';
import InterpText from './interpText';
import {Characters} from '../backend';
import Character from './character';

class CharacterCollection extends Component {
	constructor(props) {
		super(props)
		this.state = {
			characters: null,
		}
		this.addCharacter = this.addCharacter.bind(this);
	}

	addCharacter() {
		Characters.post()
			.then(character => {
				this.props.select(character.id);
			})
	}

	componentDidMount() {
		Characters.get()
			.then(characters => {
				this.setState({
					characters
				})
			})
	}

	render () {
		const chars = this.state.characters || [];
		const select = this.props.select ? (c)=>{this.props.select(c.id)} : () => {};
		return <CharacterList className="half" select={select} characters={chars} >
			<div onClick={this.addCharacter}>+</div>
			</CharacterList>
	}
}

function CharacterList (props) {
	const chars = props.characters || [];
	const cls = (props.className || '') + " cards"
	return <div className={cls}>
		{ props.children }
		{chars.map((c, i) => (
			<Character
				onClick={()=>{props.select(c)}}
				character={c}
				key={i}
			/>
		))}
	</div>
}

export default CharacterCollection
