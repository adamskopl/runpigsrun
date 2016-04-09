/**
 * Keeps data about object's movement. Everything connected with movement will
 * be here.
 */
function GameObjectMovementParams(GAME_POS, DIRECTION) {
	/// target position/current position
	this.gamePosTo = cloneProperties(GAME_POS);
	/// position form which movement started
	this.gamePosFrom = cloneProperties(this.gamePosTo);
	/// direction of the movement
	this.direction = cloneProperties(DIRECTION);
	/// direction forced by e.g a map object. suggestion in which direction
	/// object should move next
	this.directionForced = {
		x: 0,
		y: 0
	};
	this.speed = 1;
};

GameObjectMovementParams.prototype.setGamePosTo = function(POS) {
	this.gamePosTo = cloneProperties(POS);
};

GameObjectMovementParams.prototype.setGamePosFrom = function(POS) {
	this.gamePosFrom = cloneProperties(POS);
};

GameObjectMovementParams.prototype.setDirection = function(DIR) {
	this.direction = cloneProperties(DIR);
};

GameObjectMovementParams.prototype.setDirectionForced = function(DIR) {
	this.directionForced = cloneProperties(DIR);
};

GameObjectMovementParams.prototype.setSpeed = function(SPEED) {
	this.speed = SPEED;
}

GameObjectMovementParams.prototype.destroy = function() {
	this.gamePosTo = undefined;
	this.gamePosFrom = undefined;
	this.direction = undefined;
	this.directionForced = undefined;
};