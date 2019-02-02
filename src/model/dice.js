
const getID = () => 'die_' + Math.random().toString(36).substr(2, 9);

class Die {
	// input restriction (text, expr)
	// 
	constructor(restrText) {
		this.text = restrText;
		this.id = getID()
	}

}

export {Die}
