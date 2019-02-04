import React, { Component } from 'react';
import {Card, FlipCard} from './cards';
import {Upgradable} from '../model/actions';
// actions
// addAction
// removeAction
function CardCollection(props) {
	let actions = props.actions || []
	// TODO card list manages card form state?
	const rm = (a)=>( props.edit? ()=>props.removeAction(a) : undefined )
	const clickFn = (a)=>( props.selectAction? ()=>props.selectAction(a) : undefined )

	const cls = (props.className || "") + " cards"
	return (
			<div className={cls}>
			{ props.children }
			{ actions.map( a => {
				if (a instanceof Upgradable)
					return <FlipCard actionPair={a} key={a.id}/>
					else
						return <Card onClick={clickFn(a)}
							remove={rm(a)}
							action={a}
							key={a.id}
						/>
			})}
			</div>
	);
}

export default CardCollection
