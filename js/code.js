var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'images/brids.png');
    game.load.image('ship', 'images/brids.png');
	game.load.image('bot','images/brids.png');
}

var enemy;
var enemyBullets;
var sprite;
var weapon;
var weapon2;
var cursors;
var fireButton;
var bot;

function create() {

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');



    //  The bullets will be automatically killed when they are 2000ms old
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 2000;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;
	weapon.bulletAngleVariance = 0;
    //  Wrap bullets around the world bounds to the opposite side
    //weapon.bulletWorldWrap = false;

    sprite = this.add.sprite(390, 500, 'ship');

    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);

    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(300);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(sprite, 0, -20, false);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
		/////////////////////////////////////
	//bot = this.add.sprite(380, 100, 'bot');
    /*game.physics.arcade.enable(bot);
    bot.body.maxVelocity.set(200);
    weapon2 = game.add.weapon(30, 'bullet');
    weapon2.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon2.bulletLifespan = 2000;
    weapon2.bulletSpeed = 500;
    weapon2.fireRate = 500;
    weapon2.autofire= true;
	weapon2.bulletAngleVariance = 50;
    //weapon2.bulletWorldWrap = false;
    weapon2.trackSprite(bot, 0, 0, false);
    weapon2.fireAngle=90;*/

    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(100, 'bullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 0.5);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //sprite.body.collideWorldBounds = true;
    enemy = [];
    enemy.push(new EnemyShip(1, game, enemyBullets));
}

function update() {
	sprite.body.velocity.y=0;
	sprite.body.velocity.x=0;
	if(cursors.up.isDown){
		sprite.body.velocity.y = -300;
	}
	if(cursors.down.isDown){
		sprite.body.velocity.y = 300;
	}
	if(cursors.left.isDown){
		sprite.body.velocity.x = -300;
	}
	if(cursors.right.isDown){
		sprite.body.velocity.x = 300;
	}

    if (fireButton.isDown)
    {
        weapon.fire();
    }

    //game.world.wrap(sprite, 16);
    //game.world.wrap(bot, 16);
}

function render() {

    weapon.debug();

}


EnemyShip = function (index, game, bullets) {

    var x = game.world.randomX;
    var y = (game.world.randomY/2);

    this.game = game;
    this.health = 50;
    this.bullets = bullets;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;

    this.ship = game.add.sprite(x, y, 'ship');
    this.ship.anchor.set(0.5);

    this.ship.name = index.toString();
    game.physics.enable(this.ship, Phaser.Physics.ARCADE);
    this.ship.body.immovable = false;
    this.ship.body.collideWorldBounds = true;
    this.ship.body.bounce.setTo(1, 1);

    
};

EnemyShip.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;
        this.ship.kill();
	    return true;
    }

    return false;

}

EnemyShip.prototype.update = function() {

    
};
