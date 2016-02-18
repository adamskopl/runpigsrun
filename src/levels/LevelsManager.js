function LevelsManager(game, gameObjectsManager) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.levels = {};
};

LevelsManager.prototype.loadLevel = function(levelId) {
	var map = this.game.add.
	map = this.game.add.tilemap('level' + levelId);
	map.addTilesetImage('basictiles', assetsConstants.SPREADSHEET_BASIC);

	var backgroundLayers = [];
	backgroundLayers.push(map.createLayer('background0',
		scaleConstants.GAME_W, scaleConstants.GAME_H));
	backgroundLayers.push(map.createLayer('background1',
		scaleConstants.GAME_W, scaleConstants.GAME_H));
	for (var i in backgroundLayers) {
		backgroundLayers[i].scale.x = scaleConstants.MAIN_SCALE;
		backgroundLayers[i].scale.y = scaleConstants.MAIN_SCALE;
		backgroundLayers[i].x =
			scaleConstants.GAME_OFFSET_X * scaleConstants.TILE_SIZE_SCALED;
		backgroundLayers[i].y =
			scaleConstants.GAME_OFFSET_Y * scaleConstants.TILE_SIZE_SCALED;
		backgroundLayers[i].fixedToCamera = false;
	}

	var level = new Level(
		this.game,
		this.gameObjectsManager,
		new LevelTileObjects(map, backgroundLayers, map.objects),
		LevelsDescriptions[levelId]);
	this.levels[levelId] = level;
};

LevelsManager.prototype.getCurrentLevel = function() {
	return this.levels['01'];
};

LevelsDescriptions = Object.freeze({
	'00': {
		tools: []
	},
	'01': {
		tools: [GOT.TOOL_BOUNCER, GOT.TOOL_DUMMY]
	}
});