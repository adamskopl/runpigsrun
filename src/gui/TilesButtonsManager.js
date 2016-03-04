function TilesButtonsManager(game, guiManager) {
	this.game = game;
	this.buttons = [];
	this.guiManager = guiManager;
};

TilesButtonsManager.prototype.reload = function() {
	for (var i in this.buttons)
		this.buttons[i].buttonPhaser.bringToTop();
};

function ButtonTile(game, gamePos, manager) {
	this.gamePos = gamePos;
	this.manager = manager;
	this.buttonPhaser = {};
	var sName = assetsConstants.SPREADSHEET_GUI;

	var screenPos = gamePosToScreenPos(this.gamePos);
	var button = game.add.button(
		screenPos.x, screenPos.y, sName,
		function() {
			this.manager.onButton(gamePos);
		}, this, 1, 0, 1, 0);
	button.scale.x = button.scale.y =
		scaleConstants.MAIN_SCALE;
	button.anchor.x = button.anchor.y = 0.5;

	button.onInputOver.add(
		function() {
			this.manager.onButtonOver(gamePos);
		}, this, 0, {}
	);

	this.buttonPhaser = button;
};

TilesButtonsManager.prototype.createTilesButtons = function() {
	for (var i = 0; i < scaleConstants.MAP_TILES_X; i++)
		for (var j = 0; j < scaleConstants.MAP_TILES_Y; j++)
			this.buttons.push(new ButtonTile(this.game, {
				x: i,
				y: j
			}, this));
};

TilesButtonsManager.prototype.onButton = function(gamePos) {
	this.guiManager.onButtonTile(gamePos);
};

TilesButtonsManager.prototype.onButtonOver = function(gamePos) {
	this.guiManager.onButtonTileOver(gamePos);
};