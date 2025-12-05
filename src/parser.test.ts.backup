import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Parser } from './parser';
import { NecromancyAPI } from './necromancy';
import { Turtle } from './turtle';
import { GameManager } from './game';

describe('Parser', () => {
  let parser: Parser;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let turtle: Turtle;

  beforeEach(() => {
    // Create mock canvas
    canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    
    // Mock the 2D context since happy-dom doesn't support it
    const mockGradient = {
      addColorStop: () => {}
    };
    
    ctx = {
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
      globalAlpha: 1,
      shadowBlur: 0,
      shadowColor: '',
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fill: () => {},
      arc: () => {},
      clearRect: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      setTransform: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      fillText: () => {},
      strokeText: () => {},
      measureText: () => ({ width: 0 }),
      drawImage: () => {},
      createRadialGradient: () => mockGradient,
      createLinearGradient: () => mockGradient,
      getImageData: () => ({ data: [], width: 0, height: 0 }),
      putImageData: () => {}
    } as any;

    turtle = new Turtle(canvas, ctx);
    const gameManager = new GameManager();
    const api = new NecromancyAPI(turtle, gameManager);
    
    // Set animation speed to 0 for instant execution in tests
    api.setAnimationSpeed(0);
    
    parser = new Parser(api);
  });

  afterEach(() => {
    // Clear any pending animations
    turtle.clearAnimationQueue();
  });

  describe('Comment Handling', () => {
    it('should allow single-line comments', async () => {
      const code = `// Draw a pentagram
summon(100);`;
      const result = await parser.execute(code);
      expect(result.success).toBe(true);
    });

    it('should allow multi-line comments', async () => {
      const code = `/* This is a
multi-line comment */
summon(100);`;
      const result = await parser.execute(code);
      expect(result.success).toBe(true);
    });

    it('should allow comments with special characters', async () => {
      const code = `// Draw a pentagram (5-pointed star)
ritual(5, () => {
  summon(150);
  twist(144);
});`;
      const result = await parser.execute(code);
      expect(result.success).toBe(true);
    }, 1000);
  });

  describe('Command Validation', () => {
    it('should allow all necromancy commands', async () => {
      const commands = [
        'summon(100);',
        'banish(50);',
        'spin(90);',
        'twist(45);',
        'haunt(400, 300);',
        'raiseSpirit();',
        'bindSpirit();',
        'conjureColor("#00ff88");',
        'setLineWidth(5);',
        'clearGrave();',
        'resurrect();'
      ];

      for (const cmd of commands) {
        const result = await parser.execute(cmd);
        expect(result.success).toBe(true);
      }
    });

    it('should allow ritual loops', async () => {
      const code = `ritual(4, () => {
  summon(100);
  twist(90);
});`;
      const result = await parser.execute(code);
      expect(result.success).toBe(true);
    }, 1000);

    it('should allow for loops', async () => {
      const code = `for (let i = 0; i < 5; i++) {
  summon(10);
}`;
      const result = await parser.execute(code);
      expect(result.success).toBe(true);
    });

    it('should block dangerous functions', async () => {
      const dangerousCodes = [
        'eval("summon(100)");',
        'setTimeout(() => summon(100), 1000);',
        'window.location = "http://evil.com";',
        'document.body.innerHTML = "hacked";',
        'fetch("http://evil.com");'
      ];

      for (const code of dangerousCodes) {
        const result = await parser.execute(code);
        expect(result.success).toBe(false);
        expect(result.message).toContain('forbid');
      }
    });

    it('should block unknown functions', async () => {
      const code = 'unknownFunction();';
      const result = await parser.execute(code);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Unknown spell');
    });
  });

  describe('Complex Programs', () => {
    it('should execute pentagram example', async () => {
      const code = `// Draw a pentagram (5-pointed star)
ritual(5, () => {
  summon(150);
  twist(144);
});`;
      const result = await parser.execute(code);
      expect(result.success).toBe(true);
    }, 1000);

    it('should execute spiral example', async () => {
      const code = `// Draw a mystical spiral
for (let i = 0; i < 100; i++) {
  summon(i * 2);
  twist(45);
}`;
      const result = await parser.execute(code);
      expect(result.success).toBe(true);
    });
  });
});
