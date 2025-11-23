import type { Entity } from './types';

export function renderEntities(
  ctx: CanvasRenderingContext2D,
  entities: Entity[]
): void {
  entities.forEach(entity => {
    if (!entity.active) return;

    const { x, y } = entity.position;

    // Draw entity based on type
    ctx.save();
    
    switch (entity.type) {
      case 'soul':
        drawSoul(ctx, x, y, entity.radius);
        break;
      case 'demon':
        drawDemon(ctx, x, y, entity.radius);
        break;
      case 'building':
        drawBuilding(ctx, x, y, entity.radius);
        break;
      case 'obstacle':
        drawObstacle(ctx, x, y, entity.radius);
        break;
    }

    ctx.restore();
  });
}

function drawSoul(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
  // Glowing green circle
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 255, 136, 0.1)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw sprite if available
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('👻', x, y);
}

function drawDemon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
  // Glowing red circle
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(255, 68, 68, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 68, 68, 0.1)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw sprite
  ctx.font = '28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('😈', x, y);
}

function drawBuilding(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
  // Purple glow
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(187, 136, 255, 0.6)');
  gradient.addColorStop(1, 'rgba(187, 136, 255, 0.1)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw sprite
  ctx.font = '32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🪦', x, y);
}

function drawObstacle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
  // Dark gray obstacle
  ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}
