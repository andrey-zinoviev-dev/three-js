import 'regenerator-runtime';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';

import texture from './t-shirt_web.FBX';
import texture1 from './t-shirt.jpg';
import texture2 from './inside.jpg'

import { button, colorButtons, changeButtonColor } from './utils';
import * as TWEEN from '@tweenjs/tween.js';

import './styles/index.css';


//canvas for texture test
// const canvas = document.createElement('canvas');
// let ctx = canvas.getContext('2d');

// ctx.fillStyle = 'rgb(255, 255, 255)';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// let canvasTexture = new THREE.CanvasTexture(canvas);
// canvasTexture.needsUpdate = true;



//THREE.JS
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xFFFFFF);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.main__canvas').append(renderer.domElement);

renderer.domElement.addEventListener('click', onModelClick);


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
const extMaterial = new THREE.MeshBasicMaterial({ color: {r:1, g:1, b:1}, wireframe: true, opacity:0.05, name: "t-shirt" });
const intMaterial = new THREE.MeshBasicMaterial({ map: intTexture, name: "inside" });
//color buttons
colorButtons.forEach((button) => {
    return button.addEventListener('click', () => {
        const result = changeButtonColor(button);
        const newColor = new THREE.Color().set(result);
        new TWEEN.Tween(extMaterial.color).to(newColor, 500).start();
        // extMaterial.needsUpdate = true;
        // ctx.fillStyle = result;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        // canvasTexture.needsUpdate = true;
    });
});
//raycaster
const raycaster = new THREE.Raycaster();

let loadedModel;
let meshesFromLoadedModel = [];

const fbxLoader = new FBXLoader();
fbxLoader.load(
    texture,
    (model) => {
        
        model.traverse(function (child) {
            if(child.isMesh) {
                if(child.name === 'inside') {
                    child.material = intMaterial;
                    
                }
                if(child.name === 't-shirt') {
                    // child.geometry = new THREE.BoxGeometry(1, 1, 1);
                    child.material = extMaterial;
                    // child.material = new THREE.MeshBasicMaterial({
                    //     // map: extMaterial.map,
                    // });

                    //model particles sampler
                    const sampler = new MeshSurfaceSampler(child).build();
                }
                meshesFromLoadedModel.push(child);
            }
        });

        model.scale.multiplyScalar(0.75);

        //variable test
        loadedModel = model;

        // meshesFromLoadedModel.push(model)
        scene.add(model);
        // scene.add(model);
    }
)

function animate() {
    // console.log(controls.getPolarAngle());
    controls.update();
	requestAnimationFrame( animate );
    TWEEN.update();
    TWEEN.update();
	renderer.render( scene, camera );
}
animate();

button.addEventListener('click', () => {
    // console.log(camera.position, loadedModel);
    const tweenA = new TWEEN.Tween(camera.position)
    .to({
        x: 0.75,
        y: 0.15,
        z: 1,
    }, 1000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .start();
    
    const tweenB = new TWEEN.Tween(loadedModel.scale)
    .to({
        x: 1.2,
        y: 1.2,
        z: 1.2
    }, 350)
    .easing(TWEEN.Easing.Cubic.InOut)
        // .start();
    tweenA.chain(tweenB);
    // .chain(    
    //     new TWEEN.Tween(loadedModel.scale)
    //     .to({
    //         x: 1,
    //         y: 1,
    //         z: 1
    //     })
    //     .start()
    // );
});

//raycaster events test
function onModelClick(evt) {
    const mouse = {
        x: (evt.clientX/renderer.domElement.clientWidth) *2 -1,
        y: -(evt.clientY/renderer.domElement.clientHeight) *2 +1,
    }
    
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(meshesFromLoadedModel, false);
    
    if(intersects.length > 0) {
        intersects.forEach((mesh) => {
            console.log(mesh);
        });
    }

};