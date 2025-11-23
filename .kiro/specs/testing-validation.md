# Testing and Validation Specification

## Overview
Ensure the Necro-Turtle application runs correctly in the browser with all features functional.

## Development Server Testing

### Start Dev Server
```bash
npm run dev
```

Expected:
- Vite dev server starts on http://localhost:5173
- Browser opens automatically
- No compilation errors
- Hot module replacement (HMR) works

### Manual Testing Checklist

#### UI Elements
- [ ] Page loads with dark gothic theme
- [ ] Title "NECRO-TURTLE" displays correctly
- [ ] Mode selector shows "Free Draw" and "Quest Mode"
- [ ] Canvas renders (800x600, black background)
- [ ] Code editor textarea is visible and editable
- [ ] "Cast Spell" button is visible
- [ ] "Clear Grave" and "Reset Turtle" buttons work

#### Free Draw Mode
- [ ] Example ritual dropdown populates
- [ ] Selecting an example loads code into editor
- [ ] "Cast Spell" executes code
- [ ] Turtle draws on canvas
- [ ] Trail is visible with glow effect
- [ ] Turtle sprite/triangle is visible
- [ ] Output console shows success/error messages

#### Quest Mode
- [ ] Switching to Quest Mode shows quest selector
- [ ] Game HUD appears with score, souls, commands
- [ ] Quest selector populates with quests
- [ ] Selecting a quest loads entities on canvas
- [ ] Objectives panel shows quest objectives
- [ ] Entities render (souls 👻, demons 😈, buildings 🪦)

#### Command Testing

**Movement Commands:**
```javascript
summon(100);      // Move forward
banish(50);       // Move backward
turnLeft(90);     // Turn left
turnRight(45);    // Turn right
haunt(400, 300);  // Teleport
```

**Drawing Commands:**
```javascript
raiseSpirit();           // Pen up
bindSpirit();            // Pen down
conjureColor('#bb88ff'); // Change color
setLineWidth(5);         // Change width
```

**Utility Commands:**
```javascript
ritual(4, () => {
  summon(100);
  turnRight(90);
});
clearGrave();   // Clear canvas
resurrect();    // Reset turtle
```

**Game Commands (Quest Mode):**
```javascript
collectSoul();   // Collect soul at position
banishDemon();   // Banish demon at position
checkQuest();    // Check quest status
getPosition();   // Get turtle coordinates
```

#### Example Rituals Testing
Test each example:
1. **Summoning Circle** - Should draw pentagram
2. **Spirit Path** - Should draw spiral
3. **Grave Marker** - Should draw cross
4. **Haunted House** - Should draw house outline
5. **Necromancer's Sigil** - Should draw complex pattern

#### Quest Testing

**Quest 1: Soul Collector**
```javascript
// Test collecting souls
haunt(200, 150);
collectSoul();
haunt(600, 150);
collectSoul();
// Continue for all 5 souls
```
Expected: Souls disappear, score increases, objectives update

**Quest 2: Demon Hunter**
```javascript
// Test banishing demons
haunt(250, 200);
banishDemon();
haunt(550, 200);
banishDemon();
haunt(400, 450);
banishDemon();
```
Expected: Demons disappear, score increases, quest completes

**Quest 3: Graveyard Resurrection**
```javascript
// Navigate to graveyard
summon(200);
turnRight(45);
summon(300);
// etc.
```
Expected: Can navigate to graveyard location

## Browser Console Testing

### Check for Errors
Open browser DevTools (F12) and check:
- [ ] No JavaScript errors in console
- [ ] No TypeScript compilation errors
- [ ] No 404 errors for missing files
- [ ] Canvas renders without warnings

### Console Output
Expected messages:
- "🦴 Necro-Turtle initialized. The dark arts await..."
- Success messages when rituals execute
- Error messages with necromancy theme when code fails

## Visual Testing

### Styling
- [ ] Dark background gradient (black to purple)
- [ ] Green (#00ff88) text for primary elements
- [ ] Purple (#bb88ff) text for secondary elements
- [ ] Glowing effects on borders and text
- [ ] Gothic/monospace fonts
- [ ] Buttons have hover effects
- [ ] Canvas has glowing border

### Canvas Rendering
- [ ] Turtle sprite visible at center
- [ ] Trail draws with correct color
- [ ] Trail has smooth lines
- [ ] Entities render with glow effects
- [ ] Emojis display correctly (👻😈🪦)

### Responsive Design
- [ ] Layout works on different screen sizes
- [ ] Canvas scales appropriately
- [ ] Controls wrap on smaller screens

## Performance Testing

### Metrics
- [ ] Initial page load < 2 seconds
- [ ] Canvas rendering is smooth (no lag)
- [ ] Commands execute immediately
- [ ] No memory leaks during extended use
- [ ] HMR updates quickly during development

### Stress Testing
```javascript
// Test with many commands
for (let i = 0; i < 1000; i++) {
  summon(1);
  turnRight(1);
}
```
Expected: Should complete without freezing

## Error Handling Testing

### Invalid Code
```javascript
summon();           // Missing parameter
invalidCommand();   // Unknown command
summon("text");     // Wrong type
```
Expected: Error message with necromancy theme

### Edge Cases
- Empty code editor - should show error
- Very long code - should execute
- Infinite loop - should timeout or warn
- Out of bounds coordinates - should handle gracefully

## Cross-Browser Testing
Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

## Success Criteria
- ✅ Dev server starts without errors
- ✅ Application loads in browser
- ✅ All UI elements render correctly
- ✅ Free Draw mode works with all examples
- ✅ Quest mode loads and displays entities
- ✅ All 17+ commands execute correctly
- ✅ Canvas rendering is smooth and accurate
- ✅ No console errors
- ✅ Visual styling matches gothic theme
- ✅ Game mechanics work (collision, scoring)

## Known Issues to Check
- Turtle rotation direction (clockwise vs counterclockwise)
- Canvas coordinate system (0,0 at top-left)
- Entity collision detection radius
- Trail rendering performance with many points
- Color format handling (hex, rgb, named colors)

## Debugging Tips
- Use browser DevTools to inspect elements
- Check Network tab for failed requests
- Use Console to test commands directly
- Inspect canvas with browser tools
- Check Vite terminal output for build errors
