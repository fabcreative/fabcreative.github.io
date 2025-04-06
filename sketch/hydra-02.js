

a.show()
//a.hide()

//Three.js Basic Example by mr.doob and Flor de Fuego

const THREE = await import("https://unpkg.com/three@0.163.0/build/three.module.js")

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

renderer = new THREE.WebGLRenderer({alpha:true}) //Three.js background transparent
renderer.setSize(width, height)
geometry = new THREE.BoxGeometry( 1, 1, 1 );
material = new THREE.MeshNormalMaterial()
box = new THREE.Mesh(geometry, material);
scene.add(box)
camera.position.z = 1.8


// 'update' is a reserved function that will be run every time the main hydra rendering context is updated
update = () => {
    
    box.rotation.x += 0.01
    //box.rotation.y += 0.01;
    //box.scale.set(mouse.x/innerWidth,mouse.y/innerHeight,1) //resize x & y with Hydra mouse.x and mouse.y function
    renderer.render(scene, camera);
}

s0.init({
    src: renderer.domElement
})


src(s0).repeat(() => (a.fft[0]*4)).out(o0)


//osc(10).out(o1)

osc( 21, 0.1, 2 )
.modulate(
  osc( 10, -0.3, 100 )
  .rotate(15)
)
.mult(
  osc( 215, -0.1, 2)
  .pixelate( 50, 50 )
)
.color( 0.9, 0.0, 0.9 )
.modulate(
  osc( 6, -0.1 )
  .rotate( 9 )
)
.add(
  osc( 10, -0.9, 900 )
  .color(1,0,1)
)
.mult(
  shape(900, 0.2, 1)
  .luma()
  .repeatX(2)
  .repeatY(2)
  .colorama(10)
)
.modulate(
  osc( 9, -0.3, 900 )
  .rotate( 6 )
)
.add(
  osc(4, 1, 90)
  .color(0.2,0,1)
)
.out(o1)

src(o0).blend(o1).out(o2)
render(o2)