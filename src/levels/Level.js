function LevelTileObjects(map, backgroundLayers, objectsLayers) {
	this.map = map;
	this.backgroundLayers = backgroundLayers;
	this.objectsLayers = objectsLayers;
};

function Level(game, tileObjects) {
	this.game = game;
	this.tileObjects = tileObjects;
	this.levelGroup = this.game.add.group();
	this.loadObjects();
};

Level.prototype.loadObjects = function() {
	var objectsLevel = this.tileObjects.objectsLayers.objectsLevel;
	for (var i = 0; i < objectsLevel.length; i++) {
		var gameObject = new GameObject(this.game, this.levelGroup,
			objectsLevel[i]);
	}
}