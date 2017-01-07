var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var main = { preload : preload , create: create , update : update};
game.state.add('main', main);
game.state.start('main');
function preload() {
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ship', 'images/ship.png');
	game.load.image('bot','images/brids.png');
    game.load.image('enemy_ship','images/enemyship.png');
    game.load.image('background','images/sea.png');
    game.load.image('laser','images/biglaser.png');
}
var plan,p1,p2;
var destroyedCount=0;
var wave=-1;
var enemy;
var enemyBullets;
var bossBullets1;
var bossBullets2;
var bossBullets3;
var bossBullets4;
var bossBullets5;
var sprite;
var weapon;
var weapon2;
var cursors;
var fireButton;
var laserBeam1,laserBeam2,laserBeam3;
var timer,total=0;
var randPositionX=[];
var randPositionY=[];
var bullets;
var countRound = 0;
var fireRate = 100;
var nextFire = 0;
var bulletTime = 0;
var Boss;
var score = 0,textScore;
function create() {
    countRound = 0;
    game.add.sprite(0,0,'background');
    sprite = this.add.sprite(game.world.width/2,game.world.height*(3/5), 'ship');
    sprite.anchor.set(0.5);
    game.physics.arcade.enable(sprite);
    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(300);
    score=0;
    textScore = game.add.text(20,20,"Score : "+score,{fontSize : "20px",fill : "#ed3465"});
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    destroyedCount=0;
	wave=5;
    laserBeam1 = game.add.group();
    laserBeam1.enableBody = true;
    laserBeam1.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = laserBeam1.create(0, 0, 'laser');
        b.anchor.set(0.5);
        b.scale.setTo(8,1);
        b.name = 'laser' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    laserBeam2 = game.add.group();
    laserBeam2.enableBody = true;
    laserBeam2.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = laserBeam2.create(0, 0, 'laser');
        b.anchor.set(0.5);
        b.scale.setTo(8,1);
        b.name = 'laser' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    laserBeam3 = game.add.group();
    laserBeam3.enableBody = true;
    laserBeam3.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = laserBeam3.create(0, 0, 'laser');
        b.anchor.set(0.5);
        b.scale.setTo(8,1);
        b.name = 'laser' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bullets.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = enemyBullets.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets1 = game.add.group();
    bossBullets1.enableBody = true;
    bossBullets1.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets1.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets2 = game.add.group();
    bossBullets2.enableBody = true;
    bossBullets2.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets2.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets3 = game.add.group();
    bossBullets3.enableBody = true;
    bossBullets3.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets3.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }
    bossBullets4 = game.add.group();
    bossBullets4.enableBody = true;
    bossBullets4.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets4.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.anchor.set(0.5);
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(BounceAndSplit, this);
    }
    bossBullets5 = game.add.group();
    bossBullets5.enableBody = true;
    bossBullets5.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bossBullets5.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(BounceAndSplit2, this);
    }

    sprite.body.collideWorldBounds = true;
    enemy = [];
    timer = game.time.create(false);
    timer.loop(3001, reposition, this);
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
    		summonBoss();
        }
	}

    if (fireButton.isDown)
    {
        fire();
    }
    game.physics.arcade.overlap(sprite,laserBeam1, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,laserBeam2, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,laserBeam3, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,enemyBullets, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,bossBullets1, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,bossBullets2, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,bossBullets3, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,bossBullets4, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite,bossBullets5, bulletHitPlayer, null , this);
    for (var i = 0; i < enemy.length; i++){
        game.physics.arcade.overlap(enemy[i].enemy_ship,bullets, bulletHitEnemy, null , this);
        game.physics.arcade.overlap(enemy[i].enemy_ship,sprite, bulletHitPlayer, null , this);
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
        score += 10;
        textScore.text = "Score : "+score;
        this.alive = false;
        this.enemy_ship.kill();
	    return true;
    }
    return false;

}
function reposition() {
    for (var i = 0; i < enemy.length; i++){
      randPositionX[i] = game.rnd.integerInRange(0, game.world.width);
      randPositionY[i] = game.rnd.integerInRange(0, (game.world.height*(3/5)));
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


EnemyBoss = function (game, bullets1,bullets2,bullets3,bullets4) {
    var x = game.world.centerX;
    var y = 10;
    this.game = game;
    this.health = 1000000;
    this.bullets1 = bullets1;
    this.bullets2 = bullets2;
    this.bullets3 = bullets3;
    this.bullets4 = bullets4;
    this.countPlan=0;
    this.alive = true;
    this.cannon1 = game.add.sprite((x*(1/4)), y, 'enemy_ship');
    this.cannon2 = game.add.sprite(x, y, 'enemy_ship');
    this.cannon3 = game.add.sprite((x*(7/4)), y, 'enemy_ship');
    this.cannon1.name = 1;
    this.cannon2.name = 2;
    this.cannon3.name = 3;
    this.cannon1.anchor.set(0.5);
    this.cannon2.anchor.set(0.5);
    this.cannon3.anchor.set(0.5);
    this.cannon1.count=0;
    this.cannon2.count=0;
    this.cannon3.count=0;
    this.cannon1.countBullet=0;
    this.cannon2.countBullet=0;
    this.cannon3.countBullet=0;
    /*game.physics.enable(this.boss);
    this.boss.body.immovable = false;
    this.boss.body.collideWorldBounds = true;
    this.boss.body.bounce.setTo(1, 1);
    this.boss.body.maxVelocity.set(200);*/
};

EnemyBoss.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;
        //this.boss.kill();
        return true;
    }
    return false;

}

