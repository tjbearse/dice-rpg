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
					return response
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

	urlForGet() {
		return super.urlForGet()+'?_embed=dice'
	}

	deserialize (a) {
		return actionFromJSON(a);
	}
}

const Actions = new ActionsAPI()

export {
	Actions,
}
