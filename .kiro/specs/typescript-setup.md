# TypeScript Setup Specification

## Requirements

### 1. Package Configuration
Create `package.json` with:
- TypeScript as dev dependency
- Vite for bundling and dev server
- Type definitions for DOM APIs
- Scripts for dev, build, and preview

### 2. TypeScript Configuration
Create `tsconfig.json` with:
- Strict mode enabled
- Target: ES2020
- Module: ESNext
- ModuleResolution: bundler
- Source maps enabled
- Output directory: dist
- Include: src/**/*
- Exclude: node_modules, dist

### 3. Vite Configuration
Create `vite.config.ts` with:
- Root directory configuration
- Build output to dist
- Public directory for assets
- Dev server port (default 5173)

### 4. Project Structure
```
necro-turtle/
├── index.html
├── styles.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts
│   ├── types.ts
│   ├── turtle.ts
│   ├── necromancy.ts
│   ├── parser.ts
│   ├── effects.ts
│   └── examples.ts
├── dist/ (generated)
└── node_modules/ (generated)
```

### 5. Dependencies
```json
{
  "devDependencies": {
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

### 6. Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript compiler

## Implementation Steps
1. Initialize package.json
2. Install TypeScript and Vite
3. Create tsconfig.json
4. Create vite.config.ts
5. Set up src/ directory structure
6. Update index.html to reference main.ts
7. Test build process

## Success Criteria
- TypeScript compiles without errors
- Vite dev server runs successfully
- Hot module replacement works
- Production build generates optimized output
- Type checking catches errors
