import { GRIDSIZE } from "./globals";
import Cell from "./cellTypes/cell";

type Tier = 1 | 2 | 3;

enum resourceType {
	Grass = "Grass",
	Iron = "Iron",
	Copper = "Copper",
}

class Coordinate {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		if (x < 0 || x >= GRIDSIZE) {
			throw new Error(`Invalid X coordinate: ${x}`);
		}

		if (y < 0 || y >= GRIDSIZE) {
			throw new Error(`Invalid Y coordinate: ${y}`);
		}

		this.x = x;
		this.y = y;
	}
}

class CellData {
	HTMLPointer: HTMLElement;
	cell: Cell;

	constructor(cell: Cell, element: HTMLElement) {
		this.cell = cell;
		this.HTMLPointer = element;
	}
}

export {
	Coordinate,
	resourceType,
	CellData,
	Tier
};
