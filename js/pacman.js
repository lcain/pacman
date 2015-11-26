var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platformblue.png');
    game.load.image('wall', 'assets/bluesquare.jpg');
    // game.load.image('star', 'assets/star.png');
    game.load.image('star', 'assets/dot.png');
    game.load.image('gameover', 'assets/gameover.png')
    game.load.spritesheet('dude', 'assets/pacman.png', 32, 32);
    game.load.spritesheet('blueghost', 'assets/blueghost.png', 32, 32);

}

var player;
var platforms;
var cursors;
var ghost;
var gameover;
var gameStarted = false;

var stars;
// var dots;
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
    ledge.scale.setTo(3.8, .5);
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

    ledge = platforms.create(615, 48, 'ground');
    ledge.scale.setTo(3.8, .5);
    ledge.body.immovable = true;

    //BOTTOM LINES from left

    // First
    ledge = platforms.create(63, 536, 'ground');
    ledge.scale.setTo(3.8, .5);
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

    ledge = platforms.create(615, 536, 'ground');
    ledge.scale.setTo(3.8, .5);
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

    //bottom 4th line MIDDLE

    ledge = platforms.create(305, 430, 'ground');
    ledge.scale.setTo(5.9, .5);
    ledge.body.immovable = true;

    //bottom 4th line RIGHT

    ledge = platforms.create(540, 430, 'ground');
    ledge.scale.setTo(5, .5);
    ledge.body.immovable = true;

    //top 4th line LEFT

    ledge = platforms.create(100, 155, 'ground');
    ledge.scale.setTo(5, .5);
    ledge.body.immovable = true;

    //top 4th line middle

    ledge = platforms.create(305, 155, 'ground');
    ledge.scale.setTo(5.9, .5);
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


    //FOURTH RIGHT HAND SIDE LINE
    
    ledge = platforms.create(625, 208, 'ground');
    ledge.scale.setTo(.5, 5.7);
    ledge.body.immovable = true;

    //FOURTH LEFT HAND SIDE LINE
    ledge = platforms.create(155, 208, 'ground');
    ledge.scale.setTo(.5, 5.7);
    ledge.body.immovable = true;

     //Top 5th line down

    ledge = platforms.create(215, 208, 'ground');
    ledge.scale.setTo(11.4, .5);
    ledge.body.immovable = true;

     //Bottom 5th line going up

    ledge = platforms.create(215, 374, 'ground');
    ledge.scale.setTo(11.4, .5);
    ledge.body.immovable = true;

    ////FIFTH LEFT HAND SIDE LINE
    ledge = platforms.create(215, 208, 'ground');
    ledge.scale.setTo(.5, 5.7);
    ledge.body.immovable = true;

     //GHOST BOX! TOP LINE
    
    ledge = platforms.create(300, 208, 'ground');
    ledge.scale.setTo(.5, 2.2);
    ledge.body.immovable = true;

    
    //GHOST BOX BTTOM LINE
    ledge = platforms.create(300, 320, 'ground');
    ledge.scale.setTo(.5, 1.7);
    ledge.body.immovable = true;
   

     //Top 6th line down

    ledge = platforms.create(356, 264, 'ground');
    ledge.scale.setTo(7, .5);
    ledge.body.immovable = true;

     //Bottom 6th line up

    ledge = platforms.create(356, 320, 'ground');
    ledge.scale.setTo(7, .5);
    ledge.body.immovable = true;

    //  Now let's create two ledges
    // ledge = platforms.create(100, 171, 'ground');
    // ledge.scale.setTo(.1, 5);
    // ledge.body.immovable = true;

    // ledge = platforms.create(700, 100, 'ground');
    // ledge.scale.setTo(.1, 10);
    // ledge.body.immovable = true;




