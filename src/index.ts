import "./styles.css";
import { GRIDSIZE, SQUARESIZE } from "./ts/globals";
import generateMap from "./ts/map";

document.documentElement.style.setProperty("--grid-size", GRIDSIZE.toString());
document.documentElement.style.setProperty("--square-size", SQUARESIZE.toString() + "px");

const grid = <HTMLElement>document.querySelector(".window");
const cells = generateMap(GRIDSIZE, grid);
