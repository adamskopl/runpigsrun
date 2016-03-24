function LevelsManager(game, gameObjectsManager) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.groupLevels = this.game.add.group();
	this.level = undefined;
	this.levelId = 0;
	this.levelIdMax = 1; // I'm soooooo lazy.
	this.loadLevel(this.levelId);
};

LevelsManager.prototype.reloadLevel = function() {
	this.loadLevel(this.levelId);
};

LevelsManager.prototype.setLevelPrev = function() {
	if (this.levelId === 0) return;
	this.levelId--;
};

LevelsManager.prototype.setLevelNext = function() {
	if (this.levelId === this.levelIdMax) return;
	this.levelId++;
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
	tools: [
		[GOT.SIGNPOST, 3],
		[GOT.TOOL_DUMMY, 1]
	]
}, {
	id: '01',
	tools: [
		[GOT.TOOL_BOUNCER, 4],
		[GOT.TOOL_DUMMY, 1]
	]
}]);