EnemyBoss.prototype.update = function(){
    
    if(this.alive){
        fireBoss(this.cannon1,this.cannon2,this.cannon3,this.countPlan);   
    }   
    this.countPlan++;
}
//+60
function fireBoss(cannon1,cannon2,cannon3,countPlan){
    if(countPlan%3600<=300){//300
        if(countPlan%45==0){
            lockOn(cannon1,bossBullets1,400);
            lockOn(cannon2,bossBullets2,400);
            lockOn(cannon3,bossBullets3,400);
        }
    }
    else if(countPlan%3600>360&&countPlan%3600<=720){//360
        if(countPlan%10==0){
            superSplash(cannon1,bossBullets1);
            superSplash(cannon2,bossBullets2);
            superSplash(cannon3,bossBullets3);
        }
    }
    else if(countPlan%3600>800&&countPlan%3600<=1060){//180
        if(countPlan%6==0){
            laserOnTheMove(cannon1,laserBeam1);
            laserOnTheMove(cannon2,laserBeam2);
            laserOnTheMove(cannon3,laserBeam3);
        }
    }
    else if(countPlan%3600>1070+60&&countPlan%3600<=1250+60){//180
        if(countPlan%30==0){
            fireBounceAndSplit(cannon1,bossBullets4);
            fireBounceAndSplit(cannon2,bossBullets4);
            fireBounceAndSplit(cannon3,bossBullets4);
        }
    }
    else if(countPlan%3600>1340+60&&countPlan%3600<=1520+60){//180
        if(countPlan%30==0){
            fireWorks(cannon1,bossBullets4);
            fireWorks(cannon2,bossBullets4);
            fireWorks(cannon3,bossBullets4);
        }
    }
    else if(countPlan%3600>1660+60&&countPlan%3600<=1780+60){//120
        if(countPlan%30==0){
            lockOn(cannon1,bossBullets1,200);
        }
    }
    else if(countPlan%3600>1840+60&&countPlan%3600<=1960+60){//120
        if(countPlan%30==0){
            lockOn(cannon2,bossBullets2,200);
        }
    }
    else if(countPlan%3600>2060+60&&countPlan%3600<=2340){//120
        if(countPlan%30==0){
            lockOn(cannon2,bossBullets2,200);
        }
    }
    else if(countPlan%3600>2520&&countPlan%3600<=2640+60){//180
        if(countPlan==2521){
            p1=game.rnd.integerInRange(1,2);
        }
        if(countPlan%6==0){
            laserOnTheMove(cannon1,laserBeam1);
            if(p1==1)
                laserOnTheMove(cannon2,laserBeam2);
            else
                laserOnTheMove(cannon3,laserBeam3);
        }
    }
    else if(countPlan%3600>2750&&countPlan%3600<=3000+60){//180
        if(countPlan==2751){
            p1=game.rnd.integerInRange(1,2);
        }
        if(countPlan%6==0){
            laserOnTheMove(cannon2,laserBeam2);
            if(p1==1)
                laserOnTheMove(cannon1,laserBeam1);
            else
                laserOnTheMove(cannon3,laserBeam3);
        }
    }
    else if(countPlan%3600>3110&&countPlan%3600<=3360+30){//180
        if(countPlan==3111){
            p1=game.rnd.integerInRange(1,2);
        }
        if(countPlan%6==0){
            laserOnTheMove(cannon3,laserBeam3);
            if(p1==1)
                laserOnTheMove(cannon2,laserBeam2);
            else
                laserOnTheMove(cannon1,laserBeam1);
        }
    }

    countPlan++;
}

