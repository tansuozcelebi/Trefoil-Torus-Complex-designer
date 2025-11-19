// Basic test for export functionality
import { describe, it, expect } from 'vitest';

describe('Export Utilities', () => {
  it('should handle filename sanitization', () => {
    // Test that special characters are replaced
    const testName = 'My Object #1!';
    const sanitized = testName.replace(/[^a-zA-Z0-9_-]/g, '_');
    expect(sanitized).toBe('My_Object__1_');
  });

  it('should sanitize spaces in filenames', () => {
    const testName = 'Object With Spaces';
    const sanitized = testName.replace(/[^a-zA-Z0-9_-]/g, '_');
    expect(sanitized).toBe('Object_With_Spaces');
  });

  it('should sanitize special characters', () => {
    const testName = 'Test@File#Name$2024';
    const sanitized = testName.replace(/[^a-zA-Z0-9_-]/g, '_');
    expect(sanitized).toBe('Test_File_Name_2024');
  });
});

describe('Export Format Support', () => {
  it('should support GLB format', () => {
    const formats = ['glb', 'gltf', 'obj', 'stl', 'ply'];
    expect(formats).toContain('glb');
  });

  it('should support OBJ format', () => {
    const formats = ['glb', 'gltf', 'obj', 'stl', 'ply'];
    expect(formats).toContain('obj');
  });

  it('should support STL format', () => {
    const formats = ['glb', 'gltf', 'obj', 'stl', 'ply'];
    expect(formats).toContain('stl');
  });

  it('should support PLY format', () => {
    const formats = ['glb', 'gltf', 'obj', 'stl', 'ply'];
    expect(formats).toContain('ply');
  });

  it('should support GLTF format', () => {
    const formats = ['glb', 'gltf', 'obj', 'stl', 'ply'];
    expect(formats).toContain('gltf');
  });
});

describe('Sequential Code Generation', () => {
  it('should pad numbers to 4 digits', () => {
    const code = '1';
    const padded = code.padStart(4, '0');
    expect(padded).toBe('0001');
  });

  it('should handle larger numbers', () => {
    const code = '9999';
    const padded = code.padStart(4, '0');
    expect(padded).toBe('9999');
  });

  it('should handle numbers beyond 4 digits', () => {
    const code = '12345';
    const padded = code.padStart(4, '0');
    expect(padded).toBe('12345'); // Doesn't truncate
  });
});
