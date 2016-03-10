/**
 * Main class for managing gui.
 */
function GuiManager(game, levelsManager, toolsManager) {
	this.game = game;
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
	this.buttonLevelPrev = {};
	this.buttonLevelNext = {};
	this.signals = {
		"startLevel": new Phaser.Signal(),
		"levelPrev": new Phaser.Signal(),
		"levelNext": new Phaser.Signal()
	};

	this.createToolbar();
	this.cursorSpritesManager.createCursorSprites();
	this.createButtonsCurrentLevel();
	this.createButtonsLevels();
	this.tilesButtonsManager.createTilesButtons();
};

GuiManager.prototype.dispatch = function(signalName) {
	this.signals[signalName].dispatch();
}

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

GuiManager.prototype.createButtonsLevels = function() {
	var sName = assetsConstants.SPREADSHEET_BASIC;
	var sName2 = assetsConstants.SPREADSHEET_THINGS;
	var buttons = [];
	var buttonsParams = [
		[sName, 16, 17, "startLevel"],
		[sName2, 52, 53, "levelNext"],
		[sName2, 52, 51, "levelPrev"]
	];
	for (var i = 0; i < 3; i++) {
		buttons.push(this.game.add.button(
			scaleConstants.GAME_W - scaleConstants.TILE_SIZE_SCALED * (i + 1),
			0, buttonsParams[i][0],
			this.dispatch.bind(this, buttonsParams[i][3]),
			this, buttonsParams[i][1],
			buttonsParams[i][2], buttonsParams[i][2], buttonsParams[i][2]
		));
		buttons[i].scale.x = buttons[i].scale.y = scaleConstants.MAIN_SCALE;
	}
	this.buttonStartLevel = buttons[0];
	this.buttonLevelPrev = buttons[1];
	this.buttonLevelNext = buttons[2];
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