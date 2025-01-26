import Cell from "../cellTypes/cell";
import { GRIDSIZE } from "../globals";
import generateMap from "../map";
import Machine from "../machines/machine";
import BuildMenuController from "./buildMenuController";
import { MachineType } from "../types";

class GameController {
	cells: Cell[][];
	grid: HTMLElement;
	selectedBuilding: MachineType | null = null;
	buildMenu: BuildMenuController;

	constructor() {
		this.grid = <HTMLElement>document.querySelector("#window");
		this.cells = generateMap(GRIDSIZE, this.grid);

		const buildMenu = <HTMLElement>document.querySelector("#build-menu");
		this.buildMenu = new BuildMenuController(buildMenu, this);

		this.setup();
	}

	setup() {
		setupTurnButton();
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
					
					if (cell.canPlace(this.selectedBuilding)) {
						if (!cell.element.classList.contains("selected-building-can-place")) {
							cell.element.classList.add("selected-building-can-place")
						}
					} else {
						if (!cell.element.classList.contains("selected-building-cant-place")) {
							 cell.element.classList.add("selected-building-cant-place")
						}
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

					if (cell.canPlace(this.selectedBuilding)) {
						if (cell.element.classList.contains("selected-building-can-place")) {
							cell.element.classList.remove("selected-building-can-place")
						}
					} else {
						if (cell.element.classList.contains("selected-building-cant-place")) {
							 cell.element.classList.remove("selected-building-cant-place")
						}
					}
				});
			}
		}
	}
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


export default GameController;
