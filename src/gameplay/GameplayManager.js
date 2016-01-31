function GameplayManager(game) {
	this.game = game;
	this.tilesManager = new TilesManager();
	this.gameObjectsManager = new GameObjectsManager(game, this.tilesManager);
	this.movementManager = new MovementManager(game, this.tilesManager, this);
};

GameplayManager.prototype.start = function() {
	this.movementManager.updateDirections();
	this.movementManager.moveAll();
};

GameplayManager.prototype.onMovementIterFinished = function() {
	this.start();
};