(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx
    this.asteroids = this.addAsteroids(10);
    this.bullets = [];
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2], [0,0]);

    this.background = new Image();
    this.background.src = "bg.png";
  };

  Game.DIM_X = 400;
  Game.DIM_Y = 400;

  Game.prototype.addAsteroids = function (numAsteroids) {
    asteroid_array = [];

    for (var i = 0; i < numAsteroids; i++) {
      asteroid_array.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    };

    return asteroid_array;
  };

  Game.prototype.checkShipCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        this.stop("Game Over, You LOSE");
      };
    };
  };

  Game.prototype.stop = function(message) {
    clearInterval(this.timerId);
    alert(message);
  };

  Game.prototype.executeBulletCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = 0; j < this.bullets.length; j++) {

        if (this.bullets[j] && this.bullets[j].isCollidedWith(this.asteroids[i])) {
          this.asteroids[i] = null;
          this.bullets[j] = null;
          break;
        };
      };
    };

    this.asteroids = _.compact(this.asteroids);
    this.bullets = _.compact(this.bullets);
  };

  Game.prototype.removeOffscreenAsteroids = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.outOfBounds(this.asteroids[i].pos)) {
        this.asteroids[i] = null;
      }
    }

    this.asteroids = _.compact(this.asteroids);
  };

  Game.prototype.removeOffscreenBullets = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      if (this.outOfBounds(this.bullets[i].pos)) {
        this.bullets[i] = null;
      }
    }

    this.bullets = _.compact(this.bullets);
  };

  Game.prototype.outOfBounds = function (position) {
    x = position[0];
    y = position[1];

    if (x < 0 || y < 0 ||
        x > Game.DIM_X || y > Game.DIM_Y) {
        return true;
    };

    return false;
  };

  Game.prototype.fireBullet = function () {
    var maybeBullet = this.ship.fireBullet();
    if (maybeBullet) {
      this.bullets.push(maybeBullet);
    };
  };

  Game.prototype.bindKeyHandlers = function () {
    key('up',    this.ship.power.bind(this.ship, [ 0, -1]));
    key('down',  this.ship.power.bind(this.ship, [ 0,  1]));
    key('right', this.ship.power.bind(this.ship, [ 1,  0]));
    key('left',  this.ship.power.bind(this.ship, [-1,  0]));

    key('space', this.fireBullet.bind(this));
  };

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.drawImage(this.background, 0, 0, Game.DIM_X, Game.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    };

    this.ship.draw(this.ctx);

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    };
  };

  Game.prototype.slowDownShip = function () {
    this.ship.vel[0] *= 0.99
    this.ship.vel[1] *= 0.99
  };

  Game.prototype.checkForWin = function () {
    if (this.asteroids.length == 0) {
      this.draw();
      this.stop("You Win");
    }
  }

  Game.prototype.move = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
      this.wrap(this.asteroids[i]);
    };
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    };

    this.ship.move();
    this.wrap(this.ship);
  };

  Game.prototype.wrap = function (obj) {
    if (obj.pos[0] > (Game.DIM_X + obj.radius)) {
      obj.pos[0] -= Game.DIM_X + (obj.radius * 2);
    };

    if (obj.pos[0] < -obj.radius) {
      obj.pos[0] += Game.DIM_X + (obj.radius * 2);
    };

    if (obj.pos[1] > (Game.DIM_Y + obj.radius)) {
      obj.pos[1] -= Game.DIM_Y + (obj.radius * 2);
    };

    if (obj.pos[1] < -obj.radius) {
      obj.pos[1] += Game.DIM_Y + (obj.radius * 2);
    };
  }

  Game.prototype.step = function () {
    this.move();
    this.draw();

    this.checkShipCollisions();
    this.executeBulletCollisions();

    this.removeOffscreenBullets();
    this.slowDownShip();

    this.checkForWin();
  };

  Game.prototype.start = function () {
    this.timerId = setInterval(this.step.bind(this), 17); // 1/60 ~= 0.016666
  };

})(this);