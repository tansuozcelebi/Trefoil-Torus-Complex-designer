import * as CANNON from 'cannon-es';

// Lightweight rigid-body physics for the scene objects.
// Each object gets a sphere collider (from its bounding sphere) so objects
// fall under gravity, rest on the ground and collide with each other.
export function createPhysics(groundY){
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.allowSleep = true;

  const mat = new CANNON.Material('obj');
  const contact = new CANNON.ContactMaterial(mat, mat, { friction: 0.35, restitution: 0.4 });
  world.addContactMaterial(contact);
  world.defaultContactMaterial = contact;

  // Static ground plane facing up.
  const groundBody = new CANNON.Body({ type: CANNON.Body.STATIC, material: mat, shape: new CANNON.Plane() });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  groundBody.position.set(0, groundY, 0);
  world.addBody(groundBody);

  const links = []; // { mesh, body }

  // spec: { spheres: [{x,y,z,r}, ...] } for a compound collider that hugs the
  // tube, or { radius } for a single bounding sphere (fallback).
  function addBody(mesh, spec){
    const body = new CANNON.Body({
      mass: 1,
      material: mat,
      linearDamping: 0.05,
      angularDamping: 0.2
    });
    if (spec && Array.isArray(spec.spheres) && spec.spheres.length){
      for (const s of spec.spheres){
        body.addShape(new CANNON.Sphere(Math.max(0.08, s.r)), new CANNON.Vec3(s.x, s.y, s.z));
      }
    } else {
      body.addShape(new CANNON.Sphere(Math.max(0.25, (spec && spec.radius) || 1)));
    }
    body.updateMassProperties(); // recompute inertia now that shapes are added
    body.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
    const q = mesh.quaternion;
    body.quaternion.set(q.x, q.y, q.z, q.w);
    world.addBody(body);
    links.push({ mesh, body });
    return body;
  }

  let _held = null;                       // currently grabbed link
  const _heldPrev = new CANNON.Vec3();    // previous grabbed position (for velocity)

  function setKinematic(body, on){
    body.type = on ? CANNON.Body.KINEMATIC : CANNON.Body.DYNAMIC;
    body.mass = on ? 0 : 1;
    body.updateMassProperties();
    body.velocity.set(0, 0, 0);
    body.angularVelocity.set(0, 0, 0);
    if (!on) body.wakeUp();
  }

  function clear(){
    if (_held && _held.body) setKinematic(_held.body, false);
    _held = null;
    for (const l of links) world.removeBody(l.body);
    links.length = 0;
  }

  function step(dt, heldMesh){
    const heldLink = heldMesh ? links.find(l => l.mesh === heldMesh) : null;

    // Enter/leave "grabbed" state. A grabbed body becomes KINEMATIC (infinite
    // mass) so it shoves the other bodies out of the way instead of passing
    // through them, and is released back to a normal falling body on drop.
    if (heldLink !== _held){
      if (_held && _held.body) setKinematic(_held.body, false);
      if (heldLink && heldLink.body){ setKinematic(heldLink.body, true); _heldPrev.copy(heldLink.body.position); }
      _held = heldLink;
    }

    const d = Math.min(0.05, dt || 1 / 60);

    if (heldLink){
      // Drive the grabbed body from the mesh (moved by the gizmo). A velocity
      // derived from the frame's motion lets the solver push others correctly.
      const m = heldLink.mesh, b = heldLink.body;
      const inv = d > 0 ? 1 / d : 0;
      b.velocity.set((m.position.x - _heldPrev.x) * inv, (m.position.y - _heldPrev.y) * inv, (m.position.z - _heldPrev.z) * inv);
      b.position.set(m.position.x, m.position.y, m.position.z);
      const q = m.quaternion; b.quaternion.set(q.x, q.y, q.z, q.w);
      b.wakeUp();
      _heldPrev.set(m.position.x, m.position.y, m.position.z);
    }

    world.step(1 / 60, d, 4);

    for (const l of links){
      if (l === heldLink) continue; // the gizmo owns the grabbed mesh's transform
      const p = l.body.position, q = l.body.quaternion;
      l.mesh.position.set(p.x, p.y, p.z);
      l.mesh.quaternion.set(q.x, q.y, q.z, q.w);
    }
  }

  function setGroundY(y){ groundBody.position.set(0, y, 0); }

  return { world, addBody, clear, step, setGroundY, links };
}
