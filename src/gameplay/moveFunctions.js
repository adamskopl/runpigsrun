Directions = Object.freeze([{
	x: 0,
	y: -1
}, {
	x: 1,
	y: 0
}, {
	x: 0,
	y: 1
}, {
	x: -1,
	y: 0
}]);

function resetDirection(direction) {
	direction.x = direction.y = 0;
};

function emptyDirection(DIRECTION) {
	return (DIRECTION.x === 0 && DIRECTION.y === 0);
};

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

/**
 * Check given position allows objects to move in a given direction
 * @param  {[type]} gamePos       [description]
 * @param  {[type]} direction     [description]
 * @param  {[type]} TILES_MANAGER [description]
 * @return {[type]}               [description]
 */
function canMove(GAME_POS, DIRECTION, TILES_MANAGER) {
	var ADJACENT_OBJECTS = TILES_MANAGER.getAdjacent(
		GAME_POS, DIRECTION);
	if (ADJACENT_OBJECTS !== undefined)
		if (objectsContainGameplayType(ADJACENT_OBJECTS,
				GameObjectGameplayType.PASSAGE))
			return true;
	return false;
};

function canMoveSafe(GAME_POS, DIRECTION, TILES_MANAGER) {
	var ADJACENT_OBJECTS = TILES_MANAGER.getAdjacent(
		GAME_POS, DIRECTION);
	if (ADJACENT_OBJECTS !== undefined)
		if (
			objectsContainGameplayType(
				ADJACENT_OBJECTS, GameObjectGameplayType.PASSAGE) &&
			!objectsContainGameplayType(
				ADJACENT_OBJECTS, GameObjectGameplayType.DEADLY)
		)
			return true;
	return false;
}