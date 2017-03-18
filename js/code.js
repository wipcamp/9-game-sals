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
let {id, fbname } = JSON.parse($.session.get('fb'));
// mock up name
var token = id;
var name = fbname;

var game = new Phaser.Game(350, 560, Phaser.AUTO, "game");
var gamePlay = { preload : preload , create: createGamePlay , update : updateGamePlay};
var menu = { preload : preload , create : createMenu};
var howtoPlay = { preload : preload , create : createHowtoPlay ,update : updateHowtoPlay};
var result = {preload : preload , create : createResult , update : updateResult};
var report = {preload : preload ,create : createReport , update : updateReport};
var credit = {preload : preload ,create : createCredit};
game.state.add('gamePlay', gamePlay);
game.state.add('menu', menu);
game.state.add('howtoPlay', howtoPlay);
game.state.add('result',result);
game.state.add('report',report);
game.state.add('credit',credit);
game.state.start('menu');
function preload() {
	game.load.image('collider','images/collider.png');
    game.load.image('bullet', 'images/bullet.png');
	  game.load.image('boss','images/bossboss.png');
    game.load.image('bullet_blue','images/bullet_blue.png');
    game.load.image('bullet_green','images/bullet_green.png');
    game.load.image('bullet_red','images/bullet_red.png');
    game.load.image('bullet_yellow','images/bullet_yellow.png');
    game.load.image('enemyship_red','images/enemyship_red.png');
    game.load.image('enemyship_blue','images/enemyship_blue.png');
    game.load.image('enemyship_green','images/enemyship_green.png');
    game.load.image('background','images/bg.png');
    game.load.image('laser','images/biglaser.png');
    game.load.image('text_speed','images/text_move.png');
    game.load.image('text_fire','images/text_fire.png');
    game.load.image('text_score','images/text_score.png');
    game.load.image('rock1','images/rock1.png');
    game.load.image('rock2','images/rock2.png');
    game.load.image('bgGame','images/bgGame.png');
    game.load.image('oldMap','images/oldMap.png');
    game.load.image('gameover','images/GAME-OVER-01.png');
    game.load.image('pause','images/pause.png');
    game.load.spritesheet('wip','images/wip.png');

    game.load.spritesheet('ship', 'images/playership.png',350/5,96,5);
    game.load.spritesheet('speed','images/item_move.png',50,50,8);
    game.load.spritesheet('firerate','images/item_fire.png',50,50,8);
    game.load.spritesheet('scoreUp','images/item_score.png',50,50,8);
    game.load.spritesheet('bomb', 'images/boomspritesheet.png',400/5,90);
    game.load.spritesheet('shark', 'images/shark.png', 50, 50);
    game.load.spritesheet('mute','images/mute.png',450,447);
    game.load.spritesheet('start','images/start.png',3876/3,196);
    game.load.spritesheet('howtoplay','images/howtoplay.png',3876/3,196);
    game.load.spritesheet('menu','images/mainmenu.png',3876/3,196);
    game.load.spritesheet('report','images/report.png',3876/3,196);
    game.load.spritesheet('scoreboard','images/score.png',3876/3,196);
    game.load.spritesheet('playagain','images/playagain.png',3876/3,196);
    game.load.spritesheet('submit','images/submit.png',3876/3,196);
    game.load.spritesheet('credit','images/credit.png',3876/3,196);
    game.load.spritesheet('seawave','images/wave.png',165/11,4);
    game.load.spritesheet('up','images/up.png',50,46);
    game.load.spritesheet('right','images/right.png',50,46);
    game.load.spritesheet('left','images/left.png',50,46);
    game.load.spritesheet('down','images/down.png',50,46);
    game.load.spritesheet('spacebar','images/spacebar.png',2584/2,196);
    game.load.spritesheet('enter','images/enter.png',2553/3,196);
    game.load.spritesheet('bossBoom','images/bossBoom.png',1750/5,(520/5)-2);

    game.load.audio('play','sound/WhilePlay.ogg');
    game.load.audio('Died','sound/You Died.ogg');
    game.load.audio('intro','sound/Interface.ogg');
    //game.load.audio('ENshot','sound/EnemyShot(Normal).wav');
    game.load.audio('Death','sound/Aftergethit.ogg');
    game.load.audio('BossDeath','sound/BossDeath.ogg');
    game.load.audio('ENdestroy','sound/EnemyShot(Normal).ogg');
    game.load.audio('shark','sound/Shark.mp3');
    game.load.audio('click','sound/ButtonPush.mp3');
    game.load.audio('bossBGM','sound/BossBGM.mp3');
    game.load.audio('beam','sound/Beam.mp3');
    game.load.audio('pickItem','sound/ItemPick.mp3');
}
var ckShoot;
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
var bombGroup;
var bombCooldown;
var itemCooldown;
var shark;
var rock1,rock2;
var rockGroup;
var rockCooldown;
var isRockActive;
var sharkGroup;
var sharkCooldown;
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
var buttonStart,buttonHowToPlay;
var text;
var menuBGM;
var gameBGM;
var bossBGM;
var resultBGM;
var clickSound;
var sharkSound;
var beamSound;
var pickItem;
var isFirstTimeMenu = true;
var isSound = true;
var speedGroup;
var firerateGroup;
var scoreGroup;
var speedTime;
var firerateTime;
var scoreTime;
var speedMove;
var scoreMultiplier;
var firerateOutput;
var seawaveGroup;
var seawaveCooldown;
var seawaveDropAt = [];
var isPause;
var isFirstSubmit;
var causeOfDeath;
//createGamePlay
function createGamePlay() {
    firerateOutput = 100;
    speedMove=300;
    speedTime=0;
	  firerateTime=0;
	  scoreTime=0;
	  scoreMultiplier = 1;
    isFirstTimeMenu=true;
    gameBGM = game.add.audio('play');
    bossBGM = game.add.audio('bossBGM');
    sharkSound = game.add.audio('shark');
    beamSound = game.add.audio('beam');
    pickItem = game.add.audio('pickItem');
    menuBGM.stop();
    resultBGM.stop();
    gameBGM.loopFull();
    countRound = 0;
    game.add.sprite(0,0,'background');
    seawaveGroup = game.add.group();
    seawaveGroup.enableBody = true;
    seawaveGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var seawave = seawaveGroup.create(0, 0, 'seawave');
        seawave.anchor.set(0.5);
        seawave.scale.setTo(1.5,1.5);
        seawave.exists = false;
        seawave.visible = false;
        seawave.checkWorldBounds = true;
        seawave.events.onOutOfBounds.add(resetBullet, this);
    }
    seawaveGroup.callAll('animations.add', 'animations', 'default', [0,1,2,3,4,5,6,7,8,9], 6, true);
    sprite = this.add.sprite(game.world.width/2,game.world.height*(3/5), 'ship');
    sprite.anchor.set(0.5);
    sprite.scale.setTo(0.4, 0.4);
    game.physics.arcade.enable(sprite);
    //sprite.body.drag.set(70);
    sprite2 = this.add.sprite(game.world.width/2,game.world.height*(3/5), 'collider');
    sprite2.anchor.set(0.5);
    sprite2.scale.setTo(0.3, 0.3);
    game.physics.arcade.enable(sprite2);
    //sprite2.body.drag.set(70);
    sprite.animations.add('moveLeft',[1,2],10,false);
    sprite.animations.add('moveRight',[3,4],10,false);
    bombCooldown = 0;
    itemCooldown = game.rnd.integerInRange(0,240);
    sharkCooldown = 0;
    rockCooldown = 0;
    isRockActive = true;
    seawaveCooldown = 60;
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
        b.scale.setTo(2.5,2.7);
        b.body.setSize(75,121.5);
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
        b.scale.setTo(2.5,2.7);
        b.body.setSize(75,121.5);
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
        b.scale.setTo(2.5,2.7);
        b.body.setSize(75,121.5);
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
        var b = bullets.create(0, 0, 'bullet_yellow');
        b.anchor.set(0.5);
        b.scale.setTo(0.2,0.2);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
        b.body.setCircle(5);
    }
    bullets_green = game.add.group();
    bullets_green.enableBody = true;
    bullets_green.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bullets_green.create(0, 0, 'bullet_green');
        b.anchor.set(0.5);
        b.scale.setTo(0.2,0.2);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
        b.body.setCircle(5);
    }
    bullets_blue = game.add.group();
    bullets_blue.enableBody = true;
    bullets_blue.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bullets_blue.create(0, 0, 'bullet_blue');
        b.anchor.set(0.5);
        b.scale.setTo(0.2,0.2);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
        b.body.setCircle(5);
    }
    bullets_red = game.add.group();
    bullets_red.enableBody = true;
    bullets_red.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bullets_red.create(0, 0, 'bullet_red');
        b.anchor.set(0.5);
        b.scale.setTo(0.2,0.2);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
        b.body.setCircle(5);
    }
    bullets_green = game.add.group();
    bullets_green.enableBody = true;
    bullets_green.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 100; i++){
        var b = bullets_green.create(0, 0, 'bullet_green');
        b.anchor.set(0.5);
        b.scale.setTo(0.2,0.2);
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
        b.body.setCircle(5);
    }
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 120; i++){
        var b = enemyBullets.create(0, 0, 'bullet');
        b.anchor.set(0.5);
        b.scale.setTo(0.7,0.7);
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
    for (var i = 0; i < 120; i++){
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
    for (var i = 0; i < 120; i++){
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
        bomb.scale.setTo(0.5, 0.5);
        bomb.exists = false;
        bomb.visible = false;
        bomb.checkWorldBounds = true;
        bomb.events.onOutOfBounds.add(resetBullet, this);
        bomb.body.setCircle(18);
    }
    bombGroup.callAll('animations.add', 'animations', 'move', [0, 1], 4, true);
    //speed
    speedGroup = game.add.group();
    speedGroup.enableBody = true;
    speedGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 16; i++) {
    	speed = speedGroup.create(0,0,'speed');
        speed.exists = false;
        speed.visible = false;
        speed.checkWorldBounds = true;
        speed.events.onOutOfBounds.add(resetBullet, this);
        speed.body.setSize(50,70,0,-15);
    }
    speedGroup.callAll('animations.add', 'animations', 'shake', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,0], 60, true);
    //firerate
    firerateGroup = game.add.group();
    firerateGroup.enableBody = true;
    firerateGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 16; i++) {
    	fireObj = firerateGroup.create(0,0,'firerate');
        fireObj.exists = false;
        fireObj.visible = false;
        fireObj.checkWorldBounds = true;
        fireObj.events.onOutOfBounds.add(resetBullet, this);
        fireObj.body.setSize(50,70,0,-15);
    }
    firerateGroup.callAll('animations.add', 'animations', 'shake', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,0], 60, true);
    //score
    scoreGroup = game.add.group();
    scoreGroup.enableBody = true;
    scoreGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 16; i++) {
    	scoreObj = scoreGroup.create(0,0,'scoreUp');
        scoreObj.exists = false;
        scoreObj.visible = false;
        scoreObj.checkWorldBounds = true;
        scoreObj.events.onOutOfBounds.add(resetBullet, this);
        scoreObj.body.setSize(50,70,0,-15);
    }
    scoreGroup.callAll('animations.add', 'animations', 'shake', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,0], 60, true);
    rock1 = this.add.sprite(0,0, 'rock1');
    game.physics.arcade.enable(rock1);
    rock1.enableBody = true;
    rock1.exists = false;
    rock1.visible = false;
    rock1.scale.setTo(1.3,1.3);
    rock1.anchor.set(0.5);
    rock1.body.setCircle(22);
    rock1.checkWorldBounds = true;
    rock1.events.onOutOfBounds.add(resetBullet, this);
    rock1.body.velocity.y = 100;

    rock2 = this.add.sprite(0,0, 'rock2');
    game.physics.arcade.enable(rock2);
    rock2.enableBody = true;
    rock2.exists = false;
    rock2.visible = false;
    rock2.scale.setTo(1.3,1.3);
    rock2.anchor.set(0.5);
    rock2.body.setCircle(22);
    rock2.checkWorldBounds = true;
    rock2.events.onOutOfBounds.add(resetBullet, this);
    rock2.body.velocity.y = 100;

    sharkGroup = game.add.group();
    sharkGroup.enableBody = true;
    sharkGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 16; i++) {
        shark = sharkGroup.create(0, 0, 'shark');
        shark.exists = false;
        shark.visible = false;
        shark.scale.setTo(1,1);
        shark.anchor.set(0.5);
        shark.body.setCircle(16.5);
        shark.checkWorldBounds = true;
        shark.events.onOutOfBounds.add(resetBullet, this);
    }
    sharkGroup.callAll('animations.add', 'animations', 'moveFromLeft', [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51], 100, true);
    sharkGroup.callAll('animations.add', 'animations', 'moveFromRight', [25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 100, true);

    //test animation item
    //pause_label = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
    //pause_label.events.onInputUp.add(function () {game.paused = true;});
    sprite.body.collideWorldBounds = true;
    sprite2.body.collideWorldBounds = true;
    enemy = [];
    mute = game.add.button(300,20,'mute',muteSounds,this);
    mute.scale.setTo(0.08,0.08);
    if(isSound)
    	mute.frame = 0;
    else
    	mute.frame = 1;
    //game.pause_label.isDown.add(unpause, self);
    timer = game.time.create(false);
    timer.loop(3001, reposition, this);
    timer.start();
}
//EndCreateGamePlay

