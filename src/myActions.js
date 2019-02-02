import {Action} from './actions';
import {Die} from './dice.js';

const Actions = [
	new Action("sword of testing", [new Die("max 3")], "1 Damage"),
	new Action("sword of double testing", [new Die("7"), new Die("min 3")], "4 Damage"),
	new Action("sword of triple testing", [new Die("7"), new Die("min 3"), new Die("min 3")], "4 Damage"),
	new Action("sword of a fuckton of testing", Array(5).fill(new Die("7")), "Insta death"),
]

export default Actions
