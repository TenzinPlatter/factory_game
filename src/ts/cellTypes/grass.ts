import Resource from "../resource";
import { Coordinate, MachineType } from "../types";
import Cell from "./cell";
import { MININGPNG } from "../globals";

class Grass extends Cell {
	constructor(location: Coordinate, resource: Resource, element: HTMLElement) {;
		super(location, resource, element);
	}

	canPlace(machineType: MachineType): boolean {
		switch (machineType) {
			case MachineType.MINER:
				return false;

			case MachineType.STORAGE:
				return this.machine == null;

			default:
				throw new Error(`Implement canPlace for machinetype: ${machineType}`);
		}
	}

}

export default Grass;
