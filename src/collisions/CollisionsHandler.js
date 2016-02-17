function CollisionsHandler(gameObjectsManager, tilesManager) {
	this.gameObjectsManager = gameObjectsManager;
	this.tilesManager = tilesManager;
	this.tilesToHandle = [];
};

CollisionsHandler.prototype.handleCollisions = function() {
	this.removeLivingObjectsOutsideLevel();
	this.handleEveryVsEvery();
	this.tilesToHandle = [];
};

CollisionsHandler.prototype.removeLivingObjectsOutsideLevel = function() {
	var objectsOutside = [];
	this.tilesManager.callAll(
		function(objectsOutside) {
			if (objectsContainMainType(
				[this], GameObjectMainType.LIVING)) {
				if (!posInLevel(this.gamePos)) {
					objectsOutside.push(this);
				}
			}
		}, [objectsOutside]);
	for (var OBJ in objectsOutside) {
		this.gameObjectsManager.remove(objectsOutside[OBJ]);
	}
};

CollisionsHandler.prototype.handleEveryVsEvery = function() {
	for (var I in this.tilesToHandle) {
		for (var J in this.tilesToHandle[I]) {
			var TILE = this.tilesManager.get(I, J);
			if (TILE === undefined) console.error("TILE === undefined");
			this.handleTileCollisions(TILE);
		}
	}
};

CollisionsHandler.prototype.handleTileCollisions = function(TILE) {
	for (var I = 0; I < TILE.length; I++)
		for (var J = I + 1; J < TILE.length; J++) {
			// unique pair (no two objects compared more than once)
			RESULTS = handleCollisionPair(TILE[I], TILE[J]);
			if (RESULTS === undefined) {
				console.error("RESULTS === undefined");
				continue;
			}
			for (var R in RESULTS)
				this.handleCollisionResult(RESULTS[R]);
		}
};

CollisionsHandler.prototype.handleCollisionResult = function(RESULT) {
	switch (RESULT.operation) {
		case COLLISION_OPERATION.REMOVE:
			this.gameObjectsManager.remove(RESULT.object);
			break;
	}
}

/**
 * @param  {Object} GAME_OBJECT Object which has changed its position.
 */
CollisionsHandler.prototype.positionChanged = function(
	GAME_OBJECT) {
	var GAME_POS = GAME_OBJECT.gamePos;

	prepareArray(this.tilesToHandle, GAME_POS.x,
		GAME_POS.y);
	var ARR = this.tilesToHandle[GAME_POS.x][GAME_POS.y];
	var LEN = ARR.length;
	if (LEN !== 1) {
		if (LEN !== 0) {
			console.error("length !== 1 && length !== 0");
			return;
		}
		var TILE = this.tilesManager.get(GAME_POS.x, GAME_POS.y);
		if (TILE === undefined) {
			console.error("TILE === undefined");
			return;
		}
		ARR.push(TILE);
	}
};