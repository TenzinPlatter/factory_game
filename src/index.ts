import "./styles.css";
import { GRIDSIZE } from "./ts/globals";
import generateMap from "./ts/map";
import Miner from "./ts/machines/miner";
import { Coordinate, resourceType } from "./ts/types";
import Resource from "./ts/resource";
import Iron from "./ts/cellTypes/iron";

document.documentElement.style.setProperty("--grid-size", GRIDSIZE.toString());

const grid = <HTMLElement>document.querySelector(".window");
const cells = generateMap(GRIDSIZE, grid);
