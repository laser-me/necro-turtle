import type { Ritual } from './types';

export function loadExamples(): Ritual[] {
  return [
    {
      name: 'Summoning Circle',
      description: 'Draw a pentagram pattern',
      code: `// Draw a pentagram (5-pointed star)
ritual(5, () => {
  summon(150);
  twist(144);
});`,
      category: 'freedraw'
    },
    {
      name: 'Spirit Path',
      description: 'Create a spiral pattern',
      code: `// Draw a mystical spiral
for (let i = 0; i < 100; i++) {
  summon(i * 2);
  twist(45);
}`,
      category: 'freedraw'
    },
    {
      name: 'Grave Marker',
      description: 'Draw a cross or tombstone',
      code: `// Draw a cross
summon(100);
banish(50);
spin(90);
summon(50);
banish(100);
summon(50);`,
      category: 'freedraw'
    },
    {
      name: 'Haunted House',
      description: 'Simple house outline',
      code: `// Draw a simple house
// Base
ritual(4, () => {
  summon(100);
  twist(90);
});

// Roof
twist(45);
summon(70);
twist(90);
summon(70);`,
      category: 'freedraw'
    },
    {
      name: "Necromancer's Sigil",
      description: 'Complex mystical symbol',
      code: `// Draw a complex sigil
conjureColor('#bb88ff');
ritual(8, () => {
  summon(80);
  twist(135);
  summon(40);
  spin(90);
  summon(40);
  twist(135);
});`,
      category: 'freedraw'
    }
  ];
}
