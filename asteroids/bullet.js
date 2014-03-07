(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {})

  var Bullet = Asteroids.Bullet = function (pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.color = Bullet.COLOR;
    this.radius = Bullet.RADIUS;
  }

  Bullet.inherits(Asteroids.MovingObject);
  Bullet.COLOR = "ff2800";
  Bullet.RADIUS = 5;

})(this);