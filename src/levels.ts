import type { Quest, Entity } from './types';

// Generate random soul positions
function generateRandomSouls(count: number): Entity[] {
  const souls: Entity[] = [];
  const minDistance = 80; // Minimum distance between souls
  const centerX = 400; // Turtle starting position
  const centerY = 300;
  const minDistanceFromCenter = 120; // Minimum distance from turtle start
  
  for (let i = 0; i < count; i++) {
    let position: { x: number; y: number };
    let attempts = 0;
    
    do {
      position = {
        x: 100 + Math.random() * 600, // Random x between 100-700
        y: 100 + Math.random() * 400  // Random y between 100-500
      };
      
      attempts++;
    } while (attempts < 50 && (
      // Too close to center (turtle start position)
      Math.sqrt(Math.pow(position.x - centerX, 2) + Math.pow(position.y - centerY, 2)) < minDistanceFromCenter ||
      // Too close to other souls
      souls.some(soul => {
        const dx = soul.position.x - position.x;
        const dy = soul.position.y - position.y;
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      })
    ));
    
    souls.push({
      id: `soul${i + 1}`,
      type: 'soul',
      position,
      radius: 30,
      active: true,
      sprite: '👻'
    });
  }
  
  return souls;
}

export function loadQuests(): Quest[] {
  const soulCount = 7; // Number of souls to collect
  const souls = generateRandomSouls(soulCount);
  
  return [
    {
      id: 'soul-collector',
      name: `Soul Collector (${soulCount} souls)`,
      description: `Write ONE command to collect all ${soulCount} randomly placed souls. Score: fewer commands = better!`,
      objectives: [
        {
          type: 'collect',
          target: 'soul',
          count: soulCount,
          current: 0,
          completed: false,
          description: `Collect all ${soulCount} souls with minimal commands`
        }
      ],
      entities: souls,
      startPosition: { x: 400, y: 300 },
      successMessage: `All ${soulCount} souls collected! Check your command count for efficiency.`,
      hints: [
        'Write a loop or algorithm to visit all souls',
        'Use haunt(x, y) to teleport to each soul',
        'Call collectSoul() after each haunt',
        'Try to do it in ONE command execution!',
        'Bonus: Can you collect them in order (nearest first)?'
      ]
    },
    {
      id: 'demon-hunter',
      name: 'Demon Hunter',
      description: 'Banish all demons from the realm',
      objectives: [
        {
          type: 'banish',
          target: 'demon',
          count: 3,
          current: 0,
          completed: false,
          description: 'Banish all demons'
        }
      ],
      entities: [
        { id: 'demon1', type: 'demon', position: { x: 250, y: 200 }, radius: 40, active: true, sprite: '😈' },
        { id: 'demon2', type: 'demon', position: { x: 550, y: 200 }, radius: 40, active: true, sprite: '😈' },
        { id: 'demon3', type: 'demon', position: { x: 400, y: 450 }, radius: 40, active: true, sprite: '😈' }
      ],
      startPosition: { x: 400, y: 300 },
      successMessage: 'All demons have been banished! The realm is safe.',
      hints: [
        'Navigate to each demon location',
        'Use banishDemon() when close to a demon',
        'Demons are at (250,200), (550,200), (400,450)'
      ]
    },
    {
      id: 'graveyard-resurrection',
      name: 'Graveyard Resurrection',
      description: 'Navigate to the graveyard and perform the resurrection ritual',
      objectives: [
        {
          type: 'reach',
          target: 'graveyard',
          count: 1,
          current: 0,
          completed: false,
          description: 'Reach the graveyard'
        }
      ],
      entities: [
        { id: 'graveyard', type: 'building', position: { x: 650, y: 500 }, radius: 50, active: true, sprite: '🪦' },
        { id: 'obstacle1', type: 'obstacle', position: { x: 400, y: 350 }, radius: 30, active: true },
        { id: 'obstacle2', type: 'obstacle', position: { x: 500, y: 400 }, radius: 30, active: true }
      ],
      startPosition: { x: 150, y: 100 },
      successMessage: 'The ancient one has been resurrected!',
      hints: [
        'Navigate around obstacles to reach the graveyard',
        'The graveyard is at (650, 500)',
        'Use a combination of summon() and turn commands'
      ]
    }
  ];
}
