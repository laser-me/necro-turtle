console.log('[NECROMANCY MODULE] Loading');
import type { Turtle } from './turtle';
console.log('[NECROMANCY MODULE] Turtle type imported');
import type { GameManager } from './game';
console.log('[NECROMANCY MODULE] GameManager type imported');

export class NecromancyAPI {
  private turtle: Turtle;
  private gameManager: GameManager;
  private onCommandExecute?: (commandName: string) => void;

  constructor(turtle: Turtle, gameManager: GameManager) {
    console.log('[NECROMANCY] Constructor start');
    this.turtle = turtle;
    this.gameManager = gameManager;
    console.log('[NECROMANCY] Constructor complete');
  }

  setAnimationSpeed(speed: number): void {
    this.turtle.setAnimationSpeed(speed);
  }

  async executeAnimations(): Promise<void> {
    await this.turtle.executeAnimations();
    
    // After all animations complete, check if turtle reached any goals
    const position = this.turtle.getPosition();
    this.gameManager.checkReachedBuilding(position);
  }

  setCommandCallback(callback: (commandName: string) => void): void {
    this.onCommandExecute = callback;
  }

  private notifyCommand(commandName: string): void {
    if (this.onCommandExecute) {
      this.onCommandExecute(commandName);
    }
  }

  // Movement commands
  summon = (distance: number): void => {
    this.notifyCommand('summon');
    this.turtle.forward(distance);
    this.gameManager.incrementCommands();
  };

  banish = (distance: number): void => {
    this.notifyCommand('banish');
    this.turtle.backward(distance);
    this.gameManager.incrementCommands();
  };

  turnLeft = (angle: number): void => {
    this.notifyCommand('turnLeft');
    this.turtle.turnLeft(angle);
    this.gameManager.incrementCommands();
  };

  turnRight = (angle: number): void => {
    this.notifyCommand('turnRight');
    this.turtle.turnRight(angle);
    this.gameManager.incrementCommands();
  };

  // Primary necromantic rotation commands
  spin = (angle: number): void => {
    this.notifyCommand('spin');
    this.turtle.turnLeft(angle);
    this.gameManager.incrementCommands();
  };

  twist = (angle: number): void => {
    this.notifyCommand('twist');
    this.turtle.turnRight(angle);
    this.gameManager.incrementCommands();
  };

  // Additional necromantic rotation aliases
  rotateWiddershins = (angle: number): void => {
    this.turtle.turnLeft(angle);
    this.gameManager.incrementCommands();
  };

  rotateDeosil = (angle: number): void => {
    this.turtle.turnRight(angle);
    this.gameManager.incrementCommands();
  };

  turnToShadows = (angle: number): void => {
    this.turtle.turnLeft(angle);
    this.gameManager.incrementCommands();
  };

  turnToLight = (angle: number): void => {
    this.turtle.turnRight(angle);
    this.gameManager.incrementCommands();
  };

  haunt = (x: number, y: number): void => {
    this.notifyCommand('haunt');
    this.turtle.teleport(x, y);
    this.gameManager.incrementCommands();
  };

  // Drawing commands
  raiseSpirit = (): void => {
    this.notifyCommand('raiseSpirit');
    this.turtle.penUp();
    this.gameManager.incrementCommands();
  };

  bindSpirit = (): void => {
    this.notifyCommand('bindSpirit');
    this.turtle.penDown();
    this.gameManager.incrementCommands();
  };

  conjureColor = (color: string): void => {
    this.notifyCommand('conjureColor');
    this.turtle.setColor(color);
    this.gameManager.incrementCommands();
  };

  setLineWidth = (width: number): void => {
    this.notifyCommand('setLineWidth');
    this.turtle.setLineWidth(width);
    this.gameManager.incrementCommands();
  };

  // Utility commands
  ritual = (count: number, callback: () => void): void => {
    this.notifyCommand('ritual');
    for (let i = 0; i < count; i++) {
      callback();
    }
    this.gameManager.incrementCommands();
  };

  clearGrave = (): void => {
    this.notifyCommand('clearGrave');
    this.turtle.clear();
    this.gameManager.incrementCommands();
  };

  resurrect = (): void => {
    this.notifyCommand('resurrect');
    this.turtle.reset();
    this.gameManager.incrementCommands();
  };

  // Game commands
  castSpell = (spellName: string): void => {
    this.notifyCommand('castSpell');
    console.log(`Casting spell: ${spellName}`);
    this.gameManager.incrementCommands();
    // TODO: Implement spell effects
  };

  collectSoul = (): void => {
    this.notifyCommand('collectSoul');
    const position = this.turtle.getPosition();
    const collected = this.gameManager.collectSoulAt(position);
    if (collected) {
      console.log('Soul collected! +10 points');
    } else {
      console.log('No soul at this location');
    }
    this.gameManager.incrementCommands();
  };

  banishDemon = (): void => {
    this.notifyCommand('banishDemon');
    const position = this.turtle.getPosition();
    const banished = this.gameManager.banishDemonAt(position);
    if (banished) {
      console.log('Demon banished! +20 points');
    } else {
      console.log('No demon at this location');
    }
    this.gameManager.incrementCommands();
  };

  checkQuest = (): void => {
    this.notifyCommand('checkQuest');
    const status = this.gameManager.getQuestStatus();
    console.log('Quest Status:', status);
    this.gameManager.incrementCommands();
  };

  getPosition = (): { x: number; y: number } => {
    this.notifyCommand('getPosition');
    return this.turtle.getPosition();
  };

  getSoulPositions = (): Array<{ x: number; y: number }> => {
    this.notifyCommand('getSoulPositions');
    const entities = this.gameManager.getEntities();
    const souls = entities.filter(e => e.type === 'soul' && e.active);
    const positions = souls.map(s => ({ x: Math.round(s.position.x), y: Math.round(s.position.y) }));
    console.log('Soul positions:', positions);
    return positions;
  };

  // Get all commands for parser
  getCommands(): Record<string, any> {
    return {
      // Movement
      summon: this.summon,
      banish: this.banish,
      spin: this.spin,
      twist: this.twist,
      turnLeft: this.turnLeft,
      turnRight: this.turnRight,
      rotateWiddershins: this.rotateWiddershins,
      rotateDeosil: this.rotateDeosil,
      turnToShadows: this.turnToShadows,
      turnToLight: this.turnToLight,
      haunt: this.haunt,
      // Drawing
      raiseSpirit: this.raiseSpirit,
      bindSpirit: this.bindSpirit,
      conjureColor: this.conjureColor,
      setLineWidth: this.setLineWidth,
      // Utility
      ritual: this.ritual,
      clearGrave: this.clearGrave,
      resurrect: this.resurrect,
      // Game
      castSpell: this.castSpell,
      collectSoul: this.collectSoul,
      banishDemon: this.banishDemon,
      checkQuest: this.checkQuest,
      getPosition: this.getPosition,
      getSoulPositions: this.getSoulPositions
    };
  }
}
