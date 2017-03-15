  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhBOG3nZFT0xjOu5UPm1k-ZVot1IPEfoQ",
    authDomain: "wip-camps-game.firebaseapp.com",
    databaseURL: "https://wip-camps-game.firebaseio.com",
    storageBucket: "wip-camps-game.appspot.com",
    messagingSenderId: "768785136426"
  };
  firebase.initializeApp(config);

var dbSals = firebase.database().ref().child("sals");

// mock up name
var token = "qqqq";
var name = "aaaaaa";

var game = new Phaser.Game(500, 750, Phaser.AUTO, "game");
var gamePlay = { preload : preload , create: createGamePlay , update : updateGamePlay};
var menu = { preload : preload , create : createMenu};
var howtoPlay = { preload : preload , create : createHowtoPlay};
var result = {preload : preload , create : createResult , update : updateResult};
var report = {preload : preload ,create : createReport};
var credit = {preload : preload ,create : createCredit};
game.state.add('gamePlay', gamePlay);
game.state.add('menu', menu);
game.state.add('howtoPlay', howtoPlay);
game.state.add('result',result);
game.state.add('report',report);
game.state.add('credit',credit);
game.state.start('menu');
function preload() {
    game.load.spritesheet('bomb', 'images/boomspritesheet.png',400/5,90);
	  game.load.image('collider','images/collider.png');
    game.load.image('bullet', 'images/bullet.png');
    game.load.image('ship', 'images/ship.png');
	  game.load.image('boss','images/boss.png');
    game.load.image('enemy_ship','images/enemyship.png');
    game.load.image('background','images/sea.png');
    game.load.image('laser','images/biglaser.png');
    
    game.load.spritesheet('mute','images/mute.png',450,447);
    game.load.spritesheet('start','images/start.png',3876/3,196);
    game.load.spritesheet('howtoplay','images/howtoplay.png',3876/3,196);
    game.load.spritesheet('menu','images/mainmenu.png',3876/3,196);
    game.load.spritesheet('report','images/report.png',3876/3,196);
    game.load.spritesheet('scoreboard','images/score.png',3876/3,196);
    game.load.spritesheet('playagain','images/playagain.png',3876/3,196);
    game.load.spritesheet('submit','images/submit.png',3876/3,196);
    game.load.spritesheet('credit','images/credit.png',3876/3,196);

    game.load.audio('Play','sound/WhilePlay.ogg');
    game.load.audio('Died','sound/You Died.ogg');
    game.load.audio('intro','sound/Interface.ogg');
    //game.load.audio('ENshot','sound/EnemyShot(Normal).wav');
    game.load.audio('Death','sound/Aftergethit.ogg');
    game.load.audio('BossDeath','sound/BossDeath.ogg');
    game.load.audio('ENdestroy','sound/EnemyShot(Normal).ogg');
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
var bomb;
var bombGroup;
var bombCooldown;
var bombFirstDeployTime;
var sprite,sprite2;
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
var bulletTime = 0;
var Boss,pause_label;
var score = 0,textScore;
var interMu;
var buttonStart,buttonHowToPlay;
var text;
var isSound = true;
//createGamePlay 
function createGamePlay() {
    interMu.stop();
    interMu = game.add.audio('Play');
    interMu.loopFull();
    countRound = 0;
    game.add.sprite(0,0,'background');
    sprite2 = this.add.sprite(game.world.width/2,game.world.height*(3/5), 'collider');
    sprite2.anchor.set(0.5);
    sprite2.scale.setTo(0.20, 0.20);
    game.physics.arcade.enable(sprite2);
    sprite2.body.drag.set(70);
    sprite2.body.maxVelocity.set(300);
    sprite = this.add.sprite(game.world.width/2,game.world.height*(3/5), 'ship');
    sprite.anchor.set(0.5);
    sprite.scale.setTo(0.50, 0.50);
    game.physics.arcade.enable(sprite);
    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(300);
    itemCooldown = 0;
    score=0;
    textScore = game.add.text(20,20,"Score : "+score,{fontSize : "20px",fill : "#ed3465"});
    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    destroyedCount=0;
	  wave=-1;
    laserBeam1 = game.add.group();
    laserBeam1.enableBody = true;
    laserBeam1.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = laserBeam1.create(0, 0, 'laser');
        b.anchor.set(0.5);
        b.scale.setTo(3,1);
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
        b.scale.setTo(3,1);
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
        b.scale.setTo(3,1);
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
        b.scale.setTo(0.70,0.70);
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
        b.scale.setTo(0.70,0.70);
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
        b.scale.setTo(0.70,0.70);
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
        b.scale.setTo(0.70,0.70);
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
        b.scale.setTo(0.70,0.70);
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
        b.scale.setTo(0.70,0.70);
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
        b.scale.setTo(0.70,0.70);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(BounceAndSplit2, this);
    }
    //bomb
    bombGroup = game.add.group();
    bombGroup.enableBody = true;
    bombGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 16; i++) {
        bomb = bombGroup.create(0, 0, 'bomb');
        bomb.scale.setTo(0.7, 0.7);
        bomb.exists = false;
        bomb.visible = false;
        bomb.checkWorldBounds = true;
        bomb.events.onOutOfBounds.add(resetBullet, this);
        bomb.body.setCircle(45);
    }
    bombGroup.callAll('animations.add', 'animations', 'move', [0, 1], 4, true);
    //pause_label = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    //pause_label.events.onInputUp.add(function () {game.paused = true;});
    sprite.body.collideWorldBounds = true;
    sprite2.body.collideWorldBounds = true;
    enemy = [];
    mute = game.add.button(400,20,'mute',muteSounds,this);
    mute.scale.setTo(0.1,0.1);
    //game.pause_label.isDown.add(unpause, self);
    timer = game.time.create(false);
    timer.loop(3001, reposition, this);
    timer.start();
}
//EndCreateGamePlay

