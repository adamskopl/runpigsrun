/**
 * Main class for managing gui.
 */
function GuiManager(game, levelsManager) {
	this.game = game;
	this.levelsManager = levelsManager;
	this.graphics = game.add.graphics(0, 0);

	this.currentLevelButtons = [];

	this.createToolbar();
	this.createCurrentLevelButtons();
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
			new ButtonTool(currentTools[i], i, this.game));
	}
};