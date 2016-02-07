/**
 * Check if given game pos is inside of the level. E.g. {x:-1, y:0}
 * is outside.
 */
function posInLevel(POS) {
	return !(POS.x < 0 || POS.x >= scaleConstants.MAP_TILES_X ||
		POS.y < 0 || POS.y >= scaleConstants.MAP_TILES_Y);
};