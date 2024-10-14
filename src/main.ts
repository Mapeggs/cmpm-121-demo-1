import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazi game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create a button element
const button: HTMLButtonElement = document.createElement("button");

// Create a div element for the counter
const counterDisplay = document.createElement("div");
counterDisplay.textContent = "0 🍔"; // Initial counter display
app.append(counterDisplay); // Append the counter to the app div

// Initialize counter variable
let counter: number = 0;

// Event listener for button to increase the counter
button.addEventListener("click", () => {
  counter++; // Increase counter by 1
  counterDisplay.textContent= `${counter} 🍔`; // Update counter display with unit label
});

// Append button to the DOM
app.append(button);
