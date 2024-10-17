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

// Initialize Item Counts and Prices
let itemACount: number = 0;
let itemBCount: number = 0;
let itemCCount: number = 0;

let itemAPrice: number = 10;
let itemBPrice: number = 100;
let itemCPrice: number = 1000;

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

// Helper function to create an upgrade button with dynamic pricing
const createUpgradeButton = (name: string, basePrice: number, rate: number, itemType: string) => {
  let currentPrice = basePrice;
  const button = document.createElement("button");
  button.className = `${name.toLowerCase()}-button`;
  button.textContent = `Buy ${name} (+${rate} cookies/sec) - ${currentPrice.toFixed(2)} 🍔`;
  button.disabled = true;

  button.addEventListener("click", () => {
    if (counter >= currentPrice) {
      counter -= currentPrice;
      growthRate += rate;

      // Update the correct item count and price based on itemType
      if (itemType === "A") {
        itemACount++;
        currentPrice = itemAPrice *= 1.15; // Increase price by 1.15x
      } else if (itemType === "B") {
        itemBCount++;
        currentPrice = itemBPrice *= 1.15; // Increase price by 1.15x
      } else if (itemType === "C") {
        itemCCount++;
        currentPrice = itemCPrice *= 1.15; // Increase price by 1.15x
      }

      button.textContent = `Buy ${name} (+${rate} cookies/sec) - ${currentPrice.toFixed(2)} 🍔`;

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
const upgradeButtonA = createUpgradeButton("A", itemAPrice, 0.1, "A");
const upgradeButtonB = createUpgradeButton("B", itemBPrice, 2.0, "B");
const upgradeButtonC = createUpgradeButton("C", itemCPrice, 50.0, "C");

// Check if Upgrade Buttons Should Be Enabled
const checkUpgradeButtons = () => {
  upgradeButtonA.disabled = counter < itemAPrice;
  upgradeButtonB.disabled = counter < itemBPrice;
  upgradeButtonC.disabled = counter < itemCPrice;
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
