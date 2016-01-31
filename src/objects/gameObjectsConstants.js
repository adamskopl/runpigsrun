GameObjectType = {
	HUT: "hut",
	ROAD: "road",
	HERO: "hero"
};

// TODO: change 'main type' on something else
GameObjectMainType = {
	PASSAGE: "PASSAGE", // objects are moving through it
	LIVING: "LIVING" // object is moving
}

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
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 48, GameObjectMainType.LIVING);
GameObjectsConstants[GameObjectType.ROAD] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_BASIC, 10, GameObjectMainType.PASSAGE);
GameObjectsConstants[GameObjectType.HERO] =
	new GameObjectDesc(assetsConstants.SPREADSHEET_CHARACTERS, 49, GameObjectMainType.LIVING);

function objectsContainMainType(objects, mainType) {
	for (i = 0; i < objects.length; i++)
		if (GOC[objects[i].name].mainType == mainType)
			return true;
	return false;
}