import React, { Component } from 'react';
import './App.scss';
import CharacterCollection from './components/characterCollection';
import CharacterEquipment from './components/characterEquipment';
import AllCardsView from './components/allCardsView';


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			view: 'character',
			characterId: null,
		}
	}
	render() {
		return <div>
			<div className="header" >
			    <a onClick={()=> { this.setState({ view: 'character', characterId: null }) }}>Character</a>
			    <a onClick={()=> { this.setState({ view: 'all' }) }}>All</a>
			</div>
			<hr/>
			{ this.state.view === 'character' ?
			    ( this.state.characterId === null ?
				<CharacterCollection select={(characterId)=>{this.setState({characterId})}} />
				: <CharacterEquipment characterId={this.state.characterId} />
			    )
			  : <AllCardsView edit={true}/> }
		</div>
	}
}

/* TODO
   - Group
   - Half card / compact view?
*/



export default App
