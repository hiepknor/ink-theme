# Ink Workbench

The private Vite workbench reviews tokens, typography, patterns, controls,
interaction states, strict-mode scope, dense data, composition, and the React
vertical slice without shipping application code in public packages.

The default view is a hash-routed component catalog. Its sections are:
`Overview`, `Foundations`, `Forms`, `Feedback`, `Data`, `Media`, and `Desktop`.
Routes such as `/#/data` are dependency-free, reload-safe, and can be shared
directly. `/#/all` retains the full native compatibility and visual-regression
matrix used by CI.

Each stable contract also has a direct route such as `/#/component/button` with
an interactive example, required states, key props, accessibility guidance,
and related components. Use the **Find component** control or `Ctrl/Command+K`
to search the registry by name, family, or purpose.

The workbench has one React root and one rendering pipeline. Catalog routes
render only the selected documentation surface; `/#/all` renders the native
compatibility gallery and React examples as one React tree. Coarse pointers use
the shared touch target token; browser gates also cover focus restoration,
forced colors, reduced motion, and registry drift.

From the repository root:

```sh
pnpm dev
```

Create a production build with `pnpm build`. Output is written to
`dist/workbench` and is not published to npm.

## Visual regression

The Playwright suite captures density, desktop-shell, and overlay contracts in
Chromium. Run the committed Linux baselines with:

```sh
pnpm --filter @hiepknor/ink-workbench exec playwright install --with-deps chromium
pnpm test:visual
```

Update baselines only for an intentional visual-contract change. Because pixel
output is platform-specific, run this command in the same Linux environment
used by CI (`mcr.microsoft.com/playwright:v1.62.1-noble`):

```sh
pnpm test:visual --update-snapshots
```

Review every changed PNG before committing it.
