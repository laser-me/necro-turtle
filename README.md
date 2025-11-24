# 🦴 Necro-Turtle: Necromancy Logo Programming

> Resurrect the ancient art of turtle graphics with dark magic

A browser-based Logo programming environment where you command a spectral turtle using necromancy-themed commands to draw mystical patterns and summoning circles.

## 🎃 Kiroween Hackathon - Resurrection Category

This project brings back the beloved Logo programming language from the 1960s-80s, reimagined with:
- Necromancy-themed commands
- Dark gothic visual design  
- Modern web technologies
- Interactive browser interface

## ✨ Features

- **24+ Necromancy Commands** - Control the spectral turtle with dark magic
- **Two Game Modes** - Free Draw for creativity, Quest Mode for challenges
- **Quest System** - Complete necromancy tasks and collect souls
- **Interactive Entities** - Souls to collect, demons to banish, buildings to explore
- **5+ Example Rituals** - Pre-written programs to get you started
- **Dark Gothic UI** - Immersive necromancy atmosphere
- **Real-time Execution** - Watch your rituals come to life
- **Glowing Trails** - Mystical green/purple effects
- **Score Tracking** - Compete for the highest necromancer rank

## 🕯️ Necromancy Command Reference

### Movement Commands
| Command | Parameters | Description | Example |
|---------|-----------|-------------|---------|
| `summon(distance)` | distance: number | Move the turtle forward | `summon(100)` |
| `banish(distance)` | distance: number | Move the turtle backward | `banish(50)` |
| `spin(angle)` | angle: degrees | Spin counterclockwise | `spin(90)` |
| `twist(angle)` | angle: degrees | Twist clockwise | `twist(45)` |
| `turnLeft(angle)` | angle: degrees | Rotate counterclockwise (alias) | `turnLeft(90)` |
| `turnRight(angle)` | angle: degrees | Rotate clockwise (alias) | `turnRight(45)` |
| `rotateWiddershins(angle)` | angle: degrees | Rotate counterclockwise (occult) | `rotateWiddershins(90)` |
| `rotateDeosil(angle)` | angle: degrees | Rotate clockwise (occult) | `rotateDeosil(45)` |
| `turnToShadows(angle)` | angle: degrees | Turn toward darkness | `turnToShadows(90)` |
| `turnToLight(angle)` | angle: degrees | Turn toward light | `turnToLight(45)` |
| `haunt(x, y)` | x, y: coordinates | Teleport to position | `haunt(400, 300)` |

### Drawing Commands
| Command | Parameters | Description | Example |
|---------|-----------|-------------|---------|
| `raiseSpirit()` | none | Lift pen (stop drawing) | `raiseSpirit()` |
| `bindSpirit()` | none | Lower pen (start drawing) | `bindSpirit()` |
| `conjureColor(color)` | color: string | Change trail color | `conjureColor('#00ff88')` |
| `setLineWidth(width)` | width: number | Set trail thickness | `setLineWidth(3)` |

### Utility Commands
| Command | Parameters | Description | Example |
|---------|-----------|-------------|---------|
| `ritual(count, fn)` | count: number, fn: function | Repeat commands | `ritual(4, () => summon(100))` |
| `clearGrave()` | none | Clear the canvas | `clearGrave()` |
| `resurrect()` | none | Reset turtle to center | `resurrect()` |

### Game/Spell Commands
| Command | Parameters | Description | Example |
|---------|-----------|-------------|---------|
| `castSpell(name)` | name: string | Cast spell at location | `castSpell('banish')` |
| `collectSoul()` | none | Collect soul at position | `collectSoul()` |
| `banishDemon()` | none | Banish demon at location | `banishDemon()` |
| `checkQuest()` | none | Check quest status | `checkQuest()` |
| `getPosition()` | none | Get turtle coordinates | `getPosition()` |
| `getSoulPositions()` | none | Get array of soul positions | `getSoulPositions()` |

## 📜 Example Rituals

### Free Draw Mode

**Summoning Circle (Pentagram)**
```javascript
ritual(5, () => {
  summon(150);
  twist(144);
});
```

**Spirit Path (Spiral)**
```javascript
for(let i = 0; i < 100; i++) {
  summon(i * 2);
  twist(45);
}
```

**Grave Marker (Cross)**
```javascript
summon(100);
banish(50);
spin(90);
summon(50);
banish(100);
summon(50);
```

### Quest Mode

**Soul Collector**
```javascript
// Get soul positions first
const souls = getSoulPositions();

// Visit each soul and collect it
souls.forEach(soul => {
  haunt(soul.x, soul.y);
  collectSoul();
});

// Challenge: Can you optimize the path?
```

**Demon Hunter**
```javascript
// Move to demon locations and banish them
summon(200);
turnRight(45);
summon(100);
banishDemon(); // Banish the first demon
// ... continue hunting!
```

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```

### Usage
1. Choose between **Free Draw** or **Quest Mode**
2. In Free Draw: Select an example ritual or write your own
3. In Quest Mode: Select a quest and write code to complete objectives
4. Click "Cast Spell" to execute your necromancy code
5. Watch the spectral turtle complete your dark designs

### Building for Production
```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

- HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+)
- CSS3 for gothic styling
- No frameworks - pure web magic

## 📁 Project Structure

```
necro-turtle/
├── index.html          # Main application page
├── styles.css          # Dark gothic styling
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite bundler config
├── src/
│   ├── main.ts         # Application entry point
│   ├── types.ts        # TypeScript interfaces
│   ├── turtle.ts       # Core turtle graphics engine
│   ├── necromancy.ts   # Necromancy command API
│   ├── parser.ts       # Command parser and executor
│   ├── effects.ts      # Visual effects and animations
│   ├── game.ts         # Game state and quest manager
│   ├── entities.ts     # Game entities (souls, demons, buildings)
│   ├── collision.ts    # Collision detection
│   ├── levels.ts       # Quest definitions
│   ├── ui.ts           # UI component management
│   └── examples.ts     # Pre-written example rituals
└── .kiro/              # Kiro AI development artifacts
    ├── steering/       # Project guidance documents
    ├── hooks/          # Automated workflow hooks
    └── specs/          # Development specifications
```

## 🎨 Visual Design

- **Dark Theme**: Deep blacks and purples
- **Glowing Effects**: Mystical green (#00ff88) or purple (#bb88ff) trails
- **Gothic Typography**: Atmospheric fonts
- **Smooth Animations**: Fluid turtle movements
- **Spectral Cursor**: Ghostly turtle or skull icon

## 🤖 Built with Kiro

This project was developed using Kiro's AI-powered IDE features:
- **Steering Docs** for consistent project vision
- **Spec-Driven Development** for structured implementation
- **Agent Hooks** for automated testing and documentation
- **Vibe Coding** for creative elements and refinements

See `.kiro/KIRO_USAGE.md` for detailed information on how Kiro was used.

## 📝 License

[Your chosen OSI-approved open source license]

## 🎃 Happy Kiroween!

May your rituals be successful and your code be bug-free. 🦴✨
