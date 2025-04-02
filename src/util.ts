import PolyDecomp from "poly-decomp";

import {
  Engine,
  Render,
  Runner,
  Composite,
  Mouse,
  MouseConstraint,
  Common,
  Vertices,
  Svg,
  Bodies,
  Body,
} from "matter-js";
import { PATHS_LOWER, SPAWN_LEFT_OFFSET, SPAWN_TOP_OFFSET } from "./constants";

export function setupAndRunPhysx(bodies: Body[] = []) {
  Common.setDecomp(PolyDecomp);

  const engine = Engine.create({
    gravity: {
      y: 0.001,
    },
  });
  const render = Render.create({
    element: document.querySelector("#app") as HTMLElement,
    engine,
    options: {
      wireframes: false,
    },
  });
  const runner = Runner.create();
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(engine.world, [mouseConstraint, ...(bodies as any)]);
  Render.run(render);
  Runner.run(runner, engine);

  return {
    engine,
    runner,
    render,
  };
}

export function toVertices(path: string) {
  const elem = document.createElementNS("http://www.w3.org/2000/svg", "path");

  elem.setAttribute("d", path);

  const p = Svg.pathToVertices(elem, 30);

  elem.remove();

  return p;
}

export function generateSlab() {}

export function loadAndAppend({
  path,
  world,
  scale,
  yOffset = 0,
  i = 0,
}: {
  path: string;
  world: any;
  yOffset?:number;
  scale?: number;
  i?: number;
}) {
  if (path !== " ") {
    const color = Common.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"]);
    const vertices = toVertices(path);

    const bfv = Bodies.fromVertices(
      SPAWN_LEFT_OFFSET + i,
      SPAWN_TOP_OFFSET + yOffset,
      [vertices],
      {
        render: {
          fillStyle: color,
          // strokeStyle: Common.choose(["#f19648", "#f5d259", "#f55a3c", "#063e7b", "#ececd1"]),
          // lineWidth: 8,
        },
      },
      true
    );

    scale && Body.scale(bfv, scale, scale);

    Composite.add(world, bfv);

    return bfv;
  }
}

export function stringToBodies({
  str,
  world,
  yOffset = 0,
  scale = 0.6,
}: {
  str: string;
  world: any;
  yOffset?: number;
  scale?: number;
}) {
  str.split("").forEach((l, i) =>
    loadAndAppend({
      path: PATHS_LOWER[l as keyof typeof PATHS_LOWER],
      world,
      scale,
      i: i * 300 * scale,
      yOffset,
    })
  );
}

export function renderFromStringChain({
  chain,
  interval = 1500,
  world,
}: {
  chain: string[];
  world: any;
  interval?: number;
}) {
  chain.forEach((str, i) => {
    setTimeout(() => {
      stringToBodies({ str, world, scale: 0.2, yOffset: i * 0.2 * 400 });
    }, 0/* interval * i */);
  });
}