//updateGamePlay
function updateGamePlay() {
  game.debug.body(sprite2);
  if(laserBeam3.getFirstAlive!=null){
    game.debug.body(laserBeam3.getFirstAlive());
  }
  if(laserBeam2.getFirstAlive!=null){
    game.debug.body(laserBeam2.getFirstAlive());
  }
  if(laserBeam1.getFirstAlive!=null){
    game.debug.body(laserBeam1.getFirstAlive());
  }
	sprite2.x=sprite.x;
	sprite2.y=sprite.y;
	if(speedTime==0){
		speedMove = 300;
		speedTime--;
	}
	else if(speedTime>0){
		speedMove = 1000;
		speedTime--;
	}

	if(scoreTime == 0){
		scoreMultiplier = 1;
		scoreTime--;
	}
	else if(scoreTime>0){
		scoreMultiplier = 2;
		scoreTime--;
	}

	if(firerateTime == 0){
		firerateOutput = 100;
		firerateTime--;
	}
	else if(firerateTime>0){
		firerateOutput = 20;
		firerateTime--;
	}
	if(destroyedCount==0){
		wave++;
    //wave == 6;
    //    plan = game.rnd.integerInRange(1, 10);

    if(wave%7==0){
      bossBGM.stop();
      gameBGM.play();
			summonWave(4);
		}else if(wave%7==1)
			summonWave(5);
		else if(wave%7==2)
			summonWave(6);
    else if(wave%7==3)
      summonWave(7);
    else if(wave%7==4)
      summonWave(8);
    else if(wave%7==5)
      summonWave(9);
    else{
      gameBGM.stop();
      bossBGM.play();
    	summonBoss();
    }
	}
  if (bombCooldown <= 0) {
      bombSpawn();
  }
  if (sharkCooldown <= 0) {
      sharkSpawn();
  }
  if(isRockActive){
      if (rockCooldown <= 0){
          rockSpawn();
      }
      rockCooldown--;
  }
  if (seawaveCooldown <= 0) {
      seawaveSpawn();
  }
  bombCooldown--;
  sharkCooldown--;
  seawaveCooldown--;
  	if(itemCooldown <= 0)
  		itemSpawner();
  	itemCooldown--;
    if (fireButton.isDown)
    {
        fire();
    }
    game.physics.arcade.overlap(sprite2,laserBeam1, bulletHitPlayer, null, this,"โอ๊ย!!! เรือบ้าอะไรยิงเลเซอร์ได้ด้วย!!");
    game.physics.arcade.overlap(sprite2,laserBeam2, bulletHitPlayer, null , this,"โอ๊ย!!! เรือบ้าอะไรยิงเลเซอร์ได้ด้วย!!");
    game.physics.arcade.overlap(sprite2,laserBeam3, bulletHitPlayer, null , this,"โอ๊ย!!! เรือบ้าอะไรยิงเลเซอร์ได้ด้วย!!");
    game.physics.arcade.overlap(sprite2,enemyBullets, bulletHitPlayer, null , this,"นี่มันบ้าอะไรเนี่ย!!");
    game.physics.arcade.overlap(sprite2,bullets_red, bulletHitPlayer, null , this,"นี่มันจะโกงเกินไปแล้ว!");
    game.physics.arcade.overlap(sprite2,bullets_blue, bulletHitPlayer, null , this,"เจ็บใจนัก ข้าจะกลับมาแก้แค้น.");
    game.physics.arcade.overlap(sprite2,bullets_green, bulletHitPlayer, null , this,"นี่ข้าหลบไม่พ้นได้ยังไง!?");
    game.physics.arcade.overlap(sprite2,bossBullets1, bulletHitPlayer,null, this,"เจ็บใจนัก ข้าจะกลับมาแก้แค้น.");
    game.physics.arcade.overlap(sprite2,bossBullets2, bulletHitPlayer,null,"เจ็บใจนัก ข้าจะกลับมาแก้แค้น.");
    game.physics.arcade.overlap(sprite2,bossBullets3, bulletHitPlayer,null,"เจ็บใจนัก ข้าจะกลับมาแก้แค้น.");
    game.physics.arcade.overlap(sprite2,bossBullets4, bulletHitPlayer, null , this,"แบบนี้ก็ได้หรอ!?");
    game.physics.arcade.overlap(sprite2,bossBullets5, bulletHitPlayer, null , this,"โถ่เอ๊ย! หลบได้ก็เทพและ");
    game.physics.arcade.overlap(sprite2,bombGroup, bulletHitPlayer, null, this,"เรือข้าพังหมดแล้ว TT");
    game.physics.arcade.overlap(sprite2,sharkGroup, bulletHitPlayer, null, this,"ฉลามมาได้ไงเนี่ยยยยยย!?");
    game.physics.arcade.overlap(sprite2,speedGroup, getSpeed, null , this);
    game.physics.arcade.overlap(sprite2,firerateGroup, getFirerate, null , this);
    game.physics.arcade.overlap(sprite2,scoreGroup, getScore, null , this);

    for (var i = 0; i < enemy.length; i++){
        if(wave%7!=6){
            game.physics.arcade.overlap(enemy[i].enemy_ship,bullets, bulletHitEnemy, null , this);
            game.physics.arcade.overlap(enemy[i].enemy_ship,sprite2, bulletHitPlayer, null , this,"นี่เจ้าบ้ารึเปล่า!!");
        }
        else{
            game.physics.arcade.overlap(enemy[i].boss,bullets,bulletHitBoss,null,this);
            game.physics.arcade.overlap(enemy[i].boss,sprite2, bulletHitPlayer, null , this,"นี่เจ้าเสียสติไปแล้วเรอะ!!");

        }
        if(enemy[i].alive){
          enemy[i].update(i);
        }
    }
    sprite.body.velocity.y=0;
	  sprite.body.velocity.x=0;
  	if(cursors.up.isDown){
  		sprite.body.velocity.y = -speedMove;
  	}
  	if(cursors.left.isDown){
  		sprite.body.velocity.x = -speedMove;
      if(sprite.frame!=2)
        sprite.animations.play('moveLeft');
  	}else if(cursors.right.isDown){
  		sprite.body.velocity.x = speedMove;
      if(sprite.frame!=4)
        sprite.animations.play('moveRight');
  	}else{
      sprite.frame = 0;
    }
    if(cursors.down.isDown){
  		sprite.body.velocity.y = speedMove;
  	}
    game.physics.arcade.overlap(sprite, rock1, rockOverlapPlayer, null, this);
    game.physics.arcade.overlap(sprite, rock2, rockOverlapPlayer, null, this);
  	if(this.input.keyboard.addKey(Phaser.KeyCode.ENTER).isDown){
  		isPause = game.add.image(game.world.width/2,game.world.height/2,'pause');
        isPause.anchor.set(0.5);
        isPause.scale.setTo(0.95);
        isPause.alpha = 0.8;
        textPause = game.add.text(game.world.width/2,game.world.height/2,'press enter to resume',{font : "24px",fill : "#FFFFFF"});
        textPause.anchor.set(0.5);
        game.paused = true;
  	}
  	window.onkeydown = function(event) {
    	if (game.input.keyboard.event.keyCode == 13){
        	isPause.kill();
            textPause.kill();
            game.paused = false;
    	}
	  }

}

