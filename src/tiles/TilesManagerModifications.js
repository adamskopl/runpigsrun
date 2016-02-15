TilesManager.prototype.put = function(gameObject, posX, posY) {
	prepareArray(this.tiles, posX, posY);
	this.tiles[posX][posY].push(gameObject);
};

TilesManager.prototype.remove = function(GAME_OBJECT) {
	var tile = this.get(GAME_OBJECT.gamePos.x, GAME_OBJECT.gamePos.y);
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

TilesManager.prototype.positionChanged = function(
	GAME_OBJ, GAME_POS_OLD) {
	var oldT = this.get(GAME_POS_OLD.x, GAME_POS_OLD.y);
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
			this.put(GAME_OBJ, GAME_OBJ.gamePos.x, GAME_OBJ.gamePos.y);
			break;
		}
	}
	if (!objFound) {
		console.error("positionChanged() !objFound");
	}
};