The game images are stored in the /img folder and loaded into that javascript file and stored in a class for access.

enemies in the game are replicated according to the original space invaders game, enemies have 3 tiers and each on has 2 images alternating. Animations in this game is done, using a timer which is ticked by the setInterval() function in run(), and periodically drawed onto the canvas also by the calls from setInterval().

The enemies in the bottom row are are randomly selected to fire projectiles at the player, the chance and speed of their projectiles increases as the level progresses, increasing the difficulty. The enemies of the bottom row are periodically updated and with their indices stored in a list. 