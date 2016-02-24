/**
 * Main class for managing gui.
 */
function GuiManager(game, levelsManager, toolsManager) {
	this.game = game;
	this.levelsManager = levelsManager;
	this.tilesButtonsManager = new TilesButtonsManager(game, this);
	this.toolsManager = toolsManager;
	this.cursorSpritesManager = new CursorSpritesManager(game, toolsManager);
	this.graphics = game.add.graphics(0, 0);

	this.buttonsCurrentLevel = [];

	this.createToolbar();
	this.cursorSpritesManager.createCursorSprites();
	this.createbuttonsCurrentLevel();
	this.tilesButtonsManager.createTilesButtons();
};

GuiManager.prototype.createToolbar = function() {
	this.graphics.beginFill(0x39469E);
	this.graphics.lineStyle(1, 0x000000, 1);
	this.graphics.drawRect(0, 0,
		scaleConstants.GAME_W,
		scaleConstants.TILE_SIZE_SCALED);
};

GuiManager.prototype.createbuttonsCurrentLevel = function() {
	var currentTools =
		this.levelsManager.getCurrentLevel().description.tools;
	for (var i in currentTools) {
		this.buttonsCurrentLevel.push(
			new ButtonTool(currentTools[i], i, this.game, this));
	}
};

/**
 * Tool button in toolbacr clicked;
 */
GuiManager.prototype.onButtonTool = function(type) {
	this.toolsManager.onCurrentToolChange(type);
	this.cursorSpritesManager.onCurrentToolChange();
};

/**
 * Tile (tile's button) clicked.
 */
GuiManager.prototype.onButtonTile = function(gamePos) {
	this.toolsManager.onToolChoice(gamePos);
};

GuiManager.prototype.onButtonTileOver = function(gamePos) {
	this.cursorSpritesManager.onButtonTileOver(gamePos);
};