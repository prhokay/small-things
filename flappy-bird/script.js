// Get the canvas element and its drawing context.
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Load image assets for the game: bird, background, foreground, and pipes.
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = './img/shymonface.png';
bg.src = './img/bg.png';
fg.src = './img/fg.png';
pipeUp.src = './img/pipeUp.png';
pipeBottom.src = './img/pipeBottom.png';

// Load audio assets for flying and scoring.
const fly = new Audio();
const scoreAudio = new Audio();

fly.src = './audio/fly.mp3';
scoreAudio.src = './audio/score.mp3';

// Define game constants and initial variables.
const gap = 150;       // Vertical gap between top and bottom pipes.
const gravity = 1.5;   // Gravity affecting the bird's downward movement.
let xPos = 10;         // Bird's horizontal position.
let yPos = 150;        // Bird's vertical position.
let score = 0;         // Player's score.
let gameOver = false;  // Flag to indicate whether the game is over.

// Array holding pipe objects, each with x and y properties.
const pipes = [];
pipes[0] = { x: canvas.width, y: 0 };

/**
 * moveUp - Moves the bird upward and plays the flying sound.
 */
function moveUp() {
    yPos -= 30;
    fly.play();
}

/**
 * displayGameOverScreen - Displays the game over splash screen with final score and instructions.
 */
function displayGameOverScreen() {
    // Draw a semi-transparent black overlay.
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties and alignment.
    context.fillStyle = "#FFF";
    context.font = "36px Verdana";
    context.textAlign = "center";
    
    // Display "Game Over" message.
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);
    // Display the final score.
    context.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    
    // Display instruction to restart the game.
    context.font = "24px Verdana";
    context.fillText("Press R to try again", canvas.width / 2, canvas.height / 2 + 60);
}

/**
 * keyHandler - Handles keydown events.
 * If the game is over and the physical key for "R" is pressed (KeyR),
 * then reloads the game. Otherwise, moves the bird upward.
 * @param {KeyboardEvent} e - The keyboard event.
 */
function keyHandler(e) {
    if (gameOver) {
        // Check the physical key code (KeyR) regardless of keyboard layout.
        if (e.code === 'KeyR') {
            location.reload();
        }
    } else {
        moveUp();
    }
}

// Listen for keydown events.
document.addEventListener('keydown', keyHandler);

/**
 * draw - The main game loop function that updates the state and renders objects on the canvas.
 */
function draw() {
    // Draw the background image.
    context.drawImage(bg, 0, 0);
    
    // Loop through each pipe and draw it.
    for (let i = 0; i < pipes.length; i++) {
        const currentPipe = pipes[i];
        
        // Draw the upper and lower pipes.
        context.drawImage(pipeUp, currentPipe.x, currentPipe.y);
        context.drawImage(pipeBottom, currentPipe.x, currentPipe.y + pipeUp.height + gap);
        
        // Move the pipe leftward.
        currentPipe.x--;
        
        // When a pipe reaches position 125, add a new pipe.
        if (currentPipe.x === 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        
        // Collision detection:
        // Check if the bird collides with pipes or the ground.
        if (
            (xPos + bird.width >= currentPipe.x &&
             xPos <= currentPipe.x + pipeUp.width &&
             (yPos <= currentPipe.y + pipeUp.height ||
              yPos + bird.height >= currentPipe.y + pipeUp.height + gap))
            ||
            (yPos + bird.height >= canvas.height - fg.height)
        ) {
            // Set gameOver flag, display the game over screen, and stop further updates.
            gameOver = true;
            displayGameOverScreen();
            return; // Exit the draw function to stop the game loop.
        }
        
        // Increase the score when the pipe passes a specific point.
        if (currentPipe.x === 5) {
            score++;
            scoreAudio.play();
        }
    }
    
    // Draw the foreground and the bird.
    context.drawImage(fg, 0, canvas.height - fg.height);
    context.drawImage(bird, xPos, yPos);
    
    // Apply gravity to the bird.
    yPos += gravity;
    
    // Display the score on the canvas.
    context.fillStyle = '#000';
    context.font = '24px Verdana';
    context.textAlign = 'left';
    context.fillText(`🍌Score: ${score}`, 10, canvas.height - 20);
    
    // Continue the game loop.
    requestAnimationFrame(draw);
}

// Start the game loop once the pipeBottom image has loaded.
pipeBottom.onload = draw;
