/**
 * Main class for managing gui.
 */
function GuiManager(game, gameplayManager, levelsManager, toolsManager) {
	this.game = game;
	this.gameplayManager = gameplayManager;
	this.levelsManager = levelsManager;
	this.toolsManager = toolsManager;

	this.groupGui = this.game.add.group();

	this.tilesButtonsManager = new TilesButtonsManager(game, this.groupGui);
	this.tilesButtonsManager.signalButtonTile.add(this.slotButtonTile, this);
	this.tilesButtonsManager.signalButtonTileOver.add(this.slotButtonTileOver, this);

	this.cursorSpritesManager = new CursorSpritesManager(game, this.groupGui);

	this.graphics = game.add.graphics(0, 0);

	this.buttonsCurrentLevel = [];
	this.buttonStartLevel = {};

	this.createToolbar();
	this.cursorSpritesManager.createCursorSprites();
	this.createButtonsCurrentLevel();
	this.createButtonStartLevel();
	this.tilesButtonsManager.createTilesButtons();
};

GuiManager.prototype.reload = function() {
	this.game.world.bringToTop(this.groupGui);
};

GuiManager.prototype.createToolbar = function() {
	this.graphics.beginFill(0x39469E);
	this.graphics.lineStyle(1, 0x000000, 1);
	this.graphics.drawRect(0, 0,
		scaleConstants.GAME_W,
		scaleConstants.TILE_SIZE_SCALED);
};

GuiManager.prototype.createButtonsCurrentLevel = function() {
	var currentTools =
		this.levelsManager.getCurrentLevel().description.tools;
	for (var i in currentTools) {
		this.buttonsCurrentLevel.push(
			new ButtonTool(currentTools[i], i, this.game, this));
	}
};

GuiManager.prototype.createButtonStartLevel = function() {
	var sName = assetsConstants.SPREADSHEET_BASIC;
	this.buttonStartLevel = this.game.add.button(
		scaleConstants.GAME_W - scaleConstants.TILE_SIZE_SCALED,
		0, sName,
		function() {
			this.gameplayManager.onButtonStart();
		}, this, 22, 17, 17, 17
	);
	this.buttonStartLevel.scale.x = this.buttonStartLevel.scale.y =
		scaleConstants.MAIN_SCALE;
};

/**
 * Tool button in toolbacr clicked;
 */
GuiManager.prototype.onButtonTool = function(type) {
	this.toolsManager.onCurrentToolChange(type);
	this.cursorSpritesManager.onCurrentToolChange(type);
};

/**
 * Tile (tile's button) clicked.
 */
GuiManager.prototype.slotButtonTile = function(gamePos) {
	this.toolsManager.onToolChoice(gamePos);
};

GuiManager.prototype.slotButtonTileOver = function(gamePos) {
	this.cursorSpritesManager.onButtonTileOver(gamePos);
};