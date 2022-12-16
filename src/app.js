import { AmbientLight, AxesHelper, DirectionalLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer, Box3, Box3Helper,Vector3, Color } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";

window.doThree = (ifcfile) => {

  console.log(ifcfile);
  //ifcfile = "../../ifc/hags.ifc";
  //Creates the Three.js scene
  const scene = new Scene();

  //Sets up the renderer, fetching the canvas of the HTML
  const threeCanvas = document.getElementById("scene3d");
  const size = {
    width: threeCanvas.clientWidth,
    height: threeCanvas.clientWidth
  };

  const aspect = 1;
  const camera = new PerspectiveCamera(65, aspect);
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

  let bsize;

  const ifcLoader = new IFCLoader();

  ifcLoader.load(ifcfile, (ifcModel) => {
      
      scene.add(ifcModel);

      ifcModel.geometry.center();

      let bbox = new Box3().setFromObject(ifcModel);
      let helper = new Box3Helper(bbox, new Color(0, 255, 0));
      
   //   scene.add(helper);
      bsize = bbox.getSize(new Vector3()); 
      
      camera.position.z = bsize.z ;
      camera.position.y = bsize.y;
      camera.position.x = bsize.x;

    }
  );

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.updateProjectionMatrix();

  //Creates the orbit controls (to navigate the scene)
  const controls = new OrbitControls(camera, threeCanvas);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  controls.autoRotateSpeed = 2.0;
  controls.autoRotate = true;
  controls.addEventListener('start', function(){
    controls.autoRotate = false;
  });

  //Animation loop
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

  };

  const refresh = () =>{
    size.width = document.getElementById("holder").offsetWidth;
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.width);
  }

  const resize = () => {
    setTimeout(refresh,200);
  };
  window.addEventListener("resize", resize);
  animate();
};
