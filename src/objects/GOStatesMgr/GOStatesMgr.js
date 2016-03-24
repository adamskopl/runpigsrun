/**
 * Manages states of GameObject objects. One instance.
 */
function GOStatesMgr() {
	this.managers = [];
	this.initManagers();
};

GOStatesMgr.prototype.initManagers = function() {
	this.managers[GOT.SIGNPOST] = new GOStatesMgrSign();
};

/**
 * Get object describing states of a game object of a given type.
 * @param  {Object} GameObject object
 * @return {Object} Object describing states. Undefined if there is no object
 * 	                for a given game object.
 */
function getStateArray(GAME_OBJECT) {
	return window["GOStates_" + GAME_OBJECT.type];
}

/**
 * Shift object's state and apply it.
 */
GOStatesMgr.prototype.stateShift = function(GAME_OBJECT) {
	var STATE_ARRAY = getStateArray(GAME_OBJECT);
	if (STATE_ARRAY === undefined)
		return;

	var STATE_MGR = this.getMgr(GAME_OBJECT);
	if (STATE_MGR === undefined) {
		console.error("no mgr for " + GAME_OBJECT.type);
		return;
	}
	var STATES_NUMBER = STATE_ARRAY.length;
	if (GAME_OBJECT.stateNumber === STATES_NUMBER - 1)
		GAME_OBJECT.stateNumber = 0;
	else
		GAME_OBJECT.stateNumber++;

	STATE_MGR.applyState(GAME_OBJECT);
};

GOStatesMgr.prototype.stateIsFirst = function(GAME_OBJECT) {
	return GAME_OBJECT.stateNumber === 0;
};

/**
 * Get concrete
 * @param  {[type]} GAME_OBJECT [description]
 * @return undefined if no state manager for a given GO type
 */
GOStatesMgr.prototype.getMgr = function(GAME_OBJECT) {
	// console.log(GAME_OBJECT.type);
	return this.managers[GAME_OBJECT.type];
};