//EndUpdateGamePlay

//subportGamePlay
function getScore(player,item) {
  pickItem.play();
	var scale = 0.7;
	var obj = game.add.image(item.x,item.y,'text_score');
	obj.anchor.set(0.5);
	obj.scale.setTo(scale);
	item.kill();
	scoreTime = 120;
	game.time.events.loop(Phaser.Timer.SECOND * 0.0625, function(){
		scale+=0.025;
		obj.scale.setTo(scale);
		obj.alpha-=0.025;
	}, this);
	game.time.events.add(Phaser.Timer.SECOND * 2, function(){
		obj.kill();
	}, this);
}
function getFirerate(player,item) {
  pickItem.play();
	item.kill();
	var scale = 0.7;
	var obj = game.add.image(item.x,item.y,'text_fire');
	obj.anchor.set(0.5);
	obj.scale.setTo(scale);
	firerateTime = 120;
	game.time.events.loop(Phaser.Timer.SECOND * 0.0625, function(){
		scale+=0.025;
		obj.scale.setTo(scale);
		obj.alpha-=0.025;
	}, this);
	game.time.events.add(Phaser.Timer.SECOND * 2, function(){
		obj.kill();
	}, this);
}
function getSpeed(player,item) {
  pickItem.play();
	item.kill();
	var scale = 0.7;
	var obj = game.add.image(item.x,item.y,'text_speed');
	obj.anchor.set(0.5);
	obj.scale.setTo(scale);
	speedTime = 120;
	game.time.events.loop(Phaser.Timer.SECOND * 0.0625, function(){
		scale+=0.025;
		obj.scale.setTo(scale);
		obj.alpha-=0.025;
	}, this);
	game.time.events.add(Phaser.Timer.SECOND * 2, function(){
		obj.kill();
	}, this);
}

