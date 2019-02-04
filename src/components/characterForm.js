import React, { Component } from 'react';
import InterpText from './interpText';
import {Characters} from '../backend';
import Form from './form';

function CharacterForm(props) {
	let character = props.character;
	if (!character) {
		throw Error("character not provided");
	}
	const cls = (props.className || "") + " card type-char"
	return <div className={cls}>
			<input name="name" type="text" onChange={props.handleChange} value={character.name} className="name" />
			<div className="nap">
				<textarea name="description" onChange={props.handleChange} value={character.description} className="description" />
			</div>
		</div>
}

export default CharacterForm
