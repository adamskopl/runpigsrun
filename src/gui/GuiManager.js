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
	this.toolsManager.signalToolNumberModified.add(this.slotToolNumberModified, this);

	this.cursorSpritesManager = new CursorSpritesManager(game, this.groupGui);

	this.graphics = game.add.graphics(0, 0);
	this.graphicsParameters = {
		fill: 0x39469E,
		lineStyle: {
			width: 1,
			color: 0x000000,
			alpha: 1
		}
	};
	this.panelLevelEnd = undefined;

	this.buttonsToolsLevel = [];
	this.buttonStartLevel = {};
	this.buttonLevelPrev = {};
	this.buttonLevelNext = {};
	this.signals = {
		"startLevel": new Phaser.Signal(),
		"levelPrev": new Phaser.Signal(),
		"levelNext": new Phaser.Signal(),
		"levelEndOk": new Phaser.Signal()
	};

	this.createToolbar();
	this.cursorSpritesManager.createCursorSprites();
	this.createButtonsLevelModification();
	this.tilesButtonsManager.createTilesButtons();
};

GuiManager.prototype.dispatch = function(signalName) {
	this.signals[signalName].dispatch();
}

GuiManager.prototype.reload = function() {
	for (var i in this.buttonsToolsLevel)
		this.buttonsToolsLevel[i].destroy();
	this.buttonsToolsLevel.length = 0;
	this.createButtonsToolsLevel();
	this.toolsManager.reload(
		this.levelsManager.getCurrentLevel().description.tools);
	this.game.world.bringToTop(this.groupGui);
};

GuiManager.prototype.createToolbar = function() {
	this.graphics.beginFill(this.graphicsParameters.fill);
	this.graphics.lineStyle(this.graphicsParameters.lineStyle.width,
		this.graphicsParameters.lineStyle.color,
		this.graphicsParameters.lineStyle.alpha);
	this.graphics.drawRect(0, 0,
		scaleConstants.GAME_W,
		scaleConstants.TILE_SIZE_SCALED);
};

/**
 * Show panel ending level.
 * @param  {Bool} GAME_RESULT true: win, false: lose
 */
GuiManager.prototype.showPanelLevelEnd = function(GAME_RESULT) {
	if (this.panelLevelEnd === undefined) {
		this.panelLevelEnd = new PanelLevelEnd(this.game, this.groupGui,
			this.graphicsParameters);
		this.panelLevelEnd.signals["buttonOk"].add(
			this.slotButtonPanelLevelEndOk, this);
	}
	this.panelLevelEnd.showPanel(GAME_RESULT);
};

GuiManager.prototype.hidePanelLevelEnd = function() {
	this.panelLevelEnd.hidePanel();
};

GuiManager.prototype.createButtonsToolsLevel = function() {
	var currentTools =
		this.levelsManager.getCurrentLevel().description.tools;
	for (var i in currentTools)
		this.buttonsToolsLevel.push(
			new ButtonTool(currentTools[i][0], i, this.game, this));
};

GuiManager.prototype.createButtonsLevelModification = function() {
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
	this.toolsManager.onTileChoice(gamePos);
};

GuiManager.prototype.slotButtonTileOver = function(gamePos) {
	this.cursorSpritesManager.onButtonTileOver(gamePos);
};

GuiManager.prototype.slotButtonPanelLevelEndOk = function() {
	this.dispatch("levelEndOk");
};

GuiManager.prototype.slotToolNumberModified = function(TOOL_TYPE, CURRENT_NUMBER) {
	for (var B in this.buttonsToolsLevel) {
		var button = this.buttonsToolsLevel[B];
		if (button.type === TOOL_TYPE)
			button.setEnabled(CURRENT_NUMBER !== 0 ? true : false);
	}
};