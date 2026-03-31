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

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
