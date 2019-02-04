import {Base, idMixin} from './mixins';

class Character extends idMixin(Base) {
	constructor(name='', description='', id='') {
		super(id);
		this.name = name
		this.description = description
	}
}

export default Character
