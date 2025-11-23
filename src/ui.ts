import type { Turtle } from './turtle';
import type { GameManager } from './game';
import type { Parser } from './parser';
import type { Ritual, Quest } from './types';

export class UIManager {
  private turtle: Turtle;
  private gameManager: GameManager;
  private parser: Parser;

  constructor(turtle: Turtle, gameManager: GameManager, parser: Parser) {
    this.turtle = turtle;
    this.gameManager = gameManager;
    this.parser = parser;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Mode selector
    const modeSelect = document.getElementById('mode-select') as HTMLSelectElement;
    modeSelect?.addEventListener('change', () => this.handleModeChange(modeSelect.value as 'freedraw' | 'quest'));

    // Execute button
    const executeBtn = document.getElementById('execute-btn');
    executeBtn?.addEventListener('click', () => this.executeCode());

    // Clear button
    const clearBtn = document.getElementById('clear-btn');
    clearBtn?.addEventListener('click', () => this.clearCanvas());

    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    resetBtn?.addEventListener('click', () => this.resetTurtle());

    // Example selector
    const exampleSelect = document.getElementById('example-select') as HTMLSelectElement;
    exampleSelect?.addEventListener('change', () => this.loadExample(exampleSelect.value));

    // Quest selector
    const questSelect = document.getElementById('quest-select') as HTMLSelectElement;
    questSelect?.addEventListener('change', () => this.loadQuestByName(questSelect.value));
  }

  private handleModeChange(mode: 'freedraw' | 'quest'): void {
    this.gameManager.setMode(mode);

    const exampleGroup = document.getElementById('example-group');
    const questGroup = document.getElementById('quest-group');
    const gameHud = document.getElementById('game-hud');
    const objectivesContainer = document.getElementById('objectives-container');

    if (mode === 'quest') {
      exampleGroup?.classList.add('hidden');
      questGroup?.classList.remove('hidden');
      gameHud?.classList.remove('hidden');
      objectivesContainer?.classList.remove('hidden');
    } else {
      exampleGroup?.classList.remove('hidden');
      questGroup?.classList.add('hidden');
      gameHud?.classList.add('hidden');
      objectivesContainer?.classList.add('hidden');
    }

    this.updateUI();
  }

  private executeCode(): void {
    const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
    const output = document.getElementById('output');
    
    if (!editor || !output) return;

    const code = editor.value;
    const result = this.parser.execute(code);

    output.innerHTML = `<div class="output-${result.success ? 'success' : 'error'}">${result.message}</div>`;
    
    // Update entities rendering after execution
    const entities = this.gameManager.getEntities();
    this.turtle.setEntities(entities);
    
    this.updateUI();
  }

  private clearCanvas(): void {
    this.turtle.clear();
    this.logOutput('The grave has been cleared...', 'info');
  }

  private resetTurtle(): void {
    this.turtle.reset();
    this.gameManager.reset();
    this.updateUI();
    this.logOutput('The turtle has been resurrected at the center.', 'info');
  }

  private loadExample(exampleName: string): void {
    if (!exampleName) return;
    
    const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
    if (editor) {
      // Example code will be loaded from examples
      this.logOutput(`Loaded example: ${exampleName}`, 'info');
    }
  }

  private loadQuestByName(questName: string): void {
    if (!questName) return;
    this.logOutput(`Loading quest: ${questName}`, 'info');
    // Quest will be loaded from levels
  }

  loadExamples(examples: Ritual[]): void {
    const exampleSelect = document.getElementById('example-select') as HTMLSelectElement;
    if (!exampleSelect) return;

    examples.forEach(example => {
      const option = document.createElement('option');
      option.value = example.name;
      option.textContent = example.name;
      option.dataset.code = example.code;
      exampleSelect.appendChild(option);
    });

    exampleSelect.addEventListener('change', () => {
      const selected = exampleSelect.selectedOptions[0];
      const code = selected?.dataset.code;
      if (code) {
        const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
        if (editor) editor.value = code;
      }
    });
  }

  loadQuests(quests: Quest[]): void {
    const questSelect = document.getElementById('quest-select') as HTMLSelectElement;
    if (!questSelect) return;

    quests.forEach(quest => {
      const option = document.createElement('option');
      option.value = quest.id;
      option.textContent = quest.name;
      questSelect.appendChild(option);
    });

    questSelect.addEventListener('change', () => {
      const questId = questSelect.value;
      const quest = quests.find(q => q.id === questId);
      if (quest) {
        this.gameManager.loadQuest(quest);
        this.turtle.reset();
        this.turtle.setEntities(quest.entities);
        this.updateUI();
      }
    });
  }

  private updateUI(): void {
    const state = this.gameManager.getState();

    // Update HUD
    const questName = document.getElementById('quest-name');
    const score = document.getElementById('score');
    const souls = document.getElementById('souls');
    const commands = document.getElementById('commands');

    if (questName) questName.textContent = state.currentQuest?.name || '-';
    if (score) score.textContent = state.score.toString();
    if (commands) commands.textContent = state.commandsUsed.toString();

    // Update souls counter
    if (souls && state.currentQuest) {
      const totalSouls = state.currentQuest.entities.filter(e => e.type === 'soul').length;
      souls.textContent = `${state.soulsCollected}/${totalSouls}`;
    }

    // Update objectives
    this.updateObjectives();
  }

  private updateObjectives(): void {
    const objectivesDiv = document.getElementById('objectives');
    if (!objectivesDiv) return;

    const state = this.gameManager.getState();
    if (!state.currentQuest) {
      objectivesDiv.innerHTML = '';
      return;
    }

    objectivesDiv.innerHTML = state.currentQuest.objectives
      .map(obj => `
        <div class="objective-item ${obj.completed ? 'completed' : ''}">
          ${obj.completed ? '✓' : '○'} ${obj.description} (${obj.current}/${obj.count})
        </div>
      `)
      .join('');
  }

  private logOutput(message: string, type: 'success' | 'error' | 'info'): void {
    const output = document.getElementById('output');
    if (output) {
      output.innerHTML = `<div class="output-${type}">${message}</div>`;
    }
  }
}
