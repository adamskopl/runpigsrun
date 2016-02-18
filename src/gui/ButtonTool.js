function ButtonTool(type, number, game) {
	this.type = type;
	this.buttonPhaser = {};

	var sName = assetsConstants.SPREADSHEET_BASIC;
	var gid = GOC[type].gid;

	var posX = number * scaleConstants.TILE_SIZE_SCALED;
	this.buttonPhaser = game.add.button(
		posX, 0, sName,
		function() {
			console.log("CLICK");
		}, this,
		17, gid, gid, gid);

	this.buttonPhaser.scale.x = this.buttonPhaser.scale.y =
		scaleConstants.MAIN_SCALE;
};