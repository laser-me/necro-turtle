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
        drawSoul(ctx, x, y, entity.radius, entity.sprite);
        break;
      case 'demon':
        drawDemon(ctx, x, y, entity.radius, entity.sprite);
        break;
      case 'building':
        drawBuilding(ctx, x, y, entity.radius, entity.sprite);
        break;
      case 'obstacle':
        drawObstacle(ctx, x, y, entity.radius, entity.sprite);
        break;
    }

    ctx.restore();
  });
}

function drawSoul(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sprite?: string): void {
  // Glowing green circle
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 255, 136, 0.1)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw sprite
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(sprite || '👻', x, y);
}

function drawDemon(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sprite?: string): void {
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
  ctx.fillText(sprite || '😈', x, y);
}

function drawBuilding(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sprite?: string): void {
  // Purple glow
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(187, 136, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(187, 136, 255, 0.2)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Add border to make it more visible
  ctx.strokeStyle = '#bb88ff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw sprite
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(sprite || '⚰️', x, y);
}

function drawObstacle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sprite?: string): void {
  // Color based on sprite type
  let gradient;
  if (sprite === '🧱') {
    // Walls - darker and more solid
    gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(80, 80, 80, 1.0)');
    gradient.addColorStop(1, 'rgba(60, 60, 60, 0.5)');
  } else {
    // Gravestones - lighter gray
    gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(120, 120, 120, 0.9)');
    gradient.addColorStop(1, 'rgba(90, 90, 90, 0.3)');
  }
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Border
  ctx.strokeStyle = sprite === '🧱' ? '#444' : '#666';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw sprite
  ctx.font = sprite === '🧱' ? '20px Arial' : '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(sprite || '🪦', x, y);
}
