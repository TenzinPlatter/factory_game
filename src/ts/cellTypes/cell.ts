import Resource from "../resource";
import { Coordinate } from "../types";
import Machine from "../machines/machine";

type Tier = 1 | 2 | 3;

abstract class Cell {
	resource: Resource;
	coordinate: Coordinate;
	machine: Machine | null;

	constructor(location: Coordinate, resource: Resource) {
		this.coordinate = location;
		this.resource = resource;
		this.machine = null
	}

	placeMachine(machine: Machine) {
		if (this.machine === null) {
			this.machine = machine;
		}
	}
}

abstract class Ore extends Cell {
	tier: Tier;

	constructor(location: Coordinate, resource: Resource) {
		super(location, resource);
		this.tier = Math.floor(Math.random() * 3 + 0.5) as Tier;
	}
}

export default Cell;
export { Ore };
