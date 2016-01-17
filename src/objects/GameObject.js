function GameObject(game, group, tileObject) {
	this.group = group;
	this.gamePos = posTiledToGame(tileObject.x, tileObject.y);
	this.sprite = {};

	var objectData = gameObjectsContants[tileObject.name];
	this.sprite = this.group.create(0, 0,
		objectData.spreadsheet, tileObject.gid - 1);
	if (tileObject.properties.rot === undefined)
		this.sprite.angle = 0;
	else
		this.sprite.angle = parseInt(tileObject.properties.rot);
	this.sprite.anchor.x = this.sprite.anchor.y = 0.5;
	this.sprite.scale.x = this.sprite.scale.y = scaleConstants.MAIN_SCALE;
	this.updateScreenPos();
}

/**
 * Update sprite's screen pos. After this. object should be properly 
 * placed on the screen.
 */
GameObject.prototype.updateScreenPos = function() {
	var screenPos = this.getScreenPos();
	this.sprite.x = screenPos[0];
	this.sprite.y = screenPos[1];
	this.sprite.x += scaleConstants.TILE_SIZE_SCALED / 2;
	this.sprite.y += scaleConstants.TILE_SIZE_SCALED / 2;
}

/**
 * Convert game position to screen position.
 * @return {[type]} [description]
 */
GameObject.prototype.getScreenPos = function() {
	return [
		this.gamePos[0] * scaleConstants.TILE_SIZE_SCALED,
		this.gamePos[1] * scaleConstants.TILE_SIZE_SCALED
	];
}

/**
 * TODO: not a method. Move to somewhere more general.
 * Get game position (0,0; 1,1 etc)from Tiled position.
 */
function posTiledToGame(tiledPosX, tiledPosY) {
	var gamePos = [
		tiledPosX / scaleConstants.TILE_SIZE, (tiledPosY - scaleConstants.TILE_SIZE) / scaleConstants.TILE_SIZE
	];
	return gamePos;
}