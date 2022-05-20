import 'regenerator-runtime';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import texture from './t-shirt_web.FBX';
import texture1 from './t-shirt.jpg';
import texture2 from './inside.jpg'

import { button } from './utils';
import * as TWEEN from '@tweenjs/tween.js';

import './styles/index.css';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xFFFFFF);
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// scene.add(new THREE.AxesHelper(5))

// const light = new THREE.PointLight()
// light.position.set(0.8, 1.4, 1.0)
// scene.add(light)

const color = 0xFFFFFF;
// const intensity = 10;
// const ambientLight = new THREE.AmbientLight(color, intensity);
// scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.main__content').append(renderer.domElement);

camera.position.z = 0.8;

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.5;

controls.minPolarAngle = 0.9;
controls.maxPolarAngle = 2.1;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.85;

//textures
const extTexture = new THREE.TextureLoader().load(texture1);
const intTexture = new THREE.TextureLoader().load(texture2);
//materials
const extMaterial = new THREE.MeshBasicMaterial({ map: extTexture, name: "t-shirt" });
const intMaterial = new THREE.MeshBasicMaterial({ map: intTexture, name: "inside" });

let loadedModel;

const fbxLoader = new FBXLoader();
fbxLoader.load(
    texture,
    (model) => {
        model.traverse(function (child) {
            if(child.isMesh) {
                if(child.name === 'inside') {
                    child.material = new THREE.MeshBasicMaterial( {
                        map: intMaterial.map,
                    } );
                }
                if(child.name === 't-shirt') {
                    child.material = new THREE.MeshBasicMaterial({
                        map: extMaterial.map,
                    });

                }
            }
        });
        //variable test
        loadedModel = model;
        scene.add(model);
    }
)

function animate() {
    // console.log(controls.getPolarAngle());
    controls.update();
	requestAnimationFrame( animate );
    TWEEN.update();
	renderer.render( scene, camera );
}
animate();

button.addEventListener('click', () => {
    console.log(camera.position, loadedModel);
    new TWEEN.Tween(camera.position)
    .to({
        x: -2,
        y:0,
        z: 1,
    }, 1000)
    .start();
})