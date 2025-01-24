import { Coordinate, ResourceType } from "./types";
import Grass from "./cellTypes/grass";
import Copper from "./cellTypes/copper";
import Iron from "./cellTypes/iron";
import Resource, { generateResourceType } from "./resource";
import { GRIDSIZE } from "./globals";

function generateMapResources(size: number): ResourceType[][] {
	let values: ResourceType[][] = [];
	for (let i = 0; i < size; i++) {
		let tmp = [];
		for (let j = 0; j < size; j++) {
			tmp.push(ResourceType.GRASS);
		}
		values.push(tmp);
	}

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			let random = (Math.random() + Math.random()) / 2;

			if (random < 0.6) {
				values[y][x] = ResourceType.GRASS;
			} else if (random < 0.75) {
				values[y][x] = ResourceType.IRON;
			} else {
				values[y][x] = ResourceType.COPPER;
			}
		}
	}

	return values;
}

function generateMap(size: number, grid: HTMLElement) {
	if (size < 0) {
		throw new Error("Map size must be > 0");
	}

	let cells = [];

	const ResourceTypes = generateMapResources(size);

	for (let y = 0; y < size; y++) {
		let curr_row = [];
		for (let x = 0; x < size; x++) {
			const child = document.createElement("div");
			child.classList.add("cell");

			const coords: Coordinate = new Coordinate(x, y);
			const resource: Resource = new Resource(ResourceTypes[y][x]);
			let cell;

			//TODO: adjust terrain generation algo to clump resources together

			switch (resource.type) {
				case ResourceType.GRASS:
					cell = new Grass(coords, resource, child);
				break;
				case ResourceType.IRON:
					cell = new Iron(coords, resource, child);
				break;
				case ResourceType.COPPER:
					cell = new Copper(coords, resource, child);
				break;
				default:
					throw new Error(`Invalid resource type: ${resource.type}`)
			}

			const popup = <HTMLElement>document.querySelector("#resource-type-popup");

			child.addEventListener("mouseover", () => {
				popup.style.display = "flex";
				popup.textContent = resource.type.toString();
			});

			child.addEventListener("mouseout", () => {
				popup.style.display = "none";
				popup.textContent = "";
			});

			child.classList.add(resource.type.toString().toLowerCase());

			grid?.appendChild(child);
			curr_row.push(cell);
		}
		cells.push(curr_row);
	}

	return cells;
}

export default generateMap;
