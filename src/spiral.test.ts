console.log('[TEST FILE] Starting imports');
import { describe, it, expect, beforeEach } from 'vitest';
console.log('[TEST FILE] Vitest imported');
import { Parser } from './parser';
console.log('[TEST FILE] Parser imported');
import { NecromancyAPI } from './necromancy';
console.log('[TEST FILE] NecromancyAPI imported');
import { Turtle } from './turtle';
console.log('[TEST FILE] Turtle imported');
import { GameManager } from './game';
console.log('[TEST FILE] GameManager imported');
console.log('[TEST FILE] All imports complete');

describe('Spiral Test', () => {
  console.log('[TEST FILE] Inside describe block');
  let parser: Parser;
  console.log('[TEST FILE] Parser variable declared');
  console.log('[TEST FILE] About to declare beforeEach');

  beforeEach(() => {
    console.log('[TEST] ===== beforeEach START =====');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    console.log('[TEST] canvas created');
    
    const ctx = {
      fillStyle: '', strokeStyle: '', lineWidth: 1, font: '', textAlign: '', textBaseline: '',
      beginPath: () => {}, closePath: () => {}, moveTo: () => {}, lineTo: () => {},
      stroke: () => {}, fill: () => {}, arc: () => {}, clearRect: () => {},
      save: () => {}, restore: () => {}, translate: () => {}, rotate: () => {},
      fillRect: () => {}, fillText: () => {}, createRadialGradient: () => ({ addColorStop: () => {} })
    } as any;
    console.log('[TEST] ctx created');

    const turtle = new Turtle(canvas, ctx);
    console.log('[TEST] turtle created');
    const gameManager = new GameManager();
    console.log('[TEST] gameManager created');
    const api = new NecromancyAPI(turtle, gameManager);
    console.log('[TEST] api created');
    api.setAnimationSpeed(0);
    console.log('[TEST] animation speed set');
    parser = new Parser(api);
    console.log('[TEST] parser created, beforeEach complete');
    console.log('[TEST] ===== beforeEach END =====');
  });
  
  console.log('[TEST FILE] beforeEach declared');

  it('should execute spiral with for loop', async () => {
    console.log('[TEST] ===== TEST 1 START =====');
    const code = `// Draw a mystical spiral
for (let i = 0; i < 100; i++) {
  summon(i * 2);
  twist(45);
}`;
    console.log('[TEST] About to execute code');
    const result = await parser.execute(code);
    console.log('[TEST] Code executed, result:', result);
    expect(result.success).toBe(true);
    expect(result.message).toContain('successfully');
    console.log('[TEST] ===== TEST 1 END =====');
  });
  
  console.log('[TEST FILE] Test 1 declared');

  it('should execute simple for loop', async () => {
    console.log('[TEST] ===== TEST 2 START =====');
    const code = `for (let i = 0; i < 4; i++) {
  summon(50);
  twist(90);
}`;
    const result = await parser.execute(code);
    expect(result.success).toBe(true);
  });
  
  console.log('[TEST FILE] Test 2 declared');

  it('should handle for loop with expressions', async () => {
    const code = `for (let i = 0; i < 10; i++) {
  summon(i * 10);
}`;
    const result = await parser.execute(code);
    expect(result.success).toBe(true);
  });
  
  console.log('[TEST FILE] Test 3 declared');

  it('should execute cross drawing code', async () => {
    const code = `// Draw a cross
summon(100);
banish(50);
spin(90);
summon(50);
banish(100);
summon(50);`;
    const result = await parser.execute(code);
    console.log('[TEST] Cross result:', result);
    expect(result.success).toBe(true);
    expect(result.message).toContain('successfully');
  });
});

console.log('[TEST FILE] After describe block');
