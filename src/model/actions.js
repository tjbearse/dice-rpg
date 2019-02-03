import {Base, idMixin} from './mixins';

class Action extends idMixin(Base) {
	// one or more Dice
	// Effect
	// reusable or not
	constructor(name, type, dice) {
		if (!typeof name === "string") throw Error("name is not a string");
		if (!typeof type === "string") throw Error("type is not a string");
		if (!typeof dice === "array") throw Error("dice is not an array");
		super()
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

class Upgradable extends idMixin(Base) {
	constructor(base, upgrade) {
		super()
		this.actions = [base, upgrade];
	}
}

class TextAction extends Action {
	constructor(name, type, dice, effect, reusable='') {
		super(name, type, dice)
		this.effect = effect;
		this.reusable = reusable;
	}

	getEffectText() {
		return this.effect;
	}

	getReusableText() {
		return this.reusable;
	}

}

export {Action, TextAction, Upgradable}
