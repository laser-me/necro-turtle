# 🦴 Necro-Turtle Quick Test Guide

## 🚀 Server is Running!
**URL**: http://localhost:5173/

## ⚡ Quick Tests (Copy & Paste)

### Test 1: Draw a Pentagram (30 seconds)
1. Open http://localhost:5173/
2. Select "Summoning Circle" from dropdown
3. Click "🔮 Cast Spell"
4. ✅ You should see a pentagram appear!

### Test 2: Draw a Spiral (30 seconds)
1. Select "Spirit Path" from dropdown
2. Click "🔮 Cast Spell"
3. ✅ You should see a spiral pattern!

### Test 3: Custom Code (1 minute)
Paste this in the code editor:
```javascript
conjureColor('#bb88ff');
ritual(8, () => {
  summon(80);
  turnRight(45);
});
```
Click "🔮 Cast Spell"
✅ You should see a purple octagon!

### Test 4: Quest Mode - Soul Collector (2 minutes)
1. Change mode to "Quest Mode"
2. Select "Soul Collector" quest
3. ✅ You should see 7 ghost emojis (👻) at random positions
4. Paste this code:
```javascript
// Get all soul positions
const souls = getSoulPositions();

// Visit and collect each soul
souls.forEach(soul => {
  haunt(soul.x, soul.y);
  collectSoul();
});
```
5. Click "🔮 Cast Spell"
6. ✅ All ghosts disappear, score increases with efficiency bonus!
7. Check console for your command count and efficiency score

### Test 5: Quest Mode - Demon Hunter (2 minutes)
1. Select "Demon Hunter" quest
2. ✅ You should see 3 demon emojis (😈)
3. Paste this code:
```javascript
haunt(250, 200);
banishDemon();
haunt(550, 200);
banishDemon();
haunt(400, 450);
banishDemon();
```
4. Click "🔮 Cast Spell"
5. ✅ Demons disappear, score increases!

## 🎨 Visual Checklist
- [ ] Dark purple/black background
- [ ] Green glowing text
- [ ] Canvas with black background
- [ ] Turtle sprite visible
- [ ] Trail draws when moving
- [ ] Entities (👻😈🪦) render in quest mode

## 🐛 Check Browser Console
Press F12 and look for:
- ✅ "🦴 Necro-Turtle initialized..."
- ❌ No red errors

## 🎯 All Commands Test
```javascript
// Movement
summon(100);
banish(50);
turnLeft(90);
turnRight(45);
haunt(400, 300);

// Drawing
raiseSpirit();
summon(50);
bindSpirit();
conjureColor('#ff0000');
setLineWidth(5);
summon(50);

// Utility
ritual(4, () => {
  summon(30);
  turnRight(90);
});
clearGrave();
resurrect();
```

## 📊 Expected Results

### Free Draw Mode
- All 5 examples work
- Custom code executes
- Trail draws correctly
- Colors change
- Clear and reset work

### Quest Mode
- Quests load with entities
- HUD shows score/souls/commands
- Objectives update
- Collision detection works
- Quest completion triggers

## 🎉 Success Criteria
If you can:
1. ✅ See the application load
2. ✅ Draw a pentagram
3. ✅ Collect souls in quest mode
4. ✅ No console errors

**Then the application is working perfectly!** 🦴✨

## 🔧 Troubleshooting

### Application doesn't load
- Check if server is running: http://localhost:5173/
- Look for errors in terminal
- Try refreshing the page

### Canvas is blank
- Check browser console for errors
- Try clicking "Reset Turtle"
- Verify code has no syntax errors

### Entities don't appear
- Make sure you're in "Quest Mode"
- Select a quest from dropdown
- Check if emojis are supported in your browser

### Commands don't work
- Check for typos in command names
- Verify parentheses and semicolons
- Look at error message in output panel

## 📝 Report Issues
If something doesn't work:
1. Note what you were doing
2. Check browser console (F12)
3. Check terminal output
4. Note any error messages
