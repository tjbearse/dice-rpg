import {Base, idMixin} from './mixins';

class Die extends idMixin(Base) {
}

class Fixed extends Die{
	constructor(n) {
		super()
		this.val = n;
	}
}

class Restricted extends Die {
	constructor(text) {
		super()
		this.text = text
	}
}

class Even extends Restricted {
	constructor() {
		super("EVEN")
	}
}

class Odd extends Restricted {
	constructor() {
		super("Odd")
	}
}

class Comparison extends Restricted {
	constructor(text, n) {
		super(text)
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

export {
	Comparison,
	Constant,
	CountDown,
	Die,
	Fixed,
	Max,
	Min,
	Restricted,
	Odd,
	Even,
}
