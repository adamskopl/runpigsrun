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
	temp = this.gameObjectsManager.create(new GameObjectParams("hero", [9, 2], 0));
	temp.setDirection(MovementDirections.D);
};