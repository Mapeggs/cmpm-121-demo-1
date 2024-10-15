import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazi game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Initialize the Counter and Growth Rate
let counter: number = 0;
let growthRate: number = 0;

// Create the Counter Display
const counterDisplay = document.createElement("div");
counterDisplay.textContent = "0 🍔";
app.append(counterDisplay);

// Update the Counter Display Function
const updateCounterDisplay = () => {
  counterDisplay.textContent = `${counter.toFixed(2)} 🍔`;
};

// create a button for incrementing counter
const mainButton: HTMLButtonElement = document.createElement("button");
mainButton.className = "main-button";
app.append(mainButton);

// eventlistener for letting button be able to click and increase the counter by 1
mainButton.addEventListener("click", () => {
  counter++; // Increase counter by 1
  updateCounterDisplay(); // Update display
  checkUpgradeButton(); // Check if upgrade button should be enabled
});

// upgrade button function to increase growth rate by 1 and is initially disbaled
const upgradeButton: HTMLButtonElement = document.createElement("button");
upgradeButton.className = "upgrade-button";
upgradeButton.textContent = "Buy Growth Rate (+1)";
upgradeButton.disabled = true; // Initially disabled
app.append(upgradeButton);

// upgrade button for click event
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; // Deduct 10 units from the counter
    growthRate += 1; // Increase growth rate by 1
    updateCounterDisplay(); // Update counter display
    checkUpgradeButton(); // Re-check if upgrade button should be enabled
  }
});

// Function to Enable/Disable Upgrade Button Based on Counter
const checkUpgradeButton = () => {
  upgradeButton.disabled = counter < 10;
};

// Track the Previous Timestamp for Elapsed Time
let lastTimestamp: number = performance.now();

// Function to Handle Animation Frame Updates Based on Growth Rate
const animateCounter = (timestamp: number) => {
  const elapsed = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Increase Counter Based on Growth Rate and Elapsed Time
  counter += growthRate * elapsed;
  updateCounterDisplay();

  // Check if Upgrade Button Should Be Enabled
  checkUpgradeButton();

  // Request the Next Animation Frame
  requestAnimationFrame(animateCounter);
};

// Start the Animation Loop
requestAnimationFrame(animateCounter);
