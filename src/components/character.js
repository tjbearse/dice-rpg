import React, { Component } from 'react';
import InterpText from './interpText';
import {Characters} from '../backend';

function Character(props){
	let character = props.character;
	if (!character) {
		throw Error("character not provided");
	}
	const cls = (props.className || "") + " card type-char"
	return <div onClick={props.onClick} className={cls}>
				<p className="name">
					{ character.name }
				</p>
				<div className="nap">
					<InterpText className="description" text={character.description} />
				</div>
			</div>
}


export default Character
