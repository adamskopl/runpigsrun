function cloneProperties(TO_CLONE) {
	return JSON.parse(JSON.stringify(TO_CLONE));
};

/**
 * Prepare indexes for two dimensional array.
 */
function prepareArray(array, X, Y) {
	if (array[X] === undefined)
		array[X] = [];
	if (array[X][Y] === undefined)
		array[X][Y] = [];
};

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
	var guiManager;

	function preload() {
		assetsManager = new AssetsManager(game);
	}

	function create() {
		gameplayManager = new GameplayManager(game);
		levelsManager = new LevelsManager(game,
			gameplayManager.gameObjectsManager);
		levelsManager.loadLevel('01');
		guiManager = new GuiManager(
			game,
			gameplayManager,
			levelsManager,
			gameplayManager.toolsManager);
		gameplayManager.setMembers(levelsManager, guiManager);
	}

	function update() {}

	function render() {}
};