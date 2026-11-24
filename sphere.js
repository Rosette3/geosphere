import * as THREE from 'https://esm.sh/three@0.170.0';

import { OrbitControls } from
'https://esm.sh/three@0.170.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('globeViz');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.z = 2.8;
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create controls AFTER renderer
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1.5;
controls.maxDistance = 6;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
});

const geometry = new THREE.SphereGeometry(1, 64, 64);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
);
const material = new THREE.MeshStandardMaterial({
    map: earthTexture
});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);


const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 3, 5);
const ambient = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambient);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
