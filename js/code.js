var count = 0,end=0,time=0,life=3,score=0;
var result = false;
var maxscore=9999;
var game = new Phaser.Game(800, 600, Phaser.AUTO, "game");
var mainGame = {
	preload :  function() {
		game.load.image("bg","images/bg.png");
		game.load.spritesheet("player","images/brids.png",32,36);
	},
	create : function(){
		time=0;
		game.stage.backgroundColor = '#9933ff';
		game.add.sprite(0,0,"bg");
		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = game.add.sprite(50,50,"player");
		game.physics.arcade.enable(this.player);
		this.player.animations.add("move",[1,0],20,true);
		this.player.animations.add("move2",[1,0],10,true);
		this.player.frame = 0;
		this.cursors = this.input.keyboard.createCursorKeys();
	},
	update : function(){
		
		this.player.body.velocity.x=0;
		this.player.body.velocity.y=0;
		if(this.cursors.up.isDown){
			this.player.body.velocity.y = -300;
		}
		if(this.cursors.down.isDown){
			this.player.body.velocity.y = 300;
		}
		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -300;
		}
		if(this.cursors.right.isDown){
			this.player.body.velocity.x = 300;
		}
		
	},
};

game.state.add('GAME', mainGame);
game.state.start('GAME');
