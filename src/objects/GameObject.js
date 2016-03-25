/**
 * @param {Object} game
 * @param {Object} group
 * @param {string} gameObjectParams.name
 * @param {Array} gameObjectParams.gamePos
 * @param {number} gameObjectParams.angle
 */
function GameObject(group, GAME_OBJECT_PARAMS, statesMgr) {
	this.gamePos = cloneProperties(GAME_OBJECT_PARAMS.gamePos);
	this.direction = cloneProperties(GAME_OBJECT_PARAMS.direction);
	this.properties = GAME_OBJECT_PARAMS.properties;
	this.type = GAME_OBJECT_PARAMS.type;

	this.statesMgr = statesMgr;
	this.stateNumber = 0; // managed by GOStatesMgr

	// how many tiles in one iteration
	this.speed = 1;

	var objectData = GOC[GAME_OBJECT_PARAMS.type];
	if (objectData === undefined) {
		if (GAME_OBJECT_PARAMS.type === "") {
			GAME_OBJECT_PARAMS.type = "empty type";
		}
		console.error("objectData undefined " + GAME_OBJECT_PARAMS.type);
		return;
	}
	this.sprite = group.create(0, 0,
		objectData.spreadsheet, objectData.gid);
	this.sprite.angle = GAME_OBJECT_PARAMS.angle;
	this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
	this.sprite.scale.x = this.sprite.scale.y = scaleConstants.MAIN_SCALE;
	this.updateScreenPos();
};

GameObject.prototype.destroy = function() {
	this.sprite.destroy();
	this.gamePos = {};
	this.direction = {};
	this.properties = {};
	this.type = {};
	this.sprite = {};
};

GameObjectParams.prototype.print = function() {
	console.log(this.type + " [" + this.gamePos.x + "," +
		this.gamePos.y + "] " + this.angle);
};

GameObject.prototype.setDirection = function(dir) {
	this.direction = dir;
};

GameObject.prototype.setSpeed = function(speed) {
	this.speed = speed;
};

/**
 * Update sprite's screen position. After this. object should be properly
 * placed on the screen.
 */
GameObject.prototype.updateScreenPos = function() {
	var screenPos = this.getScreenPos();
	this.sprite.x = screenPos.x;
	this.sprite.y = screenPos.y;
};

/**
 * Convert game position to screen position.
 * @return {[type]} [description]
 */
GameObject.prototype.getScreenPos = function() {
	return gamePosToScreenPos(this.gamePos);
};

GameObject.prototype.startScaleAnimation = function(
	GAME, MULTIPLY, MULTIPLY_SPEED) {
	var multiplySpeed = MULTIPLY;
	if (multiplySpeed === undefined) multiplySpeed = 1;
	var speed = gameplayConstants.OBJECT_SPEED;
	var tween = GAME.add.tween(this.sprite.scale).to({
		x: scaleConstants.MAIN_SCALE * MULTIPLY,
		y: scaleConstants.MAIN_SCALE * MULTIPLY
	}, speed / 2 / multiplySpeed, Phaser.Easing.Linear.In, true, 0, 0, 0);
	var tween2 = GAME.add.tween(this.sprite.scale).to({
		x: scaleConstants.MAIN_SCALE,
		y: scaleConstants.MAIN_SCALE
	}, speed / 2 / multiplySpeed, Phaser.Easing.Linear.In, false, 0, 0, 0);
	tween.chain(tween2);
};