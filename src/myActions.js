import {Action, TextAction} from './model/actions';
import {Die} from './model/dice.js';

const Actions = [
	new TextAction("Sword of Testing", [new Die("max 3")], "1 Damage", "Twice"),
	new Action("sword of testing", [new Die("max 3")], "1 Damage"),
	new Action("sword of double testing", [new Die("7"), new Die("min 3")], "4 Damage"),
	new Action("sword of triple testing", [new Die("7"), new Die("min 3"), new Die("min 3")], "4 Damage"),
	new Action("sword of a fuckton of testing", Array(5).fill(new Die("7")), "Insta death"),
]

export default Actions
