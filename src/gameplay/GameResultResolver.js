function GameResultResolver(gameObjectsManager) {
	this.gameObjectsManager = gameObjectsManager;
	this.signalVictory = new Phaser.Signal();
	this.signalLoss = new Phaser.Signal();

	/* 	Set during movement/collision handle. Indicates if victory 
	should be handled after one movement iteration. */
	this.resultObject = {
		victory: false,
		loss: false
	};
};

GameResultResolver.prototype.isVictory = function() {
	return this.resultObject.victory;
};

GameResultResolver.prototype.isLoss = function() {
	return this.resultObject.loss;
};

GameResultResolver.prototype.reload = function() {
	this.resultObject.victory = this.resultObject.loss = false;
};

GameResultResolver.prototype.slotObjectRemoved = function(OBJECT) {
	if (OBJECT.type === GOT.HERO)
		this.resultObject.loss = true;
};

GameResultResolver.prototype.slotObjectRescued = function(OBJECT) {
	if (OBJECT.type === GOT.HERO) {
		var HEROES_LEFT = this.gameObjectsManager.count(GOT.HERO) +
			this.gameObjectsManager.countWaiting(GOT.HERO);
		if (HEROES_LEFT === 1)
			this.resultObject.victory = true;
	}
};