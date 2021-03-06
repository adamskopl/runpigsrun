GameObjectType = Object.freeze({
	VOID: "void", // for empty fields
	HUT: "hut",
	HERO: "hero",
	ENEMY: "enemy",
	ROAD: "road",
	BRIDGE: "bridge",
	WATER: "water",
	EXIT: "exit",
	SIGNPOST: "signpost",
	TOOL_BOUNCER: "t_bouncer",
	TOOL_DUMMY: "t_dummy"
});
GOT = GameObjectType; // alias

// TODO: change 'main type' on something else
GameObjectGameplayType = Object.freeze({
	PASSAGE: "PASSAGE", // objects are moving through it
	DEADLY: "DEADLY", // living objects are destroyed by this type
	MOVING: "MOVING", // object is moving
	TOOL: "TOOL",
	RESCUE: "RESCUE", // object is rescuing hero
	SPEED_CHANGE: "SPEED_CHANGE" // object is moving other objects
});

GOGT = GameObjectGameplayType;

function GameObjectDesc(spreadsheet, gid, gameplayTypes) {
	return {
		spreadsheet: spreadsheet,
		gid: gid,
		gameplayTypes: gameplayTypes
	};
};

GameObjectsConstants = [];
GOC = GameObjectsConstants; // alias

GameObjectsConstants[GameObjectType.VOID] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 102, [GameObjectGameplayType.DEADLY]);

GameObjectsConstants[GameObjectType.HUT] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 48, []);
GameObjectsConstants[GameObjectType.HERO] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_CHARACTERS, 49, [GameObjectGameplayType.MOVING]);
GameObjectsConstants[GameObjectType.ENEMY] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_CHARACTERS, 55, [GameObjectGameplayType.MOVING]);
GameObjectsConstants[GameObjectType.ROAD] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 10, [GameObjectGameplayType.PASSAGE]);
GameObjectsConstants[GameObjectType.BRIDGE] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 88, [GameObjectGameplayType.PASSAGE]);
GameObjectsConstants[GameObjectType.WATER] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 13, [GameObjectGameplayType.PASSAGE]);

GameObjectsConstants[GameObjectType.EXIT] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_THINGS, 93, [GameObjectGameplayType.RESCUE]);
GameObjectsConstants[GameObjectType.SIGNPOST] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 67, [GameObjectGameplayType.TOOL]);

GameObjectsConstants[GameObjectType.TOOL_BOUNCER] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 27, [GameObjectGameplayType.TOOL, GameObjectGameplayType.SPEED_CHANGE]);
GameObjectsConstants[GameObjectType.TOOL_DUMMY] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 28, [GameObjectGameplayType.TOOL]);

function objectsContainGameplayType(OBJECTS, GAMEPLAY_TYPE) {
	for (var O in OBJECTS) {
		var TYPES = GOC[OBJECTS[O].type].gameplayTypes;
		for (var GT in TYPES)
			if (TYPES[GT] === GAMEPLAY_TYPE)
				return true;
	}
	return false;
};

function filterObjectsGameplayType(OBJECTS, GAMEPLAY_TYPE) {
	var FILTERED = [];
	for (var O in OBJECTS) {
		var TYPES = GOC[OBJECTS[O].type].gameplayTypes;
		for (var GT in TYPES)
			if (TYPES[GT] === GAMEPLAY_TYPE)
				FILTERED.push(OBJECTS[O]);
	}
	return FILTERED;
};