//updateGamePlay
function updateGamePlay() {
	sprite2.x=sprite.x;
	sprite2.y=sprite.y;
	if(destroyedCount==0){
		wave++;
        plan = game.rnd.integerInRange(1, 10);

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
  if (itemCooldown <= 0) {
      Spawner();
  }
  itemCooldown--;

    if (fireButton.isDown)
    {
        fire();
    }
    game.physics.arcade.overlap(sprite2,laserBeam1, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,laserBeam2, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,laserBeam3, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,enemyBullets, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets1, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets2, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets3, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets4, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2,bossBullets5, bulletHitPlayer, null , this);
    game.physics.arcade.overlap(sprite2, bombGroup, bulletHitPlayer, null, this);
    for (var i = 0; i < enemy.length; i++){
        if(wave%7!=6){
            game.physics.arcade.overlap(enemy[i].enemy_ship,bullets, bulletHitEnemy, null , this);
            game.physics.arcade.overlap(enemy[i].enemy_ship,sprite2, bulletHitPlayer, null , this);
        }
        else{
            game.physics.arcade.overlap(enemy[i].boss,bullets,bulletHitBoss,null,this);
            game.physics.arcade.overlap(enemy[i].boss,sprite2, bulletHitPlayer, null , this);

        }
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

  	if(this.input.keyboard.addKey(Phaser.KeyCode.ENTER).isDown){
  		game.paused = true;
  	}
  	window.onkeydown = function(event) {
    	if (game.input.keyboard.event.keyCode == 13){
        	game.paused = false;
    	}
	}
}

//EndUpdateGamePlay

//subportGamePlay
function bulletHitPlayer () {
    shot = game.add.audio('Death');
    shot.play();
    ///
    game.state.start('result');
}

function bulletHitEnemy (enemy_ship, bullet) {
    if(enemy_ship.alive){
      bullet.kill();
      var destroyed = enemy[enemy_ship.name].damage();
      if(destroyed){
          ////play anime
          shot = game.add.audio('ENdestroy');
          shot.play();
          destroyedCount--;
      }
    }
}
function Spawner() {
    var output = game.rnd.integerInRange(0, 2);
    console.log("bomb is ready to deploy, random = "+output)
    if (output == 0) {
        console.log("bomb spawn");
        bombCooldown = 400;
        bomby = bombGroup.getFirstExists(false);
        var bombDropAt = game.rnd.integerInRange(1, 25);
        bomby.reset(game.world.width * (bombDropAt / 26), 0);
        bomby.body.velocity.y = 200;
        bombGroup.callAll('animations.play', 'animations', 'move');
    }else if(output == 1){
      //itemSpawn
    }
    else {
        itemCooldown+=60;
    }
}
function fire () {
	var vv = game.rnd.integerInRange(-75, 75);
    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x, sprite.y-10);
            bullet.body.velocity.x = vv;
            bullet.body.velocity.y = -900;
            bulletTime = game.time.now + 100;
        }
    }
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
function bulletHitBoss (boss, bullet) {

    if(boss.alive){
      bullet.kill();
      var destroyed = enemy[0].damage();
      if(destroyed){
          ////play anime
          shot = game.add.audio('BossDeath');
          shot.play();
          destroyedCount--;
      }
    }
}
//subportGamePlay

