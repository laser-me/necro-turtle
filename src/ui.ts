import type { Turtle } from './turtle';
import type { GameManager } from './game';
import type { Parser } from './parser';
import type { Ritual, Quest } from './types';

export class UIManager {
  private turtle: Turtle;
  private gameManager: GameManager;
  private parser: Parser;

  private currentSuggestion: { completion: string; fullCommand: string; hasParams: boolean } | null = null;

  constructor(turtle: Turtle, gameManager: GameManager, parser: Parser) {
    this.turtle = turtle;
    this.gameManager = gameManager;
    this.parser = parser;

    this.setupEventListeners();
    this.populateCommandsPanel();
    this.setupAutocomplete();
  }

  private setupEventListeners(): void {
    // Top section toggle (header + controls)
    const sectionToggle = document.getElementById('section-toggle');
    const topSection = document.getElementById('top-section');
    sectionToggle?.addEventListener('click', () => {
      topSection?.classList.toggle('collapsed');
    });

    // Commands panel toggle
    const commandsToggle = document.getElementById('commands-toggle');
    const commandsPanel = document.getElementById('commands-panel');
    commandsToggle?.addEventListener('click', () => {
      commandsPanel?.classList.toggle('hidden');
    });

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

    // Clear editor button
    const clearEditorBtn = document.getElementById('clear-editor-btn');
    clearEditorBtn?.addEventListener('click', () => this.clearEditor());

    // Keyboard shortcuts
    const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
    editor?.addEventListener('keydown', (e) => this.handleEditorKeydown(e));

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

  private clearEditor(): void {
    const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
    if (editor) {
      editor.value = '';
      editor.focus();
      this.logOutput('Command grimoire cleared.', 'info');
    }
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

  private populateCommandsPanel(): void {
    const commandsList = document.getElementById('commands-list');
    if (!commandsList) return;

    const commands = [
      { category: 'Movement', items: [
        { name: 'summon(distance)', desc: 'Move forward', example: 'summon(100);' },
        { name: 'banish(distance)', desc: 'Move backward', example: 'banish(50);' },
        { name: 'spin(angle)', desc: 'Spin left', example: 'spin(90);' },
        { name: 'twist(angle)', desc: 'Twist right', example: 'twist(45);' },
        { name: 'haunt(x, y)', desc: 'Teleport', example: 'haunt(400, 300);' }
      ]},
      { category: 'Drawing', items: [
        { name: 'raiseSpirit()', desc: 'Pen up', example: 'raiseSpirit();' },
        { name: 'bindSpirit()', desc: 'Pen down', example: 'bindSpirit();' },
        { name: 'conjureColor(color)', desc: 'Set color', example: "conjureColor('#bb88ff');" },
        { name: 'setLineWidth(width)', desc: 'Set width', example: 'setLineWidth(5);' }
      ]},
      { category: 'Utility', items: [
        { name: 'ritual(count, fn)', desc: 'Loop', example: 'ritual(4, () => { summon(50); twist(90); });' },
        { name: 'clearGrave()', desc: 'Clear canvas', example: 'clearGrave();' },
        { name: 'resurrect()', desc: 'Reset turtle', example: 'resurrect();' }
      ]},
      { category: 'Game', items: [
        { name: 'collectSoul()', desc: 'Collect soul', example: 'collectSoul();' },
        { name: 'banishDemon()', desc: 'Banish demon', example: 'banishDemon();' },
        { name: 'getSoulPositions()', desc: 'Get souls', example: 'const souls = getSoulPositions();' },
        { name: 'getPosition()', desc: 'Get position', example: 'const pos = getPosition();' }
      ]}
    ];

    commands.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'command-category';
      categoryDiv.innerHTML = `<div style="color: #bb88ff; font-weight: bold; margin: 10px 0 5px 0;">${category.category}</div>`;
      
      category.items.forEach(cmd => {
        const cmdDiv = document.createElement('div');
        cmdDiv.className = 'command-item';
        cmdDiv.innerHTML = `
          <div class="command-name">${cmd.name}</div>
          <div class="command-desc">${cmd.desc}</div>
          <div class="command-tooltip">
            <div style="color: #bb88ff; font-weight: bold;">Example:</div>
            <div class="command-tooltip-example">${cmd.example}</div>
          </div>
        `;
        
        cmdDiv.addEventListener('click', () => {
          const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
          if (editor) {
            const cursorPos = editor.selectionStart;
            const textBefore = editor.value.substring(0, cursorPos);
            const textAfter = editor.value.substring(cursorPos);
            editor.value = textBefore + cmd.example + '\n' + textAfter;
            editor.focus();
            editor.selectionStart = editor.selectionEnd = cursorPos + cmd.example.length + 1;
          }
        });

        // Position tooltip on hover
        cmdDiv.addEventListener('mouseenter', () => {
          const tooltip = cmdDiv.querySelector('.command-tooltip') as HTMLElement;
          if (tooltip) {
            const rect = cmdDiv.getBoundingClientRect();
            tooltip.style.left = `${rect.right + 10}px`;
            tooltip.style.top = `${rect.top}px`;
          }
        });
        
        categoryDiv.appendChild(cmdDiv);
      });
      
      commandsList.appendChild(categoryDiv);
    });
  }

