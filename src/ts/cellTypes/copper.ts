import { Coordinate } from "../types";
import Resource from "../resource";
import { Ore } from "./cell";

class Copper extends Ore {
	constructor(location: Coordinate, resource: Resource) {;
		super(location, resource);
	}
}

export default Copper;
