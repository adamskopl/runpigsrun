function CursorSpritesManager(game, toolsManager) {
	this.game = game;
	this.groupGuiSprites = this.game.add.group();
	this.sprites = {};
	this.toolsManager = toolsManager;
};

CursorSpritesManager.prototype.createCursorSprites = function() {
	var tools = [GOT.TOOL_BOUNCER, GOT.TOOL_DUMMY];
	var sName = assetsConstants.SPREADSHEET_BASIC;
	for (var i in tools) {
		var type = tools[i];
		var gid = GOC[type].gid;
		var sprite = this.groupGuiSprites.create(-100, -100, sName, gid);
		sprite.anchor.x = sprite.anchor.y = 0.5;
		sprite.scale.x = sprite.scale.y = scaleConstants.MAIN_SCALE;
		this.sprites[type] = sprite;
	}
};

/**
 * Hide sprites.
 * @return {[type]} [description]
 */
CursorSpritesManager.prototype.resetSprites = function() {
	for (var i in this.sprites)
		this.sprites[i].x = this.sprites[i].y = -100;
};

CursorSpritesManager.prototype.onCurrentToolChange = function() {
	this.resetSprites();
};

CursorSpritesManager.prototype.onButtonTileOver = function(gamePos) {
	var screenPos = gamePosToScreenPos(gamePos);
	var tool = this.toolsManager.currentTool;
	if (tool !== undefined) {
		this.sprites[tool].x = screenPos.x;
		this.sprites[tool].y = screenPos.y;
	}
};