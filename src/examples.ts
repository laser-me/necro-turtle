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
      description: 'Spooky haunted manor',
      code: `// Draw a spooky haunted house
conjureColor('#bb88ff');

// Main house base
ritual(4, () => {
  summon(120);
  twist(90);
});

// Roof
spin(45);
summon(85);
twist(90);
summon(85);

// Tower on left
raiseSpirit();
haunt(340, 240);
bindSpirit();
summon(60);
twist(90);
summon(30);
twist(90);
summon(60);

// Tower roof
spin(60);
summon(35);
twist(120);
summon(35);
twist(120);
summon(35);

// Door
raiseSpirit();
haunt(385, 300);
bindSpirit();
conjureColor('#00ff88');
summon(40);
twist(90);
summon(20);
twist(90);
summon(40);
twist(90);
summon(20);

// Windows
raiseSpirit();
haunt(360, 260);
bindSpirit();
ritual(4, () => {
  summon(15);
  twist(90);
});

raiseSpirit();
haunt(420, 260);
bindSpirit();
ritual(4, () => {
  summon(15);
  twist(90);
});`,
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
