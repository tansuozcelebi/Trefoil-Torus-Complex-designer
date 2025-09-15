// Minimal ambient declarations to allow the R3F Seascape TSX to type-check
// This file is a lightweight workaround until you install @react-three/fiber and @react-three/drei

declare module 'babel-plugin-glsl/macro' {
  const glsl: (strings: TemplateStringsArray) => string;
  export default glsl;
}

// Minimal module shims for react-three-fiber and drei
declare module '@react-three/fiber' {
  import * as React from 'react';
  export const Canvas: any;
  export const useFrame: any;
  export const extend: any;
  export const useThree: any;
  export const act: any;
  export default Canvas;
}

declare module '@react-three/drei' {
  export function shaderMaterial(uniforms: any, vertexShader: string, fragmentShader: string): any;
  export const OrbitControls: any;
  export const Html: any;
  export default any;
}

declare namespace JSX {
  interface IntrinsicElements {
    seascapeMaterial: any;
    mesh: any;
    planeGeometry: any;
  }
}
