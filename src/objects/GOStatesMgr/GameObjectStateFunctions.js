/**
 * Shift object's state and apply it.
 */
GameObject.prototype.stateShift = function() {
	this.statesMgr.stateShift(this);
};

/**
 * Check if current state is a first state from a queue of states for a given
 * GameObject type.
 * @return True if currents state is a first state from a queue of states or
 *         if object has no states management. False otherwise.
 */
GameObject.prototype.stateIsFirst = function() {
	return this.statesMgr.stateIsFirst(this);
};