//ObjectBotShip
EnemyShip = function (index, game, bullets) {
    var x = game.world.randomX;
    var y = 0;
    this.game = game;
    this.health = 3;
    this.bullets = bullets;
    this.alive = true;
    this.enemy_ship = game.add.sprite(x, y, 'enemy_ship');
    this.enemy_ship.anchor.set(0.5);
    this.enemy_ship.scale.setTo(0.75, 0.75);
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
        score += 100;
        textScore.text = "Score : "+score;
        this.alive = false;
        this.enemy_ship.kill();
	    return true;
    }
    return false;

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
//EndObjectBotShip

//subportObjectfunction
function reposition() {
    for (var i = 0; i < enemy.length; i++){
      randPositionX[i] = game.rnd.integerInRange(0, game.world.width);
      randPositionY[i] = game.rnd.integerInRange(0, (game.world.height*(3/5)));
    }
}

function bulletHitEnemy (enemy_ship, bullet) {
    if(enemy_ship.alive){
      bullet.kill();
      var destroyed = enemy[enemy_ship.name].damage();
      if(destroyed){
          ////play anime
          shot = game.add.audio('ENdestroy');
          shot.play();
          destroyedCount--;
      }
    }
}

var shot;
function fireBot (enemy_ship) {
    if(plan==1||plan==2){
        if(enemy_ship.count%60==0){

            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x, enemy_ship.y);
            bullet.body.velocity.y = 200;
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, 350);

        }
    }
    else if(plan==3||plan==4){

        if(enemy_ship.count%30==0){
            bullet = enemyBullets.getFirstExists(false);
            bullet.reset(enemy_ship.x, enemy_ship.y);
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
            bullet.reset(enemy_ship.x, enemy_ship.y);
            bullet.body.velocity.y = 100;
        }
    }
    enemy_ship.count++;
}
//EndsubportObjectfunction


EnemyBoss = function (game) {
    var x = game.world.centerX;
    var y = 10;
    this.game = game;
    this.health = 500;
    this.countPlan=0;
    this.alive = true;
    this.boss = game.add.sprite(0,0,'boss');
    this.cannon1 = game.add.sprite((x*(1/4)), y, 'enemy_ship');
    this.cannon2 = game.add.sprite(x, y, 'enemy_ship');
    this.cannon3 = game.add.sprite((x*(7/4)), y, 'enemy_ship');
    this.cannon1.name = 1;
    this.cannon2.name = 2;
    this.cannon3.name = 3;
    //this.boss.anchor.set(0.5);
    this.boss.scale.setTo(0.5,0.15);
    this.cannon1.anchor.set(0.5);
    this.cannon2.anchor.set(0.5);
    this.cannon3.anchor.set(0.5);
    this.cannon1.count=0;
    this.cannon2.count=0;
    this.cannon3.count=0;
    this.cannon1.countBullet=0;
    this.cannon2.countBullet=0;
    this.cannon3.countBullet=0;
    game.physics.enable(this.boss);
    this.boss.body.immovable = false;
    this.boss.body.collideWorldBounds = true;
    this.boss.body.bounce.setTo(1, 1);
    this.boss.body.maxVelocity.set(200);
};

