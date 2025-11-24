# Necro-Turtle: Necromancy Logo Programming

## Project Overview
A browser-based turtle graphics program with a dark necromancy theme. This resurrects the classic Logo programming language with spooky commands and visual effects.

## Theme: Resurrection Category
Bringing back the beloved Logo turtle programming language from the 1960s-80s, reimagined with:
- Necromancy-themed commands (summon, banish, haunt, etc.)
- Dark, gothic visual design
- Modern web technologies (HTML5 Canvas, JavaScript)
- Interactive browser-based interface

## Core Concept
Users write necromancy-themed commands to control a spectral turtle that draws mystical patterns, summoning circles, and dark sigils on a canvas. The program includes a task-based game mode where players complete necromancy quests by navigating to locations, collecting souls, banishing demons, and casting spells.

## Technology Stack
- HTML5 Canvas for rendering
- TypeScript for type-safe turtle logic
- CSS for dark, spooky UI
- Vite or esbuild for fast bundling
- No heavy frameworks - keep it lightweight and accessible

## Necromancy Command Set
Replace traditional Logo commands with dark magic equivalents:

### Movement Commands
- `summon(distance)` - move forward (fd)
- `banish(distance)` - move backward (bk)
- `spin(angle)` - spin counterclockwise (primary left rotation)
- `twist(angle)` - twist clockwise (primary right rotation)
- `turnLeft(angle)` / `turnRight(angle)` - rotate (aliases)
- `rotateWiddershins(angle)` - rotate counterclockwise (occult term)
- `rotateDeosil(angle)` - rotate clockwise (occult term)
- `turnToShadows(angle)` - turn toward darkness (thematic left)
- `turnToLight(angle)` - turn toward light (thematic right)
- `haunt(x, y)` - teleport to position

### Drawing Commands
- `raiseSpirit()` - pen up (pu)
- `bindSpirit()` - pen down (pd)
- `conjureColor(color)` - set pen color
- `setLineWidth(width)` - set trail thickness

### Utility Commands
- `ritual(count, callback)` - repeat commands (loop)
- `clearGrave()` - clear canvas
- `resurrect()` - reset turtle to center

### Game/Spell Commands
- `castSpell(spellName)` - cast offensive/defensive spell at current location
- `collectSoul()` - collect soul at current position
- `banishDemon()` - banish demon at current location
- `checkQuest()` - check current quest status
- `getPosition()` - get turtle's current coordinates

## Visual Design
- Dark background (black or deep purple)
- Glowing green/purple trail for turtle path
- Ghostly turtle sprite or skull icon
- Gothic fonts
- Particle effects for special commands
- Eerie animations

## Game Mode Features
- **Quest System**: Task-based challenges with objectives
- **Entities**: Buildings, graveyards, demons, souls, power-ups
- **Collision Detection**: Detect when turtle reaches targets
- **Score/Progress**: Track souls collected, demons banished, quests completed
- **Visual Feedback**: Particle effects for spell casting, soul collection
- **Multiple Levels**: Progressive difficulty with different layouts

## Quest Types
1. **Resurrection Quest** - Navigate to graveyard and cast resurrect()
2. **Soul Collection** - Visit multiple spirit locations to collect souls
3. **Demon Banishment** - Reach demon positions and banish them
4. **Summoning Circle** - Draw accurate pentagram around target area
5. **Haunted Maze** - Navigate through obstacles to reach destination
6. **Pattern Ritual** - Draw specific mystical patterns to complete spell
