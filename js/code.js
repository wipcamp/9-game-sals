var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ship', 'images/ship.png');
	game.load.image('bot','images/brids.png');
    game.load.image('enemy_ship','images/enemyship.png');
}
var plan;
var destroyedCount=0;
var wave=-1;
var enemy;
var enemyBullets;
var bossBullets1;
var bossBullets2;
var bossBullets3;
var sprite;
var weapon;
var weapon2;
var cursors;
var fireButton;
var timer,total=0;
var randPositionX=[];
var randPositionY=[];
var bullets;
var fireRate = 100;
var nextFire = 0;
var bulletTime = 0;
var Boss;
function create() {
    sprite = this.add.sprite(390, 500, 'ship');
    sprite.anchor.set(0.5);
    game.physics.arcade.enable(sprite);
    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(300);
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    destroyedCount=0;
	wave=5;
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 50; i++){
        var b = enemyBullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets1 = game.add.group();
    bossBullets1.enableBody = true;
    bossBullets1.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 50; i++){
        var b = bossBullets1.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets2 = game.add.group();
    bossBullets2.enableBody = true;
    bossBullets2.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 50; i++){
        var b = bossBullets2.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets3 = game.add.group();
    bossBullets3.enableBody = true;
    bossBullets3.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 50; i++){
        var b = bossBullets3.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }

    sprite.body.collideWorldBounds = true;
    enemy = [];
    timer = game.time.create(false);
    timer.loop(3000, reposition, this);
    timer.start();
}

function update() {
	if(destroyedCount==0){
		wave++;
        plan = game.rnd.integerInRange(1, 10);
		console.log(plan);
        if(wave%7==0)
			summonWave(4);
		else if(wave%7==1)
			summonWave(5);
		else if(wave%7==2)
			summonWave(6);
        else if(wave%7==3)
      		summonWave(7);
        else if(wave%7==4)
        	summonWave(8);
        else if(wave%7==5)
        	summonWave(9);
    	else{	///boss
    		destroyedCount = 1;
            Boss = new EnemyBoss(game,bossBullets1,bossBullets2,bossBullets3);
        }
	}

    if (fireButton.isDown)
    {
        fire();
    }
    game.physics.arcade.overlap(sprite,enemyBullets, bulletHitPlayer, null , this);
    for (var i = 0; i < enemy.length; i++){
        game.physics.arcade.overlap(enemy[i].enemy_ship,bullets, bulletHitEnemy, null , this);
        if(enemy[i].alive){
          enemy[i].update(i);
        }
    }
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
}

EnemyShip = function (index, game, bullets) {
    var x = game.world.randomX;
    var y = 0;
    this.game = game;
    this.health = 3;
    this.bullets = bullets;
    this.alive = true;
    this.enemy_ship = game.add.sprite(x, y, 'enemy_ship');
    this.enemy_ship.anchor.set(0.5);
    this.enemy_ship.name = index.toString();
    this.enemy_ship.count=0;
    this.enemy_ship.countBullet=0;
    game.physics.enable(this.enemy_ship);
    this.enemy_ship.body.immovable = false;
    this.enemy_ship.body.collideWorldBounds = true;
    this.enemy_ship.body.bounce.setTo(1, 1);
    this.enemy_ship.body.maxVelocity.set(200);
};

EnemyShip.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;
        this.enemy_ship.kill();
	    return true;
    }
    return false;

}
function reposition() {
    for (var i = 0; i < enemy.length; i++){
      randPositionX[i] = game.rnd.integerInRange(1, 799);
      randPositionY[i] = game.rnd.integerInRange(1, 300);
    }
}
EnemyShip.prototype.update = function(i) {
    this.enemy_ship.body.velocity.y=0;
    this.enemy_ship.body.velocity.x=0;
    if(this.enemy_ship.x - randPositionX[i] <= 10){
        this.enemy_ship.body.velocity.x = 150;
    }else
    if(this.enemy_ship.x - randPositionX[i] >= 20){
        this.enemy_ship.body.velocity.x = -150;
    }
    if(this.enemy_ship.y - randPositionY[i] <= 10){
        this.enemy_ship.body.velocity.y = 150;
    }else
    if(this.enemy_ship.y - randPositionY[i] >= 20){
        this.enemy_ship.body.velocity.y = -150;
    }
    if(this.alive){
        fireBot(this.enemy_ship);
    }
}

function bulletHitPlayer (ship, bullet) {
    bullet.kill();
    ///
    game.state.start('main');
}

function bulletHitEnemy (enemy_ship, bullet) {
    if(enemy_ship.alive){
      bullet.kill();
      var destroyed = enemy[enemy_ship.name].damage();
      if(destroyed){
          ////play anime
          destroyedCount--;
      }
    }
}

function fire () {
    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x-15, sprite.y-20);
            bullet.body.velocity.y = -1000;
            bulletTime = game.time.now + 100;
        }
    }
}

function fireBot (enemy_ship) {
    if(plan==1||plan==2){
        if(enemy_ship.count%60==0){
            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x-30, enemy_ship.y-20);
            bullet.body.velocity.y = 200;
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, 350);
        }
    }
    else if(plan==3||plan==4){
        console.log(">>");
        if(enemy_ship.count%30==0){
            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x-30, enemy_ship.y-20);
            if(enemy_ship.countBullet%5==0){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = 200;
            }
            else if(enemy_ship.countBullet%5==1){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = 100;
            }
            else if(enemy_ship.countBullet%5==2){
                bullet.body.velocity.y = 100;
            }
            else if(enemy_ship.countBullet%5==3){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = -100;
            }
            else if(enemy_ship.countBullet%5==4){
                bullet.body.velocity.y = 100;
                bullet.body.velocity.x = -200;
            }
            enemy_ship.countBullet++;
        }
    }
    else{
        if(enemy_ship.count%50==0){
            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x-30, enemy_ship.y-20);
            bullet.body.velocity.y = 100;
        }
    }
    enemy_ship.count++;
}

function resetBullet (bullet) {
    bullet.kill();
}

function summonWave(numberWave){
  var l = enemy.length;
  for(var i=0;i<l;i++)
		enemy.pop();
	destroyedCount=numberWave;
	for (var i = 0; i < numberWave; i++){
        enemy.push(new EnemyShip(i, game, enemyBullets));
    }
}


EnemyBoss = function (game, bullets1,bullets2,bullets3) {
    var x = 400;
    var y = 0;
    this.game = game;
    this.health = 1000000;
    this.bullets1 = bullets1;
    this.bullets2 = bullets2;
    this.bullets3 = bullets3;
    this.alive = true;
    this.boss = game.add.sprite(x, y, 'enemy_ship');
    this.boss.anchor.set(0.5);
    this.boss.count=0;
    this.boss.countBullet=0;
    game.physics.enable(this.boss);
    this.boss.body.immovable = false;
    this.boss.body.collideWorldBounds = true;
    this.boss.body.bounce.setTo(1, 1);
    this.boss.body.maxVelocity.set(200);
};

EnemyBoss.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;
        this.boss.kill();
        return true;
    }
    return false;

}

EnemyBoss.prototype.update = function(){

}