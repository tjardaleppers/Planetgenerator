var width = window.innerWidth;
var height = window.innerHeight;

// Setup the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
var cameraTarget = {x:0, y:0, z:0};
camera.position.y = 70;
camera.position.z = 1000;
camera.rotation.x = -15 * Math.PI / 180;

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(Colors.BackgroundColor);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

// Setup the terrain
var geometry = new THREE.PlaneBufferGeometry( 2000, 2000, 256, 256 );
var material = new THREE.MeshLambertMaterial({color: Colors.TerrainColor});
var terrain = new THREE.Mesh( geometry, material );
terrain.rotation.x = -Math.PI / 2;
scene.add( terrain );

var peak = 60;
var smoothing = 300;
function refreshVertices() {
    var vertices = terrain.geometry.attributes.position.array;
    for (var i = 0; i <= vertices.length; i += 3) {
        vertices[i+2] = peak * perlin.noise(
            (terrain.position.x + vertices[i])/smoothing, 
            (terrain.position.z + vertices[i+1])/smoothing
        );
    }
    terrain.geometry.attributes.position.needsUpdate = true;
    terrain.geometry.computeVertexNormals();
}

function loop() {
    requestAnimationFrame(loop);
    renderer.render( scene, camera );
}

loop();