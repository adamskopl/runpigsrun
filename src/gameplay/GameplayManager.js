function GameplayManager(game) {
	this.tilesManager = new TilesManager();
	this.gameObjectsManager = new GameObjectsManager(game, this.tilesManager);
	this.movementManager = new MovementManager(this.tilesManager);
};

GameplayManager.prototype.start = function() {
	this.updateDirections();
};

GameplayManager.prototype.updateDirections = function() {
	this.tilesManager.callAll(updateDirection, [this.movementManager]);
};