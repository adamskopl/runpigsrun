function GameObjectsManager(game, tilesManager) {
	this.game = game;
	this.tilesManager = tilesManager;
	this.objects = {};
	this.groupGeneral = this.game.add.group();
	this.managers = {}; // concrete managers
	this.initManagers();
};

GameObjectsManager.prototype.initManagers = function() {
	this.objects[GOT.HUT] = [];
	this.managers[GOT.HUT] = new GameObjectsManagerHuts(
		this.objects[GOT.HUT]);
};

GameObjectsManager.prototype.clear = function() {
	for (var i in this.objects)
		for (var j in this.objects[i])
			this.objects[i][j].destroy();
	for (var i in this.objects)
		this.objects[i].length = 0; // warning: reference in concrete managers
	this.tilesManager.clear();
	this.groupGeneral.removeAll();
};

GameObjectsManager.prototype.create = function(gameObjectParams) {
	gameObject = new GameObject(this.groupGeneral,
		gameObjectParams);
	this.push(gameObject);
	this.tilesManager.put(gameObject, gameObjectParams.gamePos.x,
		gameObjectParams.gamePos.y);
	this.check();
	return gameObject;
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