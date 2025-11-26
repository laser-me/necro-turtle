import type { NecromancyAPI } from './necromancy';

export class Parser {
  private api: NecromancyAPI;
  private allowedCommands: Set<string>;

  constructor(api: NecromancyAPI) {
    this.api = api;
    
    // List of allowed necromancy commands
    this.allowedCommands = new Set([
      'summon', 'banish', 'spin', 'twist', 'haunt',
      'raiseSpirit', 'bindSpirit', 'conjureColor', 'setLineWidth',
      'ritual', 'clearGrave', 'resurrect',
      'collectSoul', 'banishDemon', 'getSoulPositions', 'getPosition', 'checkQuest',
      'castSpell', 'turnLeft', 'turnRight', 'rotateWiddershins', 'rotateDeosil',
      'turnToShadows', 'turnToLight'
    ]);
  }

  execute(code: string): { success: boolean; message: string } {
    try {
      // Validate code before execution
      const validation = this.validateCode(code);
      if (!validation.valid) {
        return {
          success: false,
          message: `The dark arts forbid this: ${validation.error}`
        };
      }

      // Create a sandboxed environment with only necromancy commands
      const commands = this.api.getCommands();
      const commandNames = Object.keys(commands);
      const commandValues = Object.values(commands);

      // Create function with commands as parameters
      // Use strict mode and prevent access to global scope
      const func = new Function(
        ...commandNames,
        '"use strict"; ' + code
      );
      
      // Execute with command implementations
      func(...commandValues);

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

  private validateCode(code: string): { valid: boolean; error?: string } {
    // Block dangerous patterns
    const dangerousPatterns = [
      /\beval\b/i,
      /\bFunction\b/,
      /\bsetTimeout\b/i,
      /\bsetInterval\b/i,
      /\bwindow\b/i,
      /\bdocument\b/i,
      /\blocalStorage\b/i,
      /\bsessionStorage\b/i,
      /\bfetch\b/i,
      /\bXMLHttpRequest\b/i,
      /\bimport\b/i,
      /\brequire\b/i,
      /\bprocess\b/i,
      /\b__proto__\b/i,
      /\bconstructor\b.*\bprototype\b/i,
      /\balert\b/i,
      /\bconfirm\b/i,
      /\bprompt\b/i
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return {
          valid: false,
          error: `Forbidden incantation detected: ${pattern.source}. Only necromancy commands are allowed.`
        };
      }
    }

    // Check that only allowed commands are used (allow basic JS constructs)
    const functionCallPattern = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
    const matches = [...code.matchAll(functionCallPattern)];
    
    for (const match of matches) {
      const funcName = match[1];
      // Allow basic JavaScript constructs and our commands
      const isBasicJS = ['for', 'while', 'if', 'switch', 'forEach', 'map', 'filter', 'reduce', 'some', 'every', 'find'].includes(funcName);
      const isAllowed = this.allowedCommands.has(funcName) || isBasicJS;
      
      if (!isAllowed) {
        return {
          valid: false,
          error: `Unknown spell: "${funcName}". Only necromancy commands are permitted.`
        };
      }
    }

    return { valid: true };
  }
}
