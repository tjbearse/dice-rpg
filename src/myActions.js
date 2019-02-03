import {TextAction} from './model/actions';
import {Die, Constant, Fixed, Max, Min, CountDown, Even, Odd} from './model/dice';

const Actions = [
	new TextAction("+1 Sword", "a", [new Die(), new Constant(3)], "[ ] Damage"),
	new TextAction("Sword of Testing", "b", [new Max(3)], "1 Damage", "Reusable Twice"),
	new TextAction("Sword of Testing", "c", [new CountDown(7)], "1 Damage"),
	new TextAction("Sword of Double Testing", "a", [new Even(2), new Fixed(3)], "4 Damage"),
	new TextAction("Sword of Triple Testing", "b", [new Odd("7"), new Min(3), new Min(3)], "4 Damage"),
	new TextAction("Sword of a Fuckton of Testing", "c", [...Array(5).keys()].map(() => new Die("7")), "Insta death"),
	new TextAction("Boots of Fixed Values", "d", [...Array(6).keys()].map((i) => new Fixed(i+1)), "4 D, typeamage"),
]

export default Actions
