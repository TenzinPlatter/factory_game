import Cell, { Ore } from "../cellTypes/cell";
import { GRIDSIZE } from "../globals";
import generateMap from "../map";
import BuildMenuController from "./buildMenuController";
import { MachineType, ResourceType } from "../types";
import Miner from "../machines/miner";
import Storage from "../machines/storage";
import StorageController from "./storageController";

class GameController {
	// indexed with [y][x]
	cells: Cell[][];
	grid: HTMLElement;
	selectedBuilding: MachineType | null = null;
	buildMenu: BuildMenuController;
	miners: Miner[] = [];
	storageController: StorageController;

	constructor() {
		this.grid = <HTMLElement>document.querySelector("#window");
		this.cells = generateMap(GRIDSIZE, this.grid);
		this.storageController = new StorageController();

		const buildMenu = <HTMLElement>document.querySelector("#build-menu");
		this.buildMenu = new BuildMenuController(buildMenu, this);

		this.setup();
	}

	setup() {
		this.setupTurnButton();
		this.setEventListenersForBuilding()
	}

	setupTurnButton() {
		const popup = <HTMLElement>document.querySelector("#resource-type-popup");
		const playTurnButton = document.querySelector("button#play-turn");
		playTurnButton?.addEventListener("mouseover", () => {
			popup.style.display = "flex";
			popup.textContent = "Finish Turn";
		})

		playTurnButton?.addEventListener("mouseout", () => {
			popup.style.display = "none";
			popup.textContent = "";
		})

		playTurnButton?.addEventListener("click", () => {
			let incomes = [];
			for (let i = 0; i < MachineType.__LENGTH; i++) {
				incomes.push(0);
			}

			for (const miner of this.miners) {
				const resourceType = miner.cell.resource.type;
				const resourceAdjustment = miner.cell.tier / 2;
				const income = miner.miningRate * resourceAdjustment;

				incomes[resourceType] += income;
			}

			for (let i = 0; i < incomes.length; i++) {
				if (incomes[i] > this.storageController.roomLeft()) {
					this.storageController.resources[i] += this.storageController.roomLeft();
					break;
				}

				this.storageController.resources[i] += incomes[i];
			}
		});
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
							this.miners.push(machine);
							break;

						case MachineType.STORAGE:
							machine = new Storage(1, cell);
							this.storageController.addStorage(machine);
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

export default GameController;
