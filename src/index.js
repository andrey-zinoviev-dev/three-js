import 'regenerator-runtime';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import texture from './t-shirt_web.FBX';
import texture1 from './t-shirt.jpg';
import texture2 from './inside.jpg'

const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// scene.add(new THREE.AxesHelper(5))

// const light = new THREE.PointLight()
// light.position.set(0.8, 1.4, 1.0)
// scene.add(light)

const color = 0xFFFFFF;
const intensity = 15;
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);

const material = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 1,
} );

const fbxLoader = new FBXLoader();
fbxLoader.load(
    texture,
    (model) => {
        model.traverse(function (child) {
            if(child instanceof THREE.Mesh) {
                child.material = material;
                // child.material.map = texture2;
                // child.material.needsUpdate = true;
            }
        })
        scene.add(model);
    }
)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();