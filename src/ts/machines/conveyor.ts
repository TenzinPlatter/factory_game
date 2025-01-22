import Cell from "../cellTypes/cell";
import Machine from "./machine";

type Tier = 1 | 2 | 3;

class Conveyor extends Machine {
	tier: Tier;
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
		super();

		this.tier = tier;
		this.cell = cell;
		this.throughput = 60 * (2**(tier - 1));
		this.last = last;
		this.next = next;
	}

	interact(): void {
		this.showInformation()
	}

	showInformation(): void {
		//TODO:
	}
}
