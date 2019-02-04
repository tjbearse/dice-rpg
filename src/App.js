import React, { Component } from 'react';
import './App.scss';
import CharacterCollection from './components/characterCollection';
import CharacterEquipment from './components/characterEquipment';
import AllCardsView from './components/allCardsView';


class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			view: 'character'
		}
	}
	render() {
		return <div>
			<a onClick={()=> { this.setState({ view: 'character' }) }}>Character</a>
			<a onClick={()=> { this.setState({ view: 'all' }) }}>All</a>
			<hr/>
			{ this.state.view === 'character' ? <CharacterView /> : <AllCardsView edit={true}/> }
		</div>
	}
}

class CharacterView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			character: null,
		}
	}

	// TODO move close up here?, share header?
	render() {
		if (!this.state.character)
			return <CharacterCollection select={(character)=>{this.setState({character})}} />
		else
			return <CharacterEquipment character={this.state.character} close={()=>{this.setState({character: null})}} />
			
	}
}


/* TODO
   - Group
   - Half card / compact view?
*/



export default App
