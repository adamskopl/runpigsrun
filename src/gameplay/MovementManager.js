function MovementManager(game, gameObjectsManager, tilesManager, gameplayManager) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.tilesManager = tilesManager;
	this.gameplayManager = gameplayManager;
	this.counters = {
		movingObjects: 0
	};
	this.checkedColl = [];
	this.toHandle = [];
};

/**
 * Set starting directions for moving objects. If moving object does not have
 * direction set: try to set possible direction, which will not kill given
 * object.
 * Assumption: all level objects are loaded.
 */
MovementManager.prototype.setStartingDirections = function() {
	this.tilesManager.callAll(setGameObjectStartDirection, [this.tilesManager]);
};

MovementManager.prototype.updateDirections = function() {
	this.tilesManager.callAll(updateGameObjectDirection, [this.tilesManager]);
};

MovementManager.prototype.moveAll = function() {
	this.checkedColl = [];
	console.log("-------------------");
	this.tilesManager.callAll(moveGameObject, [this.game, this]);
};

MovementManager.prototype.update = function() {
	if (this.counters.movingObjects !== 0) {
		var collObjects = this.gameObjectsManager.getAll([GOT.ROAD, GOT.VOID]);
		if (collObjects.length < 2) return;
		for (var i = 0; i < collObjects.length; i++)
			for (var j = i + 1; j < collObjects.length; j++) {
				this.game.physics.arcade.overlap(
					collObjects[i].sprite,
					collObjects[j].sprite,
					this.onCollision, null, this);
			}
	}
	if (this.toHandle.length > 0)
		console.log("len " + this.toHandle.length);
	this.toHandle = [];
};

MovementManager.prototype.onCollision = function(sprite1, sprite2) {
	if (sprite1.id === sprite2.id)
		console.error("equal id");
	var a = sprite1.id;
	var b = sprite2.id;
	if (sprite2.id < sprite1.id) {
		a = sprite2.id;
		b = sprite1.id;
	}
	if (prepareArray(this.checkedColl, a, b)) {
		// console.log("COL " + sprite1.id + ", " + sprite2.id);
		this.toHandle.push(1);
	}
}

/**
 * Called on GameObject
 */
function setGameObjectStartDirection(TILES_MANAGER) {
	if (!objectsContainGameplayType([this], GOGT.MOVING))
		return;
	for (var dir in Directions) {
		if (canMoveSafe(this.gamePos, Directions[dir], TILES_MANAGER))
			this.setDirection(Directions[dir]);
	}
};

/**
 * Called on GameObject
 */
function updateGameObjectDirection(TILES_MANAGER) {
	if (!objectsContainGameplayType([this], GOGT.MOVING))
		return;
	// check if common object is allowing to move between distant tiles
	// probably will need changes (not only bouncer will change speed)
	if (TILES_MANAGER.tileContainsGameplayType(this.gamePos, GOGT.SPEED_CHANGE))
		return;

	var directionForForced = getResultDirectionForDirection(
		this.gamePos, this.directionForced, TILES_MANAGER);
	if (emptyDirection(directionForForced)) {
		var directionNormal = getResultDirectionForDirection(
			this.gamePos, this.direction, TILES_MANAGER);
		this.setDirection(directionNormal);
	} else
		this.setDirection(directionForForced);
};

/**
 * Get direction, which would be a result of a movement of an
 * object with a given direction, on a given position.
 * @param  {Object} GAME_POS     {x, y} position of a theoretical object
 * @param  {Object} DIRECTION    {x, y} direction of theoretical object
 * @param  {Object} TILESMANAGER TilesManager object.
 * @return {Object}              Direction which would be a next direction of an 
 *                               object with given position and direction.
 */
function getResultDirectionForDirection(GAME_POS, DIRECTION, TILESMANAGER) {
	var direction = cloneProperties(DIRECTION);
	if (!emptyDirection(direction))
		if (!canMove(GAME_POS, direction, TILESMANAGER)) {
			var OPPOSITE = movementDirectionOpposite(direction);
			if (!canMove(GAME_POS, OPPOSITE, TILESMANAGER))
				resetDirection(direction);
		}
	return direction;
}

/**
 * Called on GameObject. 
 */
function moveGameObject(GAME, movementManager) {
	if (!emptyDirection(this.direction)) {
		var oldPos = cloneProperties(this.gamePos);
		var direction = cloneProperties(this.direction);
		direction.x *= this.speed;
		direction.y *= this.speed;
		var nextPos = gamePosAdd(this.gamePos, direction);
		var nextScreenPos = gamePosToScreenPos(nextPos);
		var speed = gameplayConstants.OBJECT_SPEED;
		var tween = GAME.add.tween(this.sprite).to({
			x: nextScreenPos.x,
			y: nextScreenPos.y
		}, speed, Phaser.Easing.Linear.In, true, 0, 0, 0);

		if (this.speed === 2)
			this.startScaleAnimation(GAME, 2);

		movementManager.counters.movingObjects++;
		tween.onComplete.add(movementFinished, movementManager, 0, {
			gameObj: this,
			oldPos: oldPos
		});
		this.gamePos = nextPos;
	}
};

function movementFinished(SPRITE, TWEEN, ARG) {
	this.counters.movingObjects--;
	this.gameplayManager.onMovementIter(ARG.gameObj, ARG.oldPos);
	if (this.counters.movingObjects == 0) {
		this.gameplayManager.onMovementIterLast();
	}
};