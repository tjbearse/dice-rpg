
const getID = () => 'die_' + Math.random().toString(36).substr(2, 9);

class Die {
	constructor() {
		this.id = getID()
	}
}

class Fixed extends Die{
	constructor(n) {
		super()
		this.val = n;
	}
}

class Comparison extends Die {
	constructor(text, n) {
		super()
		this.text = text;
		this.val = n;
	}
}

class Max extends Comparison {
	constructor(n) {
		super("MAX", n)
	}
}

class Min extends Comparison {
	constructor(n) {
		super("MIN", n)
	}
}

class CountDown extends Die {
	constructor(n) {
		super()
		this.val = n;
	}
}

class Constant extends Die {
	constructor(n) {
		super()
		this.val = n;
	}
}

/* TODO
   - Constant val
   - Even / Odd
*/

export {
	Comparison,
	Constant,
	CountDown,
	Die,
	Fixed,
	Max,
	Min,
}
