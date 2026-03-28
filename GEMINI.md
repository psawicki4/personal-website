# Gemini CLI Project Instructions

- **Package Manager**: This project uses **pnpm**. Always use `pnpm exec` instead of `npx` (e.g., `pnpm exec nx build personal-website`).
- **Compilation Check**: Always verify changes by running the appropriate build command (e.g., `pnpm exec nx build personal-website`) before finishing a task.
- **Nx Monorepo**: This is an Nx monorepo. When creating components in libraries (`libs/`), ensure they are exported in the library's `index.ts`.
- **SASS Imports**: Shared SASS variables (like `$primary`, `$surface`) are available globally in the workspace. Use `@use 'variables' as var;` in all components (including libraries).
- **Component Structure**: Always use separate files for components: `.ts` for logic, `.html` for templates, and `.scss` for styles. Each component should reside in its own dedicated folder.
- **Component Style**: Prefer `OnPush` change detection and standalone components as per the project's standards.

## Testing Standards

- **Framework**: Always use **Vitest** for unit testing.
- **Mocking Transloco**: If a component or service uses `TranslocoService` or `TranslocoDirective`, always use `createTranslocoMock()` from the `utils` library.
  - Example: `import { createTranslocoMock } from 'utils';` and then `{ provide: TranslocoService, useValue: createTranslocoMock() }` in providers.
- **Test Location**: Keep `.spec.ts` files in the same directory as the file being tested.
- **Verification**: When adding new features, try to add or update corresponding unit tests and ensure they pass using `pnpm exec nx test <project-name>`.
