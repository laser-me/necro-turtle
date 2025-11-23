import type { NecromancyAPI } from './necromancy';

export class Parser {
  private api: NecromancyAPI;

  constructor(api: NecromancyAPI) {
    this.api = api;
  }

  execute(code: string): { success: boolean; message: string } {
    try {
      // Create a function with necromancy commands in scope
      const commands = this.api.getCommands();
      const commandNames = Object.keys(commands);
      const commandValues = Object.values(commands);

      // Create function with commands as parameters
      const func = new Function(...commandNames, code);
      
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
}
