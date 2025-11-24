import type { Point, TurtleState, Entity } from './types';
import { renderEntities } from './entities';

export class Turtle {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: TurtleState;
  private trail: Point[] = [];
  private entities: Entity[] = [];

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    
    // Initialize turtle at center
    this.state = {
      position: { x: canvas.width / 2, y: canvas.height / 2 },
      angle: 0,
      penDown: true,
      color: '#00ff88',
      lineWidth: 2
    };
  }

  getState(): TurtleState {
    return { ...this.state };
  }

  getPosition(): Point {
    return { ...this.state.position };
  }

  setEntities(entities: Entity[]): void {
    this.entities = entities;
    this.render();
  }

  render(): void {
    // Clear canvas
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw entities first (background layer)
    if (this.entities.length > 0) {
      renderEntities(this.ctx, this.entities);
    }

    // Draw trail
    if (this.trail.length > 1) {
      this.ctx.strokeStyle = this.state.color;
      this.ctx.lineWidth = this.state.lineWidth;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      
      this.ctx.beginPath();
      this.ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        this.ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      this.ctx.stroke();
    }

    // Draw turtle (skull emoji or simple triangle)
    this.drawTurtle();
  }

  private drawTurtle(): void {
    const { x, y } = this.state.position;
    const angle = this.state.angle;

    this.ctx.save();
    this.ctx.translate(x, y);
    // Rotate: angle 0 = up, so subtract 90 degrees to align with upward direction
    this.ctx.rotate(((angle - 90) * Math.PI) / 180);

    // Draw necromancer turtle (skull with glowing eyes)
    
    // Outer glow
    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
    gradient.addColorStop(0, 'rgba(0, 255, 136, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 20, 0, Math.PI * 2);
    this.ctx.fill();

    // Skull body (rounded triangle pointing forward)
    this.ctx.fillStyle = '#00ff88';
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(15, 0);  // Front point
    this.ctx.lineTo(-8, -8); // Back left
    this.ctx.lineTo(-8, 8);  // Back right
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Draw zombie emoji/icon on top (rotate 90 degrees to face forward)
    this.ctx.save();
    this.ctx.rotate((90 * Math.PI) / 180);
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText('🧟', 0, 0);
    this.ctx.restore();

    // Glowing eyes
    this.ctx.fillStyle = '#00ff88';
    this.ctx.shadowColor = '#00ff88';
    this.ctx.shadowBlur = 5;
    this.ctx.beginPath();
    this.ctx.arc(-2, -2, 1.5, 0, Math.PI * 2);
    this.ctx.arc(2, -2, 1.5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    this.ctx.restore();
  }

  // Movement commands
  forward(distance: number): void {
    // Angle 0 = up (north), so we need to adjust the calculation
    // Convert angle to radians and adjust so 0 degrees = up
    const rad = ((this.state.angle - 90) * Math.PI) / 180;
    const newX = this.state.position.x + distance * Math.cos(rad);
    const newY = this.state.position.y + distance * Math.sin(rad);

    if (this.state.penDown) {
      this.trail.push({ ...this.state.position });
      this.trail.push({ x: newX, y: newY });
    }

    this.state.position = { x: newX, y: newY };
    this.render();
  }

  backward(distance: number): void {
    this.forward(-distance);
  }

  turnLeft(angle: number): void {
    this.state.angle -= angle;
    this.render();
  }

  turnRight(angle: number): void {
    this.state.angle += angle;
    this.render();
  }

  teleport(x: number, y: number): void {
    this.state.position = { x, y };
    this.render();
  }

  // Pen commands
  penUp(): void {
    this.state.penDown = false;
  }

  penDown(): void {
    this.state.penDown = true;
  }

  setColor(color: string): void {
    this.state.color = color;
  }

  setLineWidth(width: number): void {
    this.state.lineWidth = width;
  }

  // Utility commands
  clear(): void {
    this.trail = [];
    this.render();
  }

  reset(): void {
    this.state = {
      position: { x: this.canvas.width / 2, y: this.canvas.height / 2 },
      angle: 0,
      penDown: true,
      color: '#00ff88',
      lineWidth: 2
    };
    this.trail = [];
    this.render();
  }
}
