function CursorSpritesManager(game) {
	this.game = game;
	this.groupGuiSprites = this.game.add.group();
	this.sprites = {};
	this.currentTool = undefined;
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

CursorSpritesManager.prototype.onCurrentToolChange = function(type) {
	this.currentTool = type;
};

CursorSpritesManager.prototype.onButtonTileOver = function(gamePos) {
	var screenPos = gamePosToScreenPos(gamePos);
	if (this.currentTool !== undefined) {
		this.sprites[this.currentTool].x = screenPos.x;
		this.sprites[this.currentTool].y = screenPos.y;
	}
};