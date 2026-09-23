/**
 * Three.js hero scene: a wheel, brake disc and green caliper assembly with
 * floating gears and pistons. Built entirely from primitives (no model download).
 * Loaded on demand by Hero3D — never part of the initial bundle.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type SceneHandle = { dispose: () => void };

function gearGeometry(teeth: number, ro: number, ri: number, depth: number) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts: [number, number][] = [
      [a, ri], [a + step * 0.12, ro], [a + step * 0.38, ro], [a + step * 0.5, ri],
    ];
    pts.forEach(([ang, r], j) => {
      const x = Math.cos(ang) * r, y = Math.sin(ang) * r;
      if (i === 0 && j === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, ri * 0.35, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 2, curveSegments: 12 });
  g.center();
  return g;
}

export function createHeroScene(container: HTMLElement, opts: { animate: boolean }): SceneHandle {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.2, 10.2);

  // Materials
  const chrome = new THREE.MeshStandardMaterial({ color: 0xdfe5e2, metalness: 1, roughness: 0.22 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x8e9793, metalness: 0.9, roughness: 0.38 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x141615, metalness: 0, roughness: 0.85 });
  const green = new THREE.MeshStandardMaterial({ color: 0x3ddc4a, metalness: 0.55, roughness: 0.3, emissive: 0x0d4a13, emissiveIntensity: 0.6 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b1f1d, metalness: 0.7, roughness: 0.45 });

  // Wheel assembly
  const wheel = new THREE.Group();
  const tyre = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.46, 28, 80), rubber);
  wheel.add(tyre);
  // tread blocks
  const treadGeo = new THREE.BoxGeometry(0.12, 0.26, 0.7);
  for (let i = 0; i < 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const t = new THREE.Mesh(treadGeo, rubber);
    t.position.set(Math.cos(a) * 1.74, Math.sin(a) * 1.74, 0);
    t.rotation.z = a;
    wheel.add(t);
  }
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.46, 64, 1, true), chrome);
  rim.rotation.x = Math.PI / 2;
  wheel.add(rim);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.5, 32), chrome);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.1;
  wheel.add(hub);
  const centre = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.54, 24), green);
  centre.rotation.x = Math.PI / 2;
  centre.position.z = 0.12;
  wheel.add(centre);
  const spokeGeo = new THREE.BoxGeometry(0.16, 0.8, 0.1);
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Mesh(spokeGeo, chrome);
    const a = (i / 5) * Math.PI * 2;
    s.position.set(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.2);
    s.rotation.z = a - Math.PI / 2;
    wheel.add(s);
  }
  // Brake disc sits behind the spokes
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.07, 64), steel);
  disc.rotation.x = Math.PI / 2;
  disc.position.z = -0.12;
  wheel.add(disc);

  const assembly = new THREE.Group();
  assembly.add(wheel);
  // Caliper does not spin with the wheel
  const caliper = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.13, 16, 32, Math.PI / 2.6), green);
  caliper.rotation.z = -Math.PI / 5;
  caliper.position.z = 0.02;
  assembly.add(caliper);
  scene.add(assembly);

  // Floating gears
  const gearA = new THREE.Mesh(gearGeometry(14, 0.72, 0.6, 0.18), steel);
  gearA.position.set(-2.2, 1.35, -1.2);
  const gearB = new THREE.Mesh(gearGeometry(10, 0.48, 0.39, 0.18), green);
  gearB.position.set(-1.43, 0.52, -1.2);
  gearB.rotation.z = 0.16;
  const gearC = new THREE.Mesh(gearGeometry(12, 0.55, 0.45, 0.16), dark);
  gearC.position.set(2.2, -1.45, -1.4);
  scene.add(gearA, gearB, gearC);

  // Pistons
  const pistons: THREE.Group[] = [];
  const makePiston = (x: number, y: number, phase: number) => {
    const g = new THREE.Group();
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.36, 32), chrome);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.285, 0.018, 8, 32), dark);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.08;
    const rod = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.62, 0.08), steel);
    rod.position.y = -0.46;
    const eye = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.05, 10, 24), steel);
    eye.position.y = -0.82;
    g.add(head, ring, rod, eye);
    g.position.set(x, y, -0.8);
    g.rotation.z = x > 0 ? -0.35 : 0.35;
    g.userData = { baseY: y, phase };
    scene.add(g);
    pistons.push(g);
  };
  makePiston(2.3, 1.25, 0);
  makePiston(-2.3, -1.3, Math.PI);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rimLight = new THREE.PointLight(0x3ddc4a, 30, 12);
  rimLight.position.set(-3, -1, 2);
  scene.add(rimLight);
  const rimLight2 = new THREE.PointLight(0x6cf277, 18, 10);
  rimLight2.position.set(3, 2, -2);
  scene.add(rimLight2);

  // Interaction
  const pointer = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!opts.animate) renderer.render(scene, camera);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; loop(); });
  io.observe(container);

  const clock = new THREE.Clock();
  let raf = 0;
  const render = () => {
    const t = clock.getElapsedTime();
    wheel.rotation.z = -t * 0.9;
    assembly.rotation.y += ((-0.55 + pointer.x * 0.35 + Math.sin(t * 0.4) * 0.12) - assembly.rotation.y) * 0.05;
    assembly.rotation.x += ((0.12 + pointer.y * 0.18) - assembly.rotation.x) * 0.05;
    assembly.position.y = Math.sin(t * 0.8) * 0.06;
    gearA.rotation.z = t * 0.6;
    gearB.rotation.z = -t * 0.6 * (14 / 10) + 0.16;
    gearC.rotation.z = t * 0.4;
    gearC.rotation.y = Math.sin(t * 0.5) * 0.4;
    pistons.forEach((p) => { p.position.y = p.userData.baseY + Math.sin(t * 3 + p.userData.phase) * 0.18; });
    renderer.render(scene, camera);
  };
  function loop() {
    cancelAnimationFrame(raf);
    if (!opts.animate || !visible || document.hidden) return;
    const tick = () => { render(); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
  }
  const onVis = () => loop();
  document.addEventListener("visibilitychange", onVis);

  if (opts.animate) loop();
  else {
    assembly.rotation.set(0.12, -0.55, 0);
    renderer.render(scene, camera);
  }

  return {
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
        }
      });
      [chrome, steel, rubber, green, dark].forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
