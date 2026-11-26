
import * as THREE from 'https://esm.sh/three@0.170.0';
import { geoEquirectangular, geoPath } from
    'https://esm.sh/d3-geo@3.1.1';

import { OrbitControls } from
    'https://esm.sh/three@0.170.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('globeViz');
const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let countryData = [];
let hoveredCountry = null;
let selectedCountry = null;
let pickingGlobe = null;
let countryContext = null;
let hoverContext = null;
let hoverPath = null;
let hoverTexture = null;
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

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 6;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

let autoRotateTimer;

function resumeAutoRotateLater() {
    clearTimeout(autoRotateTimer);

    controls.autoRotate = false;

    autoRotateTimer = setTimeout(() => {
        controls.autoRotate = true;
    }, 10000);
}

controls.addEventListener('start', () => {
    clearTimeout(autoRotateTimer);
    controls.autoRotate = false;
});

controls.addEventListener('end', () => {
    resumeAutoRotateLater();
});
// Resize
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Earth
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

// Load country data
const loader = new THREE.FileLoader();

loader.load('data/countries.geojson', (data) => {
    const countries = JSON.parse(data);

    countryData = countries.features;

    // Hover layer
    createHoverLayer();

    // Country ID map
    const countryCanvas = createCountryMap(countryData);
    countryContext = countryCanvas.getContext('2d');

    const countryTexture = new THREE.CanvasTexture(countryCanvas);
    countryTexture.colorSpace = THREE.NoColorSpace;
    countryTexture.generateMipmaps = false;
    countryTexture.minFilter = THREE.NearestFilter;
    countryTexture.magFilter = THREE.NearestFilter;

    const pickingMaterial = new THREE.MeshBasicMaterial({
        map: countryTexture,
        colorWrite: false
    });

    pickingGlobe = new THREE.Mesh(
        new THREE.SphereGeometry(1.002, 128, 128),
        pickingMaterial
    );

    scene.add(pickingGlobe);

    // Country borders
    const borderMaterial = new THREE.LineBasicMaterial({
        color: 0x8abbd0,
        transparent: true,
        opacity: 0.65
    });

    countries.features.forEach(feature => {
        const countryGeometry = feature.geometry;

        if (!countryGeometry) return;

        const polygons = countryGeometry.type === "Polygon"
            ? [countryGeometry.coordinates]
            : countryGeometry.type === "MultiPolygon"
                ? countryGeometry.coordinates
                : [];

        polygons.forEach(polygon => {
            polygon.forEach(ring => {
                const points = ring.map(([longitude, latitude]) =>
                    coordinatesToVector3(longitude, latitude, 1.01)
                );

                const borderGeometry = new THREE.BufferGeometry()
                    .setFromPoints(points);

                const border = new THREE.Line(
                    borderGeometry,
                    borderMaterial
                );

                border.renderOrder = 2;
                border.material.depthWrite = false;

                scene.add(border);
            });
        });
    });

    console.log("Country borders loaded!");
    console.log("Countries loaded:", countries.features.length);
    console.log("First country:", countries.features[0]);
});

// Create country ID map
function createCountryMap(countries) {
    const width = 2048;
    const height = 1024;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    const projection = geoEquirectangular()
        .scale(width / (2 * Math.PI))
        .translate([width / 2, height / 2]);

    const path = geoPath(projection, context);

    countries.forEach((feature, index) => {
        context.beginPath();
        path(feature);

        const id = index + 1;

        const red = id & 255;
        const green = (id >> 8) & 255;
        const blue = (id >> 16) & 255;

        context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        context.fill();
    });

    return canvas;
}

// Create hover layer
function createHoverLayer() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;

    hoverContext = canvas.getContext('2d');

    const projection = geoEquirectangular()
        .scale(2048 / (2 * Math.PI))
        .translate([2048 / 2, 1024 / 2]);

    hoverPath = geoPath(projection, hoverContext);

    hoverTexture = new THREE.CanvasTexture(canvas);
    hoverTexture.colorSpace = THREE.SRGBColorSpace;

    const hoverMaterial = new THREE.MeshBasicMaterial({
        map: hoverTexture,
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide
    });

    const hoverGlobe = new THREE.Mesh(
        new THREE.SphereGeometry(1.004, 128, 128),
        hoverMaterial
    );

    scene.add(hoverGlobe);
}

// Highlight country
function highlightCountry(country) {
    if (!hoverContext) return;

    hoverContext.clearRect(0, 0, 2048, 1024);

    // Selected country
    if (selectedCountry) {
        hoverContext.beginPath();
        hoverPath(selectedCountry);
        hoverContext.fillStyle = 'rgba(50, 200, 255, 0.5)';
        hoverContext.fill();
    }

    // Hovered country
    if (country && country !== selectedCountry) {
        hoverContext.beginPath();
        hoverPath(country);
        hoverContext.fillStyle = 'rgba(255, 255, 255, 0.45)';
        hoverContext.fill();
    }

    hoverTexture.needsUpdate = true;
}

// Get country from UV coordinates
function getCountryAtUV(uv) {
    const x = Math.min(2047, Math.max(0, Math.floor(uv.x * 2048)));
    const y = Math.min(1023, Math.max(0, Math.floor((1 - uv.y) * 1024)));

    const pixel = countryContext.getImageData(x, y, 1, 1).data;

    const id = pixel[0] + (pixel[1] << 8) + (pixel[2] << 16);

    if (id === 0) return null;

    return countryData[id - 1] || null;
}

// Convert coordinates to 3D position
function coordinatesToVector3(longitude, latitude, radius = 1.003) {
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

// Country hover detection
renderer.domElement.addEventListener('pointermove', (event) => {
    if (!pickingGlobe || !countryContext) return;

    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(pickingGlobe);

    const country = intersects.length > 0
        ? getCountryAtUV(intersects[0].uv)
        : null;

    if (country !== hoveredCountry) {
        hoveredCountry = country;
        highlightCountry(country);
    }
});

renderer.domElement.addEventListener('click', () => {
    if (!hoveredCountry) return;

    if (selectedCountry === hoveredCountry) {
        selectedCountry = null;

        container.classList.remove('shift-left');
        window.unselectcountry();

        console.log('Country deselected');
    } else {
        selectedCountry = hoveredCountry;

        container.classList.add('shift-left');
        window.selectcountry(selectedCountry.properties.name);

        console.log('Selected country:', selectedCountry.properties.name);
    }

    highlightCountry(hoveredCountry);
});

renderer.domElement.addEventListener('pointerleave', () => {
    hoveredCountry = null;
    highlightCountry(null);

    resumeAutoRotateLater();
});

// Atmosphere
const atmosphereGeometry = new THREE.SphereGeometry(1.025, 64, 64);

const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x4a9bd8,
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide
});

const atmosphere = new THREE.Mesh(
    atmosphereGeometry,
    atmosphereMaterial
);

scene.add(atmosphere);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 2.5);
light.position.set(5, 3, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x9bbbd1, 0.7);
scene.add(ambient);

// Animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
