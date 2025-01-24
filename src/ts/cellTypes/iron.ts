import { Coordinate } from "../types";
import Resource from "../resource";
import { Ore } from "./cell";

class Iron extends Ore {
	constructor(location: Coordinate, resource: Resource, element: HTMLElement) {;
		super(location, resource, element);
	}
}

export default Iron;

