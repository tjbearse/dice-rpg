let idMixin = Base => class extends Base {
	constructor(id='') {
		// TODO variadic fill super
		super()
		this.id = id || Math.random().toString(36).substr(2, 9);
	}
}
class Base {}
export {Base, idMixin}
