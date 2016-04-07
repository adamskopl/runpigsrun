function GameObjectsManager(game, tilesManager) {
	this.game = game;
	this.tilesManager = tilesManager;
	this.statesMgr = new GOStatesMgr();
	this.objects = {};
	this.groupGeneral = this.game.add.group();
	this.managers = {}; // concrete managers
	this.initManagers();
	this.ids = new IdGenerator()
};

GameObjectsManager.prototype.initManagers = function() {
	this.objects[GOT.HUT] = [];
	this.managers[GOT.HUT] = new GameObjectsManagerHuts(
		this.objects[GOT.HUT]);
};

GameObjectsManager.prototype.getGroup = function() {
	return this.groupGeneral;
}

GameObjectsManager.prototype.clear = function() {
	for (var i in this.objects)
		for (var j in this.objects[i])
			this.objects[i][j].destroy();
	for (var i in this.objects)
		this.objects[i].length = 0; // warning: *array reference* in concrete managers
	this.tilesManager.clear();
	this.groupGeneral.removeAll();
	this.ids.reset();
};

GameObjectsManager.prototype.create = function(gameObjectParams) {
	gameObject = new GameObject(this.groupGeneral,
		gameObjectParams, this.statesMgr, this.ids.gen());

	if (!objectsContainGameplayType([gameObject], GOGT.PASSAGE))
		gameObject.initArcade(this.game);
	this.push(gameObject);
	this.tilesManager.put(gameObject, gameObjectParams.gamePos.x,
		gameObjectParams.gamePos.y);
	this.check();
	return gameObject;
};

/**
 * Get an array of all the objects.
 * @param  {Array} EXCLUDE_ARRAY Array of object types to exclude (they'll not
 *                 be in an array).
 * @return {Array} Array of filtered objects.
 */
GameObjectsManager.prototype.getAll = function(EXCLUDE_ARRAY) {
	var excludeArray = EXCLUDE_ARRAY;
	if (excludeArray === undefined)
		excludeArray = [];
	var allObjects = [];

	for (var O in this.objects) {
		var index = excludeArray.indexOf(O);
		if (index !== -1) continue;
		allObjects = allObjects.concat(this.objects[O]);
	}
	return allObjects;
};

/**
 * Wherever field is empty, create 'VOID' type object.
 */
GameObjectsManager.prototype.createEmptyObjects = function() {
	var inhabitet = 0;
	for (var i = 0; i < SC.MAP_TILES_X; i++) {
		for (var j = 0; j < SC.MAP_TILES_Y; j++) {
			if (this.tilesManager.get(i, j) === undefined)
				this.create(new GameObjectParams(
					GOT.VOID, {
						x: i,
						y: j
					}, {
						x: 0,
						y: 0
					}, 0, {}));
		}
	}
};

/**
 * Remove object from collecion, remove from TilesManager.
 */
GameObjectsManager.prototype.remove = function(GAME_OBJECT) {
	var objectsType = this.objects[GAME_OBJECT.type];
	var first = true;
	for (var I in objectsType)
		if (objectsType[I] === GAME_OBJECT) {
			objectsType.splice(I, 1);
			break;
		}
	this.tilesManager.remove(GAME_OBJECT);
	GAME_OBJECT.destroy();
	this.check();
};

/**
 * Count objects of a given type.
 * @param  {String} GAME_OBJECT_TYPE Type from GameObjectType alias GOT. If
 *                                   undefined, count all objects.
 * @return {Number} Number of counted objects.
 */
GameObjectsManager.prototype.count = function(GAME_OBJECT_TYPE) {
	var count = 0;
	if (GAME_OBJECT_TYPE === undefined)
		for (var type in this.objects)
			for (var objI = 0; objI < this.objects[type].length; objI++)
				count++;
	else {
		var OBJECTS_TYPE = this.objects[GAME_OBJECT_TYPE];
		if (OBJECTS_TYPE !== undefined)
			count = OBJECTS_TYPE.length;
	}
	return count;
};

/**
 * Count object of a given type, which wait to be created (e.g. heroes waiting
 * in huts)
 */
GameObjectsManager.prototype.countWaiting = function(GAME_OBJECT_TYPE) {
	if (GAME_OBJECT_TYPE === GOT.HERO)
		return this.managers[GOT.HUT].countHeroes();
	return 0;
};

GameObjectsManager.prototype.check = function() {
	var num1 = this.count();
	var num2 = this.tilesManager.count();
	if (num1 != num2)
		console.error("check " + num1 + " " + num2);
};

GameObjectsManager.prototype.push = function(GAME_OBJECT) {
	type = GAME_OBJECT.type;
	if (this.objects[type] === undefined) {
		this.objects[type] = [];
	}
	this.objects[type].push(GAME_OBJECT);
};

GameObjectsManager.prototype.onLevelLoaded = function() {
	for (var manager in this.managers) {
		this.managers[manager].onLevelLoaded();
	}
};

GameObjectsManager.prototype.onMovementIter = function() {
	// movement iteration
	for (var manager in this.managers)
		this.managers[manager].onIter(this);
};