import 'regenerator-runtime';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import texture from './t-shirt_web.FBX';
import texture1 from './t-shirt.jpg';
import texture2 from './inside.jpg'


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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);

const material = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 1,
    // map: [texture1, texture2],
} );

//textures
const extTexture = new THREE.TextureLoader().load(texture1);
const intTexture = new THREE.TextureLoader().load(texture2);
//materials
const extMaterial = new THREE.MeshBasicMaterial({ map: extTexture, name: "t-shirt" });
const intMaterial = new THREE.MeshBasicMaterial({ map: intTexture, name: "inside" });

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
        
        scene.add(model);
    }
)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();