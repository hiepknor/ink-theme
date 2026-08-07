# Ink Theme gallery

The standalone gallery covers tokens, typography, screentone recipes, hard
lift, form controls, interaction states, strict-mode scope, dense tables, and
inspector composition without importing product code.

After installing development dependencies, run:

```sh
pnpm dev
```

Create a production gallery build with:

```sh
pnpm build
```

The output is written to `dist/gallery` and is not part of the published
package.

The preview imports `scoped-strict.css`. Its toolbar toggles `.ink-strict` on
the preview root so default application geometry and the scoped lock can be
compared without reloading the page. Resize the browser to review responsive
layouts and use the Tab key to review keyboard focus states.
