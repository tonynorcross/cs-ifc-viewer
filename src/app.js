import { AmbientLight, AxesHelper, DirectionalLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer, Box3, Box3Helper,Vector3, Color } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";


const doThree = () => {

//Creates the Three.js scene
const scene = new Scene();
scene.background = new Color( 0xbfe6ff );
//const model = "../models/HagsPlay_SpecialtyEquipment_AdventureTrailTunnel.ifc";
const model = "../models/Vestre - Air Bench - 3217.ifc";

//const model = "../models/Vestre - Air Bench - 3206.ifc";


//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById("scene3d");

//Object to store the size of the viewport
// const size = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };


//Creates the camera (point of view of the user)

const size = {
  width: threeCanvas.clientWidth,
  height: threeCanvas.clientHeight,
};


const aspect = size.width / size.height;
const camera = new PerspectiveCamera(75, aspect);
camera.position.z = 15;
camera.position.y = 13; 
camera.position.x = 8;

//Creates the lights of the scene
const lightColor = 0xffffff;

const ambientLight = new AmbientLight(lightColor, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(lightColor, 1);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);


const renderer = new WebGLRenderer({
  canvas: threeCanvas,
  alpha: true,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.updateProjectionMatrix();

//Creates grids and axes in the scene
// const grid = new GridHelper(50, 30);
// scene.add(grid);

// const axes = new AxesHelper();
// axes.material.depthTest = false;
// axes.renderOrder = 1;
// scene.add(axes);


let bsize;

const ifcLoader = new IFCLoader();
ifcLoader.load(model, (ifcModel) => {
  
  scene.add(ifcModel);

  ifcModel.geometry.center();

  let bbox = new Box3().setFromObject(ifcModel);
  let helper = new Box3Helper(bbox, new Color(0, 255, 0));
  
  bsize = bbox.getSize(new Vector3()); 
  
  //scene.add(helper);

  camera.position.z = bsize.z ;
  camera.position.y = bsize.y;
  camera.position.x = bsize.x;

}
);

//Creates the orbit controls (to navigate the scene)
const controls = new OrbitControls(camera, threeCanvas);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

//Animation loop
const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};



animate();



const resize = () => {

   //size.width = window.innerWidth;
   //size.height = window.innerHeight;

  // size.width = document.getElementById("holder").offsetWidth;
  // size.height = document.getElementById("holder").offsetHeight;

  // console.log(size.width, size.height);

  // camera.aspect = size.width / size.height;
  // camera.updateProjectionMatrix();
  // renderer.setSize(size.width, size.height);
  // console.log("resized");

  window.location.reload();
  //just refresh?
};

//Adjust the viewport to the size of the browser
window.addEventListener("resize", resize);
//resize();

};



window.onload = (event) => {
  doThree();
};