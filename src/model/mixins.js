let idMixin = Base => class extends Base {
	constructor() {
		super()
		this.setId()
	}
	setId() {
		if (!this.id) {
			this.id = Math.random().toString(36).substr(2, 9);
		}
	}
}
class Base {}
export {Base, idMixin}
