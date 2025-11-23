# TypeScript Guidelines for Necro-Turtle

## Type Safety
- Enable strict mode in tsconfig.json
- No implicit any types
- Strict null checks enabled
- Use explicit return types for functions
- Define interfaces for all data structures

## Interface Definitions

### Core Types
```typescript
interface Point {
  x: number;
  y: number;
}

interface TurtleState {
  position: Point;
  angle: number;
  penDown: boolean;
  color: string;
  lineWidth: number;
}

interface Ritual {
  name: string;
  description: string;
  code: string;
}

interface EffectConfig {
  color: string;
  intensity: number;
  duration: number;
}
```

## Function Signatures
- Use arrow functions with explicit types
- Define parameter types
- Define return types
- Use void for functions with no return

Example:
```typescript
function summon(distance: number): void {
  // implementation
}

const turnLeft = (angle: number): void => {
  // implementation
};
```

## Module Organization
- Use ES6 modules (import/export)
- Export interfaces from types.ts
- Export functions from respective modules
- Keep related code together

## Type Guards
- Use type guards for runtime checks
- Validate user input with type predicates
- Handle edge cases with proper typing

## Generic Types
- Use generics for reusable functions
- Type ritual callbacks properly
- Ensure type safety in loops and iterations

## Compilation
- Target ES2020 or later
- Generate source maps
- Output to dist/ folder
- Use Vite for bundling
