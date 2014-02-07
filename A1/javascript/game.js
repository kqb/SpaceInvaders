/*
CSC309 Assignment 1; Feburary 7 2014
Alexander Sirotkin (g2sirotk; 996328852)
Katie Lo (g3lanaya; 998493848)
*/


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
	this.height = 18;
	this.alive = false;

	this.draw = function (canvas) {
		if (this.alive) {
			canvas.drawImage(game.getImg().laser1, 
				this.x, this.y, this.width, this.height);
		}
	}
}

/*** The laser fired by the invaders */
function invLaser(new_x, new_y, new_vector) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.vector = new_vector;
	this.width = 5;
	this.height = 18;
	this.alive = false;

	this.draw = function (canvas) {
		if (this.alive) {
			canvas.drawImage(game.getImg().laser2,
			 this.x, this.y, this.width, this.height);
		}
	}
}

/*** The tier3 enemy in space invaders. */
function Invader3(new_x, new_y, new_value) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.width = 30;
	this.height = 20;
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
		 	if (game.getTimer() % 35 > 17){
		    	canvas.drawImage(game.getImg().alien3, this.x, this.y, this.width, this.height);
			} else {
				canvas.drawImage(game.getImg().aalien3, 
					this.x, this.y, this.width, this.height);
			}
		}
	}
	this.drawExplosion = function (canvas) {
		if (!this.alive) {
			canvas.drawImage(game.getImg().explosion, 
				this.x, this.y, this.width, this.height);
		}
	}
}

/*** The tier2 enemy in space invaders. */
function Invader2(new_x, new_y, new_value) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.width = 27.5;
	this.height = 20;
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
			// canvas.fillStyle = "rgb(0, 200,0)";
		 //    canvas.fillRect (this.x, this.y, this.width, this.height);
		 	if (game.getTimer() % 35 > 17){
		    	canvas.drawImage(game.getImg().alien2, 
		    		this.x, this.y, this.width, this.height);
			} else {
				canvas.drawImage(game.getImg().
					aalien2, this.x, this.y, this.width, this.height);
			}
		}
	}
	this.drawExplosion = function (canvas) {
		if (!this.alive) {
			canvas.drawImage(game.getImg().explosion, 
				this.x, this.y, this.width, this.height);
		}
	}
}


/*** The tier1 enemy in space invaders. */
function Invader1(new_x, new_y, new_value) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.width = 22.5;
	this.height = 20;
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
			// canvas.fillStyle = "rgb(0, 200,0)";
		 //    canvas.fillRect (this.x, this.y, this.width, this.height);
		 	if (game.getTimer() % 35 > 17){
		    	canvas.drawImage(game.getImg().alien1, 
		    		this.x, this.y, this.width, this.height);
			} else {
				canvas.drawImage(game.getImg().aalien1, 
					this.x, this.y, this.width, this.height);
			}
		}
	}
	this.drawExplosion = function (canvas) {
		if (!this.alive) {
			canvas.drawImage(game.getImg().explosion, 
				this.x, this.y, this.width, this.height);
		}
	}
}

/*** The player in space invaders. */
function Player(new_x, new_y) {
	// Canvas Location
	this.x = new_x;
	this.y = new_y;
	this.width = 30;
	this.height = 30;
	this.alive = true;


	/*** Returns true if this entity and Entity otherEntity intersect. 
	False otherwise.*/
	this.touches = function (other) {
		return (this.x < other.x + other.width  &&
				this.x + this.width  > other.x &&
    			this.y < other.y + other.height &&
    			this.y + this.height > other.y);
	}

	this.draw = function (canvas) {
		if (this.alive) {
		    canvas.drawImage(game.getImg().player, 
		    	this.x, this.y, this.width, this.height);
		}
	}

	this.drawExplosion = function (canvas) {
		if (!this.alive) {
			canvas.drawImage(game.getImg().explosion, 
				this.x, this.y, this.width, this.height);
		}
	}
}



/****************************

		Game Body

****************************/

