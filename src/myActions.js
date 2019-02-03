import {TextAction, Upgradable} from './model/actions';
import {fromJSON} from './model/dice';

import json from './data/cards.json';


const Actions = json.map((e) => new TextAction(e.name, e.type, e.effect, e.reusable, e.dice.map(fromJSON)))

export default Actions
