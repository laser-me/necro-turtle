# Build Validation Specification

## Overview
Ensure the Necro-Turtle project can be successfully compiled and built for production deployment.

## Requirements

### 1. TypeScript Compilation
- All TypeScript files must compile without errors
- No type errors in strict mode
- All imports resolve correctly
- No unused variables or parameters (warnings acceptable during development)

### 2. Production Build
- `npm run build` completes successfully
- Generates optimized JavaScript bundle
- Creates dist/ directory with all assets
- Source maps generated for debugging
- No build warnings or errors

### 3. Build Output Validation
The dist/ folder must contain:
- `index.html` - Main HTML file
- `assets/` folder with:
  - Compiled JavaScript bundle (*.js)
  - CSS files (*.css)
  - Source maps (*.js.map)

### 4. Build Size Optimization
- Total bundle size should be reasonable (< 500KB uncompressed)
- Code splitting if needed
- Tree shaking removes unused code
- Minification applied

## Validation Commands

### Type Check
```bash
npm run type-check
```
Expected: Exit code 0, no errors

### Production Build
```bash
npm run build
```
Expected: 
- Exit code 0
- dist/ folder created
- No compilation errors
- Build completes in reasonable time (< 30 seconds)

### Build Output Verification
```bash
# Windows
dir dist
dir dist\assets

# Verify index.html exists
type dist\index.html
```

### Preview Build
```bash
npm run preview
```
Expected:
- Server starts successfully
- Application loads in browser
- No console errors
- All features work correctly

## Continuous Integration Checks

### Pre-Commit Hook
Before committing code:
1. Run type check
2. Verify no TypeScript errors
3. Optionally run build (for major changes)

### Pre-Push Hook
Before pushing to repository:
1. Run full production build
2. Verify dist/ folder generated
3. Check bundle size
4. Run preview and smoke test

### Pre-Deployment
Before deploying to production:
1. Clean build (remove dist/, node_modules/)
2. Fresh npm install
3. Run production build
4. Verify all assets generated
5. Test in production-like environment

## Error Handling

### Common Build Errors

**TypeScript Errors:**
- Missing imports: Add proper import statements
- Type mismatches: Fix type annotations
- Undefined variables: Declare or import variables
- Strict mode violations: Add null checks, type guards

**Vite Build Errors:**
- Module not found: Check import paths
- Circular dependencies: Refactor code structure
- Out of memory: Increase Node memory limit
- Asset loading issues: Check public/ folder

**Resolution Steps:**
1. Read error message carefully
2. Check file paths and imports
3. Verify tsconfig.json settings
4. Clear cache: `rm -rf node_modules dist`
5. Reinstall: `npm install`
6. Rebuild: `npm run build`

## Success Criteria
- ✅ TypeScript compiles with zero errors
- ✅ Production build completes successfully
- ✅ dist/ folder contains all required files
- ✅ Bundle size is optimized
- ✅ Preview server runs without errors
- ✅ Application functions correctly in production build
- ✅ No console errors in browser

## Automated Validation

### Hook Integration
The build-check hook automatically runs type checking on every .ts file save, catching errors early in development.

### Manual Validation
Use the pre-commit-validation hook before committing to ensure full build integrity.

## Deployment Checklist
- [ ] All TypeScript files compile
- [ ] Production build succeeds
- [ ] dist/ folder generated
- [ ] index.html present in dist/
- [ ] Assets folder contains bundles
- [ ] Preview works correctly
- [ ] No console errors
- [ ] All features functional
- [ ] .kiro/ folder included in repository
- [ ] README.md updated
- [ ] License file present

## Troubleshooting

### Build Fails
1. Check Node.js version (should be 18+)
2. Clear node_modules: `rm -rf node_modules`
3. Clear dist: `rm -rf dist`
4. Reinstall: `npm install`
5. Try build again: `npm run build`

### Type Errors
1. Run: `npm run type-check`
2. Fix errors one by one
3. Check import statements
4. Verify interface definitions
5. Add type annotations where needed

### Vite Errors
1. Check vite.config.ts
2. Verify file paths
3. Check for circular dependencies
4. Update Vite if needed: `npm update vite`

## Performance Targets
- Type check: < 5 seconds
- Production build: < 30 seconds
- Bundle size: < 500KB (uncompressed)
- Initial load time: < 2 seconds
