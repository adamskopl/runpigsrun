GameObjectType = Object.freeze({
	HUT: "hut",
	HERO: "hero",
	ROAD: "road",
	BRIDGE: "bridge",
	WATER: "water"
});
GOT = GameObjectType; // alias

// TODO: change 'main type' on something else
GameObjectMainType = Object.freeze({
	PASSAGE: "PASSAGE", // objects are moving through it
	LIVING: "LIVING" // object is moving
});

function GameObjectDesc(spreadsheet, gid, mainType) {
	return {
		spreadsheet: spreadsheet,
		gid: gid,
		mainType: mainType
	};
}

GameObjectsConstants = [];
GOC = GameObjectsConstants; // alias
GameObjectsConstants[GameObjectType.HUT] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 48,
		GameObjectMainType.LIVING);
GameObjectsConstants[GameObjectType.HERO] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_CHARACTERS, 49,
		GameObjectMainType.LIVING);
GameObjectsConstants[GameObjectType.ROAD] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 10,
		GameObjectMainType.PASSAGE);
GameObjectsConstants[GameObjectType.BRIDGE] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 88,
		GameObjectMainType.PASSAGE);
GameObjectsConstants[GameObjectType.WATER] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 13,
		GameObjectMainType.PASSAGE);

function objectsContainMainType(OBJECTS, mainType) {
	for (i = 0; i < OBJECTS.length; i++)
		if (GOC[OBJECTS[i].type].mainType == mainType)
			return true;
	return false;
}