MovementManager.prototype.onUpdateCollisions = function() {
	// Array of arrays with objects colliding in one place (grouping objects
	// by collision position). When collision occurs, colliding pair is put
	// with other objects on the same position. So the array looks like
	// [[A,B][C,D,E,F]]: grouped objects belong to the same collision point.
	var collidingGroups = [];

	if (this.counters.movingObjects !== 0) {
		var collObjects = this.gameObjectsManager.getAllWithout([GOT.ROAD, GOT.VOID]);
		if (collObjects.length < 2) return;
		for (var i = 0; i < collObjects.length; i++)
			for (var j = i + 1; j < collObjects.length; j++) {
				this.game.physics.arcade.overlap(
					collObjects[i].sprite,
					collObjects[j].sprite,
					this.onCollision, null, this);
				// right now collisionOnUpdate is refreshed by onCollision()
				if (this.collisionOnUpdate) {
					concatPairWithCoveringGroup(
						collidingGroups, [collObjects[i], collObjects[j]]);
				}
				this.collisionOnUpdate = false;
			}
	}

	if (collidingGroups.length > 0) {
		// elements of collidingGroups are groups of objects really colliding
		for (var group in collidingGroups) {
			this.gameplayManager.onCollisionToHandle(collidingGroups[group]);
		}
	}
};

MovementManager.prototype.onCollision = function(sprite1, sprite2) {
	if (sprite1.id === sprite2.id)
		console.error("equal id");
	var a = sprite1.id;
	var b = sprite2.id;
	if (sprite2.id < sprite1.id) {
		a = sprite2.id;
		b = sprite1.id;
	}
	// mark collision as handled
	if (prepareArray(this.checkedColl, a, b)) {
		var tween = sprite1.tween !== undefined ? sprite1.tween : sprite2.tween;
		if (tween === undefined) return;
		this.collisionOnUpdate = true; // collision occured
		// if diff between  start-end pos is small, it means that collision 
		// will be handled at the end of movement
		var diff = Phaser.Math.difference(sprite1.x, tween.properties.x);
		if (diff < sprite1.body.width)
			this.collisionOnUpdate = false;
	}
};

/**
 * Merge given pair with a matching group or create a new one.
 * Matching group is a group containing objects from the same collision point.
 * @param  {Array} collidingGroups Array of arrays of objects belonging to the
 *                                 same collision point.
 * @param  {Array} newCollisionPair Pair of objects which should be merged.
 */
function concatPairWithCoveringGroup(collidingGroups, newCollisionPair) {
	if (newCollisionPair.length !== 2)
		console.error("not a pair");
	var groupFound = false;
	for (var group in collidingGroups) {
		var groupObject = collidingGroups[group][0];
		var diff = Phaser.Math.difference(groupObject.x, newCollisionPair[0].x);
		if (diff < groupObject.sprite.body.width) {
			collidingGroups[group] = collidingGroups[group].concat(newCollisionPair);
			return;
		}
	}
	collidingGroups.push(newCollisionPair);
};