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
	var assetsManager;
	var gameplayManager;

	function preload() {
		assetsManager = new AssetsManager(game);
	}

	function create() {
		gameplayManager = new GameplayManager(game);
		levelsManager = new LevelsManager(game, gameplayManager.gameObjectsManager);
		levelsManager.loadLevel('00');

		gameplayManager.start();
	}

	function update() {}

	function render() {}
}