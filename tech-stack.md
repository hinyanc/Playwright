## Framework and Programming Language

- **Framework:** Playwright
- **Programming Language:** TypeScript

### Why Playwright

- **Codegen**: Playwright provides a code generation feature that records user actions and converts them directly into test scripts, which speeds up initial test creation.
- **Parallel execution**: Playwright supports running tests in parallel out of the box, significantly reducing overall execution time compared to other frameworks.
- **Built-in auto-waiting**: Playwright automatically waits for elements to be actionable (visible, enabled, stable) before interacting with them, which greatly reduces flaky tests caused by timing issues.

### Why TypeScript

TypeScript was chosen as the programming language for this test suite for two main reasons:

- **Static type checking**: Catches type-related errors at compile time rather than at runtime, reducing the likelihood of bugs slipping into test execution.
- **Improved maintainability**: Type definitions make the codebase easier to navigate and refactor, which is especially valuable as the test suite grows in size and complexity.
