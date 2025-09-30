import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('shows welcome content and interactive counter', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/welcome to my site/i);
    await expect(page.getByRole('heading', { name: /welcome to my site/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /explore the app/i })).toBeVisible();

    const counterButton = page.getByRole('button', { name: /increment counter/i });
    await expect(page.getByText('Count: 0')).toBeVisible();

    await counterButton.click();
    await expect(page.getByText('Count: 1')).toBeVisible();
  });
});
