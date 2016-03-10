function LevelsManager(game, gameObjectsManager) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.groupLevels = this.game.add.group();
	this.level = undefined;
	this.levelId = 1;
	this.loadLevel(this.levelId);
};

LevelsManager.prototype.reloadLevel = function() {
	this.loadLevel(this.levelId);
};

LevelsManager.prototype.loadLevel = function(levelId) {
	this.levelId = levelId;

	var levelIdString = this.levelId.toString();
	if (levelIdString.length === 1)
		levelIdString = '0' + levelIdString;

	if (this.level !== undefined)
		this.level.unload(); // also objects from GameObjectsManager
	this.level = new Level(
		levelIdString,
		this.game,
		this.groupLevels,
		this.gameObjectsManager,
		this.getDescription(levelIdString));
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