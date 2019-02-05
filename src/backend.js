import {actionFromJSON} from './model/actions';
import Character from './model/character';

const baseUrl = '/api/';

class API {
	constructor (url) {
		this.url = url;
	}

	serialize(e) {
		return JSON.stringify(e);
	}
	deserialize(e) {
		return JSON.parse(e);
	}

	urlForGet(id) {
		if (id) {
			return this.url + '/' + id
		}
		return this.url
	}

	urlForPost(e) {
		return this.url
	}

	getSingle(e) {
		const url = this.urlForGet(e)
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
		})
			.then(response => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then(result => this.deserialize(result))
	}

	get (e) {
		if(e) return this.getSingle(e);
		const url = this.urlForGet()
		return fetch(url, {
			method: 'GET',
			mode: 'cors',
		})
			.then(response => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then(results => results.map(r => this.deserialize(r)))
	}

	del (e) {
		const id = String(e.id)
		if (typeof id !== "string") {
			return Promise.reject(Error("id was not a string, " + id));
		}
		return fetch(this.url + '/'+ id, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.status === 200) {
					return response.json()
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
	}

	patch (e) {
		const id = String(e.id)
		const body = this.serialize(e);
		if (typeof id !== "string") {
			return Promise.reject(Error("id was not a string, " + id));
		}
		return fetch(this.url + '/'+ id, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
			},
			body,
		})
			.then(response => {
				if (response.status === 200) {
					return response.json()
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
	}

	post (e) {
		const body = this.serialize(e);
		return fetch(this.url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
			body,
		})
			.then(response => {
				if (response.status === 201) {
					return response.json()
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
	}
}

class ActionsAPI extends API {
	constructor() {
		super(baseUrl + 'actions')
	}

	deserialize (a) {
		return actionFromJSON(a);
	}
}

class CharactersAPI extends API {
	constructor() {
		super(baseUrl + 'characters')
	}

	deserialize(c) {
		return new Character(c.name, c.description, c.id);
	}
	equipment(c) {
		return new CharEquipmentAPI(c.id);
	}
}

class CharEquipmentAPI extends API {
	constructor(id) {
		super(baseUrl + 'loadouts')
		if (!id) throw Error('invalid id passed to equipment api');
		this.charId = id;
	}

	urlForGet(id) {
		if (id) {
			return super.urlForGet(id)
		}
		return baseUrl + 'characters/' + this.charId + '/loadouts?_expand=action';
	}

	deserialize(e) {
		e.action = actionFromJSON(e.action);
		return e
	}
}

const Actions = new ActionsAPI()
const Characters = new CharactersAPI()

export {
	Actions,
	Characters,
}
