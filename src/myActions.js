import {TextAction, Upgradable} from './model/actions';
import {Die, Constant, Fixed, Max, Min, CountDown, Even, Odd} from './model/dice';

const Actions = [
	new TextAction("Sword of a Fuckton of Testing", "a", [...Array(5).keys()].map(() => new Die("7")), "Insta death"),
	new Upgradable(
		new TextAction("Reusable Flip Sword", "b", [new CountDown(7)], "1 Damage", "reusable"),
		new TextAction("Reusable Flip Sword+", "b", [new CountDown(7)], "1 Damage", "reusable"),
	),
	new Upgradable(
		new TextAction("Flip Sword", "b", [new CountDown(7)], "1 Damage"),
		new TextAction("Flip Sword+", "b", [new CountDown(7)], "1 Damage"),
	),
	new TextAction("Sword of Testing", "b", [new CountDown(7)], "1 Damage"),
	new TextAction("Sword of Double Testing", "c", [new Even(2), new Fixed(3)], "4 Damage"),


	new TextAction("Vorpal Sword", "a", [new Die(), new Constant(3), new Fixed(4), new Max(3), new Odd(), new CountDown(3)], "[ ] Damage", "Reuse all the time"),
	new TextAction("Vorpal Sword", "b", [new Die(), new Constant(3), new Fixed(4), new Min(3), new Odd(), new CountDown(3)], "[ ] Damage", "Reuse all the time"),
	new TextAction("Vorpal Sword", "c", [new Die(), new Constant(3), new Fixed(4), new Max(3), new Odd(), new CountDown(3)], "[ ] Damage", "Reuse all the time"),
	new TextAction("Vorpal Sword", "d", [new Die(), new Constant(3), new Fixed(4), new Max(3), new Odd(), new CountDown(3)], "[ ] Damage", "Reuse all the time"),
	new TextAction("Vorpal Sword", "e", [new Die(), new Constant(3), new Fixed(4), new Min(3), new Odd(), new CountDown(3)], "[ ] Damage", "Reuse all the time"),
	new TextAction("Vorpal Sword", "f", [new Die(), new Constant(3), new Fixed(4), new Max(3), new Odd(), new CountDown(3)], "[ ] Damage", "Reuse all the time"),
	new TextAction("Boots of Fixed Values", "c", [...Array(6).keys()].map((i) => new Fixed(i+1)), "4 D, typeamage"),
]

export default Actions
