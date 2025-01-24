import { Coordinate, CellData, resourceType } from "./types";
import Grass from "./cellTypes/grass";
import Copper from "./cellTypes/copper";
import Iron from "./cellTypes/iron";
import Resource, { generateResourceType } from "./resource";
import { GRIDSIZE } from "./globals";

function generateMapResources(size: number): resourceType[][] {
	let values: resourceType[][] = [];
	for (let i = 0; i < size; i++) {
		let tmp = [];
		for (let j = 0; j < size; j++) {
			tmp.push(resourceType.Grass);
		}
		values.push(tmp);
	}

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			let random = (Math.random() + Math.random()) / 2;

			if (random < 0.6) {
				values[y][x] = resourceType.Grass;
			} else if (random < 0.75) {
				values[y][x] = resourceType.Iron;
			} else {
				values[y][x] = resourceType.Copper;
			}
		}
	}

	return values;
}

function generateMap(size: number, grid: HTMLElement) {
	if (size < 0) {
		throw new Error("Map size must be > 0");
	}

	let cells = new Array(size);
	cells.fill(new Array(size))

	const resourceTypes = generateMapResources(size);

	for (let i = 0; i < size**2; i++) {
		const x = i % GRIDSIZE;
		const y = Math.floor(i / GRIDSIZE);

		const child = document.createElement("div");
		child.classList.add("cell");

		const coords: Coordinate = new Coordinate(x, y);
		const resource: Resource = new Resource(resourceTypes[y][x]);
		let cell;

		//TODO: adjust terrain generation algo to clump resources together

		switch (resource.type) {
			case resourceType.Grass:
				cell = new Grass(coords, resource);
				break;
			case resourceType.Iron:
				cell = new Iron(coords, resource);
				break;
			case resourceType.Copper:
				cell = new Copper(coords, resource);
				break;
		}

		const popup = <HTMLElement>document.querySelector(".resource-type-popup");

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
		cells.push(new CellData(cell, child));
	}

	return cells;
}

export default generateMap;
