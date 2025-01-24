import "./styles.css";
import { GRIDSIZE, SQUARESIZE } from "./ts/globals";
import generateMap from "./ts/map";

document.documentElement.style.setProperty("--grid-size", GRIDSIZE.toString());
document.documentElement.style.setProperty("--square-size", SQUARESIZE.toString() + "px");

const grid = <HTMLElement>document.querySelector(".window");
const cells = generateMap(GRIDSIZE, grid);

const popup = <HTMLElement>document.querySelector(".resource-type-popup");
const playTurn = document.querySelector("button.play-turn");
playTurn?.addEventListener("mouseover", () => {
	popup.style.display = "flex";
	popup.textContent = "Finish Turn";
})

playTurn?.addEventListener("mouseout", () => {
	popup.style.display = "none";
	popup.textContent = "";
})
