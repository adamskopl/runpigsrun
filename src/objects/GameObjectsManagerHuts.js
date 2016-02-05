function GameObjectsManagerHuts(objects) {
	this.objects = objects;
	this.test = false;
}

GameObjectsManagerHuts.prototype.onIter = function(gameObjectsManager) {
	if (!this.test) {
		console.log(this.objects[0].angle);
		gameObjectsManager.create(new GameObjectParams(GOT.HERO, {
			x: 6,
			y: 3
		}, {
			x: 0,
			y: -1
		}));
		this.test = true;
		console.log(this.objects[0].properties);
	}
}