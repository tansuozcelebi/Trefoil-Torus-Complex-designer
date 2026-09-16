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

  function clear(){
    for (const l of links) world.removeBody(l.body);
    links.length = 0;
  }

  function step(dt, heldMesh){
    // A grabbed mesh (dragged via the gizmo) pins its body to the mesh so the
    // user controls it while the rest of the simulation runs around it.
    if (heldMesh){
      for (const l of links){
        if (l.mesh !== heldMesh) continue;
        const mp = l.mesh.position, mq = l.mesh.quaternion;
        l.body.position.set(mp.x, mp.y, mp.z);
        l.body.quaternion.set(mq.x, mq.y, mq.z, mq.w);
        l.body.velocity.set(0, 0, 0);
        l.body.angularVelocity.set(0, 0, 0);
        l.body.wakeUp();
      }
    }
    world.step(1 / 60, Math.min(0.05, dt || 1 / 60), 4);
    for (const l of links){
      if (l.mesh === heldMesh) continue; // the gizmo owns the held mesh's transform
      const p = l.body.position, q = l.body.quaternion;
      l.mesh.position.set(p.x, p.y, p.z);
      l.mesh.quaternion.set(q.x, q.y, q.z, q.w);
    }
  }

  function setGroundY(y){ groundBody.position.set(0, y, 0); }

  return { world, addBody, clear, step, setGroundY, links };
}
