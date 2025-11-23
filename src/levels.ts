import type { Quest } from './types';

export function loadQuests(): Quest[] {
  return [
    {
      id: 'soul-collector',
      name: 'Soul Collector',
      description: 'Collect all 5 souls scattered across the realm',
      objectives: [
        {
          type: 'collect',
          target: 'soul',
          count: 5,
          current: 0,
          completed: false,
          description: 'Collect all souls'
        }
      ],
      entities: [
        { id: 'soul1', type: 'soul', position: { x: 200, y: 150 }, radius: 30, active: true, sprite: '👻' },
        { id: 'soul2', type: 'soul', position: { x: 600, y: 150 }, radius: 30, active: true, sprite: '👻' },
        { id: 'soul3', type: 'soul', position: { x: 200, y: 450 }, radius: 30, active: true, sprite: '👻' },
        { id: 'soul4', type: 'soul', position: { x: 600, y: 450 }, radius: 30, active: true, sprite: '👻' },
        { id: 'soul5', type: 'soul', position: { x: 400, y: 300 }, radius: 30, active: true, sprite: '👻' }
      ],
      startPosition: { x: 400, y: 300 },
      successMessage: 'All souls have been collected! The spirits are at peace.',
      hints: [
        'Use haunt(x, y) to teleport to soul locations',
        'Use collectSoul() when near a soul',
        'Check coordinates: souls are at (200,150), (600,150), (200,450), (600,450), (400,300)'
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
