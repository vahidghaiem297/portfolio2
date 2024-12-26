import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';


// Scene
const scene = new THREE.Scene();

// Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#35A7FF',
  roughness:0.2
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// canvas size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// light
const light = new THREE.PointLight(0xffffff, 2000, 1000)
light.position.set(10, 20, 30)
scene.add(light)




// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20
scene.add(camera)

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);
// control
const controls = new OrbitControls(camera, canvas)
scene.add(controls);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5


// resize
window.addEventListener('resize', () => {
  // update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)

})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  renderer.setPixelRatio(2)
  window.requestAnimationFrame(loop)
}
loop();

const tl = new gsap.timeline({
  defaults: { duration: 1 },
})

tl.fromTo(mesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })
tl.fromTo(".menu", { y: "-200%" }, { y: 0 })
tl.fromTo(".social", { x: "-200%" }, { x: 0 })
tl.fromTo(".hero__title", { opacity: 0 }, { opacity: 1 })