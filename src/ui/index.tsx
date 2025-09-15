import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './NavBar';

export function mountNav(onSelect: (tab: string) => void){
  const mount = document.createElement('div');
  document.body.appendChild(mount);
  const root = createRoot(mount);
  root.render(<NavBar onSelect={onSelect} />);
  return () => { root.unmount(); if (mount.parentNode) mount.parentNode.removeChild(mount); };
}

export default mountNav;