function lockOn (cannon,bullets,speed) {//30 400
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, speed);
}

function laserOnTheMove (cannon,bullets) { //40<7
    console.log(bullets.name);
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    bullet.body.velocity.y = 400;
    //bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, 200);
}

function superSplash (cannon,bullets) { //10
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    if(cannon.countBullet%9==0){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 200;
    }
    else if(cannon.countBullet%9==1){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 150;
    }
    else if(cannon.countBullet%9==2){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 100;
    }
    else if(cannon.countBullet%9==3){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = 50;
    }
    else if(cannon.countBullet%9==4){
        bullet.body.velocity.y = 100;
    }
    else if(cannon.countBullet%9==5){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -50;
    }
    else if(cannon.countBullet%9==6){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -100;
    }
    else if(cannon.countBullet%9==7){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -150;
    }
    else if(cannon.countBullet%9==8){
        bullet.body.velocity.y = 100;
        bullet.body.velocity.x = -200;
    }
    cannon.countBullet++;
}
function fireBounceAndSplit(cannon,bullets){
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x+15, cannon.y+20);
    bullet.body.velocity.y = 200;
}
function BounceAndSplit (bullet) {
    var x = bullet.x;
    var y = bullet.y;
    bullet.kill();
    var b1 = bossBullets1.getFirstExists(false);
    var b2 = bossBullets2.getFirstExists(false);
    var b3 = bossBullets3.getFirstExists(false);
    var b4 = enemyBullets.getFirstExists(false);
    b1.reset(x,y-10);
    b2.reset(x,y-10);
    b3.reset(x,y-10);
    b4.reset(x,y-10);
    b1.body.velocity.x = -200;
    b1.body.velocity.y = -100;

    b2.body.velocity.x = -100;
    b2.body.velocity.y = -100;
    
    b3.body.velocity.x = 100;
    b3.body.velocity.y = -100;
    
    b4.body.velocity.x = 200;
    b4.body.velocity.y = -100;
}
function BounceAndSplit2 (bullet) {
    var x = bullet.x;
    var y = bullet.y;
    bullet.kill();
    var b1 = bossBullets1.getFirstExists(false);
    var b2 = bossBullets2.getFirstExists(false);
    var b3 = bossBullets3.getFirstExists(false);
    var b4 = enemyBullets.getFirstExists(false);
    b1.reset(x,y+10);
    b2.reset(x,y+10);
    b3.reset(x,y+10);
    b4.reset(x,y+10);
    b1.body.velocity.x = -200;
    b1.body.velocity.y = 100;

    b2.body.velocity.x = -100;
    b2.body.velocity.y = 100;
    
    b3.body.velocity.x = 100;
    b3.body.velocity.y = 100;
    
    b4.body.velocity.x = 200;
    b4.body.velocity.y = 100;
}

function fireWorks (cannon,bullets) { 
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon.x, cannon.y);
    bullet.body.velocity.y = 100;
    game.time.events.add(Phaser.Timer.SECOND * 3.3, boom,this,cannon);
}
function boom(cannon){
    console.log(".");
    var x = cannon.x;
    var y = game.world.height*(3/5);
    bullet.kill();
    var b1 = bossBullets1.getFirstExists(false);
    var b4 = bossBullets2.getFirstExists(false);
    var b3 = bossBullets3.getFirstExists(false);
    var b2 = enemyBullets.getFirstExists(false);
    var b5 = bossBullets5.getFirstExists(false);
    b1.reset(x,y);
    b2.reset(x,y);
    b3.reset(x,y);
    b4.reset(x,y);
    b5.reset(x,y);
    b1.body.velocity.x = -100;
    b1.body.velocity.y = -100;
    b2.body.velocity.x = 100;
    b2.body.velocity.y = -100;
    b3.body.velocity.x = 100;
    b3.body.velocity.y = 100;
    b4.body.velocity.x = -100;
    b4.body.velocity.y = 100;
    b5.body.velocity.y = -100;
}
function summonBoss(){
    var l = enemy.length;
    for(var i=0;i<l;i++)
        enemy.pop();
    destroyedCount=1;
    enemy.push(new EnemyBoss(game,bossBullets1,bossBullets2,bossBullets3,bossBullets4));
}