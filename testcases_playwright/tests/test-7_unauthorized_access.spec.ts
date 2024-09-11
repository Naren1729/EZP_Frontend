//**
// * @Author: Arvind
//* @Date: 11/09/2024

// Test0: Testing if admin and transaction pages are accessible without logging in ;  

// Run cmd : npx playwright test test-7_unauthorized_access --project chromium --workers 1 --debug

import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

// ===================
// Test for user page unauthorized access
// ===================
test('userTest', async ({ page }) => {
  // Navigate to user form page
  await page.goto('http://localhost:3000/main/userForm');
  
  // Check for the unauthorized access message and redirect
  const toast1 = page.locator('.Toastify__toast--error');
  await expect(toast1).toBeVisible();
  await expect(toast1).toContainText('Unauthorized access. Please log in as user');
  
  // Check if it redirects to the login page
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
});

// ===================
// Test for admin page unauthorized access
// ===================
test('adminTest', async ({ page }) => {
  // Navigate to admin access page
  await page.goto('http://localhost:3000/admin/adminAccess');
  
  // Check the unauthorized access message and redirect
  // Check for the unauthorized access message and redirect
  const toast1 = page.locator('.Toastify__toast--error');
  await expect(toast1).toBeVisible();
  await expect(toast1).toContainText('Unauthorized access. Please log in');
  
  // Verify redirection to the admin login page
  await expect(page).toHaveURL('http://localhost:3000/admin/authenticate');
});

// ===================
// Test for user sign-up form
// ===================
test("signUpFormTest", async () => {
  // Launch browser in non-headless mode for manual verification
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  
  // Create a new browser context and open a new page
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Set a timeout for the test
  test.setTimeout(180000);
  
  // Navigate to the home page
  await page.goto('http://localhost:3000/');
  
  // Click on the 'User' link and go to authentication page
  await page.locator('div').filter({ hasText: /^User$/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  
  // Navigate to the sign-up form
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/userDepositForm');
  
  // Fill in the sign-up form with required details
  await page.getByPlaceholder('Username').fill('exampleUser');
  await page.getByPlaceholder('Name', { exact: true }).fill('exampleUser');
  await page.getByPlaceholder('Password', { exact: true }).fill('exampleUser');
  await page.getByPlaceholder('Email').fill('exampleUser@gmail.com');
  await page.getByPlaceholder('Current Balance').fill('1000');
  await page.getByPlaceholder('Transaction Password').fill('exampleUser');
  
  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Expect a successful signup and display a toast message
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  const toast = page.locator('.Toastify__toast--success');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('Signed up successfully');
  
  // Wait for the success message to disappear
  await page.waitForTimeout(6000);
});

// ===================
// Test for user trying to access admin page
// ===================
test('userToAdminTest', async ({ page }) => {
  // Log in as the user
  await page.goto('http://localhost:3000/main/authenticate');
  await page.getByPlaceholder('Username').fill('exampleUser');
  await page.getByPlaceholder('Password').fill('exampleUser');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Expect to be redirected to the user deposit form page after login
  await expect(page).toHaveURL('http://localhost:3000/main/userForm');
  
  // Try to access the admin page
  await page.goto('http://localhost:3000/admin/adminAccess');

  // Check for the unauthorized access message and redirect
  const toast1 = page.locator('.Toastify__toast--error');
  await expect(toast1).toBeVisible();
  await expect(toast1).toContainText('Unauthorized access. Please log in as admin');
  
  // Wait for a short period before ending the test
  await page.waitForTimeout(2000);
});

// ===================
// Test for admin trying to access user page
// ===================
test('adminToUserTest', async ({ page }) => {
  // Log in as the admin
  await page.goto('http://localhost:3000/admin/authenticate');
  await page.getByPlaceholder('Username').fill('admin123');
  await page.getByPlaceholder('Password').fill('EZP123');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Expect to be redirected to the admin access page
  await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
  
  // Try to access the user form page
  await page.goto('http://localhost:3000/main/userForm');
  
  // Check for the unauthorized access message and redirect
  const toast1 = page.locator('.Toastify__toast--error');
  await expect(toast1).toBeVisible();
  await expect(toast1).toContainText('Unauthorized access. Please log in as user');
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  
  // Wait for a short period before ending the test
  await page.waitForTimeout(2000);
});
