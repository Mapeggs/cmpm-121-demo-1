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

// Initialize Item Counts
let itemACount: number = 0;
let itemBCount: number = 0;
let itemCCount: number = 0;

// Create a display for the counter and growth rate
const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");
const itemCountDisplay = document.createElement("div");

counterDisplay.textContent = "0 🍔";
growthRateDisplay.textContent = "0 cookies/sec";
itemCountDisplay.textContent = "A: 0, B: 0, C: 0";

app.append(counterDisplay, growthRateDisplay, itemCountDisplay);

// The Counter Display Function
const updateCounterDisplay = () => {
  counterDisplay.textContent = `${counter.toFixed(2)} 🍔`;
};

const updateGrowthRateDisplay = () => {
  growthRateDisplay.textContent = `${growthRate.toFixed(1)} cookies/sec`;
};

const updateItemCountDisplay = () => {
  itemCountDisplay.textContent = `A: ${itemACount}, B: ${itemBCount}, C: ${itemCCount}`;
};

// Helper function to create an upgrade button
const createUpgradeButton = (name: string, cost: number, rate: number, itemType: string) => {
  const button = document.createElement("button");
  button.className = `${name.toLowerCase()}-button`;
  button.textContent = `Buy ${name} (+${rate} cookies/sec) - ${cost} 🍔`;
  button.disabled = true;

  button.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost;
      growthRate += rate;

      // Increment the correct item count based on itemType
      if (itemType === "A") {
        itemACount++;
      } else if (itemType === "B") {
        itemBCount++;
      } else if (itemType === "C") {
        itemCCount++;
      }

      updateCounterDisplay();
      updateGrowthRateDisplay();
      updateItemCountDisplay();
      checkUpgradeButtons();
    }
  });

  app.append(button);
  return button;
};

// Create Upgrade Buttons
const upgradeButtonA = createUpgradeButton("A", 10, 0.1, "A");
const upgradeButtonB = createUpgradeButton("B", 100, 2.0, "B");
const upgradeButtonC = createUpgradeButton("C", 1000, 50.0, "C");

// Check if Upgrade Buttons Should Be Enabled
const checkUpgradeButtons = () => {
  upgradeButtonA.disabled = counter < 10;
  upgradeButtonB.disabled = counter < 100;
  upgradeButtonC.disabled = counter < 1000;
};

// Main Button for Incrementing Counter
const mainButton: HTMLButtonElement = document.createElement("button");
mainButton.className = "main-button";
mainButton.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  checkUpgradeButtons();
});
app.append(mainButton);

// Animation Frame to Update Counter Based on Growth Rate
let lastTimestamp: number = performance.now();
const animateCounter = (timestamp: number) => {
  const elapsed = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  counter += growthRate * elapsed;
  updateCounterDisplay();
  checkUpgradeButtons();

  requestAnimationFrame(animateCounter);
};

// Start the Animation Loop
requestAnimationFrame(animateCounter);
