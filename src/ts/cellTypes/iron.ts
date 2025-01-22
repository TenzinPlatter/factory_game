import { Coordinate } from "../types";
import Resource from "../resource";
import { Ore } from "./cell";

class Iron extends Ore {
	constructor(location: Coordinate, resource: Resource) {;
		super(location, resource);
	}
}

export default Iron;

