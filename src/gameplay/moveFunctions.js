function resetDirection(direction) {
	direction.x = direction.y = 0;
}

function emptyDirection(DIRECTION) {
	return (DIRECTION.x === 0 && DIRECTION.y === 0);
}

/**
 * Get opposite direction.
 * @return {Array} opposite direction.
 */
function movementDirectionOpposite(DIRECTION) {
	direction = cloneProperties(DIRECTION);
	if (direction.x)
		direction.x = (direction.x === -1) ? 1 : -1;
	if (direction.y)
		direction.y = (direction.y === -1) ? 1 : -1;
	return direction;
};

function canMove(gamePos, direction, movementManager) {
	adjacentObjects = movementManager.tilesManager.getAdjacent(
		gamePos, direction);
	if (adjacentObjects !== undefined)
		if (objectsContainMainType(adjacentObjects, GameObjectMainType.PASSAGE))
			return true;
	return false;
}