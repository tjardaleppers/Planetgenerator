import {doehet} from './test';
console.log(doehet())
// import {start} from './diamondsquare/diamondsquare';

// let img = document.getElementById('image');
// img.src = localStorage.getItem('image');
// console.log(start())

// initializer
let scene, camera, renderer, sphere, texture;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // render into HTML document
    document.body.appendChild(renderer.domElement);
    
    // image = new Image();
    // image.src = url

    // texture = new THREE.TextureLoader().load(img.src); // gebruik diamond square algoritme om een random map te genereren, daar een jpg bestand van te maken en dat in deze functie te stoppen
    texture = new THREE.TextureLoader().load('/assets/earthmap.jpg')
    const geometry = new THREE.SphereBufferGeometry(4, 64, 32);
    const material = new THREE.MeshPhysicalMaterial({map: texture});
    const loader = new THREE.TextureLoader();
    loader.load('/assets/universe_background.jpeg' , function (texture) {
        scene.background = texture;
    });
    
    const light = new THREE.DirectionalLight(0xffffff, 3.5);
    light.position.set(-10, 20, 20);
    light.castShadow = true;
    scene.add(light);

    sphere = new THREE.Mesh(geometry, material);
    sphere.receiveShadow = true;
    scene.add(sphere);
    
    camera.position.z = 10;
}


function animate() {

	requestAnimationFrame(animate);
    sphere.rotation.y += 0.005;
    renderer.render(scene, camera);
}


function windowresize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', windowresize, false);


init();
animate();
