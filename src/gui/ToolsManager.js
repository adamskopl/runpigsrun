function ToolsManager(tilesManager, gameObjectsManager) {
	this.tilesManager = tilesManager;
	this.gameObjectsManager = gameObjectsManager;
	this.currentTool = undefined;
	this.availableTools = undefined;
	this.signalToolNumberModified = new Phaser.Signal();
};

ToolsManager.prototype.reload = function(LEVEL_TOOLS) {
	if (this.availableTools !== undefined) {
		for (var T in this.availableTools)
			this.availableTools[T][3].length = 0;
		this.availableTools.length = 0;
	}
	this.availableTools = cloneProperties(LEVEL_TOOLS);
	for (var T in this.availableTools) {
		// third: number of unused tools:
		this.availableTools[T].push(this.availableTools[T][1]);
		// fourth: queue of chosen positions
		this.availableTools[T].push([]);
	}
};

ToolsManager.prototype.onCurrentToolChange = function(TOOL_TYPE) {
	this.currentTool = TOOL_TYPE;
};

ToolsManager.prototype.onTileChoice = function(GAME_POS) {
	if (this.currentTool === undefined) return;

	var TILE_TOOLS = this.tilesManager.getObjectsGameplayType(GAME_POS, GOGT.TOOL);
	if (TILE_TOOLS.length > 0) {
		if (TILE_TOOLS.length > 1)
			console.error("more than one tool");
		var TOOL = TILE_TOOLS[0];
		var TOOL_ARRAY = this.getToolArray(TOOL.type);
		if (TOOL_ARRAY === undefined) {
			console.error("no array for " + TOOL.type);
			return;
		}
		removeArrayObject(TOOL_ARRAY[3], TOOL);
		this.modifyToolCurrentNumber(TOOL.type, 1);
		this.gameObjectsManager.remove(TOOL);
		return;
	}

	if (this.posAcceptsTool(GAME_POS, this.currentTool)) {
		var NEW_TOOL = this.gameObjectsManager.create(new GameObjectParams(
			this.currentTool, {
				x: GAME_POS.x,
				y: GAME_POS.y
			}
		));
		var TOOL_ARRAY = this.getToolArray(this.currentTool);
		TOOL_ARRAY[3].push(NEW_TOOL);
		if (this.getToolCurrentNumber(this.currentTool) === 0) {
			// remove previously created tool (tools queue shift)
			var FIRST_TOOL = TOOL_ARRAY[3].shift();
			this.gameObjectsManager.remove(FIRST_TOOL);
		} else {
			this.modifyToolCurrentNumber(this.currentTool, -1);
		}
	}
};

ToolsManager.prototype.posAcceptsTool = function(GAME_POS, TOOL_TYPE) {
	var TILE = this.tilesManager.get(GAME_POS.x, GAME_POS.y);
	if (TILE === undefined) return;
	if (this.tilesManager.tileContainsGameplayType(GAME_POS, GOGT.TOOL))
		return false;
	for (var i in TILE)
		if (TILE[i].type === GOT.ROAD || TILE[i].type === GOT.BRIDGE)
			return true;
	return false;
};

/**
 * Get array describing tool of a given type.
 */
ToolsManager.prototype.getToolArray = function(TOOL_TYPE) {
	for (var T in this.availableTools)
		if (this.availableTools[T][0] === TOOL_TYPE)
			return this.availableTools[T];
	console.error("no array for " + TOOL_TYPE);
	return [];
};

/**
 * Get the starting number of a given tool for current level.
 */
ToolsManager.prototype.getToolStartNumber = function(TOOL_TYPE) {
	return this.getToolArray(TOOL_TYPE)[1];
};

/**
 * Get the starting number of a given tool for current level.
 */
ToolsManager.prototype.getToolCurrentNumber = function(TOOL_TYPE) {
	return this.getToolArray(TOOL_TYPE)[2];
};

/**
 * Modify number of available tools with a given number.
 */
ToolsManager.prototype.modifyToolCurrentNumber = function(TOOL_TYPE, NUMBER) {
	var ARR = this.getToolArray(TOOL_TYPE);
	ARR[2] += NUMBER;
	if (ARR[2] < 0)
		console.error("negative number of tools");
	this.signalToolNumberModified.dispatch(TOOL_TYPE, ARR[2]);
};