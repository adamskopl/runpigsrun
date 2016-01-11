function LevelsManager(game) {
	this.game = game;
	this.levels = {};
};

LevelsManager.prototype.loadLevel = function(levelId) {
	var map = this.game.add.
	map = this.game.add.tilemap('level' + levelId);
	map.addTilesetImage('basictiles', assetsConstants.SPREADSHEET_BASIC);
	backgroundLayer = map.createLayer('background0',
		scaleConstants.GAME_W, scaleConstants.GAME_H);
	backgroundLayer2 = map.createLayer('background1',
		scaleConstants.GAME_W, scaleConstants.GAME_H);

	backgroundLayer.scale.x = scaleConstants.MAIN_SCALE;
	backgroundLayer.scale.y = scaleConstants.MAIN_SCALE;
	backgroundLayer2.scale.x = scaleConstants.MAIN_SCALE;
	backgroundLayer2.scale.y = scaleConstants.MAIN_SCALE;

	var level = new Level(
		this.game,
		new LevelTileObjects(map, {
				backgroundLayer,
				backgroundLayer2
			},
			map.objects));
	this.levels[levelId] = level;
}