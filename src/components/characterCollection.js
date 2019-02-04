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
	}

	componentDidMount() {
		Characters.get()
			.then(characters => {
				this.setState({
					characters
				})
			}
			)
	}

	render () {
		const chars = this.state.characters || [];
		const select = this.props.select || (() => {});
		return <div className="cards">
			{chars.map((c, i) => (
				<Character
					onClick={()=>{select(c)}}
					character={c}
					key={i}
				/>
			))}
		</div>
	}
}

export default CharacterCollection
