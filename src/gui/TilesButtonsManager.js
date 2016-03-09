function TilesButtonsManager(game, groupGui) {
	this.game = game;
	this.groupGui = groupGui;
	this.buttons = [];
	this.signalButtonTile = new Phaser.Signal();
	this.signalButtonTileOver = new Phaser.Signal();
};

function ButtonTile(game, groupGui, gamePos, manager) {
	this.gamePos = gamePos;
	this.manager = manager;
	this.buttonPhaser = {};
	var sName = assetsConstants.SPREADSHEET_GUI;

	var screenPos = gamePosToScreenPos(this.gamePos);
	var button = game.add.button(
		screenPos.x, screenPos.y, sName,
		function() {
			this.manager.onButton(gamePos);
		}, this, 1, 0, 1, 0, groupGui);
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
			this.buttons.push(new ButtonTile(this.game, this.groupGui, {
				x: i,
				y: j
			}, this));
};

TilesButtonsManager.prototype.onButton = function(gamePos) {
	this.signalButtonTile.dispatch(gamePos);
};

TilesButtonsManager.prototype.onButtonOver = function(gamePos) {
	this.signalButtonTileOver.dispatch(gamePos);
};