import Cell from "../cellTypes/cell";
import { Tier } from "../types";

abstract class Machine {
	tier: Tier;

	constructor(tier: Tier) {
		this.tier = tier;
	}

	abstract showInformation(): void;
	abstract canPlaceOn(cell: Cell): boolean;
}

export default Machine;
