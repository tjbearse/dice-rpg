import React, { Component } from 'react';

import {Upgradable} from '../model/actions';
import getDieComp from './die';
import InterpText from './interpText';

class Card extends Component {
	render() {
		let action = this.props.action;
		if (!action) {
			throw Error("action not provided");
		}
		let reusable = action.getReusableText();
		const cls = this.props.className || "" + " card type-"+action.type
		const remove = (e) => {
			e.preventDefault()
			this.props.remove(e)
		}
		return (
			<div onClick={this.props.onClick} className={cls}>
				{ this.props.remove ? <div className="delete" onClick={this.props.remove}>x</div> : undefined }
				<p className="name">
					{ action.name }
				</p>
				<div className="nap">
					<div className="dice">
						{ action.dice.map( d => {
								let D = getDieComp(d);
							return <D die={d} key={d.id}/>
							})
						}
						<InterpText className="effect" text ={action.getEffectText()} />
					</div>
					{ reusable && <p className="reuse"> { reusable } </p> }
				</div>
			</div>
		);
	}
}

class FlipCard extends Component {
	render() {
		let actionPair = this.props.actionPair;
		if (!actionPair || !actionPair instanceof Upgradable)
			throw Error("Flip card without 2 actions");

		let base = actionPair.actions[0];
		let upgrade = actionPair.actions[1];
		return (
			<div className="flip">
				<Card action={base}/>
				<Card className="flipped" action={upgrade} />
			</div>
		);
	}
}

export {Card, FlipCard}
