import { Turtle } from './turtle';
import { NecromancyAPI } from './necromancy';
import { Parser } from './parser';
import { GameManager } from './game';
import { UIManager } from './ui';
import { loadExamples } from './examples';
import { loadQuests } from './levels';

// Initialize the application
function init(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('Could not get canvas context');
    return;
  }

  // Initialize core systems
  const turtle = new Turtle(canvas, ctx);
  const gameManager = new GameManager();
  const necromancyAPI = new NecromancyAPI(turtle, gameManager);
  const parser = new Parser(necromancyAPI);
  const uiManager = new UIManager(turtle, gameManager, parser);

  // Load examples and quests
  const examples = loadExamples();
  const quests = loadQuests();

  uiManager.loadExamples(examples);
  uiManager.loadQuests(quests);

  // Initial render
  turtle.render();

  console.log('🦴 Necro-Turtle initialized. The dark arts await...');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
