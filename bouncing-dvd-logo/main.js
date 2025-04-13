// Get references to the section and logo elements
const section = document.querySelector('section');
const logo = document.querySelector('.logo');

// Set the section size to match the current window size
section.style.height = `${window.innerHeight}px`;
section.style.width = `${window.innerWidth}px`;

// Initial logo position
let xPos = 10;
let yPos = 10;

// Movement speed in x and y directions
let xSpeed = 3;
let ySpeed = 3;

// Function to generate a random HEX color
const randomColor = () => {
	let color = '#';
	color += Math.random().toString(16).slice(2, 8).toUpperCase();
	return color;
};

// Animation update loop
const update = () => {
	// Bounce off left or right edges
	if (xPos + logo.clientWidth >= window.innerWidth || xPos <= 0) {
		xSpeed = -xSpeed; // reverse horizontal direction
		logo.style.fill = randomColor(); // change color on bounce
	}

	// Bounce off top or bottom edges
	if (yPos + logo.clientHeight >= window.innerHeight || yPos <= 0) {
		ySpeed = -ySpeed; // reverse vertical direction
		logo.style.fill = randomColor(); // change color on bounce
	}

	// Update position
	xPos += xSpeed;
	yPos += ySpeed;

	// Apply new position to the logo element
	logo.style.left = `${xPos}px`;
	logo.style.top = `${yPos}px`;

	// Schedule the next frame
	window.requestAnimationFrame(update);
};

// Start the animation
window.requestAnimationFrame(update);

// When the window is resized, reset the section size and logo position
window.addEventListener('resize', () => {
	xPos = 10;
	yPos = 10;

	section.style.height = `${window.innerHeight}px`;
	section.style.width = `${window.innerWidth}px`;
});
