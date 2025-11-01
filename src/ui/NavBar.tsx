import React from 'react';
import { tabs as TabsConfig } from './tabs';
import './NavBar.css';

export type NavProps = {
  onSelect?: (tab: string) => void;
};

export default function NavBar({ onSelect }: NavProps){
  const leftTabs = TabsConfig.left;
  const rightTabs = TabsConfig.right;
  const tailTabs = TabsConfig.tail;
  const Btn = ({ t }: { t: string }) => (
    <button key={t} className="tc-btn" onClick={() => onSelect && onSelect(t)}>
      {t}
    </button>
  );
  return (
    <div className="tc-nav">
      {/* Left group */}
      <div className="tc-group">
        {leftTabs.map(t => <Btn key={t} t={t} />)}
      </div>
      {/* Spacer pushes Object button to far right */}
      <div className="tc-spacer" />
      {/* Right-most Object */}
      <div className="tc-group">
        {rightTabs.map(t => <Btn key={t} t={t} />)}
      </div>
      {/* Tail items (About, Help) after Object */}
      <div className="tc-tail">
        {tailTabs.map(t => <Btn key={t} t={t} />)}
      </div>
    </div>
  );
}
