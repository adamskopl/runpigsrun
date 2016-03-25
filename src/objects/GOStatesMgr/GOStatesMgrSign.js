/*
	As this is a first states array... use any values
	which speed up the states appliance.
 */
GOStates_signpost = Object.freeze([
	0, 90, 180, -90
]);

function GOStatesMgrSign() {};

GOStatesMgrSign.prototype.applyState = function(GAME_OBJECT) {
	var ARR = getStateArray(GAME_OBJECT);
	GAME_OBJECT.sprite.angle = ARR[GAME_OBJECT.stateNumber];
};