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

// Constants to control growth behavior
const baseSize = 130; // Starting size of the button in pixels
const growthFactor = 0.05; // Percentage increase per unit of counter
const maxSize = 300; // Maximum size in pixels

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
  {
    name: "Hires",
    basePrice: 10,
    rate: 0.1,
    count: 0,
    price: 10,
    displayText: "Hire a Burger Chef",
  },
  {
    name: "Trees",
    basePrice: 100,
    rate: 2.0,
    count: 0,
    price: 100,
    displayText: "Plant a Burger Tree",
  },
  {
    name: "Companies",
    basePrice: 1000,
    rate: 50.0,
    count: 0,
    price: 1000,
    displayText: "Make a Burger INC",
  },
  {
    name: "Factories",
    basePrice: 5000,
    rate: 200.0,
    count: 0,
    price: 5000,
    displayText: "Open a Burger Factory",
  },
  {
    name: "Empires",
    basePrice: 10000,
    rate: 1000.0,
    count: 0,
    price: 10000,
    displayText: "Start a Burger Empire",
  },
];

// Create a display for the counter, growth rate, and item counts
const counterDisplay = document.createElement("div");
counterDisplay.classList.add("counter-display");
const growthRateDisplay = document.createElement("div");
growthRateDisplay.classList.add("growth-rate-display");
const itemCountDisplay = document.createElement("div");

counterDisplay.textContent = `🍔 0`;
growthRateDisplay.textContent = `⏱️ 0 burgers/sec`;
itemCountDisplay.textContent =
  "👨‍🍳 Hires: 0, 🌳 Trees: 0, 🏢 Companies: 0, 🏭 Factories: 0, 🌎 Empires: 0";

app.append(counterDisplay, growthRateDisplay, itemCountDisplay);

// Function to centralize updates for counter and UI
const updateGameState = () => {
  counterDisplay.textContent = `🍔 ${counter.toFixed(2)}`;
  growthRateDisplay.textContent = `⏱️ ${growthRate.toFixed(1)} burgers/sec`;
  itemCountDisplay.textContent = availableItems
    .map((item) => {
      let emoji;
      switch (item.name) {
        case "Hires":
          emoji = "👨‍🍳";
          break;
        case "Trees":
          emoji = "🌳";
          break;
        case "Companies":
          emoji = "🏢";
          break;
        case "Factories":
          emoji = "🏭";
          break;
        case "Empires":
          emoji = "🌎";
          break;
        default:
          emoji = "🍔";
          break;
      }
      return `${emoji} ${item.count}`;
    })
    .join(", ");
  updateMainButtonSize();
  checkUpgradeButtons();
};

// Function to update the size of the main button based on the counter
const updateMainButtonSize = () => {
  const newSize = Math.min(baseSize + counter * growthFactor, maxSize);
  mainButton.style.width = `${newSize}px`;
  mainButton.style.height = `${newSize}px`;
};

// Create Upgrade Buttons inside a container
const upgradeContainer = document.createElement("div");
upgradeContainer.className = "upgrade-container";

const createUpgradeButtons = () => {
  availableItems.forEach((item) => {
    const button = document.createElement("button");
    button.className = `${item.name.toLowerCase()}-button upgrade-button`;
    button.textContent = `${item.displayText} (+${item.rate} burgers/sec) - ${item.price.toFixed(2)} 🍔`;
    button.disabled = true;

    button.addEventListener("click", () => {
      if (counter >= item.price) {
        counter -= item.price;
        growthRate += item.rate;

        item.count++;
        item.price = item.basePrice * Math.pow(1.15, item.count);

        button.textContent = `${item.displayText} (+${item.rate} burgers/sec) - ${item.price.toFixed(2)} 🍔`;

        updateGameState(); // Centralized game state update
      }
    });

    upgradeContainer.appendChild(button);
  });
  app.appendChild(upgradeContainer);
};

// Check if buttons should be enabled based on counter value
const checkUpgradeButtons = () => {
  availableItems.forEach((item) => {
    const button = document.querySelector(
      `.${item.name.toLowerCase()}-button`,
    ) as HTMLButtonElement;
    button.disabled = counter < item.price;
  });
};

// Main Button for Incrementing Counter
const mainButton: HTMLButtonElement = document.createElement("button");
mainButton.className = "main-button";
mainButton.addEventListener("click", () => {
  counter++;
  updateGameState(); // Centralized game state update
});
app.append(mainButton);

// Variables to track timestamps and elapsed time
let lastTimestamp: number = performance.now();

// Function to update the counter based on elapsed time and growth rate
const incrementCounterByGrowthRate = (elapsed: number) => {
  counter += growthRate * elapsed;
};

// Function to update the last timestamp after each frame
const updateTimestamp = (timestamp: number) => {
  lastTimestamp = timestamp;
};

// Simplified animation loop for readability and maintainability
const animateCounter = (timestamp: number) => {
  const elapsed = (timestamp - lastTimestamp) / 1000;
  updateTimestamp(timestamp);

  incrementCounterByGrowthRate(elapsed); // Increment counter by growth rate
  updateGameState(); // Centralized game state update

  requestAnimationFrame(animateCounter);
};

// Start the Animation Loop
requestAnimationFrame(animateCounter);

// Initialize upgrade buttons
createUpgradeButtons();
