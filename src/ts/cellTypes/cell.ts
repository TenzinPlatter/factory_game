import Resource from "../resource";
import { Coordinate, MachineType, Tier } from "../types";
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

	abstract canPlace(machineType: MachineType): boolean;

	placeMachine(machine: Machine) {
		if (this.machine != null) {
			throw new Error("Check if machine can be placed before attempting to place");
		}

		this.machine = machine;
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
