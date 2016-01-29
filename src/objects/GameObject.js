function GameObjectParams(name, gamePos, direction, angle) {
	this.name = name;
	this.gamePos = gamePos; // {x,y }
	this.direction = direction; // {x, y}
	this.angle = angle;
};

GameObjectParams.prototype.print = function() {
	console.log(this.name + " [" + this.gamePos.x + "," +
		this.gamePos.y + "] " + this.angle);
};

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
	this.sprite = {};
	this.name = GAME_OBJECT_PARAMS.name;

	var objectData = GOC[GAME_OBJECT_PARAMS.name];
	if (objectData === undefined) {
		console.log("undefined " + GAME_OBJECT_PARAMS.name);
		return;
	}
	this.sprite = this.group.create(0, 0,
		objectData.spreadsheet, objectData.gid);
	this.sprite.angle = GAME_OBJECT_PARAMS.angle;
	this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
	this.sprite.scale.x = this.sprite.scale.y = scaleConstants.MAIN_SCALE;
	this.updateScreenPos();
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
	this.sprite.x += scaleConstants.TILE_SIZE_SCALED / 2;
	this.sprite.y += scaleConstants.TILE_SIZE_SCALED / 2;
};

/**
 * Convert game position to screen position.
 * @return {[type]} [description]
 */
GameObject.prototype.getScreenPos = function() {
	return {
		x: this.gamePos.x * scaleConstants.TILE_SIZE_SCALED,
		y: this.gamePos.y * scaleConstants.TILE_SIZE_SCALED
	};
};

function gamePosToScreenPos(GAME_POS) {
	screenPos = cloneProperties(GAME_POS);
	return screenPos;
};

function tileObjectToGameObjectParams(tileObject) {
	var angle = tileObject.properties.rot;
	if (angle === undefined)
		angle = 0;
	else
		angle = parseInt(angle);
	return new GameObjectParams(
		tileObject.name,
		posTiledToGame(tileObject.x, tileObject.y), {
			x: 0,
			y: 0
		},
		angle);
};

/**
 * TODO: not a method. Move to somewhere more general.
 * Get game position (0,0; 1,1 etc)from Tiled position.
 */
function posTiledToGame(tiledPosX, tiledPosY) {
	var gamePos = {
		x: tiledPosX / scaleConstants.TILE_SIZE,
		y: (tiledPosY - scaleConstants.TILE_SIZE) / scaleConstants.TILE_SIZE
	};
	return gamePos;
}