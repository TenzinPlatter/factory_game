import { GRIDSIZE } from "./globals";

type Tier = 1 | 2 | 3;

type BuildCostData = [ResourceType, number];

enum ResourceType {
	GRASS = "Grass",
	IRON = "Iron",
	COPPER = "Copper",
}

enum MachineType {
	MINER,
	CONVEYOR,
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

export {
	Coordinate,
	ResourceType,
	Tier,
	MachineType,
	BuildCostData,
};
