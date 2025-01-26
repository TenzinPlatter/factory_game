import Cell from "../cellTypes/cell";
import { MachineType, Tier } from "../types";

abstract class Machine {
	tier: Tier;
	type: MachineType;

	constructor(tier: Tier, type: MachineType) {
		this.tier = tier;
		this.type = type;
	}

	abstract showInformation(): void;
	abstract canPlaceOn(cell: Cell): boolean;
}

export default Machine;
