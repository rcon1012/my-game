/**
 * Created by Ryan on 12/22/2015.
 */
const gameHeight = 360;
const gameWidth = 480;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "game-canvas", { preload: preload, create: create, update: update, render: render });

function preload () {
    game.load.image('character', 'resources/img/character.png');
}
var character;
var jumpTimer = 0;
var cursors;
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

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    // horizontal character friction
    character.body.velocity.x -= ;
    // character controls
    if (cursors.left.isDown)
    {
        character.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        character.body.velocity.x = 150;
    }

    if (cursors.up.isDown)
    {
        character.body.velocity.y = -50;
    }
    else if (cursors.down.isDown)
    {
        character.body.velocity.y = 50;
    }
    if(jumpButton.isDown && character.body.onFloor())
    {
        character.body.velocity.y = -500;
    }
}

function render() {

}