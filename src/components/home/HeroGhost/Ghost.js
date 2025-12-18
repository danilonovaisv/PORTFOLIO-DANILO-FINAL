import * as THREE from "https://esm.sh/three";

/* PRELOADER */
const preloader = document.getElementById("preloader");
setTimeout(() => preloader.classList.add("fade-out"), 1200);

/* SCENE */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.appendChild(renderer.domElement);

/* LIGHT */
scene.add(new THREE.AmbientLight(0x080820, 0.4));

/* GHOST */
const material = new THREE.MeshStandardMaterial({
  color: 0x0f2027,
  emissive: 0xff4500,
  emissiveIntensity: 7,
  transparent: true,
  opacity: 0.9,
});

const ghost = new THREE.Mesh(
    new THREE.SphereGeometry(2, 40, 40),
    material
);
scene.add(ghost);

/* TEXT */
const quote = document.querySelector(".quote");

/* INPUT */
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

/* ANIMATE */
let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  ghost.position.x += (mouse.x * 6 - ghost.position.x) * 0.08;
  ghost.position.y += (mouse.y * 4 - ghost.position.y) * 0.08;
  ghost.position.y += Math.sin(time * 1.5) * 0.12;

  material.emissiveIntensity = 7 + Math.sin(time * 2) * 1.2;

  const x = mouse.x * 50 + 50;
  const y = mouse.y * 50 + 50;
  const size = 700 + material.emissiveIntensity * 120;

  quote.style.webkitMaskImage = `
    radial-gradient(
      circle at ${x}% ${y}%,
      rgba(255,255,255,1) 0%,
      rgba(255,255,255,0.8) 40%,
      rgba(255,255,255,0.0) 75%
    )
  `;
  quote.style.webkitMaskSize = `${size}px ${size}px`;

  renderer.render(scene, camera);
}

animate();