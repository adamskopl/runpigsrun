function GameObjectsManagerHuts(objects) {
	this.objects = objects;
};

GameObjectsManagerHuts.prototype.onLevelLoaded = function() {
	for (var index in this.objects)
		convertToHut(this.objects[index]);
};

function convertToHut(gameObject) {
	gameObject.pause = false; // pause == hut is not generating objects
};

GameObjectsManagerHuts.prototype.onIter = function(
	GAME_OBJECTS_MANAGER) {
	for (var index in this.objects) {
		var HUT = this.objects[index];
		if (HUT.properties.capacity == 0)
			continue;
		if (HUT.pause) {
			HUT.pause = false;
			continue;
		}
		var GAME_POS = HUT.mov().gamePosTo;
		var DIRECTION = angleToDirection(HUT.angle);
		GAME_OBJECTS_MANAGER.create(
			new GameObjectParams(GOT.HERO, {
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

GameObjectsManagerHuts.prototype.countHeroes = function() {
	var cnt = 0;
	for (var i in this.objects)
		cnt += parseInt(this.objects[i].properties.capacity);
	return cnt;
};