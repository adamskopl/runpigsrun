function CollisionResult(OBJECT, OPERATION, ARG) {
	this.object = OBJECT;
	this.operation = OPERATION;
	this.arg = ARG;
};

COLLISION_OPERATION = Object.freeze({
	REMOVE: "remove",
	RESCUE: "rescue", // rescue object (hero)
	SCALE_ANIMATION: "scaleAnim", // temporary firework
	SPEED_CHANGE: "speed"
});