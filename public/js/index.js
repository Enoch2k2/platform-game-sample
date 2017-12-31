// setup canvas ctx globals
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = 800;
const HEIGHT = 600;
const tile_height = 50;
const tile_width = 50;

// tile sources
const brickwall_1 = '../images/brickwall_1.jpg';
const grass_1 = '../images/grass_1.jpeg';
// stops playback and resets time
Audio.prototype.stop = function(){
    this.currentTime = 0;
    this.pause();
}


// game state tags
let MainMenuState = true;

// controls helpers
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const SPACE_BAR = 32;

const keysPressed = {left: false, right: false, up: false, down: false, space: false};

// setup window.requestAnimationFrame globals
const renderer = window.requestAnimationFrame;

// load game window
window.addEventListener('load', function(){
    start();
})

// BASE CLASSES
class GameWindow {
    constructor(x, y, width, height, color="black"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    render(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class MainMenu {
    constructor(x, y, width, height, title, color="white", textColor="black"){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.color = color;
        this.textColor = textColor;
        this.selectNew = true;
        MainMenuControls();
    }

    toggleNew(){
        this.selectNew = !this.selectNew;
    }

    render(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.textColor;
        ctx.font = '60px ariel'
        ctx.fillText(this.title, this.x + (this.width/2) - 180, this.y + 100, 400);
        ctx.font = '30px ariel'
        ctx.fillStyle = this.selectNew ? "green" : this.textColor;
        ctx.fillText('New Game', this.x + (this.width/2) - 70, this.y + (this.height/2) + 50, 300);
        ctx.fillStyle = !this.selectNew ? "green" : this.textColor;
        ctx.fillText('Load Game', this.x + (this.width/2) - 72, this.y + (this.height/2) + 100, 300);
        ctx.fillStyle = this.textColor;
        ctx.fillText('Press left arrow or right arrow to move, spacebar to jump or select', this.x + 45, this.y + (this.height/2) + 200, 500);
    }
}

class Tile {
    constructor(x, y, renderable, source, blockable){
        this.x = x;
        this.y = y;
        this.renderable = renderable;
        if(renderable){
            this.image = new Image();
            this.image.src = source;
            this.image.width = tile_width;
            this.image.height = tile_height;
        }
        this.blockable = blockable;
    }

    render(){
        if(this.renderable){
            ctx.drawImage(this.image, this.x, this.y);
        }
    }
}

class TileSet {
    constructor(tileArray){
        this.tileArray = tileArray;
    }

    render(){
        for(let i = 0; i < this.tileArray.length; i++){
            for(let j = 0; j < this.tileArray[i].length; j++){
                this.tileArray[i][j].render();
            }
        }
    }
}

class Level {
    constructor(layer_1, layer_2, layer_3){
        this.layer_1 = layer_1;
        this.layer_2 = layer_2;
        this.layer_3 = layer_3;
    }

    render(){
        this.layer_1.render();
        this.layer_2.render();
        this.layer_3.render();
    }
}

// GAME OBJECTS - music
const TITLE_THEME = new Audio('../media/title.mp3');

// GAME OBJECTS - sound
const MENU_SELECT = new Audio('../media/menu_select.mp3');
const SELECTED = new Audio('../media/selected.mp3');

// GAME OBJECTS - tiles - level 1
const level_1_background = []
const level_1_middle = []
const level_1_top = []

function fillTileSetsBottom(){
    var y = 0;
    for(let i = 0; i <= 600; i += tile_height){
        level_1_background.push([])
        for(let j = 0; j <= 800; j += tile_width){
            level_1_background[y].push(new Tile(j, i, true, grass_1, true));
        }
        y++;
    }
    return level_1_background;
}

function fillTileSetsMiddle(){
    var y = 0;
    for(let i = 0; i <= 600; i += tile_height){
        level_1_middle.push([]);
        for(let j = 0; j <= 800; j += tile_width){
            if(y <= 4){
                level_1_middle[y].push(new Tile(j, i, true, brickwall_1, false));
            } else {
                level_1_middle[y].push(new Tile(j, i, false, null, true));
            }
        }
        y++;
    }
}

fillTileSetsBottom();
fillTileSetsMiddle();
const level_1 = new Level(new TileSet(level_1_background), new TileSet(level_1_middle), new TileSet([]));

// start game
const gameWindow = new GameWindow(0, 0, WIDTH, HEIGHT);
const mainMenu = new MainMenu(125, 25, 550, 550, "Platform Game", "black", "white")
function start(){
    gameWindow.render();
    mainMenu.render();
    TITLE_THEME.play();
}

// event listeners
function gameControls(){
    document.addEventListener('keydown', function(e){
        switch(e.which){
            case LEFT_ARROW:
                keysPressed.left = true;
            case RIGHT_ARROW:
                keysPressed.right = true;
            case UP_ARROW:
                keysPressed.up = true;
            case DOWN_ARROW:
                keysPressed.down = true;
            case SPACE_BAR:
                keysPressed.space = true;
        }
    })
    
    document.addEventListener('keyup', function(e){
        switch(e.which){
            case LEFT_ARROW:
                keysPressed.left = false;
            case RIGHT_ARROW:
                keysPressed.right = false;
            case UP_ARROW:
                keysPressed.up = false;
            case DOWN_ARROW:
                keysPressed.down = false;
            case SPACE_BAR:
                keysPressed.space = false;
        }
    })
}

function MainMenuControls(){
    document.addEventListener('keydown',function(e){
      switch(e.which){
        case UP_ARROW:
            mainMenu.toggleNew()
            MENU_SELECT.play();
            gameWindow.render();
            mainMenu.render();
            break;
        case DOWN_ARROW:
            mainMenu.toggleNew()
            MENU_SELECT.play();
            gameWindow.render();
            mainMenu.render();
            break;
        case SPACE_BAR:
            SELECTED.play();
            TITLE_THEME.stop();
            level_1.render();
      }
    })
}

// loops TITLE_THEME
TITLE_THEME.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);