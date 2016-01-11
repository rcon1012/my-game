/**
 * Created by Ryan on 12/22/2015.
 */
const GAME_HEIGHT = 480;
const GAME_WIDTH = 640;

const CHARACTER_WIDTH = 50;
const CHARACTER_HEIGHT = 100;
const PUNCH_WIDTH = 50;

const ROCKET_HEIGHT = 25;
const ROCKET_WIDTH = 172;
const NUM_ROCKETS = 10;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, "game-canvas", { preload: preload, create: create, update: update, render: render });

function preload () {
    game.load.image('character', 'resources/img/character.png');
    game.load.image('rocket', 'resources/img/rocket.png');
}
var character;
var fist;
var rockets;
var wasd;
var jumpButton;
var pauseKey;
var punchKey;
function create () {
    // create world/physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;

    // add character to game
    character = game.add.sprite(game.world.centerX/2, game.world.centerY/2, 'character');
    game.physics.enable(character, Phaser.Physics.ARCADE);
    // TODO: change collideWorldBounds to false
    character.body.collideWorldBounds = true;
    character.body.gravity.y = 500;
    character.body.maxVelocity.y = 500;
    character.body.drag.x = 400;
    // set anchor to top left of character
    character.anchor.setTo(0, 0);

    // add rockets
    rockets = game.add.physicsGroup(Phaser.Physics.ARCADE);
    // rocket character lands on
    rockets.create(game.world.centerX, game.world.centerY/2 + CHARACTER_HEIGHT + 230, "rocket");
    rockets.setAll("body.immovable", true);
    rockets.setAll("body.allowGravity", false);
    rockets.setAll("body.velocity.x", -100);



    // initialize controls
    wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    pauseKey.onDown.add(togglePause, game);
    punchKey = game.input.keyboard.addKey(Phaser.Keyboard.J);
    punchKey.onDown.add(punch, game);
}


function togglePause() {
    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
}

function punch() {
    // check if last punch is finished
    if(fist != null) {
        return;
    }
    // add character to game
    fist = game.add.sprite(character.x + CHARACTER_WIDTH, character.y, "character");
    character.addChild(fist);
    fist.x = CHARACTER_WIDTH;
    fist.y = 0;
    game.time.events.add(Phaser.Timer.SECOND, removePunch, this);
}

function removePunch() {
    fist.kill();
    fist = null;
}

function update() {
    // spawn rockets
    if(game.rnd.between(1, 200) % 200 == 0) {
        var rocketY = game.rnd.between(ROCKET_HEIGHT, GAME_HEIGHT - ROCKET_HEIGHT);
        rockets.create(game.world.width, rocketY, "rocket");
        rockets.setAll("body.immovable", true);
        rockets.setAll("body.allowGravity", false);
        rockets.setAll("body.velocity.x", -100);
    }

    fistRocketCollision();

    // collision with rockets
    var isColliding = game.physics.arcade.collide(character, rockets);
    character.body.acceleration.y = 0;
    // character controls
    if (wasd.left.isDown)
    {
        character.body.velocity.x = -300;

    }
    else if (wasd.right.isDown)
    {
        character.body.velocity.x = 300;
    }

    if (wasd.up.isDown && !character.body.onFloor())
    {
        character.body.acceleration.y = -400;
    }
    else if (wasd.down.isDown && !character.body.onFloor())
    {
        character.body.acceleration.y = 500;
    }
    if (jumpButton.isDown && (character.body.onFloor() || isColliding))
    {
        character.body.velocity.y = -500;
    }
}

function fistRocketCollision() {
    // null check fist
    if(fist == null) {
        return;
    }
    rockets.forEachAlive(function(rocket) {
        if(Phaser.Rectangle.intersects(fist.getBounds(), rocket.getBounds())) {
            rocket.kill();
        }
    }, this);
}

function render() {

}

function rocketCollisionHandler() {

}