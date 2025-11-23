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

- **12 Necromancy Commands** - Control the spectral turtle with dark magic
- **5 Example Rituals** - Pre-written programs to get you started
- **Dark Gothic UI** - Immersive necromancy atmosphere
- **Real-time Execution** - Watch your rituals come to life
- **Glowing Trails** - Mystical green/purple effects

## 🕯️ Necromancy Command Reference

| Command | Parameters | Description | Example |
|---------|-----------|-------------|---------|
| `summon(distance)` | distance: number | Move the turtle forward | `summon(100)` |
| `banish(distance)` | distance: number | Move the turtle backward | `banish(50)` |
| `turnLeft(angle)` | angle: degrees | Rotate counterclockwise | `turnLeft(90)` |
| `turnRight(angle)` | angle: degrees | Rotate clockwise | `turnRight(45)` |
| `raiseSpirit()` | none | Lift pen (stop drawing) | `raiseSpirit()` |
| `bindSpirit()` | none | Lower pen (start drawing) | `bindSpirit()` |
| `conjureColor(color)` | color: string | Change trail color | `conjureColor('#00ff88')` |
| `haunt(x, y)` | x, y: coordinates | Teleport to position | `haunt(400, 300)` |
| `ritual(count, fn)` | count: number, fn: function | Repeat commands | `ritual(4, () => summon(100))` |
| `clearGrave()` | none | Clear the canvas | `clearGrave()` |
| `resurrect()` | none | Reset turtle to center | `resurrect()` |

## 📜 Example Rituals

### Summoning Circle (Pentagram)
```javascript
ritual(5, () => {
  summon(150);
  turnRight(144);
});
```

### Spirit Path (Spiral)
```javascript
for(let i = 0; i < 100; i++) {
  summon(i * 2);
  turnRight(45);
}
```

### Grave Marker (Cross)
```javascript
summon(100);
banish(50);
turnLeft(90);
summon(50);
banish(100);
summon(50);
```

## 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. Select an example ritual from the dropdown or write your own
3. Click "Cast Spell" to execute your necromancy code
4. Watch the spectral turtle draw your dark designs

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
├── turtle.js           # Core turtle graphics engine
├── necromancy.js       # Necromancy command API
├── parser.js           # Command parser and executor
├── effects.js          # Visual effects and animations
├── examples.js         # Pre-written example rituals
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
