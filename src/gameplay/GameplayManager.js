function GameplayManager(game) {
	this.tilesManager = new TilesManager();
	this.gameObjectsManager = new GameObjectsManager(game, this.tilesManager);
	this.movementManager = new MovementManager(this.tilesManager);
};

GameplayManager.prototype.start = function() {
	// change directions
	this.updateDirections();
	this.moveAll();
};

GameplayManager.prototype.updateDirections = function() {
	this.tilesManager.callAll(updateDirection, [this.movementManager]);
};

GameplayManager.prototype.moveAll = function() {
	this.tilesManager.callAll(moveObject, [this.movementManager]);
};