function bulletHitPlayer (cause) {
    causeOfDeath = cause;
    shot = game.add.audio('Death');
    shot.play();
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
function bombSpawn() {
    var output = game.rnd.integerInRange(0, 1);
    if (output == 0) {
        bombCooldown = 400;
        var bomb = bombGroup.getFirstExists(false);
        var bombDropAt = game.rnd.integerInRange(1, 25);
        bomb.reset(game.world.width * (bombDropAt / 26), 0);
        bomb.body.velocity.y = 200;
        bombGroup.callAll('animations.play', 'animations', 'move');
    }else{
        bombCooldown+=60;
    }
}
function rockSpawn() {
    var output = game.rnd.integerInRange(0, 1);
    if (output == 0) {
        var rand = game.rnd.integerInRange(1, 3);
        var rockDropAt = game.rnd.integerInRange(1, 25);
        switch (rand) {
            case 1:rock1.reset(game.world.width * (rockDropAt / 26), 0);
                  rock1.body.velocity.y = 100;
            break;
            case 2:rock2.reset(game.world.width * (rockDropAt / 26), 0);
                  rock2.body.velocity.y = 100;
            break;
        }
        rockCooldown = 400;
    }else{
        rockCooldown+=60;
    }
}
function rockOverlapPlayer(playership,rock) {
    if(sprite.y-rock.y<=50&&sprite.y-rock.y>=-5&&sprite.x-rock.x<=30&&sprite.x-rock.x>=-30){
        sprite.body.velocity.y = 100;
        if(cursors.down.isDown){
            sprite.body.velocity.y = speedMove;
        }
        if(sprite.y>=game.world.height-30){
            bulletHitPlayer("หัดคุมเรือให้มันดีๆหน่อยสิ!");
        }
    }else if(rock.y-sprite.y<=40&&rock.y-sprite.y>=-5){
        if(cursors.down.isDown){
            sprite.body.velocity.y = 0;
        }
    }
    if(sprite.x-rock.x<=50&&sprite.x-rock.x>=-5&&cursors.left.isDown&&sprite.y-rock.y<=20){
        sprite.body.velocity.x = 0;
    }else if(rock.x-sprite.x<=50&&rock.x-sprite.x>=-5&&cursors.right.isDown&&sprite.y-rock.y<=20){
        sprite.body.velocity.x = 0;
    }
}
function sharkSpawn() {
    var output = game.rnd.integerInRange(0, 1);
    if (output == 0) {
        sharkCooldown = 180;
        var shark = sharkGroup.getFirstExists(false);
        var sharkLaunchAt = game.rnd.integerInRange(1, 31);
        var spawnSide = game.rnd.integerInRange(0,1);
        if(spawnSide==0){
            shark.reset(0, game.world.width * (sharkLaunchAt / 30));
            shark.animations.stop();
            shark.animations.frame = 26;
        }else{
            shark.reset(game.world.width, game.world.height * (sharkLaunchAt / 30));
            shark.animations.stop();
            shark.animations.frame = 25;
        }
        game.time.events.add(Phaser.Timer.SECOND * 3.0, sharkLaunch, this, spawnSide, shark);

    }else{
        sharkCooldown+=60;
    }
}
function sharkLaunch(spawnSide,shark) {
    sharkSound.play();
    if(spawnSide==0){
        shark.body.velocity.x = 800;
        shark.animations.play('moveFromLeft');
    }else {
        shark.body.velocity.x = -800;
        shark.animations.play('moveFromRight');
    }
}
function seawaveSpawn(){
    seawaveCooldown=20;
    if(seawaveDropAt.length==0){
        seawaveDropAt=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        seawaveDropAt=shuffle(seawaveDropAt);
    }
    var seawave = seawaveGroup.getFirstExists(false);
    seawave.reset(game.world.width * (seawaveDropAt.pop() / 21), 0);
    seawave.body.velocity.y = 100;
    seawave.animations.play('default');

}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function itemSpawner() {
  /////// sound item spawn
	var output = game.rnd.integerInRange(0,2);
	if(output==0)
		speedUp();
	else if(output==1)
		firerateUp();
	else
		scoreUp();
}
function speedUp() {
	itemCooldown = game.rnd.integerInRange(240,400);
	var position = game.rnd.integerInRange(0,game.world.width);
	speed = speedGroup.getFirstExists(false);
	speed.reset(position,0);
	speed.body.velocity.y = 150;
  speedGroup.callAll('animations.play', 'animations', 'shake');
}
function firerateUp() {
	itemCooldown = game.rnd.integerInRange(240,400);
	var position = game.rnd.integerInRange(0,game.world.width);
	fireRate = firerateGroup.getFirstExists(false);
	fireRate.reset(position,0);
	fireRate.body.velocity.y = 150;
  firerateGroup.callAll('animations.play', 'animations', 'shake');
}
function scoreUp() {
	itemCooldown = game.rnd.integerInRange(240,400);
	var position = game.rnd.integerInRange(0,game.world.width);
	scoreObj = scoreGroup.getFirstExists(false);
	scoreObj.reset(position,0);
	scoreObj.body.velocity.y = 150;
  scoreGroup.callAll('animations.play', 'animations', 'shake');
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
            bulletTime = game.time.now + firerateOutput;
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
    var randColor = game.rnd.integerInRange(1,3);
    var color;
    switch (randColor) {
      case 1:color="red";
      break;
      case 2:color="blue";
      break;
      case 3:color="green";
      break;
    }
    for (var i = 0; i < numberWave; i++){
        enemy.push(new EnemyShip(i, game, enemyBullets,color));
    }
    isRockActive=true;
}
function bulletHitBoss (boss, bullet) {

    if(boss.alive){
        bullet.kill();
        var destroyed = enemy[0].damage();
        if(destroyed){
            ////play anime
            shot = game.add.audio('BossDeath');
            shot.play();
            //destroyedCount--;
            var death = game.add.sprite(0,-9,'bossBoom');
            var bossDeath = death.animations.add('play',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],6.25,true);
            mute.bringToTop();
            textScore.bringToTop();
            bossBGM.fadeOut(3500);
            bossDeath.onComplete.add(function() {
                death.kill();
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    destroyedCount--;
                },this);
            }, this);
            bossDeath.play(6.25,false);
        }
    }
}
//subportGamePlay