// ************PLAYER**************


    // The player and its settings
    player = game.add.sprite(14, game.world.height - 292, 'dude');
    player.anchor.setTo(0.5, 0.5);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    // player.body.gravity.y = 300;
    player.body.collideWorldBounds = false;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2], 10, true);
    player.animations.add('right', [0, 1, 2], 10, true);
    player.animations.add('up', [0, 1, 2], 10, true);
    player.animations.add('down', [0, 1, 2], 10, true);


    //********GHOSTS******

    ghost = game.add.sprite(300, 300, 'blueghost');
    ghost.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(ghost);
    ghost.body.collideWorldBounds = true;
   

    ghost.animations.add('left', [4, 5], 10, true);
    ghost.animations.add('right', [6, 7], 10, true);
    ghost.animations.add('up', [0, 1], 10, true);
    ghost.animations.add('down', [2, 3], 10, true);



// ***********************STARS**************************

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

     // Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 21; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 37 + 30, 30, 'star');
        stars.create(i * 37 + 30, 565, 'star');

        //  Let gravity do its thing
        // star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        // star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    
    for (var i = 0; i < 16; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 38 + 117, 80, 'star');
        stars.create(i * 38 + 117, 135, 'star');
        stars.create(i * 38 + 117, 516, 'star');
        stars.create(i * 38 + 117, 465, 'star');
    }

    for (var i = 0; i < 14; i++){
        //  Create a star inside of the 'stars' group
        stars.create(i * 38 + 165, 187, 'star');
        stars.create(i * 38 + 165, 407, 'star');
    }

    for (var i = 0; i < 6; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 38 + 370, 240, 'star');
        stars.create(i * 38 + 370, 297, 'star');
        stars.create(i * 38 + 370, 353, 'star');
    }

    for (var i = 0; i < 13; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(30, i * 38 + 68, 'star');
        stars.create(770, i * 38 + 68, 'star');
    }

    for (var i = 0; i < 12; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(80, i * 39.6 + 80, 'star');
        stars.create(720, i * 39.6 + 80, 'star');
    }

    for (var i = 0; i < 7; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(135, i * 36.75 + 187, 'star');
    }
    for (var i = 0; i < 5; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(193, i * 36.75 + 223, 'star');
        stars.create(600, i * 36.75 + 223, 'star');
        stars.create(659, i * 36.75 + 223, 'star');
    }
    for (var i = 0; i < 4; i++){
        //  Create a star inside of the 'stars' group
        var star = stars.create(335, i * 37.5 + 240, 'star');
    }







    //  The score
    scoreText = game.add.text(816, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function test () {

    // var directions = [ "right", "left", "down", "up" ];
    // var randomIndex = Math.round( Math.random() * 3 );
    // var desiredDirection = directions[ randomIndex ];

    // ghost.body.velocity.x = 0;
    // ghost.body.velocity.y = 0;

    // var desiredVelocityX = 0;
    // var desiredVelocityY = 0;

    // if ( desiredDirection === "right" ) {
    //     desiredVelocityX = 150;
    // } else if ( desiredDirection === "left" ) {
    //     desiredVelocityX = -150;
    // } else if ( desiredDirection === "up" ) {
    //     desiredVelocityY = -150;
    // } else if ( desiredDirection === "down" ) {
    //     desiredVelocityY = 150;
    // }


    // console.log( ghost.body.velocity );

    // console.log( desiredVelocityX, desiredVelocityY );




    // if ( ghost.body.overlapX < 0 ) {
    //     ghost.body.velocity.x = 150;
    // }

    // if ( ghost.body.overlapX > 0 ) {
    //     ghost.body.velocity.x = -150;
    // }

    // // if ( ghost.body.overlapX === 0 && ghost.body.overlapY === 0 ) {
    // //     console.log(  )
    // // }


    // console.log( "lnlnaklna" );



    // debugger;


}

function update() {

    game.physics.arcade.collide(ghost, platforms);
    // game.physics.arcade.overlap(ghost, platforms, test, null, this);

    //  Checks to see if the ghost overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(ghost, player, killPac, null, this);


    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;


    //Lets player swap sides of the board

    if (player.position.x < 0) {
        player.position.x = 795;
    }

    if (player.position.x > 795) {
        player.position.x = 0;
    }

    if (player.position.y > 593) {
        player.position.y = 0;
    }

    if (player.position.y < 0) {
        player.position.y = 593;
    }

    //Pac's movement binds

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
        player.angle = 180;
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
        player.angle = 0;
    }
    else if (cursors.up.isDown)
    {
        //  Move up.
        player.body.velocity.y = -150;

        player.animations.play('up');
        player.angle = 270;
    }
    else if (cursors.down.isDown)
    {
        //  Move down
        player.body.velocity.y = 150;

        player.animations.play('down');
        player.angle = 90;
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        player.frame = 4;
    }
    


    //**********GHOSTS*******************

//     EnemyRed.prototype.update = function() {

//     if ( this.game.physics.arcade.distanceBetween( this.enemy, this.player ) < 100 && this.order !== 'attack' ) {
//         this.attack( this.player );
//     }

//     ...
    
//     else if ( this.order === 'attack' )
//     {
//         this.game.physics.arcade.velocityFromRotation( this.game.physics.arcade.angleBetween( this.enemy.body, this.player.body ), 100, this.enemy.body.velocity);
//     }

// }


    var ghostmove = function(){
        // If it hits on the top
            // Try left, try right, try down

        if ( ghost.body.wasTouching.up ) {
            var randomNum = Math.random();

            if ( randomNum <= 0.3333 ) {
                ghost.body.velocity.x = 150;
                ghost.body.velocity.y = 0;
            } else if ( randomNum <= 0.6666 ) {
                ghost.body.velocity.x = -150;
                ghost.body.velocity.y = 0;
            } else {
                ghost.body.velocity.x = 0;
                ghost.body.velocity.y = 150;
            }
        } else if ( ghost.body.wasTouching.down ) {
            var randomNum = Math.random();

            if ( randomNum <= 0.3333 ) {
                ghost.body.velocity.x = 150;
                ghost.body.velocity.y = 0;
            } else if ( randomNum <= 0.6666 ) {
                ghost.body.velocity.x = -150;
                ghost.body.velocity.y = 0;
            } else {
                ghost.body.velocity.x = 0;
                ghost.body.velocity.y = -150;
            }
        } else if ( ghost.body.wasTouching.left ) {
            var randomNum = Math.random();

            if ( randomNum <= 0.3333 ) {
                ghost.body.velocity.x = 150;
                ghost.body.velocity.y = 0;
            } else if ( randomNum <= 0.6666 ) {
                ghost.body.velocity.x = 0;
                ghost.body.velocity.y = 150;
            } else {
                ghost.body.velocity.x = 0;
                ghost.body.velocity.y = -150;
            }
        } else if ( ghost.body.wasTouching.right ) {
            var randomNum = Math.random();

            if ( randomNum <= 0.3333 ) {
                ghost.body.velocity.x = -150;
                ghost.body.velocity.y = 0;
            } else if ( randomNum <= 0.6666 ) {
                ghost.body.velocity.x = 0;
                ghost.body.velocity.y = 150;
            } else {
                ghost.body.velocity.x = 0;
                ghost.body.velocity.y = -150;
            }
        } else {

            if ( ghost.getBounds().x >= 260 && ghost.getBounds().x <= 270
                 && ghost.position.y >= 184 && ghost.position.y <= 194 ) {
                console.log( "Time to try going up" );
                var randomNum = Math.random();
                if ( randomNum < 0.5 ) {
                    ghost.body.velocity.x = 0;
                    ghost.body.velocity.y = -150;
                }
            }

            // ghost.body.velocity.y = -150;



        }






        // if ( ghost.body.wasTouching.left && ghost.body.wasTouching.right ) {
        //     debugger;
        // }

        // console.log(  )

        // if ( ghost.body.wasTouching.right ) {
        //     ghost.body.velocity.x = 0;
        //     ghost.body.velocity.y = -150;
        // } else if ( ghost.body.wasTouching.up ) {
        //     ghost.body.velocity.y = 0;
        //     ghost.body.velocity.x = 150;
        // } else if ( ghost.body.wasTouching.left ) {
        //     ghost.body.velocity.x = 0;
        //     ghost.body.velocity.y = 150;
        // } else if ( ghost.body.wasTouching.down ) {
        //     ghost.body.velocity.y = 150;
        //     ghost.body.velocity.x = 0;
        // }

        // console.log( "Ghost Moving" )

        // console.log( ghost.body.checkCollision )
        // if ( ghost.body.wasTouching.left ) {
        //     ghost.body.position.x += 1;
        // } else if ( ghost.body.wasTouching.down ) {
        //     ghost.body.position.y -= 1;
        // } else if ( ghost.body.wasTouching.up ) {
        //     ghost.body.position.y += 1;
        // } else if ( ghost.body.wasTouching.right ) {
        //     ghost.body.position.x -= 1;
        // }



        // console.log( "Ghost Move" );
   // Phaser.Math.snapTo

   // ******************UP AND STUCK*****************

    // if (ghost.body.velocity.x <= 0) {
        
    //     ghost.animations.play('right');
    //     ghost.body.velocity.x = 150;
    // }
    // else if (ghost.body.velocity.x >= 0){
        
    //     ghost.animations.play('up');
    //     ghost.body.velocity.y = -150;
    // }

    //*************************************************

    var directionArray = ["up", "left", "right", "down"];
    // var moveArray = [moveUp, moveLeft, moveRight, moveDown];

    // var moveRight = (ghost.body.velocity.x = 150);
    // var moveLeft = (ghost.body.velocity.x = -150);
    // var moveUp = (ghost.body.velocity.y = -150);
    // var moveDown = (ghost.body.velocity.y = 150);

    // if (ghost.body.velocity.x === 0) {
    //     console.log("called");
    //     var randomNum = parseInt(Math.random() * (1));
    //     ghost.animations.play(directionArray[randomNum]);
    //     moveArray[randomNum];
    // }

//******************SET PATH*******************

// if (ghost.body.velocity.x === 0){
//     ghost.body.velocity.x = 150;
//     ghost.body.velocity.y = 0;               
//     ghost.animations.play("right");

//     // console.log(ghost.body.position.x);
//     if (ghost.body.position.x === 593) {
//         ghost.body.velocity.y = 150;
//         ghost.body.velocity.x = 0;               
//         ghost.animations.play("down");
        
//         console.log(ghost.body.position.y);
//     } 

//     if (ghost.body.position.y === 398){
//         ghost.body.velocity.x = -150;
//         ghost.body.velocity.y = 0;              
//         ghost.animations.play("left");
//       console.log(ghost.body.position.y);

//     }
//        if (ghost.body.position.y === 398){
//         ghost.body.velocity.x = -150;
//         ghost.body.velocity.y = 0;              
//         ghost.animations.play("left");
//         console.log(ghost.body.position.x);

//         }
   
// }

//********************RANDOM*********************


    if (ghost.body.velocity.x === 0 && !gameStarted) {
        gameStarted = true;
        var randomNum = parseInt(Math.random() * (2));
        //console.log(randomNum);

        // if (ghost.body.wasTouching.top) {
        //     ghost.body.position.y += 2;
        // } else if (ghost.body.wasTouching.right) {
        //     ghost.body.position.x -= 2;
        // } else if (ghost.body.wasTouching.down) {
        //     ghost.body.position.y -= 2;
        // } else if (ghost.body.wasTouching.left) {
        //     ghost.body.position.x += 2;
        // }

        if (randomNum === 0) {
            randomNum = parseInt(Math.random() * (2));
            if (randomNum === 0 ) {
                ghost.body.velocity.x = 150;
                ghost.body.velocity.y = 0;               
                ghost.animations.play("right");
                // console.log('h right', randomNum);
                // console.log('touching', ghost.body.touching.up, ghost.body.touching.right, ghost.body.touching.down, ghost.body.touching.left)
                return;

            } else {
                ghost.body.velocity.x = -150;
                ghost.body.velocity.y = 0;              
                ghost.animations.play("left");
                // console.log('h left', randomNum);
                // console.log('touching', ghost.body.touching.up, ghost.body.touching.right, ghost.body.touching.down, ghost.body.touching.left)
                return;

            } 

        }   
        if (randomNum === 1) {
            randomNum = parseInt(Math.random() * (2));
            if (randomNum === 0 ) {
                ghost.body.velocity.y = 150;
                ghost.body.velocity.x = 0;               
                ghost.animations.play("down");
                // console.log('v down', randomNum);
                // console.log('touching', ghost.body.touching.up, ghost.body.touching.right, ghost.body.touching.down, ghost.body.touching.left)
                return;

            } else {
                ghost.body.velocity.y = -150;
                ghost.body.velocity.x = 0;               
                ghost.animations.play("up");
                // console.log('v up', randomNum);
                // console.log('touching', ghost.body.touching.up, ghost.body.touching.right, ghost.body.touching.down, ghost.body.touching.left)
                return;

            }
        }  
    }



//************************************************************


   // if(ghost.body.velocity.x === 0){
   //      ghost.body.velocity.x = -150;
   //  } else if (ghost.body.velocity.x >= 0){
   //      ghost.body.velocity.x = 150
   //  } else if (ghost.body.velocity.y <= 0){
   //      ghost.body.velocity.y = -150;
   //  } else if (ghost.body.velocity.y >= 0){
   //      ghost.body.velocity.y = 150
   //   } 
   //   else {
   //      ghost.body.velocity.x = 150;
   //  }   

    //     ghost.body.velocity.x || ghost.body.velocity.y = + 150 || - 150;
    // }




// if x < 0
//   vel.x = -150
// else if x > 0
//   vel.x = 150
// else if y < 0
//   vel.y = -150
// else if y > 0
//   vel.y = 150
// else (meaning he’s stopped)
//   vel x or y = +/- 150





    // else if (ghost.body.velocity.x >= 0){
        
    //     ghost.animations.play('up');
    //     ghost.body.velocity.y = -150;
    // }
    
    // else if (ghost.body.velocity.y <= 0){

    //     ghost.animations.play('down');
    //     ghost.body.velocity.y = 150;

    // }
   


    };

    ghostmove();

    //     game.physics.arcade.collide(ghost, platforms);
    // game.physics.arcade.collide(stars, platforms);

    // //  Checks to see if the ghost overlaps with any of the stars, if he does call the collectStar function
    // game.physics.arcade.overlap(ghost, stars, collectStar, null, this);

    // //  Reset the ghosts velocity (movement)
    // ghost.body.velocity.x = 0;
    // ghost.body.velocity.y = 0;

    // if (cursors.left.isDown)
    // {
    //     //  Move to the left
    //     ghost.body.velocity.x = -150;

    //     ghost.animations.play('left');
    //     ghost.angle = 0;
    // }
    // else if (cursors.right.isDown)
    // {
    //     //  Move to the right
    //     ghost.body.velocity.x = 150;

    //     ghost.animations.play('right');
    //     ghost.angle = 0;
    // }
    // else if (cursors.up.isDown)
    // {
    //     //  Move up.
    //     ghost.body.velocity.y = -150;

    //     ghost.animations.play('up');
    //     ghost.angle = 0;
    // }
    // else if (cursors.down.isDown)
    // {
    //     //  Move down
    //     ghost.body.velocity.y = 150;

    //     ghost.animations.play('down');
    //     ghost.angle = 0;
    // }
    // else
    // {
    //     //  Stand still
    //     ghost.animations.stop();

    //     ghost.frame = 4;
    // }













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

//Final Score is 2280
    if (score === 2280){
        console.log("Game Over!")

    gameover = game.add.sprite(220, 280, 'gameover');
    // this.image.anchor.setTo(0.5, 0.5);
    var scaleX = 5;
    var scaleY = 5;    
    gameover.scale.set(scaleX , scaleY );
    }


}

function killPac (ghost, player) {

    if (player.kill()){
        gameover = game.add.sprite(220, 280, 'gameover');
        // this.image.anchor.setTo(0.5, 0.5);
        var scaleX = 5;
        var scaleY = 5;    
        gameover.scale.set(scaleX , scaleY );

    }

}