import "./styles.css";
import GameController from "./ts/controllers/gameController";
import { GRIDSIZE, SQUARESIZE } from "./ts/globals";

document.documentElement.style.setProperty("--grid-size", GRIDSIZE.toString());
document.documentElement.style.setProperty("--square-size", SQUARESIZE.toString() + "px");

const game = new GameController();
