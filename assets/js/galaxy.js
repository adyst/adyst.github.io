var camera, scene, renderer;

var fov = 25;
var aspect = window.innerWidth / window.innerHeight;
var near = 100;
var far = 2000;

var mouseX = 0, mouseY = 0;
var radius = 500, theta = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
addSphericalStars();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffbe9f);

  light = new THREE.HemisphereLight(0xffffff,0xff0000,1);
  light.position.set(1, 0, 1).normalize();
  scene.add(light);

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function addSphericalStars() {
  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
  var texture = new THREE.TextureLoader().load( '../images/glow.png' );

  for ( var i = 0; i < 500; i ++ ) {
    var randomColor = randomGalaxyColor();
    var material = new THREE.MeshLambertMaterial( { color: randomColor } );
    // var spriteMaterial = new THREE.SpriteMaterial( {
    //   map: texture,
    //   color: randomColor, 
    //   transparent: true,
    //   opacity: 0.4,
    //   blending: THREE.AdditiveBlending
    // } );
    
    var object = new THREE.Mesh( geometry, material);
    
    object.position.x = random(-1000, 1000);
    object.position.y = random(-1000, 1000);
    object.position.z = random(-1000, 1000);
    object.rotation.x = random(0, 2 * Math.PI);
    object.rotation.y = random(0, 2 * Math.PI);
    object.rotation.z = random(0, 2 * Math.PI);
    var randomScale = random(0.25, 2);
    object.scale.x = randomScale;
    object.scale.y = randomScale;
    object.scale.z = randomScale;
    
    //var sprite = new THREE.Sprite( spriteMaterial );
    //var diameter = random(5, 30);
    //sprite.scale.set(diameter, diameter, 1.0);
    //object.add( sprite );
    
    scene.add( object );
  }
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  if(device.desktop()){
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  }
  else {
    theta += 0.01;
    camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  }
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function random(min, max) {
  return parseInt(Math.random() * (max-min+1), 10) + min;
}

function randomGalaxyColor() {
  var h = random(330, 360);
  var s = random(80, 100);
  var l = random(40, 70);
  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}
