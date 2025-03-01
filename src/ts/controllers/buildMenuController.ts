import Machine from "../machines/machine";
import { BuildCostData, MachineType } from "../types";
import GameController from "./gameController";

/**
	* Visibility should only be toggled using show, hide, and toggleVisibility methods
	*/
class BuildMenuController {
	cells: BuildMenuCellData[][];
	element: HTMLElement;
	isVisible: boolean = false;

	constructor(element: HTMLElement, parentController: GameController) {
		this.cells = [];
		this.element = element;
		this.setup(parentController);
	}

	show(): void {
		this.element.style.display = "grid";
		this.isVisible = true;
	}

	hide(): void {
		this.element.style.display = "none";
		this.isVisible = false;
	}

	/**
		* @returns
	*	the visibility of the window after being toggled
		*/
	toggleVisibility(): boolean {
		// swapping the value of this.isVisible is handled in hide() and show()
		// so that they can be called directly without messing up the value of isVisible
		if (this.isVisible) {
			this.hide();
		} else {
			this.show();
		}

		return this.isVisible;
	}

	populate(controller: GameController) {
		const buildMenu = document.querySelector("#build-menu");
		for (let i = 0; i < 25; i++) {
			const child = document.createElement("div");
			child.classList.add("build-item");

			if (i == 0) {
				child.textContent = "Miner";
				child.addEventListener("click", () => {
					controller.selectedBuilding = MachineType.MINER;
					this.hide();
				});
			} else if (i == 1) {
				child.textContent = "Storage";
				child.addEventListener("click", () => {
					controller.selectedBuilding = MachineType.STORAGE;
					this.hide();
				});
			}

			buildMenu?.appendChild(child);
		}
	}

	setup(controller: GameController) {
		const button = document.querySelector("#build-menu-button");

		button?.addEventListener("click", () => {
			this.toggleVisibility();
		});

		this.populate(controller);
	}
}

class BuildMenuCellData {
	container: HTMLElement;
	machineType: Machine;
	cost: BuildCostData[];
	sprite: HTMLElement;

	/**
		* @param sprite 
	* Should be an img element with src set to the machines sprite
		*/
	constructor(
		machineType: Machine,
		container: HTMLElement,
		cost: BuildCostData[],
		sprite: HTMLElement
	) {
		this.container = container;
		this.machineType = machineType;
		this.cost = cost;
		this.sprite = sprite;
	}
}

export default BuildMenuController;
