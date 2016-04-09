TilesManager.prototype.put = function(gameObject, posX, posY) {
	prepareArray(this.tiles, posX, posY);
	this.tiles[posX][posY].push(gameObject);
};

TilesManager.prototype.remove = function(GAME_OBJECT) {
	var tile = this.get(
		GAME_OBJECT.mov().gamePosTo.x,
		GAME_OBJECT.mov().gamePosTo.y);
	if (tile === undefined) {
		console.error("remove TILE === undefined");
	}
	var objFound = false;
	for (var I in tile) {
		if (tile[I] === GAME_OBJECT) {
			objFound = true;
			tile.splice(I, 1);
			break;
		}
	}
	if (!objFound) {
		console.error("!objFound");
	}
};

/**
 * Position of a given object had changed. Refresh tiles array.
 */
TilesManager.prototype.positionChanged = function(
	GAME_OBJ) {
	var oldT = this.get(
		GAME_OBJ.mov().gamePosFrom.x,
		GAME_OBJ.mov().gamePosFrom.y);
	if (oldT === undefined) {
		console.error("positionChanged() oldT === undefined")
		return;
	}
	var objFound = false;
	for (var o in oldT) {
		if (oldT[o] === GAME_OBJ) {
			objFound = true;
			// remove the object from an old tile
			oldT.splice(o, 1);
			this.put(GAME_OBJ,
				GAME_OBJ.mov().gamePosTo.x,
				GAME_OBJ.mov().gamePosTo.y);
			break;
		}
	}
	if (!objFound) {
		console.error("positionChanged() !objFound");
	}
};