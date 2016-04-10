function CollisionsHandler(game, gameObjectsManager, tilesManager) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.tilesManager = tilesManager;
	this.tilesToHandle = [];

	this.signals = {
		"objectRemoved": new Phaser.Signal(),
		"objectRescued": new Phaser.Signal()
	};
};

CollisionsHandler.prototype.handleCollisions = function() {
	this.removeMovingObjectsOutsideLevel();
	this.handleEveryVsEvery();
	this.tilesToHandle = [];
};

/**
 * Every remove should go through here to ensure signal dispatch.
 */
CollisionsHandler.prototype.handleRemove = function(GAME_OBJECT, SIGNAL) {
	// dispatch signal BEFORE removing object
	this.signals[SIGNAL].dispatch(GAME_OBJECT);
	this.gameObjectsManager.remove(GAME_OBJECT);
};

CollisionsHandler.prototype.removeMovingObjectsOutsideLevel = function() {
	var objectsOutside = [];
	this.tilesManager.callAll(
		function(objectsOutside) {
			if (objectsContainGameplayType(
					[this], GameObjectGameplayType.MOVING))
				if (!posInLevel(this.mov().gamePosTo))
					objectsOutside.push(this);
		}, [objectsOutside]);
	for (var OBJ in objectsOutside)
		this.handleRemove(objectsOutside[OBJ], "objectRemoved")
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
	var resultsToHandle = [];
	for (var I = 0; I < TILE.length; I++)
		for (var J = I + 1; J < TILE.length; J++) {
			// unique pair (no two objects compared more than once)
			var RESULTS = handleCollisionPair(TILE[I], TILE[J]);
			if (RESULTS === undefined) {
				console.error("RESULTS === undefined");
				continue;
			}
			resultsToHandle = resultsToHandle.concat(RESULTS);
		}
	for (var R in resultsToHandle)
		this.handleCollisionResult(resultsToHandle[R]);
};

CollisionsHandler.prototype.handleCollisionResult = function(RESULT) {
	if (RESULT.operation === undefined) {
		console.error("RESULT.operation undefined")
		return;
	}
	switch (RESULT.operation) {
		case COLLISION_OPERATION.DIR_CHANGE:
			RESULT.object.mov().setDirectionForced(RESULT.arg);
			break;
		case COLLISION_OPERATION.REMOVE:
			this.handleRemove(RESULT.object, "objectRemoved");
			break;
		case COLLISION_OPERATION.SPEED_CHANGE:
			RESULT.object.mov().setSpeed(RESULT.arg);
			break;
		case COLLISION_OPERATION.SCALE_ANIMATION:
			RESULT.object.startScaleAnimation(this.game, RESULT.arg);
			break;
		case COLLISION_OPERATION.RESCUE:
			if (RESULT.object.type === GOT.HERO)
				this.handleRemove(RESULT.object, "objectRescued");
			break;
		default:
			console.error("not implemented: " + RESULT.operation);
	}
};

/**
 * @param  {Object} GAME_OBJECT Object which has changed its position.
 */
CollisionsHandler.prototype.positionChanged = function(
	GAME_OBJECT) {
	var GAME_POS = GAME_OBJECT.mov().gamePosTo;

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