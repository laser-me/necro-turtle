import { describe, it, expect } from 'vitest';

describe('Simple Test', () => {
  console.log('[SIMPLE] Inside describe');
  
  it('should pass', () => {
    console.log('[SIMPLE] Inside test');
    expect(true).toBe(true);
    console.log('[SIMPLE] Test complete');
  });
  
  console.log('[SIMPLE] After it block');
});

console.log('[SIMPLE] After describe');
