/**
 * Id generator based on... INCREASING ONE VALUE!
 */
function IdGenerator() {
	this.reset();
};

IdGenerator.prototype.gen = function() {
	return this.id++;
};

/**
 * Indicate, that generator can work from the beginning.
 */
IdGenerator.prototype.reset = function() {
	this.id = 0;
};