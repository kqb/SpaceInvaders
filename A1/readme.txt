/*
CSC309 Assignment 1; Feburary 7 2014
Alexander Sirotkin (g2sirotk; 996328852)
Katie Lo (g3lanaya; 998493848)
*/

Our version of Space Invaders was primarily made using Javascript using a HTML canvas with a small amount of CSS to centre that canvas onto the screen. 

When the index page loads, the following occurs:
 - Event listeners for keyboard inputs (for up and down) are created. They specifically will listen for the left key, right key and space key in particular. 
 - The Game object is created and ‘linked’ to the HTML canvas.
 - The main Game Loop starts that runs the game.update() and game.draw() functions at an interval dependent on the game’s declared frame rate. 

The rest of the game is wholly contained within the game.js file. The game images are stored in the /img folder and loaded into that javascript file and stored in a class for access.

The Game object contains all game logic related information and two loops: game.update() to update the state of the game’s world; and game.update() that draws that world. Almost all the other functions in the Game object exist to support either of those two pieces of functionality. 

All objects that are drawable on screen and can be interacted with by the player are kept outside the Game object and are known as ‘entities’. The original design had a abstract ‘Entity’ object that all other more specialized entities (e.g. the player) would extend. However, traditional inheritance (e.g. Java) is more trouble than it was worth and extend, all entities were written in a standardized way. Entities are closely related to the Game object, and realistically could/should be inside the Game object; but we did not think there would be a huge amount of value gained by refactoring to fix that. Entities are created during the construction of the Game object and are used primarily inside the game.update() and game.draw() functions.

Enemies in the game are replicated according to the original space invaders game, enemies have 3 tiers and each one has 2 images to alternate between. The enemies in the bottom row are are randomly selected to fire projectiles at the player, the chance and speed of their projectiles increases as the level progresses, increasing the difficulty. The enemies of the bottom row are periodically updated and with their indices stored in a list. 

The primary data structure we used was arrays to keep track of the invaders, fired lasers by invaders and any object we would have multiple instances of. This is in addition to the regular variable and objects in javascript.

The code is well-documented, but summaries of each section of code is below:


/****************************
	Game Entities
****************************/
All ‘Game Entity’ objects have a similar structure. As a drawable objects on the screen, entities can hold the following properties: x coordinate, y coordinate, height, width and ‘alive’, which determines if the particular entity should be drawn on the screen and interact with other entities. All entities are drawn as part of the game.draw() loop. The are three main types of entities:
 - Lasers (e.g. Laser and invLaser)
 - Invaders (e.g. Invader1, Invader2 and Invader 3)  
 - Player (e.g. Player)

function Laser(new_x, new_y, new_vector) 
function invLaser(new_x, new_y, new_vector)
function Invader3(new_x, new_y, new_value)
function Invader2(new_x, new_y, new_value)
function Invader1(new_x, new_y, new_value)
function Player(new_x, new_y)


/****************************
	Game Body
****************************/
The Game object takes the canvas as a parameter and during its construction initializes all the necessary variables required for the game to run. The default values for gameplay relevant variables are handled in the setup() function to allow the game to reset the board at game restart or when the player advances to the next level. All images are stored in the variable img which gets it values from the loadAssets function/object. 

function Game(new_canvas)
	function setup()
	function loadAssets()

	/****************************
		Game Logic
	****************************/
	All the functions below game.update() (and before the next separating header) are called by it to manage the various functionalities of the game. The game.update() itself primarily has a nested for loop to iterate through all invaders and do all the relevant checks for them (aka the bulk of the game). Game.draw() has a similar scheme. 
	
	/*** Update the logic of the game. */
	this.update = function()

	/*** At random times, a random column of aliens will shoot back.*/
	function invadersShoot()

	/*** Update the position of the laser. */
	function updateLaser()
	
	/*** Update the position of the invader lasers. */
	function updateInvaderLaser()

	/*** If any input keys are held down, the player character should
	react accordingly. */
	function checkPlayerInput()

	/*** Checks if the invaders hit a wall, if they do, drops them on row down
	and changes their direction. */
	function checkInvaderWallLimit()

	/*** Updates the point where the invaders change direction.
	This also checks for the current lowest invader to check for defeat. */
	function updateInvaderWallLimits()

	/*** Check victory and defeat conditions. */
	function checkWinDefeat()

	/*** Set invader lasers to not alive. */
	function resetLasers()

	/*** Respawn player if they have remaining lives. */
	function respawn()


	/****************************
		Player Control
	****************************/
	/* Note: We toggle player shooting through the use of keyup and keydown
	events since keydown by itself has a browser-variable refresh rate and
	it does not allow for simultaneous key input. */

	/*** Toggle player shooting (used by Game.update). */
	this.shoot = function(val)

	/*** Toggle player movement to the left (used by Game.update). */
	this.moveLeft = function(val)


	/*** Toggle player movement to the right (used by Game.update). */
	this.moveRight = function(val)


	/****************************
		Draw Functions
	****************************/

	/*** Clear the screen, then draw all entities onto the screen. */
	this.draw = function()

	/*** Draw countdown for respawn.*/
	function drawRespawnScreen()

	/*** Draw a black screen, seen at game start.*/
	function drawStartScreen()

	/*** Draw a black screen with score. */
	function drawDefeatScreen()

	/*** Draw a black screen, saying weiner. */
	function drawWinScreen()

	/*** Rolling background*/
	function drawBackground()

	/*** The main game screen*/
	function drawGameScreen()

	/*** Clear the canvas. */
	function wipeCanvas()

	/****************************
		Internal Data Getters
	****************************/
	/* Ideally, this would not be necessary, but refactoring the code to fix that
	situation is not worth the effort given that the game works. */

	/*** Allows entities outside the game object to access images. */
	this.getImg = function()

	/*** Allows entities outside the game object to get animation timing info.*/
	this.getTimer = function()
}

/****************************
	Main Body
****************************/

/*** This function is run once the index page is loaded. It starts the game logic.*/
function run()

/* When the player presses a key, that message is sent to the game logic. */
function keys_down(e)

/* When the player releases a key, that message is sent to the game logic. */
function keys_up(e)

