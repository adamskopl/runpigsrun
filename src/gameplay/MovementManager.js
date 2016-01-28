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
		if (canMove(this.gamePos,
			this.movementDirection, movementManager))
			console.log("CAN for " + this.movementDirection);
		else {
			opposite = movementDirectionOpposite(this.movementDirection);
			canMoveOpposite = canMove(this.gamePos, opposite, movementManager);
			if (canMoveOpposite)
				console.log(canMoveOpposite + " CAN opposite (" +
					opposite + ") for " + this.movementDirection);
			else
				console.log("can't " + this.movementDirection);
		}
	}
};

function movementDirectionOpposite(movementDirection) {
	switch (movementDirection) {
		case (MovementDirections.U):
			return MovementDirections.D;
		case (MovementDirections.R):
			return MovementDirections.L;
		case (MovementDirections.D):
			return MovementDirections.U;
		case (MovementDirections.L):
			return MovementDirections.R;
		default:
			return MovementDirections.X;
	}
};

function canMove(gamePos, movementDirection, movementManager) {
	adjacentObjects = movementManager.tilesManager.getAdjacent(
		gamePos, movementDirection);
	if (adjacentObjects !== undefined)
		if (objectsContainMainType(adjacentObjects, GameObjectMainType.PASSAGE))
			return true;
	return false;
}