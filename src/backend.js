import {actionFromJSON} from './model/actions';

const baseUrl = '/api/';

function getActions() {
	return fetch(baseUrl + 'actions?_embed=dice', {
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
		.then(actions => actions.map(a => actionFromJSON(a)))
}

export {
	getActions
}
