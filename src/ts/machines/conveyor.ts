import Cell from "../cellTypes/cell";
import Machine from "./machine";
import { Tier } from "../types";

class Conveyor extends Machine {
	cell: Cell;
	throughput: number;
	next: Conveyor | null;
	last: Conveyor | null;

	constructor(
		tier: Tier,
		cell: Cell,
		last: Conveyor | null = null,
		next: Conveyor | null = null,
	) {
		super(tier);

		this.cell = cell;
		this.throughput = 60 * (2**(tier - 1));
		this.last = last;
		this.next = next;
	}

	canPlaceOn(cell: Cell): boolean {
		return cell.machine === null;
	}

	showInformation(): void {
		//TODO:
	}
}
