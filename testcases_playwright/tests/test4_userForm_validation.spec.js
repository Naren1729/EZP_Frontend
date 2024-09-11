//**
// * @Author: Keerthana B
//* @Date: 11/09/2024

// Test4: Testing sign-up window by giving insufficient information and waiting for dialog box.

// Run cmd: npx playwright test test4_userForm_validation --project chromium --workers 1 --debug

const { chromium } = require('playwright');
import {test, expect} from "@playwright/test";

test("sign-up form testing", async () => {
  const browser = await chromium.launch({
    headless: false, // Run browser in non-headless mode for debugging purposes
    slowMo: 500      // Slow down actions for better observation
  });
  test.setTimeout(180000); // Set a timeout for the test

  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the home page
  await page.goto('http://localhost:3000/');
  
  // Click on 'User' to access the user login page
  await page.locator('div').filter({ hasText: /^User$/ }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  
  // Go to the 'Sign up' page
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL('http://localhost:3000/main/userDepositForm');
  
  // Fill out the form with insufficient details (short password)
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('kim');
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.getByPlaceholder('Name', { exact: true }).fill('kim');
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('kim');  // Password too short
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('kim.com');  // Invalid email format
  await page.getByPlaceholder('Current Balance').click();
  await page.getByPlaceholder('Current Balance').fill('3000');
  await page.getByPlaceholder('Transaction Password').click();
  await page.getByPlaceholder('Transaction Password').fill('ki');  // Transaction password too short
  
  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expect an error notification about the password length
  const toast_1 = page.locator('.Toastify__toast--error');
  await expect(toast_1).toBeVisible();
  await expect(toast_1).toContainText('Password must be at least 4 characters long');
  await page.waitForTimeout(7000); // Wait for the notification to disappear
  
  // First correction: update the password to a valid length
  await page.getByPlaceholder('Password', { exact: true }).click();
  await page.getByPlaceholder('Password', { exact: true }).fill('kim02');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expect an error notification about the invalid email format
  const toast_2 = page.locator('.Toastify__toast--error');
  await expect(toast_2).toBeVisible();
  await expect(toast_2).toContainText('Invalid email format');
  await page.waitForTimeout(7000);

  // Second correction: update the email to a valid format
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('kim@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expect an error notification about the transaction password length
  const toast_3 = page.locator('.Toastify__toast--error');
  await expect(toast_3).toBeVisible();
  await expect(toast_3).toContainText('Transaction Password must be at least 4 characters long');
  await page.waitForTimeout(7000);

  // Third correction: update the transaction password to a valid length
  await page.getByPlaceholder('Transaction Password').fill('kim02');
  await page.getByRole('button', { name: 'Submit' }).click();

  // After fixing all errors, expect successful sign-up
  await expect(page).toHaveURL('http://localhost:3000/main/authenticate');
  const toast = page.locator('.Toastify__toast--success');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('Signed up successfully');
  await page.waitForTimeout(7000);

  // Close the browser context and the browser itself
  await context.close();
  await browser.close();
});

test('Checking updation of signed-up user data under admin - Get User Data', async () => {
  const browser = await chromium.launch({
    headless: false  // Run browser in non-headless mode for debugging
  });
  test.setTimeout(180000); // Set a timeout for the test
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the admin login page
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page).toHaveURL('http://localhost:3000/admin/authenticate');
  
  // Log in as the admin
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('admin123');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('EZP123');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Expect successful login notification
  await expect(page).toHaveURL('http://localhost:3000/admin/adminAccess');
  const toast2 = page.locator('.Toastify__toast--success');
  await expect(toast2).toBeVisible();
  await expect(toast2).toContainText('Logged in successfully');
  await page.waitForTimeout(7000);

  // Retrieve and check the user details
  await page.getByRole('button', { name: 'Get User Details' }).click();
  const title = page.locator('.get-data-title');
  await expect(title).toHaveText('All Users:');

  // Ensure there are multiple user cards
  const cards = page.locator('.card');
  const numberOfUsers = await cards.count();
  expect(numberOfUsers).toBeGreaterThan(0);  // Check if at least one user exists

  // Check the details of the last user (the newly created user 'kim')
  const card = cards.nth(numberOfUsers - 1);

  // Verify that the user ID is displayed
  const userId = card.locator('.circle h2');
  await expect(userId).not.toBeEmpty();

  // Ensure there are 4 paragraphs with details
  const paragraphs = card.locator('p');
  await expect(paragraphs).toHaveCount(4);

  // Verify the username, email, balance, and blocklist status
  const username = card.locator('p >> text=Username:').locator('.user-data-label');
  await expect(username).toHaveText('kim');
  const email = card.locator('p >> text=Email:').locator('.user-data-label');
  await expect(email).toHaveText('kim@gmail.com');
  const currentBalance = card.locator('p >> text=Current Balance:').locator('.user-data-label');
  await expect(currentBalance).toHaveText('3000');
  const blocklistStatus = card.locator('p >> text=Blocklist Status:').locator('.user-data-label');
  await expect(blocklistStatus).toHaveText('No');

  // Log out as the admin
  await page.locator('a').filter({ hasText: 'Logout' }).click();
  await expect(page).toHaveURL('http://localhost:3000');
  const toast3 = page.locator('.Toastify__toast--success');
  await expect(toast3).toBeVisible();
  await expect(toast3).toContainText('You have been logged out successfully.');
  await page.waitForTimeout(7000);

  // Close the browser context and the browser itself
  await context.close();
  await browser.close();
});
