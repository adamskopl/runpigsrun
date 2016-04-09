/**
 * @param {Object} game
 * @param {Object} group
 * @param {string} gameObjectParams.name
 * @param {Array} gameObjectParams.gamePos
 * @param {number} gameObjectParams.angle
 */
function GameObject(group, GAME_OBJECT_PARAMS, statesMgr, ID) {
	this.movementParams = new GameObjectMovementParams(
		GAME_OBJECT_PARAMS.gamePos,
		GAME_OBJECT_PARAMS.direction
	);
	this.angle = GAME_OBJECT_PARAMS.angle;
	this.properties = GAME_OBJECT_PARAMS.properties;
	this.type = GAME_OBJECT_PARAMS.type;

	this.statesMgr = statesMgr;
	this.stateNumber = 0; // managed by GOStatesMgr

	// how many tiles in one iteration
	//	this.speed = 1;

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
	this.sprite.id = ID;
	this.sprite.angle = GAME_OBJECT_PARAMS.angle;
	this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
	this.sprite.scale.x = this.sprite.scale.y = scaleConstants.MAIN_SCALE;

	this.updateScreenPos();
};

GameObject.prototype.mov = function() {
	return this.movementParams;
};

GameObject.prototype.initArcade = function(game) {
	game.physics.arcade.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.immovable = true;
	var bodySize = scaleConstants.TILE_SIZE / 3;
	this.sprite.body.setSize(bodySize, bodySize);
};

GameObject.prototype.destroy = function() {
	var tween = this.sprite.tween;
	this.sprite.tween = undefined;
	this.sprite.destroy();
	this.sprite = {};
	this.movementParams.destroy();
	this.angle = {};
	this.properties = {};
	this.type = {};

	this.destroyed = true;

	if (tween !== undefined)
		tween.stop(true)
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
	return gamePosToScreenPos(this.mov().gamePosTo);
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