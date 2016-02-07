function GameObjectsManager(game, tilesManager) {
	this.game = game;
	this.tilesManager = tilesManager;
	this.objects = {};
	// group will be created, when needed (if it'll be created before 
	// loading Tiled maps, it will be covered)
	this.groupGeneral = undefined;
	this.managers = {}; // concrete managers
	this.initManagers();
};

GameObjectsManager.prototype.initManagers = function() {
	this.objects[GOT.HUT] = [];
	this.managers[GOT.HUT] = new GameObjectsManagerHuts(
		this.objects[GOT.HUT]);
};

GameObjectsManager.prototype.create = function(gameObjectParams) {
	if (this.groupGeneral === undefined) {
		this.groupGeneral = this.game.add.group();
	}
	gameObject = new GameObject(this.groupGeneral,
		gameObjectParams);
	this.push(gameObject);
	this.tilesManager.put(gameObject, gameObjectParams.gamePos.x, gameObjectParams.gamePos.y);
	this.check();
	return gameObject;
};

GameObjectsManager.prototype.count = function() {
	var count = 0;
	for (var type in this.objects) {
		for (var objI = 0; objI < this.objects[type].length; objI++) {
			count++;
		}
	}
	return count;
};

GameObjectsManager.prototype.check = function() {
	var num1 = this.count();
	var num2 = this.tilesManager.count();
	if (num1 != num2)
		console.log("count error")
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

GameObjectsManager.prototype.onIter = function() {
	for (var manager in this.managers) {
		this.managers[manager].onIter(this);
	}
}