function LevelTileObjects(map, backgroundLayers, objectsLayers) {
	this.map = map;
	this.backgroundLayers = backgroundLayers;
	this.objectsLayers = objectsLayers;
};

function Level(game, gameObjectsManager, tileObjects) {
	this.game = game;
	this.gameObjectsManager = gameObjectsManager;
	this.tileObjects = tileObjects;
	this.loadObjects();
};

Level.prototype.loadObjects = function() {
	var objectsLevel = this.tileObjects.objectsLayers.objectsLevel;
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