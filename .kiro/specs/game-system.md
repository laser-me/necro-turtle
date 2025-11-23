# Game System Specification

## Overview
Add a quest-based game mode to Necro-Turtle where players complete necromancy challenges by writing code to navigate, collect items, and cast spells.

## Game Modes

### Free Draw Mode
- Traditional turtle graphics
- No objectives or scoring
- Pure creative drawing
- All drawing commands available
- Example rituals provided

### Quest Mode
- Task-based challenges
- Objectives to complete
- Score tracking
- Entity interaction (souls, demons, buildings)
- Success/failure feedback
- Progressive difficulty

## Entity System

### Entity Base Interface
```typescript
interface Entity {
  id: string;
  type: 'soul' | 'demon' | 'building' | 'obstacle';
  position: Point;
  radius: number;
  active: boolean;
  sprite?: string; // emoji or icon
}
```

### Entity Types

**Soul (Collectible)**
- Position on canvas
- Glowing green/white effect
- Collected when turtle gets within radius
- Adds to score
- Sprite: 👻 or ✨

**Demon (Enemy)**
- Position on canvas
- Red/orange glow effect
- Must be banished with `banishDemon()` command
- Requires turtle to be within range
- Sprite: 😈 or 🔥

**Building (Landmark)**
- Graveyard, manor, crypt, etc.
- Larger radius
- Used as quest destinations
- Visual: 🏚️, ⚰️, 🪦, 🏰
- Can trigger special actions (resurrect at graveyard)

**Obstacle (Barrier)**
- Walls, fences, barriers
- Blocks turtle movement
- Must navigate around
- Visual: 🧱 or dark rectangles

## Collision Detection

### Distance-Based Collision
```typescript
function checkCollision(pos1: Point, pos2: Point, radius: number): boolean {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= radius;
}
```

### Collision Types
- **Entity Collection**: Turtle within entity radius
- **Obstacle Blocking**: Prevent movement through obstacles
- **Spell Range**: Check if spell can affect target

## Quest System

### Quest Structure
```typescript
interface Quest {
  id: string;
  name: string;
  description: string;
  objectives: QuestObjective[];
  entities: Entity[];
  startPosition: Point;
  successMessage: string;
  hints?: string[];
}

interface QuestObjective {
  type: 'collect' | 'banish' | 'reach' | 'draw' | 'cast';
  target: string; // entity type or location
  count: number;
  completed: boolean;
  description: string;
}
```

### Quest Examples

**Quest 1: Soul Collector**
- Objective: Collect 5 souls scattered on map
- Entities: 5 souls at different positions
- Success: All souls collected
- Difficulty: Easy

**Quest 2: Demon Hunter**
- Objective: Banish 3 demons
- Entities: 3 demons at different positions
- Requires: Use `banishDemon()` when near demon
- Success: All demons banished
- Difficulty: Medium

**Quest 3: Graveyard Resurrection**
- Objective: Navigate to graveyard and cast resurrect()
- Entities: Graveyard building, obstacles in path
- Requires: Navigate maze, reach graveyard, cast spell
- Success: Resurrect cast at graveyard
- Difficulty: Medium

**Quest 4: Pattern Ritual**
- Objective: Draw pentagram around target area
- Entities: Target marker in center
- Requires: Draw accurate 5-pointed star
- Validation: Check if path forms correct pattern
- Success: Pattern matches template
- Difficulty: Hard

**Quest 5: Speed Challenge**
- Objective: Complete any quest with minimal commands
- Scoring: Fewer commands = higher score
- Success: Complete in under X commands
- Difficulty: Variable

## Game State Management

### GameState Interface
```typescript
interface GameState {
  mode: 'freedraw' | 'quest';
  currentQuest?: Quest;
  score: number;
  soulsCollected: number;
  demonsBanished: number;
  questsCompleted: number;
  commandsUsed: number;
  entities: Entity[];
  objectives: QuestObjective[];
}
```

### State Updates
- Track all player actions
- Update objectives on entity interaction
- Calculate score based on performance
- Trigger visual feedback on events
- Check win/lose conditions

## Scoring System

### Points
- Soul collected: +10 points
- Demon banished: +20 points
- Quest completed: +100 points
- Efficiency bonus: +50 (if under command limit)
- Pattern accuracy: +0 to +50 (based on precision)

### Multipliers
- Perfect run (no errors): 2x multiplier
- Speed bonus (under time/command limit): 1.5x multiplier

## Visual Feedback

### Entity Rendering
- Draw entities on canvas before turtle
- Use emojis or simple shapes
- Add glow effects for active entities
- Fade out collected/banished entities
- Pulse animation for quest targets

### Event Effects
- **Soul Collection**: Green particle burst, +10 popup
- **Demon Banished**: Red explosion effect, +20 popup
- **Quest Complete**: Screen flash, success message
- **Spell Cast**: Circular wave effect from turtle
- **Collision**: Shake effect or bounce back

## UI Components

### Quest HUD
```
┌─────────────────────────────────────┐
│ Quest: Soul Collector               │
│ Souls: 3/5  Score: 130  Cmds: 12   │
└─────────────────────────────────────┘
```

### Objective Panel
```
Objectives:
☑ Collect 3 souls (3/5)
☐ Return to graveyard
```

### Quest Selector
- Dropdown with available quests
- Show difficulty level
- Show completion status
- Preview quest description

## Implementation Priority

### Phase 1 (MVP)
1. Entity system with souls and demons
2. Basic collision detection
3. 2-3 simple quests
4. Quest state tracking
5. Basic visual feedback

### Phase 2 (Enhanced)
1. More quest types
2. Obstacles and pathfinding challenges
3. Pattern validation
4. Advanced particle effects
5. Score multipliers

### Phase 3 (Polish)
1. Quest progression system
2. Difficulty levels
3. Hints system
4. Better animations
5. Sound effects (if time permits)

## Testing Requirements
- Test collision detection accuracy
- Verify quest objectives trigger correctly
- Test entity rendering at various positions
- Validate score calculations
- Test quest completion detection
- Verify UI updates on state changes
