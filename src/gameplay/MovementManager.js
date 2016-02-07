function MovementManager(game, tilesManager, gameplayManager) {
	this.tilesManager = tilesManager;
	this.game = game;
	this.gameplayManager = gameplayManager;
	this.counters = {
		movingObjects: 0
	};
};

MovementManager.prototype.moveAll = function() {
	this.tilesManager.callAll(moveObject, [this.game, this]);
};

MovementManager.prototype.updateDirections = function() {
	this.tilesManager.callAll(updateDirection, [this.tilesManager]);
};

/**
 * Called on GameObject
 * @return {[type]}                 [description]
 */
function updateDirection(TILES_MANAGER) {
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

function moveObject(GAME, movementManager) {
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
	this.tilesManager.positionChanged(ARG.gameObj, ARG.oldPos);
	if (this.counters.movingObjects == 0) {
		this.gameplayManager.onMovementIterFinished();
	}
};