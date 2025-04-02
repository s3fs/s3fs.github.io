import "pathseg";
import { Bodies, Body } from "matter-js";
import {
  loadAndAppend,
  stringToBodies,
  setupAndRunPhysx,
  renderFromStringChain,
} from "./util";
import { PATHS_LOWER } from "./constants";
import "./style.css";

const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

const { engine } = setupAndRunPhysx([
  ground,
  // Bodies.rectangle(100, 100, 10, 10, { isStatic: true }),
  // Bodies.rectangle(200, 100, 20, 20, { isStatic: true }),
] as unknown as Body[]);

renderFromStringChain({
  chain: ["hi", "my name is", "nick", "senior", "software", "engineer"],
  world: engine.world,
});
