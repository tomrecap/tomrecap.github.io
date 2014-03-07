(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.inherits(Asteroids.MovingObject);
  Asteroid.COLOR = "#FF8700";
  Asteroid.RADIUS = 20;

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var x = Math.random() * dimX;
    var y = Math.random() * dimY;

    // prevent asteroids from starting on top of the ship
    var xDiff = x - (dimX/2)
    var yDiff = y - (dimY/2)

    if ((Math.abs(xDiff) + Math.abs(yDiff - y)) < 100) {
      (xDiff < 0) ? (x += 150) : (x -= 150);
      (yDiff < 0) ? (y += 150) : (y -= 150);
    };

    var velocity = [((Math.random() * 2) - 1) * 2,
      ((Math.random() * 2) - 1) * 2
    ];

    return new Asteroid([x, y], velocity);
  };


})(this);
