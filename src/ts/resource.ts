import { ResourceType } from "./types";

class Resource {
	type: ResourceType;

	constructor(type: ResourceType) {
		this.type = type;
	}
}

function generateResourceType(difficulty: number): ResourceType {
	if (difficulty > 1 || difficulty < 0) {
		throw new Error(`Invalid difficulty: ${difficulty}`);
	}

	//TODO: decide how difficulty affects generation
	const random = Math.random();

	if (random < 0.5) {
		return ResourceType.GRASS;
	} else if (random < 0.8) {
		return ResourceType.IRON;
	} else {
		return ResourceType.COPPER;
	}
}

export default Resource;
export { generateResourceType };
