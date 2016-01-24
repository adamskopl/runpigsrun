function GameObjectsManager(game) {
	this.game = game;
	this.objects = [];
	// group will be created, when needed (if it'll be created after 
	// loading Tiled maps, it will be covered)
	this.groupGeneral = undefined;
}

GameObjectsManager.prototype.create = function(gameObjectParams) {
	if (this.groupGeneral === undefined) {
		this.groupGeneral = this.game.add.group();
	}
	var gameObject = new GameObject(this.groupGeneral,
		gameObjectParams);
	this.objects.push(gameObject);
}