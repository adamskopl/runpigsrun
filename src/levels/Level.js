function Level(levelId, game, gameObjectsManager, description) {
	this.levelId = levelId;
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.description = description;
	this.map = {};
	this.tilemapLayers = [];
	this.loadMap();
	this.loadObjects();
};

Level.prototype.unload = function() {
	this.map.destroy();
	for (var i in this.tilemapLayers) {
		console.log("des");
		this.tilemapLayers[i].destroy();
	}
	this.map = {};
	this.tilemapLayers = [];
	this.gameObjectsManager.clear();
};

Level.prototype.loadMap = function() {
	this.map = this.game.add.tilemap('level' + this.levelId);
	return;
	this.map.addTilesetImage('basictiles', assetsConstants.SPREADSHEET_BASIC);
	this.tilemapLayers.push(this.map.createLayer('background0',
		scaleConstants.GAME_W, scaleConstants.GAME_H));
	this.tilemapLayers.push(this.map.createLayer('background1',
		scaleConstants.GAME_W, scaleConstants.GAME_H));

	for (var i in this.tilemapLayers) {
		this.tilemapLayers[i].scale.x = scaleConstants.MAIN_SCALE;
		this.tilemapLayers[i].scale.y = scaleConstants.MAIN_SCALE;
		this.tilemapLayers[i].x =
			scaleConstants.GAME_OFFSET_X * scaleConstants.TILE_SIZE_SCALED;
		this.tilemapLayers[i].y =
			scaleConstants.GAME_OFFSET_Y * scaleConstants.TILE_SIZE_SCALED;
		this.tilemapLayers[i].fixedToCamera = false;
	}
};

Level.prototype.loadObjects = function() {
	var objectsLevel = this.map.objects.objectsLevel;
	for (var i = 0; i < objectsLevel.length; i++) {
		this.gameObjectsManager.create(
			tileObjectToGameObjectParams(objectsLevel[i]));
	}
	this.addSurroundingRoads();
	this.gameObjectsManager.onLevelLoaded();
};

/**
 * Add roads outside the level to easily allow objects to exit
 * and to remove them from the game.
 */
Level.prototype.addSurroundingRoads = function() {
	for (var i = 0; i < scaleConstants.MAP_TILES_X; i++) {
		var params = [];
		for (var p = 0; p < 4; p++) {
			params.push(new GameObjectParams(GOT.ROAD));
		}
		//top
		params[0].gamePos.x = i;
		params[0].gamePos.y = -1;
		//left
		params[1].gamePos.x = -1;
		params[1].gamePos.y = i;
		//right
		params[2].gamePos.x = scaleConstants.MAP_TILES_X;
		params[2].gamePos.y = i;
		//bottom
		params[3].gamePos.x = i;
		params[3].gamePos.y = scaleConstants.MAP_TILES_X;
		for (var p in params) {
			this.gameObjectsManager.create(params[p]);
		}
	}
};