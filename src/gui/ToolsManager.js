function ToolsManager(tilesManager, gameObjectsManager) {
	this.tilesManager = tilesManager;
	this.gameObjectsManager = gameObjectsManager;
	this.levelsManager = {};
	this.currentTool = undefined;
};

ToolsManager.prototype.setLevelsManager = function(levelsManager) {
	this.levelsManager = levelsManager;
};

ToolsManager.prototype.onCurrentToolChange = function(TOOL_TYPE) {
	this.currentTool = TOOL_TYPE;
};

ToolsManager.prototype.onToolChoice = function(GAME_POS) {
	if (this.currentTool === undefined) return;
	var TILE = this.tilesManager.get(GAME_POS.x, GAME_POS.y);
	if (TILE === undefined) return;
	if (this.tileAcceptsTool(TILE, this.currentTool)) {
		this.gameObjectsManager.create(new GameObjectParams(
			this.currentTool, {
				x: GAME_POS.x,
				y: GAME_POS.y
			}
		));
	}
};

ToolsManager.prototype.tileAcceptsTool = function(TILE, TOOL_TYPE) {
	for (var i in TILE)
		if (TILE[i].type === GOT.ROAD || TILE[i].type === GOT.BRIDGE)
			return true;
	return false;
};