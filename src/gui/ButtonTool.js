function ButtonTool(type, orderNumber, game, guiManager) {
	this.game = game;
	this.type = type;
	this.buttonPhaser = {};
	this.guiManager = guiManager;

	var sName = assetsConstants.SPREADSHEET_BASIC;
	var gid = GOC[type].gid;

	var posX = orderNumber * SC.TILE_SIZE_SCALED;
	this.buttonPhaser = game.add.button(
		posX, 0, sName,
		function() {
			this.guiManager.onButtonTool(this.type);
		}, this,
		17, gid, gid, gid);
	this.buttonPhaser.scale.x = this.buttonPhaser.scale.y =
		SC.MAIN_SCALE;

	this.buttonPhaser.anchor.x = this.buttonPhaser.anchor.y = 0.5;
	this.buttonPhaser.x += SC.TILE_SIZE_SCALED / 2;
	this.buttonPhaser.y += SC.TILE_SIZE_SCALED / 2;

	this.buttonPhaser.onInputOver.add(function() {}, this, 0, {});
	this.enabled = true;
	this.tween = {};
};

ButtonTool.prototype.destroy = function() {
	this.buttonPhaser.destroy();
};

ButtonTool.prototype.setEnabled = function(ENABLED) {
	if (this.enabled === ENABLED) return;
	this.enabled = ENABLED;
	var scale = ENABLED ? 1 : 0.4;
	this.tween = this.game.add.tween(this.buttonPhaser.scale).to({
		x: SC.MAIN_SCALE * scale,
		y: SC.MAIN_SCALE * scale
	}, 80, Phaser.Easing.Linear.In, true, 0, 0, 0);
};