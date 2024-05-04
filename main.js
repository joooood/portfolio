import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// OBJECTS


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

// LIGHT
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

// CONTROLS
const controls = new OrbitControls( 
    camera, renderer.domElement 
);

// SPHERE
const geometry = new THREE.SphereGeometry( 2.5 );
const material = new THREE.MeshBasicMaterial( { color:0x554455 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// RAYCASTER
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function animate() {
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render( scene, camera );
}
renderer.setAnimationLoop(animate);

window.addEventListener( 'resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
} );

function onMouseDown ( event ) {
    console.log("Mouse DOWN");
    pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children, false );
    if( intersects.length > 0 ) {
        const intersect = intersects[0];
        intersect.object.material.color = new THREE.Color( 0xaa6633 );
    }
}
document.addEventListener( 'mousedown', onMouseDown );