//ObjectBotShip
EnemyShip = function (index, game, bullets,color) {
    var x = game.world.randomX;
    var y = 0;
    this.game = game;
    this.health = 3;
    this.bullets = bullets;
    this.alive = true;
    switch (color) {
      case "red":this.enemy_ship = game.add.sprite(x, y, 'enemyship_red');
      this.enemy_ship.name = index.toString()+"red";
      break;
      case "blue":this.enemy_ship = game.add.sprite(x, y, 'enemyship_blue');
      this.enemy_ship.name = index.toString()+"blue";
      break;
      case "green":this.enemy_ship = game.add.sprite(x, y, 'enemyship_green');
      this.enemy_ship.name = index.toString()+"green";
      break;
    }
    this.enemy_ship.scale.setTo(0.5, 0.5);
    this.enemy_ship.anchor.set(0.5);
    this.enemy_ship.count=0;
    this.enemy_ship.countBullet=0;
    game.physics.enable(this.enemy_ship);
    this.enemy_ship.body.immovable = false;
    this.enemy_ship.body.collideWorldBounds = true;
    this.enemy_ship.body.bounce.setTo(1, 1);
    this.enemy_ship.body.maxVelocity.set(200);
    mute.bringToTop();
    textScore.bringToTop();
};
EnemyShip.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        score += 100*scoreMultiplier;
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
      var destroyed = enemy[enemy_ship.name.substring(0,1)].damage();
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
    if(enemy_ship.name.substring(1) == "red"){
        if(enemy_ship.count%60==0){
            bullet = bullets_red.getFirstExists(false);
            bullet.reset(enemy_ship.x, enemy_ship.y);
            bullet.body.velocity.y = 200;
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, 350);
        }
    }
    else if(enemy_ship.name.substring(1) == "green"){
        if(enemy_ship.count%30==0){
            bullet = bullets_green.getFirstExists(false);
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
    }else{
        if(enemy_ship.count%50==0){
            bullet = bullets_blue.getFirstExists(false);
            bullet.reset(enemy_ship.x, enemy_ship.y);
            bullet.body.velocity.y = 100;
        }
    }
    enemy_ship.count++;
}
//EndsubportObjectfunction


