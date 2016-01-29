function MovementManager(tilesManager) {
	this.tilesManager = tilesManager;
};

/**
 * Called on GameObject
 * @return {[type]}                 [description]
 */
function updateDirection(MOVEMENT_MANAGER) {
	if (!emptyDirection(this.direction)) {
		if (!canMove(this.gamePos,
				this.direction, MOVEMENT_MANAGER)) {
			opposite = movementDirectionOpposite(this.direction);
			if (canMove(this.gamePos,
					opposite, MOVEMENT_MANAGER)) {
				this.setDirection(opposite);
			} else {
				// blocked
				resetDirection(this.direction);
			}
		}
	}
};

function moveObject() {
	if (!emptyDirection(this.direction)) {
		body = this.sprite.body;
		body.moves = true;
		body.velocity.x = this.direction.x * 100;
		body.velocity.y = this.direction.y * 100;
	}
}