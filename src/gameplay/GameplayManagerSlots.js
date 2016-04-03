GameplayManager.prototype.slotLevelLoaded = function() {
	this.movementManager.setStartingDirections();
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

GameplayManager.prototype.slotButtonLevelEndOk = function() {
	this.guiManager.hidePanelLevelEnd();
	this.reloadAll();
};