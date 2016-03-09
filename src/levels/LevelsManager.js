function LevelsManager(game, gameObjectsManager) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.groupLevels = this.game.add.group();
	this.level = undefined;
	this.currentLevelId = undefined;
};

LevelsManager.prototype.reloadLevel = function() {
	this.loadLevel(this.currentLevelId);
};

LevelsManager.prototype.loadLevel = function(levelId) {
	if (this.level !== undefined)
		this.level.unload(); // also objects from GameObjectsManager
	this.currentLevelId = levelId;
	this.level = new Level(
		levelId,
		this.game,
		this.groupLevels,
		this.gameObjectsManager,
		this.getDescription(levelId));
};

LevelsManager.prototype.getCurrentLevel = function() {
	return this.level;
};

LevelsManager.prototype.getDescription = function(id) {
	for (i in LevelsDescriptions)
		if (LevelsDescriptions[i].id === id)
			return LevelsDescriptions[i];
};

LevelsDescriptions = Object.freeze([{
	id: '00',
	tools: []
}, {
	id: '01',
	tools: [GOT.TOOL_BOUNCER, GOT.TOOL_DUMMY]
}]);