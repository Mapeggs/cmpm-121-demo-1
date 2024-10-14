import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazi game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//create a button element
const button: HTMLButtonElement = document.createElement("button");

//create a eventlistener for button
button.addEventListener('click', () => {
    console.log('Button Clicked');
});

//append button to the dom
document.body.appendChild(button);


