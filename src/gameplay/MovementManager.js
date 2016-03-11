function MovementManager(game, gameObjectsManager, tilesManager, gameplayManager) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.tilesManager = tilesManager;
	this.gameplayManager = gameplayManager;
	this.counters = {
		movingObjects: 0
	};
};

MovementManager.prototype.updateDirections = function() {
	this.tilesManager.callAll(updateGameObjectDirection, [this.tilesManager]);
};

MovementManager.prototype.moveAll = function() {
	this.tilesManager.callAll(moveGameObject, [this.game, this]);
};

/**
 * Called on GameObject
 */
function updateGameObjectDirection(TILES_MANAGER) {
	if (!emptyDirection(this.direction)) {
		if (!canMove(this.gamePos,
			this.direction, TILES_MANAGER)) {
			opposite = movementDirectionOpposite(this.direction);
			if (canMove(this.gamePos,
				opposite, TILES_MANAGER)) {
				this.setDirection(opposite);
			} else {
				// blocked
				resetDirection(this.direction);
			}
		}
	}
};

/**
 * Called on GameObject
 */
function moveGameObject(GAME, movementManager) {
	if (!emptyDirection(this.direction)) {
		var oldPos = cloneProperties(this.gamePos);
		var nextPos = gamePosAdd(this.gamePos, this.direction);
		var nextScreenPos = gamePosToScreenPos(nextPos);
		var speed = gameplayConstants.OBJECT_SPEED;
		var tween = GAME.add.tween(this.sprite).to({
			x: nextScreenPos.x,
			y: nextScreenPos.y
		}, speed, Phaser.Easing.Linear.In, true, 0, 0, 0);
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