import {actionFromJSON} from './model/actions';

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

	urlForGet() {
		return this.url
	}

	urlForPost() {
		return this.url
	}

	get () {
		return fetch(this.urlForGet(), {
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

	del (id) {
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

	post (e) {
		const body = this.serialize(e);
		return fetch(this.url, {
			method: 'POST',
			mode: 'cors',
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
	del (a) {
		return super.del(String(a.id))
	}
}

const Actions = new ActionsAPI()

export {
	Actions,
}
