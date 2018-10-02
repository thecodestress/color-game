// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// Coded by Mackenzi McGuigan
// Based on project from The Web Developer Bootcamp on Udemy created by Colt Steele (Highly recommended)
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


// +-+-+-+-+
// variables
// +-+-+-+-+

var gridBackground = "#232323";
var headerBackground = "steelblue";
var numberOfSquares = 6; // default number of squares
var colorDisplay = document.querySelector("#colorDisplay");
var outcomeDisplay = document.querySelector("#outcome");
var resetButton = document.querySelector("#reset");
var hardButton = document.querySelector("#hard");
var easyButton = document.querySelector("#easy");
var header = document.querySelector("h1");
var squares; // holds the squares that are generated on the page
var colors; //  holds the color options
var targetColor; // holds the correct color


// +-+-+-+-+-+-+-+
// initialize app
// +-+-+-+-+-+-+-+

initApp(numberOfSquares);


// +-+-+-+-+-+-+-+
// event listeners
// +-+-+-+-+-+-+-+

hardButton.addEventListener("click", function (){
	if (!this.classList.contains("selected")) {
		this.classList.add("selected");
		easyButton.classList.remove("selected");
		changeMode(true);
	}
});

easyButton.addEventListener("click", function () {
	if (!this.classList.contains("selected")) {
		this.classList.add("selected");
		hardButton.classList.remove("selected");
		changeMode(false);
	}
});

resetButton.addEventListener("click", function (){ resetApp(numberOfSquares); });


// +-+-+-+-+
// functions
// +-+-+-+-+

// create squares divs inside of grid
function createSquares(integer) {
	var squares = ""
	for (var i = 0; i < integer; i++){
		squares += "<div class=\"square\"></div>";
	}
	document.querySelector(".grid").innerHTML = squares;
}

// pick a random integer value in range [0, integer)
function random(integer) { return Math.floor(Math.random() * integer); }

// generates random rgb color string
function generateColor() {
	var r = random(256), g = random(256), b = random(256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

// creates the array of colors
function createColorsArray(integer) {
	var colors = [];
	for (var i = 0; i < integer; i++) {
		colors.push(generateColor());
	}
	return colors;
}

// get new colors to pick from and select target color
function getNewColors (integer) {
	colors = createColorsArray(integer);
	targetColor = colors[random(colors.length)];
	colorDisplay.textContent = targetColor.toUpperCase();
}

// set color of squares and add selection logic
function setSquareColors (){
	squares = document.querySelectorAll(".square");
	for (var i = 0; i < squares.length; i++){
		// add colors to squares
		squares[i].style.backgroundColor = colors[i];

		// add event listeners
		squares[i].addEventListener("click", function (){
			if (this.style.backgroundColor === targetColor) {
				// square color is the target color, player wins
				outcomeDisplay.textContent = "Correct!";
				winnerEffect();
				resetButton.textContent = "Play Again?";
			} else {
				// square color is not the target, square disappears
				outcomeDisplay.textContent = "Try Again";
				this.style.backgroundColor = gridBackground;
			}
		})
	}
}

// change color of all squares and the header to the target color to show winner
function winnerEffect () {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = targetColor;
	}
	header.style.backgroundColor = targetColor;
}

// initialize application
function initApp (integer) {
	createSquares(integer);
	getNewColors(integer)
	setSquareColors();
}

// reset application
function resetApp (integer) {
	getNewColors(integer);
	setSquareColors();
	header.style.backgroundColor = headerBackground; // reset header background color
	outcomeDisplay.textContent = ""; // reset outcome text to blank
	resetButton.textContent = "New Colors"; // change reset button text back
}

// change Mode: easy (3 squares) or hard (6 squares)
function changeMode(hardMode) {
	hardMode ? numberOfSquares = 6 : numberOfSquares = 3;
	initApp(numberOfSquares);
	header.style.backgroundColor = headerBackground;
	outcomeDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}