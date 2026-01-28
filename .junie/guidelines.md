# Silverstripe Development Guidelines

This project is a Silverstripe CMS application. Development is carried out using DDEV and follows a quality-driven approach with a focus on testing and clean code.

## Language Standards

- All code, including variable names, method names, and comments, must be written in English.
- Documentation and commit messages should also be in English.
- Line length should not exceed 120 characters.

## Frontend Development

- The project uses **TailwindCSS** for styling within the theme.
- Frontend assets are managed within the respective theme directory (e.g., `themes/mytheme`).

## Development Environment (DDEV)

- All PHP commands must be executed via DDEV.
- Use the commands defined in `.junie.json`:
    - `ddev phpunit` - Runs PHPUnit tests.
    - `ddev lint` - Runs code linting checks.
    - `ddev fix` - Automatically fixes code style issues.
    - `ddev stan` - Performs PHPStan static analysis.
    - `ddev rector` - Runs Rector for automated refactoring.
    - `ddev ci` - Runs all checks (lint, stan, rector, tests) combined.

## Testing Strategy

- **Unit Testing First**: When implementing new features or fixing bugs, prefer Unit Tests to verify the logic.
- Before making code changes, create or adapt a test that reproduces the desired behavior or bug.
- Ensure all tests pass before submitting changes.

## Quality Assurance

- Run `ddev ci` before every `submit` to ensure that the code meets all standards and no regressions are introduced.

