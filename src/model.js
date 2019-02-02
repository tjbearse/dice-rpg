
const getID = () => '_' + Math.random().toString(36).substr(2, 9);

class Die {
	// input restriction (text, expr)
	// 
	constructor(restrText) {
		this.text = restrText;
		this.id = getID()
	}

}

class Action {
	// one or more Dice
	// Effect
	// reusable or not
	constructor(name, dice, effectText, reusable=false) {
		this.name = name
		this.dice = dice
		this.effect = effectText
		this.reusable = reusable
		this.id = getID()
	}
}

export {Die, Action}
