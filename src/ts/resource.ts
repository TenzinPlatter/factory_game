import { resourceType } from "./types";

class Resource {
	type: resourceType;

	constructor(type: resourceType) {
		this.type = type;
	}
}

function generateResourceType(difficulty: number): resourceType {
	if (difficulty > 1 || difficulty < 0) {
		throw new Error(`Invalid difficulty: ${difficulty}`);
	}

	//TODO: decide how difficulty affects generation
	const random = Math.random();

	if (random < 0.5) {
		return resourceType.Grass;
	} else if (random < 0.8) {
		return resourceType.Iron;
	} else {
		return resourceType.Copper;
	}
}

export default Resource;
export { generateResourceType };
