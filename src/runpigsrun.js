function startGame() {
	// CANVAS chosen, so 'debug' functions likde debug.body(sprite) can work...
	// change later maybe on Phaser.AUTO
	var game = new Phaser.Game(
		scaleConstants.GAME_W,
		scaleConstants.GAME_H,
		Phaser.CANVAS,
		'game', {
			preload: preload,
			create: create,
			update: update,
			render: render
		},
		null,
		false,
		false); // antialias OFF

	var levelsManager;
	var gameObjectsManager;
	var assetsManager;

	function preload() {
		assetsManager = new AssetsManager(game);
	}

	function create() {
		gameObjectsManager = new GameObjectsManager(game);
		levelsManager = new LevelsManager(game, gameObjectsManager);
		levelsManager.loadLevel('00');
	}

	function update() {}

	function render() {}
}