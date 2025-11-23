import type { Point } from './types';

export function checkCollision(pos1: Point, pos2: Point, radius: number): boolean {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= radius;
}

export function distanceBetween(pos1: Point, pos2: Point): number {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
}
