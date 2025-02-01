import Cell from "../cellTypes/cell";
import { MachineType, ResourceType, Tier } from "../types";
import Machine from "./machine";

class Storage extends Machine {
	cell: Cell;
	capacity: number;

	constructor(tier: Tier, cell: Cell) {
		super(tier, MachineType.STORAGE)
		this.cell = cell;
		this.capacity = 200 * tier;
	}

	showInformation(): void {
		//TODO:
	}

	canPlaceOn(cell: Cell): boolean {
	    return cell.machine !== null;
	}
}

export default Storage;
