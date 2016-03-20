/**
 * Constants used to maniupulate game's resolution based on tiles properties.
 */
scaleConstants = {
	MAIN_SCALE: 3, // scales resolution
	TILE_SIZE: 16,
	TILE_SIZE_SCALED: 0,
	MAP_TILES_X: 12, // tiles number horizontally
	MAP_TILES_Y: 12, // tiles number vertically
	GAME_W: 0,
	GAME_H: 0,
	GAME_OFFSET_X: 0,
	GAME_OFFSET_Y: 1
};

SC = scaleConstants;

scaleConstants.TILE_SIZE_SCALED =
	scaleConstants.TILE_SIZE * scaleConstants.MAIN_SCALE;
scaleConstants.GAME_W =
	scaleConstants.TILE_SIZE_SCALED *
	(scaleConstants.MAP_TILES_X + scaleConstants.GAME_OFFSET_X);
scaleConstants.GAME_H =
	scaleConstants.TILE_SIZE_SCALED *
	(scaleConstants.MAP_TILES_Y + scaleConstants.GAME_OFFSET_Y);