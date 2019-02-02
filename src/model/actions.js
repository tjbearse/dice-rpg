const getID = () => 'action_' + Math.random().toString(36).substr(2, 9);

class Action {
	// one or more Dice
	// Effect
	// reusable or not
	constructor(name, dice) {
		this.name = name
		this.dice = dice
		this.id = getID()
	}

	getEffectText() {
		return '';
	}
	getReusableText() {
		return '';
	}
}

class TextAction extends Action {
	constructor(name, dice, effect, reusable='') {
		super(name, dice)
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
