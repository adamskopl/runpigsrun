/**
 * @param {Object} game
 * @param {Object} group
 * @param {string} gameObjectParams.name
 * @param {Array} gameObjectParams.gamePos
 * @param {number} gameObjectParams.angle
 */
function GameObject(group, GAME_OBJECT_PARAMS) {
	this.group = group;
	this.gamePos = cloneProperties(GAME_OBJECT_PARAMS.gamePos);
	this.direction = cloneProperties(GAME_OBJECT_PARAMS.direction);
	this.angle = GAME_OBJECT_PARAMS.angle; // could be replaced by direction?
	this.properties = GAME_OBJECT_PARAMS.properties;
	this.sprite = {};
	this.type = GAME_OBJECT_PARAMS.type;

	var objectData = GOC[GAME_OBJECT_PARAMS.type];
	if (objectData === undefined) {
		console.error("undefined " + GAME_OBJECT_PARAMS.type);
		return;
	}
	this.sprite = this.group.create(0, 0,
		objectData.spreadsheet, objectData.gid);
	this.sprite.angle = GAME_OBJECT_PARAMS.angle;
	this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
	this.sprite.scale.x = this.sprite.scale.y = scaleConstants.MAIN_SCALE;
	this.updateScreenPos();
};

GameObjectParams.prototype.print = function() {
	console.log(this.type + " [" + this.gamePos.x + "," +
		this.gamePos.y + "] " + this.angle);
};

GameObject.prototype.setDirection = function(dir) {
	this.direction = dir;
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