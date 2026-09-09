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

  function addBody(mesh, radius){
    const body = new CANNON.Body({
      mass: 1,
      material: mat,
      shape: new CANNON.Sphere(Math.max(0.25, radius)),
      position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
      linearDamping: 0.05,
      angularDamping: 0.2
    });
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

  function step(dt){
    world.step(1 / 60, Math.min(0.05, dt || 1 / 60), 4);
    for (const l of links){
      const p = l.body.position, q = l.body.quaternion;
      l.mesh.position.set(p.x, p.y, p.z);
      l.mesh.quaternion.set(q.x, q.y, q.z, q.w);
    }
  }

  function setGroundY(y){ groundBody.position.set(0, y, 0); }

  return { world, addBody, clear, step, setGroundY, links };
}
