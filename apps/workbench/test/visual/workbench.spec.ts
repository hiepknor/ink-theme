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

test('desktop application shell', async ({ page }) => {
  const shell = page.getByTestId('desktop-foundation');
  await expect(shell).toBeVisible();
  await expect(shell).toHaveScreenshot('desktop-shell.png');
});

test('extended component library', async ({ page }) => {
  const breadth = page.getByTestId('component-breadth');
  await expect(breadth).toBeVisible();
  await expect(breadth).toHaveScreenshot('component-breadth.png');
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

test('dialog overlay', async ({ page }) => {
  await page.getByRole('button', { name: 'Open dialog' }).click();
  await expect(page.getByRole('dialog', { name: 'Create service' })).toBeVisible();
  await expect(page).toHaveScreenshot('dialog-overlay.png');
});
