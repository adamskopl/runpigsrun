/**
 * Prepare indexes for two dimensional array.
 * @param  {Array} Target array.
 * @return {Bool}  True if new array element created. 
 *                 False if there was already such element.
 */
function prepareArray(array, X, Y) {
	if (array[X] === undefined)
		array[X] = [];
	if (array[X][Y] === undefined) {
		array[X][Y] = [];
		return true;
	}
	return false;
};

function removeArrayObject(array, object) {
	var index = array.indexOf(object);
	if (index !== -1)
		array.splice(index, 1);
	else
		console.error("index === -1");
}