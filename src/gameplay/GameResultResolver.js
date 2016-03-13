function GameResultResolver() {

};

GameResultResolver.prototype.slotObjectRemoved = function(arg) {
	console.log(arg);
};

GameResultResolver.prototype.slotObjectRescued = function(arg) {
	console.log(arg);
};