import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x004455);

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;

// CONTROLS
const controls = new OrbitControls( 
    camera, renderer.domElement 
);

// SPHERE
const geometry = new THREE.SphereGeometry( 2.5 );
const material = new THREE.MeshBasicMaterial( { color:0xFFFFFF } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// AXES HELPER
const axes = new THREE.AxesHelper( 5 );
scene.add( axes );

// RAYCASTER
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function animate() {
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
} animate();

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', resize() );

function onClick ( event ) {
    console.log("Mouse CLICKED");
    pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children, false);
    if( intersects.length > 0 ) {
        const intersect = intersects[0];
        camera.position.copy(intersect.point);
        intersect.color(0x00FF22);
    }
}
document.addEventListener( 'onClick', onClick );

