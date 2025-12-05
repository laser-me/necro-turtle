import type { Quest, Entity } from './types';

// Create a graveyard maze with walls and gravestones
function createGraveyardMaze(): Entity[] {
  const entities: Entity[] = [];
  const gridSize = 50; // Size of each grid cell
  const startX = 100;
  const startY = 100;
  const cols = 12;
  const rows = 8;
  
  // Add walls around the perimeter
  // Top and bottom walls
  for (let col = 0; col <= cols; col++) {
    const x = startX + col * gridSize;
    // Top wall
    entities.push({
      id: `wall-top-${col}`,
      type: 'obstacle',
      position: { x, y: startY },
      radius: 20,
      active: true,
      sprite: '🧱'
    });
    // Bottom wall
    entities.push({
      id: `wall-bottom-${col}`,
      type: 'obstacle',
      position: { x, y: startY + rows * gridSize },
      radius: 20,
      active: true,
      sprite: '🧱'
    });
  }
  
  // Left and right walls (excluding corners already added)
  for (let row = 1; row < rows; row++) {
    const y = startY + row * gridSize;
    // Left wall (with entrance at row 1)
    if (row !== 1) {
      entities.push({
        id: `wall-left-${row}`,
        type: 'obstacle',
        position: { x: startX, y },
        radius: 20,
        active: true,
        sprite: '🧱'
      });
    }
    // Right wall
    entities.push({
      id: `wall-right-${row}`,
      type: 'obstacle',
      position: { x: startX + cols * gridSize, y },
      radius: 20,
      active: true,
      sprite: '🧱'
    });
  }
  
  // Add gravestones in a maze pattern (avoiding entrance and center)
  const gravestonePositions = [
    // Row 2
    { col: 2, row: 2 }, { col: 4, row: 2 }, { col: 6, row: 2 }, { col: 8, row: 2 }, { col: 10, row: 2 },
    // Row 3
    { col: 2, row: 3 }, { col: 8, row: 3 }, { col: 10, row: 3 },
    // Row 4 (center row - leave space for coffin)
    { col: 2, row: 4 }, { col: 4, row: 4 }, { col: 8, row: 4 }, { col: 10, row: 4 },
    // Row 5
    { col: 2, row: 5 }, { col: 4, row: 5 }, { col: 10, row: 5 },
    // Row 6
    { col: 2, row: 6 }, { col: 4, row: 6 }, { col: 6, row: 6 }, { col: 8, row: 6 }, { col: 10, row: 6 }
  ];
  
  gravestonePositions.forEach((pos, index) => {
    entities.push({
      id: `gravestone-${index}`,
      type: 'obstacle',
      position: {
        x: startX + pos.col * gridSize,
        y: startY + pos.row * gridSize
      },
      radius: 18,
      active: true,
      sprite: '🪦'
    });
  });
  
  // Add the ancient coffin at the center
  entities.push({
    id: 'ancient-coffin',
    type: 'building',
    position: { x: startX + 6 * gridSize, y: startY + 4 * gridSize },
    radius: 25,
    active: true,
    sprite: '⚰️'
  });
  
  return entities;
}

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
      startAngle: 0,
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
      startAngle: 0,
      successMessage: 'All demons have been banished! The realm is safe.',
      hints: [
        'Navigate to each demon location',
        'Use banishDemon() when close to a demon',
        'Demons are at (250,200), (550,200), (400,450)'
      ]
    },
    {
      id: 'graveyard-resurrection',
      name: 'Graveyard Maze',
      description: 'Navigate through the graveyard maze to reach the ancient coffin (⚰️), avoiding gravestones (🪦)',
      objectives: [
        {
          type: 'reach',
          target: 'graveyard',
          count: 1,
          current: 0,
          completed: false,
          description: 'Reach the ancient coffin (⚰️) at the center'
        }
      ],
      entities: createGraveyardMaze(),
      startPosition: { x: 150, y: 150 },
      startAngle: 0,
      successMessage: 'You reached the ancient coffin! The resurrection ritual is complete!',
      hints: [
        'Turtle starts at the graveyard entrance (150, 150)',
        'Ancient coffin (⚰️) is at the center (400, 300) - purple glow',
        'Gravestones (🪦) block your path - navigate around them',
        'The graveyard is a 12x8 grid with walls around it',
        'Navigate to the coffin to complete the quest automatically',
        'Try using summon() and twist() to navigate the maze',
        'Or use haunt(400, 300) to teleport directly (but that\'s cheating!)'
      ]
    }
  ];
}
