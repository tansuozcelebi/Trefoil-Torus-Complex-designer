import * as THREE from 'three';

export function createSea(groundY){
  const geo = new THREE.PlaneGeometry(200, 200, 1, 1);
  const seaUniforms = {
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    iMouse: { value: new THREE.Vector2(0, 0) }
  };

  const frag = `precision mediump float; uniform float iTime; uniform vec2 iResolution; uniform vec2 iMouse; #define PI 3.141592 #define SEA_HEIGHT 0.6 #define SEA_CHOPPY 4.0 #define SEA_SPEED 0.8 #define SEA_FREQ 0.16 mat2 octave_m = mat2(1.6,1.2,-1.2,1.6); float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); } float noise2(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); vec2 u = f*f*(3.0-2.0*f); return -1.0 + 2.0 * mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x), mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y); } float sea_octave(vec2 uv, float choppy){ uv += noise2(uv); vec2 wv = 1.0 - abs(sin(uv)); vec2 swv = abs(cos(uv)); wv = mix(wv, swv, wv); return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy); } float mapSea(vec3 p){ float freq = SEA_FREQ; float amp = SEA_HEIGHT; float choppy = SEA_CHOPPY; vec2 uv = p.xz; uv.x *= 0.75; float d; float h = 0.0; float SEA_TIME = 1.0 + iTime * SEA_SPEED; for(int i=0;i<3;i++){ d = sea_octave((uv+SEA_TIME)*freq, choppy); d += sea_octave((uv-SEA_TIME)*freq, choppy); h += d * amp; uv = octave_m * uv; freq *= 1.9; amp *= 0.22; choppy = mix(choppy, 1.0, 0.2); } return p.y - h; } vec3 getSkyColor(vec3 e){ e.y = (max(e.y,0.0)*0.8+0.2)*0.8; return vec3(pow(1.0-e.y,2.0), 1.0-e.y, 0.6+(1.0-e.y)*0.4) * 1.1; } float diffuseN(vec3 n, vec3 l, float p){ return pow(dot(n,l)*0.4 + 0.6, p); } float specularN(vec3 n, vec3 l, vec3 e, float s){ float nrm = (s + 8.0) / (PI * 8.0); return pow(max(dot(reflect(e,n), l), 0.0), s) * nrm; } vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist){ float fresnel = clamp(1.0 - dot(n, -eye), 0.0, 1.0); fresnel = min(fresnel * fresnel * fresnel, 0.5); vec3 reflected = getSkyColor(reflect(eye, n)); vec3 SEA_BASE = vec3(0.0,0.09,0.18); vec3 SEA_WATER_COLOR = vec3(0.8,0.9,0.6)*0.6; vec3 refracted = SEA_BASE + diffuseN(n, l, 80.0) * SEA_WATER_COLOR * 0.12; vec3 color = mix(refracted, reflected, fresnel); float atten = max(1.0 - dot(dist, dist) * 0.001, 0.0); color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten; color += specularN(n, l, eye, 600.0 * inversesqrt(dot(dist,dist))); return color; } vec3 getNormal(vec3 p){ float eps = 0.1 / iResolution.x; vec3 n; n.y = mapSea(p); n.x = mapSea(vec3(p.x+eps,p.y,p.z)) - n.y; n.z = mapSea(vec3(p.x,p.y,p.z+eps)) - n.y; n.y = eps; return normalize(n); } vec3 getPixel(vec2 fragCoord, float time){ vec2 uv = fragCoord / iResolution.xy; uv = uv * 2.0 - 1.0; uv.x *= iResolution.x / iResolution.y; vec3 ang = vec3(sin(time*3.0)*0.1, sin(time)*0.2+0.3, time); vec3 ori = vec3(0.0,3.5,time*5.0); vec3 dir = normalize(vec3(uv.xy, -2.0)); dir.z += length(uv) * 0.14; float t = 0.0; float maxT = 1000.0; float h = mapSea(ori + dir * maxT); vec3 hit = ori + dir * maxT; vec3 dist = hit - ori; vec3 n = getNormal(hit); vec3 light = normalize(vec3(0.0,1.0,0.8)); return mix(getSkyColor(dir), getSeaColor(hit, n, light, dir, dist), pow(smoothstep(0.0,-0.02,dir.y),0.2)); } void main(){ vec2 fragCoord = gl_FragCoord.xy; float time = iTime * 0.3 + iMouse.x*0.01; vec3 color = getPixel(fragCoord, time); gl_FragColor = vec4(pow(color, vec3(0.65)), 1.0); }`;

  const vert = `precision mediump float; attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

  const mat = new THREE.ShaderMaterial({
    uniforms: seaUniforms,
    vertexShader: vert,
    fragmentShader: frag,
    transparent: false,
    side: THREE.DoubleSide
  });

  const seaMesh = new THREE.Mesh(geo, mat);
  seaMesh.rotation.x = -Math.PI/2;
  seaMesh.position.y = groundY;
  seaMesh.receiveShadow = true;

  function setTime(t){ seaUniforms.iTime.value = t; }
  function resize(w,h){ seaUniforms.iResolution.value.set(w,h); }

  return { mesh: seaMesh, setTime, resize, dispose: () => { seaMesh.geometry.dispose(); mat.dispose(); } };
}
