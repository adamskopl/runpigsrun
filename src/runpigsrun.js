function cloneProperties(TO_CLONE) {
	return JSON.parse(JSON.stringify(TO_CLONE));
};

function startGame() {
	// CANVAS chosen, so 'debug' functions likde debug.body(sprite) can work...
	// change later maybe on Phaser.AUTO
	var game = new Phaser.Game(
		SC.GAME_W,
		SC.GAME_H,
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
	var guiManager;

	function preload() {
		assetsManager = new AssetsManager(game);
	}

	function create() {
		gameplayManager = new GameplayManager(game);
		levelsManager = new LevelsManager(game,
			gameplayManager.gameObjectsManager);
		guiManager = new GuiManager(
			game,
			levelsManager,
			gameplayManager.toolsManager);
		gameplayManager.setMembers(levelsManager, guiManager);

		game.world.bringToTop(gameplayManager.gameObjectsManager.groupGeneral);
		levelsManager.reloadLevel();
		guiManager.reload();
	}

	function update() {
		gameplayManager.update();
	}

	function render() {
		gameplayManager.render();
	}
};