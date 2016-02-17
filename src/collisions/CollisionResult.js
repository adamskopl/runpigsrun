function CollisionResult(OBJECT, OPERATION) {
	this.object = OBJECT;
	this.operation = OPERATION;
};

COLLISION_OPERATION = Object.freeze({
	REMOVE: "remove"
});