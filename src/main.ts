import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazi game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button element
const button: HTMLButtonElement = document.createElement("button");
// Append button to the DOM
app.append(button);

// Create a div element for the counter
const counterDisplay = document.createElement("div");
counterDisplay.textContent = "0 🍔"; // Initial counter display
app.append(counterDisplay); // Append the counter to the app div

// Initialize counter variable
let counter: number = 0;

// Function to update the counter display
const updateCounterDisplay = () => {
  counterDisplay.textContent = `${counter.toFixed(2)} 🍔`;
};

// Event listener for button to increase the counter
button.addEventListener("click", () => {
  counter++; // Increase counter by 1
  updateCounterDisplay(); // Update counter display with unit label
});

// Track the previous timestamp for calculating elapsed time
let lastTimestamp: number = performance.now();

// Function to handle the animation frame updates
const animateCounter = (timestamp: number) => {
  // Calculate elapsed time in seconds
  const elapsed = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Increase counter based on elapsed time (1 unit per second)
  counter += elapsed;
  updateCounterDisplay();

  // Request the next animation frame
  requestAnimationFrame(animateCounter);
};

// Start the animation by requesting the first frame
requestAnimationFrame(animateCounter);
