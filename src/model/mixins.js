let idMixin = Base => class extends Base {
	id() {
		return Math.random().toString(36).substr(2, 9);
	}
}
class Base {}
export {Base, idMixin}
