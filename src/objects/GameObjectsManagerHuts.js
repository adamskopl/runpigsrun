function GameObjectsManagerHuts(objects) {
	this.objects = objects;
};

GameObjectsManagerHuts.prototype.onLevelLoaded = function() {
	for (var index in this.objects) {
		this.objects[index].pause = false;
	}
};

GameObjectsManagerHuts.prototype.onIter = function(GAME_OBJECTS_MANAGER) {
	for (var index in this.objects) {
		var HUT = this.objects[index];
		if (HUT.properties.capacity == 0)
			continue;
		if (HUT.pause) {
			HUT.pause = false;
			continue;
		}
		var GAME_POS = HUT.gamePos;
		var DIRECTION = angleToDirection(HUT.angle);
		GAME_OBJECTS_MANAGER.create(new GameObjectParams(GOT.HERO, {
			x: GAME_POS.x,
			y: GAME_POS.y
		}, {
			x: DIRECTION.x,
			y: DIRECTION.y
		}));
		HUT.properties.capacity--;
		HUT.pause = true;
	}
};