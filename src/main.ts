import "./style.css";

// Set up the game
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Burger Monsters";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Initialize the Counter and Growth Rate
let counter: number = 0;
let growthRate: number = 0;

// Interface for the upgrade items
interface Item {
  name: string;
  basePrice: number;
  rate: number;
  count: number;
  price: number;
  displayText: string;
}

// Initialize available items
const availableItems: Item[] = [
  { name: "A", basePrice: 10, rate: 0.1, count: 0, price: 10, displayText: "Hire a Burger Chef" },
  { name: "B", basePrice: 100, rate: 2.0, count: 0, price: 100, displayText: "Plant a Burger Tree" },
  { name: "C", basePrice: 1000, rate: 50.0, count: 0, price: 1000, displayText: "Make a Burger INC" }
];

// Create a display for the counter, growth rate, and item counts
const counterDisplay = document.createElement("div");
counterDisplay.classList.add("counter-display");
const growthRateDisplay = document.createElement("div");
const itemCountDisplay = document.createElement("div");

counterDisplay.textContent = "0";
growthRateDisplay.textContent = "0 burgers/sec";
itemCountDisplay.textContent = "A: 0, B: 0, C: 0";

app.append(counterDisplay, growthRateDisplay, itemCountDisplay);

// Update display functions
const updateCounterDisplay = () => {
  counterDisplay.textContent = `${counter.toFixed(2)}`;
};

const updateGrowthRateDisplay = () => {
  growthRateDisplay.textContent = `${growthRate.toFixed(1)} burgers/sec`;
};

const updateItemCountDisplay = () => {
  itemCountDisplay.textContent = availableItems
    .map(item => `${item.name}: ${item.count}`)
    .join(", ");
};

// Create Upgrade Buttons
const createUpgradeButtons = () => {
  availableItems.forEach(item => {
    const button = document.createElement("button");
    button.className = `${item.name.toLowerCase()}-button upgrade-button`;
    button.textContent = `${item.displayText} (+${item.rate} burgers/sec) - ${item.price.toFixed(2)} 🍔`;
    button.disabled = true;

    button.addEventListener("click", () => {
      if (counter >= item.price) {
        counter -= item.price;
        growthRate += item.rate;

        item.count++;
        item.price = item.basePrice * Math.pow(1.15, item.count); // Price increases by 1.15x

        button.textContent = `${item.displayText} (+${item.rate} burgers/sec) - ${item.price.toFixed(2)} 🍔`;

        updateCounterDisplay();
        updateGrowthRateDisplay();
        updateItemCountDisplay();
        checkUpgradeButtons();
      }
    });

    app.append(button);
  });
};

// Check if buttons should be enabled based on counter value
const checkUpgradeButtons = () => {
  availableItems.forEach(item => {
    const button = document.querySelector(`.${item.name.toLowerCase()}-button`) as HTMLButtonElement;
    button.disabled = counter < item.price;
  });
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

// Initialize upgrade buttons
createUpgradeButtons();
