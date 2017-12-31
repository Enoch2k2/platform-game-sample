// setup canvas ctx globals
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const WIDTH = 800;
const HEIGHT = 600;
const TITLE_THEM = new Audio('../media/title.mp3');
const MENU_SELECT = new Audio('../media/menu_select.mp3');
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
// GAME OBJECTS

// start game
const gameWindow = new GameWindow(0, 0, WIDTH, HEIGHT);
const mainMenu = new MainMenu(125, 25, 550, 550, "Platform Game", "black", "white")
function start(){
    gameWindow.render();
    mainMenu.render();
    TITLE_THEM.play();
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
      }
    })
}