/****************************

		Game Entities

****************************/

/*** The laser fired by the player */
function Laser(new_x, new_y, new_vector) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.vector = new_vector;
	this.width = 5;
	this.height = 5;
	this.alive = false;

	this.draw = function (canvas) {
		if (this.alive) {
			canvas.fillStyle = "rgb(0,0,0)";
		    canvas.fillRect (this.x, this.y, this.width, this.height);
		}
		return 0;
	}
}

/*** The basic enemy in space invaders. */
function Invader(new_x, new_y, new_value) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.width = 10;
	this.height = 10;
	this.alive = true;
	this.value = new_value;

	/*** Returns true if this entity and Entity otherEntity intersect. 
	False otherwise.*/
	this.touches = function (other) {
		return  this.x < other.x + other.width  &&
				this.x + this.width  > other.x &&
    			this.y < other.y + other.height &&
    			this.y + this.height > other.y;
	}

	this.draw = function (canvas) {
		if (this.alive) {
			canvas.fillStyle = "rgb(0, 200,0)";
		    canvas.fillRect (this.x, this.y, this.width, this.height);
		}
		return 0;
	}
}

/*** The player in space invaders. */
function Player(new_x, new_y) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.width = 10;
	this.height = 10;

	/*** Returns true if this entity and Entity otherEntity intersect. 
	False otherwise.*/
	this.touches = function (other) {
		return (this.x < other.x + other.width  &&
				this.x + this.width  > other.x &&
    			this.y < other.y + other.height &&
    			this.y + this.height > other.y);
	}

	this.draw = function (canvas) {
		canvas.fillStyle = "rgb(200,0,0)";
	    canvas.fillRect (this.x, this.y, this.width, this.height);
		return 0;
	}
}

/****************************

		Game Body

****************************/

