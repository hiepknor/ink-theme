import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#react-preview')).toBeVisible();
});

for (const density of ['compact', 'default', 'touch']) {
  test(`${density} component density`, async ({ page }) => {
    const preview = page.locator(`[data-density-preview="${density}"]`);
    await expect(preview).toBeVisible();
    await expect(preview).toHaveScreenshot(`density-${density}.png`);
  });
}

test('native HTML compatibility matrix', async ({ page }) => {
  const native = page.getByTestId('native-compatibility');
  await expect(native).toBeVisible();
  await expect(native).toHaveScreenshot('native-html-compatibility.png');

  await expect(native.getByRole('textbox', { name: /Deployment tag/ })).toHaveAttribute('required', '');
  await expect(native.getByRole('textbox', { name: 'Description' })).toHaveAttribute('readonly', '');
  await expect(native.getByRole('textbox', { name: 'Invalid service' })).toHaveAttribute('aria-invalid', 'true');
  await expect(native.getByText('Service already exists')).toHaveAttribute('id', 'native-service-error');
  await expect(native.getByRole('option', { name: 'Unavailable region' })).toHaveAttribute('disabled', '');
});

test('native bordered controls use internal focus', async ({ page }) => {
  const controls = [
    page.locator('input[name="service"]'),
    page.locator('select[name="environment"]'),
    page.locator('textarea[name="description"]'),
    page.getByTestId('native-compatibility').getByRole('button', { name: 'Secondary' }),
  ];
  for (const control of controls) {
    await control.focus();
    expect(await control.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('none');
    expect(await control.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe('none');
  }
});

test('desktop application shell', async ({ page }) => {
  const shell = page.getByTestId('desktop-foundation');
  await expect(shell).toBeVisible();
  await expect(shell).toHaveScreenshot('desktop-shell.png');
});

test('desktop toolbar balance', async ({ page }) => {
  const toolbar = page.getByRole('toolbar', { name: 'Workspace tools' });
  await expect(toolbar).toBeVisible();
  await expect(toolbar).toHaveScreenshot('desktop-toolbar.png');
});

test('desktop toolbar returned focus', async ({ page }) => {
  const actions = page.getByRole('button', { name: 'Actions' });
  await actions.click();
  await page.getByRole('menuitem', { name: 'Rename' }).click();
  await expect(actions).toBeFocused();
  await expect(page.getByRole('toolbar', { name: 'Workspace tools' })).toHaveScreenshot('desktop-toolbar-focused.png');
});

test('extended component library', async ({ page }) => {
  const breadth = page.getByTestId('component-breadth');
  await expect(breadth).toBeVisible();
  await expect(breadth).toHaveScreenshot('component-breadth.png');
});

test('card composition', async ({ page }) => {
  const cards = page.getByTestId('card-composition');
  await expect(cards).toBeVisible();
  await expect(cards).toHaveScreenshot('card-composition.png');
});

test('upload and image surface composition', async ({ page }) => {
  const media = page.getByTestId('media-workbench');
  await expect(media).toBeVisible();
  await expect(media).toHaveScreenshot('media-workbench.png');
  await expect(media.getByText('Choose files or drop them here')).toBeVisible();
  await expect(media.getByRole('img', { name: 'Unavailable service artwork' })).toBeVisible();
});

test('data table composition and interactions', async ({ page }) => {
  const dataTable = page.getByTestId('data-table-workbench');
  await expect(dataTable).toBeVisible();
  await expect(dataTable).toHaveScreenshot('data-table-workbench.png');
  await dataTable.getByRole('combobox', { name: 'Filter by owner' }).click();
  await page.getByRole('option', { name: 'All owners' }).click();
  await expect(dataTable.getByText('5 services')).toBeVisible();
  await dataTable.getByRole('button', { name: /Service/ }).click();
  await dataTable.getByRole('checkbox', { name: 'Select row edge-router' }).check();
  await expect(dataTable.getByRole('button', { name: 'Archive 1' })).toBeVisible();
  await dataTable.getByRole('searchbox').fill('missing');
  await expect(dataTable.getByText('No services match these filters.')).toBeVisible();
});

test('error hierarchy, placement, and recovery', async ({ page }) => {
  const errors = page.getByTestId('error-experience');
  await expect(errors).toBeVisible();
  await expect(errors).toHaveScreenshot('error-experience.png');
  await expect(errors.getByRole('status', { name: 'System notice' })).toContainText('Working offline');

  await errors.getByRole('button', { name: 'Clear errors' }).click();
  await expect(errors.getByRole('alert')).toHaveCount(0);
  await errors.getByRole('button', { name: 'Validate form' }).click();
  await expect(errors.getByRole('alert')).toBeFocused();
  await errors.getByRole('link', { name: /Service name/ }).click();
  await expect(errors.getByRole('textbox', { name: 'Service name' })).toBeFocused();

  await errors.getByRole('button', { name: 'Retry refresh' }).click();
  await expect(errors.getByText('Could not refresh services')).not.toBeVisible();
  await expect(errors.getByRole('table', { name: 'Service health cache' })).toContainText('Edge router');
});

test('failed dialog preserves context and background error uses toast', async ({ page }) => {
  const errors = page.getByTestId('error-experience');
  await errors.getByRole('button', { name: 'Open failed dialog' }).click();
  const dialog = page.getByRole('dialog', { name: 'Create service' });
  await expect(dialog.getByText('Service was not created')).toBeVisible();
  await expect(dialog.getByRole('textbox', { name: 'Service name' })).toHaveValue('edge-router');
  await page.keyboard.press('Escape');
  await errors.getByRole('button', { name: 'Show background error' }).click();
  await expect(page.getByText('Sync interrupted')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry now' })).toBeVisible();
});

test('media gallery lightbox', async ({ page }) => {
  const media = page.getByTestId('media-workbench');
  await media.getByRole('button', { name: 'Open Contained architecture artwork' }).click();
  const lightbox = page.getByRole('dialog', { name: 'Image preview' });
  await expect(lightbox).toBeVisible();
  await expect(lightbox).toHaveScreenshot('media-lightbox.png');
  await lightbox.getByRole('button', { name: 'Next' }).click();
  await expect(lightbox.getByRole('img', { name: 'Service topology artwork' })).toBeVisible();
});

test('custom select dropdown', async ({ page }) => {
  await page.getByTestId('desktop-foundation').getByRole('combobox', { name: 'Region', exact: true }).click();
  await expect(page.getByRole('option', { name: 'Singapore' })).toBeVisible();
  await expect(page).toHaveScreenshot('select-dropdown.png');
});

test('textbox focus treatment', async ({ page }) => {
  const textarea = page.getByTestId('desktop-foundation').getByRole('textbox', { name: 'Description' });
  await textarea.focus();
  await expect(textarea).toHaveScreenshot('textbox-focus.png');
});

test('bordered controls avoid external focus rings', async ({ page }) => {
  const button = page.locator('[data-density-preview="default"]').getByRole('button', { name: 'Secondary' });
  await button.focus();
  expect(await button.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('none');
  expect(await button.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe('none');

  const checkbox = page.locator('[data-density-preview="default"]').getByRole('checkbox', { name: 'Tracing' });
  await checkbox.focus();
  expect(await checkbox.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('none');
  expect(await checkbox.locator('xpath=..').evaluate((element) => getComputedStyle(element).textDecorationLine)).toContain('underline');

  const nativeInput = page.locator('input[name="service"]');
  await nativeInput.focus();
  expect(await nativeInput.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('none');
});

test('dialog overlay', async ({ page }) => {
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect(page.getByRole('dialog', { name: 'Create service' })).toBeVisible();
  await expect(page).toHaveScreenshot('dialog-overlay.png');
});

test('drawer overlay', async ({ page }) => {
  await page.getByRole('button', { name: 'Open drawer' }).click();
  await expect(page.getByRole('dialog', { name: 'Service inspector' })).toBeVisible();
  await expect(page).toHaveScreenshot('drawer-overlay.png');
});

test('motion contract is active without reduced motion', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'no-preference' });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: 'Open drawer' }).click();
  const drawer = page.getByRole('dialog', { name: 'Service inspector' });
  await expect(drawer).toBeVisible();
  expect(await drawer.evaluate((element) => getComputedStyle(element).animationName)).toBe('ink-ui-from-right');
  await context.close();
});
