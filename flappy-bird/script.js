const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

var fly = new Audio();
var score_audio = new Audio();

bird.src = './img/shymonface.png';
bg.src = './img/bg.png';
fg.src = './img/fg.png';
pipeUp.src = './img/pipeUp.png';
pipeBottom.src = './img/pipeBottom.png';

fly.src = './audio/fly.mp3';
score_audio.src = './audio/score.mp3';

const gap = 150;
const grav = 1.5;
let xPos = 10;
let yPos = 150;
let score = 0;

document.addEventListener('keydown', moveUp);

function moveUp() {
	yPos -= 30;
}

const pipe = [];
pipe[0] = {
	x: canvas.width,
	y: 0,
};

function draw() {
	context.drawImage(bg, 0, 0);

	for (let i = 0; i < pipe.length; i++) {
		context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if (pipe[i].x == 125) {
			pipe.push({
				x: canvas.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
			});
		}

		if (
			(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
			yPos + bird.height >= canvas.height - fg.height
		) {
			location.reload();
		}

		if (pipe[i].x == 5) {
			score++;
			score_audio.play();
		}
	}

	context.drawImage(fg, 0, canvas.height - fg.height);
	context.drawImage(bird, xPos, yPos);

	yPos += grav;

	context.fillStyle = '#000';
	context.font = '24px Verdana';
	context.fillText(`🍌Score: ${score}`, 10, canvas.height - 20);

	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
