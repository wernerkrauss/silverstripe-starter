# Silverstripe Development Guidelines

This project is a Silverstripe CMS application. Development is carried out using DDEV and follows a quality-driven approach with a focus on testing and clean code.

# Workflow
- new features or bigger refactorings: first make an "Implementation Plan" as answer.
- wait for explicit OK from the user before modifying files.

## Language Standards

- All code, including variable names, method names, and comments, must be written in English.
- Documentation and commit messages should also be in English.
- Line length should not exceed 120 characters.

## Frontend Development

- The project uses **TailwindCSS** for styling within the theme.
- Frontend assets are managed within the respective theme directory (e.g., `themes/mytheme`).

## Development Environment (DDEV)

- All PHP commands must be executed via DDEV.
- All Node.js and Yarn commands must be executed via DDEV (e.g., `ddev node`, `ddev yarn`, `ddev npx`) to ensure the correct version is used, as the local environment might be outdated.
- Use the commands defined in `.junie.json`:
    - `ddev prettier` - Runs Prettier to format frontend assets and Silverstripe templates.
      - Note: Complex Silverstripe templates with structural logic (e.g. tags split across if/else like `<% if $A %><a><% else %><div><% end_if %>...<% if $A %></a><% else %></div><% end_if %>`) cause syntax errors and will be skipped.
      - **Recommendation**: Avoid "Tag Splitting". Instead, use `Includes` to reuse the content or duplicate the wrapping tags around the content to keep the HTML structure valid for the parser.
      - TailwindCSS: Classes in Silverstripe templates are automatically sorted.
    - `ddev phpunit` - Runs PHPUnit tests. ALWAYS use this command, never call PHPUnit or tests directly.
    - `ddev lint` - Runs code linting checks.
    - `ddev fix` - Automatically fixes code style issues.
    - `ddev stan` - Performs PHPStan static analysis.
    - `ddev rector` - Runs Rector for automated refactoring.
    - `ddev build` - Builds the database (db/build) and flushes configuration/cache. Use this when adding new fields or when configuration changes require a flush.
    - `ddev ci` - Runs all checks (lint, stan, rector, tests) combined.

## Testing Strategy

- **Unit Testing First**: When implementing new features or fixing bugs, prefer Unit Tests to verify the logic.
- Before making code changes, create or adapt a test that reproduces the desired behaviour or bug.
- Ensure all tests pass before submitting changes.

## Dependency Management (Composer)

- When modifying a `composer.json` file (in the project or a module), ALWAYS verify that the changes are valid and resolvable.
- Use `ddev composer validate` to check for syntax and basic configuration errors.
- Use `ddev composer update --dry-run` to verify if dependencies can be resolved.
- For modules, ensure that version constraints are consistent with the main project and the target Silverstripe version (e.g., Elemental ^5 for SS5, ^6 for SS6).

## Quality Assurance

- Run `ddev ci` before every `submit` to ensure that the code meets all standards and no regressions are introduced.

