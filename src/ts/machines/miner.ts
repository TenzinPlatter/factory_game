import { Ore } from "../cellTypes/cell";
import { STACKSIZE } from "../globals";
import Machine from "./machine";
import { Tier } from "../types";

class Miner extends Machine {
	miningRate: number;
	tier: Tier;
	cell: Ore;
	amountStored: number = 0;
	maxStorage: number = STACKSIZE;

	constructor(tier: Tier, cell: Ore) {
		if (cell.machine != null) {
			throw new Error("Cannot place machine on ore with another machine");
		}

		super();
		this.tier = tier;
		this.miningRate = 60 * (2**(tier - 1));
		this.cell = cell;
	}

	static canPlace(cell: Ore): boolean {
	    return (
				cell.machine != null
			);
	}

	interact(): void {
		const timePassed = performance.now() - this.timeLastClicked;
		this.timeLastClicked = performance.now();

		// TODO: adjust to also account for output onto conveyor belts

		// mining rate X node "purity" X time passed in seconds since machine last viewed
		const resourcesGained = (
			this.miningRate * (this.cell.tier / 2) * timePassed / 1000
		);

		this.amountStored = Math.max(
			this.amountStored + resourcesGained,
			this.maxStorage
		);

		this.showInformation();
	}

	showInformation(): void {
	    
	}
}

export default Miner;
