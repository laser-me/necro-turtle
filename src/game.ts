import type { GameState, Quest, Entity, Point, QuestObjective } from './types';

export class GameManager {
  private state: GameState;

  constructor() {
    this.state = {
      mode: 'freedraw',
      currentQuest: null,
      score: 0,
      soulsCollected: 0,
      demonsBanished: 0,
      questsCompleted: 0,
      commandsUsed: 0,
      entities: []
    };
  }

  getState(): GameState {
    return { ...this.state };
  }

  setMode(mode: 'freedraw' | 'quest'): void {
    this.state.mode = mode;
    if (mode === 'freedraw') {
      this.state.currentQuest = null;
      this.state.entities = [];
    }
  }

  loadQuest(quest: Quest): void {
    this.state.mode = 'quest';
    this.state.currentQuest = quest;
    this.state.entities = [...quest.entities];
    this.state.commandsUsed = 0;
  }

  incrementCommands(): void {
    this.state.commandsUsed++;
  }

  collectSoulAt(position: Point): boolean {
    const soul = this.findEntityAt(position, 'soul');
    if (soul && soul.active) {
      soul.active = false;
      this.state.soulsCollected++;
      this.state.score += 10;
      this.updateObjectives('collect', 'soul');
      return true;
    }
    return false;
  }

  banishDemonAt(position: Point): boolean {
    const demon = this.findEntityAt(position, 'demon');
    if (demon && demon.active) {
      demon.active = false;
      this.state.demonsBanished++;
      this.state.score += 20;
      this.updateObjectives('banish', 'demon');
      return true;
    }
    return false;
  }

  private findEntityAt(position: Point, type: Entity['type']): Entity | null {
    return this.state.entities.find(entity => 
      entity.type === type &&
      entity.active &&
      this.checkCollision(position, entity.position, entity.radius)
    ) || null;
  }

  private checkCollision(pos1: Point, pos2: Point, radius: number): boolean {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius;
  }

  private updateObjectives(type: QuestObjective['type'], target: string): void {
    if (!this.state.currentQuest) return;

    this.state.currentQuest.objectives.forEach(objective => {
      if (objective.type === type && objective.target === target && !objective.completed) {
        objective.current++;
        if (objective.current >= objective.count) {
          objective.completed = true;
        }
      }
    });

    this.checkQuestCompletion();
  }

  private checkQuestCompletion(): void {
    if (!this.state.currentQuest) return;

    const allCompleted = this.state.currentQuest.objectives.every(obj => obj.completed);
    if (allCompleted) {
      this.state.questsCompleted++;
      
      // Calculate efficiency bonus
      const soulCount = this.state.currentQuest.entities.filter(e => e.type === 'soul').length;
      const optimalCommands = soulCount * 2; // haunt + collectSoul per soul
      const efficiency = Math.max(0, 100 - (this.state.commandsUsed - optimalCommands) * 5);
      
      this.state.score += 100 + efficiency;
      
      console.log(`🎉 ${this.state.currentQuest.successMessage}`);
      console.log(`📊 Commands used: ${this.state.commandsUsed}`);
      console.log(`⭐ Efficiency bonus: +${efficiency} points`);
      console.log(`💯 Total score: ${this.state.score}`);
    }
  }

  getQuestStatus(): string {
    if (!this.state.currentQuest) {
      return 'No active quest';
    }

    const objectives = this.state.currentQuest.objectives
      .map(obj => `${obj.completed ? '✓' : '○'} ${obj.description} (${obj.current}/${obj.count})`)
      .join('\n');

    return `Quest: ${this.state.currentQuest.name}\n${objectives}`;
  }

  getEntities(): Entity[] {
    return [...this.state.entities];
  }

  reset(): void {
    const mode = this.state.mode;
    const currentQuest = this.state.currentQuest;
    
    this.state = {
      mode,
      currentQuest,
      score: 0,
      soulsCollected: 0,
      demonsBanished: 0,
      questsCompleted: 0,
      commandsUsed: 0,
      entities: currentQuest ? [...currentQuest.entities] : []
    };
  }
}
