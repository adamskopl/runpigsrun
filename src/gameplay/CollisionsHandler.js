function CollisionsHandler(gameObjectsManager, tilesManager) {
	this.gameObjectsManager = gameObjectsManager;
	this.tilesManager = tilesManager;
};

CollisionsHandler.prototype.handleCollisions = function() {
	this.removeLivingObjectsOutsideLevel();
};

CollisionsHandler.prototype.removeLivingObjectsOutsideLevel = function() {
	var objectsOutside = [];
	this.tilesManager.callAll(
		function(objectsOutside) {
			if (objectsContainMainType(
				[this], GameObjectMainType.LIVING)) {
				if (!posInLevel(this.gamePos)) {
					objectsOutside.push(this);
				}
			}
		}, [objectsOutside]);
	for (var OBJ in objectsOutside) {
		this.gameObjectsManager.remove(objectsOutside[OBJ]);
	}
};