function GameObject(game, group, tileObject) {
	this.game = game;
	this.group = group;
	this.tileObject = tileObject;
	this.tileObject.angle = tileObject.properties.rot;
	if (this.tileObject.angle === undefined)
		this.tileObject.angle = 0;
	else
		this.tileObject.angle = parseInt(this.tileObject.angle);

	this.gamePos = getGamePos(this.tileObject.x, this.tileObject.y);

	var objectData = gameObjectsContants[tileObject.name];

	var screenPos = this.getScreenPos();
	this.sprite = this.group.create(screenPos[0], screenPos[1],
		objectData.spreadsheet, tileObject.gid - 1);

	this.sprite.scale.x = scaleConstants.MAIN_SCALE;
	this.sprite.scale.y = scaleConstants.MAIN_SCALE;
	this.rotate(this.tileObject.angle);
};

GameObject.prototype.rotate = function(angle) {
	console.log(this.sprite.anchor);
	this.sprite.anchor.x = 0.5;
	this.sprite.angle = angle;
}

/**
 * Get game position (0,0; 1,1 etc)from Tiled position.
 * @param  {[type]} tileObject [description]
 * @return {[type]}            [description]
 */
function getGamePos(tiledPosX, tiledPosY) {
	var gamePos = [
		tiledPosX / scaleConstants.TILE_SIZE,
		(tiledPosY - scaleConstants.TILE_SIZE) / scaleConstants.TILE_SIZE
	];
	return gamePos;
}

GameObject.prototype.getScreenPos = function() {
	return [
		this.gamePos[0] * scaleConstants.TILE_SIZE_SCALED,
		this.gamePos[1] * scaleConstants.TILE_SIZE_SCALED
	];
}