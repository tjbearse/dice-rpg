import React, { Component } from 'react';
import './App.scss';
import getDieComp from './components/die';

class App extends Component {
	render() {
		let actions = this.props.actions || []
		return (<div className="cards">
				{ actions.map( a => <Card action={a} key={a.id}/> ) }
				</div>);
	}
}

class Card extends Component {
	render() {
		let action = this.props.action;
		console.log(action);
		if (!action) {
			return ''
		}
		let reusable = action.getReusableText();
		return (
			// TODO color switching
			<div className={"card type-"+ action.type}>
				<p className="name">
					{ action.name }
				</p>
				<div className="nap">
					<div className="dice">
						{ action.dice.map( d => {
							let D = getDieComp(d);
							return <D die={d} key={d.id}/>
										}) }
						<p className="effect">
							{action.getEffectText()}
						</p>
					</div>
					{ reusable && <p className="reuse"> { reusable } </p> }
				</div>
			</div>
		);
	}
}



export default App;
