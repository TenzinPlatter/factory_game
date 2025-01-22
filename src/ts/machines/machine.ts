import Cell from "../cellTypes/cell";

abstract class Machine {
	timeLastClicked: number = performance.now();

	abstract interact(): void;

	abstract showInformation(): void;

	static canPlace(cell: Cell): boolean {
		throw new Error("Method not implemented");
	}
}

export default Machine;
