import Resource from "../resource";
import { Coordinate, Tier } from "../types";
import Machine from "../machines/machine";

abstract class Cell {
	resource: Resource;
	coordinate: Coordinate;
	machine: Machine | null;
	element: HTMLElement;

	constructor(location: Coordinate, resource: Resource, element: HTMLElement) {
		this.coordinate = location;
		this.resource = resource;
		this.machine = null
		this.element = element;
	}

	placeMachine(machine: Machine) {
		if (this.machine === null) {
			this.machine = machine;
		}
	}
}

abstract class Ore extends Cell {
	tier: Tier;

	constructor(location: Coordinate, resource: Resource, element: HTMLElement) {
		super(location, resource, element);
		this.tier = Math.floor(Math.random() * 3 + 0.5) as Tier;
	}
}

export default Cell;
export { Ore };
