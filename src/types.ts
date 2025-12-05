// Core Types
export interface Point {
  x: number;
  y: number;
}

export interface TurtleState {
  position: Point;
  angle: number;
  penDown: boolean;
  color: string;
  lineWidth: number;
}

export interface Ritual {
  name: string;
  description: string;
  code: string;
  category: 'freedraw' | 'quest';
}

export interface EffectConfig {
  color: string;
  intensity: number;
  duration: number;
}

// Game System Types
export interface Entity {
  id: string;
  type: 'soul' | 'demon' | 'building' | 'obstacle';
  position: Point;
  radius: number;
  active: boolean;
  sprite?: string;
}

export interface QuestObjective {
  type: 'collect' | 'banish' | 'reach' | 'draw' | 'cast';
  target: string;
  count: number;
  current: number;
  completed: boolean;
  description: string;
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  objectives: QuestObjective[];
  entities: Entity[];
  startPosition: Point;
  startAngle: number;
  successMessage: string;
  hints?: string[];
}

export interface GameState {
  mode: 'freedraw' | 'quest';
  currentQuest: Quest | null;
  originalEntities: Entity[]; // Store original entity state for reset
  score: number;
  soulsCollected: number;
  demonsBanished: number;
  questsCompleted: number;
  commandsUsed: number;
  entities: Entity[];
}

export type NecromancyCommand = (...args: any[]) => void;