  private setupAutocomplete(): void {
    const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
    if (!editor) return;

    // Listen for input
    editor.addEventListener('input', () => this.handleInlineAutocomplete());
  }

  private handleInlineAutocomplete(): void {
    const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
    if (!editor) return;

    const cursorPos = editor.selectionStart;
    const textBeforeCursor = editor.value.substring(0, cursorPos);
    const currentLine = textBeforeCursor.split('\n').pop() || '';
    const words = currentLine.split(/[\s\(\)\{\}\[\];,]/);
    const currentWord = words[words.length - 1];

    const inlineSuggestion = document.getElementById('inline-suggestion');
    const hintText = document.getElementById('hint-text');

    if (!inlineSuggestion || !hintText) return;

    if (currentWord.length < 2) {
      inlineSuggestion.textContent = '';
      hintText.textContent = '';
      this.currentSuggestion = null;
      return;
    }

    // Get all commands with descriptions
    const allCommands = [
      { name: 'summon', params: '(distance)', paramsOnly: '()', desc: 'Move forward' },
      { name: 'banish', params: '(distance)', paramsOnly: '()', desc: 'Move backward' },
      { name: 'spin', params: '(angle)', paramsOnly: '()', desc: 'Spin left' },
      { name: 'twist', params: '(angle)', paramsOnly: '()', desc: 'Twist right' },
      { name: 'haunt', params: '(x, y)', paramsOnly: '()', desc: 'Teleport to position' },
      { name: 'raiseSpirit', params: '()', paramsOnly: '()', desc: 'Pen up' },
      { name: 'bindSpirit', params: '()', paramsOnly: '()', desc: 'Pen down' },
      { name: 'conjureColor', params: '(color)', paramsOnly: '()', desc: 'Set trail color' },
      { name: 'setLineWidth', params: '(width)', paramsOnly: '()', desc: 'Set trail width' },
      { name: 'ritual', params: '(count, fn)', paramsOnly: '()', desc: 'Repeat commands' },
      { name: 'clearGrave', params: '()', paramsOnly: '()', desc: 'Clear canvas' },
      { name: 'resurrect', params: '()', paramsOnly: '()', desc: 'Reset turtle' },
      { name: 'collectSoul', params: '()', paramsOnly: '()', desc: 'Collect soul at position' },
      { name: 'banishDemon', params: '()', paramsOnly: '()', desc: 'Banish demon at position' },
      { name: 'getSoulPositions', params: '()', paramsOnly: '()', desc: 'Get array of soul positions' },
      { name: 'getPosition', params: '()', paramsOnly: '()', desc: 'Get turtle coordinates' }
    ];

    // Find best match
    const match = allCommands.find(cmd => 
      cmd.name.toLowerCase().startsWith(currentWord.toLowerCase()) &&
      cmd.name.toLowerCase() !== currentWord.toLowerCase()
    );

    if (!match) {
      inlineSuggestion.textContent = '';
      hintText.textContent = '';
      this.currentSuggestion = null;
      return;
    }

    // Show inline suggestion (with parameter names for display)
    const displayCompletion = match.name.substring(currentWord.length) + match.params;
    inlineSuggestion.textContent = textBeforeCursor + displayCompletion;
    hintText.textContent = `// ${match.desc}`;
    
    // Store actual completion (just brackets, no parameter names)
    const actualCompletion = match.name.substring(currentWord.length) + match.paramsOnly;
    this.currentSuggestion = { 
      completion: actualCompletion, 
      fullCommand: match.name + match.paramsOnly,
      hasParams: match.paramsOnly === '()'
    };
  }

  private handleEditorKeydown(e: KeyboardEvent): void {
    // Ctrl+Enter to execute
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      this.executeCode();
      return;
    }

    // Tab or Enter to accept inline suggestion
    if ((e.key === 'Tab' || e.key === 'Enter') && this.currentSuggestion) {
      const editor = document.getElementById('code-editor') as HTMLTextAreaElement;
      if (!editor) return;

      // Only accept on Tab, or Enter if at end of line
      const cursorPos = editor.selectionStart;
      const textAfterCursor = editor.value.substring(cursorPos);
      const isEndOfLine = !textAfterCursor || textAfterCursor.startsWith('\n');

      if (e.key === 'Tab' || (e.key === 'Enter' && isEndOfLine)) {
        e.preventDefault();
        
        const textBeforeCursor = editor.value.substring(0, cursorPos);
        editor.value = textBeforeCursor + this.currentSuggestion.completion + textAfterCursor;
        
        // Position cursor inside brackets if command has parameters
        const newCursorPos = this.currentSuggestion.hasParams 
          ? cursorPos + this.currentSuggestion.completion.length - 1  // Inside ()
          : cursorPos + this.currentSuggestion.completion.length;     // After ()
        
        editor.selectionStart = editor.selectionEnd = newCursorPos;
        
        // Clear suggestion
        const inlineSuggestion = document.getElementById('inline-suggestion');
        const hintText = document.getElementById('hint-text');
        if (inlineSuggestion) inlineSuggestion.textContent = '';
        if (hintText) hintText.textContent = '';
        this.currentSuggestion = null;
      }
    }
  }
}