EnemyBoss.prototype.damage = function() {

    this.health -= 1;
    score += 100;
    textScore.text = "Score : "+score;
    if (this.health <= 0)
    {
        this.alive = false;
        this.boss.kill();
        this.cannon1.kill();
        this.cannon2.kill();
        this.cannon3.kill();
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

    shot = game.add.audio('laser');
    shot.play();
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
    enemy.push(new EnemyBoss(game));
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createMenu(){
    interMu = game.add.audio('intro');
    interMu.loopFull();
    buttonStart = game.add.button(game.world.centerX, game.world.centerY, 'start', toGame, this);
    buttonStart.scale.setTo(0.2,0.2);
    buttonHowToPlay = game.add.button(game.world.centerX, game.world.centerY+100, 'howtoplay', toHowToPlay, this);
    buttonHowToPlay.scale.setTo(0.2,0.2);
    buttonReport = game.add.button(game.world.centerX, game.world.centerY+200,'report',toReport,this);
    buttonReport.scale.setTo(0.2,0.2);
    buttonScore = game.add.button(game.world.centerX, game.world.centerY+300,'scoreboard',toScoreboard,this)
    buttonScore.scale.setTo(0.2,0.2);
    buttonCredit = game.add.button(game.world.centerX, game.world.centerY-100,'credit',toCredit,this)
    buttonCredit.scale.setTo(0.2,0.2);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    mute = game.add.button(400,20,'mute',muteSounds,this);
    mute.scale.setTo(0.1,0.1);
}

function createHowtoPlay(){
    interMu.stop();
    interMu = game.add.audio('intro');
    interMu.loopFull();
    text = game.add.text(game.world.centerX,game.world.centerY*(1/5),"How To Play",{fontSize : "20px",fill : "#ed3465"});
    text.anchor.set(0.5);
    buttonStart = game.add.button(game.world.centerX, game.world.centerY, 'start', toGame, this);
    buttonStart.scale.setTo(0.2,0.2);
    buttonMenu = game.add.button(game.world.centerX, game.world.centerY+100, 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.2,0.2);
    mute = game.add.button(400,20,'mute',muteSounds,this);
    mute.scale.setTo(0.1,0.1);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function createReport(){
    interMu.stop();
    interMu = game.add.audio('intro');
    interMu.loopFull();
    text = game.add.text(game.world.centerX,game.world.centerY*(1/5),"Report",{fontSize : "20px",fill : "#ed3465"});
    text.anchor.set(0.5);
    buttonSubmit = game.add.button(game.world.centerX, game.world.centerY, 'submit', toSubmit, this);
    buttonSubmit.scale.setTo(0.2,0.2);
    buttonMenu = game.add.button(game.world.centerX, game.world.centerY+100, 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.2,0.2);
    mute = game.add.button(400,20,'mute',muteSounds,this);
    mute.scale.setTo(0.1,0.1);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function createCredit(){
    interMu.stop();
    interMu = game.add.audio('intro');
    interMu.loopFull();
    text = game.add.text(game.world.centerX,game.world.centerY*(1/5),"credit",{fontSize : "20px",fill : "#ed3465"});
    text.anchor.set(0.5);
    buttonStart = game.add.button(game.world.centerX, game.world.centerY, 'start', toGame, this);
    buttonStart.scale.setTo(0.2,0.2);
    buttonMenu = game.add.button(game.world.centerX, game.world.centerY+100, 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.2,0.2);
    mute = game.add.button(400,20,'mute',muteSounds,this);
    mute.scale.setTo(0.1,0.1);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function createResult(){
    interMu.stop();
    interMu = game.add.audio('Died');
    interMu.loopFull();
    text = game.add.text(game.world.centerX,game.world.centerY,"Score : "+score,{fontSize : "20px",fill : "#ed3465"});
    text.anchor.set(0.5);
    buttonPlayagain = game.add.button(game.world.centerX, game.world.centerY, 'playagain', toGame, this);
    buttonPlayagain.scale.setTo(0.2,0.2);
    buttonReport = game.add.button(game.world.centerX, game.world.centerY+100, 'report', toReport, this);
    buttonReport.scale.setTo(0.2,0.2);
    buttonMenu = game.add.button(game.world.centerX, game.world.centerY+200, 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.2,0.2);
    mute = game.add.button(400,20,'mute',muteSounds,this);
    mute.scale.setTo(0.1,0.1);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    setScore();
}
function updateResult(){
    if(fireButton.isDown)
        game.state.start('gamePlay');
}

function toSubmit(){
    game.state.start('gamePlay');
}
function toGame(){
    game.state.start('gamePlay');
}
function toHowToPlay(){
    game.state.start('howtoPlay');
}
function toMenu() {
	game.state.start('menu');
}
function toReport() {
	game.state.start('report');
}
function toScoreboard() {
	game.state.start('gamePlay');
}
function toCredit() {
	game.state.start('credit');
}

function muteSounds() {
    isSound = !isSound;
    if (!isSound) {
        console.log("mute");
        game.sound.mute = true;
        mute.frame = 1;
    } else {
    	console.log("not mute");
        mute.frame = 0;
        game.sound.mute = false;
    }
}

function setScore() {
    var highscore;
    var sals = dbSals.child(token);
    sals.on('value', function(snapshot) {
        highscore = snapshot.val().highscore;
    });

    if(highscore < score){
        dbSals.child(token).update(
            {    "name" : name,
                 "score" : score,
                 "highscore" : score
            }
        );
        console.log("set highscore complete");
    }else{

        dbSals.child(token).update(
             {
                 "name" : name,
                 "score" : score,
             }
        );
    }
     console.log("set score complete");
}
