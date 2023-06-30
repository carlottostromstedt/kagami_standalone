import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
const scene = new THREE.Scene();

//const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var light = new THREE.DirectionalLight(0xefefff, 3);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);
var light = new THREE.DirectionalLight(0xffefef, 3);
  light.position.set(-1, -1, -1).normalize();
  scene.add(light);


let container = document.getElementById('canvas-container');
let containerWidth = container.offsetWidth;
let containerHeight = container.offsetHeight;



const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const camera = new THREE.PerspectiveCamera(70, containerWidth / containerHeight, 0.1, 1000);
camera.position.x=-30; // Adjust the position as needed
camera.lookAt(0,0,0);

renderer.setSize(containerWidth, containerHeight);
container.appendChild(renderer.domElement);

let group = new THREE.Group();

var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
var objLoader = new OBJLoader()
let object;
objLoader.load(
  'logo_real.obj',
  function (loadedObject) {
    object = loadedObject;
    // Once the OBJ file is loaded, you can apply the black material to the mesh
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    group.add(object);
    object.scale.set(0.1, 0.1, 0.1);
    object.position.set(0, 0, -40.5)
    group.position.set(0, 0, 0);
    // Add the loaded object to the scene
    scene.add(group);
  },
  function (xhr) {
    // Optional callback for progress updates
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.log('An error occurred while loading the OBJ file:', error);
  }
);

const xAxis = new THREE.ArrowHelper(
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0,0,0),
  1,
  0xff0000
);
scene.add(xAxis);
const yAxis = new THREE.ArrowHelper(
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0,0,0),
  1,
  0x00ff00
);
scene.add(yAxis);
const zAxis = new THREE.ArrowHelper(
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0,0,0),
  1,
  0x0000ff
);
scene.add(zAxis);



//const controls = new OrbitControls( camera, renderer.domElement );
//let gltf;
//let vision_pro;
//const loader = new GLTFLoader();
//loader.load(
//   'apple-vision-pro/source/apple_vision_pro_ios16/apple_vision_pro_ios16.glb',
//   function ( gltf ) {
//       vision_pro = gltf.scene;
//		scene.add( vision_pro );
//
//		gltf.asset; // Object
//   vision_pro.rotation.z = 1.0;
//	},
//)

camera.position.z = 5;
camera.position.y = 40;
camera.position.x = -100;

function animate() {
	requestAnimationFrame( animate );
  if (object) {
    group.rotation.y += 0.01; // Adjust the rotation speed as desired
  }
	renderer.render( scene, camera );
}

animate();