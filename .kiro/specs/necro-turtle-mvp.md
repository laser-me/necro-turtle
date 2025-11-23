# Necro-Turtle MVP Specification

## Overview
Build a minimal viable product for the Necro-Turtle browser-based Logo programming environment with necromancy-themed commands.

## Requirements

### 1. Core Turtle Engine
- Implement turtle state (position, angle, pen state, color)
- Canvas rendering with HTML5
- Basic movement calculations (forward, backward, rotation)
- Pen up/down functionality
- Trail drawing with configurable color

### 2. Necromancy Command API
Implement the following commands:

**Movement Commands:**
- `summon(distance)` - Move forward
- `banish(distance)` - Move backward  
- `turnLeft(angle)` - Rotate counterclockwise
- `turnRight(angle)` - Rotate clockwise
- `haunt(x, y)` - Teleport to coordinates

**Drawing Commands:**
- `raiseSpirit()` - Lift pen (stop drawing)
- `bindSpirit()` - Lower pen (start drawing)
- `conjureColor(color)` - Change trail color
- `setLineWidth(width)` - Set trail thickness

**Utility Commands:**
- `ritual(count, callback)` - Repeat commands
- `clearGrave()` - Clear canvas
- `resurrect()` - Reset turtle to center

**Game/Spell Commands:**
- `castSpell(spellName)` - Cast spell at current location
- `collectSoul()` - Collect soul at current position
- `banishDemon()` - Banish demon at current location
- `checkQuest()` - Check current quest status
- `getPosition()` - Get turtle's current coordinates

### 3. User Interface
- Dark themed HTML page with gothic styling
- Canvas area (800x600 minimum) with game entities
- Code editor textarea for entering commands
- "Cast Spell" button to execute code
- "Clear Grave" button to reset canvas
- Mode selector: "Free Draw" vs "Quest Mode"
- Quest selector dropdown (when in Quest Mode)
- Example ritual selector dropdown (when in Free Draw)
- Error message display area
- Game HUD: Score, souls collected, quest objective
- Quest completion feedback with visual effects

### 4. Command Parser
- Parse and execute user-written JavaScript code safely
- Provide necromancy API in execution context
- Catch and display errors with themed messages
- Support multi-line programs

### 5. Example Rituals & Quests
Include pre-written example programs:

**Free Draw Examples (5):**
1. **Summoning Circle** - Pentagram pattern
2. **Spirit Path** - Spiral design
3. **Grave Marker** - Cross or tombstone
4. **Haunted House** - Simple house outline
5. **Necromancer's Sigil** - Complex mystical symbol

**Quest Mode Examples (3-5):**
1. **Soul Collector** - Navigate to collect all souls on map
2. **Demon Hunter** - Reach demons and banish them
3. **Graveyard Resurrection** - Navigate to graveyard and resurrect
4. **Pattern Ritual** - Draw specific pattern to complete spell
5. **Speed Challenge** - Complete objective in minimal moves

### 6. Visual Effects
- Glowing trail effect (green or purple)
- Ghostly turtle cursor (skull or spirit icon)
- Smooth animations for turtle movement
- Fade-in effects for UI elements

## Technical Implementation

### File Structure
```
/
├── index.html          # Main page
├── styles.css          # Dark gothic styling
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite bundler config
├── src/
│   ├── main.ts         # Entry point and initialization
│   ├── types.ts        # TypeScript interfaces
│   ├── turtle.ts       # Core turtle engine
│   ├── necromancy.ts   # Command API
│   ├── parser.ts       # Code execution
│   ├── effects.ts      # Visual effects
│   ├── game.ts         # Game state and quest manager
│   ├── entities.ts     # Game entities (buildings, demons, souls)
│   ├── collision.ts    # Collision detection
│   ├── levels.ts       # Quest/level definitions
│   ├── ui.ts           # UI component management
│   └── examples.ts     # Example rituals
├── dist/               # Compiled output
└── README.md           # Documentation
```

### TypeScript Types
Define interfaces for:
- `Point` - x, y coordinates
- `TurtleState` - position, angle, penDown, color, lineWidth
- `NecromancyCommand` - command function signature
- `Ritual` - example program structure
- `EffectConfig` - particle effect settings
- `Entity` - base interface for game objects
- `Building` - structure on map (graveyard, manor, etc)
- `Demon` - enemy entity to banish
- `Soul` - collectible entity
- `Quest` - quest definition with objectives
- `QuestObjective` - individual objective (collect X souls, etc)
- `GameState` - current game progress and score
- `Level` - level configuration with entities

### Styling Requirements
- Background: #0a0a0a or #1a0033 (dark purple)
- Primary text: #00ff88 (ghostly green) or #bb88ff (mystic purple)
- Canvas background: #000000
- Trail glow: box-shadow or canvas glow effect
- Font: Gothic or monospace font
- Buttons: Dark with hover effects

### Error Handling
- Wrap user code execution in try-catch
- Display errors in themed format: "The ritual has failed: [error]"
- Validate command parameters with TypeScript types
- Prevent infinite loops with timeout

### Build Configuration
- Vite for dev server and bundling
- TypeScript strict mode enabled
- Hot module replacement for development
- Minified production build

## Success Criteria
- All 17+ necromancy commands work correctly
- All 5 free draw examples execute without errors
- At least 3 quest mode challenges are playable
- UI is visually appealing with dark theme
- Code can be entered and executed smoothly
- Canvas renders turtle movements and entities accurately
- Collision detection works reliably
- Quest objectives can be completed
- Score/progress tracking works
- Visual feedback for game events (soul collection, spell casting)
- Application works in modern browsers
- Smooth transitions between Free Draw and Quest modes

## Out of Scope (Future Enhancements)
- Save/load programs to localStorage
- Animation speed control slider
- Multiple turtles (co-op mode)
- Sound effects and background music
- Advanced particle systems (fire, smoke, etc)
- Mobile touch controls
- Leaderboard/high scores
- Level editor
- Multiplayer mode
- Achievement system
