import type { Turtle } from './turtle';
import type { GameManager } from './game';

export class NecromancyAPI {
  private turtle: Turtle;
  private gameManager: GameManager;

  constructor(turtle: Turtle, gameManager: GameManager) {
    this.turtle = turtle;
    this.gameManager = gameManager;
  }

  // Movement commands
  summon = (distance: number): void => {
    this.turtle.forward(distance);
    this.gameManager.incrementCommands();
  };

  banish = (distance: number): void => {
    this.turtle.backward(distance);
    this.gameManager.incrementCommands();
  };

  turnLeft = (angle: number): void => {
    this.turtle.turnLeft(angle);
    this.gameManager.incrementCommands();
  };

  turnRight = (angle: number): void => {
    this.turtle.turnRight(angle);
    this.gameManager.incrementCommands();
  };

  haunt = (x: number, y: number): void => {
    this.turtle.teleport(x, y);
    this.gameManager.incrementCommands();
  };

  // Drawing commands
  raiseSpirit = (): void => {
    this.turtle.penUp();
    this.gameManager.incrementCommands();
  };

  bindSpirit = (): void => {
    this.turtle.penDown();
    this.gameManager.incrementCommands();
  };

  conjureColor = (color: string): void => {
    this.turtle.setColor(color);
    this.gameManager.incrementCommands();
  };

  setLineWidth = (width: number): void => {
    this.turtle.setLineWidth(width);
    this.gameManager.incrementCommands();
  };

  // Utility commands
  ritual = (count: number, callback: () => void): void => {
    for (let i = 0; i < count; i++) {
      callback();
    }
    this.gameManager.incrementCommands();
  };

  clearGrave = (): void => {
    this.turtle.clear();
    this.gameManager.incrementCommands();
  };

  resurrect = (): void => {
    this.turtle.reset();
    this.gameManager.incrementCommands();
  };

  // Game commands
  castSpell = (spellName: string): void => {
    console.log(`Casting spell: ${spellName}`);
    this.gameManager.incrementCommands();
    // TODO: Implement spell effects
  };

  collectSoul = (): void => {
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
    const status = this.gameManager.getQuestStatus();
    console.log('Quest Status:', status);
    this.gameManager.incrementCommands();
  };

  getPosition = (): { x: number; y: number } => {
    return this.turtle.getPosition();
  };

  // Get all commands for parser
  getCommands(): Record<string, any> {
    return {
      summon: this.summon,
      banish: this.banish,
      turnLeft: this.turnLeft,
      turnRight: this.turnRight,
      haunt: this.haunt,
      raiseSpirit: this.raiseSpirit,
      bindSpirit: this.bindSpirit,
      conjureColor: this.conjureColor,
      setLineWidth: this.setLineWidth,
      ritual: this.ritual,
      clearGrave: this.clearGrave,
      resurrect: this.resurrect,
      castSpell: this.castSpell,
      collectSoul: this.collectSoul,
      banishDemon: this.banishDemon,
      checkQuest: this.checkQuest,
      getPosition: this.getPosition
    };
  }
}
