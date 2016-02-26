function GameplayManager(game) {
	this.game = game;
	this.tilesManager = new TilesManager();
	this.gameObjectsManager = new GameObjectsManager(game, this.tilesManager);
	this.movementManager = new MovementManager(game, this.gameObjectsManager,
		this.tilesManager, this);
	this.collisionsHandler = new CollisionsHandler(
		this.gameObjectsManager, this.tilesManager);
	this.toolsManager = new ToolsManager(this.tilesManager,
		this.gameObjectsManager);
	this.iterGuard = {
		count: 0,
		guardFinished: false,
		movementFinished: false
	};
	// true means 'game movement phase'
	this.movementRunning = false;
};

GameplayManager.prototype.iterGuardReset = function() {
	this.iterGuard.count = 0;
	this.iterGuard.guardFinished = false;
	this.iterGuard.movementFinished = false;
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

GameplayManager.prototype.onButtonStart = function() {
	if (this.movementRunning === false)
		this.movementRunning = true;
	else return;
	this.startIter();
};

/**
 * Invoked by MovementManager. An object has reached its destiny.
 */
GameplayManager.prototype.onMovementIter = function(GAME_OBJECT, GAME_POS_PREV) {
	this.tilesManager.positionChanged(GAME_OBJECT, GAME_POS_PREV);
	this.collisionsHandler.positionChanged(GAME_OBJECT);
};

/**
 * Invoked by MovementManager. Alle movements are finished.
 */
GameplayManager.prototype.onMovementIterLast = function() {
	this.iterGuard.movementFinished = true;
};

GameplayManager.prototype.checkVictory = function() {
	if (this.gameObjectsManager.count(GOT.HERO) == 0)
		return true;
	return false;
};

function onIterFinished() {
	if (!this.iterGuard.movementFinished) {
		console.error("movement not finished");
		return;
	}
	this.collisionsHandler.handleCollisions();
	if (this.checkVictory()) {
		console.log("VICTORY");
	}
	this.iterGuardReset();
	this.startIter();
};