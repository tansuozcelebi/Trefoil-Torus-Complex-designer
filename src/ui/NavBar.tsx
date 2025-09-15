import React from 'react';

export type NavProps = {
  onSelect?: (tab: string) => void;
};

export default function NavBar({ onSelect }: NavProps){
  const tabs = ['Home','Environment','Object','About','Help'];
  return (
    <div style={{ position: 'fixed', left: 12, top: 12, zIndex: 2000, display:'flex', gap:6, background:'rgba(20,20,22,0.7)', padding:6, borderRadius:8 }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onSelect && onSelect(t)} style={{ padding:'6px 10px', border:'none', background:'transparent', color:'#fff', cursor:'pointer', borderRadius:4 }}>
          {t}
        </button>
      ))}
    </div>
  );
}
