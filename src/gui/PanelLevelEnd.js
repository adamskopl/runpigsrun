function PanelLevelEnd(game, groupGui, graphicsParameters) {
	this.game = game;
	this.groupGui = groupGui;
	this.graphicsParameters = graphicsParameters;
	this.graphics = game.add.graphics(0, 0);
	this.graphicsParameters = {
		fillWin: 0x3FA317,
		fillLose: 0x1F1A1A,
		lineStyle: graphicsParameters.lineStyle
	};

	var dim = 200;
	this.panelParameters = {
		dim: dim,
		x: scaleConstants.GAME_W / 2 - dim / 2,
		y: scaleConstants.GAME_H / 2 - dim / 2
	};

	this.signals = {
		"buttonOk": new Phaser.Signal()
	};

	this.createButtonOk();
};

PanelLevelEnd.prototype.createButtonOk = function() {
	this.buttonOk = this.game.add.button(
		this.panelParameters.x, this.panelParameters.y,
		assetsConstants.SPREADSHEET_BASIC,
		this.dispatch.bind(this, "buttonOk"), this, 35, 36, 36, 35,
		this.groupGui
	);
	var offset = this.panelParameters.dim / 2 - scaleConstants.TILE_SIZE_SCALED / 2;
	this.buttonOk.x += offset;
	this.buttonOk.y += offset;
	this.buttonOk.scale.x = this.buttonOk.scale.y = scaleConstants.MAIN_SCALE;
};

PanelLevelEnd.prototype.dispatch = function(signalName) {
	this.signals[signalName].dispatch();
};

PanelLevelEnd.prototype.hidePanel = function() {
	this.graphics.clear();
	this.buttonOk.visible = false;
};

PanelLevelEnd.prototype.showPanel = function(GAME_RESULT) {
	this.graphics.clear();
	this.game.world.bringToTop(this.graphics);
	this.game.world.bringToTop(this.groupGui);

	this.buttonOk.visible = true;
	this.buttonOk.bringToTop();

	var fillColor = GAME_RESULT ?
		this.graphicsParameters.fillWin : this.graphicsParameters.fillLose;
	this.graphics.beginFill(fillColor);
	this.graphics.lineStyle(this.graphicsParameters.lineStyle.width,
		this.graphicsParameters.lineStyle.color,
		this.graphicsParameters.lineStyle.alpha);
	this.graphics.drawRoundedRect(
		this.panelParameters.x, this.panelParameters.y,
		this.panelParameters.dim, this.panelParameters.dim, 8);
};