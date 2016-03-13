function handleCollisionPair(OBJ_A, OBJ_B) {
	var fname = getCollisionFunctionName(OBJ_A, OBJ_B);
	if (typeof window[fname] !== 'function')
		console.error("no colision function: " + fname);
	if (OBJ_A.type < OBJ_B.type)
		return window[fname](OBJ_A, OBJ_B);
	else
		return window[fname](OBJ_B, OBJ_A); // switch objects (alphabetical order)
};

/**
 * Get collision function name by concating object type names sorted
 * alphabetically.
 */
function getCollisionFunctionName(OBJ_A, OBJ_B) {
	return "collision" + ((OBJ_A.type < OBJ_B.type) ?
		OBJ_A.type + OBJ_B.type :
		OBJ_B.type + OBJ_A.type);
};

function collisionbridgehero(BRIDGE, HERO) {
	return [];
};

function collisionherohero(HERO, HERO) {
	return [];
};

function collisionheroroad(HERO, ROAD) {
	return [new CollisionResult(HERO, COLLISION_OPERATION.SPEED_CHANGE, 1)];
};

function collisionherosign(HERO, SIGN) {
	return [new CollisionResult(HERO, COLLISION_OPERATION.RESCUE)];
};

function collisionherot_bouncer(HERO, TOOL_BOUNCER) {
	return [new CollisionResult(HERO, COLLISION_OPERATION.SPEED_CHANGE, 2)];
};

function collisionherowater(HERO, WATER) {
	return [
		new CollisionResult(HERO, COLLISION_OPERATION.REMOVE),
		new CollisionResult(WATER, COLLISION_OPERATION.SCALE_ANIMATION, 2)
	];
};

function collisionroadsign(ROAD, SIGN) {
	return [];
};

function collisionroadt_bouncer(ROAD, T_BOUNCER) {
	return [];
};