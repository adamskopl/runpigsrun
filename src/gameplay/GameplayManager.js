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

	// members needed to be reloaded when necessary
	this.levelsManager = {};
	this.guiManager = {};

	this.iterGuard = {
		count: 0,
		guardFinished: false,
		movementFinished: false
	};
	// true means 'game movement phase'
	this.movementRunning = false;
};

GameplayManager.prototype.setMembers = function(levelsManager, guiManager) {
	this.levelsManager = levelsManager;
	this.guiManager = guiManager;
	this.guiManager.signals["startLevel"].add(this.slotButtonStartLevel, this);
	this.guiManager.signals["levelPrev"].add(this.slotButtonLevelPrev, this);
	this.guiManager.signals["levelNext"].add(this.slotButtonLevelNext, this);
};

GameplayManager.prototype.iterGuardReset = function() {
	this.iterGuard.count = 0;
	this.iterGuard.guardFinished = false;
	this.iterGuard.movementFinished = false;
};

GameplayManager.prototype.startMovementIter = function() {
	this.gameObjectsManager.onMovementIter();
	this.movementManager.updateDirections();
	this.movementManager.moveAll();

	// after adding movement tweens, add guard tween 
	// (which should end right after movement tweens)
	this.game.add.tween(this.iterGuard).to({
		count: scaleConstants.TILE_SIZE_SCALED
	}, gameplayConstants.OBJECT_SPEED, Phaser.Easing.Linear.In, true, 0, 0, 0).
	onComplete.add(onIterFinished, this);
};

GameplayManager.prototype.slotButtonStartLevel = function() {
	if (!this.movementRunning) {
		this.movementRunning = true;
		this.iterGuardReset();
	} else {
		console.log("can't start");
		return;
	}
	this.startMovementIter();
};

GameplayManager.prototype.slotButtonLevelPrev = function() {
	if (this.movementRunning) return;
	this.levelsManager.setLevelPrev();
	this.reloadAll();
};

GameplayManager.prototype.slotButtonLevelNext = function() {
	if (this.movementRunning) return;
	this.levelsManager.setLevelNext();
	this.reloadAll();
};

/**
 * Invoked by MovementManager. An object has reached its destiny.
 */
GameplayManager.prototype.onMovementIter = function(GAME_OBJECT, GAME_POS_PREV) {
	this.tilesManager.positionChanged(GAME_OBJECT, GAME_POS_PREV);
	this.collisionsHandler.positionChanged(GAME_OBJECT);
};

/**
 * Invoked by MovementManager. All movements are finished.
 */
GameplayManager.prototype.onMovementIterLast = function() {
	this.iterGuard.movementFinished = true;
};

GameplayManager.prototype.checkVictory = function() {
	if (this.gameObjectsManager.count(GOT.HERO) == 0)
		return true;
	return false;
};

GameplayManager.prototype.onVictory = function() {
	console.log("victory");
	this.reloadAll();
};

GameplayManager.prototype.reloadAll = function() {
	this.levelsManager.reloadLevel();
	this.guiManager.reload();
	this.movementRunning = false;
};

function onIterFinished() {
	if (!this.iterGuard.movementFinished) {
		console.error("movement not finished");
		return;
	}
	this.collisionsHandler.handleCollisions();
	if (this.checkVictory()) {
		this.onVictory();
	} else {
		this.iterGuardReset();
		this.startMovementIter();
	}
};