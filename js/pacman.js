var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platformblue.png');
    game.load.image('wall', 'assets/bluesquare.jpg');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/pacman.png', 32, 32);
    game.load.spritesheet('blueghost', 'assets/blueghost.png', 32, 32);

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    // game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(424, game.world.height - 16, 'ground');
    ground.scale.setTo(11.75, .5);
    ground.body.immovable = true;

    ground = platforms.create(0, game.world.height - 16, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(11.75, .5);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;


    //THIS IS THE ROOF:
    ground = platforms.create(0, game.world.height - 600, 'ground');
    ground.scale.setTo(11.75, .5);
    ground.body.immovable = true;

    ground = platforms.create(424, game.world.height - 600, 'ground');
    ground.scale.setTo(11.75, .5);
    ground.body.immovable = true;


    //THIS IS THE RIGHT BORDER WALL:

    var ledge = platforms.create(784, 16, 'ground');
    ledge.scale.setTo(.5, 8.5);
    ledge.body.immovable = true;

    ledge = platforms.create(784, 330, 'ground');
    ledge.scale.setTo(.5, 8,5);
    ledge.body.immovable = true;




    //THIS IS THE LEFT BORDER WALL:

    ledge = platforms.create(0, 16, 'ground');
    ledge.scale.setTo(.5, 8.5);
    ledge.body.immovable = true;

    ledge = platforms.create(0, 330, 'ground');
    ledge.scale.setTo(.5, 8.5);
    ledge.body.immovable = true;


    //FIRST INSIDE WALL LEFT AND RIGHT:

    ledge = platforms.create(48, 48, 'ground');
    ledge.scale.setTo(.5, 15.75);
    ledge.body.immovable = true;

    ledge = platforms.create(736, 48, 'ground');
    ledge.scale.setTo(.5, 15.75);
    ledge.body.immovable = true;

    //FIRST INSIDE WALLS UP AND DOWN:

    //Top Walls From left to right

    // First
    ledge = platforms.create(63, 48, 'ground');
    ledge.scale.setTo(4, .5);
    ledge.body.immovable = true;

    //Second

    ledge = platforms.create(232, 48, 'ground');
    ledge.scale.setTo(4.5, .5);
    ledge.body.immovable = true;

    //Third

    ledge = platforms.create(424, 48, 'ground');
    ledge.scale.setTo(4.5, .5);
    ledge.body.immovable = true;

    //Fourth

    ledge = platforms.create(608, 48, 'ground');
    ledge.scale.setTo(4, .5);
    ledge.body.immovable = true;

    //BOTTOM LINES from left

    // First
    ledge = platforms.create(63, 536, 'ground');
    ledge.scale.setTo(4, .5);
    ledge.body.immovable = true;

    //Second

    ledge = platforms.create(232, 536, 'ground');
    ledge.scale.setTo(4.5, .5);
    ledge.body.immovable = true;

    //Third

    ledge = platforms.create(424, 536, 'ground');
    ledge.scale.setTo(4.5, .5);
    ledge.body.immovable = true;

    //Fourth

    ledge = platforms.create(608, 536, 'ground');
    ledge.scale.setTo(4, .5);
    ledge.body.immovable = true;


    //Second inside lines. 

    //BOTTOM

    // bottom 3rd line up from bottom

    ledge = platforms.create(100, 485, 'ground');
    ledge.scale.setTo(18.75, .5);
    ledge.body.immovable = true;

    //Top 3rd line down

    ledge = platforms.create(100, 100, 'ground');
    ledge.scale.setTo(18.75, .5);
    ledge.body.immovable = true;

    //bottom 4th line LEFT

    ledge = platforms.create(100, 430, 'ground');
    ledge.scale.setTo(5, .5);
    ledge.body.immovable = true;

    //bottom 4th line RIGHT

    ledge = platforms.create(540, 430, 'ground');
    ledge.scale.setTo(5, .5);
    ledge.body.immovable = true;

    //top 4th line LEFT

    ledge = platforms.create(100, 155, 'ground');
    ledge.scale.setTo(5, .5);
    ledge.body.immovable = true;

    //top 4th line RIGHT

    ledge = platforms.create(540, 155, 'ground');
    ledge.scale.setTo(5, .5);
    ledge.body.immovable = true;


    //THIRD LEFT SIDE LINES
    //TOP
    ledge = platforms.create(100, 171, 'ground');
    ledge.scale.setTo(.5, 3.4);
    ledge.body.immovable = true;

    //BOTTOM

    ledge = platforms.create(100, 322, 'ground');
    ledge.scale.setTo(.5, 3.4);
    ledge.body.immovable = true;

    //THIRD RIGHT HAND SIDE LINES
    //TOP
    ledge = platforms.create(684, 171, 'ground');
    ledge.scale.setTo(.5, 3.4);
    ledge.body.immovable = true;

    //BOTTOM
    ledge = platforms.create(684, 322, 'ground');
    ledge.scale.setTo(.5, 3.4);
    ledge.body.immovable = true;


    //  Now let's create two ledges
    // ledge = platforms.create(100, 171, 'ground');
    // ledge.scale.setTo(.1, 5);
    // ledge.body.immovable = true;

    // ledge = platforms.create(700, 100, 'ground');
    // ledge.scale.setTo(.1, 10);
    // ledge.body.immovable = true;




// ************PLAYER**************


    // // The player and its settings
    // player = game.add.sprite(100, game.world.height - 150, 'dude');
    // player.anchor.setTo(0.5, 0.5);

    // //  We need to enable physics on the player
    // game.physics.arcade.enable(player);

    // //  Player physics properties. Give the little guy a slight bounce.
    // // player.body.bounce.y = 0.2;
    // // player.body.gravity.y = 300;
    // player.body.collideWorldBounds = true;

    // //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2], 10, true);
    // player.animations.add('right', [0, 1, 2], 10, true);
    // player.animations.add('up', [0, 1, 2], 10, true);
    // player.animations.add('down', [0, 1, 2], 10, true);


    //********GHOSTS******

    ghost = game.add.sprite(100, game.world.height - 150, 'blueghost');
    ghost.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(ghost);
    ghost.body.collideWorldBounds = true;

    ghost.animations.add('left', [4, 5], 10, true);
    ghost.animations.add('right', [6, 7], 10, true);
    ghost.animations.add('up', [0, 1], 10, true);
    ghost.animations.add('down', [2, 3], 10, true);



    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 12; i++)
    // {
    //     //  Create a star inside of the 'stars' group
    //     var star = stars.create(i * 70, 100, 'star');

    //     //  Let gravity do its thing
    //     star.body.gravity.y = 300;

    //     //  This just gives each star a slightly random bounce value
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }

    //  The score
    scoreText = game.add.text(816, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    // //  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(player, platforms);
    // game.physics.arcade.collide(stars, platforms);

    // //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // game.physics.arcade.overlap(player, stars, collectStar, null, this);

    // //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;
    // player.body.velocity.y = 0;

    // if (cursors.left.isDown)
    // {
    //     //  Move to the left
    //     player.body.velocity.x = -150;

    //     player.animations.play('left');
    //     player.angle = 180;
    // }
    // else if (cursors.right.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.x = 150;

    //     player.animations.play('right');
    //     player.angle = 0;
    // }
    // else if (cursors.up.isDown)
    // {
    //     //  Move up.
    //     player.body.velocity.y = -150;

    //     player.animations.play('up');
    //     player.angle = 270;
    // }
    // else if (cursors.down.isDown)
    // {
    //     //  Move down
    //     player.body.velocity.y = 150;

    //     player.animations.play('down');
    //     player.angle = 90;
    // }
    // else
    // {
    //     //  Stand still
    //     player.animations.stop();

    //     player.frame = 4;
    // }
    


    //**********GHOSTS*******************


        game.physics.arcade.collide(ghost, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the ghost overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(ghost, stars, collectStar, null, this);

    //  Reset the ghosts velocity (movement)
    ghost.body.velocity.x = 0;
    ghost.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        ghost.body.velocity.x = -150;

        ghost.animations.play('left');
        ghost.angle = 0;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        ghost.body.velocity.x = 150;

        ghost.animations.play('right');
        ghost.angle = 0;
    }
    else if (cursors.up.isDown)
    {
        //  Move up.
        ghost.body.velocity.y = -150;

        ghost.animations.play('up');
        ghost.angle = 0;
    }
    else if (cursors.down.isDown)
    {
        //  Move down
        ghost.body.velocity.y = 150;

        ghost.animations.play('down');
        ghost.angle = 0;
    }
    else
    {
        //  Stand still
        ghost.animations.stop();

        ghost.frame = 4;
    }













    //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && player.body.touching.down)
    // {
    //     player.body.velocity.y = -350;
    // }

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;


}