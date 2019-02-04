import {Base, idMixin} from './mixins';

class Equipment extends idMixin(Base) {
	constructor(character, action, id='') {
		super(id);
		this.actionId = action.id
		this.action = action
		this.characterId = character.id
	}
}

export default Equipment
