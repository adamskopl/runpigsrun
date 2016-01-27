MovementDirections = {
	U: "U",
	R: "R",
	D: "D",
	L: "L",
	X: "X" // no direction
};

function MovementManager(tilesManager) {
	this.tilesManager = tilesManager;
};

function updateDirection(movementManager) {
	if (this.movementDirection != MovementDirections.X) {
		adjacentObjects = movementManager.tilesManager.getAdjacent(
			this.gamePos[0], this.gamePos[1], this.movementDirection);
		if (adjacentObjects !== undefined)
			if (objectsContainMainType(adjacentObjects, GameObjectMainType.PASSAGE)) {
				console.log("can move");
			} else
				console.log("can't move");
		else
			console.log("can't move");
	}
};