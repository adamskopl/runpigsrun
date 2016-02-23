function ButtonTool(type, orderNumber, game, guiManager) {
	this.type = type;
	this.buttonPhaser = {};
	this.guiManager = guiManager;

	var sName = assetsConstants.SPREADSHEET_BASIC;
	var gid = GOC[type].gid;

	var posX = orderNumber * scaleConstants.TILE_SIZE_SCALED;
	this.buttonPhaser = game.add.button(
		posX, 0, sName,
		function() {
			this.guiManager.onButtonTool(this.type);
		}, this,
		17, gid, gid, gid);
	this.buttonPhaser.scale.x = this.buttonPhaser.scale.y =
		scaleConstants.MAIN_SCALE;

	this.buttonPhaser.onInputOver.add(function() {}, this, 0, {});
};