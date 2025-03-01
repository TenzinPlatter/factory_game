import { Coordinate, MachineType } from "../types";
import Resource from "../resource";
import { Ore } from "./cell";
import { MININGPNG } from "../globals";

class Iron extends Ore {
	constructor(location: Coordinate, resource: Resource, element: HTMLElement) {;
		super(location, resource, element);
	}

	canPlace(machineType: MachineType): boolean {
		switch (machineType) {
			case MachineType.MINER:
				return this.machine == null;

			case MachineType.STORAGE:
				return this.machine == null;

			default:
				throw new Error(`Implement canPlace for machinetype: ${machineType}`);
		}
	}

}

export default Iron;

