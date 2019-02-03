let idMixin = Base => class extends Base {
	constructor() {
		super()
		this.id()
	}
	id() {
		if (!this._id) {
			this._id = Math.random().toString(36).substr(2, 9);
		}
		return this._id
	}
}
class Base {}
export {Base, idMixin}
