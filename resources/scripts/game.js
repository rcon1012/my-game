/**
 * Created by Ryan on 12/22/2015.
 */
const gameHeight = 360;
const gameWidth = 480;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game-canvas", { preload: preload, create: create, update: update, render: render });

function preload () {
    game.load.image('character', 'resources/img/character.png');
    game.load.image('rocket', 'resources/img/rocket.png');
}
var character;
var rockets
var wasd;
var jumpButton;
function create () {
    // create world/physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 300;

    // add character to game
    character = game.add.sprite(game.world.centerX, game.world.centerY, 'character');
    game.physics.enable(character, Phaser.Physics.ARCADE);
    character.body.collideWorldBounds = true;
    character.body.gravity.y = 1000;
    character.body.maxVelocity.y = 500;
    character.body.drag.x = 400;

    // add rockets
    rockets = game.add.physicsGroup(Phaser.Physics.ARCADE);
    rockets.create(game.world.centerX + 150, game.world.centerY + 150, "rocket");
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
}

function update() {
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
        character.body.acceleration.y = -500;
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

function render() {

}