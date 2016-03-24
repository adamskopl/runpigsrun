GOStates_signpost = Object.freeze([
	"W", "N", "E", "S"
]);

function GOStatesMgrSign() {

};

GOStatesMgrSign.prototype.applyState = function(GAME_OBJECT) {
	var ARR = getStateArray(GAME_OBJECT);
	console.log("APPLY " + ARR[GAME_OBJECT.stateNumber]);
};