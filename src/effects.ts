import type { Point, EffectConfig } from './types';

export class ParticleEffect {
  private particles: Particle[] = [];

  createBurst(position: Point, config: EffectConfig): void {
    const particleCount = config.intensity * 10;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = 2 + Math.random() * 3;
      
      this.particles.push({
        position: { ...position },
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        },
        color: config.color,
        life: config.duration,
        maxLife: config.duration
      });
    }
  }

  update(): void {
    this.particles = this.particles.filter(particle => {
      particle.position.x += particle.velocity.x;
      particle.position.y += particle.velocity.y;
      particle.life--;
      return particle.life > 0;
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
      ctx.beginPath();
      ctx.arc(particle.position.x, particle.position.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

interface Particle {
  position: Point;
  velocity: Point;
  color: string;
  life: number;
  maxLife: number;
}
