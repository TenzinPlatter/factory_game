import { ResourceType } from "../types";
import Storage from "../machines/storage";

class StorageController {
	// indexed by ResourceType enum
	resources: number[];
	storages: Storage[] = [];

	constructor() {
		this.resources = [];

		for (let i = 0; i < ResourceType.__LENGTH; i++) {
			this.resources.push(0);
		}
	}

	addStorage(storage: Storage) {
		this.storages.push(storage);
	}

	roomLeft(): number {
		let total = 0;
		for (const resourceAmount of this.resources) {
			total += resourceAmount;
		}

		return this.capacity() - total;
	}

	capacity(): number {
		let total = 0;
		for (const storage of this.storages) {
			total += storage.capacity;
		}

		return total;
	}
}

export default StorageController;
