# Coding Standards for Necro-Turtle

## Code Style
- Use TypeScript with strict mode enabled
- Use ES6+ features (const/let, arrow functions, destructuring)
- Clear, descriptive variable names with necromancy theme where appropriate
- Comment complex algorithms and magical formulas
- Keep functions small and focused
- Define interfaces for all data structures
- Use type annotations for function parameters and returns

## File Organization
- `index.html` - Main entry point with dark UI
- `src/main.ts` - Application entry point and initialization
- `src/turtle.ts` - Core turtle graphics engine with types
- `src/necromancy.ts` - Necromancy command API wrapper
- `src/parser.ts` - Command parser for user input
- `src/types.ts` - TypeScript interfaces and types
- `src/effects.ts` - Particle effects and animations
- `src/game.ts` - Game state manager and quest system
- `src/entities.ts` - Game entities (buildings, demons, souls)
- `src/collision.ts` - Collision detection utilities
- `src/levels.ts` - Level/quest definitions
- `src/ui.ts` - UI component management
- `styles.css` - Dark gothic styling
- `dist/` - Compiled JavaScript output

## TypeScript Configuration
- Enable strict mode
- Target ES2020 or later
- Use ES modules
- Generate source maps for debugging
- Output to dist/ folder

## Canvas Best Practices
- Use requestAnimationFrame for smooth animations
- Implement double buffering if needed
- Optimize drawing operations
- Handle canvas resizing gracefully

## Accessibility
- Provide keyboard shortcuts
- Include alt text for images
- Ensure sufficient color contrast for text
- Support screen readers where possible

## Error Handling
- Graceful error messages with necromancy theme
- Validate user commands before execution
- Provide helpful feedback for syntax errors
- Don't let errors break the entire application
