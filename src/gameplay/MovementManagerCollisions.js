MovementManager.prototype.onUpdateCollisions = function() {
	var collidingObjects = [];
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
				if (this.collisionOnUpdate)
					collidingObjects.push(collObjects[i], collObjects[j]);
				this.collisionOnUpdate = false;
			}
	}
	if (collidingObjects.length > 0)
		this.gameplayManager.onCollisionToHandle(collidingObjects);
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
		this.collisionOnUpdate = true; // collision occured
		// if diff between  start-end pos is small, it means that collision 
		// will be handled at the end of movement
		var diff = Phaser.Math.difference(sprite1.x,
			sprite1.tween.properties.x);
		if (diff < sprite1.body.width)
			this.collisionOnUpdate = false;
	}
};