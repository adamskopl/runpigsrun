function CollisionResult(OBJECT, OPERATION, ARG) {
	this.object = OBJECT;
	this.operation = OPERATION;
	this.arg = ARG;
};

COLLISION_OPERATION = Object.freeze({
	REMOVE: "remove",
	SPEED_CHANGE: "speed",
	SCALE_ANIMATION: "scaleAnim" // temporary firework
});