EnemyBoss = function (game) {
    this.game = game;
    this.health = 500;
    this.countPlan=0;
    this.alive = true;
    this.boss = game.add.sprite(0,-8.5,'boss');
    //this.boss.anchor.set(0,0.2);
    this.cannon1 = [175/2, 30];
    this.cannon2 = [175,30];
    this.cannon3 = [175*3/2, 20];
    this.cannon1.name = 1;
    this.cannon2.name = 2;
    this.cannon3.name = 3;
    //this.boss.anchor.set(0.5);
    this.boss.scale.setTo(1.0,1.0); //ปรับ scale boss
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
    mute.bringToTop();
    textScore.bringToTop();
};

EnemyBoss.prototype.damage = function() {

    this.health -= 1;
    score += 100*scoreMultiplier;
    textScore.text = "Score : "+score;
    if (this.health <= 0)
    {
        this.alive = false;
        this.boss.kill();
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
    else if(countPlan%3600>800&&countPlan%3600<=1040){//180
        if(countPlan%3600==801)
            beamSound.play();
        if(countPlan%6==0){
            laserOnTheMove(cannon1,laserBeam1);
            laserOnTheMove(cannon2,laserBeam2);
            laserOnTheMove(cannon3,laserBeam3);
        }
    }
    else if(countPlan%3600>1070&&countPlan%3600<=1250+60){//180
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
            lockOn(cannon3,bossBullets2,200);
        }
    }
    else if(countPlan%3600>2520&&countPlan%3600<=2640+60){//180
        if(countPlan==2521){
            p1=game.rnd.integerInRange(1,2);
        }
        if(countPlan%3600==2521)
            beamSound.play();
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
        if(countPlan%3600==2751)
            beamSound.play();
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
    bullet.reset(cannon[0], cannon[1]);
    bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, speed);
}

function laserOnTheMove (cannon,bullets) { //40<7

    shot = game.add.audio('laser');
    shot.play();
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon[0]+15, cannon[1]+20);
    bullet.body.velocity.y = 1200;
    console.log(cannon[0]);
    //bullet.rotation = this.game.physics.arcade.moveToObject(bullet, sprite, 200);
}

