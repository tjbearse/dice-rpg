import {Base, idMixin} from './mixins';
import {dieFromJSON} from './dice';

class Action extends idMixin(Base) {
	// one or more Dice
	// Effect
	// reusable or not
	constructor(name, type, dice) {
		super()
		if (typeof name !== "string") throw Error("name is not a string");
		if (typeof type !== "string") throw Error("type is not a string");
		if (typeof dice !== "object") throw Error("dice is not an array");
		this.name = name
		this.dice = dice
		this.type = type
	}

	getEffectText() {
		return '';
	}
	getReusableText() {
		return '';
	}
}

// TODO change to "Flipable" or two sided
class Upgradable extends idMixin(Base) {
	constructor(base, upgrade) {
		super()
		this.actions = [base, upgrade];
	}
}

class TextAction extends Action {
	constructor(name='', type='', effect='', reusable='', dice=[]) {
		super(name, type, dice)
		if (typeof effect !== "string") throw Error("effect is not a string");
		if (typeof reusable !== "string") throw Error("reusable is not a string");
		this.effect = effect;
		this.reusable = reusable;
	}

	getEffectText() {
		return this.effect;
	}

	getReusableText() {
		return this.reusable;
	}

	static fromJSON(json) {
		let dice = json.dice || []
		let a = new TextAction(json.name, json.type, json.effect, json.reusable, dice.map(dieFromJSON))
		if (json.id)
			a.id = json.id
		return a;
	}
}

const ActionTypes = {
	TextAction,
}

// FIXME ID not propagated
function actionFromJSON(a) {
	if (!(a.format in ActionTypes)) {
		a.format = 'TextAction';
		// throw Error(a.format + " not in ActionTypes");
	}
	return ActionTypes[a.format].fromJSON(a)
}

export {
	Action,
	TextAction,
	Upgradable,
	actionFromJSON,
}
