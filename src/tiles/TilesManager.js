/**
 * Manages game tiles. Only place from where data about tiles
 * can be modified.
 * As a result manages game objects positions.
 */
function TilesManager() {
	this.tiles = [];
};

TilesManager.prototype.print = function() {
	for (var i in this.tiles) {
		for (var j in this.tiles[i]) {
			var TILE = this.tiles[i][j];
			for (var o in TILE) {
				var pos = TILE[o].gamePos;
				if (!posInLevel(pos) || TILE[o].type != GOT.HERO) continue;
				var obj = TILE[o];
				console.log(obj.type + " " +
					i + ", " + j);
			}
		}
	}
};

TilesManager.prototype.printTile = function(ARGS) {
	var t = undefined;
	var output = undefined;
	if (ARGS['x'] && ARGS['y']) {
		t = this.get(ARGS.x, ARGS.y);
		output = "<TILE " + ARGS.x + ", " + ARGS.y + "> ";
	} else if (ARGS['tile']) {
		t = ARGS.tile;
		output = "<TILE>";
	} else return;
	if (t === undefined) return;
	for (var o in t) {
		output += t[o].type + " ";
	}
	console.log(output + "</TILE>");
};

TilesManager.prototype.positionChanged = function(
	GAME_OBJ, GAME_POS_OLD) {
	var oldT = this.get(GAME_POS_OLD.x, GAME_POS_OLD.y);
	if (oldT === undefined) {
		console.log("positionChanged() oldT === undefined")
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
		console.log("positionChanged() !objFound");
	}
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

/**
 * TODO: static function
 */
TilesManager.prototype.getAdjacent = function(GAME_POS, DIRECTION) {
	gamePos = cloneProperties(GAME_POS);
	gamePos.x += DIRECTION.x;
	gamePos.y += DIRECTION.y;
	return this.get(gamePos.x, gamePos.y);
}

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