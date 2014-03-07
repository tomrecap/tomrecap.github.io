Asteroids
=========

This is a fully-functional Asteroids game, written in object-oriented Javascript and rendered with HTML5.

##Directions
- Use the arrow keys to fly around and avoid the asteroids
- Shoot bullets in the direction the spaceship is traveling by hitting the spacebar

##Cool Features
- All of the code is namespaced in separate files.
- The whole thing is object oriented.
  - Logic for rendering and calculating collisions is written in the MovingObject class.
  - Specific methods like how to move and fire bullets are written in the Asteroid and Ship classes, which inherit from MovingObject.
- Includes friction! Even though you're in space!
  - The spaceship slows down automatically. Specifically, if it's not accelerating, its velocity is reduced by 1% every time it moves.
  - There's also a maximum velocity at which the ship stops accelerating. This makes the game much easier to play.
- The board wraps, so if the spaceship or an asteroid flies off one side, it reappears on the opposite.

I built this while pair-programming with [Alex Guo](http://github.com/alexqguo).
