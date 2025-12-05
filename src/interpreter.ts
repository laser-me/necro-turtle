console.log('[INTERPRETER MODULE] Loading');
import type { NecromancyAPI } from './necromancy';
console.log('[INTERPRETER MODULE] NecromancyAPI type imported');

interface Instruction {
  lineNumber: number;
  command: string;
  args: any[];
  originalLine: string;
}

export class Interpreter {
  private api: NecromancyAPI;
  private onLineExecute?: (lineNumber: number) => void;
  private instructions: Instruction[] = [];
  private currentInstructionIndex: number = 0;

  constructor(api: NecromancyAPI) {
    console.log('[INTERPRETER] Constructor start');
    this.api = api;
    console.log('[INTERPRETER] Constructor complete');
  }

  setLineCallback(callback: (lineNumber: number) => void): void {
    this.onLineExecute = callback;
  }

  async execute(code: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log('[Interpreter] Starting execute');
      // Check if code is simple enough for state machine parsing
      const isSimple = this.isSimpleCode(code);
      console.log('[Interpreter] isSimple:', isSimple);

      if (isSimple) {
        // Phase 1: Parse code into instructions
        console.log('[Interpreter] Parsing code...');
        this.instructions = this.parseCode(code);
        this.currentInstructionIndex = 0;
        console.log('[Interpreter] Parsed instructions:', this.instructions.length);

        // Check if we parsed any instructions
        if (this.instructions.length === 0) {
          return {
            success: false,
            message: 'No valid commands found. Check your syntax.'
          };
        }

        // Phase 2: Execute instructions with state tracking
        console.log('[Interpreter] Executing instructions...');
        await this.executeInstructions();
        console.log('[Interpreter] Instructions executed');
      } else {
        // Fallback: Use eval for complex code (ritual callbacks, etc.)
        console.log('[Interpreter] Using fallback eval');
        await this.executeFallback(code);
      }

      return {
        success: true,
        message: 'Ritual cast successfully! The spirits obey your commands.'
      };
    } catch (error) {
      return {
        success: false,
        message: `The ritual has failed: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  private isSimpleCode(code: string): boolean {
    // Simple code = only direct command calls and for loops
    // Complex code = has ritual(), arrow functions, callbacks, etc.
    return !code.includes('ritual(') && 
           !code.includes('=>') && 
           !code.includes('function');
  }

  private async executeFallback(code: string): Promise<void> {
    // For complex code with callbacks, use Function constructor
    // Track line execution by wrapping commands
    const commands = this.api.getCommands();
    const lines = code.split('\n');
    
    // Create wrapped commands that notify line execution
    const wrappedCommands: Record<string, any> = {};
    const commandNames = Object.keys(commands);
    
    for (const cmdName of commandNames) {
      const originalCmd = commands[cmdName];
      wrappedCommands[cmdName] = (...args: any[]) => {
        // Find which line this command is on
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(cmdName + '(')) {
            if (this.onLineExecute) {
              this.onLineExecute(i);
            }
            break;
          }
        }
        return originalCmd(...args);
      };
    }

    const func = new Function(...commandNames, '"use strict"; ' + code);
    func(...Object.values(wrappedCommands));

    // Execute animations - animations are queued during command execution
    await this.api.executeAnimations();
  }

  private parseCode(code: string): Instruction[] {
    const instructions: Instruction[] = [];
    const lines = code.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and comments
      if (!line || line.startsWith('//')) continue;

      // Parse simple commands (with optional semicolon)
      const commandMatch = line.match(/^(\w+)\((.*)\);?$/);
      if (commandMatch) {
        const [, commandName, argsStr] = commandMatch;
        instructions.push({
          lineNumber: i,
          command: commandName,
          args: this.parseSimpleArgs(argsStr),
          originalLine: line
        });
        continue;
      }

      // Handle for loops - expand them into individual instructions
      const forMatch = line.match(/^for\s*\(\s*let\s+(\w+)\s*=\s*(\d+)\s*;\s*\1\s*<\s*(\d+)\s*;\s*\1\+\+\s*\)\s*\{?$/);
      if (forMatch) {
        const [, varName, startStr, endStr] = forMatch;
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        
        // Find the loop body (next non-empty lines until })
        const loopBody: string[] = [];
        let j = i + 1;
        let braceCount = 1;
        
        while (j < lines.length && braceCount > 0) {
          const bodyLine = lines[j].trim();
          if (bodyLine === '}') {
            braceCount--;
            if (braceCount === 0) break;
          }
          if (bodyLine && !bodyLine.startsWith('//')) {
            // Remove trailing semicolons for matching
            loopBody.push(bodyLine.replace(/;$/, ''));
          }
          j++;
        }

        // If no body found, skip this loop
        if (loopBody.length === 0) {
          i = j;
          continue;
        }

        // Expand loop into individual instructions
        for (let iteration = start; iteration < end; iteration++) {
          for (let bodyIdx = 0; bodyIdx < loopBody.length; bodyIdx++) {
            const bodyLine = loopBody[bodyIdx];
            // Replace variable with actual value
            const expandedLine = bodyLine.replace(new RegExp(`\\b${varName}\\b`, 'g'), iteration.toString());
            const cmdMatch = expandedLine.match(/^(\w+)\((.*)\)$/);
            if (cmdMatch) {
              const [, cmdName, cmdArgs] = cmdMatch;
              instructions.push({
                lineNumber: i + 1 + bodyIdx, // Line number of the body line
                command: cmdName,
                args: this.parseSimpleArgs(cmdArgs),
                originalLine: expandedLine
              });
            }
          }
        }
        
        // Skip past the loop body
        i = j;
        continue;
      }
    }

    return instructions;
  }

  private parseSimpleArgs(argsStr: string): any[] {
    if (!argsStr.trim()) return [];

    const args: any[] = [];
    const parts = argsStr.split(',').map(s => s.trim());

    for (const part of parts) {
      // Number literal
      if (/^-?\d+(\.\d+)?$/.test(part)) {
        args.push(parseFloat(part));
        continue;
      }

      // String literal
      if (/^['"].*['"]$/.test(part)) {
        args.push(part.slice(1, -1));
        continue;
      }

      // Boolean literal
      if (part === 'true' || part === 'false') {
        args.push(part === 'true');
        continue;
      }

      // Expression (e.g., "i * 2", "100 + 50") - evaluate it
      try {
        // Safe eval for simple math expressions
        const result = Function('"use strict"; return (' + part + ')')();
        args.push(result);
      } catch {
        // If eval fails, treat as string
        args.push(part);
      }
    }

    return args;
  }

  private async executeInstructions(): Promise<void> {
    console.log('[Interpreter] executeInstructions start, count:', this.instructions.length);
    for (let i = 0; i < this.instructions.length; i++) {
      this.currentInstructionIndex = i;
      const instruction = this.instructions[i];
      console.log('[Interpreter] Executing instruction', i, ':', instruction.command, instruction.args);

      // Notify which line is executing
      if (this.onLineExecute) {
        this.onLineExecute(instruction.lineNumber);
      }

      await this.executeInstruction(instruction);
      console.log('[Interpreter] Instruction', i, 'completed');
    }

    console.log('[Interpreter] All instructions queued, executing animations...');
    await this.api.executeAnimations();
    console.log('[Interpreter] Animations completed');
  }

  private async executeInstruction(instruction: Instruction): Promise<void> {
    const commands = this.api.getCommands();
    const command = commands[instruction.command];

    if (!command) {
      throw new Error(`Unknown spell: ${instruction.command}`);
    }

    // Execute command
    command(...instruction.args);
  }

  getCurrentState(): { instructionIndex: number; totalInstructions: number; currentLine: number } {
    const instruction = this.instructions[this.currentInstructionIndex];
    return {
      instructionIndex: this.currentInstructionIndex,
      totalInstructions: this.instructions.length,
      currentLine: instruction?.lineNumber ?? -1
    };
  }
}
