const getID = () => 'action_' + Math.random().toString(36).substr(2, 9);

class Action {
	// one or more Dice
	// Effect
	// reusable or not
	constructor(name, type, dice) {
		if (!typeof name === "string") throw Error("name is not a string");
		if (!typeof type === "string") throw Error("type is not a string");
		if (!typeof dice === "array") throw Error("dice is not an array");
		this.name = name
		this.dice = dice
		this.id = getID()
		this.type = type
	}

	getEffectText() {
		return '';
	}
	getReusableText() {
		return '';
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

export {Action, TextAction}
