import {Base, idMixin} from './mixins';

// TODO fromJSON should set ID. Make from JSON a mixin or something?

class Die extends idMixin(Base) {
	constructor() {
		super()
		this.type = this.constructor.name
	}
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

function dieFromJSON(d) {
	// FIXME this isn't technically right, change use of fn?
	if (d.constructor && d.constructor.name in DieTypes)
		return d;
	if (!d.type || !(d.type in DieTypes))
		return Die.fromJSON(d);
	return DieTypes[d.type].fromJSON(d);
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
	dieFromJSON,
}
