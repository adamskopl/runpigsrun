function GameplayManager(game) {
	this.game = game;
	this.tilesManager = new TilesManager();
	this.gameObjectsManager = new GameObjectsManager(game, this.tilesManager);
	this.movementManager = new MovementManager(game, this.tilesManager, this);
	this.iterGuard = {
		count: 0,
		guardFinished: false,
		movementFinished: false
	};
};

GameplayManager.prototype.startIter = function() {
	this.gameObjectsManager.onIter();
	this.movementManager.updateDirections();
	this.movementManager.moveAll();
	this.game.add.tween(this.iterGuard).to({
		count: scaleConstants.TILE_SIZE_SCALED
	}, gameplayConstants.OBJECT_SPEED, Phaser.Easing.Linear.In, true, 0, 0, 0).
	onComplete.add(onIterFinished, this);
};

GameplayManager.prototype.onMovementIterFinished = function() {
	this.iterGuard.movementFinished = true;
};

function onIterFinished() {
	if (!this.iterGuard.movementFinished) {
		console.log("movement not finished");
		return;
	}
	this.startIter();
}