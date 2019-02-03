import {TextAction, Upgradable} from './model/actions';

import json from './data/cards.json';


const Actions = json.map((e) => TextAction.fromJSON(e))

export default Actions
