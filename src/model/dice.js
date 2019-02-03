import {Base, idMixin} from './mixins';

// TODO fromJSON should set ID. Make from JSON a mixin or something?

class Die extends idMixin(Base) {
	static fromJSON(d) {
		return new Die();
	}
}

class Exact extends Die{
	constructor(n) {
		super()
		this.val = n;
	}
	static fromJSON(d) {
		return new Exact(d.val);
	}
}

class Restricted extends Die {
	constructor(text) {
		super()
		this.text = text
	}
	static fromJSON(d) {
		return new Restricted(d.text);
	}
}

class Even extends Restricted {
	constructor() {
		super("EVEN")
	}
	static fromJSON(d) {
		return new Even();
	}
}

class Odd extends Restricted {
	constructor() {
		super("Odd")
	}
	static fromJSON(d) {
		return new Odd();
	}
}

class Comparison extends Restricted {
	constructor(text, n) {
		super(text)
		this.val = n;
	}
	static fromJSON(d) {
		return new Comparison(d.text, d.val);
	}
}

class Max extends Comparison {
	constructor(n) {
		super("MAX", n)
	}
	static fromJSON(d) {
		return new Max(d.val);
	}
}

class Min extends Comparison {
	constructor(n) {
		super("MIN", n)
	}
	static fromJSON(d) {
		return new Min(d.val);
	}
}

class CountDown extends Die {
	constructor(n) {
		super()
		this.val = n;
	}
	static fromJSON(d) {
		return new CountDown(d.val);
	}
}

class Constant extends Die {
	constructor(n) {
		super()
		this.val = n;
	}
	static fromJSON(d) {
		return new Constant(d.val);
	}
}

const DieTypes = {
	Comparison,
	Constant,
	CountDown,
	Die,
	Exact,
	Max,
	Min,
	Restricted,
	Odd,
	Even,
}

function fromJSON(d) {
	switch (d.type) {
	case 'Exact':
		return Exact.fromJSON(d);
	case 'Constant':
		return Constant.fromJSON(d);
	case 'CountDown':
		return CountDown.fromJSON(d);
	case 'Die':
		return Die.fromJSON(d);
	case 'Max':
		return Max.fromJSON(d);
	case 'Min':
		return Min.fromJSON(d);
	case 'Restricted':
		return Restricted.fromJSON(d);
	case 'Odd':
		return Odd.fromJSON(d);
	case 'Even':
		return Even.fromJSON(d);
	default:
		return new Die();
	}
}

export {
	Comparison,
	Constant,
	CountDown,
	Die,
	Exact,
	Max,
	Min,
	Restricted,
	Odd,
	Even,

	DieTypes,
	fromJSON,
}
