function GameObjectsManager(game, tilesManager) {
	this.game = game;
	this.tilesManager = tilesManager;
	this.objects = [];
	// group will be created, when needed (if it'll be created after 
	// loading Tiled maps, it will be covered)
	this.groupGeneral = undefined;
}

GameObjectsManager.prototype.create = function(gameObjectParams) {
	if (this.groupGeneral === undefined) {
		this.groupGeneral = this.game.add.group();
	}
	gameObject = new GameObject(this.groupGeneral,
		gameObjectParams);
	this.objects.push(gameObject);
	this.tilesManager.put(gameObject, gameObjectParams.gamePos.x, gameObjectParams.gamePos.y);
	this.check();

	this.game.physics.arcade.enable(gameObject.sprite, Phaser.Physics.ARCADE);

	return gameObject;
}

GameObjectsManager.prototype.count = function() {
	return this.objects.length;
}

GameObjectsManager.prototype.check = function() {
	num1 = this.count();
	num2 = this.tilesManager.count();
	if (num1 != num2)
		console.log("count error")
}