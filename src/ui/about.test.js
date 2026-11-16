import { describe, it, expect, vi } from 'vitest';

vi.stubGlobal('__APP_VERSION__', '0.0.0-test');
vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => {} });

const { getAboutHtml, getHighlights, setAboutStats } = await import('./about.js');
const { languages } = await import('./help.js');
const { OBJECT_TYPES } = await import('../objects/shapes.js');

describe('About page', () => {
  it('builds the highlight cards from the app\'s own counts', () => {
    setAboutStats({ environments: 7, formats: 5 });
    const h = getHighlights('en');
    expect(h.map(c => c.value)).toEqual([OBJECT_TYPES.length, 7, languages.length, 5]);
    expect(h.map(c => c.label)).toEqual(['Shapes', 'Environments', 'Languages', 'Export formats']);
  });

  it('leaves out cards whose count is unknown', () => {
    setAboutStats({ environments: 0, formats: 0 });
    expect(getHighlights('en')).toHaveLength(2);
  });

  it('renders every language with its own strings and no unfilled placeholders', () => {
    setAboutStats({ environments: 7, formats: 5 });
    const en = getAboutHtml('en');
    for (const { code } of languages){
      const html = getAboutHtml(code);
      expect(html).toContain('tc-brag-card');
      expect(html).not.toMatch(/undefined|\{LINK\}/);
      if (code !== 'en') expect(html).not.toBe(en);
    }
  });

  it('falls back to English for an unknown language', () => {
    expect(getAboutHtml('xx')).toBe(getAboutHtml('en'));
  });
});