function Game(new_canvas) {
	var SCORE_BAR = 15;
	var NUM_ROWS = 5;
	var NUM_COLS = 10;
	this.FPS = 30;
	
	/* Canvas and Context */
	var canvas = new_canvas;
	var context = canvas.getContext('2d');
	
	// Game Logic
	var invader_leftLimit;
	var invader_rightLimit;
	var invader_bottomLimit;
	var invader_vector;
	var invadersAlive;

	// Screen Display Logic
	var STATE_GAME = 0;
	var STATE_WIN = 1;
	var STATE_DEFEAT = 2;
	var STATE_START = 3;
	var currentState;
	
	// The score and difficulty is persistent between setups.
	var score = 0;
	var difficulty = 1;

	// Player Movement
	var playerMoveLeft = false;
	var playerMoveRight = false;
	var playerShoot = false;

	/* Create Player and Invaders*/
	var laser;
	var player;
	var invaders = [];

	// Run game setup.
	setup();
	currentState = STATE_START;
	

	/****************************
			Game Setup
	****************************/

	function setup() {
		// Reset game variables
		invader_leftLimit = 0;
		invader_rightLimit = NUM_COLS - 1;
		invader_bottomLimit = NUM_ROWS - 1;
		invader_vector = 1;
		invadersAlive = 50;
		currentState = STATE_GAME;

		// Create player and laser
		player = new Player(canvas.width / 2, canvas.height - 25);
		laser = new Laser(0, 0, 0);

		// Create invaders.
		for (var i = 0; i < NUM_ROWS; i++) {
			invaders[i] = [];
			for (var j = 0; j < NUM_COLS; j++) {
				invaders[i][j] = new Invader(j * 15, (i * 15) + 20, getInvaderValue(i));
			}
		}

		// Helper function for setting invader value.
		function getInvaderValue(i) {
			var ret = 10;
			if (i == 4) {
				ret = 80;
			} else if (i > 1) {
				ret = 20;
			}
			return ret;
		}
	}

	/****************************
			Game Logic
	****************************/

	/*** Update the logic of the game. */
	this.update = function() {
		if (currentState == STATE_GAME) {
			// Main invader loop.
			for (var i = 0; i < NUM_ROWS; i++) {
				for (var j = 0; j < NUM_COLS; j++) {
					// Check collision.
					if (invaders[i][j].alive &&
					laser.alive &&
					invaders[i][j].touches(laser)) {
						laser.alive = false;
						invaders[i][j].alive = false;
						updateInvaderWallLimits();
						score += invaders[i][j].value;
						invadersAlive--;
					}
					// Move them one unit left.
					invaders[i][j].x = (invaders[i][j].x) + 
						((invader_vector) * speedCalc());
				}
			}
			checkInvaderWallLimit();
			checkPlayerInput();
			updateLaser();
			checkWinDefeat();
		} else if (currentState == STATE_WIN) {
			// Player pressing "space to continue."
			if (playerShoot) {
				setup();
				difficulty = difficulty + 0.25;
				currentState = STATE_GAME;
				playerShoot = false;
			}
		} else if (currentState == STATE_DEFEAT) {
			// Player pressing "space to continue."
			if (playerShoot) {
				setup();
				score = 0;
				difficulty = 1;
				currentState = STATE_GAME;
				playerShoot = false;
			}
		} else if (currentState == STATE_START) {
			// Player pressing "space to start."
			if (playerShoot) {
				currentState = STATE_GAME;
				playerShoot = false;
			}
		}
		/* Helper function to calculate alien speeds as they die.*/
		function speedCalc() {
			return (0.4 + 0.01 * (50 - invadersAlive)) * difficulty;
		}
	}


	/*** Update the position of the laser. */
	function updateLaser() {
		if (laser.alive) {
			laser.y = laser.y + laser.vector;
			// kill laser off-screen
			if (laser.y < SCORE_BAR) {
				laser.alive = false;
			}
		}
	}

	/*** If any input keys are held down, the player character should
	react accordingly. */
	function checkPlayerInput() {
		if (playerMoveLeft && player.x > 0) {
			player.x = player.x - 5;
		}

		if (playerMoveRight && player.x + player.width <= canvas.width) {
			player.x = player.x + 5;
		}

		if (playerShoot && !laser.alive) {
			laser.x = player.x + (laser.width / 2);
			laser.y = player.y;
			laser.vector = -10;
			laser.alive = true;
		}
	}

	/*** Checks if the invaders hit a wall, if they do, drops them on row down
	and changes their direction. */
	function checkInvaderWallLimit() {
		if ((invaders[0][invader_leftLimit].x < 0)
			|| (invaders[0][invader_rightLimit].x + 
				invaders[0][invader_rightLimit].width  > canvas.width)) {
			invader_vector = invader_vector * -1;
			// drop (wub wub wub)
			for (var i = 0; i < NUM_ROWS; i++) {
				for (var j = 0; j < NUM_COLS; j++) {
					invaders[i][j].y = invaders[i][j].y + 5;
				}
			}
		}
	}

	/*** Updates the point where the invaders change direction.
	This also checks for the current lowest invader to check for defeat. */
	function updateInvaderWallLimits() {
		invader_leftLimit = NUM_COLS - 1;
		invader_rightLimit = 0;
		invader_bottomLimit = 0
		for (var i = 0; i < NUM_ROWS; i++) {
			for (var j = 0; j < NUM_COLS; j++) {
				// Find the left-most invader.			
				if (invaders[i][j].alive && j < invader_leftLimit) {
					invader_leftLimit = j;
				}
				// Find the right-most invader.
				if (invaders[i][j].alive && j > invader_rightLimit) {
					invader_rightLimit = j;
				}
				// Find the lowest invader.
				if (invaders[i][j].alive && i > invader_bottomLimit) {
					invader_bottomLimit = i;
				}
			}
		}
	}

	/*** Check victory and defeat conditions. */
	function checkWinDefeat() {
		// Check for win
		if (invadersAlive == 0) {
			currentState = STATE_WIN;
		}

		// Check for defeat.
		if (invaders[invader_bottomLimit][0].y > canvas.height - 50) {
			currentState = STATE_DEFEAT;
		}
	}



	/****************************
			Player Control
	****************************/
	/* Note: We toggle player shooting through the use of keyup and keydown
	events since keydown by itself has a browser-variable refresh rate and
	it does not allow for simultaneous key input. */

	/*** Toggle player shooting (used by Game.update). */
	this.shoot = function(val) {
		playerShoot = val;
	}

	/*** Toggle player movement to the left (used by Game.update). */
	this.moveLeft = function(val) {
		playerMoveLeft = val;
	}


	/*** Toggle player movement to the right (used by Game.update). */
	this.moveRight = function(val) {
		playerMoveRight = val;
	}


	/****************************
			Draw Functions
	****************************/

	/*** Clear the screen, then draw all entities onto the screen. */
	this.draw = function() {
		wipeCanvas();

		if (currentState == STATE_GAME) {
	        for (var i = 0; i < NUM_ROWS; i++) {
				for (var j = 0; j < NUM_COLS; j++) {
					invaders[i][j].draw(context);
				}
			}
	        player.draw(context);
	        laser.draw(context);
	        drawScore();
    	} else if (currentState == STATE_DEFEAT) {
    		drawDefeatScreen();
    	} else if (currentState == STATE_WIN) {
    		drawWinScreen();
    	} else if (currentState == STATE_START) {
    		drawStartScreen();
    	}
	}

	/*** Draw a black screen, seen at game start.*/
	function drawStartScreen() {
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect (0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgb(255, 255, 255)";
		context.font = "bold 16px sans-serif";
		context.fillText("Space Invaders", canvas.width / 3, canvas.height / 2);
		context.font = "bold 12px sans-serif";
		context.fillText("Press Space to start!", 
			canvas.width / 5, canvas.height / 2 + canvas.height / 4);
	}

	/*** Draw a black screen with score. */
	function drawDefeatScreen() {
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect (0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgb(255, 255, 255)";
		context.font = "bold 20px sans-serif";
		context.fillText(score, canvas.width / 2, canvas.height / 2);
		context.font = "bold 12px sans-serif";
		context.fillText("Press Space to continue.", 
			canvas.width / 5, canvas.height / 2 + canvas.height / 4);
	}

	/*** Draw a black screen, saying weiner. */
	function drawWinScreen() {
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect (0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgb(255, 255, 255)";
		context.font = "bold 30px sans-serif";
		context.fillText("Winner!", canvas.width / 3, canvas.height / 2);
		context.font = "bold 12px sans-serif";
		context.fillText("Press Space to continue.", 
			canvas.width / 5, canvas.height / 2 + canvas.height / 4);
	}

	/*** Display the current score. */
	function drawScore() {
		context.fillStyle = "rgb(0, 0,0)";
		context.fillRect (0, 0, canvas.width, SCORE_BAR);
		context.fillStyle = "rgb(255, 255, 255)";
		context.font = "bold 14px sans-serif";
		context.fillText(score, 5, 13);
	}

	/*** Clear the canvas. */
	function wipeCanvas() {
		// Store the current transformation matrix
        context.save();
        // Use the identity matrix while clearing the canvas
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Restore the transform
        context.restore();
	}
}

/****************************

		Main Body

****************************/

/*** This function is run once the index page is loaded. It starts the game logic.*/
function run() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
    	// Add event listeners for keyboard input.
    	window.addEventListener('keydown', this.keys_down, false);
		window.addEventListener('keyup', this.keys_up, false);
		// Create the game logic object.
        game = new Game(canvas);
        // Start Game Loop
    	setInterval(function() {
        	game.draw();
        	game.update();
    	}, 1000 / game.FPS);
    } else {
        // If it runs this block, the browser does not support canvasii... : (
        document.write("<h1>It broke!</h1>");
    }
}

/* When the player presses a key, that message is sent to the game logic. */
function keys_down(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: game.moveLeft(true); break; //Left key
        case 38: break; //Up key
        case 39: game.moveRight(true); break;  //Right key
        case 40: break; //Down key
        case 32: game.shoot(true); break; //Space key
        default: break; 
    }
}

/* When the player releases a key, that message is sent to the game logic. */
function keys_up(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: game.moveLeft(false); break; //Left key
        case 38: break; //Up key
        case 39: game.moveRight(false); break;  //Right key
        case 40: break; //Down key
        case 32: game.shoot(false); break; //Space key
        default: break; 
    }
}