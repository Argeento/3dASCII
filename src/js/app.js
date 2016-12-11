const CrtAscii = require( './crtAscii.js' );
THREE.TrackballControls = require( './three_modules/trackballControls.js' );

const sizeInPixels = 130;
let camera, scene, renderer, controls;

function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( sizeInPixels, sizeInPixels );
	document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 43, 1, 1, 1000 );
	camera.position.set( 0, 0, 500 );
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 200;
	controls.maxDistance = 500;

	const light = new THREE.PointLight( 0xffffff );
	light.position.copy( camera.position );
	scene.add( light );

	const texture = new THREE.TextureLoader().load( 'img/argeento.jpg' );
	const geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
	const material = new THREE.MeshBasicMaterial( { map: texture } );
	const mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

init();
animate();

const cv = document.querySelector( 'canvas' );
const video = document.querySelector( 'video' );
const dimg = document.querySelector( '#dimg' );


video.srcObject = cv.captureStream( 30 );

const acii = new CrtAscii( {
	destEl: dimg,
	srcEl: video,
	lineLength: sizeInPixels,
} );
