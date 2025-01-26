import Cell, { Ore } from "../cellTypes/cell";
import { GRIDSIZE } from "../globals";
import generateMap from "../map";
import Machine from "../machines/machine";
import BuildMenuController from "./buildMenuController";
import { MachineType } from "../types";
import Miner from "../machines/miner";
import Conveyor from "../machines/conveyor";

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

				let turnOnHoverEffect = (controller: GameController) => {
					if (cell.canPlace(controller.selectedBuilding!)) {
						cell.element.classList.add("selected-building-can-place")
					} else {
						cell.element.classList.add("selected-building-cant-place")
					}
				}

				let turnOffHoverEffect = () => {
					// will only remove if it is present
					cell.element.classList.remove(
						"selected-building-cant-place",
						"selected-building-can-place"
					);
				}

				cell.element.addEventListener("mouseover", () => {
					if (this.selectedBuilding == null) {
						return;
					}

					turnOnHoverEffect(this);
				});

				cell.element.addEventListener("mouseout", () => {
					if (this.selectedBuilding == null) {
						return;
					}

					turnOffHoverEffect();
				});

				cell.element.addEventListener("click", () => {
					if (
						this.selectedBuilding === null
							|| !cell.canPlace(this.selectedBuilding)
					) {
						return;
					}

					let machine;
					switch (this.selectedBuilding) {
						case MachineType.MINER:
							machine = new Miner(1, cell as Ore);
						break;

						case MachineType.CONVEYOR:
							machine = new Conveyor(1, cell);
						break;

						default:
							throw new Error(`Unimplemented machine type: ${this.selectedBuilding}`)
					}

					cell.placeMachine(machine);
					turnOffHoverEffect();
					this.selectedBuilding = null;
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
