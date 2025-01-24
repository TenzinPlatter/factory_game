import Cell from "./cellTypes/cell";
import { GRIDSIZE } from "./globals";
import generateMap from "./map";
import Machine from "./machines/machine";
import Miner from "./machines/miner";
import { MachineType } from "./types";

class GameController {
	cells: Cell[][];
	grid: HTMLElement;
	selectedBuilding: Machine | null = null;

	constructor() {
		this.grid = <HTMLElement>document.querySelector("#window");
		this.cells = generateMap(GRIDSIZE, this.grid);
		this.setup();
	}

	setup() {
		setupTurnButton();
		setupBuildMenu();
		this.setEventListenersForBuilding()
	}

	setEventListenersForBuilding() {
		for (let y = 0; y < this.cells.length; y++) {
			for (let x = 0; x < this.cells[y].length; x++) {
				const cell = this.cells[y][x];

				cell.element.addEventListener("mouseover", () => {
					if (this.selectedBuilding == null) {
						return;
					}
					
					if (this.selectedBuilding.canPlaceOn(cell)) {
						cell.element.style.background = "green";
					} else {
						cell.element.style.background = "red";
					}
				});

				cell.element.addEventListener("mouseout", () => {
					if (this.selectedBuilding == null) {
						//NOTE: this may cause a bug where changes made in corresponding
						// "mouseover" event listener are not overwritten if building is
						// unselected before mouseover
						// Can be avoided by requiring a mouse action where mouse must be
						// off grid to deselect building
						// Otherwise store changes and deal with them when deselecting building
						return;
					}
					if (this.selectedBuilding.canPlaceOn(cell)) {
						cell.element.style.background = "red";
					} else {
						cell.element.style.background = "green";
					}
				});
			}
		}
	}
}

function setupBuildMenu() {
	const button = document.querySelector("#build-menu-button");
	const buildMenu = <HTMLElement>document.querySelector("#build-menu")!;

	button?.addEventListener("click", () => {
		if (buildMenu.style.display == "grid") {
			buildMenu.style.display = "none";
		} else {
			buildMenu.style.display = "grid";
		}
	});

	populateBuildMenu();
}

function setupTurnButton() {
	const popup = <HTMLElement>document.querySelector("#resource-type-popup");
	const playTurn = document.querySelector("button#play-turn");
	playTurn?.addEventListener("mouseover", () => {
		popup.style.display = "flex";
		popup.textContent = "Finish Turn";
	})

	playTurn?.addEventListener("mouseout", () => {
		popup.style.display = "none";
		popup.textContent = "";
	})
}

function populateBuildMenu() {
	const buildMenu = document.querySelector("#build-menu");
	for (let i = 0; i < 25; i++) {
		const child = document.createElement("div");
		child.classList.add("build-item");

		if (i == 0) {
			child.textContent = "Miner";
			child.addEventListener("click", () => {

			});
		}

		buildMenu?.appendChild(child);
	}
}

export default GameController;
