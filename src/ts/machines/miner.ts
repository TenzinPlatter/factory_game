import Cell from "../cellTypes/cell";
import { Ore } from "../cellTypes/cell";
import { STACKSIZE } from "../globals";
import Machine from "./machine";
import { ResourceType, Tier } from "../types";

class Miner extends Machine {
	miningRate: number;
	cell: Ore;
	amountStored: number = 0;
	maxStorage: number = STACKSIZE;

	constructor(tier: Tier, cell: Ore) {
		if (cell.machine != null) {
			throw new Error("Cannot place machine on ore with another machine");
		}

		super(tier);
		this.miningRate = 60 * (2**(tier - 1));
		this.cell = cell;
	}

	canPlaceOn(cell: Cell): boolean {
	    return cell.machine != null && cell.resource.type != ResourceType.GRASS;
	}

	showInformation(): void {
	    
	}
}

export default Miner;