function superSplash (cannon,bullets) { //10
    bullet = bullets.getFirstExists(false);
    bullet.reset(cannon[0]+15, cannon[1]+20);
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
    bullet.reset(cannon[0]+15, cannon[1]+20);
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
    bullet.reset(cannon[0], cannon[1]);
    bullet.body.velocity.y = 100;
    game.time.events.add(Phaser.Timer.SECOND * 3.3, boom,this,cannon);
}
function boom(cannon){
    var x = cannon[0];
    var y = game.world.height*(3/5);
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
    isRockActive=false;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createMenu(){
    if(isFirstTimeMenu){
        clickSound = game.add.audio('click');
        resultBGM = game.add.audio('Died');
        menuBGM = game.add.audio('intro');
        menuBGM.loopFull();
        isFirstTimeMenu=false;
    }
    bg = game.add.image(0,0,'bgGame');
    bg.scale.setTo(0.17,0.18);
    logo = game.add.image(game.world.width/2, game.world.height*(0.75/4),'wip');
    logo.anchor.set(0.5);
    logo.scale.setTo(0.5);
    buttonStart = game.add.button(game.world.width/2, game.world.height*(3/4)+15, 'start', toGame, this);
    buttonStart.scale.setTo(0.12);
    buttonStart.anchor.set(0.5);
    buttonHowToPlay = game.add.button(game.world.width*(1/4), game.world.height*(3.25/4)+15, 'howtoplay', toHowToPlay, this);
    buttonHowToPlay.scale.setTo(0.12);
    buttonHowToPlay.anchor.set(0.5);
    buttonReport = game.add.button(game.world.width*(1/4), game.world.height*(3.5/4)+15,'report',toReport,this);
    buttonReport.scale.setTo(0.12);
    buttonReport.anchor.set(0.5);
    buttonScore = game.add.button(game.world.width*(3/4), game.world.height*(3.25/4)+15,'scoreboard',toScoreboard,this)
    buttonScore.scale.setTo(0.12);
    buttonScore.anchor.set(0.5);
    buttonCredit = game.add.button(game.world.width*(3/4), game.world.height*(3.5/4)+15,'credit',toCredit,this)
    buttonCredit.scale.setTo(0.12);
    buttonCredit.anchor.set(0.5);
    mute = game.add.button(300,20,'mute',muteSounds,this);
    mute.scale.setTo(0.08,0.08);
    if(isSound)
    	mute.frame = 0;
    else
    	mute.frame = 1;
}

function createHowtoPlay(){
    bg = game.add.image(0,0,'bgGame');
    bg.scale.setTo(0.17,0.18);
    map = game.add.image(game.world.width/2,game.world.height/2,'oldMap');
    map.anchor.set(0.5);
    map.scale.setTo(0.95);
    text = game.add.image(game.world.centerX,game.world.centerY*(1.2/5),"howtoplay");
    text.anchor.set(0.5);
    text.scale.setTo(0.19);
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
    buttonStart = game.add.button(game.world.width*(2.25/3), game.world.height*(4.6/5), 'start', toGame, this);
    buttonStart.scale.setTo(0.11);
    buttonStart.anchor.set(0.5);
    buttonMenu = game.add.button(game.world.width*(0.75/3), game.world.height*(4.6/5), 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.11);
    buttonMenu.anchor.set(0.5);

    sprite = game.add.sprite(game.world.width/7+25, game.world.height*(1.5/5)+25 ,'ship');
    sprite.anchor.set(0.5);
    sprite.frame = 0;
    game.physics.arcade.enable(sprite);

    up = game.add.sprite(game.world.width/7+45, game.world.height*(2.5/5)+25, 'up');
    up.scale.setTo(0.5);
    up.anchor.set(0.5);

    down = game.add.sprite(game.world.width/7+45, game.world.height*(2.75/5)+25, 'down');
    down.scale.setTo(0.5);
    down.anchor.set(0.5);

    left = game.add.sprite(game.world.width*(0.4/7)+45, game.world.height*(2.75/5)+25, 'left');
    left.scale.setTo(0.5);
    left.anchor.set(0.5);

    right = game.add.sprite(game.world.width*(1.6/7)+45, game.world.height*(2.75/5)+25, 'right');
    right.scale.setTo(0.5);
    right.anchor.set(0.5);

    spriteShoot = game.add.sprite(game.world.width*(4.5/7)+25, game.world.height*(1.5/5)+25 ,'ship');
    spriteShoot.anchor.set(0.5);
    spriteShoot.frame = 0;

    spacebar = game.add.sprite(game.world.width*(4.5/7)+25, game.world.height*(2.75/5)+25,'spacebar');
    spacebar.scale.setTo(0.1,0.15);
    spacebar.anchor.set(0.5);
    spacebarAnimation = spacebar.animations.add('play',[0,1],2,true);
    spacebarAnimation.onComplete.add(function() {
        spacebar.frame = 0;
    }, this);

    enter = game.add.sprite(game.world.width/2, game.world.height*(3.65/5)+25,'enter');
    enter.scale.setTo(0.15);
    enter.anchor.set(0.5);
    enterAnimation = enter.animations.add('play',[0,1],2,true);
    enterAnimation.onComplete.add(function() {
        enter.frame = 0;
    }, this);

    text = game.add.text(game.world.width/2, game.world.height*(3.95/5)+25,'press to pause and resume game',{font : "24px",fill : "#5B3B00"});
    text.anchor.set(0.5);

    game.time.events.loop(1500, function() {//enter
        enterAnimation.play(2,false);
    }, this);
    ckShoot = true;
    game.time.events.loop(3000, function() {//shoot
        if(ckShoot)
            spacebar.frame = 1;
        else
            spacebar.frame = 0;
        ckShoot=!ckShoot;
    }, this);
    var ck = 0;
    game.time.events.loop(500, function() {//move
        if(ck%5 == 0){
            up.frame = 1;
            right.frame = 0;
            down.frame = 0;
            left.frame = 0;
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = -100;
        }
        else if(ck%5 == 1){
            up.frame = 0;
            right.frame = 1;
            down.frame = 0;
            left.frame = 0;
            sprite.body.velocity.x = 100;
            sprite.body.velocity.y = 0;
        }
        else if(ck%5 == 2){
            up.frame = 0;
            right.frame = 0;
            down.frame = 1;
            left.frame = 0;
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 100;
        }
        else if(ck%5 == 3){
            up.frame = 0;
            right.frame = 0;
            down.frame = 0;
            left.frame = 1;
            sprite.body.velocity.x = -100;
            sprite.body.velocity.y = 0;
        }
        else if(ck%5 == 4){
            up.frame = 0;
            right.frame = 0;
            down.frame = 0;
            left.frame = 0;
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
        }
        ck++;
    }, this);
    mute = game.add.button(300,20,'mute',muteSounds,this);
    mute.scale.setTo(0.08,0.08);
    if(isSound)
    	mute.frame = 0;
    else
    	mute.frame = 1;
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    bulletTime = 0;
}
function updateHowtoPlay() {
    if(!ckShoot){
        var vv = game.rnd.integerInRange(-75, 75);
        if (game.time.now > bulletTime)
        {
            bullet = enemyBullets.getFirstExists(false);
            if (bullet)
            {
                bullet.reset(spriteShoot.x, spriteShoot.y-10);
                bullet.body.velocity.x = vv;
                bullet.body.velocity.y = -900;
                bulletTime = game.time.now + 100;
            }
        }
    }
}

function createReport(){
    ckReport = false;
    bg = game.add.image(0,0,'bgGame');
    bg.scale.setTo(0.17,0.18);
    map = game.add.image(game.world.width/2,game.world.height/2,'oldMap');
    map.anchor.set(0.5);
    map.scale.setTo(0.95);
    text = game.add.image(game.world.centerX,game.world.centerY*(1.2/5),"report");
    text.anchor.set(0.5);
    text.scale.setTo(0.19);
    buttonSubmit = game.add.button(game.world.width*(2.25/3), game.world.height*(4.6/5), 'submit', sendReport, this);
    buttonSubmit.scale.setTo(0.11);
    buttonSubmit.anchor.set(0.5);
    buttonMenu = game.add.button(game.world.width*(0.75/3), game.world.height*(4.6/5), 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.11);
    buttonMenu.anchor.set(0.5);
    game.add.plugin(PhaserInput.Plugin);
    input = game.add.inputField(game.world.width * 0.5 / 4, game.world.height / 4, {
        font: '16px',
        fill: '#212121',
        fontWeight: 'normal',
        width: 240,
        height: 250,
        borderColor: '#000',
        textAlign: 'left',
        padding: 10,
        max: 300,
        placeHolder: 'แจ้งข้อผิดพลาดได้ที่นี่เลยนะ :)'
    });
    input.startFocus();
    mute = game.add.button(300,20,'mute',muteSounds,this);
    mute.scale.setTo(0.08,0.08);
    if(isSound)
    	mute.frame = 0;
    else
    	mute.frame = 1;
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function updateReport() {
    if(ckReport)
        debugReport();
}
function sendReport() {
    if (input.value != "") {
        isFirstSubmit = false;
        ckReport = true;
        //sendReportMessage(input.value);
        input.value = null;
        input.destroy();
    }
}

function debugReport() {
    if (input.value != "") {
        console.log("!!!!");
        isFirstSubmit = false;
        ckReport = false;
        //buttonSound();
        //sendReportMessage(input.value);
        input.value = null;
        input = game.add.inputField(game.world.width * 0.5 / 4, game.world.height / 4, {
            font: '22px Thaisans Neue for Web',
            fill: '#212121',
            fontWeight: 'normal',
            width: 240,
            height: 250,
            borderColor: '#000',
            textAlign: 'left',
            padding: 10,
            max: 300,
            placeHolder: 'แจ้งข้อผิดพลาดได้ที่นี่เลยนะ :)'
        });
        input.startFocus();
        text = game.add.text(game.world.width / 2, 550 * (3.75 / 4) - 80, "แจ้งข่าวกัปตันเรียบร้อยแล้ว", { font: "18px Thaisans Neue for Web", fill: "#5B3B00" });
        text.anchor.set(0.5);
    }
}

function createCredit(){
    bg = game.add.image(0,0,'bgGame');
    bg.scale.setTo(0.17,0.18);
    map = game.add.image(game.world.width/2,game.world.height/2,'oldMap');
    map.anchor.set(0.5);
    map.scale.setTo(0.95);
    text = game.add.image(game.world.centerX,game.world.centerY*(1.2/5),"credit");
    text.anchor.set(0.5);
    text.scale.setTo(0.19);
    buttonStart = game.add.button(game.world.width*(2.25/3), game.world.height*(4.6/5), 'start', toGame, this);
    buttonStart.scale.setTo(0.11);
    buttonStart.anchor.set(0.5);
    buttonMenu = game.add.button(game.world.width*(0.75/3), game.world.height*(4.6/5), 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.11);
    buttonMenu.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) - 25 + 10, "Audio Library – No Copyright Music", { fontSize: "16px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) + 5 + 10, "URL : goo.gl/yReazM", { fontSize: "12px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) + 35 + 10, "Ross Bugden - Music", { fontSize: "16px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) + 65 + 10, "URL : goo.gl/NDMy6w", { fontSize: "12px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) + 95 + 10, "Ship sailing on the sea", { fontSize: "16px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) + 125 + 10, "URL : goo.gl/1YpYo3", { fontSize: "12px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) + 155 + 10, "Beach party wooden sign", { fontSize: "16px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    textCredit = game.add.text(game.world.width /2, 550 * (1 / 4) + 185 + 10, "URL : goo.gl/9kzuhy", { fontSize: "12px", fill: "#5B3B00" });
    textCredit.anchor.set(0.5);
    mute = game.add.button(300,20,'mute',muteSounds,this);
    mute.scale.setTo(0.08,0.08);
    if(isSound)
    	mute.frame = 0;
    else
    	mute.frame = 1;
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}
function createResult(){
    bg = game.add.image(0,0,'bgGame');
    bg.scale.setTo(0.17,0.18);
    logo = game.add.image(game.world.width/2,game.world.height*(1/4),'gameover');
    logo.anchor.set(0.5);
    logo.scale.setTo(0.1);
    text = game.add.text(game.world.width/2+50,game.world.height*(1.25/4),"Score : "+score,{fontSize : "20px",fill : "#5B3B00"});
    gameBGM.stop();
    bossBGM.stop();
    resultBGM.loopFull();
    text.anchor.set(0.5);
    text = game.add.text(game.world.width/2+50,game.world.height*(1/4),""+causeOfDeath,{fontSize : "20px",fill : "#5B3B00"});
    text.anchor.set(0.5);
    buttonPlayagain = game.add.button(game.world.width/2, game.world.height*(3/4), 'playagain', toGame, this);
    buttonPlayagain.scale.setTo(0.12);
    buttonPlayagain.anchor.set(0.5);
    buttonScore = game.add.button(game.world.width/2, game.world.height*(3.22/4),'scoreboard',toScoreboard,this)
    buttonScore.scale.setTo(0.12);
    buttonScore.anchor.set(0.5);
    buttonReport = game.add.button(game.world.width/2, game.world.height*(3.44/4), 'report', toReport, this);
    buttonReport.scale.setTo(0.12);
    buttonReport.anchor.set(0.5);
    buttonMenu = game.add.button(game.world.width/2, game.world.height*(3.66/4), 'menu', toMenu, this);
    buttonMenu.scale.setTo(0.12);
    buttonMenu.anchor.set(0.5);
    mute = game.add.button(300,20,'mute',muteSounds,this);
    mute.scale.setTo(0.08,0.08);
    if(isSound)
    	mute.frame = 0;
    else
    	mute.frame = 1;
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    setScore();
}
function updateResult(){
    if(fireButton.isDown)
        game.state.start('gamePlay');
}

function toSubmit(){
    clickSound.play();
    game.state.start('gamePlay');
}
function toGame(){
    clickSound.play();
    game.state.start('gamePlay');
}
function toHowToPlay(){
    clickSound.play();
    game.state.start('howtoPlay');
}
function toMenu() {
    clickSound.play();
    resultBGM.stop();
  	game.state.start('menu');
}
function toReport() {
    clickSound.play();
	isFirstSubmit = true;
    game.state.start('report');
}
function toScoreboard() {
    clickSound.play();
    window.open("ranking-sals.html");
}
function toCredit() {
    clickSound.play();
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
function sendReportMessage(report) {
    var rndText = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
        rndText += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    var rnd = game.rnd.integerInRange(0, 1000000) + rndText + (new Date()).getTime();
    var dbEtkReport = firebase.database().ref().child("report-sals");
    var sals = dbEtkReport.child(rnd);
    sals.update({
        'message': report
    });
}