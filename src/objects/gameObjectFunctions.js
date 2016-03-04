function GameObjectParams(type, gamePos, direction, angle, properties) {
	this.type = type;
	this.gamePos = gamePos; // {x,y }
	this.direction = direction; // {x, y}
	this.angle = angle;
	this.properties = properties;

	if (this.gamePos === undefined) {
		this.gamePos = {
			x: 0,
			y: 0
		};
	}
	if (this.direction === undefined) {
		this.direction = {
			x: 0,
			y: 0
		};
	}
	if (this.angle === undefined) {
		this.angle = 0;
	}
	if (this.properties === undefined) {
		this.properties = {}
	}
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
		angle,
		cloneProperties(tileObject.properties));
};

function gamePosToScreenPos(GAME_POS) {
	return {
		x: (GAME_POS.x + scaleConstants.GAME_OFFSET_X) * scaleConstants.TILE_SIZE_SCALED +
			scaleConstants.TILE_SIZE_SCALED / 2,
		y: (GAME_POS.y + scaleConstants.GAME_OFFSET_Y) * scaleConstants.TILE_SIZE_SCALED +
			scaleConstants.TILE_SIZE_SCALED / 2
	};
};

function gamePosAdd(GAME_POS, GAME_POS_ADD) {
	return {
		x: GAME_POS.x + GAME_POS_ADD.x,
		y: GAME_POS.y + GAME_POS_ADD.y
	};
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

function angleToDirection(ANGLE) {
	var dir = {
		x: 0,
		y: 0
	};
	switch (ANGLE) {
		case 0:
			dir.y = 1;
			break;
		case 90:
			dir.x = -1;
			break;
		case 180:
			dir.y = -1;
			break;
		case -90:
			dir.x = 1;
			break;
		default:
	}
	return dir;
};