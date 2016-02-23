/**
 * Main class for managing gui.
 */
function GuiManager(game, levelsManager) {
	this.game = game;
	this.levelsManager = levelsManager;
	this.tilesButtonsManager = new TilesButtonsManager(game, this);
	this.cursorSpritesManager = new CursorSpritesManager(game);
	this.graphics = game.add.graphics(0, 0);

	this.currentLevelButtons = [];

	this.createToolbar();
	this.cursorSpritesManager.createCursorSprites();
	this.createCurrentLevelButtons();
	this.tilesButtonsManager.createTilesButtons();
};

GuiManager.prototype.createToolbar = function() {
	this.graphics.beginFill(0x39469E);
	this.graphics.lineStyle(1, 0x000000, 1);
	this.graphics.drawRect(0, 0,
		scaleConstants.GAME_W,
		scaleConstants.TILE_SIZE_SCALED);
};

GuiManager.prototype.createCurrentLevelButtons = function() {
	var currentTools =
		this.levelsManager.getCurrentLevel().description.tools;
	for (var i in currentTools) {
		this.currentLevelButtons.push(
			new ButtonTool(currentTools[i], i, this.game, this));
	}
};

GuiManager.prototype.onButtonTool = function(type) {
	this.cursorSpritesManager.onCurrentToolChange(type);
};

GuiManager.prototype.onButtonTile = function(gamePos) {
	console.log("on button tile " + gamePos.x + ", " + gamePos.y)
};

GuiManager.prototype.onButtonTileOver = function(gamePos) {
	this.cursorSpritesManager.onButtonTileOver(gamePos);
};