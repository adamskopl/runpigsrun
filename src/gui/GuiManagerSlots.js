/**
 * Tile (tile's button) clicked.
 */
GuiManager.prototype.slotButtonTile = function(gamePos) {
	this.toolsManager.onTileChoice(gamePos);
};

GuiManager.prototype.slotButtonTileOver = function(gamePos) {
	this.cursorSpritesManager.onButtonTileOver(gamePos);
};

GuiManager.prototype.slotButtonPanelLevelEndOk = function() {
	this.dispatch("levelEndOk");
};

GuiManager.prototype.slotToolNumberModified = function(TOOL_TYPE, CURRENT_NUMBER) {
	for (var B in this.buttonsToolsLevel) {
		var button = this.buttonsToolsLevel[B];
		if (button.type === TOOL_TYPE)
			button.setEnabled(CURRENT_NUMBER !== 0 ? true : false);
	}
};