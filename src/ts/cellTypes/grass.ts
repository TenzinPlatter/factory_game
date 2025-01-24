import Machine from "../machines/machine";
import Resource from "../resource";
import { Coordinate } from "../types";
import Cell from "./cell";

class Grass extends Cell {
	constructor(location: Coordinate, resource: Resource, element: HTMLElement) {;
		super(location, resource, element);
	}
}

export default Grass;
