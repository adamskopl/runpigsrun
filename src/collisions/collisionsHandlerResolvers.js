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

function collisionenemyenemy(ENEMY, ENEMY) {
	return [];
}

function collisionenemyhero(ENEMY, HERO) {
	return [
		new CollisionResult(HERO, COLLISION_OPERATION.REMOVE)
	];
}

function collisionenemyhut(ENEMY, HUT) {
	return collisionenemyroad(ENEMY, HUT);
};

function collisionenemyroad(ENEMY, ROAD) {
	return [new CollisionResult(ENEMY, COLLISION_OPERATION.SPEED_CHANGE, 1)];
};

function collisionenemysignpost(ENEMY, SIGNPOST) {
	return [];
}

function collisionenemyt_bouncer(ENEMY, TOOL_BOUNCER) {
	return [
		new CollisionResult(ENEMY, COLLISION_OPERATION.SPEED_CHANGE, 2),
		new CollisionResult(TOOL_BOUNCER, COLLISION_OPERATION.SCALE_ANIMATION, 1.5)
	];
}

function collisionenemyvoid(ENEMY, VOID) {
	return [
		new CollisionResult(ENEMY, COLLISION_OPERATION.REMOVE),
		new CollisionResult(VOID, COLLISION_OPERATION.SCALE_ANIMATION, 3)
	];
};

function collisionexitroad(EXIT, ROAD) {
	return [];
};

function collisionherohero(HERO, HERO) {
	return [];
};

/**
 * Hero land on the hut (e.g. through bouncer)
 */
function collisionherohut(HERO, HUT) {
	return collisionheroroad(HERO);
};

function collisionheroroad(HERO, ROAD) {
	return [new CollisionResult(HERO, COLLISION_OPERATION.SPEED_CHANGE, 1)];
};

function collisionherosignpost(HERO, SIGNPOST) {
	var dir = {
		x: 0,
		y: 0
	};
	switch (SIGNPOST.sprite.angle) {
		case 0:
			dir.y = -1;
			break;
		case -90:
			dir.x = -1;
			break;
		case -180:
			dir.y = 1;
			break;
		case 90:
			dir.x = 1;
			break;
	}
	return [new CollisionResult(HERO, COLLISION_OPERATION.DIR_CHANGE, dir)];
}

function collisionexithero(EXIT, HERO) {
	return [new CollisionResult(HERO, COLLISION_OPERATION.RESCUE)];
};

function collisionherot_bouncer(HERO, TOOL_BOUNCER) {
	return [
		new CollisionResult(HERO, COLLISION_OPERATION.SPEED_CHANGE, 2),
		new CollisionResult(TOOL_BOUNCER, COLLISION_OPERATION.SCALE_ANIMATION, 1.5)
	];
};

function collisionherovoid(HERO, VOID) {
	return [
		new CollisionResult(HERO, COLLISION_OPERATION.REMOVE),
		new CollisionResult(VOID, COLLISION_OPERATION.SCALE_ANIMATION, 3)
	];
};

function collisionherowater(HERO, WATER) {
	return [
		new CollisionResult(HERO, COLLISION_OPERATION.REMOVE),
		new CollisionResult(WATER, COLLISION_OPERATION.SCALE_ANIMATION, 2)
	];
};

function collisionroadt_bouncer(ROAD, T_BOUNCER) {
	return [];
};

function collisionroadsignpost(ROAD, SIGNPOST) {
	return [];
};