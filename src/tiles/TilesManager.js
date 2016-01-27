/**
 * Manages game tiles. Only place from where data about tiles
 * can be modified.
 * As a result manages game objects positions.
 */
function TilesManager() {
	this.tiles = [];
};

TilesManager.prototype.put = function(gameObject, posX, posY) {
	this.preparePos(posX, posY);
	this.tiles[posX][posY].push(gameObject);
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
}

TilesManager.prototype.get = function(posX, posY) {
	if (!this.exists(posX, posY)) return undefined;
	return this.tiles[posX][posY];
};

TilesManager.prototype.getAdjacent = function(posX, posY, direction) {
	switch (direction) {
		case MovementDirections.U:
			posY--;
			break;
		case MovementDirections.R:
			posX++;
			break;
		case MovementDirections.D:
			posY++;
			break;
		case MovementDirections.L:
			posX--;
			break;
	}
	return this.get(posX, posY);
}

/**
 * Callback call on every object from tiles array.
 * @param  {Function} callback callback to call
 * @param  {Array}   args     arguments to pass
 */
TilesManager.prototype.callAll = function(callback, args) {
	for (var test in this.tiles) {
		for (var test2 in this.tiles[test]) {
			var len = this.tiles[test][test2].length;
			for (var i = 0; i < len; i++) {
				callback.apply(this.tiles[test][test2][i], args);
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