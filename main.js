import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let targetRotationX = 0.005;
let targetRotationY = 0.02;
let mouseX = 0, mouseXOnMouseDown = 0, mouseY = 0, mouseYOnMouseDown = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
const dragFactor = 0.0002;
const slowingFactor = 0.98;

function onDocumentMouseDown (event) {
    event.preventDefault();
    document.addEventListener('mousemove', onDocumentMouseMove, false );
    document.addEventListener('mouseup', onDocumentMouseUp, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    mouseYOnMouseDown = event.clientY - windowHalfY;
}

function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
    targetRotationX = ( mouseX - mouseXOnMouseDown ) * dragFactor;
    targetRotationY = ( mouseY - mouseYOnMouseDown ) * dragFactor;
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
}

// RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 1.0;

// LIGHT
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

// CONTROLS
const controls = new OrbitControls( 
    camera, renderer.domElement 
);

// RAYCASTER
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// OBJECTS
// EARTH
const earthGeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
const earthMaterial = new THREE.MeshPhongMaterial(
     {  
        wireframe: false,
        map: new THREE.TextureLoader().load('texture/minion.jpg'),
        //bumpMap: new THREE.TextureLoader().load('texture/EarthBump.jpg'),
        //bumpScale: 0.01
     } );
const tempMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: true} );
const earthMesh = new THREE.Mesh( earthGeometry, tempMaterial );
scene.add( earthMesh );

function animate() {
    earthMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), targetRotationX);
    earthMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), targetRotationY);
    targetRotationX *= slowingFactor;
    targetRotationY *= slowingFactor;
    renderer.render( scene, camera );
}
renderer.setAnimationLoop(animate);

window.addEventListener( 'resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
} );

/*
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
    }
}
    */
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
window.onload = main;