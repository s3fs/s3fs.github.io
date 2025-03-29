import {
  BoxGeometry,
  BufferGeometry,
  Clock,
  Color,
  Euler,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  StaticDrawUsage,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const GRASS_COUNT = 20;

let grassCfgContainer: Record<string, any>;

function init() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);

  document
    .querySelector<HTMLCanvasElement>("#container")
    ?.appendChild(renderer.domElement);

  return { scene, camera, controls, renderer };
}

const { scene, camera, controls, renderer } = init();

const cube = new Mesh(
  new BoxGeometry(1, 1, 1, 1),
  new MeshBasicMaterial({ color: 0xfea577 })
);

scene.add(cube);
camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  controls.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

async function generateItems () {
  for (let i = 0; i < GRASS_COUNT; i++) {
    await createGrassPatch(
      new Vector3()
        .randomDirection()
        .multiply(new Vector3(1.0, 0.0, 1.0))
        .multiplyScalar(10.0),
      new Euler(0.0, Math.random() * Math.PI * 2.0, 0.0),
      new Vector3().setScalar(Math.random() * 0.25 + 0.25)
    );
  }
}

const createGrassPatch = async (position, rotation, scale) => {
  if (!grassCfgContainer) {
    // empty grass configuration container, have to initialize
    const gltf = await new GLTFLoader().loadAsync('./decimated_corn.glb');

    grassCfgContainer = {
      clock: new Clock(),
      mesh: new InstancedMesh(
        gltf.scene.children[0].geometry.clone(),
        new MeshBasicMaterial(),
        GRASS_COUNT
      ),
      instances: [],
      update: () => {
        grassCfgContainer.instances.forEach((grass: Object3D, index) => {
          grass.updateMatrix();

          grassCfgContainer.mesh.setMatrixAt(index, grass.matrix);
        });

        grassCfgContainer.mesh.instanceMatrix.needsUpdate = true;
        grassCfgContainer.mesh.computeBoundingSphere();

        grassCfgContainer.mesh.material.uniforms.fTime.value =
          grassCfgContainer.clock.getElapsedTime();

        requestAnimationFrame(grassCfgContainer.update);
      },
    };

    scene.add(grassCfgContainer.mesh);
    grassCfgContainer.mesh.position.y = -2.0;

    grassCfgContainer.update();

    const empty = new Object3D();
    empty.scale.setScalar(0.0);
    empty.updateMatrix();

    for (let i = 0; i < grassCfgContainer.mesh.count; i++) {
      grassCfgContainer.mesh.setMatrixAt(i, empty.matrix);
      grassCfgContainer.mesh.setColorAt(i, new Color(Math.random() * 0xffffff));
    }

    grassCfgContainer.mesh.instanceColor.needsUpdate = true;
    grassCfgContainer.mesh.instanceMatrix.needsUpdate = true;
    grassCfgContainer.mesh.instanceMatrix.setUsage(StaticDrawUsage);
  }

  const grass = new Object3D();
  grass.position.copy(position);
  grass.rotation.copy(rotation);
  grass.scale.copy(scale);
  grass.visible = false;

  grassCfgContainer.instances.push(grass);
};