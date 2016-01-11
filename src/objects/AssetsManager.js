function AssetsManager(game) {
	this.game = game;

	this.game.load.tilemap('level00',
		'levels/00/level00.json', null, Phaser.Tilemap.TILED_JSON);

	this.game.load.tilemap('level01',
		'levels/01/level01.json', null, Phaser.Tilemap.TILED_JSON);

	this.game.load.spritesheet(assetsConstants.SPREADSHEET_CHARACTERS,
		'assets/tileset/characters_1.png',
		scaleConstants.TILE_SIZE, scaleConstants.TILE_SIZE);
	this.game.load.spritesheet(assetsConstants.SPREADSHEET_BASIC,
		'assets/tileset/basictiles_2.png',
		scaleConstants.TILE_SIZE, scaleConstants.TILE_SIZE);
	this.game.load.spritesheet(assetsConstants.SPREADSHEET_THINGS,
		'assets/tileset/things_0.png',
		scaleConstants.TILE_SIZE, scaleConstants.TILE_SIZE);
};