function Game(new_canvas) {
	// Constant/Final Variables
	var SCORE_BAR = 20;
	var NUM_ROWS = 5;
	var NUM_COLS = 10;
	var BOTTOM = 600;
	var LIVES = 3
	this.FPS = 35;
	var timer = 0;
	var img = new loadAssets();
	

	// Canvas and Context
	var canvas = new_canvas;
	var context = canvas.getContext('2d');
	var bgYAxis = 0;

	
	// Game Logic
	var invader_leftLimit;
	var invader_rightLimit;
	var invader_bottomLimit;
	var invader_vector;
	var invadersAlive;
	var currentLives = LIVES;
	var frameCount = 0;

	// Screen Display Logic
	/* We change the game state (e.g. start screen or in-game) by 
	setting the currentState Variable. */
	var STATE_GAME = 0;
	var STATE_WIN = 1;
	var STATE_DEFEAT = 2;
	var STATE_START = 3;
	var STATE_RESPAWN = 4;
	var currentState;
	
	// The score and difficulty is persistent between setups.
	var score = 0;
	var difficulty = 1;
	var level = 1;


	// Player Movement
	var playerMoveLeft = false;
	var playerMoveRight = false;
	var playerShoot = false;
	var playerLaserVector = -10

	// Create Player and Invaders
	var laser;
	var invaderLaser;
	var player;
	var invaders = [];

	// Invaders firing back at the player.
	var MAX_LASERS = 4;
	var CHANCE_LASERS = 2; //percent
	var currNumLasers = 4;
	var currLaserChance = 2;
	var invaderLaserVector = -5;
	var invader_mostBottomInvaders = [];
	var invaderLasers = [];
	var laserCount = 0;
	

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
		player = new Player(canvas.width / 2, canvas.height - 75);
		laser = new Laser(0, 0, 0);

		// Create invaders.
		for (var i = 0; i < 2; i++) {
			invaders[i] = [];
			for (var j = 0; j < NUM_COLS; j++) {
				invaders[i][j] = new Invader1(j * 40+7.5/2, (i * 40) + 50, getInvaderValue(i));
			}
		}

		for (var i = 1; i < 3; i++) {
			invaders[i] = [];
			for (var j = 0; j < NUM_COLS; j++) {
				invaders[i][j] = new Invader2(j * 40+2.5/2, (i * 40) + 50, getInvaderValue(i));
			}
		}

		for (var i = 3; i < 5; i++) {
			invaders[i] = [];
			for (var j = 0; j < NUM_COLS; j++) {
				invaders[i][j] = new Invader3(j * 40, (i * 40) + 50, getInvaderValue(i));
			}
		}

		// Create invade lasers.
		for (var i = 0; i < NUM_COLS; i++) {
			invaderLasers[i] = new invLaser(0, 0, 0);
		}

		// Helper function for setting invader value.
		function getInvaderValue(i) {
			var ret = 10;
			if (i == 0) {
				ret = 80;
			} else if (i < 3) {
				ret = 20;
			}
			return ret;
		}
	}

	/*** Creates a single object that contains links to all art in the game */
	function loadAssets() {
		this.bg = new Image();
		this.player = new Image();
		this.laser1 = new Image();
		this.laser2 = new Image();
		this.alien1 = new Image();
		this.alien2 = new Image();
		this.alien3 = new Image();
		this.aalien1 = new Image();
		this.aalien2 = new Image();
		this.aalien3 = new Image();
		this.explosion = new Image();
		
		this.bg.src = "img/spacebg.gif";
		this.player.src = "img/ship.png";
		this.laser1.src = "img/l1.png";
		this.laser2.src = "img/l2.png";
		this.alien1.src = "img/a1.png";
		this.alien2.src = "img/a2.png";
		this.alien3.src = "img/a3.png";
		this.aalien1.src = "img/aa1.png";
		this.aalien2.src = "img/aa2.png";
		this.aalien3.src = "img/aa3.png";
		this.explosion.src = "img/explosion.png"
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
					// Check collision for player vs invader laser.
					var target = invaderLasers[j];
					if (invaderLasers[j].alive &&
					player.touches(target) && player.alive) {
						if (currentLives <= 0){
							invaderLasers[j].alive = false;
							resetLasers();
							currentState = STATE_DEFEAT;
							playerShoot = false;
						} else {
							invaderLasers[j].alive = false;
							currentLives -= 1;
							respawn();
						}
					}

					// Check collision for invader vs player laser.
					if (invaders[i][j].alive &&
					laser.alive &&
					invaders[i][j].touches(laser)) {
						laser.alive = false;
						invaders[i][j].alive = false;
						invaders[i][j].drawExplosion(context);
						updateInvaderWallLimits();
						score += invaders[i][j].value;
						invadersAlive--;
					}
					// Move them one unit left.
					invaders[i][j].x = (invaders[i][j].x) + 
						((invader_vector) * speedCalc());
				}
			}
			timer += 1; // Update game.timer.
			checkInvaderWallLimit();
			updateInvaderWallLimits();
			invadersShoot();
			updateInvaderLaser();
			checkPlayerInput();
			updateLaser();
			checkWinDefeat();


		} else if (currentState == STATE_WIN) {
			// Player pressing "space to continue."
			if (playerShoot) {
				setup();
				difficulty = difficulty + 0.25;
				// Increase chance for invader laser to increase difficulty after win.
				currLaserChance += 5;
				currNumLasers += 2;
				level += 1;
				invaderLaserVector -= 2;
				playerLaserVector -= 1;
				currentState = STATE_GAME;
				playerShoot = false;
			}
		} else if (currentState == STATE_DEFEAT) {
			// Player pressing "space to continue."
			if (playerShoot) {
				setup();
				score = 0;
				difficulty = 1;
				level = 1;
				// Reset chance for invader laser to default value upon defeat.
				currLaserChance = CHANCE_LASERS;
				invaderLaserVector = -5;
				playerLaserVector = -10;
				currNumLasers += MAX_LASERS;
				currentState = STATE_GAME;
				playerShoot = false;
				currentLives = LIVES;
				 
			}
		} else if (currentState == STATE_START) {
			// Player pressing "space to start."
			if (playerShoot) {
				currentState = STATE_GAME;
				playerShoot = false;

			} 
		} else if (currentState ==STATE_RESPAWN) {
				if (frameCount == 70){
				    resetLasers();
					player = new Player(canvas.width / 2, canvas.height - 75);
					currentState = STATE_GAME;
					frameCount = 0;

				}

		}
		/* Helper function to calculate alien speeds as they die.*/
		function speedCalc() {
			return (0.4 + 0.01 * (50 - invadersAlive)) * difficulty;
		}
	}

	/*** At random times, a random column of aliens will shoot back.*/
	function invadersShoot() {
		// do a check to shoot
		// if true, select a random invader to shoot from.
		// generate random integer between 0 to 9
		var randInd = Math.floor((Math.random()*NUM_COLS));
		var randChance = Math.floor((Math.random()*100));

		if (invaders[invader_mostBottomInvaders[randInd]][randInd].alive && randChance <= currLaserChance
		 	&& laserCount < currNumLasers) {
			if (!invaderLasers[randInd].alive) {
				invaderLasers[randInd].x = invaders[invader_mostBottomInvaders[randInd]][randInd].x + 
				(invaders[invader_mostBottomInvaders[randInd]][randInd].width / 2);
				invaderLasers[randInd].y = invaders[invader_mostBottomInvaders[randInd]][randInd].y;
				invaderLasers[randInd].vector = invaderLaserVector;
				invaderLasers[randInd].alive = true;
				laserCount += 1;
			}
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
	
	/*** Update the position of the invader lasers. */
	function updateInvaderLaser() {
		for (var j = 0; j < NUM_COLS; j++) {
			if (invaderLasers[j].alive) {
				invaderLasers[j].y = invaderLasers[j].y - invaderLasers[j].vector;
				// kill laser off-screen
				if (invaderLasers[j].y >= BOTTOM) {
					invaderLasers[j].alive = false;
					laserCount -= 1;
				}
			}
		}
	}

	/*** If any input keys are held down, the player character should
	react accordingly. */
	function checkPlayerInput() {
		if (playerMoveLeft && player.x > 0) {
			player.x = player.x - 15;
		}

		if (playerMoveRight && player.x + player.width < canvas.width) {
			player.x = player.x + 15;
		}

		if (playerShoot && !laser.alive && player.alive) {
			laser.x = player.x + (player.width / 2);
			laser.y = player.y;
			laser.vector = playerLaserVector;
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
			// Invader drop (wub wub wub)
			for (var i = 0; i < NUM_ROWS; i++) {
				for (var j = 0; j < NUM_COLS; j++) {
					invaders[i][j].y = invaders[i][j].y + 15;
				}
			}
		}
	}



	/*** Updates the point where the invaders change direction.
	This also checks for the current lowest invader to check for defeat. */
	function updateInvaderWallLimits() {
		// Reset the values for the various limits of where the invaders are.
		invader_leftLimit = NUM_COLS - 1;
		invader_rightLimit = 0;
		invader_bottomLimit = 0;
		// Create most bottom invader array.
		for (var i = 0; i < NUM_COLS; i++) {
			invader_mostBottomInvaders[i] = 0;
		}
		
		// Update the values.
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

				// Find the lowest invader for each column.
				if (invaders[i][j].alive && i > 
					invader_mostBottomInvaders[j]) {
					invader_mostBottomInvaders[j] = i;
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
			resetLasers();
			currentState = STATE_WIN;
		}

		// Check for defeat.
		if (invaders[invader_bottomLimit][0].y > canvas.height - 50) {
			resetLasers();
			currentState = STATE_DEFEAT;
		}
	}

	/*** Set invader lasers to not alive. */
	function resetLasers() {
		for (var j = 0; j < NUM_COLS; j++) {
			invaderLasers[j].alive = false;
		}
		laserCount = 0;
	}

	/*** Respawn player if they have remaining lives. */
	function respawn() {
		player.alive = false;
		currentState = STATE_RESPAWN;
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
			drawBackground();
			drawGameScreen();
    	} else if (currentState == STATE_DEFEAT) {
    		drawDefeatScreen();
    	} else if (currentState == STATE_WIN) {
    		drawWinScreen();
    	} else if (currentState == STATE_START) {
    		drawStartScreen();
    	} else if (currentState == STATE_RESPAWN) {
    		drawBackground();
    		drawGameScreen();
    		drawRespawnScreen();
    	}
	}


	/*** Draw countdown for respawn.*/
	function drawRespawnScreen() {
		frameCount += 1;
		if (frameCount < (30 * 2)/3) {
			player.drawExplosion(context);
		    context.font = "bold 50px sans-serif";
			context.font = "bold 50px sans-serif";
			context.fillText("3", canvas.width / 2.5, canvas.height / 2);
		}
		else if (frameCount >= (30 * 2)/3 && frameCount < (30 * 4)/3 ) {
			context.font = "bold 50px sans-serif";
			context.font = "bold 50px sans-serif";
			context.fillText("2", canvas.width / 2.5, canvas.height / 2);
			}
		else if (frameCount >= (30 * 4)/3 && frameCount <= (30 * 6)/3 ) {
			context.font = "bold 50px sans-serif";
			context.font = "bold 50px sans-serif";
			context.fillText("1", canvas.width / 2.5, canvas.height / 2);
			}
		else {
		    context.font = "bold 50px sans-serif";
			context.font = "bold 50px sans-serif";
			context.fillText("GO!", canvas.width / 2.5, canvas.height / 2);
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
		
		context.font = "bold 30px sans-serif";
		context.fillText("Loser!", canvas.width / 2.5, canvas.height / 8);
		context.font = "bold 35px sans-serif";
		context.fillText("Final Level", canvas.width / 3.2, canvas.height / 3);
		context.fillText(level, canvas.width /1.5, canvas.height / 3);
		context.fillText("Final Score", canvas.width / 3.2, canvas.height / 2);
		context.fillText(score, canvas.width /1.5, canvas.height / 2);
		context.font = "bold 12px sans-serif";
		context.fillText("Press Space to play again.", 
			canvas.width / 5, canvas.height / 2 + canvas.height / 4);
	}

	/*** Draw a black screen, saying weiner. */
	function drawWinScreen() {
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect (0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgb(255, 255, 255)";
		context.font = "bold 30px sans-serif";
		context.fillText("Winner!", canvas.width / 2.5, canvas.height / 8);
		context.font = "bold 50px sans-serif";
		context.fillText("Level", canvas.width / 3, canvas.height / 2);
		context.fillText(level+1, canvas.width /1.7, canvas.height / 2);
		context.font = "bold 12px sans-serif";
		context.fillText("Press Space to continue.", 
			canvas.width / 5, canvas.height / 2 + canvas.height / 4);
	}

	/*** Rolling background*/
	function drawBackground() {
		bgYAxis += difficulty * 3;
	    context.drawImage(img.bg, 0, bgYAxis);
	    // Draw 2 other images at the top of the first image
	    context.drawImage(img.bg, 0, bgYAxis - 600);
		context.drawImage(img.bg, 0, bgYAxis -600-600);
	
	    // Reset y axis if its off limits
	    if (bgYAxis >= 600)
	      bgYAxis = 0;
	}

	/*** The main game screen*/
	function drawGameScreen() {
		// context.drawImage(game.img.bg, 0, 20, 600, 580);
		for (var i = 0; i < NUM_ROWS; i++) {
			for (var j = 0; j < NUM_COLS; j++) {
				invaders[i][j].draw(context);
			}
		}
        player.draw(context);
        for (var i = 0 ; i < NUM_COLS; i++) {
        	invaderLasers[i].draw(context);	
        }
        laser.draw(context);
        //Draw the score
        context.fillStyle = "rgb(0, 0, 0)";
		context.fillRect (0, 0, canvas.width, SCORE_BAR);

		context.font="15px Verdana";
		context.fillStyle = "rgb(255, 255, 255)";
		context.fillText("Score: ", 10,15);
		context.fillText(score, 70,15);

		//Draw the level
		context.fillText("Level: ", 600 - 80, 15);
		context.fillText(level, 600 - 25, 15);

		//Draw the remaining lives
		context.fillText("Lives: ", 600 - 360, 15);
		context.fillText(currentLives, 600 - 300, 15);


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

	/*** Allows entities outside the game object to access images. */
	this.getImg = function() {
		return img; 
	}

	/*** Allows entities outside the game object to get animation timing info.*/
	this.getTimer = function() {
		return timer;
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