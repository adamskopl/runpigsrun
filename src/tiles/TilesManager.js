/**
 * Manages game tiles. Only place from where data about tiles
 * can be modified.
 * As a result manages game objects positions.
 */
function TilesManager() {
	this.tiles = [];
};

TilesManager.prototype.clear = function() {
	this.tiles = [];
};

TilesManager.prototype.preparePos = function(posX, posY) {
	if (this.tiles[posX] === undefined)
		this.tiles[posX] = [];
	if (this.tiles[posX][posY] === undefined)
		this.tiles[posX][posY] = [];
};

TilesManager.prototype.exists = function(posX, posY) {
	return this.tiles[posX] !== undefined &&
		this.tiles[posX][posY] !== undefined;
};

TilesManager.prototype.get = function(POS_X, POS_Y) {
	if (!this.exists(POS_X, POS_Y)) return undefined;
	return this.tiles[POS_X][POS_Y];
};

/**
 * Get objects of a given type on a given position.
 * @return {Array} Array with objects of a given type. If length = 0, than
 *                 no objects on a given position.
 */
TilesManager.prototype.getObjectsGameplayType = function(GAME_POS, G_TYPE) {
	var TILE = this.get(GAME_POS.x, GAME_POS.y);
	if (TILE === undefined) {
		console.error("no tile " + GAME_POS.x + ", " + GAME_POS.y);
		return [];
	}
	return filterObjectsGameplayType(TILE, G_TYPE);
}

TilesManager.prototype.tileContainsGameplayType = function(GAME_POS, G_TYPE) {
	var TILE = this.get(GAME_POS.x, GAME_POS.y);
	if (TILE === undefined) {
		console.error("no tile " + GAME_POS.x + ", " + GAME_POS.y);
		return false;
	}
	return objectsContainGameplayType(TILE, G_TYPE);
};

/**
 * TODO: static function
 */
TilesManager.prototype.getAdjacent = function(GAME_POS, DIRECTION) {
	var gamePos = cloneProperties(GAME_POS);
	gamePos.x += DIRECTION.x;
	gamePos.y += DIRECTION.y;
	return this.get(gamePos.x, gamePos.y);
};

/**
 * Callback call on every object from tiles array.
 * @param  {Function} callback callback to call
 * @param  {Array}   args     arguments to pass
 */
TilesManager.prototype.callAll = function(callback, args) {
	for (var i in this.tiles) {
		for (var j in this.tiles[i]) {
			var len = this.tiles[i][j].length;
			for (var c = 0; c < len; c++) {
				callback.apply(this.tiles[i][j][c], args);
			}
		}
	}
};

TilesManager.prototype.count = function() {
	x = {
		cnt: 0
	};
	this.callAll(function(counter) {
		counter.cnt++;
	}, [x]);
	return x.cnt;
};